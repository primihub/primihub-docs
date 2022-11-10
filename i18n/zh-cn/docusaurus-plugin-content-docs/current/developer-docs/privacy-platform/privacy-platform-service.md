---
sidebar_position: 2
keywords: [管理平台服务节点]
description: 介绍开源隐私计算平台 PrimiHub 的管理平台服务节点
---

# 管理平台服务节点
管理平台中心节点是基于 `Spring Boot` ，并用 `Maven` 编译。

## 服务开始
首先在启动项目之前需要用到以下依赖：

- [JDK 1.8](https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html)
- [Maven](https://maven.apache.org/download.cgi)
- [Nacos 2.0.3](https://github.com/alibaba/nacos/releases/tag/2.0.3) 或 [2.0.4](https://github.com/alibaba/nacos/releases/tag/2.0.4)
- [MySQL 5.0+](https://dev.mysql.com/downloads/mysql)
- [Redis 5.0+](https://redis.io/download/)
- [RabbitMQ](https://github.com/rabbitmq/rabbitmq-server/releases/tag/v3.10.6)

## 修改配置
需要先找到这两个位置:

* `./application/src/main/resources/`
* `./gateway/src/main/resources/`

编辑 `application.yaml` 这个文件，将里面的配置改成依赖部署的地址（默认激活的环境为 `dev`，可修改 `application-dev.yaml`）

特别是下面这些配置项需要注意：

```yaml
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
```

然后定位到 `script` 文件夹:

```
./script
    base.json
    database.yaml
    ddl.sql
    init.sql
    redis.yaml
```

接下来我们需要登录nacos的配置地址(通常是 `http://localhost:8848/nacos`) ,创建 base.json,database.yaml,redis.yaml这三个文件到你所配置的 `namespace` 下

然后修改这些配置的依赖地址.

```yaml
spring:
  datasource:
    druid:
      ...:
        username: 
        url: 
        password: 
```

然后我们定位到这个路径:

```
./script
    init.sh
```

去这个路径下执行以下命令:

```
cd ./script
sh init.sh [your mysql username] [your mysql password]
```

或者在 MySQL 管理端手动执行 `ddl.sql`.

注意的是：在 `base.json` 中需要修改以 `grpc` 前缀配置 `node grpc` 的地址

## 编译打包
在 `Linux` 下需要运行以下命令：

```shell
mvn clean install -Dmaven.test.skip=true -Dasciidoctor.skip=true -Dos.detected.classifier=linux-x86_64
```

当操作系统是 `Windows` 或者是 `macOS` 需要改这个参数 `-Dos.detected.classifier`，改为 `windows-x86_64` 或 `osx-x86_64`.

只要完成信息出现就编译成功了。

## 运行
运行前需要确保所依赖的项目都是可用的而且配置文件都正确

```shell
java -jar -Dfile.encoding=UTF-8 ./application/target/*-SNAPSHOT.jar --server.port=8090
java -jar -Dfile.encoding=UTF-8 ./gateway/target/*-SNAPSHOT.jar --server.port=8088
```

在不同的终端执行上面两条命令，然后检查下列端口是否启动：

`http://localhost:8088/sys/user/login`
