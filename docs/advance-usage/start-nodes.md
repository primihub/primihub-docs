---
sidebar_position: 1
keywords: [boostrap]
description: 手动启动 PrimiHub 节点
---

# 启动节点

*** 用 Golang 应用启动测试用的节点 *** 
 
## 运行启动节点

```bash
git clone https://github.com/primihub/simple-bootstrap-node.git && cd simple-bootstrap-node
go mod tidy
go run main.go
```

## 运行节点

首先下载 PrimiHub 源码并编译，见[开发者文档-代码编译](docs/../../developer-docs/build)

在编译完成后的代码根目录下，三个终端中分别运行

```bash
./bazel-bin/node --node_id=node0 --service_port=50050 --config=./config/node0.yaml
```
```bash
./bazel-bin/node --node_id=node1 --service_port=50051 --config=./config/node1.yaml
```
```bash
./bazel-bin/node --node_id=node2 --service_port=50052 --config=./config/node2.yaml
```

:::tip 接入自定义数据
用过--config指定的yaml配置文件可以接入自定义数据，使用请见 [接入你的数据](docs/../connect-datasource)
:::

TODO