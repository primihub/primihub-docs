---
slug: primihub-release-v1.6.11
title: PrimiHub v1.6.11 发布
authors: PrimiHub
tags: [release]
---

开源隐私计算平台 PrimiHub [v1.6.11](https://github.com/primihub/primihub/releases/tag/1.6.11) 发布了！

## 新增特性

- 隐私求交增加TEE支持
- 缺失值填充功能可根据字段类型自动匹配适用的填充方法，支持4种缺失值处理方法
- 模型评估增加多种评估指标（分类、回归），支持ROC图展示
  1. 分类：Acc、Precision、Recall、F1、AUC、KS、ROC
  2. 回归：EV、MaxE、MAE、MSE、RMSE、MedAE、R2
- 联邦数据预处理支持TargetEncoder特征编码
- 支持python代码调用mpc联合统计功能，可在联邦学习中使用

## 优化

- 提升交互一致性：隐私求交、隐匿查询的交互统一
- 隐私求交、隐匿查询结果支持在线预览

## 相关仓库

* [PrimiHub](https://github.com/primihub/primihub)
* [PrimiHub Platform](https://github.com/primihub/primihub-platform)