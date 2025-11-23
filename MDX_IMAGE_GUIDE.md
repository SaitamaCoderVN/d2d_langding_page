# Hướng dẫn chèn ảnh vào Blog MDX

## Cách chèn ảnh vào file MDX

Bạn có thể chèn ảnh vào file MDX bằng 2 cách:

### Cách 1: Sử dụng Markdown syntax (Khuyến nghị)

```markdown
![Mô tả ảnh](https://example.com/image.jpg)
```

**Ví dụ:**
```markdown
![D2D Logo](https://example.com/d2d-logo.png)
```

### Cách 2: Sử dụng HTML img tag

```html
<img src="https://example.com/image.jpg" alt="Mô tả ảnh" />
```

**Ví dụ với kích thước tùy chỉnh:**
```html
<img src="https://example.com/image.jpg" alt="Mô tả ảnh" width="800" height="400" />
```

## Lưu ý quan trọng

1. **URL ảnh phải là HTTPS**: Đảm bảo link ảnh bắt đầu bằng `https://`
2. **Ảnh sẽ tự động được căn giữa** và có border radius đẹp
3. **Ảnh sẽ có hiệu ứng hover** khi di chuột qua
4. **Ảnh tự động responsive** - sẽ tự điều chỉnh kích thước trên mobile

## Ví dụ thực tế

### Chèn ảnh từ URL công khai:
```markdown
![Solana Network](https://solana.com/static/og-image.png)
```

### Chèn ảnh từ CDN:
```markdown
![D2D Dashboard](https://cdn.example.com/d2d-dashboard.png)
```

### Chèn ảnh với caption (sử dụng HTML):
```html
<figure>
  <img src="https://example.com/image.jpg" alt="Mô tả" />
  <figcaption style="text-align: center; color: #6b7280; margin-top: 8px; font-size: 14px;">
    Hình ảnh mô tả quy trình deployment của D2D
  </figcaption>
</figure>
```

## Styling tự động

Tất cả ảnh trong blog sẽ tự động có:
- Border radius: 12px
- Box shadow đẹp mắt
- Căn giữa tự động
- Responsive trên mọi thiết bị
- Hiệu ứng hover khi di chuột

## Best Practices

1. **Sử dụng ảnh chất lượng cao** nhưng không quá lớn (tối ưu < 1MB)
2. **Thêm alt text mô tả** để SEO tốt hơn
3. **Sử dụng CDN** cho ảnh để tải nhanh hơn
4. **Kích thước khuyến nghị**: 800-1200px width cho ảnh trong bài viết

