---
slug: primihub-release-v1.6.7
title: PrimiHub v1.6.7 发布
authors: primihub
tags: [release]
---

开源隐私计算平台 PrimiHub [v1.6.7](https://github.com/primihub/primihub/releases/tag/1.6.7) 发布了！

## 新增特性

- Python SDK增加获取任务状态
- 横向联邦支持训练CNN图像分类任务
- 支持通过页面创建联合统计任务
- 横向联邦ROC指标聚合垂直平均计算
- MPC增加联合统计功能
- MPC通信方式改为gRPC

## 优化:

- 修复联邦任务json文件中无'data_set'和'task_name'，使用Python SDK提交任务报错的bug
- 修复docker提交横向联邦任务获取不到第三方ip地址的bug
- 通过页面创建PIR任务，改为单选资源以及交互形式优化
- 修复测试用例存储结果文件路径不一致的问题
- 修复nodeid在配置文件中不生效的问题
- 在数据集注册失败的情况下返回到前端具体注册失败信息

## 相关仓库

* [PrimiHub](https://github.com/primihub/primihub)
* [PrimiHub Platform](https://github.com/primihub/primihub-platform)