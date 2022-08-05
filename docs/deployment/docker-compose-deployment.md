---
sidebar_position: 1
---

# 使用docker-compose部署

:::tip
为避免端口冲突和网断冲突，请尽量使用干净的机器
:::

### 拉取代码，执行脚本，完成部署

```bash
git clone https://github.com/primihub/primihub-deploy.git
cd docker-deploy
bash deploy.sh
```

执行完成后请稍等2分钟等待数据库初始化和服务启动

### 查看部署结果

```bash
# docker-compose ps -a
NAME                COMMAND                  SERVICE                 STATUS              PORTS
application1        "/bin/sh -c 'java -j…"   application1            running             
application2        "/bin/sh -c 'java -j…"   application2            running             
application3        "/bin/sh -c 'java -j…"   application3            running             
bootstrap_node      "/app/simple-bootstr…"   simple_bootstrap_node   running             4001/tcp
fusion              "/bin/sh -c 'java -j…"   fusion                  running             
gateway1            "/bin/sh -c 'java -j…"   gateway1                running             
gateway2            "/bin/sh -c 'java -j…"   gateway2                running             
gateway3            "/bin/sh -c 'java -j…"   gateway3                running             
mysql               "docker-entrypoint.s…"   mysql                   running             0.0.0.0:3306->3306/tcp, :::3306->3306/tcp
nacos-server        "bin/docker-startup.…"   nacos                   running             0.0.0.0:8848->8848/tcp, 0.0.0.0:9555->9555/tcp, 0.0.0.0:9848->9848/tcp, :::8848->8848/tcp, :::9555->9555/tcp, :::9848->9848/tcp
primihub-redis      "docker-entrypoint.s…"   redis                   running             6379/tcp
primihub-web1       "/docker-entrypoint.…"   nginx1                  running             0.0.0.0:30811->80/tcp, :::30811->80/tcp
primihub-web2       "/docker-entrypoint.…"   nginx2                  running             0.0.0.0:30812->80/tcp, :::30812->80/tcp
primihub-web3       "/docker-entrypoint.…"   nginx3                  running             0.0.0.0:30813->80/tcp, :::30813->80/tcp
primihub_node0      "/bin/bash -c './pri…"   node0                   running             0.0.0.0:8050->50050/tcp, :::8050->50050/tcp
primihub_node1      "/bin/bash -c './pri…"   node1                   running             0.0.0.0:8051->50051/tcp, :::8051->50051/tcp
primihub_node2      "/bin/bash -c './pri…"   node2                   running             0.0.0.0:8052->50052/tcp, :::8052->50052/tcp
rabbitmq1           "docker-entrypoint.s…"   rabbitmq1               running             25672/tcp
rabbitmq2           "docker-entrypoint.s…"   rabbitmq2               running             25672/tcp
rabbitmq3           "docker-entrypoint.s…"   rabbitmq3               running             25672/tcp
```

### 使用说明

docker-compose.yaml 文件中的nginx1、nginx2、nginx3 模拟 3 个机构的管理后台，启动完成后在浏览器分别访问

http://机器IP:30811

http://机器IP:30812

http://机器IP:30813

默认用户密码都是 admin / 123456

具体的联邦建模、隐私求交、匿踪查询等功能的操作步骤请参考 [快速试用管理平台](/docs/quick-start-platform)

### 停止服务

```bash
# 在启动服务的目录下执行
docker-compose down
```