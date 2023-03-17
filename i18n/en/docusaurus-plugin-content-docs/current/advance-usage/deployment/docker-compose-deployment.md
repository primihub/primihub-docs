---
sidebar_position: 1
---

# Use docker-compose for deployment

:::tip
To avoid port collisions and network segment collisions, try to use a clean machine
:::

### Download the installation package, execute the script, and deploy

```bash
curl -s https://get.primihub.com/release/latest/docker-deploy.tar.gz | tar zxf -
cd docker-deploy
bash deploy.sh
```
:::tip
Ignore this error
tar: Ignoring unknown extended header keyword `LIBARCHIVE.xattr.com.apple.FinderInfo'
:::

Once the execution is complete, wait a few minutes for the database to initialize and the service to start

### View deployment results

```bash
# docker-compose ps -a
NAME                COMMAND                  SERVICE                 STATUS              PORTS
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

### Instructions

nginx1, nginx2, and nginx3 in docker-compose.yaml file simulate the management background of three institutions, and they can be accessed in the browser after starting

http://IP:30811

http://IP:30812

http://IP:30813

Default user and password admin / 123456

Please refer to [Quick Start Management Platform](/docs/quick-start-platform) for detailed operation steps of federated modeling, privacy intersection, hiding whereabouts query and other functions.
### Stop the Service

```bash
# Execute in the directory where the service was started
docker-compose down
```