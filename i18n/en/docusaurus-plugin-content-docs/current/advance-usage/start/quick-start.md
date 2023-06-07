---
sidebar_position: 1
description: Start an MPC Application in 5 minutes
keywords: [MPC, QuickStart]
---

# Quick Start

:::tip
Minimum machine configuration requirement 4C16G
:::

### Install [docker](https://docs.docker.com/install/overview/) and [docker-compose](https://docs.docker.com/compose/install/)

You can refer to the official documentation to install it yourself or download the following installation package
```
wget https://primihub.oss-cn-beijing.aliyuncs.com/dev/docker20.10.tar.gz
tar xf docker20.10.tar.gz
cd docker20.10/
bash install_docker.sh

# Verify
docker -v
docker-compose version
```
### Start node

Download the code and switch to the code root path

```shell
git clone https://github.com/primihub/primihub.git
cd primihub
```
:::tip
* Currently supported platforms are： `amd64`，`arm64`
:::

Start up three docker containers using docker-compose.
The container includes: three meta serives, three primihub-nodes

```bash
docker-compose up -d
```

View a running docker container：

```shell
docker-compose ps -a
```

```shell
NAME                COMMAND                  SERVICE             STATUS              PORTS
primihub-meta0      "/bin/bash -c 'java …"   meta0               running (healthy)   
primihub-meta1      "/bin/bash -c 'java …"   meta1               running (healthy)   
primihub-meta2      "/bin/bash -c 'java …"   meta2               running (healthy)   
primihub-node0      "/bin/bash -c './pri…"   node0               running             50050/tcp
primihub-node1      "/bin/bash -c './pri…"   node1               running             50050/tcp
primihub-node2      "/bin/bash -c './pri…"   node2               running             50050/tcp
```                                                   

### Create task

After the startup is successful, you can refer to[create task](https://docs.primihub.com/docs/category/%E5%88%9B%E5%BB%BA%E4%BB%BB%E5%8A%A1) run tasks.