---
slug: primihub-release-v1.6.10
title: PrimiHub v1.6.10 发布
authors: PrimiHub
tags: [release]
---

开源隐私计算平台 PrimiHub [v1.6.10](https://github.com/primihub/primihub/releases/tag/1.6.10) 发布了！

## 新增特性

- 联邦学习新增数据预处理模块，支持pipeline调用
- 任务启动通过process的形式，避免任务间的干扰
- PrimiHub平台支持用户自定义python代码的执行（实验特性）
- 页面端支持联邦线性回归模型
- 增加部署节点地图展示
- 增加页面取消任务运行

## 优化

1. 修复多机部署时模型指标显示问题
2. 对psi输入原始数据做去重处理
3. PrimiHub 的 gcc 编译器版本支持gcc8以上
4. 优化模型指标页面端展示
5. 修复Window系统下文件UTF-8 BOM头问题

## 相关仓库

* [PrimiHub](https://github.com/primihub/primihub)
* [PrimiHub Platform](https://github.com/primihub/primihub-platform)