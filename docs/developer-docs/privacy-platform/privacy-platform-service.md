# 管理平台服务节点
管理平台服务是基于spring cloud构建的，并用maven进行编译

## 服务开始
首先在启动项目之前需要用到以下依赖
- [jdk 1.8](https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html)
- [maven](https://maven.apache.org/download.cgi)
- [nacos 2.0.3](https://github.com/alibaba/nacos/releases/tag/2.0.3) or [2.0.4](https://github.com/alibaba/nacos/releases/tag/2.0.4)
- [mysql 5.0+](https://dev.mysql.com/downloads/mysql)
- [redis 5.0+](https://redis.io/download/)
- [RabbitMQ](https://github.com/rabbitmq/rabbitmq-server/releases/tag/v3.10.6)

## 修改配置
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

最后需要在mysql里执行"ddl.sql"

注意的是：在base.json中需要修改以grpc前缀配置node grpc的地址

## 编译打包
在linux下需要运行以下命令

    mvn clean install -Dmaven.test.skip=true -Dasciidoctor.skip=true -Dos.detected.classifier=linux-x86_64

当操作系统是windows或者是mac需要改这个参数"-Dos.detected.classifier"，改为"windows-x86_64" or "osx-x86_64".

只要完成信息出现就编译成功了

## 运行
运行前需要确保所依赖的项目都是可用的而且配置文件都正确

    java -jar -Dfile.encoding=UTF-8 ./application/target/*-SNAPSHOT.jar --server.port=8090
    java -jar -Dfile.encoding=UTF-8 ./gateway/target/*-SNAPSHOT.jar --server.port=8088

在不同的终端执行上面两条命令，然后检查下列端口是否启动:
    
    http://localhost:8088/sys/user/login
