---
slug: primihub-release-v1.6.6
title: 重要更新！PrimiHub v1.6.6 发布
authors: PrimiHub
tags: [release]
---

开源隐私计算平台 PrimiHub [v1.6.6](https://github.com/primihub/primihub/releases/tag/1.6.6) 发布了！

## 新增特性

- 支持通过SDK提交联邦学习任务，包括建模、推理、纵向联邦数据预处理。
- 增加轻量级的meta service服务， 开发调试时可以替代 primihub-platform，方便本地部署运行primihub
- 操作界面去掉了中心节点，机构与机构之间需添加公钥及网关地址建立连接。创建各个任务不需要选择中心节点，可以直接选择已建立连接的可用机构，更符合实际应用场景
- 增加数据集注册时用户自定义数据集中字段类型，修正自动识别出的数据集类型错误的问题
- 支持横向LR多分类和基于PyTorch的横向神经网络模型

## 优化

- 对PSI加载数据集阶段，优化根据指定的列加载数据集替代加载所有数据集的流程
- KKRT16 PSI通信采用GRPC，通信端口使用可配置的统一端口，不再采用每个任务随机获取可用端口的方式
- 增加数据通信过程中重试功能，避免网络抖动导致整个任务的失败

## 相关仓库

* [PrimiHub](https://github.com/primihub/primihub)
* [PrimiHub Platform](https://github.com/primihub/primihub-platform)