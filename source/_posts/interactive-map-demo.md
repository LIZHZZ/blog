---
title: 交互式路网可视化演示
date: 2024-12-19 15:30:00
tags:
  - 可视化
  - 路网
  - JavaScript
categories: 
  - 数据可视化
cover: /img/map-visualization.png
sticky: 2
---

# 交互式路网可视化

## 在线演示

<div id="mapContainer" style="height: 400px; width: 100%; border: 1px solid #ccc; margin: 20px 0;"></div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

<script>
// 初始化地图
var map = L.map('mapContainer').setView([30.66, 104.06], 13);

// 添加地图图层
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 添加示例路网数据
var roadNetwork = [
    [[30.65, 104.05], [30.67, 104.07]],
    [[30.66, 104.06], [30.68, 104.08]]
];

roadNetwork.forEach(function(road) {
    L.polyline(road, {color: 'red', weight: 3}).addTo(map)
        .bindPopup('路段长度: ' + (Math.random() * 1000).toFixed(0) + 'm');
});
</script>

## 技术实现

这个演示展示了如何在博客中嵌入交互式地图，让读者能够直观地探索路网数据。

### 主要特性
- 🗺️ 交互式地图浏览
- 📊 实时数据展示  
- 🎯 点击查看详细信息
- 📱 响应式设计

### 代码实现
```javascript
// 使用 Leaflet.js 创建交互式地图
var map = L.map('mapContainer').setView([30.66, 104.06], 13);
```

这种方式可以让技术文章更加生动有趣！

