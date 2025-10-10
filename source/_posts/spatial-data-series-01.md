---
title: 时空数据处理系列（一）：数据获取与预处理
date: 2024-12-19 16:00:00
tags:
  - 时空数据
  - 数据预处理
  - Python
  - 系列教程
categories: 
  - 时空数据系列
cover: /img/spatial-data-01.png
series: "时空数据处理完整指南"
---

# 时空数据处理系列（一）：数据获取与预处理

> 这是时空数据处理系列教程的第一篇，我们将从最基础的数据获取开始，逐步构建完整的时空数据处理流水线。

## 🎯 系列概览

本系列将包含以下内容：

1. **数据获取与预处理** ← 当前文章
2. [数据清洗与质量评估](/2024/12/19/spatial-data-series-02/)
3. [空间索引与查询优化](/2024/12/19/spatial-data-series-03/)
4. [轨迹数据挖掘算法](/2024/12/19/spatial-data-series-04/)
5. [实时数据流处理](/2024/12/19/spatial-data-series-05/)
6. [可视化与交互式分析](/2024/12/19/spatial-data-series-06/)

## 📊 数据源介绍

### 1. OpenStreetMap (OSM)
```python
import osmnx as ox

# 获取城市路网数据
place_name = "Chongqing, China"
graph = ox.graph_from_place(place_name, network_type='drive')

# 转换为GeoDataFrame
nodes, edges = ox.graph_to_gdfs(graph)
print(f"节点数量: {len(nodes)}")
print(f"边数量: {len(edges)}")
```

### 2. GPS轨迹数据
```python
import pandas as pd
import geopandas as gpd
from shapely.geometry import Point

# 读取GPS轨迹数据
def load_trajectory_data(file_path):
    df = pd.read_csv(file_path)
    
    # 创建几何点
    geometry = [Point(xy) for xy in zip(df.longitude, df.latitude)]
    gdf = gpd.GeoDataFrame(df, geometry=geometry)
    
    return gdf

# 示例数据结构
trajectory_columns = [
    'vehicle_id',    # 车辆ID
    'timestamp',     # 时间戳
    'latitude',      # 纬度
    'longitude',     # 经度
    'speed',         # 速度
    'heading'        # 方向角
]
```

## 🔧 数据预处理流程

### 步骤1：数据验证
```python
def validate_gps_data(df):
    """验证GPS数据的有效性"""
    
    # 检查坐标范围
    lat_valid = (df['latitude'] >= -90) & (df['latitude'] <= 90)
    lon_valid = (df['longitude'] >= -180) & (df['longitude'] <= 180)
    
    # 检查时间戳
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    
    # 过滤无效数据
    valid_data = df[lat_valid & lon_valid].copy()
    
    print(f"原始数据: {len(df)} 条")
    print(f"有效数据: {len(valid_data)} 条")
    print(f"数据质量: {len(valid_data)/len(df)*100:.2f}%")
    
    return valid_data
```

### 步骤2：异常检测
```python
import numpy as np

def detect_outliers(gdf, speed_threshold=120):
    """检测轨迹中的异常点"""
    
    # 计算点间距离和速度
    gdf = gdf.sort_values(['vehicle_id', 'timestamp'])
    
    # 计算相邻点间的距离和时间差
    gdf['prev_lat'] = gdf.groupby('vehicle_id')['latitude'].shift(1)
    gdf['prev_lon'] = gdf.groupby('vehicle_id')['longitude'].shift(1)
    gdf['prev_time'] = gdf.groupby('vehicle_id')['timestamp'].shift(1)
    
    # 计算距离（使用Haversine公式）
    def haversine_distance(lat1, lon1, lat2, lon2):
        R = 6371  # 地球半径（公里）
        dlat = np.radians(lat2 - lat1)
        dlon = np.radians(lon2 - lon1)
        a = np.sin(dlat/2)**2 + np.cos(np.radians(lat1)) * np.cos(np.radians(lat2)) * np.sin(dlon/2)**2
        c = 2 * np.arcsin(np.sqrt(a))
        return R * c
    
    gdf['distance'] = haversine_distance(
        gdf['prev_lat'], gdf['prev_lon'],
        gdf['latitude'], gdf['longitude']
    )
    
    # 计算速度
    gdf['time_diff'] = (gdf['timestamp'] - gdf['prev_time']).dt.total_seconds() / 3600
    gdf['calculated_speed'] = gdf['distance'] / gdf['time_diff']
    
    # 标记异常点
    outliers = gdf['calculated_speed'] > speed_threshold
    
    print(f"检测到 {outliers.sum()} 个异常点")
    
    return gdf[~outliers]
```

## 📈 数据质量评估

```python
def assess_data_quality(gdf):
    """评估数据质量"""
    
    quality_report = {
        'total_points': len(gdf),
        'unique_vehicles': gdf['vehicle_id'].nunique(),
        'time_span': (gdf['timestamp'].max() - gdf['timestamp'].min()).days,
        'avg_sampling_rate': gdf.groupby('vehicle_id').apply(
            lambda x: (x['timestamp'].max() - x['timestamp'].min()).total_seconds() / len(x)
        ).mean(),
        'spatial_coverage': {
            'lat_range': (gdf['latitude'].min(), gdf['latitude'].max()),
            'lon_range': (gdf['longitude'].min(), gdf['longitude'].max())
        }
    }
    
    return quality_report

# 生成质量报告
quality = assess_data_quality(clean_data)
print("数据质量报告:")
for key, value in quality.items():
    print(f"  {key}: {value}")
```

## 🎯 下期预告

在下一篇文章中，我们将深入探讨：
- 轨迹数据的分段与聚类
- 停留点检测算法
- 数据压缩技术
- 性能优化策略

## 💡 实践建议

1. **始终验证数据质量** - 不要相信任何输入数据
2. **建立数据处理管道** - 自动化重复性工作
3. **保留原始数据** - 便于回溯和验证
4. **文档化处理步骤** - 确保可重现性

---

*这个系列教程将持续更新，欢迎在评论区分享你的经验和问题！*

## 相关资源

- [OSMnx官方文档](https://osmnx.readthedocs.io/)
- [GeoPandas用户指南](https://geopandas.org/en/stable/getting_started.html)
- [时空数据处理最佳实践](https://example.com)

