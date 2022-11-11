---
sidebar_position: 10
description: 纵向联邦学习介绍及其应用场景 
keywords: [纵向联邦学习, 纵向联邦应用场景, Hetero XGB, Primihub SDK Demo]
---
# 纵向联邦学习

## 纵向联邦学习及其应用场景

### 定义

在数据集上具有相同的样本空间、不同的特征空间的参与方所组成的联邦学习归类为纵向联邦学习（Vertical Federated Learning，VFL），也可以理解为按特征划分的联邦学习。

### 场景

作为一种保护隐私的分布式训练技术，联邦学习近几年成为学术界研究的热点话题，很多研究关于联邦学习的效率、安全性、隐私性展开讨论。最近在企业中联邦学习的应用也逐渐开展，按照参与方数据分布的差异，联邦学习通常可以分为横向联邦学习(HFL)、纵向联邦学习(VFL)以及联邦迁移学习。相较于横向联邦学习，纵向联邦学习在实际企业中应用更加广泛，它通常适用于不用部门之间数据垂直分布的场景，例如：政务开放、医疗应用、金融应用、数字广告、物流行业等。

## Hetero XGB

### 算法流程

Host端：数据中拥有标签的一方

Guest端：数据中没有标签的一方

1. Host端基于自研高性能Paillier库以及随机种子生成公私钥，并将公钥发送给Guest端；
2. Host端基于当前预测值和Label进行计算一阶导数与二阶导数，并将一阶与二阶导数进行半同态加密，然后发送至Guest端；
3. Host端根据己端数据，计算Host_Best_Gain，同时Guest端计算所有可能的Guest_Best_Gain，并将Guest_Best_Gain加密后发送给Host端；
4. Host端将从Guest端获取的加密Guest_Best_Gain进行解密，得到解密后的Guest_Best_Gain；
5. 在Host端比较Host_Best_Gain与Guest_Best_Gain的大小，确定XGB树的最优分裂点；
6. 重复步骤3、4、5，直到模型收敛或达到迭代最大次数，模型训练完成。

### 简化流程示意图

![img](./HeteroXGB简化流程示意图.jpg)

### Hetero_XGB算法优化

![img](./Hetero_XGB算法优化.jpg)

## 优化亮点

1. 基于Ray的并行加速；
2. 采用python底层的加速函数；
3. 自研高性能Pallier库；
4. 平衡Host与Guest端的计算资源，提高计算效率。

### Primihub Hetero XGB运行

1、安装配置环境（通过Docker compose快速安装）；

参考：<https://docs.primihub.com/docs/developer-docs/build/>

#### 环境安装

```shell
apt update 
apt install -y python3 python3-dev gcc-8 g++-8 python-dev libgmp-dev cmake
apt install -y automake ca-certificates git libtool m4 patch pkg-config unzip make wget curl zip ninja-build npm
update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-8 800 --slave /usr/bin/g++ g++ /usr/bin/g++-8

npm install -g @bazel/bazelisk
```

#### 拉取primihub源码和镜像

```shell
git clone https://github.com/primihub/primihub.git
docker pull primihub/primihub-node:latest
```

#### 启动或关闭container

```shell
docker-compose up -d
docker-compose down
```

#### 进入任务启动节点

```shell
docker exec -it node0_primihub bash
```

### Hetero XGB Training

```Python
./primihub-cli --task_lang=python --task_code=./python/primihub/examples/disxgb_en.py --params="predictFileName:STRING:0:/data/result/prediction.csv, indicatorFileName:STRING:0:/data/result/indicator.json, hostLookupTable:STRING:0:/data/result/hostlookuptable.csv, guestLookupTable:STRING:0:/data/result/guestlookuptable.csv, modelFileName:STRING:0:/data/result/host/model"
```

### Hetero XGB Prediction

```

```

## Example

```python
# Using Python sdk client： home lr

import primihub as ph
from primihub.client import primihub_cli as cli
from primihub import dataset, context
from primihub.channel.zmq_channel import IOService, Session
from primihub.FL.model.xgboost.xgb_guest import XGB_GUEST
from primihub.FL.model.xgboost.xgb_host import XGB_HOST
from primihub.FL.model.evaluation.evaluation import Regression_eva
from primihub.FL.model.evaluation.evaluation import Classification_eva

# using paillier
# from primihub.primitive.opt_paillier_c2py_warpper import *
# from primihub.FL.model.xgboost.xgb_guest_en import XGB_GUEST_EN
# from primihub.FL.model.xgboost.xgb_host_en import XGB_HOST_EN

import pandas as pd
import numpy as np
import pickle
import logging


def get_logger(name):
    LOG_FORMAT = "[%(asctime)s][%(filename)s:%(lineno)d][%(levelname)s] %(message)s"
    DATE_FORMAT = "%m/%d/%Y %H:%M:%S %p"
    logging.basicConfig(level=logging.DEBUG,
                        format=LOG_FORMAT, datefmt=DATE_FORMAT)
    logger = logging.getLogger(name)
    return logger


logger = get_logger("hetero_xgb")

# client init
cli.init(config={"node": "your primihub node address:50050", "cert": ""})

# Number of tree to fit.
num_tree = 1
# Max depth of each tree.
max_depth = 1

dataset.define("guest_dataset")
dataset.define("label_dataset")

ph.context.Context.func_params_map = {
    "xgb_host_logic": ("paillier",),
    "xgb_guest_logic": ("paillier",)
}


@ph.context.function(role='host', protocol='xgboost', datasets=['label_dataset'], port='8000', task_type="regression")
def xgb_host_logic(cry_pri="paillier"):
    logger.info("start xgb host logic...")
    logger.info(ph.context.Context.dataset_map)
    logger.info(ph.context.Context.node_addr_map)
    logger.info(ph.context.Context.role_nodeid_map)
    logger.info(ph.context.Context.params_map)

    eva_type = ph.context.Context.params_map.get("taskType", None)
    if eva_type is None:
        logger.info(
            "taskType is not specified, set to default value 'regression'.")
        eva_type = "regression"

    eva_type = eva_type.lower()
    if eva_type != "classification" and eva_type != "regression":
        logger.error("Invalid value of taskType, possible value is 'regression', 'classification'.")
        return

    logger.info("Current task type is {}.".format(eva_type))

    data = ph.dataset.read(dataset_key="label_dataset").df_data
    columns_label_data = data.columns.tolist()
    for index, row in data.iterrows():
        for name in columns_label_data:
            temp = row[name]
            try:
                float(temp)
            except ValueError:
                logger.error(
                    "Find illegal string '{}', it's not a digit string.".format(temp))
                return

    # Get host's ip address.
    role_node_map = ph.context.Context.get_role_node_map()
    node_addr_map = ph.context.Context.get_node_addr_map()

    if len(role_node_map["host"]) != 1:
        logger.error("Current node of host party: {}".format(
            role_node_map["host"]))
        logger.error("In hetero XGB, only dataset of host party has label, "
                     "so host party must have one, make sure it.")
        return

    host_node = role_node_map["host"][0]
    next_peer = node_addr_map[host_node]
    ip, port = next_peer.split(":")
    ios = IOService()
    server = Session(ios, ip, port, "server")
    channel = server.addChannel()

    dim = data.shape[0]
    dim_train = dim / 10 * 8
    data_train = data.loc[:dim_train, :].reset_index(drop=True)
    data_test = data.loc[dim_train:dim, :].reset_index(drop=True)
    label_true = ['Class']
    y_true = data_test['Class'].values
    data_test = data_test[
        [x for x in data_test.columns if x not in label_true]
    ]
    logger.info(data_test.head())

    labels = ['Class']  # noqa
    X_host = data_train[
        [x for x in data.columns if x not in labels]
    ]
    Y = data_train['Class'].values

    if cry_pri == "paillier":
        from primihub.primitive.opt_paillier_c2py_warpper import opt_paillier_encrypt_crt, opt_paillier_decrypt_crt
        from primihub.FL.model.xgboost.xgb_guest_en import XGB_GUEST_EN
        from primihub.FL.model.xgboost.xgb_host_en import XGB_HOST_EN
        xgb_host = XGB_HOST_EN(n_estimators=num_tree, max_depth=max_depth, reg_lambda=1,
                               sid=0, min_child_weight=1, objective='linear', channel=channel)
        channel.recv()
        xgb_host.channel.send(xgb_host.pub)
        print(xgb_host.channel.recv())
        y_hat = np.array([0.5] * Y.shape[0])

        for t in range(xgb_host.n_estimators):
            logger.info("Begin to trian tree {}.".format(t + 1))

            xgb_host.record = 0
            xgb_host.lookup_table = pd.DataFrame(
                columns=['record_id', 'feature_id', 'threshold_value'])
            f_t = pd.Series([0] * Y.shape[0])
            gh = xgb_host.get_gh(y_hat, Y)
            gh_en = pd.DataFrame(columns=['g', 'h'])
            for item in gh.columns:
                for index in gh.index:
                    gh_en.loc[index, item] = opt_paillier_encrypt_crt(xgb_host.pub, xgb_host.prv,
                                                                      int(gh.loc[index, item]))
            logger.info("Encrypt finish.")

            xgb_host.channel.send(gh_en)
            GH_guest_en = xgb_host.channel.recv()
            GH_guest = pd.DataFrame(
                columns=['G_left', 'G_right', 'H_left', 'H_right', 'var', 'cut'])
            for item in [x for x in GH_guest_en.columns if x not in ['cut', 'var']]:
                for index in GH_guest_en.index:
                    if GH_guest_en.loc[index, item] == 0:
                        GH_guest.loc[index, item] = 0
                    else:
                        GH_guest.loc[index, item] = opt_paillier_decrypt_crt(xgb_host.pub, xgb_host.prv,
                                                                             GH_guest_en.loc[index, item])

            logger.info("Decrypt finish.")

            for item in [x for x in GH_guest_en.columns if x not in ['G_left', 'G_right', 'H_left', 'H_right']]:
                for index in GH_guest_en.index:
                    GH_guest.loc[index, item] = GH_guest_en.loc[index, item]

            xgb_host.tree_structure[t + 1], f_t = xgb_host.xgb_tree(X_host, GH_guest, gh, f_t, 0)  # noqa
            xgb_host.lookup_table_sum[t + 1] = xgb_host.lookup_table
            y_hat = y_hat + xgb_host.learning_rate * f_t

            logger.info("Finish to train tree {}.".format(t + 1))

        predict_file_path = ph.context.Context.get_predict_file_path()
        indicator_file_path = ph.context.Context.get_indicator_file_path()
        model_file_path = ph.context.Context.get_model_file_path()
        lookup_file_path = ph.context.Context.get_host_lookup_file_path()

        with open(model_file_path, 'wb') as fm:
            pickle.dump(xgb_host.tree_structure, fm)
        with open(lookup_file_path, 'wb') as fl:
            pickle.dump(xgb_host.lookup_table_sum, fl)
        y_pre = xgb_host.predict_prob(data_test)
        y_train_pre = xgb_host.predict_prob(X_host)
        y_train_pre.to_csv(predict_file_path)
        y_train_true = Y
        Y_true = {"train": y_train_true, "test": y_true}
        Y_pre = {"train": y_train_pre, "test": y_pre}
        if eva_type == 'regression':
            Regression_eva.get_result(Y_true, Y_pre, indicator_file_path)
        elif eva_type == 'classification':
            Classification_eva.get_result(Y_true, Y_pre, indicator_file_path)


    elif cry_pri == "plaintext":
        xgb_host = XGB_HOST(n_estimators=num_tree, max_depth=max_depth, reg_lambda=1,
                            sid=0, min_child_weight=1, objective='linear', channel=channel)
        channel.recv()
        y_hat = np.array([0.5] * Y.shape[0])
        for t in range(xgb_host.n_estimators):
            logger.info("Begin to trian tree {}.".format(t))

            xgb_host.record = 0
            xgb_host.lookup_table = pd.DataFrame(
                columns=['record_id', 'feature_id', 'threshold_value'])
            f_t = pd.Series([0] * Y.shape[0])
            gh = xgb_host.get_gh(y_hat, Y)
            xgb_host.channel.send(gh)
            GH_guest = xgb_host.channel.recv()
            xgb_host.tree_structure[t + 1], f_t = xgb_host.xgb_tree(X_host, GH_guest, gh, f_t, 0)  # noqa
            xgb_host.lookup_table_sum[t + 1] = xgb_host.lookup_table
            y_hat = y_hat + xgb_host.learning_rate * f_t

            logger.info("Finish to trian tree {}.".format(t))

        predict_file_path = ph.context.Context.get_predict_file_path()
        indicator_file_path = ph.context.Context.get_indicator_file_path()
        model_file_path = ph.context.Context.get_model_file_path()
        lookup_file_path = ph.context.Context.get_host_lookup_file_path()
        with open(model_file_path, 'wb') as fm:
            pickle.dump(xgb_host.tree_structure, fm)
        with open(lookup_file_path, 'wb') as fl:
            pickle.dump(xgb_host.lookup_table_sum, fl)
        y_pre = xgb_host.predict_prob(data_test)
        if eva_type == 'regression':
            Regression_eva.get_result(y_true, y_pre, indicator_file_path)
        elif eva_type == 'classification':
            Classification_eva.get_result(y_true, y_pre, indicator_file_path)

        xgb_host.predict_prob(data_test).to_csv(predict_file_path)


@ph.context.function(role='guest', protocol='xgboost', datasets=['guest_dataset'], port='9000', task_type="regression")
def xgb_guest_logic(cry_pri="paillier"):
    logger.info("start xgb guest logic...")
    ios = IOService()

    logger.info(ph.context.Context.dataset_map)
    logger.info(ph.context.Context.node_addr_map)
    logger.info(ph.context.Context.role_nodeid_map)

    eva_type = ph.context.Context.params_map.get("taskType", None)
    if eva_type is None:
        logger.info(
            "taskType is not specified, set to default value 'regression'.")
        eva_type = "regression"

    eva_type = eva_type.lower()
    if eva_type != "classification" and eva_type != "regression":
        logger.error("Invalid value of taskType, possible value is 'regression', 'classification'.")
        return

    logger.info("Current task type is {}.".format(eva_type))

    # Check dataset.
    data = ph.dataset.read(dataset_key="guest_dataset").df_data
    columns_label_data = data.columns.tolist()
    for index, row in data.iterrows():
        for name in columns_label_data:
            temp = row[name]
            try:
                float(temp)
            except ValueError:
                logger.error(
                    "Find illegal string '{}', it's not a digit string.".format(temp))
                return

    # Get host's ip address.
    role_node_map = ph.context.Context.get_role_node_map()
    node_addr_map = ph.context.Context.get_node_addr_map()

    if len(role_node_map["host"]) != 1:
        logger.error("Current node of host party: {}".format(
            role_node_map["host"]))
        logger.error("In hetero XGB, only dataset of host party has label,"
                     "so host party must have one, make sure it.")
        return

    host_node = role_node_map["host"][0]
    next_peer = node_addr_map[host_node]

    ip, port = next_peer.split(":")
    client = Session(ios, ip, port, "client")
    channel = client.addChannel()

    dim = data.shape[0]
    dim_train = dim / 10 * 8
    X_guest = data.loc[:dim_train, :].reset_index(drop=True)
    data_test = data.loc[dim_train:dim, :].reset_index(drop=True)

    if cry_pri == "paillier":
        from primihub.primitive.opt_paillier_c2py_warpper import opt_paillier_encrypt_crt, opt_paillier_decrypt_crt
        from primihub.FL.model.xgboost.xgb_guest_en import XGB_GUEST_EN
        from primihub.FL.model.xgboost.xgb_host_en import XGB_HOST_EN
        xgb_guest = XGB_GUEST_EN(n_estimators=num_tree, max_depth=max_depth, reg_lambda=1, min_child_weight=1,
                                 objective='linear',
                                 sid=1, channel=channel)  # noqa
        channel.send(b'guest ready')
        pub = xgb_guest.channel.recv()
        xgb_guest.channel.send(b'recved pub')

        for t in range(xgb_guest.n_estimators):
            xgb_guest.record = 0
            xgb_guest.lookup_table = pd.DataFrame(
                columns=['record_id', 'feature_id', 'threshold_value'])
            gh_host = xgb_guest.channel.recv()
            X_guest_gh = pd.concat([X_guest, gh_host], axis=1)
            print(X_guest_gh)
            gh_sum = xgb_guest.get_GH(X_guest_gh, pub)
            xgb_guest.channel.send(gh_sum)
            xgb_guest.cart_tree(X_guest_gh, 0, pub)
            xgb_guest.lookup_table_sum[t + 1] = xgb_guest.lookup_table
        lookup_file_path = ph.context.Context.get_guest_lookup_file_path()
        with open(lookup_file_path, 'wb') as fl:
            pickle.dump(xgb_guest.lookup_table_sum, fl)
        xgb_guest.predict(data_test)
        xgb_guest.predict(X_guest)
    elif cry_pri == "plaintext":
        xgb_guest = XGB_GUEST(n_estimators=num_tree, max_depth=max_depth, reg_lambda=1, min_child_weight=1,
                              objective='linear',
                              sid=1, channel=channel)  # noqa
        channel.send(b'guest ready')
        for t in range(xgb_guest.n_estimators):
            xgb_guest.record = 0
            xgb_guest.lookup_table = pd.DataFrame(
                columns=['record_id', 'feature_id', 'threshold_value'])
            gh_host = xgb_guest.channel.recv()
            X_guest_gh = pd.concat([X_guest, gh_host], axis=1)
            print(X_guest_gh)
            gh_sum = xgb_guest.get_GH(X_guest_gh)
            xgb_guest.channel.send(gh_sum)
            xgb_guest.cart_tree(X_guest_gh, 0)
            xgb_guest.lookup_table_sum[t + 1] = xgb_guest.lookup_table
        lookup_file_path = ph.context.Context.get_guest_lookup_file_path()
        with open(lookup_file_path, 'wb') as fl:
            pickle.dump(xgb_guest.lookup_table_sum, fl)
        xgb_guest.predict(data_test)
        xgb_guest.predict(X_guest)


# context
cry_pri = "plaintext"  # using plaintext
# cry_pri = "paillier" # using paillier
cli.async_remote_execute((xgb_host_logic, cry_pri), (xgb_guest_logic, cry_pri))


```

### 参考文献

SecureBoost: A Lossless Federated Learning Framework：<https://arxiv.org/pdf/1901.08755.pdf>

XGBoost Tutorials：<https://xgboost.readthedocs.io/en/latest/tutorials/index.html>

Federated Machine Learning: Concept and Applications：<https://arxiv.org/pdf/1902.04885.pdf>
