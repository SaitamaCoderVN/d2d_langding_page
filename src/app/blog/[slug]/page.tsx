import Link from 'next/link';
import type { Metadata } from 'next';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { notFound } from 'next/navigation';
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | D2D Blog',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://d2dprotocol.com';
  const postUrl = `${siteUrl}/blog/${slug}`;
  // Always use D2D logo for Twitter Card - Twitter requires PNG/JPG, not SVG
  // Use custom ogImage if provided, otherwise use default og-image.png or fallback to first image from content
  const ogImage = post.ogImage || post.featuredImage || `${siteUrl}/og-image.png`;

  return {
    title: `${post.title} | D2D Blog`,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: 'D2D - Decentralized Deployment',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'D2D - Decentralized Deployment',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      creator: '@d2d_hq',
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const readTime = Math.max(1, Math.ceil(post.content.length / 1000)) + ' min read';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://d2dprotocol.com';
  const postUrl = `${siteUrl}/blog/${slug}`;
  // Twitter Card requires PNG/JPG (not SVG) - use custom ogImage, or first image from content, or default og-image.png
  const ogImage = post.ogImage || post.featuredImage || `${siteUrl}/og-image.png`;

  // JSON-LD structured data for better SEO and social sharing
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: ogImage,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'D2D',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Global Background Effects matching Landing Page */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-white">
        <div className="absolute inset-0 bg-grid opacity-[0.4] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/4 transform opacity-60">
          <div className="h-[800px] w-[800px] rounded-full bg-blue-100/60 blur-3xl" />
        </div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
           <div className="h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[120px]" />
        </div>
      </div>

      <div className="relative z-20 flex flex-col min-h-screen">
        <Header />

        {/* Main Content - Centered */}
        <main className="max-w-[800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-32 md:py-40 flex-grow">
          <div>
            {/* Back Button */}
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors mb-12 group uppercase tracking-widest"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
              <span>Back to Blog</span>
            </Link>

            {/* Article Header - Better spacing */}
            <header className="mb-12">
              {/* Categories */}
              {(post.category || (post.tags && post.tags.length > 0)) && (
                <div className="flex items-center gap-2 mb-6 flex-wrap">
                  {post.category && (
                     <span className="text-xs font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                      {post.category}
                    </span>
                  )}
                  {post.tags && post.tags.slice(0, 2).map((tag, idx) => (
                    <span key={tag} className="text-xs font-bold tracking-wider uppercase text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-8 tracking-tight">
                {post.title}
              </h1>
              
              {/* Author & Meta - Better layout */}
              <div className="flex items-center gap-4 text-sm text-gray-500 pb-8 border-b border-gray-100">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-bold text-gray-900">{post.author}</span>
                  <span className="text-gray-300">•</span>
                  <time dateTime={post.publishedAt} className="font-medium">{formattedDate}</time>
                  <span className="text-gray-300">•</span>
                  <span className="font-medium">{readTime}</span>
                </div>
              </div>
            </header>

            {/* Article Content - MDX rendered */}
            <article className="prose prose-lg prose-blue max-w-none hover:prose-a:text-blue-500">
              <div className="blog-content-light">
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                >
                  {post.content.replace(
                    /D2D Team/g,
                    '<span class="d2d-team-with-logo"><img src="/favicon.svg" alt="D2D logo" class="d2d-team-logo" />D2D Team</span>'
                  )}
                </ReactMarkdown>
              </div>
            </article>

            {/* Article Footer - Better spacing */}
            <div className="mt-20 pt-10 border-t border-gray-100">
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 text-base font-bold text-gray-900 hover:text-blue-600 transition-colors group"
              >
                <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
                <span>Back to Overview</span>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
