---
sidebar_position: 1
keywords: [boostrap]
description: 手动启动 PrimiHub 节点
displayed_sidebar: lensonsSidebar
---

# 启动各节点

*** 启动用于运行任务的各个节点 *** 

## 启动redis (推荐)

使用 `CentOS` 或 `Ubuntu` 时，可直接使用下面的命令安装redis
```
yum install redis -y  #CentOS
apt install redis -y  #Ubuntu
```
然后修改 `/etc/redis.conf` 文件中的 `requirepass` 字段设置 `redis` 密码，该密码需要和 `./config/node*.yaml` 文件 `redis_password` 字段的设置相同。
最后使用以下命令来启动 `redis`
```
systemctl start redis
```

或者直接使用 `docker` 来快速启动 `redis`，先准备个简单的`redis`配置
```
cat > /opt/redis.conf << EOF
daemonize no
pidfile /var/run/redis.pid
port 6379
bind 0.0.0.0
timeout 0
requirepass primihub
dbfilename dump.rdb
dir /data
EOF
```
然后执行下面的命令启动
```
docker run -p 6379:6379 --name redis -v /opt/redis.conf:/etc/redis/redis.conf -d redis:latest redis-server /etc/redis/redis.conf
```
 
## 运行启动点（使用redis做数据集查找时该步骤可忽略）

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
```

## 运行节点

您可以选择直接下载编译好的二进制文件（当前只有 Darwin 下 amd64 架构的二进制文件）：

```shell
curl -L https://github.com/primihub/primihub/releases/download/1.4.5/primihub-node-darwin-amd64.tar.gz|tar xzv primihub-node
./primihub-node
```

或者，下载 PrimiHub 源码并编译，见[开发者文档-代码编译](docs/../../developer-docs/build)

在编译完成后的代码根目录下，三个终端中分别运行

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
用过--config指定的yaml配置文件可以接入自定义数据，使用请见 [接入你的数据](docs/../connect-datasource)
:::
