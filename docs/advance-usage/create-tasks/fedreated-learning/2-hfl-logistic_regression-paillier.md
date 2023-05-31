---
sidebar_position: 2
description: 横向LR Paillier方案介绍
keywords: [HFL, Logistic Regression, Paillier]
---
# 横向联邦LR Paillier

## Homo LR

### 算法流程

1. Arbiter端基于自研高性能Paillier库以及随机种子生成公私钥，并将公钥发送给Host端以及Guest端；
2. Host端与Guest端基于DH密钥交换协议产生随机数。
3. Host端基于本地数据训练模型，得到训练后的参数。将参数基于步骤2中获取的随机数以及从步骤1获取的公钥进行加密，然后发送至Arbiter端；
4. Guest端基于本地数据训练模型，得到训练后的参数。将参数基于步骤2中获取的随机数以及从步骤1获取的公钥进行加密，然后发送至Arbiter端；
5. Arbiter端基于步骤1中的私钥，将从Host端获取的加密参数与从Guest端获取的加密参数进行解密，得到解密后的Host端参数与Guest参数；
6. Arbiter端将解密后的Host端参数与Guest参数，基于自研高性能聚合函数model_aggregate进行聚合得到聚合参数，并将聚合参数基于步骤一中的公钥加密发送给Host端与Guest端；
7. Host端与Guest端利用从Arbiter端获得的聚合参数，并更新本地参数；
8. 重复步骤3、4、5、6，直到模型收敛或达到迭代最大次数，模型训练完成。

### 简化流程示意图

![img](/img/homolr流程示意.PNG)

### Homo_LR算法优化

![img](/img/Homo_LR算法优化.jpg)

## Homo LR优化亮点

1. 基于DH密钥交换系统生成私钥，增强传输梯度信息的安全性；
2. 自研高性能Pallier库；

### Primihub Homo LR运行

- 如果是通过docker-compose启动，执行 `docker exec -it primihub-node0 bash` 进入到 `primihub-node0` 容器，执行以下命令：

```bash
./primihub-cli --task_config_file="python/primihub/FL/tests/linear/logistic_regression/hfl_binclass_paillier.json"
```

- 如果是在本地编译启动，在编译完成后的代码根目录下执行以下命令：

```bash
./bazel-bin/cli --server="127.0.0.1:50050" --task_config_file="python/primihub/FL/tests/linear/logistic_regression/hfl_binclass_paillier.json"
```

- 或者通过Python SDK启动

```bash
submit python/primihub/FL/tests/linear/logistic_regression/hfl_binclass_paillier.json
```

#### Homo LR Prediction

- docker-compose启动

```bash
./primihub-cli --task_config_file="python/primihub/FL/tests/linear/logistic_regression/hfl_binclass_predict.json"
```

- 本地编译启动

```bash
./bazel-bin/cli --server="127.0.0.1:50050" --task_config_file="python/primihub/FL/tests/linear/logistic_regression/hfl_binclass_predict.json"
```

- Python SDK启动

```bash
submit python/primihub/FL/tests/linear/logistic_regression/hfl_binclass_predict.json
```

### 参考文献

SecureBoost: A Lossless Federated Learning Framework：<https://arxiv.org/pdf/1901.08755.pdf>

XGBoost Tutorials：<https://xgboost.readthedocs.io/en/latest/tutorials/index.html>

Federated Machine Learning: Concept and Applications：<https://arxiv.org/pdf/1902.04885.pdf>
