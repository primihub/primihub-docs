---
sidebar_position: 1
description: Use docker-compose to deploy PrimiHub privacy computing platform on a single machine
keywords: [docker-compose]
---

# docker-all-in-one

:::tip
To avoid port collisionssegment collisions, try to use a clean machine
:::

### Deployment Request

* Machine configuration minimum 8 cores 16G, disk 40G
* `docker-compose` version greater than 2.2

### Download the code, execute the script, and deploy

```bash
git clone https://github.com/primihub/primihub-deploy.git
cd primihub-deploy/docker-all-in-one
bash deploy.sh
```

Once the execution is complete, wait a few minutes for the database to initialize and the service to start

### View deployment results

```bash
# docker-compose ps -a
NAME                COMMAND                  SERVICE             STATUS              PORTS
application1        "/bin/sh -c 'java -j…"   application1        running (healthy)   
application2        "/bin/sh -c 'java -j…"   application2        running (healthy)   
application3        "/bin/sh -c 'java -j…"   application3        running (healthy)   
fusion              "/bin/sh -c 'java -j…"   fusion              running             
gateway1            "/bin/sh -c 'java -j…"   gateway1            running             
gateway2            "/bin/sh -c 'java -j…"   gateway2            running             
gateway3            "/bin/sh -c 'java -j…"   gateway3            running             
loki                "/usr/bin/loki -conf…"   loki                running             0.0.0.0:3100->3100/tcp, :::3100->3100/tcp
manage-web1         "/docker-entrypoint.…"   nginx1              running             0.0.0.0:30811->80/tcp, :::30811->80/tcp
manage-web2         "/docker-entrypoint.…"   nginx2              running             0.0.0.0:30812->80/tcp, :::30812->80/tcp
manage-web3         "/docker-entrypoint.…"   nginx3              running             0.0.0.0:30813->80/tcp, :::30813->80/tcp
mysql               "docker-entrypoint.s…"   mysql               running (healthy)   0.0.0.0:3306->3306/tcp, :::3306->3306/tcp
nacos-server        "bin/docker-startup.…"   nacos               running (healthy)   0.0.0.0:8848->8848/tcp, 0.0.0.0:9848->9848/tcp, :::8848->8848/tcp, :::9848->9848/tcp
primihub-node0      "/bin/bash -c './pri…"   node0               running             0.0.0.0:50050->50050/tcp, :::50050->50050/tcp
primihub-node1      "/bin/bash -c './pri…"   node1               running             0.0.0.0:50051->50051/tcp, :::50051->50051/tcp
primihub-node2      "/bin/bash -c './pri…"   node2               running             0.0.0.0:50052->50052/tcp, :::50052->50052/tcp
rabbitmq1           "docker-entrypoint.s…"   rabbitmq1           running             25672/tcp
rabbitmq2           "docker-entrypoint.s…"   rabbitmq2           running             25672/tcp
rabbitmq3           "docker-entrypoint.s…"   rabbitmq3           running             25672/tcp
redis               "docker-entrypoint.s…"   redis               running             6379/tcp
```

### Instructions

nginx1, nginx2, and nginx3 in docker-compose.yaml file simulate the management background of three institutions, and they can be accessed in the browser after starting

http://IP:30811

http://IP:30812

http://IP:30813

Default user and password admin / 123456

For instructions on how to use the platform, please refer to the [Operating Instructions Manual for the Management Platform](https://m74hgjmt55.feishu.cn/file/boxcnXqmyAG9VpqjaCb7RP7Isjg)
### Stop the Service

```bash
# Execute in the directory where the service was started
docker-compose down
```