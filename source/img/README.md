---
layout: false
---
# 图片资源目录说明

此目录用于存放博客的图片资源文件。

## 目录结构

```
img/
├── posts/       # 文章配图（按文章分类存放）
├── covers/      # 文章封面图片
├── gallery/     # 图库/相册图片
└── README.md    # 本说明文件
```

## 使用方法

### 1. 在文章中使用图片

#### 方式一：使用 Markdown 语法
```markdown
![图片描述](/img/posts/my-image.jpg)
```

#### 方式二：使用 HTML 标签（可设置尺寸）
```markdown
<img src="/img/posts/my-image.jpg" alt="图片描述" width="500">
```

#### 方式三：在文章 Front Matter 中设置封面
```yaml
cover: /img/covers/my-cover.jpg
```

### 2. 图片路径说明

- 所有路径都以 `/img/` 开头（相对于网站根目录）
- 图片文件会被 Hexo 直接复制到生成的网站中
- 建议使用有意义的文件名，避免使用中文文件名（可能导致编码问题）

### 3. 推荐的图片格式

- **JPEG (.jpg, .jpeg)**: 适合照片、复杂图像
- **PNG (.png)**: 适合透明背景、简单图形
- **WebP (.webp)**: 现代格式，体积小，但浏览器兼容性需要考虑
- **SVG (.svg)**: 适合图标、矢量图

### 4. 图片优化建议

- 压缩图片以减少文件大小，提升加载速度
- 建议文章配图宽度控制在 1200px 以内
- 封面图片建议尺寸：1200x600px 或类似比例

### 5. 文件命名规范

建议使用英文和数字，使用连字符或下划线分隔：

✅ 推荐：
- `spatial-data-analysis-01.jpg`
- `coding-tips-2024.png`
- `cover-tech-article.jpg`

❌ 不推荐：
- `图片1.jpg`（中文文件名）
- `my image.jpg`（包含空格）
- `MyImage.JPG`（大小写混乱）

### 6. 示例

#### 在文章中插入图片：
```markdown
## 数据可视化示例

下面是一个数据可视化的示例：

![数据可视化图表](/img/posts/data-visualization-2024.png)

## 技术架构图

<img src="/img/posts/tech-architecture.svg" alt="技术架构图" width="800">
```

#### 设置文章封面：
```yaml
---
title: 我的技术文章
date: 2024-12-20
cover: /img/covers/tech-article-cover.jpg
---
```

## 注意事项

1. **不要将图片放在主题目录** (`themes/anzhiyu/source/img/`)，主题更新时可能会丢失
2. **大文件建议使用图床**，可以使用 GitHub、Cloudflare、或其他图床服务
3. **定期清理未使用的图片**，保持仓库大小合理
4. **使用 Git LFS** 如果图片文件很大（超过 100MB）

## 图床服务（可选）

如果图片文件较大或较多，建议使用图床服务：

- **GitHub**: 使用 GitHub 仓库作为图床
- **Cloudflare R2**: 免费的 CDN 加速
- **SM.MS**: 免费图床服务
- **七牛云/阿里云 OSS**: 国内图床服务

使用图床时，在文章中使用完整 URL：
```markdown
![图片描述](https://example.com/images/my-image.jpg)
```

