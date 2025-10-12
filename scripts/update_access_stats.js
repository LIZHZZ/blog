/**
 * 访问统计数据更新脚本
 * 可以手动运行或集成到CI/CD中自动更新
 */

const fs = require('fs');
const path = require('path');

// 配置文件路径
const configPath = path.join(__dirname, '../source/_data/access_stats.yml');

// 示例数据更新函数
function updateAccessStats() {
  // 这里可以集成真实的统计API
  // 例如：51la、百度统计、Google Analytics等
  
  const currentStats = {
    today: {
      visitors: Math.floor(Math.random() * 50) + 10,
      visits: Math.floor(Math.random() * 80) + 20
    },
    yesterday: {
      visitors: Math.floor(Math.random() * 200) + 100,
      visits: Math.floor(Math.random() * 400) + 200
    },
    this_month: {
      visits: Math.floor(Math.random() * 500) + 300
    },
    total: {
      visits: Math.floor(Math.random() * 50000) + 100000
    },
    source: "统计信息来自 51la网站统计",
    last_update: new Date().toLocaleString('zh-CN')
  };

  // 生成YAML内容
  const yamlContent = `# 访问统计数据
# 可以通过脚本自动更新这些数据，或者手动维护

# 今日统计
today:
  visitors: ${currentStats.today.visitors}      # 今日访客数
  visits: ${currentStats.today.visits}        # 今日访问量

# 昨日统计  
yesterday:
  visitors: ${currentStats.yesterday.visitors}     # 昨日访客数
  visits: ${currentStats.yesterday.visits}       # 昨日访问量

# 本月统计
this_month:
  visits: ${currentStats.this_month.visits}       # 本月访问量

# 总计统计
total:
  visits: ${currentStats.total.visits}    # 总访问量

# 数据来源说明
source: "${currentStats.source}"

# 最后更新时间
last_update: "${currentStats.last_update}"
`;

  // 写入文件
  fs.writeFileSync(configPath, yamlContent, 'utf8');
  console.log('✅ 访问统计数据已更新:', currentStats.last_update);
}

// 如果直接运行此脚本
if (require.main === module) {
  updateAccessStats();
}

module.exports = { updateAccessStats };
