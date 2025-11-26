# "关于我"页面图片说明

## 人格图片存放位置

### 1. 人格测试图片 (personality_img)
- **存放路径**: `source/img/personality.webp` (或 `.jpg`, `.png`)
- **配置文件**: `source/_data/about.yml`
- **配置项**: `personalities.personality_img: /img/personality.webp`

### 2. 个人照片 (photo_url)
- **存放路径**: `source/img/myphoto.jpg` (或 `.png`, `.webp`)
- **配置文件**: `source/_data/about.yml`
- **配置项**: `personalities.photo_url: /img/myphoto.jpg`
- **注意**: 此照片目前在页面中已隐藏（代码中注释掉了），但配置仍然保留

### 3. 头像图片 (avatarImg)
- **存放路径**: `source/jhdj.jpg` (当前配置)
- **配置文件**: `source/_data/about.yml`
- **配置项**: `avatarImg: /jhdj.jpg`

### 4. 统计数据背景图 (statistic.cover)
- **存放路径**: `source/img/about-bg.jpg`
- **配置文件**: `source/_data/about.yml`
- **配置项**: `statistic.cover: /img/about-bg.jpg`

## 当前配置

根据 `source/_data/about.yml` 文件，当前配置如下：

```yaml
personalities:
  author_name: 你是？
  personality_type: INTJ - 建筑师
  personality_type_color: "#ac899c"
  personality_img: /img/personality.webp  # ← 人格图片路径
  photo_url: /img/myphoto.jpg             # ← 个人照片路径（已隐藏）
  name_url: https://www.16personalities.com/intj-personality
```

## 使用步骤

### 步骤 1: 上传图片
将你的人格图片上传到 `source/img/` 目录：
- 文件名：`personality.webp`（或 `personality.jpg`, `personality.png`）
- 推荐格式：WebP（体积小，质量好）或 PNG（透明背景）

### 步骤 2: 检查配置文件
确认 `source/_data/about.yml` 中的路径正确：

```yaml
personalities:
  personality_img: /img/personality.webp  # 确保路径正确
```

### 步骤 3: 修改文件格式（如果需要）
如果你的图片是 `.jpg` 或 `.png`，需要修改配置文件：

```yaml
personalities:
  personality_img: /img/personality.jpg   # 改为实际的文件格式
```

## 图片要求

### 人格图片 (personality_img)
- **推荐尺寸**: 400x400px 或更大（正方形）
- **推荐格式**: WebP, PNG, JPG
- **用途**: 显示在"关于我"页面的性格卡片中

### 个人照片 (photo_url)
- **推荐尺寸**: 800x600px 或更大（横向）
- **推荐格式**: JPG, PNG
- **状态**: 目前已在页面中隐藏

## 支持的图片格式

- **WebP** (`.webp`): 推荐，体积小，质量好
- **PNG** (`.png`): 支持透明背景
- **JPEG** (`.jpg`, `.jpeg`): 适合照片
- **GIF** (`.gif`): 支持动画

## 路径说明

- 所有图片路径都以 `/img/` 开头（相对于网站根目录）
- 图片文件会被 Hexo 直接复制到生成的网站中
- 路径不区分大小写，但建议统一使用小写

## 示例

假设你上传了一张人格图片 `personality.png` 到 `source/img/` 目录：

1. **文件位置**: `source/img/personality.png`
2. **配置文件**: `source/_data/about.yml`
   ```yaml
   personalities:
     personality_img: /img/personality.png
   ```
3. **访问路径**: 网站部署后，可以通过 `/img/personality.png` 访问

## 注意事项

1. **不要放在主题目录**: 不要将图片放在 `themes/anzhiyu/source/img/`，主题更新可能丢失
2. **文件命名**: 建议使用英文和数字，避免中文文件名
3. **图片优化**: 建议压缩图片以减少文件大小，提升加载速度
4. **路径修改**: 如果修改了文件路径，记得同步更新 `source/_data/about.yml` 中的配置

## 测试

上传图片后，可以：
1. 运行 `hexo generate` 生成网站
2. 运行 `hexo server` 启动本地服务器
3. 访问 `/about/` 页面查看效果

## 相关文件

- **配置文件**: `source/_data/about.yml`
- **页面模板**: `themes/anzhiyu/layout/includes/page/about.pug`
- **样式文件**: `themes/anzhiyu/source/css/_page/about.styl`


