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
```
Start three meta service services by default

The service logs are stored in the meta_log0, meta_log1, and meta_log2 files in the current directory

Check if the service is running properly by using the command ``ps -ef | grep fusion-simple.jar``
```
ps -ef | grep fusion-simple.jar
root     298757       1 99 13:33 pts/8    00:00:10 java -jar fusion-simple.jar --server.port=7877 --grpc.server.port=7977 --db.path=/home/cuibo/meta_service/storage/node0 --collaborate=http://127.0.0.1:7878/,http://127.0.0.1:7879/
root     298758       1 99 13:33 pts/8    00:00:10 java -jar fusion-simple.jar --server.port=7878 --grpc.server.port=7978 --db.path=/home/cuibo/meta_service/storage/node1 --collaborate=http://127.0.0.1:7877/,http://127.0.0.1:7879/
root     298759       1 99 13:33 pts/8    00:00:10 java -jar fusion-simple.jar --server.port=7879 --grpc.server.port=7979 --db.path=/home/cuibo/meta_service/storage/node2 --collaborate=http://127.0.0.1:7878/,http://127.0.0.1:7877/
``` -->

## Run Node

Install runtime dependencies (python must be 3.8)
```
apt-get install -y python3 python3-dev libgmp-dev python3-pip libmysqlclient-dev
```
Download the compiled binaries and check out the latest version on GitHub [release page](https://github.com/primihub/primihub/releases).

```shell
curl -L https://github.com/primihub/primihub/releases/download/1.6.6/primihub-linux-amd64.tar.gz | tar xz
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