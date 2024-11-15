---
title: 使用Python提取城市路网
date: 2024-11-12 11:10:45
tags:
  - 路网
  - Python
categories: 
  - 时空数据
cover: /img/roadNetwork.png
sticky: 1
---
# 路网提取教程V1.0
Start Lab-孙杨洋 时空实验室 2024-05-09 重庆
## 一.基于Python的路网提取
### 1.1 环境准备
#### 1.1.1 Python的安装
Python下载：https://www.python.org/ （确保安装pip，如果希望环境分离可以安装conda：https://www.anaconda.com/download ）\
Pycharm下载：https://www.jetbrains.com/zh-cn/pycharm/ (建议安装jupter插件进行交互式编写)
#### 1.1.2 必要的Python包的安装
```
pip install osmnx geopandas pandas numpy shapely
```
- **osmnx** 是一个基于 OpenStreetMap 数据的 Python 库，用于从 OpenStreetMap 获取、构建、分析和可视化街道网络和其他地理空间数据。通过 osmnx，我们可以轻松地检索全球范围内的街道网络数据，并进行各种空间分析，如路网分析、路径规划和空间可视化。
- **Pandas**（Python Data Analysis Library）是一个提供高性能、易于使用的数据结构和数据分析工具的Python库。它主要用于数据处理和数据分析，可以处理各种数据格式，如CSV文件、Excel表格、SQL数据库等，提供了丰富的数据操作和处理功能。
- **NumPy**（Numerical Python）是Python中用于科学计算的一个核心库。它提供了多维数组对象（例如ndarray）、各种派生对象（例如masked arrays和matrices）、以及用于数组快速操作的各种函数。NumPy是许多其他科学计算库的基础，因为它提供了高效的数组操作和运算功能。
- **Geopandas** 是在Pandas基础上扩展的地理空间数据处理库，提供了地理空间数据结构和方便的数据操作功能。它使得在 Python 中处理地理空间数据变得简单和高效，可以处理各种地理空间数据格式，如Shapefile、GeoJSON等，并提供了空间数据的分析和可视化功能。
- **Shapely** 是一个 Python 库，用于处理几何对象，如点、线和多边形。它提供了创建、分析和操作这些对象的功能，可用于地理空间数据处理和分析。Shapely 简化了空间数据的操作，使得在Python中处理地理信息变得更加简单和高效。
- **math** 是 Python 标准库中的一个模块，提供了许多数学函数和常量。

#### 1.1.3 导入Python包
```
import osmnx as ox
import geopandas as gpd
import pandas as pd
import numpy as np
import geopandas as gpd
from shapely import wkt
from shapely.geometry import LineString
import math
```
### 1.2 路网的提取
#### 1.2.1 根据城市名称获取路网
```
place_name = "Chendu, China"
graph = ox.graph_from_place(place_name, network_type='drive')
```
place_name指定城市位置（格式为城市，国家），graph是根据位置获得的路网图，类型为多图。
#### 1.2.2 根据经纬度边界获取路网
```
north, south, east, west = 30.67, 30.65, 104.07, 104.05
graph = ox.graph_from_bbox(north, south, east, west, network_type='drive')
```
north, south, east, west指定经纬度的边界（四个参数亦可以使用bbox代替），graph是根据位置获得的路网图，类型为多图。
#### 1.2.3 其他获取路网的方式
其他获取路网的方式请参考：https://github.com/gboeing/osmnx
### 1.3 路网的处理
#### 1.3.1 提取节点与边
```
gdf_nodes, gdf_edges = ox.graph_to_gdfs(graph)
```
gdf_nodes是点的集合，gdf_edges是边的集合，它们的类型都是GeoDataFrame，包含字段见下表：

**gdf_nodes**：

| 字段名        | 解释            | 数据类型 |
|--------------|-----------------|---------|
| y            | 纬度            | double   |
| x            | 经度            | double   |
| street_count | 包含点的路段数量 | int      |
| highway      | 道路类型        | string   |
| geometry     | 几何形状        | Point    |

**gdf_edges**：

| 字段名        | 解释             | 数据类型  |
|--------------|----------------- |-----------|
| u (index)    | 起点id           | double    |
| v (index)    | 终点id           | double    |
| key (index)  | 权重             | int       |
| osmid        | 道路osmID        | List(long)|
| oneway       | 是否单向         | boolean   |
| highway      | 道路类型         | string    |
| reversed     | 是否反转         | boolean   |
| length       | 路段长度         | double    |
| geometry     | 几何形状         | LineString |
| lanes        | 车道数量         | int       |
| ref          | 道路编码         | string    |
| name         | 道路名称         | string    |
| brigde       | 是否桥梁         | string(Yes/No/NaN) |
| tunnel       | 是否隧道         | string(Yes/No/NaN) |
| maxspeed     | 最大限速         | int       |
| junction     | 路口类型         | string    |
| access       | 使用权           | string    |
| width        | 道路宽度         | double    |
| landuse      | 土地利用         | string    |

为提取路网，我们需要使用到gdf_edges中的u,v获取路段的起点与终点，通过oneway字段与reversed确定路段方向,通过length获取路段长度。

#### 1.3.2 取消索引并生成唯一id
```
gdf_edges.reset_index(inplace=True)
gdf_edges['id']=np.arange(gdf_edges.shape[0])
```
#### 1.3.3 更具路网的字段确定需要处理的列
假设路网的字段为：起点id，终点id，路段长度，路段方向（未定义-1，双向1，正向2，反向3），路段等级，路段限速。
```
#添加需要处理的列
gdf_edges['start_id'] = gdf_edges['u']
gdf_edges['end_id'] = gdf_edges['v']
gdf_edges['lengthInMeter'] = gdf_edges['length']
gdf_edges['direction'] = -1
gdf_edges['level'] = 1
gdf_edges['speed_limit'] = gdf_edges['maxspeed']
#根据条件设置 direction 列的值
gdf_edges['direction'] = gdf_edges.apply(lambda row: 2 if row['oneway'] == True and row['reversed'] == False else (3 if row['oneway'] == True and row['reversed'] == True else 1), axis=1)
#速度限制取最大值
gdf_selected['speed_limit'] = gdf_selected['speed_limit'].apply(lambda x: x if isinstance(x, int) else max(x))
```
#### 1.3.4 成功新生成路段起点与终点id
```
# 合并两列并找出所有唯一值
unique_values = pd.concat([gdf_edges['start_id'], gdf_edges['end_id']]).unique()
# 为每个唯一值生成编号，格式为 "t_n"
value_to_id = {val: f"t_{i+1}" for i, val in enumerate(unique_values)}
# 更新DataFrame中的列
gdf_edges['start_id'] = gdf_edges['start_id'].map(value_to_id)
gdf_edges['end_id'] = gdf_edges['end_id'].map(value_to_id)
# 去除 't_' 前缀
gdf_edges['start_id'] = gdf_edges['start_id'].str.replace('t_', '')
gdf_edges['end_id'] = gdf_edges['end_id'].str.replace('t_', '')
```
#### 1.3.5 异常值的处理
```
#空值的填充
gdf_edges = gdf_edges.fillna(0)
```
#### 1.3.6 路网数据的存储
```
gdf_selected = gdf_edges[['index', 'geometry', 'start_id', 'end_id', 'direction', 'level' , 'speed_limit','lengthInMeter']]
gdf_selected.to_csv('outputchengdu.csv', sep='|', index=False)
```
其中分隔符设置为"|"，不存储索引。