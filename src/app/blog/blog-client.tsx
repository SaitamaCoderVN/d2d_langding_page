'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { BlogPost } from '@/lib/blog';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] as const }
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
    <article className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl hover:border-gray-200 hover:-translate-y-1 transition-all duration-300">
      {/* Featured Image */}
      <Link href={`/blog/${post.slug}`} className="block mb-5 group/image overflow-hidden rounded-xl bg-gray-100 relative items-center justify-center flex aspect-video">
        {post.featuredImage ? (
          <div className="w-full h-full overflow-hidden">
            <img 
              src={post.featuredImage} 
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500/5 to-blue-600/5 flex items-center justify-center"><span class="text-blue-500/40 font-bold text-lg">${post.category || 'D2D'}</span></div>`;
              }}
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500/5 to-blue-600/5 flex items-center justify-center">
            <span className="text-blue-500/40 font-bold text-lg">{post.category || 'D2D'}</span>
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1">
        {/* Categories */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {post.category && (
            <span className="text-xs font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
              {post.category}
            </span>
          )}
        </div>
        
        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>
        
        {/* Excerpt */}
        <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-1 line-clamp-3">
          {post.excerpt}
        </p>
        
        {/* Author & Meta */}
        <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-4 border-t border-gray-50">
          <div className="flex items-center gap-2">
             <span className="font-medium text-gray-900">{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <time dateTime={post.publishedAt}>{formattedDate}</time>
            <span>•</span>
            <span>{readTime}</span>
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
    <article className="lg:col-span-2 group bg-white rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row">
      <Link href={`/blog/${post.slug}`} className="block w-full md:w-1/2 lg:w-3/5 h-[300px] md:h-auto relative overflow-hidden group/image">
        {post.featuredImage ? (
           <img 
              src={post.featuredImage} 
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
            />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
             <div className="text-gray-300 text-5xl font-bold">{post.category || 'D2D'}</div>
          </div>
        )}
      </Link>

      <div className="w-full md:w-1/2 lg:w-2/5 p-8 md:p-10 flex flex-col justify-center bg-white">
        {/* Categories */}
        <div className="flex items-center gap-2 mb-4">
          {post.category && (
            <span className="text-xs font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              {post.category}
            </span>
          )}
        </div>
        
        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
            {post.title}
          </h2>
        </Link>
        
        {/* Excerpt */}
        <p className="text-lg text-gray-500 leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>
        
        {/* Author & Meta */}
        <div className="flex items-center gap-3 text-sm text-gray-400 mt-auto pt-4 border-t border-gray-50">
           <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">{post.author}</span>
          </div>
          <span>•</span>
          <time dateTime={post.publishedAt}>{formattedDate}</time>
          <span>•</span>
          <span>{readTime}</span>
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
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 relative">
      {/* Global Background Effects matching Landing Page */}
      <div className="fixed inset-0 z-0 pointer-events-none">
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

        {/* Page Header */}
        <div className="pt-32 pb-16 md:pt-40 md:pb-24 text-center px-4 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
              The D2D <span className="text-blue-600">Blog</span>.
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-light">
              Latest updates, tutorials, and insights from the team.
            </p>
          </motion.div>

          {/* Category Navigation */}
          <div className="mt-12 flex items-center justify-center gap-2 overflow-x-auto scrollbar-hide pb-2 max-w-4xl mx-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-200 border ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white border-gray-900 shadow-lg'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-900 hover:text-gray-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="container-main pb-24 flex-grow">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            {postsToShow.length === 0 && featuredPosts.length === 0 ? (
              <div className="text-center py-32 rounded-3xl bg-gray-50 border border-gray-100">
                <p className="text-lg text-gray-500">No posts found for this category.</p>
                <button onClick={() => setSelectedCategory('All posts')} className="mt-4 text-blue-600 font-bold hover:underline">View all posts</button>
              </div>
            ) : (
              <>
                {/* Grid Layout */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
                  {/* Featured Post takes up 2 columns */}
                  {featuredPosts.length > 0 && <FeaturedPost post={featuredPosts[0]} />}
                  
                  {/* First regular post takes remaining slot */}
                  {postsToShow.slice(0, featuredPosts.length > 0 ? 1 : 3).map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                  
                  {/* Remaining posts */}
                  {postsToShow.slice(featuredPosts.length > 0 ? 1 : 3).map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="mt-16 text-center">
                    <button
                      onClick={() => setDisplayCount(prev => prev + 9)}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-gray-200 text-gray-900 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-900 transition-all"
                    >
                      <span>Load More Articles</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

