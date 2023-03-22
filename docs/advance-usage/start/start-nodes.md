---
sidebar_position: 2
keywords: [boostrap]
description: 下载二进制启动 PrimiHub 节点
displayed_sidebar: lensonsSidebar
---

# 下载二进制文件启动

*** 启动用于运行任务的各个节点 *** 

## 启动redis

1. 直接安装
```
yum install redis -y  #CentOS
apt install redis -y  #Ubuntu
```
然后修改 `/etc/redis/redis.conf` 文件中的 `requirepass` 字段设置 `redis` 密码，该密码需要和 `./config/node*.yaml` 文件 `redis_password` 字段的设置相同。
```
sed -i 's/# requirepass foobared/requirepass primihub/' /etc/redis/redis.conf
```
最后使用以下命令来启动 `redis`
```
systemctl start redis
```
2. docker启动

```
docker run --name redis -p 6379:6379 -d redis:latest --requirepass "primihub"
```
 
<!-- ## 运行启动点（使用redis做数据集查找时该步骤可忽略）

您可以选择直接下载编译好的二进制文件：

```shell
curl -L https://github.com/primihub/simple-bootstrap-node/releases/download/v0.0.1/simple-bootstrap-node-darwin-amd64.tar.gz|tar xzv simple-bootstrap-node
./simple-bootstrap-node
```

或者是在源码基础上编译：

```shell
git clone https://github.com/primihub/simple-bootstrap-node.git && cd simple-bootstrap-node
go mod tidy
go run main.go
```

或直接使用docker运行启动节点
```shell
docker run --name bootstrap-node -d -p 4001:4001 primihub/simple-bootstrap-node:1.0
``` -->

## 运行节点

下载仓库并进入到代码根目录：

```shell
git clone https://github.com/primihub/primihub.git
cd primihub
```
直接下载编译好的二进制文件，在GitHub [release页面](https://github.com/primihub/primihub/releases) 可以查看最新版本。

```shell
curl -L https://github.com/primihub/primihub/releases/download/1.6.4/primihub-linux-amd64.tar.gz | tar xzv
```

在下载解压完成后的代码根目录下，三个终端中分别运行

```shell
./bazel-bin/node --node_id=node0 --service_port=50050 --config=./config/node0.yaml
```
```shell
./bazel-bin/node --node_id=node1 --service_port=50051 --config=./config/node1.yaml
```
```shell
./bazel-bin/node --node_id=node2 --service_port=50052 --config=./config/node2.yaml
```

:::tip 接入自定义数据
用过--config指定的yaml配置文件可以接入自定义数据，使用请见 [接入你的数据](./connect-datasource)
:::
