---
slug: primihub-release-v1.6.9
title: PrimiHub v1.6.9 发布
authors: PrimiHub
tags: [release]
---

开源隐私计算平台 PrimiHub [v1.6.9](https://github.com/primihub/primihub/releases/tag/1.6.9) 发布了！

## 新增特性

- 将PIR任务分为离线和在线两部分，生成查询数据库部分离线生成，在线部分从生成的离线数据库文件中加载，完成在线部分逻辑
- 纵向联邦逻辑回归支持CKKS同态密文模式训练
- 支持联邦线性回归模型

## 优化

- 将aby3代码从PrimiHub迁移到单独的库
- 修复PSI结果集中文显示问题
- kkrt16 PSI支持macos
- 修复神经网络使用GPU设备训练和预测报错的问题
- 修复web端PSI结果展示问题
- 修复web端复制模型任务节点无法删除问题

## 相关仓库

* [PrimiHub](https://github.com/primihub/primihub)
* [PrimiHub Platform](https://github.com/primihub/primihub-platform)