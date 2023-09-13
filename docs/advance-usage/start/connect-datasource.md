---
sidebar_position: 4
keywords: [隐私计算数据接入]
description: 介绍如何将自己的数据接入PrimiHub平台
---

# 接入自定义数据

***接入自定义数据集***

自定义数据集有两种接入方式

## 通过配置文件注册

在 `primihub-node` 启动参数参数 `--config` 指定的 YAML 配置文件可以指定接入的数据集。需要定义 `datasets`。

```yaml
datasets:
  - description: "train_party_2"
    model: "csv"
    source: "data/train_party_2.csv"
  - description: "test_party_2"
    model: "csv"
    source: "data/test_party_2.csv"
  - description: "psi_client_data_db"
    model: "sqlite"
    table_name: "psi_client_data"
    source: "data/client_e.db3"
  - description: "psi_client"
    model: "mysql"
    host: "172.21.1.62"
    port: 3306
    username: "root"
    password: "primihub"
    dbName: "psi"
    tableName: "psi_client"
```

## 通过grpc接口注册

```shell
./bazel-bin/src/primihub/reg-cli --config_file=./example/register_example/reg_dataset_meta.json
# 参数说明
# --server=ip:port 需要注册数据集的节点信息
# --config_file 需要注册的数据集的信息，通过json文件配置
```

## 数据集字段定义

***数据集通过yaml文件注册参数说明***

当前支持的数据源的类型有csv, mysql以及sqlite三种数据类型，对于不支持的数据源类型可以通过扩展实现相应数据源读取driver来扩展，具体如何实现，请参考可扩展性章节

### csv类型数据

* description：数据集ID，要求全局唯一
* model: 数据源类型，`csv`
* source: csv文件对于 `Node` 运行机器能够访问的路径

### mysql类型数据

* description：数据集ID，要求全局唯一
* model: 数据源类型，`mysql`
* host: 数据库所在主机地址，例如 "127.0.0.1"
* port: 数据库端口，例如 3306
* username: 数据库的登录用户名，例如 "root"
* password: 数据库的登录密码， 例如 "primihub"
* dbName: 数据库表所属的schema信息, 例如 "psi"
* tableName: 数据源对应的数据表名称，例如 "psi_client"

### sqlite类型数据

* description：数据集ID，要求全局唯一
* model: 数据源类型，`sqlite`
* source: sqlite数据库文件对于 `Node` 运行机器能够访问的路径
* table_name: 数据库表名称，例如"psi_client_data"
