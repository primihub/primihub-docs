# 隐私计算平台
原语隐私计算平台是原语科技有限公司发起的开源项目，为联邦学习，同态加密，多方安全计算等一系列隐私计算提供了方便快捷安全的计算框架
## 项目架构
![primihub frame](./primihub_frame.png) 

目前是由各业务方（包括gateway、service、node）分享资源到不同的中心节点（fusion），再通过各自业务方的网关（gateway）进行数据复制，审核和认证，最后通知多方的node节点进行联邦计算和MPC等任务。

由于各个业务方的服务是独立部署的，且进行分享的数据只是数据的简介，并不会泄露真正的数据，而通过node节点任务的执行保证了隐私计算的一系列安全操作。

##服务试用
当前提供了三个试用平台：

http://demo1.primihub.com

http://demo2.primihub.com

http://demo3.primihub.com

可在原语官网申请试用：https://primihub.com

##创建一个简单的项目
![sample_project](./sample_project.jpg) 

按照目录我的项目->新建项目的指引选择并填写对应的内容，即可创建属于你自己的项目，申请资源后并等待协作方的审核:

![sample_verification](./sample_verification.jpg) 

审核通过后就可以创建模型了

![sample_model](./sample_model.jpg) 

##服务部署
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
- [primihub-fusion](./primihub-fusion/README.md) : 用于群组交流，共享资源和资源查询
- [primihub-service](./primihub-service/README.md) : 提供了大多数的服务和API
- [primihub-webconsole](./primihub-webconsole/README.md) : 可视化操作控制台