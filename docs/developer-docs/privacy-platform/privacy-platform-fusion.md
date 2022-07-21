# 管理平台中心节点
管理平台中心节点是基于spring boot，并用maven编译
## 服务开始
首先在启动项目之前需要用到以下依赖
- [jdk 1.8](https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html)
- [maven](https://maven.apache.org/download.cgi)
- [mysql 5.0+](https://dev.mysql.com/downloads/mysql)


## 修改配置
需要先找到这个位置:

    ./fusion-api/src/main/resources/

编辑"application.yaml"这个文件，将里面的配置改成依赖部署的地址（默认激活的环境为dev，可修改application-dev.yaml）

特别是下面这些配置项需要注意：

    server:
      port: 
    spring:
      profiles:
        active: 
    ...
    spring:
      datasource:
        druid:
          ...:
            username: 
            url: 
            password: 

然后定位到script文件夹:

    ./script
        init.sql


最后需要在mysql里执行"init.sql"

## 编译打包
运行以下命令:

    mvn clean install -Dmaven.test.skip=true 

只要完成信息出现就编译成功了

## 运行
运行前需要确保所依赖的项目都是可用的而且配置文件都正确

    java -jar -Dfile.encoding=UTF-8 ./fusion-api/target/*-SNAPSHOT.jar --server.port=8090

执行完命令后检查下列端口是否启动:
    
    http://localhost:8090/fusion/healthConnection
