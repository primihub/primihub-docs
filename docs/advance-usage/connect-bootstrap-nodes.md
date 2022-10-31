---
sidebar_position: 3
---

# 连接启动点

*** 连接指定的启动点 ***

:::tip 关于启动点

* 启动点是p2p网络的启动点，用于primihub节点网络数据集元数据注册和发现
* 实际的工作网络中可以存在多个启动点，以增加系统可用性
  
:::

在primihub-node启动参数参数config指定的yaml配置文件可以指定接入的启动点。需要定义p2p/bootstrap_nodes列表。

```yaml

p2p:
  bootstrap_nodes:
    - "/ip4/172.28.1.13/tcp/4001/ipfs/QmP2C45o2vZfy1JXWFZDUEzrQCigMtd4r3nesvArV8dFKd"
    - "/ip4/172.28.1.13/tcp/4001/ipfs/QmdSyhb8eR9dDSR5jjnRoTDBwpBCSAjT7WueKJ9cQArYoA"
  multi_addr: "/ip4/172.28.1.12/tcp/8882"

```
## p2p的字段定义

* bootstrap_nodes：启动点列表，根据你的实际情况设置
* multi_addr: 当前节点（Node）的资源注册协议地址
