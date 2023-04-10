---
sidebar_position: 2
keywords: [bootstrap]
description: Start the PrimiHub node manually
---

# Bootstrap Nodes

 *** Start the test node via a Golang application *** 

 :::tip
Since the binaries are compiled with Ubuntu 20.04 and other systems depend on different versions, they are currently only supported on Ubuntu 20.04
:::

## Run redis (Recommended)

When using `CentOS` or `Ubuntu`, you can install redis directly with the following command
```
yum install redis -y  #CentOS
apt install redis -y  #Ubuntu
```
Then change the `requirepass` field in the `/etc/redis/redis.conf` file to set the `redis` password, which needs to be the same as the `. /config/node*.yaml` file in the `redis_password` field.
```
sed -i 's/# requirepass foobared/requirepass primihub/' /etc/redis/redis.conf
```
Finally, use the following command to start `redis`
```
systemctl start redis
```

Or just use `docker` to quickly start `redis`

```
docker run --name redis -p 6379:6379 -d redis:latest --requirepass "primihub"
```
 
<!-- ## Running the Bootstrap Nodes （This step can be ignored when using redis for dataset lookup）

You could directly download the binary file from GitHub release:

```shell
curl -L https://github.com/primihub/simple-bootstrap-node/releases/download/v0.0.1/simple-bootstrap-node-darwin-amd64.tar.gz|tar xzv simple-bootstrap-node
./simple-bootstrap-node
```

or, compile it from the source code:

```shell
git clone https://github.com/primihub/simple-bootstrap-node.git && cd simple-bootstrap-node
go mod tidy
go run main.go
```

Or run the bootstrap-node with docker
```shell
docker run --name bootstrap-node -d -p 4001:4001 primihub/simple-bootstrap-node:1.0
``` -->


## Run Node

Download the repository and go to the root of the code:

```shell
git clone https://github.com/primihub/primihub.git
cd primihub
```
Install runtime dependencies (python must be 3.8)
```
apt-get install -y python3 python3-dev libgmp-dev python3-pip libmysqlclient-dev
```
Download the compiled binaries and check out the latest version on GitHub [release page](https://github.com/primihub/primihub/releases).

```shell
curl -L https://github.com/primihub/primihub/releases/download/1.6.4/primihub-linux-amd64.tar.gz | tar xzv
```

Run it in three different terminals from the root directory:

```shell
./bazel-bin/node --node_id=node0 --service_port=50050 --config=./config/node0.yaml
```

```shell
./bazel-bin/node --node_id=node1 --service_port=50051 --config=./config/node1.yaml
```

```shell
./bazel-bin/node --node_id=node2 --service_port=50052 --config=./config/node2.yaml
```

:::tip Connect custom data
You could use the flag `--config` to specific a custom data by a YAML configuration file, see also [connect datasource](./connect-datasource).
:::

