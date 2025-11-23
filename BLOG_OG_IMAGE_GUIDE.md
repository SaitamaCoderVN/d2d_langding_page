# Hướng dẫn sử dụng ảnh tùy chỉnh cho Twitter Card và Social Sharing

## Thêm ảnh tùy chỉnh cho bài blog

Bạn có thể thêm ảnh tùy chỉnh cho mỗi bài blog để hiển thị khi share trên X (Twitter), Facebook, LinkedIn, v.v.

### Cách sử dụng

Thêm field `ogImage` vào frontmatter của file MDX:

```yaml
---
title: 'Your Blog Post Title'
excerpt: 'Your excerpt here'
author: 'D2D Team'
publishedAt: '2025-01-02'
category: 'Product'
tags: ['tag1', 'tag2']
featured: true
ogImage: 'https://your-cdn.com/your-custom-image.jpg'  # Thêm dòng này
---
```

### Ví dụ

```yaml
---
title: 'D2D: A Decentralized Deployment Layer for Solana'
excerpt: 'Deploy on Solana mainnet for just $5/month'
author: 'D2D Team'
publishedAt: '2025-01-02'
category: 'Product'
tags: ['d2d', 'solana', 'deployment']
featured: true
ogImage: 'https://harlequin-objective-lobster-986.mypinata.cloud/ipfs/bafybeiebt62opqnjomjhiadipond7wj22le4gh6qoes4whkzev6gngvm34/blog1_1.jpg'
---
```

### Lưu ý

1. **URL ảnh phải là HTTPS**: Đảm bảo link ảnh bắt đầu bằng `https://`
2. **Kích thước khuyến nghị**: 1200x630px (tỷ lệ 1.91:1) cho Twitter Card
3. **Format**: JPG hoặc PNG
4. **Kích thước file**: Tối ưu < 1MB để tải nhanh
5. **Nếu không có ogImage**: Hệ thống sẽ tự động sử dụng `/og-image.png` mặc định

### Kiểm tra

Sau khi thêm ogImage, bạn có thể test bằng:
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## Logo tự động với "D2D Team"

Khi bạn viết "D2D Team" trong nội dung blog, logo D2D sẽ tự động xuất hiện phía trước.

Ví dụ:
- Trong markdown: `D2D Team`
- Hiển thị: [Logo] D2D Team

Logo sẽ tự động được thêm vào mọi nơi có chữ "D2D Team" trong nội dung bài viết.

