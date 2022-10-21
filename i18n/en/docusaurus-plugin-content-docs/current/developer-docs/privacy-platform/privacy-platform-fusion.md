# Management Platform Center Node
Management Platform Center Node is build on spring boot，and compiled with maven
## Start the service
First, you'll need the following dependencies before starting the project
- [jdk 1.8](https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html)
- [maven](https://maven.apache.org/download.cgi)
- [mysql 5.0+](https://dev.mysql.com/downloads/mysql)


## Modify the configuration
Find the location first::

    ./fusion-api/src/main/resources/

Edit the "application.yaml" file and change the configuration to the location of the dependency deployment (the default is dev, you can change application-dev.yaml)

In particular, look out for the following configuration options:

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

And then we go to this path:

    ./script
        init.sh

Execute the following command:

    cd ./script
    sh init.sh [your mysql username] [your mysql password]

Or manually execute "init.sql" in mysql admin.

## 编译打包
Execute the following command:

    mvn clean install -Dmaven.test.skip=true 

As soon as the completion message appears, the compilation is successful

## Run
Make sure the dependencies are available and the configuration files are correct before you run them

    java -jar -Dfile.encoding=UTF-8 ./fusion-api/target/*-SNAPSHOT.jar --server.port=8099

After executing the command, check whether the following ports are open:
    
    http://localhost:8099/fusion/healthConnection
