---
sidebar_position: 1
keywords: [服务试用]
description: 介绍如何试用开源隐私计算平台 PrimiHub
---

# 服务试用
当前提供了三个试用平台：

* http://demo1.primihub.com
* http://demo2.primihub.com
* http://demo3.primihub.com

可在原语官网申请试用：https://primihub.com

![Apply](/img/primihub-platform-apply.png)
![Apply1](/img/primihub01.png)

## 服务部署
在装本地服务前需要先启动 `node` 服务（完整的服务体验通常要两个以上），需要安装 `git` 下载代码：

```shell
git clone https://github.com/primihub/primihub-platform.git
```

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
- [primihub-service](/docs/developer-docs/privacy-platform/privacy-platform-service) : 提供了大多数的服务和 API
- [primihub-webconsole](/docs/developer-docs/privacy-platform/privacy-platform-webconsole) : 可视化操作控制台

## 开发者
关于代码编译和如何贡献代码，请见[开发者文档](/docs/developer-docs/privacy-platform/)。
