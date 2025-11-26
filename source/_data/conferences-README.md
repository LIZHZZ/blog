# 会议DDL数据文件说明

## 文件位置
`source/_data/conferences.yml`

## 用途
这个文件用于存储你关注的会议截止日期（DDL）信息，会在博客主页的侧边栏显示。

## 数据格式

```yaml
conferences:
  - name: "会议全称"          # 必填：会议完整名称
    abbr: "缩写"              # 可选：会议缩写
    ccf: "A"                 # 可选：CCF等级 (A/B/C)
    deadline: "2025-03-15"   # 必填：截止日期 (YYYY-MM-DD)
    location: "地点"          # 可选：会议地点
    website: "https://..."   # 可选：会议官网
    priority: "high"         # 可选：优先级 (high/medium/low)
    note: "备注"             # 可选：备注信息
```

## 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | 字符串 | ✅ | 会议完整名称 |
| deadline | 日期 | ✅ | 截止日期，格式：YYYY-MM-DD |
| abbr | 字符串 | ❌ | 会议缩写 |
| ccf | 字符串 | ❌ | CCF等级：A/B/C |
| location | 字符串 | ❌ | 会议举办地点 |
| website | 字符串 | ❌ | 会议官网链接 |
| priority | 字符串 | ❌ | 优先级：high/medium/low |
| note | 字符串 | ❌ | 备注信息 |

## 示例

```yaml
conferences:
  - name: "International Conference on Very Large Data Bases"
    abbr: "VLDB"
    ccf: "A"
    deadline: "2025-03-15"
    location: "Barcelona, Spain"
    website: "https://vldb.org/"
    priority: "high"
    note: "数据库领域顶级会议"
```

## 显示规则

1. **自动排序**：会议按截止日期从早到晚排序
2. **自动筛选**：只显示未过期的会议
3. **显示数量**：最多显示5个即将截止的会议
4. **紧急提醒**：距离截止日期30天内的会议会显示为紧急状态（红色边框）
5. **CCF等级颜色**：
   - A类：红色 (#ff6b6b)
   - B类：青色 (#4ecdc4)
   - C类：绿色 (#95e1d3)

## 更新建议

1. **定期更新**：建议每月更新一次会议DDL
2. **及时添加**：发现新的会议时及时添加
3. **删除过期**：可以保留过期会议作为参考，系统会自动过滤不显示
4. **参考来源**：可以参考 [CCF DDL](https://ccfddl.com/) 获取最新会议信息

## 注意事项

1. 日期格式必须为 `YYYY-MM-DD`，例如：`2025-03-15`
2. 会议名称建议使用英文全称
3. 如果会议没有CCF等级，可以不填写 `ccf` 字段
4. 网站链接会自动在新标签页打开
5. 修改后需要重新生成网站才能看到效果

## 相关文件

- **模板文件**：`themes/anzhiyu/layout/includes/widget/card_conferences.pug`
- **样式文件**：`themes/anzhiyu/source/css/_extra/conferences.css`
- **配置文件**：`themes/anzhiyu/layout/includes/widget/index.pug`

## 参考网站

- [CCF DDL](https://ccfddl.com/) - 中国计算机学会推荐会议截止日期
- [Conference Deadlines](https://aideadlin.es/) - 国际会议截止日期汇总


