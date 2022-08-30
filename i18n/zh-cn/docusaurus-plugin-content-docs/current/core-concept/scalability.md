---
sidebar_position: 2
---

# 可扩展性

*** PrimiHub能扩展什么？ ***

![Extensilbe](./extensilbe-layer.svg)

PrimiHub可以从以下方面进行扩展。

## 数据源接入扩展

PrimiHub支持不同类型的数据源作为数据集注册到PrimiHub资源网络中，用户可以使用数据源扩展框架封装自己的数据源接入到PrimiHub隐私计算网络中。

## 数据消费扩展
隐私计算生成的结果数据可以通过数据消费扩展进行用户自定义的下游数据消费。

## 接入应用扩展

通过通用的应用接口，PrimiHub可以支持大数据、机器学习、IoT等场景的外部应用接入。

## 语法层扩展
支持扩展不同语言编写复杂隐私计算任务。

:::tip

目前PrimiHub只支持使用Protobuf和Python语言。

:::

## 语义层扩展

* 语义层解析器根据多方安全的语义（上下文）推断使用何种任务调度，创建不同类型的调度器；
* 调度器根据分配的任务类型启动分布式节点上的Woker；
* 分布式节点worker根据各自分配到的语义启动对应的Task；
* Task使用选择对应的协议来运行；

## 协议层扩展

这里的协议特指"安全协议"。协议的扩展对应上层的Task扩展，包括：ABY3、PSI、PIR、cheeth、安全xgboost等，密码工程师可以根据协议规范来开发自定义的安全协议并接入PrimiHub平台。

:::tip 

关于如何扩展安全协议，见开发指南的[安全协议开发指南](developer-docs/protocol-dev-guide.md)

:::