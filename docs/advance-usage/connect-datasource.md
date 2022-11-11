---
sidebar_position: 2
keywords: [隐私计算数据接入]
description: 介绍如何通过 YAML 文件格式向 PrimiHub 导入数据
---

# 接入你的数据

*** 接入自定义数据集 ***

在 `primihub-node` 启动参数参数 `--config` 指定的 YAML 配置文件可以指定接入的数据集。需要定义 `datasets`。

```yaml
datasets:
  - description: "train_party_2"
    model: "csv"
    source: "/tmp/train_party_2.csv" 
  - description: "test_party_2"
    model: "csv"
    source: "/tmp/test_party_2.csv"
```
## `datasets` 的字段定义

* description：数据集的唯一可读性名称
* model: 数据源类型，例子中是 `csv`
* source: 数据源在 `Node` 运行机器上的绝对路径
