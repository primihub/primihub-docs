---
sidebar_position: 1
---

# 启动节点

*** 启动测试用的节点 *** 

> TODO ⏰ 画一个tutorial的Node架构图，主要说明数据分布部署和期望结果
  

启动DHT bootstrap 节点

```bash
git clone hhttps://github.com/primihub/simple-bootstrap-node.git & cd simple-bootstrap-node
go mod tidy
go run main.go
```

> TODO 启动点项目变为git submodule，增加启动shell脚本

在三个终端中分别运行

```bash
./primihub-node --service_port=50050 --config=tutorial_config_0.yaml
```

```bash
./primihub-node --service_port=50051 --config=tutorial_config_1.yaml
```

```bash
./primihub-node --service_port=50051 --config=tutorial_config_2.yaml
```

关于yaml配置文件的说明见[这里](../core-concept/model)

## 结果

TODO
