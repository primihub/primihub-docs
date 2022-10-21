# Manage Platform service Nodes
Manage Platform service is build on spring cloud，and compiled with maven

## Start the service
First, you'll need the following dependencies before starting the project
- [jdk 1.8](https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html)
- [maven](https://maven.apache.org/download.cgi)
- [nacos 2.0.3](https://github.com/alibaba/nacos/releases/tag/2.0.3) or [2.0.4](https://github.com/alibaba/nacos/releases/tag/2.0.4)
- [mysql 5.0+](https://dev.mysql.com/downloads/mysql)
- [redis 5.0+](https://redis.io/download/)
- [RabbitMQ](https://github.com/rabbitmq/rabbitmq-server/releases/tag/v3.10.6)

## Modify the configuration
Find the location first:

    ./application/src/main/resources/
    ./gateway/src/main/resources/

Edit the "application.yaml" file and change the configuration to the location of the dependency deployment (the default is dev, you can change application-dev.yaml)

In particular, look out for the following configuration options：

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

And then we go to this path:

    ./script
        base.json
        database.yaml
        ddl.sql
        init.sql
        redis.yaml

Next we need to log in to nacos configuration address (usually http://localhost:8848/nacos), create base.json,database.yaml,redis.yaml configuration by the three files to your namespace

Modify the dependency addresses for these configurations.

    spring:
      datasource:
        druid:
          ...:
            username: 
            url: 
            password: 


go to the path:

    ./script
        init.sh

Execute the following command:

    cd ./script
    sh init.sh [your mysql username] [your mysql password]

Or execute "ddl.sql" manually in the mysql admin.

Note: In base.json, you need to change the address where node grpc is prefixed with grpc

## 编译打包
Execute the following command:

    mvn clean install -Dmaven.test.skip=true -Dasciidoctor.skip=true -Dos.detected.classifier=linux-x86_64

For windows or mac, change "-Dos.detected.classifier" to "windows-x86_64" or "osx-x86_64".

As soon as the completion message appears, the compilation is successful

## Run
Make sure the dependencies are available and the configuration files are correct before you run them

    java -jar -Dfile.encoding=UTF-8 ./application/target/*-SNAPSHOT.jar --server.port=8090
    java -jar -Dfile.encoding=UTF-8 ./gateway/target/*-SNAPSHOT.jar --server.port=8088

After executing the command, check whether the following ports are open:
    
    http://localhost:8088/sys/user/login
