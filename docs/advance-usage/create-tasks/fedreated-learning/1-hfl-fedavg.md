---
sidebar_position: 2
description: 横向联邦简介及FedAvg算法原理
keywords: [HFL, FedAvg]
---

# 横向联邦FedAvg算法

## 1. 简介

### 1.1 横向联邦定义

横向联邦学习也称为按样本划分的联邦学习（Sample-Partitioned Federated Learning或Example-Partitioned Federated Learning），可以应用于联邦学习的各个参与方的数据集有相同的特征空间和不同的样本空间的场景。

### 1.2 横向联邦应用场景

横向联邦学习的本质是样本的联合，适用于参与者之间业态相同但触达客户不同，即特征重叠多，用户重叠少时的场景，比如不同地区的银行间，他们的业务相似（特征相似），但用户不同（样本不同）。再比如，有两家不同地区银行 — 上海与杭州两地的两家银行，它们的用户群体分别来自上海与杭州的居住人口，用户的交集相对较小。由于银行间的业务相似，记录的用户特征大概率是相同的。因此，横向联邦学习可以被考虑用来构建联合模型。

## 2. FedAvg算法训练步骤

1. server将全局模型发送至各client

2. 各client使用本地数据训练，并更新模型参数

3. 各client将本地模型发送至server

4. server聚合模型参数

<img src="/img/FedAvg.png" width="40%" height="40%"/>

## 3. 模型参数聚合

- 假设有$k$个client，其本地的训练样本数量分别为$n_1,\dots,n_k$，本地模型参数分别为$\omega_1,\dots,\omega_k$

- server聚合的全局模型参数为$\Omega=\sum_i\frac{n_i}{\sum_jn_j}\omega_i$

## 4. client传梯度还是传模型？

- TL;DR：若各方学习率相同，传梯度和传模型没区别

- 各client在收到的全局模型基础上训练，因此每轮的初始参数都为$\Omega$，下面仅证明两个client的情况

### 4.1 传梯度

- client：计算$g_1=\frac{1}{n_1}\nabla_{\Omega}\mathcal{L}(x_1,y_1)$，$g_2=\frac{1}{n_2}\nabla_{\Omega}\mathcal{L}(x_2,y_2)$，并发送$g_1,g_2$

- server：计算$\Omega_g=\Omega-\alpha\cdot\frac{n_1g_1+n_2g_2}{n_1+n_2}$

### 4.2 传模型

- client：计算$\omega_1=\Omega-\alpha\cdot g_1$，$\omega_2=\Omega-\alpha\cdot g_2$，并发送$\omega_1,\omega_2$

- server：计算$\Omega_\omega=\frac{n_1\omega_1+n_2\omega_2}{n_1+n_2}$

### 4.3 验证

$\Omega_\omega=\frac{n_1\omega_1+n_2\omega_2}{n_1+n_2}=\frac{n_1(\Omega-\alpha\cdot g_1)+n_2(\Omega-\alpha\cdot g_2)}{n_1+n_2}=\Omega-\alpha\cdot\frac{n_1g_1+n_2g_2}{n_1+n_2}=\Omega_g$

## 5. 通信

为节省通信次数，client可以在本地迭代多轮后再上传本地模型，即client迭代$t$轮后，server聚合一轮

## 6. HFL Neural Network FedAvg 运行

### 6.1 Training

- 如果是通过下载二进制文件或本地编译启动，编译完成后在代码根目录下执行以下命令；如果是通过docker-compose启动，先执行 `docker exec -it primihub-node0 bash` 进入到 `primihub-node0` 容器中，再执行以下命令。

```bash
./primihub-cli --task_config_file="example/FL/neural_network/hfl_binclass_plaintext.json"
```

- 或者通过Python SDK启动

```bash
submit example/FL/neural_network/hfl_binclass_plaintext.json
```

### 6.2 Prediction

- 下载二进制文件、本地编译、docker-compose启动

```bash
./primihub-cli --task_config_file="example/FL/neural_network/hfl_binclass_predict.json"
```

- Python SDK启动

```bash
submit example/FL/neural_network/hfl_binclass_predict.json
```

## 7. 参考文献

1. McMahan, Brendan, Eider Moore, Daniel Ramage, Seth Hampson, and Blaise Aguera y Arcas. "Communication-efficient learning of deep networks from decentralized data." In Artificial intelligence and statistics, pp. 1273-1282. PMLR, 2017. <https://arxiv.org/pdf/1602.05629.pdf>
