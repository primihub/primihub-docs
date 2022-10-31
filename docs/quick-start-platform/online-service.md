---
sidebar_position: 1
---

# 服务试用
当前提供了三个体验平台：

* https://node1.primihub.com
* https://node2.primihub.com
* https://node3.primihub.com

可在原语官网申请试用：https://primihub.com

![Apply](/img/primihub-platform-apply.png)
![Apply1](/img/primihub01.png)

## 服务部署
在装本地服务前需要先启动node服务（完整的服务体验通常要两个以上）
需要安装git下载代码

    git clone https://github.com/primihub/primihub-platform.git

目录如下：

    ├─primihub-platform
    ├─primihub-fusion
    │   ├─fusion-api
    │   └─script
    ├─primihub-service
    │   ├─application
    │   ├─biz
    │   ├─gateway
    │   └─script
    └─primihub-webconsole

之后可以阅读以下三个连接来进行部署安装：
- [primihub-fusion](/docs/developer-docs/privacy-platform/privacy-platform-fusion) : 用于群组交流，共享资源和资源查询
- [primihub-service](/docs/developer-docs/privacy-platform/privacy-platform-service) : 提供了大多数的服务和API
- [primihub-webconsole](/docs/developer-docs/privacy-platform/privacy-platform-webconsole) : 可视化操作控制台

## 开发者
  关于代码编译和如何贡献代码，请见 [开发者文档](/docs/developer-docs/privacy-platform/)


