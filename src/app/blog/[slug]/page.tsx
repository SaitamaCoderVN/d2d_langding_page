import Link from 'next/link';
import type { Metadata } from 'next';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { notFound } from 'next/navigation';
import React from 'react';

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
  // Always use D2D logo for Twitter Card - use custom ogImage if provided, otherwise default to favicon
  const ogImage = post.ogImage || `${siteUrl}/favicon.svg`;

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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://deployd2d.xyz';
  const postUrl = `${siteUrl}/blog/${slug}`;
  // Always use D2D logo for Twitter Card - use custom ogImage if provided, otherwise default to favicon
  const ogImage = post.ogImage || `${siteUrl}/favicon.svg`;

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
      <div className="min-h-screen bg-white">
      {/* Header with light blue background */}
      <header className="bg-blue-50 border-b border-blue-100 sticky top-0 z-50 backdrop-blur-sm bg-blue-50/95">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="relative rounded-[25%] border-2 border-gray-900 p-0.5">
                  <img 
                    className="rounded-[25%]" 
                    src="/favicon.svg" 
                    alt="D2D logo" 
                    width={40} 
                    height={40}
                  />
                </div>
              </div>
              <div>
                <h1 className="text-[14px] font-medium tracking-wide text-gray-900">D2D</h1>
                <p className="text-[11px] text-gray-500">Decentralize to deployment</p>
              </div>
            </Link>
            <nav className="hidden items-center space-x-8 text-[14px] font-medium text-gray-700 md:flex">
              <Link href="/" className="hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link href="/blog" className="hover:text-gray-900 transition-colors">
                Blog
              </Link>
              <Link 
                href="https://www.app.deployd2d.xyz/" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-[14px] font-medium text-white hover:bg-gray-800 transition-colors"
              >
                Launch App
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content - Centered */}
      <main className="max-w-[800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-16 md:py-24">
        <div>
          {/* Back Button */}
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-gray-600 hover:text-gray-900 transition-colors mb-12 group"
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
                  <>
                    <span className="text-[12px] text-gray-600 font-medium tracking-wide uppercase">
                      {post.category}
                    </span>
                    {post.tags && post.tags.length > 0 && (
                      <span className="text-[12px] text-gray-400">•</span>
                    )}
                  </>
                )}
                {post.tags && post.tags.slice(0, 2).map((tag, idx) => (
                  <span key={tag}>
                    {idx > 0 && <span className="text-[12px] text-gray-400 mr-1">•</span>}
                    <span className="text-[12px] text-gray-600 font-medium tracking-wide uppercase">{tag}</span>
                  </span>
                ))}
              </div>
            )}
            
            <h1 className="text-[40px] md:text-[48px] lg:text-[56px] font-bold text-gray-900 leading-[1.1] mb-8 tracking-tight">
              {post.title}
            </h1>
            
            {/* Author & Meta - Better layout */}
            <div className="flex items-center gap-4 text-[14px] text-gray-500 pb-8 border-b border-gray-200">
              <img 
                src="/favicon.svg" 
                alt="D2D logo" 
                className="w-11 h-11 rounded-full flex-shrink-0 object-cover"
              />
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-medium text-gray-900">{post.author}</span>
                <span className="text-gray-300">•</span>
                <time dateTime={post.publishedAt} className="font-normal">{formattedDate}</time>
                <span className="text-gray-300">•</span>
                <span className="font-normal">{readTime}</span>
              </div>
            </div>
          </header>

          {/* Article Content - MDX rendered */}
          <article className="prose prose-lg max-w-none">
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
          <div className="mt-20 pt-10 border-t border-gray-200">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-[16px] font-medium text-blue-600 hover:text-blue-700 transition-colors group"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
              <span>Back to Blog</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer - Centered */}
      <footer className="bg-white border-t border-gray-200 mt-32">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-16">
          <div className="mb-12 text-center md:text-left">
            <h3 className="text-[20px] font-medium text-gray-900 mb-4">Press room</h3>
            <p className="text-[16px] text-gray-600 mb-8 max-w-2xl">See the D2D ecosystem in the news.</p>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <Link 
                href="https://x.com/d2d_hq" 
                className="text-[16px] font-medium text-gray-900 hover:text-blue-600 transition-colors"
                target="_blank"
              >
                D2D on Twitter / X →
              </Link>
              <Link 
                href="https://t.me/d2d_hq" 
                className="text-[16px] font-medium text-gray-900 hover:text-blue-600 transition-colors"
                target="_blank"
              >
                D2D on Telegram →
              </Link>
            </div>
          </div>
          
          <div className="pt-12 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[14px] text-gray-600">
              <p>© {new Date().getFullYear()} D2D - Decentralize to deployment.</p>
              <div className="flex items-center gap-6">
                <Link href="https://x.com/d2d_hq" className="hover:text-gray-900 transition-colors" target="_blank">
                  Twitter / X
                </Link>
                <Link href="https://t.me/d2d_hq" className="hover:text-gray-900 transition-colors" target="_blank">
                  Telegram
                </Link>
                <Link href="mailto:coderhopham@gmail.com" className="hover:text-gray-900 transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
