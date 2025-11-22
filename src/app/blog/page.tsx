import { blogMetadata } from './metadata';
import BlogPageClient from './blog-client';

export const metadata = blogMetadata;

export default function BlogPage() {
  return <BlogPageClient />;
}
