---
sidebar_position: 1
description: 使用 docker-compose 单机部署 PrimiHub 隐私计算平台
keywords: [docker-compose]
---

# docker-compose 单机部署

*** 部署完整的PrimiHub隐私计算管理平台 *** 

:::tip
为避免端口冲突，请尽量使用干净的机器
:::
### 部署要求

* 机器配置最低8核16G，磁盘40G
* `docker-compose` 版本大于2.2

### 下载代码，执行脚本，完成部署

```bash
git clone https://github.com/primihub/primihub-deploy.git
cd primihub-deploy/docker-all-in-one
bash deploy.sh
```

执行完成后请等待镜像下载、数据库初始化和服务启动，确认MySQL，Nacos，application等应用状态为`healthy`则启动完成✅

### 查看部署结果

```bash
# docker-compose ps -a
NAME                COMMAND                  SERVICE             STATUS              PORTS
application0        "/bin/sh -c 'java -j…"   application0        running (healthy)   
application1        "/bin/sh -c 'java -j…"   application1        running             
application2        "/bin/sh -c 'java -j…"   application2        running             
gateway0            "/bin/sh -c 'java -j…"   gateway0            running             
gateway1            "/bin/sh -c 'java -j…"   gateway1            running             
gateway2            "/bin/sh -c 'java -j…"   gateway2            running             
loki                "/usr/bin/loki -conf…"   loki                running             0.0.0.0:3100->3100/tcp, :::3100->3100/tcp
manage-web0         "/docker-entrypoint.…"   nginx0              running             0.0.0.0:30811->80/tcp, :::30811->80/tcp
manage-web1         "/docker-entrypoint.…"   nginx1              running             0.0.0.0:30812->80/tcp, :::30812->80/tcp
manage-web2         "/docker-entrypoint.…"   nginx2              running             0.0.0.0:30813->80/tcp, :::30813->80/tcp
mysql               "docker-entrypoint.s…"   mysql               running (healthy)   0.0.0.0:3306->3306/tcp, :::3306->3306/tcp
nacos-server        "bin/docker-startup.…"   nacos               running (healthy)   0.0.0.0:8848->8848/tcp, :::8848->8848/tcp
primihub-meta0      "/bin/sh -c 'java -j…"   meta0               running (healthy)   
primihub-meta1      "/bin/sh -c 'java -j…"   meta1               running             
primihub-meta2      "/bin/sh -c 'java -j…"   meta2               running             
primihub-node0      "/bin/bash -c './pri…"   node0               running             0.0.0.0:50050->50050/tcp, :::50050->50050/tcp
primihub-node1      "/bin/bash -c './pri…"   node1               running             0.0.0.0:50051->50051/tcp, :::50051->50051/tcp
primihub-node2      "/bin/bash -c './pri…"   node2               running             0.0.0.0:50052->50052/tcp, :::50052->50052/tcp
rabbitmq0           "docker-entrypoint.s…"   rabbitmq0           running             25672/tcp
rabbitmq1           "docker-entrypoint.s…"   rabbitmq1           running             25672/tcp
rabbitmq2           "docker-entrypoint.s…"   rabbitmq2           running             25672/tcp
redis               "docker-entrypoint.s…"   redis               running             6379/tcp
```

### 安装loki插件(可选)

如需开启在页面上显示日志的功能，则需要先安装 `loki` 的 `docker plugin`

```bash
docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions
```

然后配置收集所有docker容器的日志
```bash
# vim /etc/docker/daemon.json  添加以下内容
{
  "log-driver": "loki",
  "log-opts": {
    "loki-url": "http://127.0.0.1:3100/loki/api/v1/push",
    "max-size": "50m",
    "max-file": "10"
  }
}
```

配置好之后重启docker服务
```bash
systemctl restart docker
```

### 使用说明

docker-compose.yaml 文件中的nginx1、nginx2、nginx3 模拟 3 个机构的管理后台，启动完成后在浏览器分别访问

http://机器IP:30811

http://机器IP:30812

http://机器IP:30813

默认用户密码都是 admin / 123456

具体的联邦学习、隐私求交、隐匿查询等功能的操作步骤请参考 [管理平台操作说明手册](/docs/quick-start-platform)

### 停止服务

```bash
# 在启动服务的目录下执行
docker-compose down
```