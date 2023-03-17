---
sidebar_position: 1
description: 使用 docker-compose 部署 PrimiHub 隐私计算开源平台
keywords: [docker-compose]
---

# 使用 docker-compose 部署

:::tip
为避免端口冲突和网段冲突，请尽量使用干净的机器
目前提供docker部署包仅支持单机部署，多机部署及异地部署企业版中已支持，如需要可联系小助手了解。
:::

### 下载安装包，执行脚本，完成部署

```shell
curl -s https://get.primihub.com/release/latest/docker-deploy.tar.gz | tar zxf -
cd docker-deploy
bash deploy.sh
```

:::tip
解压时提示 tar: Ignoring unknown extended header keyword `LIBARCHIVE.xattr.com.apple.FinderInfo' 可忽略
:::

执行完成后请稍等几分钟等待镜像下载、数据库初始化和服务启动

### 查看部署结果

```bash
# docker-compose ps -a
NAME                COMMAND                  SERVICE                 STATUS              PORTS
application1        "/bin/sh -c 'java -j…"   application1            running             
application2        "/bin/sh -c 'java -j…"   application2            running             
application3        "/bin/sh -c 'java -j…"   application3            running             
bootstrap-node      "/app/simple-bootstr…"   simple-bootstrap-node   running             4001/tcp
fusion              "/bin/sh -c 'java -j…"   fusion                  running             
gateway1            "/bin/sh -c 'java -j…"   gateway1                running             
gateway2            "/bin/sh -c 'java -j…"   gateway2                running             
gateway3            "/bin/sh -c 'java -j…"   gateway3                running             
loki                "/usr/bin/loki -conf…"   loki                    running             0.0.0.0:3100->3100/tcp, :::3100->3100/tcp
manage-web1         "/docker-entrypoint.…"   nginx1                  running             0.0.0.0:30811->80/tcp, :::30811->80/tcp
manage-web2         "/docker-entrypoint.…"   nginx2                  running             0.0.0.0:30812->80/tcp, :::30812->80/tcp
manage-web3         "/docker-entrypoint.…"   nginx3                  running             0.0.0.0:30813->80/tcp, :::30813->80/tcp
mysql               "docker-entrypoint.s…"   mysql                   running             0.0.0.0:3306->3306/tcp, :::3306->3306/tcp
nacos-server        "bin/docker-startup.…"   nacos                   running             0.0.0.0:8848->8848/tcp, 0.0.0.0:9555->9555/tcp, 0.0.0.0:9848->9848/tcp, :::8848->8848/tcp, :::9555->9555/tcp, :::9848->9848/tcp
primihub-node0      "/bin/bash -c './pri…"   node0                   running             0.0.0.0:6666->6666/tcp, 0.0.0.0:50050->50050/tcp, :::6666->6666/tcp, :::50050->50050/tcp
primihub-node1      "/bin/bash -c './pri…"   node1                   running             0.0.0.0:6667->6667/tcp, 0.0.0.0:50051->50051/tcp, :::6667->6667/tcp, :::50051->50051/tcp
primihub-node2      "/bin/bash -c './pri…"   node2                   running             0.0.0.0:6668->6668/tcp, 0.0.0.0:50052->50052/tcp, :::6668->6668/tcp, :::50052->50052/tcp
rabbitmq1           "docker-entrypoint.s…"   rabbitmq1               running             25672/tcp
rabbitmq2           "docker-entrypoint.s…"   rabbitmq2               running             25672/tcp
rabbitmq3           "docker-entrypoint.s…"   rabbitmq3               running             25672/tcp
redis               "docker-entrypoint.s…"   redis                   running             6379/tcp
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