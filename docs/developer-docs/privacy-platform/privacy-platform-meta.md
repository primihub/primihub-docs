# 管理平台中心节点
管理平台中心节点是基于spring boot，并用maven编译
## 服务开始
首先在启动项目之前需要用到以下依赖
- [jdk 1.8](https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html)
- [maven](https://maven.apache.org/download.cgi)
- [nacos 2.0.3](https://github.com/alibaba/nacos/releases/tag/2.0.3) or [2.0.4](https://github.com/alibaba/nacos/releases/tag/2.0.4)
- [mysql 5.0+](https://dev.mysql.com/downloads/mysql)


## 修改配置
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

## 编译打包
运行以下命令:

    mvn clean install -Dmaven.test.skip=true -Dasciidoctor.skip=true -Dos.detected.classifier=linux-x86_64
当操作系统是windows或者是mac需要改这个参数"-Dos.detected.classifier"，改为"windows-x86_64" or "osx-x86_64".

只要完成信息出现就编译成功了

## 运行
运行前需要确保所依赖的项目都是可用的而且配置文件都正确

    java -jar -Dfile.encoding=UTF-8 ./meta-api/target/*-SNAPSHOT.jar --server.port=8099

执行完命令后检查下列端口是否启动:
    
    http://localhost:8099/fusion/healthConnection
