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
  if (conversionHistory.length === 0) {
    historyDiv.innerHTML = '<p style="color: #999;">暂无转换记录</p>';
    return;
  }
  
  historyDiv.innerHTML = conversionHistory.map(item => `
    <div style="padding: 10px; margin: 5px 0; background: #f8f9fa; border-radius: 5px; border-left: 3px solid #007bff;">
      <div style="font-size: 0.85em; color: #666;">${item.timestamp}</div>
      <div style="margin: 5px 0;"><strong>${item.type}</strong></div>
      <div style="font-size: 0.9em;">从: <code>${item.from}</code></div>
      <div style="font-size: 0.9em;">到: <code>${item.to}</code></div>
    </div>
  `).join('');
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

// 初始化历史显示
document.addEventListener('DOMContentLoaded', function() {
  updateHistoryDisplay();
});

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

// 初始化轨迹地图
let trajectoryMap;
document.addEventListener('DOMContentLoaded', function() {
  trajectoryMap = L.map('trajectory-map').setView([30.66, 104.06], 10);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(trajectoryMap);
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

