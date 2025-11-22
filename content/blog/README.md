# Blog Posts

Thư mục này chứa các file MDX cho blog posts.

## Cách thêm blog post mới

1. Tạo file mới trong thư mục này với tên `your-post-slug.mdx`
2. Thêm frontmatter ở đầu file:

```mdx
---
title: 'Your Post Title'
excerpt: 'Brief description of your post'
author: 'Author Name'
publishedAt: '2025-01-15'
category: 'Category Name'
tags: ['tag1', 'tag2', 'tag3']
featured: false
---

## Your Content Here

Write your blog post content using Markdown syntax.
```

## Frontmatter Fields

- `title`: Tiêu đề bài viết (required)
- `excerpt`: Mô tả ngắn (required)
- `author`: Tác giả (default: 'D2D Team')
- `publishedAt`: Ngày xuất bản, format YYYY-MM-DD (required)
- `category`: Danh mục (optional)
- `tags`: Mảng các tags (optional)
- `featured`: true/false để đánh dấu bài viết nổi bật (optional, default: false)

## Ví dụ

Xem các file `.mdx` hiện có để tham khảo format.

