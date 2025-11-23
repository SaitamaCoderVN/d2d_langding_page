'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { BlogPost } from '@/lib/blog';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.4 }
  }
};

function PostCard({ post }: { post: BlogPost }) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Generate read time (simple estimation)
  const readTime = Math.max(1, Math.ceil(post.content.length / 1000)) + ' min read';

  return (
    <article className="group flex flex-col h-full">
      {/* Featured Image */}
      <Link href={`/blog/${post.slug}`} className="block mb-5 group/image">
        {post.featuredImage ? (
          <div className="w-full aspect-video rounded-xl overflow-hidden transition-transform duration-300 group-hover/image:scale-[1.02]">
            <img 
              src={post.featuredImage} 
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center"><div class="text-white/20 text-2xl font-bold">${post.category || 'D2D'}</div></div>`;
                }
              }}
            />
          </div>
        ) : (
          <div 
            className="w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center transition-transform duration-300 group-hover/image:scale-[1.02]"
          >
            <div className="text-white/20 text-2xl font-bold">{post.category || 'D2D'}</div>
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1 px-1">
        {/* Categories */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {post.category && (
            <>
              <span className="text-[12px] text-gray-600 font-medium tracking-wide">
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
              <span className="text-[12px] text-gray-600 font-medium tracking-wide">{tag}</span>
            </span>
          ))}
        </div>
        
        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-[20px] md:text-[22px] font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-[1.3] tracking-tight">
            {post.title}
          </h2>
        </Link>
        
        {/* Excerpt */}
        <p className="text-[15px] text-gray-600 leading-relaxed mb-6 flex-1 line-clamp-3">
          {post.excerpt}
        </p>
        
        {/* Author & Meta */}
        <div className="flex items-center justify-between text-[13px] text-gray-500 mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2.5">
            <img 
              src="/favicon.svg" 
              alt="D2D logo" 
              className="w-7 h-7 rounded-full flex-shrink-0 object-cover"
            />
            <span className="font-medium text-gray-700">{post.author}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <time dateTime={post.publishedAt} className="font-normal">{formattedDate}</time>
            <span className="text-gray-300">•</span>
            <span className="font-normal">{readTime}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function FeaturedPost({ post }: { post: BlogPost }) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const readTime = Math.max(1, Math.ceil(post.content.length / 1000)) + ' min read';

  return (
    <article className="lg:col-span-2 group">
      <Link href={`/blog/${post.slug}`} className="block group/image">
        {/* Featured Image */}
        {post.featuredImage ? (
          <div className="w-full aspect-video rounded-xl overflow-hidden mb-6 transition-transform duration-300 group-hover/image:scale-[1.02]">
            <img 
              src={post.featuredImage} 
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center"><div class="text-white/30 text-5xl font-bold">${post.category || 'D2D'}</div></div>`;
                }
              }}
            />
          </div>
        ) : (
          <div 
            className="w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 mb-6 flex items-center justify-center transition-transform duration-300 group-hover/image:scale-[1.02]"
          >
            <div className="text-white/30 text-5xl font-bold">{post.category || 'D2D'}</div>
          </div>
        )}
      </Link>

      <div className="space-y-5 px-1">
        {/* Categories */}
        <div className="flex items-center gap-2 flex-wrap">
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
        
        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-[28px] md:text-[32px] lg:text-[38px] font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-[1.2] tracking-tight">
            {post.title}
          </h2>
        </Link>
        
        {/* Excerpt */}
        <p className="text-[17px] text-gray-600 leading-relaxed max-w-3xl">
          {post.excerpt}
        </p>
        
        {/* Author & Meta */}
        <div className="flex items-center gap-3.5 text-[14px] text-gray-500 pt-2">
          <img 
            src="/favicon.svg" 
            alt="D2D logo" 
            className="w-9 h-9 rounded-full flex-shrink-0 object-cover"
          />
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-medium text-gray-700">{post.author}</span>
            <span className="text-gray-300">•</span>
            <time dateTime={post.publishedAt} className="font-normal">{formattedDate}</time>
            <span className="text-gray-300">•</span>
            <span className="font-normal">{readTime}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function BlogPageClient() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(9);
  const [selectedCategory, setSelectedCategory] = useState('All posts');

  useEffect(() => {
    // Fetch posts from API
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched posts:', data);
        if (data.length > 0) {
          console.log('First post featuredImage:', data[0].featuredImage);
        }
        setAllPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
        setLoading(false);
      });
  }, []);

  const featuredPosts = allPosts.filter(post => post.featured);
  const regularPosts = allPosts.filter(post => !post.featured);
  
  // Filter posts by category
  const filteredPosts = selectedCategory === 'All posts' 
    ? regularPosts 
    : regularPosts.filter(post => post.category === selectedCategory);
  
  const postsToShow = filteredPosts.slice(0, displayCount);
  const hasMore = filteredPosts.length > displayCount;

  const categories = ['All posts', ...Array.from(new Set(allPosts.map(p => p.category).filter(Boolean)))] as string[];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
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
              <Link href="/blog" className="text-gray-900 font-medium">
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

      {/* Page Header - Centered */}
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-16 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-[48px] md:text-[56px] lg:text-[64px] font-bold text-gray-900 mb-4 leading-[1.1] tracking-tight">
            Blog
          </h1>
          <p className="text-[18px] md:text-[20px] text-gray-600 max-w-2xl mx-auto">
            Updates from the D2D team
          </p>
        </div>

        {/* Category Navigation - Centered */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto scrollbar-hide pb-2 border-b border-gray-200">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 text-[14px] font-medium whitespace-nowrap transition-colors relative ${
                selectedCategory === category
                  ? 'text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {category}
              {selectedCategory === category && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 -mb-2"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content - Centered Grid */}
      <main className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pb-24">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          {postsToShow.length === 0 && featuredPosts.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-[18px] text-gray-600">No posts yet. Check back soon!</p>
            </div>
          ) : (
            <>
              {/* Featured Post + Grid - Optimized spacing */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-12 mb-12 lg:mb-16">
                {/* Featured Post */}
                {featuredPosts.length > 0 && (
                  <FeaturedPost post={featuredPosts[0]} />
                )}
                
                {/* Regular Posts (will fill remaining slots) */}
                {postsToShow.slice(0, featuredPosts.length > 0 ? 1 : 3).map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>

              {/* Rest of Posts Grid - Consistent spacing */}
              {postsToShow.length > (featuredPosts.length > 0 ? 1 : 3) && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-12">
                  {postsToShow.slice(featuredPosts.length > 0 ? 1 : 3).map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              )}

              {/* Load More Button - Centered */}
              {hasMore && (
                <div className="mt-16 lg:mt-20 text-center">
                  <button
                    onClick={() => setDisplayCount(prev => prev + 9)}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
                  >
                    <span>Load More</span>
                  </button>
                </div>
              )}
            </>
          )}
        </motion.div>
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
  );
}

