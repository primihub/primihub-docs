---
sidebar_position: 2
keywords: [boostrap]
description: 下载二进制启动 PrimiHub 节点
displayed_sidebar: lensonsSidebar
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 下载二进制文件启动

:::tip
目前二进制文件仅支持 Ubuntu20.04 和 MacOS 系统运行
:::

安装JDK8环境

<Tabs>
  <TabItem value="Ubuntu">

  ```shell
  apt install openjdk-8-jdk
  ```
  </TabItem>
  <TabItem value="MacOS">

  ```shell
  brew install --build-from-source openjdk@8
  ```
  </TabItem>
</Tabs>

<!-- 下载`Meta service`安装包启动
```bash
wget https://primihub.oss-cn-beijing.aliyuncs.com/tools/meta_service.tar.gz
tar -zxf meta_service.tar.gz
cd meta_service
bash run.sh
``` -->

### 运行节点

安装运行依赖环境(python必须是3.8)

```shell
apt-get install -y python3 python3-dev libgmp-dev python3-pip libmysqlclient-dev
```

下载编译好的二进制文件，在GitHub [release页面](https://github.com/primihub/primihub/releases) 可以查看最新版本。

<Tabs>
<TabItem value="AMD64">

```shell
export TAG=1.6.10
curl -L https://github.com/primihub/primihub/releases/download/$TAG/primihub-linux-amd64.tar.gz | tar xz
```

</TabItem>
<TabItem value="ARM64">

```shell
export TAG=1.6.10
curl -L https://github.com/primihub/primihub/releases/download/$TAG/primihub-linux-arm64.tar.gz | tar xz
```
</TabItem>
</Tabs>

在下载解压完成后，执行`start_server.sh`启动节点

```shell
bash start_server.sh
```

查看日志，如下则启动正常

```shell
tail -f log_node0
```

```shell
...
I20230619 18:53:17.816563 29477 grpc_impl.cc:49] PutMeta to node: [:127.0.0.1:7977:0:] rpc succeeded.
I20230619 18:53:17.817224 29477 main.cc:55] server runing in no tls mode
I20230619 18:53:17.818142 29477 main.cc:86]  💻 Node listening on port: 50050
```

:::tip 接入自定义数据
通过--config指定的yaml配置文件可以接入自定义数据，使用请见 [接入你的数据](./connect-datasource)
:::

### 创建任务

启动成功后可以参考[创建任务](https://docs.primihub.com/docs/category/%E5%88%9B%E5%BB%BA%E4%BB%BB%E5%8A%A1)页面发起任务。
