---
sidebar_position: 10
description: 横向联邦学习介绍及其应用场景
keywords: [横向联邦学习, 横向联邦应用场景, Homo LR, Primihub SDK Demo]
---
# 横向联邦学习

## 横向联邦学习及其应用场景

### 定义

横向联邦学习也称为按样本划分的联邦学习（Sample-Partitioned Federated Learning或Example-Partitioned Federated Learning），可以应用于联邦学习的各个参与方的数据集有相同的特征空间和不同的样本空间的场景。

### 场景

横向联邦学习的本质是样本的联合，适用于参与者之间业态相同但触达客户不同，即特征重叠多，用户重叠少时的场景，比如不同地区的银行间，他们的业务相似（特征相似），但用户不同（样本不同）。再比如，有两家不同地区银行 — 上海与杭州两地的两家银行，它们的用户群体分别来自上海与杭州的居住人口，用户的交集相对较小。由于银行间的业务相似，记录的用户特征大概率是相同的。因此，横向联邦学习可以被考虑用来构建联合模型。

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

### 简化流程示意图(确认后更改图利标号123等)

![img](https://tva1.sinaimg.cn/large/008vxvgGly1h817xc7tefj312w0mwwgi.jpg)

### Homo_LR算法优化

![img](https://tva1.sinaimg.cn/large/008vxvgGly1h817xgaxyqj319i0j6411.jpg)

## Homo LR优化亮点

1. 采用python底层的加速函数；
2. 自研高性能Pallier库；
3. 平衡Arbiter、Host与Guest端的计算资源，提高计算效率。

### Primihub Homo LR运行

1、安装配置环境（通过Docker compose快速安装）；

参考：<https://docs.primihub.com/docs/developer-docs/build/>

环境安装

```shell
apt update 
apt install -y python3 python3-dev gcc-8 g++-8 python-dev libgmp-dev cmake
apt install -y automake ca-certificates git libtool m4 patch pkg-config unzip make wget curl zip ninja-build npm
update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-8 800 --slave /usr/bin/g++ g++ /usr/bin/g++-8

npm install -g @bazel/bazelisk
```

拉取primihub源码和镜像

```shell
git clone https://github.com/primihub/primihub.git
docker pull primihub/primihub-node:latest
```

启动或关闭container

```shell
docker-compose up -d
docker-compose down
```

进入任务启动节点：

```shell
docker exec -it node0_primihub bash
```

3、执行代码：

```shell
./primihub-cli --task_type=0 --task_lang=python --task_code=./python/primihub/FL/model/logistic_regression/homo_lr.py --params="predictFileName:STRING:0:/app/pred_acc.csv,modelFileName:STRING:0:/app/lr_model.pl"
```

## Example

```python
# Using Python sdk client： home lr
import logging

import primihub as ph
from primihub import context
from primihub.FL.model.logistic_regression.homo_lr import run_homo_lr_host, run_homo_lr_guest, run_homo_lr_arbiter
from primihub.client import primihub_cli as cli

# client init
cli.init(config={"node": "your primihub node address:50050", "cert": ""})


def get_logger(name):
    LOG_FORMAT = "[%(asctime)s][%(filename)s:%(lineno)d][%(levelname)s] %(message)s"
    DATE_FORMAT = "%m/%d/%Y %H:%M:%S %p"
    logging.basicConfig(level=logging.DEBUG,
                        format=LOG_FORMAT,
                        datefmt=DATE_FORMAT)
    logger = logging.getLogger(name)
    return logger

task_params = {}
logger = get_logger("Homo-LR")


@ph.context.function(role='arbiter', protocol='lr', datasets=['breast_0'], port='9010', task_type="lr-train")
def run_arbiter_party():
    role_node_map = ph.context.Context.get_role_node_map()
    node_addr_map = ph.context.Context.get_node_addr_map()
    dataset_map = ph.context.Context.dataset_map
    data_key = list(dataset_map.keys())[0]

    logger.debug(
        "role_nodeid_map {}".format(role_node_map))

    logger.debug(
        "dataset_map {}".format(dataset_map))

    logger.debug(
        "node_addr_map {}".format(node_addr_map))

    run_homo_lr_arbiter(role_node_map, node_addr_map, data_key)

    logger.info("Finish homo-LR arbiter logic.")


@ph.context.function(role='host', protocol='lr', datasets=['breast_1'], port='9020', task_type="lr-train")
def run_host_party():
    role_node_map = ph.context.Context.get_role_node_map()
    node_addr_map = ph.context.Context.get_node_addr_map()
    dataset_map = ph.context.Context.dataset_map

    logger.debug(
        "dataset_map {}".format(dataset_map))
    data_key = list(dataset_map.keys())[0]

    logger.debug(
        "role_nodeid_map {}".format(role_node_map))

    logger.debug(
        "node_addr_map {}".format(node_addr_map))
    logger.info("Start homo-LR host logic.")

    run_homo_lr_host(role_node_map, node_addr_map, data_key)

    logger.info("Finish homo-LR host logic.")


@ph.context.function(role='guest', protocol='lr', datasets=['breast_2'], port='9030', task_type="lr-train")
def run_guest_party():
    role_node_map = ph.context.Context.get_role_node_map()
    node_addr_map = ph.context.Context.get_node_addr_map()
    dataset_map = ph.context.Context.dataset_map

    logger.debug(
        "dataset_map {}".format(dataset_map))

    data_key = list(dataset_map.keys())[0]
    logger.debug(
        "role_nodeid_map {}".format(role_node_map))

    logger.debug(
        "node_addr_map {}".format(node_addr_map))
    logger.info("Start homo-LR guest logic.")

    run_homo_lr_guest(role_node_map, node_addr_map, datakey=data_key)

    logger.info("Finish homo-LR guest logic.")


cli.async_remote_execute((run_host_party, ), (run_guest_party, ))

```

### 参考文献

SecureBoost: A Lossless Federated Learning Framework：<https://arxiv.org/pdf/1901.08755.pdf>

XGBoost Tutorials：<https://xgboost.readthedocs.io/en/latest/tutorials/index.html>

Federated Machine Learning: Concept and Applications：<https://arxiv.org/pdf/1902.04885.pdf>
