---
sidebar_position: 2
description: 使用 docker-compose 多机/异地部署 PrimiHub 隐私计算平台
keywords: [docker-compose]
---

# docker-compose多机/异地部署

### 部署要求

* 机器配置最低8核16G，磁盘40G
* `docker-compose` 版本大于2.2
* 3台机器需要网络互通或开放`9099，30080，50050`端口让另外两个节点可访问

## 部署步骤

1. 安装docker和docker-compose（在3台机器上都执行）

```bash
wget https://primihub.oss-cn-beijing.aliyuncs.com/dev/docker20.10.tar.gz
tar xf docker20.10.tar.gz
cd docker20.10
bash install_docker.sh
```

2. 部署平台

```bash
# 下载代码 （在三台机器上都执行）
git clone https://github.com/primihub/primihub-deploy.git
cd primihub-deploy/docker-one-in-one

# 在第一台机器上，执行
bash deploy.sh

# 在第二台机器上，执行
sed -i "s/node0/node1/g" docker-compose.yaml
bash deploy.sh

# 在第三台机器上，执行
sed -i "s/node0/node2/g" docker-compose.yaml
bash deploy.sh
```

### 查看部署结果

```shell
docker-compose ps -a
```

```shell
NAME                COMMAND                  SERVICE             STATUS              PORTS
application         "/bin/sh -c 'java -j…"   application         running (healthy)   
gateway             "/bin/sh -c 'java -j…"   gateway             running             
loki                "/usr/bin/loki -conf…"   loki                running             0.0.0.0:3100->3100/tcp, :::3100->3100/tcp
manage-web          "/docker-entrypoint.…"   nginx               running             0.0.0.0:30080->80/tcp, :::30080->80/tcp
meta                "/bin/sh -c 'java -j…"   meta                running (healthy)   0.0.0.0:9099->9099/tcp, :::9099->9099/tcp
mysql               "docker-entrypoint.s…"   mysql               running (healthy)   33060/tcp
nacos-server        "bin/docker-startup.…"   nacos               running (healthy)   0.0.0.0:8848->8848/tcp, :::8848->8848/tcp
node                "/bin/bash -c './pri…"   node                running             0.0.0.0:50050->50050/tcp, :::50050->50050/tcp
rabbitmq            "docker-entrypoint.s…"   rabbitmq            running             25672/tcp
redis               "docker-entrypoint.s…"   redis               running             6379/tcp
```

3. 安装loki插件（可选）(3台机器上都执行)
如需开启在页面上显示日志的功能，则需要先安装 `loki` 的 `docker plugin`

```bash
docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions
```

配置收集所有docker容器的日志

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

### 访问页面

3台机器都启动完成后，在浏览器分别访问

<http://第一台机器的IP:30080>

<http://第二台机器的IP:30080>

<http://第三台机器的IP:30080>

默认用户密码都是 admin / 123456

平台的使用说明请参考 [管理平台操作说明手册](https://m74hgjmt55.feishu.cn/file/boxcnXqmyAG9VpqjaCb7RP7Isjg)

### 停止服务

在3台机器上都执行

```bash
docker-compose down
```
