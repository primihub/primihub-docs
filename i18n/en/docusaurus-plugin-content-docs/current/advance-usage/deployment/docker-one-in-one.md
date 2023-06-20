---
sidebar_position: 2
description: Using docker-compose for multi-machine/offsite deployment of the PrimiHub Privacy Computing Platform
keywords: [docker-compose]
---

# docker-one-in-one

### Deployment Request

* Machine configuration minimum 8 cores 16G, disk 40G
* `docker-compose` version greater than 2.2
* 3 machines need network interoperability or open `9099, 30080, 50050` ports for the other two nodes to access

## Deployment Steps

1. Install docker and docker-compose (run on all 3 machines)
```bash
wget https://primihub.oss-cn-beijing.aliyuncs.com/dev/docker20.10.tar.gz
tar xf docker20.10.tar.gz
cd docker20.10
bash install_docker.sh
```

2. Deployment Platform 
```bash
# Download the code (run on all 3 machines)
git clone https://github.com/primihub/primihub-deploy.git
cd primihub-deploy/docker-one-in-one

# On the first machine, run:
bash deploy.sh

# On the second machine, run:
sed -i "s/node0/node1/g" docker-compose.yaml
bash deploy.sh

# On the third machine, run:
sed -i "s/node0/node2/g" docker-compose.yaml
bash deploy.sh
```

### View deployment results
```bash
# docker-compose ps -a
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

3. Install the loki plugin (optional)(run on all 3 machines)
To enable logging on the page, you need to install `loki`'s `docker plugin` first

```bash
docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions
```

Configure to collect logs for all docker containers
```bash
# vim /etc/docker/daemon.json  # Add the following
{
  "log-driver": "loki",
  "log-opts": {
    "loki-url": "http://127.0.0.1:3100/loki/api/v1/push",
    "max-size": "50m",
    "max-file": "10"
  }
}
```

Restart the docker service
```bash
systemctl restart docker
```


### Instructions

After all 3 machines have been started, visit each of them in your browser

http://IP:30080

Default user and password admin / 123456

For instructions on how to use the platform, please refer to the [Operating Instructions Manual for the Management Platform](https://m74hgjmt55.feishu.cn/file/boxcnXqmyAG9VpqjaCb7RP7Isjg)


### Stop the Service

run on all 3 machinesv
```bash
docker-compose down
```