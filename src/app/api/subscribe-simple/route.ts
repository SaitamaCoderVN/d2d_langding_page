import { NextRequest, NextResponse } from 'next/server';

/**
 * Simple method using Google Apps Script Web App
 * No Google API credentials needed - just a web app URL
 */
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

    // Get Google Apps Script Web App URL from environment
    const webAppUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!webAppUrl) {
      console.error('Missing Google Apps Script Web App URL');
      return NextResponse.json(
        { error: 'Server configuration error: Missing Web App URL' },
        { status: 500 }
      );
    }

    // Send email to Google Apps Script Web App
    const response = await fetch(webAppUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.trim() }),
    });

    const result = await response.text();

    // Google Apps Script returns plain text, not JSON
    if (!response.ok) {
      return NextResponse.json(
        { error: result || 'Failed to add email' },
        { status: response.status }
      );
    }

    // Check if it's a duplicate (Apps Script returns "Duplicate" text)
    if (result.includes('Duplicate') || result.includes('already')) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: 'Email successfully added to sheet', email },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email to Google Apps Script:', error);
    return NextResponse.json(
      { error: 'Failed to add email to sheet' },
      { status: 500 }
    );
  }
}

