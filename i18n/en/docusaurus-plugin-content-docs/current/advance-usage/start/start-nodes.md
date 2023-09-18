---
sidebar_position: 2
keywords: [bootstrap]
description: Start the PrimiHub node manually
---

# binary start

:::tip
Currently the binaries are only supported for Ubuntu 20.04 and MacOS systems
:::


Install the JDK8 environment

```bash
# Ubuntu
apt install openjdk-8-jdk
# MacOS
brew install --build-from-source openjdk@8
```
<!-- 
Download the `Meta service` installation package and start

```bash
wget https://primihub.oss-cn-beijing.aliyuncs.com/tools/meta_service.tar.gz
tar -zxf meta_service.tar.gz
cd meta_service
bash run.sh
``` -->

## Run Node

Install runtime dependencies (python must be 3.8)
```
apt-get install -y python3 python3-dev libgmp-dev python3-pip libmysqlclient-dev
```
Download the compiled binaries and check out the latest version on GitHub [release page](https://github.com/primihub/primihub/releases).

```shell
export TAG=1.6.10
curl -L https://github.com/primihub/primihub/releases/download/$TAG/primihub-linux-amd64.tar.gz | tar xz
```

After downloading and unpacking, execute `start_server.sh` to start the node

```shell
bash start_server.sh
```
Check the log, it starts normally as follows
```
# tail -f log_node0
...
I20230619 18:53:17.816563 29477 grpc_impl.cc:49] PutMeta to node: [:127.0.0.1:7977:0:] rpc succeeded.
I20230619 18:53:17.817224 29477 main.cc:55] server runing in no tls mode
I20230619 18:53:17.818142 29477 main.cc:86]  💻 Node listening on port: 50050
```
:::tip Connect custom data
You could use the flag `--config` to specific a custom data by a YAML configuration file, see also [connect datasource](./connect-datasource).
:::

### Create task

After the startup is successful, you can refer to[create task](https://docs.primihub.com/docs/category/%E5%88%9B%E5%BB%BA%E4%BB%BB%E5%8A%A1) run tasks.