---
sidebar_position: 1
---

# Services Trial
Three trial platforms are currently offered:

http://demo1.primihub.com

http://demo2.primihub.com

http://demo3.primihub.com

You can apply for a trial on the website：https://primihub.com

![Apply](/img/primihub-platform-apply.png)
![Apply1](/img/primihub01.png)

## Service Deployment
Befor installing local services, you need to first start node service(the complete service experience usually requires more than two)
You need to install git to download the code

    git clone https://github.com/primihub/primihub-platform.git

Directory as follows：

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

Then you can read the following three connections to deploy and instal：
- [primihub-fusion](/docs/developer-docs/privacy-platform/privacy-platform-fusion) : 
Used for group communication, sharing resources and resource query

- [primihub-service](/docs/developer-docs/privacy-platform/privacy-platform-service) : Provides most of the services and API
- [primihub-webconsole](/docs/developer-docs/privacy-platform/privacy-platform-webconsole) : Visual operation console

## Developer
  About code compilation and how to contribute code，see [Developer Documentation](/docs/developer-docs/privacy-platform/)


