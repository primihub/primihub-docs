---
sidebar_position: 3
---

# Connect boostrap nodes

*** Connect to the specified boostrap node ***

:::tip About boostrap node

* The boostrap node is the launch point of the p2p network for primihub node network dataset metadata registration and discovery
* There can be multiple boostrap nodes in the actual working network to increase system availability
  
:::

The yaml configuration file specified in the primihub-node startup parameter parameter config can specify the access startup point. A list of p2p/bootstrap_nodes needs to be defined.

```yaml

p2p:
  bootstrap_nodes:
    - "/ip4/172.28.1.13/tcp/4001/ipfs/QmP2C45o2vZfy1JXWFZDUEzrQCigMtd4r3nesvArV8dFKd"
    - "/ip4/172.28.1.13/tcp/4001/ipfs/QmdSyhb8eR9dDSR5jjnRoTDBwpBCSAjT7WueKJ9cQArYoA"
  multi_addr: "/ip4/172.28.1.12/tcp/8882"

```
## p2p field definition

* bootstrap_nodes: list of bootstrap nodes, set according to your actual situation
* multi_addr: The resource registration protocol address of the current node (Node)
