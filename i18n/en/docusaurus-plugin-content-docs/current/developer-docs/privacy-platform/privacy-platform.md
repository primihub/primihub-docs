---
sidebar_position: 1
---

# Management platform Architecture
![primihub frame](/img/primihub_frame.png) 

目前是由各业务方（包括gateway、service、node）分享资源到不同的中心节点（fusion），再通过各自业务方的网关（gateway）进行数据复制，审核和认证，最后通知多方的node节点进行联邦计算和MPC等任务。

由于各个业务方的服务是独立部署的，且进行分享的数据只是数据的简介，并不会泄露真正的数据，而通过node节点任务的执行保证了隐私计算的一系列安全操作。