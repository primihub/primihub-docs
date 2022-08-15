---
sidebar_position: 1
---


# 可信执行环境（TEE）任务

*** Primihub + Gramine 🎉 ***


![Info](./primihub_and_gramine_logo.jpg)


Primihub使用了Gramine Library OS作为可信计算环境（TEE）运行的支持。


有这样的TEE使用场景：

![SGX_Nodes](./SGX-Nodes.svg)

两个数据所有者Bob和Alice有不同的敏感数据集，其他人想要用他们的数据训练一个模型，但他们都不能访问或查看对方的数据，因为数据是敏感的。

Primihub Node集群中节点的角色分为：调度节点、可信计算环境执行节点、数据提供节点。

任务发起方从CLI发起TEE计算任务，调度节点将给数据所有者Bob和Alice的数据提供角色节点发送TEE任务执行的调度命令，Bob和Alice的数据提供节点将向Gramine SGX运行的可信计算环境执行节点发送数据，并在可信环境中执行用户指定的计算，比如模型聚合计算。

计算全部都在Intel SGX的飞地执行，不会损害 Alice 和 Bob 数据的隐私。

## 使用Primihub执行以上场景


1. 准备可信执行环境
- 安装sgx驱动以及相关服务
  - https://github.com/intel/linux-sgx
- 安装gramine 的执行环境
  - https://gramine.readthedocs.io/en/latest/quickstart.html
- 编译Primihub 项目下的SGX的gramine server并运行

    ```bash
    git clone https://github.com/primihub/primihub.git
    cd primihub/python/primihub/TEE
    # 编译
    make SGX=1
    # 运行
    gramine-sgx ./flight ./flight_server.py
    ```

2. 任务开始执行
- 使用docker-compose 启动Primihub Node测试集群（https://docs.primihub.com/docs/quick-start）
- cli上传任务，（通过python CLI提交TEE任务，并通过python提交TEE服务任务开始）
  
    ```bash
    ./primihub-cli --task_lang=proto --task_type=6 --params="datasets:STRING:0:train_party_1;train_party_2,server:STRING:0:YOUR_FLIGHT_SERVER_IP:8815"
    ```


- 调度节点分配任务给数据提供节点
- 调度节点通知数据提供节点开始上传数据（参数中包含：可信环境执行节点的连接参数、指定数据集），上传数据目前primihub使用的是apache arrow flight RPC协议
- 数据提供节点向可信执行环境上传数据

3. 通过python client 可以向可信环境执行节点发送可以开始运行
- 执行环境计算并返回模型


## 计划的工作

### 可信执行环境节点管理
有Primihub Node提供多方都认可的TEE执行环境，如何将确认多方认可的安全性是将要完成的工作，可能涉及到多签名和远程证明。


### 联邦学习
支持更复杂应用场景的联邦学习算法在TEE环境中执行。

### 远程证明
远程证明允许硬件实体或硬件和软件的组合获得敏感数据提供方或外包方的信任。

证明结果提供：
- 被证明的软件的身份
- 未测量状态的详细信息（例如执行模式）
- 评估可能的软件篡改

在enclave成功向回复方证明自己后，可以在两者之间建立加密的通信通道。诸如凭证或其他敏感数据之类的秘密可以直接提供给 enclave。
实施远程证明的重要性在于证明声称的 enclave 确实在真正的 SGX 硬件中运行，而不是在某些（对手控制的）SGX 模拟器中运行。