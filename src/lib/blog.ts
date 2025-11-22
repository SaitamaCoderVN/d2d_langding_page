import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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

const blogDirectory = path.join(process.cwd(), 'content/blog');

export function getAllPosts(): BlogPost[] {
  try {
    if (!fs.existsSync(blogDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(blogDirectory);
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(blogDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
          slug,
          content,
          title: data.title || '',
          excerpt: data.excerpt || '',
          author: data.author || 'D2D Team',
          publishedAt: data.publishedAt || new Date().toISOString().split('T')[0],
          category: data.category,
          tags: data.tags || [],
          featured: data.featured || false,
        } as BlogPost;
      });

    return allPostsData.sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      return undefined;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      title: data.title || '',
      excerpt: data.excerpt || '',
      author: data.author || 'D2D Team',
      publishedAt: data.publishedAt || new Date().toISOString().split('T')[0],
      category: data.category,
      tags: data.tags || [],
      featured: data.featured || false,
    } as BlogPost;
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return undefined;
  }
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts()
    .filter((post) => post.featured)
    .sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts()
    .filter((post) => post.category === category)
    .sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
}
