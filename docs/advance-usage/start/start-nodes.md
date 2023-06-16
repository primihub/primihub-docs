---
sidebar_position: 2
keywords: [boostrap]
description: 下载二进制启动 PrimiHub 节点
displayed_sidebar: lensonsSidebar
---

# 下载二进制文件启动
:::tip
目前二进制文件仅支持 Ubuntu20.04 和 MacOS 系统运行
:::
### 启动 meta service

需要先安装JDK8环境
```bash
# Ubuntu
apt install openjdk-8-jdk
# CentOS
yum -y install java
# MacOS
brew install --build-from-source openjdk@8
```
下载`Meta service`安装包启动
```bash
wget https://primihub.oss-cn-beijing.aliyuncs.com/tools/meta_service.tar.gz
tar -zxf meta_service.tar.gz
cd meta_service
bash run.sh
```
默认启动三个 meta service 服务，每个参与方有自己的 meta service 服务

服务的日志分别存储在当前目录下的 meta_log0，meta_log1，meta_log2文件中

通过命令 ``ps -ef | grep fusion-simple.jar``检查服务是否正常运行 
```
ps -ef | grep fusion-simple.jar
root     298757       1 99 13:33 pts/8    00:00:10 java -jar fusion-simple.jar --server.port=7877 --grpc.server.port=7977 --db.path=/home/cuibo/meta_service/storage/node0 --collaborate=http://127.0.0.1:7878/,http://127.0.0.1:7879/
root     298758       1 99 13:33 pts/8    00:00:10 java -jar fusion-simple.jar --server.port=7878 --grpc.server.port=7978 --db.path=/home/cuibo/meta_service/storage/node1 --collaborate=http://127.0.0.1:7877/,http://127.0.0.1:7879/
root     298759       1 99 13:33 pts/8    00:00:10 java -jar fusion-simple.jar --server.port=7879 --grpc.server.port=7979 --db.path=/home/cuibo/meta_service/storage/node2 --collaborate=http://127.0.0.1:7878/,http://127.0.0.1:7877/
```
<!-- 1. 直接安装
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
``` -->

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

### 运行节点

安装运行依赖环境(python必须是3.8)
```
apt-get install -y python3 python3-dev libgmp-dev python3-pip libmysqlclient-dev
```
下载编译好的二进制文件，在GitHub [release页面](https://github.com/primihub/primihub/releases) 可以查看最新版本。

```shell
curl -L https://github.com/primihub/primihub/releases/download/1.6.6/primihub-linux-amd64.tar.gz | tar xz
```
在下载解压完成后，执行`start_server.sh`启动节点

```shell
bash start_server.sh
```

:::tip 接入自定义数据
通过--config指定的yaml配置文件可以接入自定义数据，使用请见 [接入你的数据](./connect-datasource)
:::

### 创建任务

启动成功后可以参考[创建任务](https://docs.primihub.com/docs/category/%E5%88%9B%E5%BB%BA%E4%BB%BB%E5%8A%A1)页面发起任务。