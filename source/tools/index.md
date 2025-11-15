---
title: 实用工具
date: 2024-12-19
type: "tools"
layout: "page"
---

# 🛠️ 实用工具集

## 🔢 数值转换器

<div class="tool-container">
  <h3>整数转换 (32位有符号)</h3>
  <div class="input-group">
    <label>十进制:</label>
    <input type="text" id="int-dec" placeholder="例如: -123">
    <button onclick="intDecToBin()">→ 二进制</button>
  </div>
  <div class="input-group">
    <label>二进制:</label>
    <input type="text" id="int-bin" placeholder="例如: 11111111111111111111111110000101">
    <button onclick="intBinToDec()">→ 十进制</button>
  </div>
  <div id="int-result"></div>
</div>

<div class="tool-container">
  <h3>ZigZag 编码转换</h3>
  <div class="input-group">
    <label>有符号整数:</label>
    <input type="text" id="zigzag-signed" placeholder="例如: -1">
    <button onclick="signedToZigZag()">→ ZigZag</button>
  </div>
  <div class="input-group">
    <label>ZigZag值:</label>
    <input type="text" id="zigzag-unsigned" placeholder="例如: 1">
    <button onclick="zigZagToSigned()">→ 有符号</button>
  </div>
  <div id="zigzag-result"></div>
</div>

<div class="tool-container">
  <h3>Float (32位单精度)</h3>
  <div class="input-group">
    <label>十进制:</label>
    <input type="number" id="float-dec" placeholder="例如: 3.14" step="any">
    <button onclick="floatDecToBin()">→ 二进制</button>
  </div>
  <div class="input-group">
    <label>二进制:</label>
    <input type="text" id="float-bin" placeholder="32位二进制">
    <button onclick="floatBinToDec()">→ 十进制</button>
  </div>
  <div id="float-result"></div>
</div>

<div class="tool-container">
  <h3>Double (64位双精度)</h3>
  <div class="input-group">
    <label>十进制:</label>
    <input type="number" id="double-dec" placeholder="例如: 3.14159265359" step="any">
    <button onclick="doubleDecToBin()">→ 二进制</button>
  </div>
  <div class="input-group">
    <label>二进制:</label>
    <input type="text" id="double-bin" placeholder="64位二进制">
    <button onclick="doubleBinToDec()">→ 十进制</button>
  </div>
  <div id="double-result"></div>
</div>

<div class="tool-container">
  <h3>📜 转换历史</h3>
  <button onclick="clearHistory()" style="margin-bottom: 10px;">清空历史</button>
  <div id="history-list" style="max-height: 300px; overflow-y: auto;"></div>
</div>

<div class="tool-container">
  <h3>🔀 异或计算器</h3>
  <div class="input-group" style="margin-bottom: 15px;">
    <label style="min-width: 120px;">数据类型:</label>
    <select id="xor-type" style="padding: 8px; border: 1px solid #ddd; border-radius: 5px; flex: 1;">
      <option value="int">整数 (32位)</option>
      <option value="float" selected>Float (32位单精度浮点数)</option>
      <option value="double">Double (64位双精度浮点数)</option>
    </select>
  </div>
  <div class="input-group">
    <label>操作数1:</label>
    <input type="text" id="xor-input1" placeholder="十进制浮点数或二进制">
    <select id="xor-base1" style="padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
      <option value="dec">十进制</option>
      <option value="bin">二进制</option>
      <option value="hex">十六进制</option>
    </select>
  </div>
  <div class="input-group">
    <label>操作数2:</label>
    <input type="text" id="xor-input2" placeholder="十进制浮点数或二进制">
    <select id="xor-base2" style="padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
      <option value="dec">十进制</option>
      <option value="bin">二进制</option>
      <option value="hex">十六进制</option>
    </select>
  </div>
  <div class="input-group" style="margin-top: 10px; flex-wrap: wrap;">
    <label style="min-width: auto; margin-right: 15px;">
      <input type="checkbox" id="xor-show-binary" checked style="margin-right: 5px;">
      显示二进制表示
    </label>
    <label style="min-width: auto; margin-right: 15px;">
      <input type="checkbox" id="xor-show-hex" checked style="margin-right: 5px;">
      显示十六进制表示
    </label>
  </div>
  <button onclick="calculateXOR()">计算异或</button>
  <div id="xor-result"></div>
</div>

## 📍 坐标转换工具

<div class="tool-container">
  <h3>经纬度坐标转换</h3>
  <div class="input-group">
    <label>纬度:</label>
    <input type="number" id="lat" placeholder="30.6667" step="0.0001">
  </div>
  <div class="input-group">
    <label>经度:</label>
    <input type="number" id="lng" placeholder="104.0667" step="0.0001">
  </div>
  <button onclick="convertCoordinates()">转换坐标</button>
  <div id="result"></div>
</div>

## 📏 距离计算器

<div class="tool-container">
  <h3>两点间距离计算</h3>
  <div class="coord-input">
    <h4>起点</h4>
    <input type="number" id="lat1" placeholder="纬度" step="0.0001">
    <input type="number" id="lng1" placeholder="经度" step="0.0001">
  </div>
  <div class="coord-input">
    <h4>终点</h4>
    <input type="number" id="lat2" placeholder="纬度" step="0.0001">
    <input type="number" id="lng2" placeholder="经度" step="0.0001">
  </div>
  <button onclick="calculateDistance()">计算距离</button>
  <div id="distance-result"></div>
</div>

## 📊 数据格式转换

<div class="tool-container">
  <h3>CSV to GeoJSON 转换器</h3>
  <textarea id="csv-input" placeholder="粘贴CSV数据...&#10;lat,lng,name&#10;30.6667,104.0667,重庆大学"></textarea>
  <button onclick="convertToGeoJSON()">转换为GeoJSON</button>
  <textarea id="geojson-output" readonly placeholder="GeoJSON输出..."></textarea>
</div>

## 🎨 轨迹可视化

<div class="tool-container">
  <h3>轨迹数据预览</h3>
  <div id="trajectory-map" style="height: 300px; border: 1px solid #ddd;"></div>
  <input type="file" id="trajectory-file" accept=".csv,.json" onchange="loadTrajectory(event)">
  <p class="help-text">上传CSV或JSON格式的轨迹数据文件</p>
</div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

<script>
// 历史记录
let conversionHistory = [];

function addToHistory(type, from, to) {
  const timestamp = new Date().toLocaleString('zh-CN');
  conversionHistory.unshift({type, from, to, timestamp});
  if (conversionHistory.length > 20) conversionHistory.pop();
  updateHistoryDisplay();
}

function updateHistoryDisplay() {
  const historyDiv = document.getElementById('history-list');
  if (!historyDiv) return;
  
  if (conversionHistory.length === 0) {
    historyDiv.innerHTML = '<p style="color: #999;">暂无转换记录</p>';
    return;
  }
  
  historyDiv.innerHTML = conversionHistory.map(function(item) {
    // 格式化显示内容
    let displayContent = '';
    
    // 处理异或运算历史记录
    if (item.type === '异或运算' && item.from) {
      // 格式：操作数1(十进制)：操作数1(二进制)：操作数2(十进制)：操作数2(二进制)：xor：结果
      // 使用限制分割次数的方式，确保结果值（可能包含特殊字符）能正确解析
      const firstSplit = item.from.split('：xor：');
      if (firstSplit.length === 2) {
        const beforeResult = firstSplit[0];
        const result = firstSplit[1];
        const parts = beforeResult.split('：');
        if (parts.length >= 4) {
          const num1Dec = parts[0];
          const num1Bin = parts[1];
          const num2Dec = parts[2];
          const num2Bin = parts[3];
          
          // 格式化二进制显示
          const formatBin = (bin) => {
            if (bin.length === 32) {
              // 32位：每8位一组
              return bin.replace(/(.{8})/g, '$1 ').trim();
            } else if (bin.length === 64) {
              // 64位：每8位一组
              return bin.replace(/(.{8})/g, '$1 ').trim();
            }
            return bin;
          };
          
          displayContent = `<div style="font-size: 0.85em; line-height: 1.4;">
            <div style="margin: 3px 0;"><strong>操作数1:</strong> 十进制 <code style="background: #e3f2fd; padding: 2px 5px; border-radius: 3px; color: #1565c0;">${num1Dec}</code>，二进制 <code style="background: #fff3cd; padding: 2px 5px; border-radius: 3px; color: #856404; font-family: monospace; font-size: 0.9em; word-break: break-all;">${formatBin(num1Bin)}</code></div>
            <div style="margin: 3px 0;"><strong>操作数2:</strong> 十进制 <code style="background: #e3f2fd; padding: 2px 5px; border-radius: 3px; color: #1565c0;">${num2Dec}</code>，二进制 <code style="background: #fff3cd; padding: 2px 5px; border-radius: 3px; color: #856404; font-family: monospace; font-size: 0.9em; word-break: break-all;">${formatBin(num2Bin)}</code></div>
            <div style="margin: 3px 0; padding-top: 5px; border-top: 1px solid #ddd;"><strong>异或结果:</strong> <code style="background: #e8f5e9; padding: 2px 5px; border-radius: 3px; color: #2e7d32; font-weight: bold;">${result}</code></div>
          </div>`;
        } else {
          // 如果格式不正确，显示原始内容
          displayContent = `<div style="font-size: 0.85em; line-height: 1.3;">
            <div style="margin: 2px 0;">${item.from}</div>
          </div>`;
        }
      } else {
        // 兼容旧格式：如果格式不正确，显示原始内容
        displayContent = `<div style="font-size: 0.85em; line-height: 1.3;">
          <div style="margin: 2px 0;">${item.from}</div>
        </div>`;
      }
    } else if (item.type.includes('十进制→二进制') || item.type.includes('二进制→十进制')) {
      // 整数转换：显示十进制和完整二进制
      const decimal = item.type.includes('十进制→二进制') ? item.from : item.to;
      const binary = item.type.includes('十进制→二进制') ? item.to : item.from;
      
      // 确保二进制显示完整32位
      const fullBinary = binary.toString().padStart(32, '0');
      
      // 检查是否为浮点数转换
      if (item.type.includes('Float') || item.type.includes('Double')) {
        // 浮点数格式：符号位 + 指数位 + 尾数位
        let signBit, expBits, mantissaBits;
        if (item.type.includes('Float')) {
          // Float: 1位符号 + 8位指数 + 23位尾数
          signBit = fullBinary.substring(0, 1);
          expBits = fullBinary.substring(1, 9);
          mantissaBits = fullBinary.substring(9, 32);
        } else {
          // Double: 1位符号 + 11位指数 + 52位尾数 (需要64位)
          const doubleBinary = binary.toString().padStart(64, '0');
          signBit = doubleBinary.substring(0, 1);
          expBits = doubleBinary.substring(1, 12);
          mantissaBits = doubleBinary.substring(12, 64);
        }
        
        displayContent = `<div style="font-size: 0.85em; line-height: 1.3;">
          <div style="margin: 2px 0;"><strong>十进制:</strong> ${decimal}</div>
          <div style="margin: 2px 0;"><strong>二进制:</strong> ${signBit} ${expBits} ${mantissaBits}</div>
        </div>`;
      } else {
        // 整数转换：每8位一组
        const formattedBinary = fullBinary.replace(/(.{8})/g, '$1 ').trim();
        
        displayContent = `<div style="font-size: 0.85em; line-height: 1.3;">
          <div style="margin: 2px 0;"><strong>十进制:</strong> ${decimal}</div>
          <div style="margin: 2px 0; word-break: break-all;"><strong>二进制:</strong> ${formattedBinary}</div>
        </div>`;
      }
    } else {
      // 其他转换类型保持原格式
      displayContent = `<div style="font-size: 0.85em; line-height: 1.3;">
        <div style="margin: 2px 0;">从: <code style="background: #e3f2fd; padding: 2px 5px; border-radius: 3px; color: #1565c0;">${item.from}</code></div>
        <div style="margin: 2px 0;">到: <code style="background: #e8f5e9; padding: 2px 5px; border-radius: 3px; color: #2e7d32;">${item.to}</code></div>
      </div>`;
    }
    
    return '<div style="padding: 6px; margin: 2px 0; background: #f8f9fa; border-radius: 5px; border-left: 3px solid #007bff;">' +
      displayContent +
      '</div>';
  }).join('');
}

function clearHistory() {
  conversionHistory = [];
  updateHistoryDisplay();
}

// 整数转换
function intDecToBin() {
  const input = document.getElementById('int-dec').value.trim();
  if (!input) {
    document.getElementById('int-result').innerHTML = '<p style="color: red;">请输入十进制整数</p>';
    return;
  }
  
  const num = parseInt(input);
  if (isNaN(num)) {
    document.getElementById('int-result').innerHTML = '<p style="color: red;">无效的十进制数</p>';
    return;
  }
  
  const binary = (num >>> 0).toString(2).padStart(32, '0');
  const hex = '0x' + (num >>> 0).toString(16).toUpperCase().padStart(8, '0');
  
  document.getElementById('int-bin').value = binary;
  document.getElementById('int-result').innerHTML = `
    <div class="coord-result">
      <h4>整数转换结果:</h4>
      <p><strong>十进制:</strong> ${num}</p>
      <p><strong>二进制:</strong> ${binary}</p>
      <p><strong>十六进制:</strong> ${hex}</p>
      <p><strong>无符号值:</strong> ${num >>> 0}</p>
    </div>
  `;
  
  addToHistory('整数 (十进制→二进制)', num, binary);
}

function intBinToDec() {
  const input = document.getElementById('int-bin').value.trim();
  if (!input) {
    document.getElementById('int-result').innerHTML = '<p style="color: red;">请输入二进制数</p>';
    return;
  }
  
  if (!/^[01]+$/.test(input)) {
    document.getElementById('int-result').innerHTML = '<p style="color: red;">无效的二进制数</p>';
    return;
  }
  
  const unsigned = parseInt(input, 2);
  const signed = unsigned > 0x7FFFFFFF ? unsigned - 0x100000000 : unsigned;
  const hex = '0x' + unsigned.toString(16).toUpperCase().padStart(8, '0');
  
  document.getElementById('int-dec').value = signed;
  document.getElementById('int-result').innerHTML = `
    <div class="coord-result">
      <h4>整数转换结果:</h4>
      <p><strong>二进制:</strong> ${input.padStart(32, '0')}</p>
      <p><strong>有符号十进制:</strong> ${signed}</p>
      <p><strong>无符号十进制:</strong> ${unsigned}</p>
      <p><strong>十六进制:</strong> ${hex}</p>
    </div>
  `;
  
  addToHistory('整数 (二进制→十进制)', input, signed);
}

// ZigZag编码
function signedToZigZag() {
  const input = document.getElementById('zigzag-signed').value.trim();
  if (!input) {
    document.getElementById('zigzag-result').innerHTML = '<p style="color: red;">请输入有符号整数</p>';
    return;
  }
  
  const num = parseInt(input);
  if (isNaN(num)) {
    document.getElementById('zigzag-result').innerHTML = '<p style="color: red;">无效的整数</p>';
    return;
  }
  
  const zigzag = (num << 1) ^ (num >> 31);
  const binary = (zigzag >>> 0).toString(2);
  
  document.getElementById('zigzag-unsigned').value = zigzag >>> 0;
  document.getElementById('zigzag-result').innerHTML = `
    <div class="coord-result">
      <h4>ZigZag 编码结果:</h4>
      <p><strong>原始值 (有符号):</strong> ${num}</p>
      <p><strong>ZigZag 值:</strong> ${zigzag >>> 0}</p>
      <p><strong>二进制:</strong> ${binary}</p>
      <p style="font-size: 0.9em; color: #666;">
        ZigZag 编码将有符号整数映射到无符号整数<br>
        公式: (n << 1) ^ (n >> 31)
      </p>
    </div>
  `;
  
  addToHistory('ZigZag (有符号→无符号)', num, zigzag >>> 0);
}

function zigZagToSigned() {
  const input = document.getElementById('zigzag-unsigned').value.trim();
  if (!input) {
    document.getElementById('zigzag-result').innerHTML = '<p style="color: red;">请输入ZigZag值</p>';
    return;
  }
  
  const zigzag = parseInt(input);
  if (isNaN(zigzag) || zigzag < 0) {
    document.getElementById('zigzag-result').innerHTML = '<p style="color: red;">无效的ZigZag值</p>';
    return;
  }
  
  const num = (zigzag >>> 1) ^ -(zigzag & 1);
  const binary = (zigzag >>> 0).toString(2);
  
  document.getElementById('zigzag-signed').value = num;
  document.getElementById('zigzag-result').innerHTML = `
    <div class="coord-result">
      <h4>ZigZag 解码结果:</h4>
      <p><strong>ZigZag 值:</strong> ${zigzag}</p>
      <p><strong>原始值 (有符号):</strong> ${num}</p>
      <p><strong>二进制:</strong> ${binary}</p>
      <p style="font-size: 0.9em; color: #666;">
        ZigZag 解码将无符号整数还原为有符号整数<br>
        公式: (n >>> 1) ^ -(n & 1)
      </p>
    </div>
  `;
  
  addToHistory('ZigZag (无符号→有符号)', zigzag, num);
}

// Float转换
function floatDecToBin() {
  const input = document.getElementById('float-dec').value;
  const num = parseFloat(input);
  
  if (input === '') {
    document.getElementById('float-result').innerHTML = '<p style="color: red;">请输入浮点数</p>';
    return;
  }
  
  const buffer = new ArrayBuffer(4);
  const floatView = new Float32Array(buffer);
  const intView = new Uint32Array(buffer);
  
  floatView[0] = num;
  const bits = intView[0];
  const binary = bits.toString(2).padStart(32, '0');
  const hex = '0x' + bits.toString(16).toUpperCase().padStart(8, '0');
  
  document.getElementById('float-bin').value = binary;
  document.getElementById('float-result').innerHTML = `
    <div class="coord-result">
      <h4>Float 转换结果:</h4>
      <p><strong>十进制:</strong> ${num}</p>
      <p><strong>二进制:</strong> <span style="color: #c62828;">${binary[0]}</span> <span style="color: #1565c0;">${binary.slice(1, 9)}</span> <span style="color: #2e7d32;">${binary.slice(9)}</span></p>
      <p><strong>十六进制:</strong> ${hex}</p>
      <p style="font-size: 0.9em; color: #666;">
        <span style="color: #c62828;">■</span> 符号位 
        <span style="color: #1565c0;">■</span> 指数 (8位)
        <span style="color: #2e7d32;">■</span> 尾数 (23位)
      </p>
    </div>
  `;
  
  addToHistory('Float (十进制→二进制)', num, binary);
}

function floatBinToDec() {
  const input = document.getElementById('float-bin').value.trim();
  
  if (!input) {
    document.getElementById('float-result').innerHTML = '<p style="color: red;">请输入32位二进制数</p>';
    return;
  }
  
  if (!/^[01]{32}$/.test(input)) {
    document.getElementById('float-result').innerHTML = '<p style="color: red;">请输入有效的32位二进制数</p>';
    return;
  }
  
  const bits = parseInt(input, 2);
  const buffer = new ArrayBuffer(4);
  const intView = new Uint32Array(buffer);
  const floatView = new Float32Array(buffer);
  
  intView[0] = bits;
  const num = floatView[0];
  const hex = '0x' + bits.toString(16).toUpperCase().padStart(8, '0');
  
  document.getElementById('float-dec').value = num;
  document.getElementById('float-result').innerHTML = `
    <div class="coord-result">
      <h4>Float 转换结果:</h4>
      <p><strong>二进制:</strong> <span style="color: #c62828;">${input[0]}</span> <span style="color: #1565c0;">${input.slice(1, 9)}</span> <span style="color: #2e7d32;">${input.slice(9)}</span></p>
      <p><strong>十进制:</strong> ${num}</p>
      <p><strong>十六进制:</strong> ${hex}</p>
      <p style="font-size: 0.9em; color: #666;">
        <span style="color: #c62828;">■</span> 符号位 
        <span style="color: #1565c0;">■</span> 指数 (8位)
        <span style="color: #2e7d32;">■</span> 尾数 (23位)
      </p>
    </div>
  `;
  
  addToHistory('Float (二进制→十进制)', input, num);
}

// 辅助函数：将Float转换为32位二进制
function floatToBinary32(num) {
  const buffer = new ArrayBuffer(4);
  const floatView = new Float32Array(buffer);
  const intView = new Uint32Array(buffer);
  floatView[0] = num;
  return intView[0].toString(2).padStart(32, '0');
}

// 辅助函数：将32位二进制转换为Float
function binary32ToFloat(binary) {
  const bits = parseInt(binary, 2);
  const buffer = new ArrayBuffer(4);
  const intView = new Uint32Array(buffer);
  const floatView = new Float32Array(buffer);
  intView[0] = bits;
  return floatView[0];
}

// 辅助函数：将Double转换为64位二进制
function doubleToBinary64(num) {
  const buffer = new ArrayBuffer(8);
  const floatView = new Float64Array(buffer);
  const intView = new Uint32Array(buffer);
  floatView[0] = num;
  const low = intView[0];
  const high = intView[1];
  const highBinary = high.toString(2).padStart(32, '0');
  const lowBinary = low.toString(2).padStart(32, '0');
  return highBinary + lowBinary;
}

// 辅助函数：将64位二进制转换为Double
function binary64ToDouble(binary) {
  const highBinary = binary.slice(0, 32);
  const lowBinary = binary.slice(32);
  const high = parseInt(highBinary, 2);
  const low = parseInt(lowBinary, 2);
  const buffer = new ArrayBuffer(8);
  const intView = new Uint32Array(buffer);
  const floatView = new Float64Array(buffer);
  intView[0] = low;
  intView[1] = high;
  return floatView[0];
}

// 异或计算器
function calculateXOR() {
  const input1 = document.getElementById('xor-input1').value.trim();
  const input2 = document.getElementById('xor-input2').value.trim();
  const base1 = document.getElementById('xor-base1').value;
  const base2 = document.getElementById('xor-base2').value;
  const dataType = document.getElementById('xor-type').value;
  const showBinary = document.getElementById('xor-show-binary').checked;
  const showHex = document.getElementById('xor-show-hex').checked;
  
  if (!input1 || !input2) {
    document.getElementById('xor-result').innerHTML = '<p style="color: red;">请输入两个操作数</p>';
    return;
  }
  
  let num1, num2, binary1, binary2, binaryResult, result, resultFloat;
  let hex1, hex2, hexResult;
  let bits, binaryGroupSize, hexPadLength;
  
  // 根据数据类型确定位数
  if (dataType === 'float') {
    bits = 32;
    binaryGroupSize = 8;
    hexPadLength = 8;
  } else if (dataType === 'double') {
    bits = 64;
    binaryGroupSize = 8;
    hexPadLength = 16;
  } else {
    bits = 32;
    binaryGroupSize = 8;
    hexPadLength = 8;
  }
  
  // 解析第一个操作数
  try {
    if (base1 === 'dec') {
      if (dataType === 'float' || dataType === 'double') {
        num1 = parseFloat(input1);
        if (isNaN(num1)) {
          throw new Error('无效的浮点数');
        }
      } else {
        if (!/^-?\d+$/.test(input1)) {
          throw new Error('无效的整数');
        }
        num1 = parseInt(input1, 10);
        if (isNaN(num1)) {
          throw new Error('无法解析为整数');
        }
      }
    } else if (base1 === 'bin') {
      if (!/^[01]+$/.test(input1)) {
        throw new Error('无效的二进制数');
      }
      if (input1.length !== bits) {
        throw new Error(`二进制数必须是${bits}位`);
      }
      // 根据类型转换
      if (dataType === 'float') {
        num1 = binary32ToFloat(input1);
        binary1 = input1;
      } else if (dataType === 'double') {
        num1 = binary64ToDouble(input1);
        binary1 = input1;
      } else {
        num1 = parseInt(input1, 2);
        binary1 = input1;
      }
    } else if (base1 === 'hex') {
      const hexStr = input1.replace(/^0x/i, '');
      if (!/^[0-9A-Fa-f]+$/.test(hexStr)) {
        throw new Error('无效的十六进制数');
      }
      if (hexStr.length !== hexPadLength / 2) {
        throw new Error(`十六进制数必须是${hexPadLength/2}位`);
      }
      const hexNum = parseInt(hexStr, 16);
      if (dataType === 'float') {
        const buffer = new ArrayBuffer(4);
        const intView = new Uint32Array(buffer);
        const floatView = new Float32Array(buffer);
        intView[0] = hexNum;
        num1 = floatView[0];
        binary1 = floatToBinary32(num1);
      } else if (dataType === 'double') {
        // 需要处理64位
        const buffer = new ArrayBuffer(8);
        const intView = new Uint32Array(buffer);
        const floatView = new Float64Array(buffer);
        // 对于64位，需要分割高低位
        const highHex = hexStr.slice(0, 8);
        const lowHex = hexStr.slice(8);
        intView[0] = parseInt(lowHex, 16);
        intView[1] = parseInt(highHex, 16);
        num1 = floatView[0];
        binary1 = doubleToBinary64(num1);
      } else {
        num1 = hexNum;
        binary1 = (num1 >>> 0).toString(2).padStart(32, '0');
      }
    }
    
    // 如果还没有二进制表示，生成它
    if (!binary1) {
      if (dataType === 'float') {
        binary1 = floatToBinary32(num1);
      } else if (dataType === 'double') {
        binary1 = doubleToBinary64(num1);
      } else {
        binary1 = (num1 >>> 0).toString(2).padStart(32, '0');
      }
    }
  } catch (e) {
    document.getElementById('xor-result').innerHTML = `<p style="color: red;">操作数1错误: ${e.message}</p>`;
    return;
  }
  
  // 解析第二个操作数
  try {
    if (base2 === 'dec') {
      if (dataType === 'float' || dataType === 'double') {
        num2 = parseFloat(input2);
        if (isNaN(num2)) {
          throw new Error('无效的浮点数');
        }
      } else {
        if (!/^-?\d+$/.test(input2)) {
          throw new Error('无效的整数');
        }
        num2 = parseInt(input2, 10);
        if (isNaN(num2)) {
          throw new Error('无法解析为整数');
        }
      }
    } else if (base2 === 'bin') {
      if (!/^[01]+$/.test(input2)) {
        throw new Error('无效的二进制数');
      }
      if (input2.length !== bits) {
        throw new Error(`二进制数必须是${bits}位`);
      }
      if (dataType === 'float') {
        num2 = binary32ToFloat(input2);
        binary2 = input2;
      } else if (dataType === 'double') {
        num2 = binary64ToDouble(input2);
        binary2 = input2;
      } else {
        num2 = parseInt(input2, 2);
        binary2 = input2;
      }
    } else if (base2 === 'hex') {
      const hexStr = input2.replace(/^0x/i, '');
      if (!/^[0-9A-Fa-f]+$/.test(hexStr)) {
        throw new Error('无效的十六进制数');
      }
      if (hexStr.length !== hexPadLength / 2) {
        throw new Error(`十六进制数必须是${hexPadLength/2}位`);
      }
      const hexNum = parseInt(hexStr, 16);
      if (dataType === 'float') {
        const buffer = new ArrayBuffer(4);
        const intView = new Uint32Array(buffer);
        const floatView = new Float32Array(buffer);
        intView[0] = hexNum;
        num2 = floatView[0];
        binary2 = floatToBinary32(num2);
      } else if (dataType === 'double') {
        const buffer = new ArrayBuffer(8);
        const intView = new Uint32Array(buffer);
        const floatView = new Float64Array(buffer);
        const highHex = hexStr.slice(0, 8);
        const lowHex = hexStr.slice(8);
        intView[0] = parseInt(lowHex, 16);
        intView[1] = parseInt(highHex, 16);
        num2 = floatView[0];
        binary2 = doubleToBinary64(num2);
      } else {
        num2 = hexNum;
        binary2 = (num2 >>> 0).toString(2).padStart(32, '0');
      }
    }
    
    if (!binary2) {
      if (dataType === 'float') {
        binary2 = floatToBinary32(num2);
      } else if (dataType === 'double') {
        binary2 = doubleToBinary64(num2);
      } else {
        binary2 = (num2 >>> 0).toString(2).padStart(32, '0');
      }
    }
  } catch (e) {
    document.getElementById('xor-result').innerHTML = `<p style="color: red;">操作数2错误: ${e.message}</p>`;
    return;
  }
  
  // 对二进制进行异或运算
  let xorBits = '';
  for (let i = 0; i < bits; i++) {
    xorBits += (binary1[i] === binary2[i] ? '0' : '1');
  }
  binaryResult = xorBits;
  
  // 将异或结果转换回数值
  if (dataType === 'float') {
    resultFloat = binary32ToFloat(binaryResult);
    const bitsInt = parseInt(binaryResult, 2);
    hexResult = '0x' + bitsInt.toString(16).toUpperCase().padStart(8, '0');
  } else if (dataType === 'double') {
    resultFloat = binary64ToDouble(binaryResult);
    const highBits = parseInt(binaryResult.slice(0, 32), 2);
    const lowBits = parseInt(binaryResult.slice(32), 2);
    const highHex = highBits.toString(16).toUpperCase().padStart(8, '0');
    const lowHex = lowBits.toString(16).toUpperCase().padStart(8, '0');
    hexResult = '0x' + highHex + lowHex;
  } else {
    result = parseInt(binaryResult, 2);
    if (result > 0x7FFFFFFF) {
      result = result - 0x100000000;
    }
    resultFloat = result;
    hexResult = '0x' + parseInt(binaryResult, 2).toString(16).toUpperCase().padStart(8, '0');
  }
  
  // 生成十六进制表示
  if (dataType === 'float') {
    const bits1 = parseInt(binary1, 2);
    const bits2 = parseInt(binary2, 2);
    hex1 = '0x' + bits1.toString(16).toUpperCase().padStart(8, '0');
    hex2 = '0x' + bits2.toString(16).toUpperCase().padStart(8, '0');
  } else if (dataType === 'double') {
    const high1 = parseInt(binary1.slice(0, 32), 2);
    const low1 = parseInt(binary1.slice(32), 2);
    const high2 = parseInt(binary2.slice(0, 32), 2);
    const low2 = parseInt(binary2.slice(32), 2);
    hex1 = '0x' + high1.toString(16).toUpperCase().padStart(8, '0') + low1.toString(16).toUpperCase().padStart(8, '0');
    hex2 = '0x' + high2.toString(16).toUpperCase().padStart(8, '0') + low2.toString(16).toUpperCase().padStart(8, '0');
  } else {
    hex1 = '0x' + parseInt(binary1, 2).toString(16).toUpperCase().padStart(8, '0');
    hex2 = '0x' + parseInt(binary2, 2).toString(16).toUpperCase().padStart(8, '0');
  }
  
  // 格式化二进制显示
  const formatBinary = (binStr) => {
    return binStr.replace(new RegExp(`(.{${binaryGroupSize}})`, 'g'), '$1 ').trim();
  };
  
  // 格式化浮点数显示（IEEE 754结构）
  const formatFloatBinary = (binStr, type) => {
    if (type === 'float') {
      const sign = binStr[0];
      const exp = binStr.slice(1, 9);
      const mantissa = binStr.slice(9);
      return `<span style="color: #c62828;">${sign}</span> <span style="color: #1565c0;">${exp}</span> <span style="color: #2e7d32;">${mantissa}</span>`;
    } else {
      const sign = binStr[0];
      const exp = binStr.slice(1, 12);
      const mantissa = binStr.slice(12);
      return `<span style="color: #c62828;">${sign}</span> <span style="color: #1565c0;">${exp}</span> <span style="color: #2e7d32;">${mantissa}</span>`;
    }
  };
  
  // 构建二进制表示部分
  let binaryDisplay = '';
  if (showBinary) {
    const binaryFormat = (dataType === 'float' || dataType === 'double') 
      ? formatFloatBinary(binary1, dataType) 
      : formatBinary(binary1);
    const binaryFormat2 = (dataType === 'float' || dataType === 'double') 
      ? formatFloatBinary(binary2, dataType) 
      : formatBinary(binary2);
    const binaryFormatResult = (dataType === 'float' || dataType === 'double') 
      ? formatFloatBinary(binaryResult, dataType) 
      : formatBinary(binaryResult);
    
    binaryDisplay = `
      <div style="margin: 15px 0; padding: 10px; background: white; border-radius: 5px;">
        <h5 style="margin: 0 0 10px 0;">二进制表示 (${bits}位${dataType === 'float' ? ' - IEEE 754单精度' : dataType === 'double' ? ' - IEEE 754双精度' : ''}):</h5>
        <div style="font-family: monospace; font-size: ${bits === 64 ? '0.85em' : '0.9em'}; line-height: 1.6;">
          <div style="margin: 5px 0;"><strong>操作数1:</strong> ${binaryFormat}</div>
          <div style="margin: 5px 0;"><strong>操作数2:</strong> ${binaryFormat2}</div>
          <div style="margin: 5px 0; padding-top: 5px; border-top: 1px solid #ddd;"><strong>结果:</strong> ${binaryFormatResult}</div>
        </div>
        ${(dataType === 'float' || dataType === 'double') ? `
          <div style="margin-top: 10px; font-size: 0.85em; color: #666;">
            <span style="color: #c62828;">■</span> 符号位 
            <span style="color: #1565c0;">■</span> 指数位 
            <span style="color: #2e7d32;">■</span> 尾数位
          </div>
        ` : ''}
      </div>
    `;
  }
  
  // 构建十六进制表示部分
  let hexDisplay = '';
  if (showHex) {
    hexDisplay = `
      <div style="margin: 15px 0; padding: 10px; background: white; border-radius: 5px;">
        <h5 style="margin: 0 0 10px 0;">十六进制表示:</h5>
        <div style="font-family: monospace; font-size: 0.9em;">
          <div style="margin: 5px 0;"><strong>操作数1:</strong> ${hex1}</div>
          <div style="margin: 5px 0;"><strong>操作数2:</strong> ${hex2}</div>
          <div style="margin: 5px 0; padding-top: 5px; border-top: 1px solid #ddd;"><strong>结果:</strong> <span style="color: #2e7d32; font-weight: bold;">${hexResult}</span></div>
        </div>
      </div>
    `;
  }
  
  // 显示结果
  const resultValue = (dataType === 'float' || dataType === 'double') ? resultFloat : result;
  const typeName = dataType === 'float' ? 'Float' : dataType === 'double' ? 'Double' : '整数';
  
  document.getElementById('xor-result').innerHTML = `
    <div class="coord-result">
      <h4>异或计算结果 (${typeName}):</h4>
      <div style="margin: 15px 0;">
        <p><strong>操作数1:</strong> ${num1}${dataType === 'float' || dataType === 'double' ? ' (浮点数)' : ''}</p>
        <p><strong>操作数2:</strong> ${num2}${dataType === 'float' || dataType === 'double' ? ' (浮点数)' : ''}</p>
        <p style="font-size: 1.2em; margin: 10px 0;"><strong>异或结果 (${typeName}):</strong> ${resultValue}</p>
        ${(dataType === 'float' || dataType === 'double') ? `<p style="color: #666; font-size: 0.9em;">注意：浮点数异或运算是对IEEE 754二进制表示进行逐位异或，结果可能不是有意义的浮点数</p>` : ''}
      </div>
      
      ${binaryDisplay}
      
      ${hexDisplay}
      
      <div style="margin: 15px 0; padding: 10px; background: #f0f8ff; border-radius: 5px; font-size: 0.9em;">
        <p style="margin: 5px 0;"><strong>公式:</strong> ${num1} ⊕ ${num2} = ${resultValue}</p>
        <p style="margin: 5px 0; color: #666;">异或运算：相同为0，不同为1</p>
      </div>
    </div>
  `;
  
  // 保存历史记录：格式为 操作数1(十进制)：操作数1(二进制)：操作数2(十进制)：操作数2(二进制)：xor：结果
  const formatBinaryForHistory = (binStr) => {
    if (dataType === 'float') {
      return binStr; // 32位
    } else if (dataType === 'double') {
      return binStr; // 64位
    } else {
      return binStr; // 32位整数
    }
  };
  
  const historyStr = `${num1}：${formatBinaryForHistory(binary1)}：${num2}：${formatBinaryForHistory(binary2)}：xor：${resultValue}`;
  addToHistory('异或运算', historyStr, '');
}

// Double转换
function doubleDecToBin() {
  const input = document.getElementById('double-dec').value;
  const num = parseFloat(input);
  
  if (input === '') {
    document.getElementById('double-result').innerHTML = '<p style="color: red;">请输入浮点数</p>';
    return;
  }
  
  const buffer = new ArrayBuffer(8);
  const floatView = new Float64Array(buffer);
  const intView = new Uint32Array(buffer);
  
  floatView[0] = num;
  const low = intView[0];
  const high = intView[1];
  
  const highBinary = high.toString(2).padStart(32, '0');
  const lowBinary = low.toString(2).padStart(32, '0');
  const binary = highBinary + lowBinary;
  const hex = '0x' + high.toString(16).toUpperCase().padStart(8, '0') + low.toString(16).toUpperCase().padStart(8, '0');
  
  document.getElementById('double-bin').value = binary;
  document.getElementById('double-result').innerHTML = `
    <div class="coord-result">
      <h4>Double 转换结果:</h4>
      <p><strong>十进制:</strong> ${num}</p>
      <p><strong>二进制:</strong> <span style="color: #c62828;">${binary[0]}</span> <span style="color: #1565c0;">${binary.slice(1, 12)}</span> <span style="color: #2e7d32;">${binary.slice(12)}</span></p>
      <p><strong>十六进制:</strong> ${hex}</p>
      <p style="font-size: 0.9em; color: #666;">
        <span style="color: #c62828;">■</span> 符号位 
        <span style="color: #1565c0;">■</span> 指数 (11位)
        <span style="color: #2e7d32;">■</span> 尾数 (52位)
      </p>
    </div>
  `;
  
  addToHistory('Double (十进制→二进制)', num, binary);
}

function doubleBinToDec() {
  const input = document.getElementById('double-bin').value.trim();
  
  if (!input) {
    document.getElementById('double-result').innerHTML = '<p style="color: red;">请输入64位二进制数</p>';
    return;
  }
  
  if (!/^[01]{64}$/.test(input)) {
    document.getElementById('double-result').innerHTML = '<p style="color: red;">请输入有效的64位二进制数</p>';
    return;
  }
  
  const highBinary = input.slice(0, 32);
  const lowBinary = input.slice(32);
  const high = parseInt(highBinary, 2);
  const low = parseInt(lowBinary, 2);
  
  const buffer = new ArrayBuffer(8);
  const intView = new Uint32Array(buffer);
  const floatView = new Float64Array(buffer);
  
  intView[0] = low;
  intView[1] = high;
  const num = floatView[0];
  const hex = '0x' + high.toString(16).toUpperCase().padStart(8, '0') + low.toString(16).toUpperCase().padStart(8, '0');
  
  document.getElementById('double-dec').value = num;
  document.getElementById('double-result').innerHTML = `
    <div class="coord-result">
      <h4>Double 转换结果:</h4>
      <p><strong>二进制:</strong> <span style="color: #c62828;">${input[0]}</span> <span style="color: #1565c0;">${input.slice(1, 12)}</span> <span style="color: #2e7d32;">${input.slice(12)}</span></p>
      <p><strong>十进制:</strong> ${num}</p>
      <p><strong>十六进制:</strong> ${hex}</p>
      <p style="font-size: 0.9em; color: #666;">
        <span style="color: #c62828;">■</span> 符号位 
        <span style="color: #1565c0;">■</span> 指数 (11位)
        <span style="color: #2e7d32;">■</span> 尾数 (52位)
      </p>
    </div>
  `;
  
  addToHistory('Double (二进制→十进制)', input, num);
}

// 坐标转换函数
function convertCoordinates() {
  const lat = parseFloat(document.getElementById('lat').value);
  const lng = parseFloat(document.getElementById('lng').value);
  
  if (isNaN(lat) || isNaN(lng)) {
    document.getElementById('result').innerHTML = '<p style="color: red;">请输入有效的坐标值</p>';
    return;
  }
  
  // WGS84 to GCJ02 (火星坐标系)
  const gcj02 = wgs84ToGcj02(lat, lng);
  
  // GCJ02 to BD09 (百度坐标系)
  const bd09 = gcj02ToBd09(gcj02.lat, gcj02.lng);
  
  const result = `
    <div class="coord-result">
      <h4>转换结果:</h4>
      <p><strong>WGS84:</strong> ${lat.toFixed(6)}, ${lng.toFixed(6)}</p>
      <p><strong>GCJ02:</strong> ${gcj02.lat.toFixed(6)}, ${gcj02.lng.toFixed(6)}</p>
      <p><strong>BD09:</strong> ${bd09.lat.toFixed(6)}, ${bd09.lng.toFixed(6)}</p>
    </div>
  `;
  
  document.getElementById('result').innerHTML = result;
}

// 距离计算函数
function calculateDistance() {
  const lat1 = parseFloat(document.getElementById('lat1').value);
  const lng1 = parseFloat(document.getElementById('lng1').value);
  const lat2 = parseFloat(document.getElementById('lat2').value);
  const lng2 = parseFloat(document.getElementById('lng2').value);
  
  if (isNaN(lat1) || isNaN(lng1) || isNaN(lat2) || isNaN(lng2)) {
    document.getElementById('distance-result').innerHTML = '<p style="color: red;">请输入有效的坐标值</p>';
    return;
  }
  
  const distance = haversineDistance(lat1, lng1, lat2, lng2);
  
  document.getElementById('distance-result').innerHTML = `
    <div class="distance-result">
      <h4>距离结果:</h4>
      <p><strong>直线距离:</strong> ${distance.toFixed(2)} 公里</p>
      <p><strong>直线距离:</strong> ${(distance * 1000).toFixed(0)} 米</p>
    </div>
  `;
}

// CSV转GeoJSON
function convertToGeoJSON() {
  const csvText = document.getElementById('csv-input').value;
  
  if (!csvText.trim()) {
    document.getElementById('geojson-output').value = '请输入CSV数据';
    return;
  }
  
  try {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    
    const features = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const properties = {};
      
      let lat, lng;
      
      headers.forEach((header, index) => {
        const value = values[index];
        if (header.toLowerCase().includes('lat')) {
          lat = parseFloat(value);
        } else if (header.toLowerCase().includes('lng') || header.toLowerCase().includes('lon')) {
          lng = parseFloat(value);
        } else {
          properties[header] = value;
        }
      });
      
      if (!isNaN(lat) && !isNaN(lng)) {
        features.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [lng, lat]
          },
          properties: properties
        });
      }
    }
    
    const geojson = {
      type: "FeatureCollection",
      features: features
    };
    
    document.getElementById('geojson-output').value = JSON.stringify(geojson, null, 2);
  } catch (error) {
    document.getElementById('geojson-output').value = '转换失败: ' + error.message;
  }
}

// 工具函数
function wgs84ToGcj02(lat, lng) {
  const a = 6378245.0;
  const ee = 0.00669342162296594323;
  
  let dLat = transformLat(lng - 105.0, lat - 35.0);
  let dLng = transformLng(lng - 105.0, lat - 35.0);
  
  const radLat = lat / 180.0 * Math.PI;
  let magic = Math.sin(radLat);
  magic = 1 - ee * magic * magic;
  const sqrtMagic = Math.sqrt(magic);
  
  dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * Math.PI);
  dLng = (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * Math.PI);
  
  return {
    lat: lat + dLat,
    lng: lng + dLng
  };
}

function gcj02ToBd09(lat, lng) {
  const z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * Math.PI * 3000.0 / 180.0);
  const theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * Math.PI * 3000.0 / 180.0);
  
  return {
    lat: z * Math.sin(theta) + 0.006,
    lng: z * Math.cos(theta) + 0.0065
  };
}

function transformLat(lng, lat) {
  let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * Math.PI) + 20.0 * Math.sin(2.0 * lng * Math.PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lat * Math.PI) + 40.0 * Math.sin(lat / 3.0 * Math.PI)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(lat / 12.0 * Math.PI) + 320 * Math.sin(lat * Math.PI / 30.0)) * 2.0 / 3.0;
  return ret;
}

function transformLng(lng, lat) {
  let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * Math.PI) + 20.0 * Math.sin(2.0 * lng * Math.PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lng * Math.PI) + 40.0 * Math.sin(lng / 3.0 * Math.PI)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(lng / 12.0 * Math.PI) + 300.0 * Math.sin(lng / 30.0 * Math.PI)) * 2.0 / 3.0;
  return ret;
}

function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // 地球半径（公里）
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// 初始化
let trajectoryMap;
document.addEventListener('DOMContentLoaded', function() {
  // 初始化历史记录显示
  updateHistoryDisplay();
  
  // 初始化轨迹地图
  trajectoryMap = L.map('trajectory-map').setView([30.66, 104.06], 10);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(trajectoryMap);
  
  // 支持回车键触发异或计算
  const xorInput1 = document.getElementById('xor-input1');
  const xorInput2 = document.getElementById('xor-input2');
  if (xorInput1) {
    xorInput1.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') calculateXOR();
    });
  }
  if (xorInput2) {
    xorInput2.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') calculateXOR();
    });
  }
});

function loadTrajectory(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      let data;
      if (file.name.endsWith('.json')) {
        data = JSON.parse(e.target.result);
      } else {
        // 简单的CSV解析
        const lines = e.target.result.split('\n');
        const headers = lines[0].split(',');
        data = lines.slice(1).map(line => {
          const values = line.split(',');
          const obj = {};
          headers.forEach((header, i) => {
            obj[header.trim()] = values[i];
          });
          return obj;
        });
      }
      
      // 清除现有图层
      trajectoryMap.eachLayer(layer => {
        if (layer instanceof L.Polyline || layer instanceof L.Marker) {
          trajectoryMap.removeLayer(layer);
        }
      });
      
      // 绘制轨迹
      const points = data.map(point => [
        parseFloat(point.latitude || point.lat),
        parseFloat(point.longitude || point.lng || point.lon)
      ]).filter(point => !isNaN(point[0]) && !isNaN(point[1]));
      
      if (points.length > 0) {
        L.polyline(points, {color: 'red', weight: 3}).addTo(trajectoryMap);
        trajectoryMap.fitBounds(points);
      }
      
    } catch (error) {
      alert('文件解析失败: ' + error.message);
    }
  };
  reader.readAsText(file);
}
</script>

<style>
.tool-container {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  border-left: 4px solid #007bff;
}

.input-group {
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.input-group label {
  font-weight: bold;
  white-space: nowrap;
  min-width: 100px;
}

.input-group input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.tool-container input, .tool-container textarea {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.tool-container textarea {
  width: 100%;
  height: 120px;
  resize: vertical;
  font-family: monospace;
}

.tool-container button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin: 10px 0;
}

.tool-container button:hover {
  background: #0056b3;
}

.coord-input {
  display: inline-block;
  margin: 10px 20px 10px 0;
  vertical-align: top;
}

.coord-input h4 {
  margin: 0 0 10px 0;
  color: #333;
}

.coord-input input {
  display: block;
  margin: 5px 0;
  width: 150px;
}

.coord-result, .distance-result {
  background: #e8f5e8;
  padding: 15px;
  border-radius: 5px;
  margin-top: 15px;
}

.help-text {
  font-size: 12px;
  color: #666;
  margin-top: 10px;
}
</style>

