---
slug: primihub-release-v1.6.5
title: PrimiHub v1.6.5 发布
authors: PrimiHub
tags: [release]
---

开源隐私计算平台 PrimiHub [v1.6.5](https://github.com/primihub/primihub/releases/tag/1.6.5) 发布了！

## Feature

- 从json文件中读取任务配置
- 将构建文件分割到模块目录中
- 删除通知服务器，使用一个端口来提供服务
- 支持CentOS系统编译

## Bug fix

- 修复了使用同一数据集的多任务并发运行时从mysql读取数据集的错误
- 修复了当数据集过大时注册数据集的超时问题
- 修复了使用不正确的dctor释放游标指针的问题

## 相关仓库

* [PrimiHub](https://github.com/primihub/primihub)
* [PrimiHub Platform](https://github.com/primihub/primihub-platform)