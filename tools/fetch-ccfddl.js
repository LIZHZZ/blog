#!/usr/bin/env node

/**
 * Fetch latest conference deadlines from ccfddl.top and update source/_data/conferences.yml
 *
 * Usage:
 *   node scripts/fetch-ccfddl.js
 *
 * Optional environment variables:
 *   CCFDDL_URL=https://ccfddl.com/
 *   OUTPUT_FILE=source/_data/conferences.yml
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SOURCE_URL = process.env.CCFDDL_URL || 'https://ccfddl.top/';
const OUTPUT_FILE = path.resolve(process.env.OUTPUT_FILE || 'source/_data/conferences.yml');

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'ccfddl-fetcher/1.0 (+https://github.com/LIZHZZ/blog)' },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.text();
}

function extractRowObjects(html) {
  const blockMatch = html.match(/var rows=\[\];([\s\S]*?)query\(\);/);
  if (!blockMatch) {
    throw new Error('Unable to locate rows definition block in source HTML.');
  }

  const script = `
    var rows = [];
    ${blockMatch[1]}
    rows;
  `;

  return vm.runInNewContext(script);
}

/**
 * 解析时区字符串，返回与 UTC 的偏移小时数
 * @param {string} timezone - 时区字符串，如 "UTC-12", "UTC+0", "AoE"
 * @returns {number} 与 UTC 的偏移小时数（UTC-12 返回 -12）
 */
function parseTimezoneOffset(timezone) {
  if (!timezone) return 0;
  
  // AoE (Anywhere on Earth) 通常是 UTC-12
  if (timezone === 'AoE') return -12;
  
  // 解析 UTC±N 格式
  const match = timezone.match(/UTC([+-]?\d+)/);
  if (match) {
    return parseInt(match[1], 10);
  }
  
  return 0; // 默认 UTC
}

/**
 * 将 deadline 转换为北京时间（UTC+8）
 * @param {string} deadline - 原始 deadline 字符串，如 "2025-08-01 23:59:59"
 * @param {string} timezone - 时区字符串，如 "UTC-12"
 * @returns {string|null} 转换后的日期时间字符串，格式 "YYYY-MM-DD HH:mm:ss"
 */
function formatDate(deadline, timezone) {
  if (!deadline) return null;
  
  // 解析日期和时间
  const match = deadline.match(/(\d{4}-\d{2}-\d{2})\s+(\d{2}):(\d{2}):(\d{2})/);
  if (!match) {
    // 如果没有时间部分，默认使用 23:59:59
    const datePart = deadline.split(/\s+/)[0];
    if (/\d{4}-\d{2}-\d{2}/.test(datePart)) {
      return `${datePart} 23:59:59`;
    }
    return null;
  }
  
  const [, dateStr, hour, minute, second] = match;
  
  // 计算时区偏移（UTC-12 表示比 UTC 晚 12 小时，所以偏移是 -12）
  const tzOffset = parseTimezoneOffset(timezone);
  
  // 将原始时间解析为 UTC 时间
  // 如果时区是 UTC-12，那么该时区的 23:59:59 对应 UTC 的 11:59:59（加 12 小时）
  // 所以 UTC 时间 = 原始时间 + |tzOffset|
  const utcDate = new Date(`${dateStr}T${hour}:${minute}:${second}Z`);
  // 调整到 UTC：如果 tzOffset 是负数（如 -12），需要加回这个偏移
  utcDate.setUTCHours(utcDate.getUTCHours() - tzOffset);
  
  // 转换为北京时间（UTC+8）
  const beijingDate = new Date(utcDate);
  beijingDate.setUTCHours(beijingDate.getUTCHours() + 8);
  
  // 格式化为 YYYY-MM-DD HH:mm:ss
  const year = beijingDate.getUTCFullYear();
  const month = String(beijingDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(beijingDate.getUTCDate()).padStart(2, '0');
  const beijingHour = String(beijingDate.getUTCHours()).padStart(2, '0');
  const beijingMinute = String(beijingDate.getUTCMinutes()).padStart(2, '0');
  const beijingSecond = String(beijingDate.getUTCSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${beijingHour}:${beijingMinute}:${beijingSecond}`;
}

function formatLocation(place) {
  if (!place) return '';
  return place
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .join(', ');
}

function mapPriority(ccfRank) {
  if (ccfRank === 'A') return 'high';
  if (ccfRank === 'B') return 'medium';
  return 'low';
}

function buildConferenceEntries(rows) {
  const today = new Date();
  const pastThreshold = new Date(today);
  pastThreshold.setMonth(pastThreshold.getMonth() - 2); // include recent past deadlines

  return rows
    .map((row) => {
      const deadline = formatDate(row.deadline, row.timezone);
      return {
        name: row.shortName || row.name || 'Unknown Conference',
        abbr: row.shortName || '',
        ccf: row.ccfRank && row.ccfRank !== 'N' ? row.ccfRank : '',
        deadline,
        location: formatLocation(row.place),
        website: row.link || '',
        priority: mapPriority(row.ccfRank),
        note: [row.type, row.date].filter(Boolean).join(' | '),
      };
    })
    .filter((conf) => {
      if (!conf.deadline) return false;
      // 解析带时间的 deadline 字符串（格式：YYYY-MM-DD HH:mm:ss）
      const date = new Date(conf.deadline.replace(' ', 'T') + '+08:00');
      return date >= pastThreshold;
    })
    .sort((a, b) => (a.deadline < b.deadline ? -1 : 1));
}

function yamlValue(value) {
  if (value === undefined || value === null || value === '') return null;
  const safe = String(value).replace(/"/g, '\\"');
  return `"${safe}"`;
}

function buildYaml(conferences) {
  const lines = [
    '# 该文件由 scripts/fetch-ccfddl.js 自动生成',
    `# 数据来源: ${SOURCE_URL}`,
    `# 更新时间: ${new Date().toISOString()}`,
    '',
    'conferences:',
  ];

  conferences.forEach((conf) => {
    lines.push('  - name: ' + yamlValue(conf.name));
    if (conf.abbr) lines.push('    abbr: ' + yamlValue(conf.abbr));
    if (conf.ccf) lines.push('    ccf: ' + yamlValue(conf.ccf));
    lines.push('    deadline: ' + yamlValue(conf.deadline));
    if (conf.location) lines.push('    location: ' + yamlValue(conf.location));
    if (conf.website) lines.push('    website: ' + yamlValue(conf.website));
    if (conf.priority) lines.push('    priority: ' + yamlValue(conf.priority));
    if (conf.note) lines.push('    note: ' + yamlValue(conf.note));
    lines.push('');
  });

  return lines.join('\n');
}

async function main() {
  console.log(`Fetching conference data from ${SOURCE_URL} ...`);
  const html = await fetchHtml(SOURCE_URL);
  const rows = extractRowObjects(html);
  console.log(`Found ${rows.length} conference rows in source.`);

  const conferences = buildConferenceEntries(rows);
  console.log(`Keeping ${conferences.length} conferences after filtering.`);

  const yaml = buildYaml(conferences);
  fs.writeFileSync(OUTPUT_FILE, yaml, 'utf8');
  console.log(`✅ Updated ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error('❌ Failed to update conferences:', err);
  process.exit(1);
});
