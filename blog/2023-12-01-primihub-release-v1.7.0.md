---
slug: primihub-release-v1.7.0
title: PrimiHub v1.7.0 发布
authors: PrimiHub
tags: [release]
---

开源隐私计算平台 PrimiHub [v1.7.0](https://github.com/primihub/primihub/releases/tag/1.7.0) 发布了！

## 新增特性

- 增加数据流通网络，支持公开数据与OpenMPC平台互通，降低陌生节点数据流通门槛；
- 在我的资源下增加“可申请的资源”菜单，允许节点获取其他未连接节点公开数据集；
- 联邦学习统计量支持最大、最小值、加和、范数、分位数、平均数、方差、并集、频繁项；
- PIR支持自定义列作为查询关键字；
- MPC LR任务配置中支持自定义某些列不参与计算。

## 优化

- 错误任务日志显示到具体出错位置，便于定位问题；
- 联邦数据预处理添加参数限制条件，提示错误或不支持的参数信息；
- 修复Sigmoid函数溢出问题；
- 统一LOG格式，增加任务id，便于前端显示任务相关日志。

## 相关仓库

* [PrimiHub](https://github.com/primihub/primihub)
* [PrimiHub Platform](https://github.com/primihub/primihub-platform)