export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
}

export const posts: BlogPost[] = [
  {
    slug: 'welcome-to-d2d-journal',
    title: 'Welcome to D2D Journal',
    excerpt: 'Discover the latest updates, insights, and stories from the D2D ecosystem. Learn about decentralized deployment, Solana development, and more.',
    content: `
      <h2>Welcome to D2D Journal</h2>
      <p>Welcome to the D2D Journal, where we share insights, updates, and stories from the decentralized deployment ecosystem.</p>
      
      <h3>What is D2D?</h3>
      <p>D2D (Decentralize to Deployment) is a platform that enables developers to deploy Solana programs to mainnet for just $5/month, eliminating the high upfront costs that prevent many developers from launching their projects.</p>
      
      <h3>Why Journal?</h3>
      <p>Through this journal, we aim to:</p>
      <ul>
        <li>Share technical insights and best practices</li>
        <li>Keep the community updated on platform developments</li>
        <li>Provide educational content about Solana and blockchain development</li>
        <li>Tell stories from our community of builders</li>
      </ul>
      
      <p>Stay tuned for more content coming soon!</p>
    `,
    author: 'D2D Team',
    publishedAt: '2025-01-01',
    category: 'Announcements',
    tags: ['announcement', 'welcome', 'd2d'],
    featured: true,
  },
  {
    slug: 'getting-started-with-solana-deployment',
    title: 'Getting Started with Solana Deployment',
    excerpt: 'A beginner-friendly guide to deploying your first Solana program using D2D. Learn the basics of program deployment and how D2D simplifies the process.',
    content: `
      <h2>Getting Started with Solana Deployment</h2>
      <p>Deploying a Solana program can seem daunting, but with D2D, it's simpler than ever. This guide will walk you through the process.</p>
      
      <h3>Prerequisites</h3>
      <ul>
        <li>A Solana program ready for deployment</li>
        <li>A wallet with some SOL for transactions</li>
        <li>Your program ID from devnet</li>
      </ul>
      
      <h3>Step 1: Connect Your Wallet</h3>
      <p>First, connect your Solana wallet to the D2D platform. We support all major Solana wallets including Phantom, Solflare, and others.</p>
      
      <h3>Step 2: Submit Your Program ID</h3>
      <p>Enter your devnet program ID. Our system will automatically verify your program and extract the necessary deployment files.</p>
      
      <h3>Step 3: Review and Deploy</h3>
      <p>Review the deployment details and estimated costs. Once confirmed, D2D handles the rest - from borrowing SOL from the vault to deploying to mainnet.</p>
      
      <h3>What's Next?</h3>
      <p>After deployment, you can monitor your program, track repayments, and manage renewals all from the D2D dashboard.</p>
    `,
    author: 'D2D Team',
    publishedAt: '2025-01-02',
    category: 'Tutorial',
    tags: ['tutorial', 'solana', 'deployment', 'beginner'],
    featured: true,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find(post => post.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return posts.sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export function getFeaturedPosts(): BlogPost[] {
  return posts.filter(post => post.featured).sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export function getPostsByCategory(category: string): BlogPost[] {
  return posts.filter(post => post.category === category).sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

