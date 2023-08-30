---
sidebar_position: 0
keywords: [architect, primihub]
description: PrimiHub 架构设计
---

# 架构设计
PrimiHub 是一个开放、分层架构的隐私计算框架，拥有统一且成熟的模型设计，你可以基于 PrimiHub 做多层次、多类型的扩展开发。

## 核心模型
![Concept](/img/core-concept.drawio.svg)

### PrimiHub是如何工作的

- 节点（ Node）：一个加载安全协议和接收计算请求的可执行程序, 节点为上层协议执行提供基础服务，目前提供的基础服务有数据集元数据服务、数据缓存服务；
- 协议 （Protocol）：指多方安全计算MPC协议
- 虚拟节点（VMNode）：虚拟节点是节点上所有任务的执行器
- 虚拟节点的角色 （VMNode role）：指在一次任务执行中扮演的角色，分为两种 a.调度节点（Scheduler） b.工作节点（Worker）
- 数据集（Dataset）：指任务需要计算的数据
- 算法（ Algorithm）：指任务执行的具体逻辑，将根据协议分配到指定节点上执行
- 任务 （Task）：特定协议正在执行的MPC计算任务，一个计算任务需要指定算法、数据集、协议（协议可自动由节点根据算法自动协商或人工指定）
- 运行时 （Worker）：任务（Task）的加载和运行器，一个运行时在启动时由VMNode分配使用的协议（Protocol）；
- 运行时参与角色（Worker party）：运行时角色根据传入的安全协议指定与安全协议相关的角色

## 可扩展性
![Extensilbe](/img/extensilbe-layer.svg)

PrimiHub可以从以下方面进行扩展。

### 数据源接入扩展

PrimiHub支持不同类型的数据源作为数据集注册到PrimiHub资源网络中，用户可以使用数据源扩展框架封装自己的数据源接入到PrimiHub隐私计算网络中。

### 数据消费扩展
隐私计算生成的结果数据可以通过数据消费扩展进行用户自定义的下游数据消费。

### 接入应用扩展

通过通用的应用接口，PrimiHub可以支持大数据、机器学习、IoT等场景的外部应用接入。

### 语法层扩展
支持扩展不同语言编写复杂隐私计算任务。

:::tip

目前PrimiHub只支持使用Protobuf和Python语言。

:::

### 语义层扩展

* 语义层解析器根据多方安全的语义（上下文）推断使用何种任务调度，创建不同类型的调度器；
* 调度器根据分配的任务类型启动分布式节点上的Worker；
* 分布式节点Worker根据各自分配到的语义启动对应的Task；
* Task使用选择对应的协议来运行；

### 协议层扩展

这里的协议特指"安全协议"。协议的扩展对应上层的Task扩展，包括：ABY3、PSI、PIR、Cheetah、安全XGBoost等，密码工程师可以根据协议规范来开发自定义的安全协议并接入PrimiHub平台。

:::tip 

关于如何扩展安全协议，见开发指南的[安全协议开发指南](developer-docs/protocol-dev-guide.md)

:::