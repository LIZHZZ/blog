---
title: 实用工具
date: 2024-12-19
type: "tools"
layout: "page"
---

# 🛠️ 实用工具集

## 🔢 浮点数二进制转换器

<div class="tool-container">
  <h3>Float (32位单精度)</h3>
  <div class="input-group">
    <label>输入浮点数:</label>
    <input type="number" id="float-input" placeholder="例如: 3.14" step="any">
    <button onclick="convertFloat()">转换</button>
  </div>
  <div id="float-result"></div>
</div>

<div class="tool-container">
  <h3>Double (64位双精度)</h3>
  <div class="input-group">
    <label>输入浮点数:</label>
    <input type="number" id="double-input" placeholder="例如: 3.14159265359" step="any">
    <button onclick="convertDouble()">转换</button>
  </div>
  <div id="double-result"></div>
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
// 浮点数转换函数
function floatToBinary32(num) {
  const buffer = new ArrayBuffer(4);
  const floatView = new Float32Array(buffer);
  const intView = new Uint32Array(buffer);
  
  floatView[0] = num;
  const bits = intView[0];
  const binary = bits.toString(2).padStart(32, '0');
  
  return {
    binary: binary,
    sign: binary[0],
    exponent: binary.slice(1, 9),
    mantissa: binary.slice(9),
    hex: '0x' + bits.toString(16).toUpperCase().padStart(8, '0')
  };
}

function doubleToBinary64(num) {
  const buffer = new ArrayBuffer(8);
  const floatView = new Float64Array(buffer);
  const intView = new Uint32Array(buffer);
  
  floatView[0] = num;
  const low = intView[0];
  const high = intView[1];
  
  const highBinary = high.toString(2).padStart(32, '0');
  const lowBinary = low.toString(2).padStart(32, '0');
  const binary = highBinary + lowBinary;
  
  return {
    binary: binary,
    sign: binary[0],
    exponent: binary.slice(1, 12),
    mantissa: binary.slice(12),
    hex: '0x' + high.toString(16).toUpperCase().padStart(8, '0') + low.toString(16).toUpperCase().padStart(8, '0')
  };
}

function convertFloat() {
  const input = document.getElementById('float-input').value;
  const num = parseFloat(input);
  
  if (input === '') {
    document.getElementById('float-result').innerHTML = '<p style="color: red;">请输入一个数字</p>';
    return;
  }
  
  const result = floatToBinary32(num);
  
  document.getElementById('float-result').innerHTML = `
    <div class="coord-result">
      <h4>Float (32位) 结果:</h4>
      <p><strong>原始值:</strong> ${num}</p>
      <p><strong>二进制:</strong> <span style="color: #c62828;">${result.sign}</span> <span style="color: #1565c0;">${result.exponent}</span> <span style="color: #2e7d32;">${result.mantissa}</span></p>
      <p><strong>十六进制:</strong> ${result.hex}</p>
      <p style="font-size: 0.9em; color: #666;">
        <span style="color: #c62828;">■</span> 符号位 
        <span style="color: #1565c0;">■</span> 指数位 (8位)
        <span style="color: #2e7d32;">■</span> 尾数位 (23位)
      </p>
    </div>
  `;
}

function convertDouble() {
  const input = document.getElementById('double-input').value;
  const num = parseFloat(input);
  
  if (input === '') {
    document.getElementById('double-result').innerHTML = '<p style="color: red;">请输入一个数字</p>';
    return;
  }
  
  const result = doubleToBinary64(num);
  
  document.getElementById('double-result').innerHTML = `
    <div class="coord-result">
      <h4>Double (64位) 结果:</h4>
      <p><strong>原始值:</strong> ${num}</p>
      <p><strong>二进制:</strong> <span style="color: #c62828;">${result.sign}</span> <span style="color: #1565c0;">${result.exponent}</span> <span style="color: #2e7d32;">${result.mantissa}</span></p>
      <p><strong>十六进制:</strong> ${result.hex}</p>
      <p style="font-size: 0.9em; color: #666;">
        <span style="color: #c62828;">■</span> 符号位 
        <span style="color: #1565c0;">■</span> 指数位 (11位)
        <span style="color: #2e7d32;">■</span> 尾数位 (52位)
      </p>
    </div>
  `;
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
}

.input-group label {
  display: inline-block;
  width: 80px;
  font-weight: bold;
}

.input-group input, .tool-container input, .tool-container textarea {
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

