import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check which method to use: Google Apps Script (simpler) or Google Sheets API
    const webAppUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    
    // Use Google Apps Script if available (simpler, no API needed)
    if (webAppUrl) {
      try {
        const response = await fetch(webAppUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email.trim() }),
        });

        const result = await response.text();
        let resultData;
        
        try {
          resultData = JSON.parse(result);
        } catch {
          // If not JSON, treat as plain text
          resultData = { success: result.includes('success'), error: result };
        }

        if (!response.ok || resultData.success === false) {
          if (resultData.error?.includes('already') || resultData.error?.includes('Duplicate')) {
            return NextResponse.json(
              { error: 'Email already registered' },
              { status: 409 }
            );
          }
          return NextResponse.json(
            { error: resultData.error || 'Failed to add email' },
            { status: response.status || 500 }
          );
        }

        return NextResponse.json(
          { message: 'Email successfully added to sheet', email },
          { status: 200 }
        );
      } catch (error) {
        console.error('Error calling Google Apps Script:', error);
        return NextResponse.json(
          { error: 'Failed to add email to sheet' },
          { status: 500 }
        );
      }
    }

    // Fallback to Google Sheets API method
    // Get environment variables
    const credentials = process.env.GOOGLE_SHEETS_CREDENTIALS;
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!credentials || !spreadsheetId) {
      console.error('Missing Google Sheets configuration');
      return NextResponse.json(
        { error: 'Server configuration error: Please set either GOOGLE_APPS_SCRIPT_URL or GOOGLE_SHEETS_CREDENTIALS' },
        { status: 500 }
      );
    }

    // Parse credentials
    let auth;
    try {
      const credentialsJson = JSON.parse(credentials);
      auth = new google.auth.GoogleAuth({
        credentials: credentialsJson,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
    } catch (error) {
      console.error('Error parsing credentials:', error);
      return NextResponse.json(
        { error: 'Invalid credentials format' },
        { status: 500 }
      );
    }

    // Initialize Google Sheets API
    const sheets = google.sheets({ version: 'v4', auth });

    // Append email to sheet (assuming first column is for emails)
    const range = 'Sheet1!A:A'; // Adjust sheet name and range as needed
    
    // Get current values to check for duplicates
    const existingData = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:A',
    });

    // Flatten array and filter out empty values and headers
    const existingEmails = existingData.data.values?.flat().filter((val) => {
      return val && typeof val === 'string' && val.includes('@');
    }) || [];
    
    // Case-insensitive duplicate check
    const normalizedEmail = email.toLowerCase().trim();
    if (existingEmails.some(existing => existing.toLowerCase().trim() === normalizedEmail)) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Append new email with timestamp
    const timestamp = new Date().toISOString();
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:B', // Column A: email, Column B: timestamp
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [[email.trim(), timestamp]],
      },
    });

    return NextResponse.json(
      { message: 'Email successfully added to sheet', email },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error adding email to sheet:', error);
    return NextResponse.json(
      { error: 'Failed to add email to sheet' },
      { status: 500 }
    );
  }
}

