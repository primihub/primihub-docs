---
sidebar_position: 2
---

# 快速试用管理平台

## 服务试用
当前提供了三个试用平台：

http://demo1.primihub.com

http://demo2.primihub.com

http://demo3.primihub.com

可在原语官网申请试用：https://primihub.com

![Apply](./primihub-platform-apply.png)
![Apply1](/img/primihub01.png)

## 创建一个简单的项目
![sample_project](/img/sample_project.jpg) 

按照目录我的项目->新建项目的指引选择并填写对应的内容，即可创建属于你自己的项目，申请资源后并等待协作方的审核:

![sample_verification](/img/sample_verification.jpg) 

审核通过后就可以创建模型了

![sample_model](/img/sample_model.jpg) 

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


