# 图片资源存放说明

这个文件夹用于存放博客中使用的各种图片资源。

## 文件夹结构

```
img/
├── avatar.jpg           - 个人头像
├── cover/              - 文章封面图
│   ├── roadNetwork.png
│   ├── cocktail-coding.png
│   └── ...
├── friend/             - 友链头像
│   ├── lyr.png
│   ├── lz.jpg
│   └── ...
└── photos/             - 相册图片
    └── ...
```

## 在页面中引用

文章封面（在文章的 Front Matter 中）：
```yaml
---
cover: /img/cover/roadNetwork.png
---
```

Markdown中插入图片：
```markdown
![描述文字](/img/avatar.jpg)
```

HTML中使用：
```html
<img src="/img/avatar.jpg" alt="描述">
```

## 图片优化建议

- 使用 WebP 格式可以减小文件大小
- 封面图建议尺寸：1200x630 像素
- 头像建议尺寸：200x200 像素
- 文件大小控制在 500KB 以内
