---
sidebar_position: 1
---

# 管理平台架构
![primihub frame](/img/primihub_frame.png) 

目前是由各业务方（包括gateway、service、meta、node）进行协作方合作申请，再通过各自业务方的网关（gateway）进行数据复制，审核和认证，最后通知多方的node节点进行联邦计算和MPC等任务。

由于各个业务方的服务是独立部署的，且进行数据集交换的数据只是数据的简介和数据集节点地址信息，并不会泄露真正的数据，而通过node节点任务的执行保证了隐私计算的一系列安全操作。

## 服务部署
在装本地服务前需要先启动node服务（完整的服务体验通常要两个以上）
需要安装git下载代码
### primihub-meta

    git clone https://github.com/primihub/primihub-meta.git

目录如下:

    ├─primihub-meta
        ├─meta-api
        ├─meta-grpc
        └─meta-simple

### primihub-platform

    git clone https://github.com/primihub/primihub-platform.git

目录如下:

    ├─primihub-platform
        ├─primihub-sdk
        ├─primihub-service
        │   ├─application
        │   ├─biz
        │   ├─gateway
        │   └─script
        └─primihub-webconsole



之后可以阅读以下三个连接来进行部署安装：
- [primihub-meta](/docs/developer-docs/privacy-platform/privacy-platform-meta) : 用于群组交流，共享资源和资源查询
- [primihub-service](/docs/developer-docs/privacy-platform/privacy-platform-service) : 提供了大多数的服务和API
- [primihub-webconsole](/docs/developer-docs/privacy-platform/privacy-platform-webconsole) : 可视化操作控制台

## 开发者
  关于代码编译和如何贡献代码，请见 [开发者文档](/docs/developer-docs/privacy-platform/)

