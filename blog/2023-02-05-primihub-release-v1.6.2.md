---
slug: primihub-release-v1.6.2
title: PrimiHub v1.6.2 发布
authors: PrimiHub
tags: [release]
---

开源隐私计算平台 PrimiHub [v1.6.2](https://github.com/primihub/primihub/releases/tag/1.6.2) 发布了！

## Feature

- 增加差异化私有水平FL算法： DP-SGD
- 用gRPC通信协议取代ZMQ用于FL任务
- 通过在各方之间传输ID来优化heter_xgb
- 修复服务器数据集有重复项时的Pir故障
- PSI支持一个数据集中的多列项目
- 支持TLS用于grpc通信
- 在Linux操作系统中启用了数据集的mysql驱动
- 支持aarch64平台


## 相关仓库

* [PrimiHub](https://github.com/primihub/primihub)
* [PrimiHub Platform](https://github.com/primihub/primihub-platform)
