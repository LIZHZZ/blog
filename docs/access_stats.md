# 访问统计功能使用说明

## 功能概述

访问统计组件可以替换首页的文章卡片区域，显示网站的访问数据统计，包括今日访客、昨日访客、本月访问量、总访问量等指标。

## 配置说明

### 1. 主题配置 (`_config.anzhiyu.yml`)

```yaml
# 访问统计配置
access_stats:
  enable: true # 是否显示访问统计
  position: before_posts # 显示位置：before_posts/after_posts/only
  data_source: yml # 数据源：yml/51la/busuanzi
```

**配置选项说明：**
- `enable`: 是否启用访问统计功能
- `position`: 显示位置
  - `before_posts`: 在文章列表前显示（默认）
  - `after_posts`: 在文章列表后显示
  - `only`: 只显示访问统计，不显示文章列表
- `data_source`: 数据来源（目前支持yml文件）

### 2. 数据文件 (`source/_data/access_stats.yml`)

```yaml
# 今日统计
today:
  visitors: 19      # 今日访客数
  visits: 29        # 今日访问量

# 昨日统计  
yesterday:
  visitors: 171     # 昨日访客数
  visits: 344       # 昨日访问量

# 本月统计
this_month:
  visits: 373       # 本月访问量

# 总计统计
total:
  visits: 137562    # 总访问量

# 数据来源说明
source: "统计信息来自 51la网站统计"

# 最后更新时间
last_update: "2024-12-20 10:30:00"
```

## 使用方法

### 1. 启用访问统计

在 `_config.anzhiyu.yml` 中设置：
```yaml
access_stats:
  enable: true
  position: before_posts
```

### 2. 更新统计数据

#### 手动更新
直接编辑 `source/_data/access_stats.yml` 文件，修改相应的数值。

#### 自动更新（使用脚本）
```bash
# 运行更新脚本
node scripts/update_access_stats.js
```

### 3. 自定义样式

访问统计组件的样式已经内置在模板中，如果需要自定义，可以：

1. 修改 `themes/anzhiyu/layout/includes/access_stats.pug` 中的样式
2. 或者在自定义CSS文件中覆盖样式

## 功能特性

### 1. 响应式设计
- 支持桌面端、平板、手机等不同屏幕尺寸
- 自适应布局，确保在各种设备上都有良好的显示效果

### 2. 动画效果
- 数字递增动画：页面加载时数字从0递增到目标值
- 悬停效果：鼠标悬停时卡片会有轻微的上浮效果
- 滚动显示：组件进入视口时会有淡入动画
- 点击反馈：点击统计项时会有缩放反馈

### 3. 交互功能
- 点击"文章隧道"按钮可以跳转到文章列表
- 统计项支持点击交互
- 实时更新时间显示

## 集成第三方统计服务

### 51la统计
如果需要集成51la统计服务，可以修改更新脚本来获取真实数据：

```javascript
// 在 scripts/update_access_stats.js 中添加API调用
async function fetchFrom51la() {
  // 调用51la API获取统计数据
  // 更新 access_stats.yml 文件
}
```

### 百度统计
类似地，可以集成百度统计API：

```javascript
async function fetchFromBaidu() {
  // 调用百度统计API
  // 更新统计数据
}
```

## 注意事项

1. **数据更新频率**：建议根据实际需要设置数据更新频率，避免过于频繁的更新
2. **数据准确性**：确保统计数据来源的准确性，定期校验数据
3. **性能考虑**：大量统计数据可能会影响页面加载速度，建议适当控制数据量
4. **隐私保护**：如果涉及用户隐私数据，请确保符合相关法律法规要求

## 故障排除

### 1. 访问统计不显示
- 检查 `access_stats.enable` 是否为 `true`
- 确认 `source/_data/access_stats.yml` 文件存在且格式正确
- 检查浏览器控制台是否有JavaScript错误

### 2. 数据不更新
- 确认数据文件路径正确
- 检查文件权限是否允许写入
- 验证YAML格式是否正确

### 3. 样式显示异常
- 检查CSS样式是否被其他样式覆盖
- 确认浏览器兼容性
- 检查响应式断点设置

## 更新日志

- **v1.0.0**: 初始版本，支持基本的访问统计显示
- 支持响应式设计和动画效果
- 提供配置选项和自动更新脚本
