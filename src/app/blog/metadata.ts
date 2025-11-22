import type { Metadata } from 'next';

export const blogMetadata: Metadata = {
  title: 'Blog | D2D - Updates from the D2D team',
  description: 'Updates, insights, and stories from the D2D ecosystem. Learn about decentralized deployment, Solana development, and more.',
  openGraph: {
    title: 'Blog | D2D - Updates from the D2D team',
    description: 'Updates, insights, and stories from the D2D ecosystem. Learn about decentralized deployment, Solana development, and more.',
    url: 'https://deployd2d.xyz/blog',
    siteName: 'D2D - Decentralized Deployment',
    type: 'website',
    images: [
      {
        url: 'https://deployd2d.xyz/og-image.png',
        width: 1200,
        height: 630,
        alt: 'D2D Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | D2D - Updates from the D2D team',
    description: 'Updates, insights, and stories from the D2D ecosystem.',
    creator: '@d2d_hq',
    images: ['https://deployd2d.xyz/og-image.png'],
  },
};

