---
sidebar_position: 2
keywords: [platform, admin, primihub]
description: PrimiHub 管理平台设计
---

# 管理平台

## 架构设计
![primihub frame](/img/primihub_frame.png) 

目前是由各业务方（包括gateway、service、meta、node）进行协作方合作申请，再通过各自业务方的网关（gateway）进行数据复制，审核和认证，最后通知多方的node节点进行联邦计算和MPC等任务。

由于各个业务方的服务是独立部署的，且进行数据集交换的数据只是数据的简介和数据集节点地址信息，并不会泄露真正的数据，而通过node节点任务的执行保证了隐私计算的一系列安全操作。

### 服务部署
在装本地服务前需要先启动node服务（完整的服务体验通常要两个以上）
需要安装git下载代码
#### primihub-meta

    git clone https://github.com/primihub/primihub-meta.git

目录如下:

    ├─primihub-meta
        ├─meta-api
        ├─meta-grpc
        └─meta-simple

#### primihub-platform

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

### 三个模块
- 中心节点 __primihub-meta__: 用于群组交流，共享资源和资源查询
- 服务节点 __primihub-service__: 提供了大多数的服务和API
- 管理平台 __primihub-webconsole__: 可视化操作控制台

下面是展开介绍。

## 中心节点
管理平台中心节点是基于spring boot，并用maven编译
### 服务开始
首先在启动项目之前需要用到以下依赖
- [jdk 1.8](https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html)
- [maven](https://maven.apache.org/download.cgi)
- [nacos 2.0.3](https://github.com/alibaba/nacos/releases/tag/2.0.3) or [2.0.4](https://github.com/alibaba/nacos/releases/tag/2.0.4)
- [mysql 5.0+](https://dev.mysql.com/downloads/mysql)


### 修改配置
本地配置文件:

    ./meta-api/src/main/resources
        bootstrap.yaml

编辑"bootstrap.yaml"这个文件，将里面的配置改成依赖部署的地址

特别是下面这些配置项需要注意：

    server:
      port: 
    spring:
      profiles:
        active: 
    ...
      nacos:
        discovery:
          server-addr: 
          namespace:
    ...
    nacos:
      config:
        server-addr:

需要先找到这个位置:

    ./script
        fusion.yaml

编辑"fusion.yaml"这个文件，将里面的数据库配置改成依赖部署的地址:

    spring:
      datasource:
        druid:
          ...:
            username: 
            url: 
            password: 

特别注意"fusion.yaml"这个文件需要添加到nacos配置中心

然后我们定位到这个路径:

    ./script
        init.sh

去这个路径下执行以下命令:

    cd ./script
    sh init.sh [your mysql username] [your mysql password]

或者在mysql管理端手动执行"init.sql".

### 编译打包
运行以下命令:

    mvn clean install -Dmaven.test.skip=true -Dasciidoctor.skip=true -Dos.detected.classifier=linux-x86_64
当操作系统是windows或者是mac需要改这个参数"-Dos.detected.classifier"，改为"windows-x86_64" or "osx-x86_64".

只要完成信息出现就编译成功了

### 运行
运行前需要确保所依赖的项目都是可用的而且配置文件都正确

    java -jar -Dfile.encoding=UTF-8 ./meta-api/target/*-SNAPSHOT.jar --server.port=8099

执行完命令后检查下列端口是否启动:
    
    http://localhost:8099/fusion/healthConnection

## 服务节点
管理平台服务是基于spring cloud构建的，并用maven进行编译

### 服务开始
首先在启动项目之前需要用到以下依赖
- [jdk 1.8](https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html)
- [maven](https://maven.apache.org/download.cgi)
- [nacos 2.0.3](https://github.com/alibaba/nacos/releases/tag/2.0.3) or [2.0.4](https://github.com/alibaba/nacos/releases/tag/2.0.4)
- [mysql 5.0+](https://dev.mysql.com/downloads/mysql)
- [redis 5.0+](https://redis.io/download/)
- [RabbitMQ](https://github.com/rabbitmq/rabbitmq-server/releases/tag/v3.10.6)

### 修改配置
需要先找到这两个位置:

    ./application/src/main/resources/
    ./gateway/src/main/resources/

编辑"application.yaml"这个文件，将里面的配置改成依赖部署的地址（默认激活的环境为dev，可修改application-dev.yaml）

特别是下面这些配置项需要注意：

    server:
      port: 
    spring:
      profiles:
        active: 
    ...
      nacos:
        discovery:
          server-addr: 
          namespace:
    ...
    nacos:
      config:
        server-addr:

然后定位到script文件夹:

    ./script
        base.json
        database.yaml
        ddl.sql
        init.sql
        redis.yaml

接下来我们需要登录nacos的配置地址(usually http://localhost:8848/nacos) ,创建 base.json,database.yaml,redis.yaml这三个文件到你所配置的namespace下

然后修改这些配置的依赖地址.

    spring:
      datasource:
        druid:
          ...:
            username: 
            url: 
            password: 


然后我们定位到这个路径:

    ./script
        init.sh

去这个路径下执行以下命令:

    cd ./script
    sh init.sh [your mysql username] [your mysql password]

或者在mysql管理端手动执行"ddl.sql".

注意的是：在base.json中需要修改以grpc前缀配置node grpc的地址

### 编译打包
在linux下需要运行以下命令

    mvn clean install -Dmaven.test.skip=true -Dasciidoctor.skip=true -Dos.detected.classifier=linux-x86_64

当操作系统是windows或者是mac需要改这个参数"-Dos.detected.classifier"，改为"windows-x86_64" or "osx-x86_64".

只要完成信息出现就编译成功了

### 运行
运行前需要确保所依赖的项目都是可用的而且配置文件都正确

    java -jar -Dfile.encoding=UTF-8 ./application/target/*-SNAPSHOT.jar --server.port=8090
    java -jar -Dfile.encoding=UTF-8 ./gateway/target/*-SNAPSHOT.jar --server.port=8088

在不同的终端执行上面两条命令，然后检查下列端口是否启动:
    
    http://localhost:8088/sys/user/login

## 控制台
### 准备依赖
会用到 [node](https://nodejs.org/en/), [git](https://git-scm.com/). 项目是以如下标准为基础的[ES2015+](https://es6.ruanyifeng.com/)、[Vue.Js](https://vuejs.org/)、[Vuex](https://vuex.vuejs.org/)、[Vue-Router](https://router.vuejs.org/)、[antv-x6](https://x6.antv.vision/zh) 和 [vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/).

### 服务开始
1.进入项目一下目录
```bash
cd primihub-webconsole
```
2.安装npm依赖
```bash
npm install
```
3.修改“vue.config.js”这个文件中target变量, 改成需要连接的网关地址
```bash
proxy: {
  '/dev-api': {
    target: 'your gateway url',
    ws: true,
    changeOrigin: true,
    pathRewrite: {
      '^/dev-api': ''
    }
  }
}
```
4.启动项目
```bash
npm run dev

## 浏览器支持
当前大部分浏览器和ie 10+.

<html>
 <head></head>
 <body>
  <table>
   <thead>
    <tr>
     <th><a href="http://godban.github.io/browsers-support-badges/" target="_blank" rel="noopener noreferrer"><img src="./src/assets/browsers-icon/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" class="no-margin" />
       <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewbox="0 0 100 100" width="15" height="15" class="icon outbound">
        <path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> 
        <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon>
       </svg></a><br />IE / Edge</th> 
     <th><a href="http://godban.github.io/browsers-support-badges/" target="_blank" rel="noopener noreferrer"><img src="./src/assets/browsers-icon/firefox_48x48.png" alt="Firefox" width="24px" height="24px" class="no-margin" />
       <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewbox="0 0 100 100" width="15" height="15" class="icon outbound">
        <path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> 
        <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon>
       </svg></a><br />Firefox</th> 
     <th><a href="http://godban.github.io/browsers-support-badges/" target="_blank" rel="noopener noreferrer"><img src="./src/assets/browsers-icon/chrome_48x48.png" alt="Chrome" width="24px" height="24px" class="no-margin" />
       <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewbox="0 0 100 100" width="15" height="15" class="icon outbound">
        <path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> 
        <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon>
       </svg></a><br />Chrome</th> 
     <th><a href="http://godban.github.io/browsers-support-badges/" target="_blank" rel="noopener noreferrer"><img src="./src/assets/browsers-icon/safari_48x48.png" alt="Safari" width="24px" height="24px" class="no-margin" />
       <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewbox="0 0 100 100" width="15" height="15" class="icon outbound">
        <path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> 
        <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon>
       </svg></a><br />Safari</th>
    </tr>
   </thead> 
   <tbody>
    <tr>
     <td>IE10, IE11, Edge</td> 
     <td>last 2 versions</td> 
     <td>last 2 versions</td> 
     <td>last 2 versions</td>
    </tr>
   </tbody>
  </table>
 </body>
</html>
