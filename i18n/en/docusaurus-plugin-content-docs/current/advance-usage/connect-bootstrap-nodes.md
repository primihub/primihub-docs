---
sidebar_position: 3
---

# Connect Bootstrap Node

*** Connects to the specified Bootstrap Nodes***

:::tip About Bootstrap Node

* The Bootstrap Node is the starting node of p2p network and is used for primihub node network dataset metadata registration and discovery
* More than one Bootstrap Node can exist in the actual work network to increase the system availability
  
:::

在primihub-node启动参数参数config指定的yaml配置文件可以指定接入的启动点。需要定义p2p/bootstrap_nodes列表。

```yaml

p2p:
  bootstrap_nodes:
    - "/ip4/172.28.1.13/tcp/4001/ipfs/QmP2C45o2vZfy1JXWFZDUEzrQCigMtd4r3nesvArV8dFKd"
    - "/ip4/172.28.1.13/tcp/4001/ipfs/QmdSyhb8eR9dDSR5jjnRoTDBwpBCSAjT7WueKJ9cQArYoA"
  multi_addr: "/ip4/172.28.1.12/tcp/8882"

```
## Field definition for p2p

* bootstrap_nodes：Bootstrap Node list，set according to your actual situation
* multi_addr: The resource registration protocol address of the current Node
