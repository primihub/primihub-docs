---
sidebar_position: 1
description: 使用 docker-compose 启动PrimiHub
keywords: [多方安全计算, MPC]
displayed_sidebar: lensonsSidebar
---

# docker-compose启动

:::tip
测试机器的最低配置要求 4核16G，支持`avx` 指令集，可通过`lscpu | grep avx` 验证，docker-compose版本2.0以上
:::

### 安装[docker](https://docs.docker.com/install/overview/)和[docker-compose](https://docs.docker.com/compose/install/) 

可参照官方文档自行安装或者下载我们整理好的安装包
```
wget https://primihub.oss-cn-beijing.aliyuncs.com/dev/docker20.10.tar.gz
tar xf docker20.10.tar.gz
cd docker20.10
bash install_docker.sh

# 验证
docker -v
docker-compose version
```

### 启动节点

下载仓库并进入到代码根目录：

```shell
git clone https://github.com/primihub/primihub.git
cd primihub
```

:::tip
* 国内用户如访问GitHub缓慢可使用Gitee仓库地址：https://gitee.com/primihub/primihub.git
* 当前支持的平台为： `amd64`，`arm64`
:::

使用 `docker-compose` 启动容器。
容器包括: 三个meta service服务、三个primihub-node节点

```shell
docker-compose up -d
```

查看运行起来的docker容器：

```shell
docker-compose ps -a
```

看到如下输出则启动正常

```shell
NAME                COMMAND                  SERVICE             STATUS              PORTS
primihub-meta0      "/bin/bash -c 'java …"   meta0               running (healthy)   
primihub-meta1      "/bin/bash -c 'java …"   meta1               running (healthy)   
primihub-meta2      "/bin/bash -c 'java …"   meta2               running (healthy)   
primihub-node0      "/bin/bash -c './pri…"   node0               running             50050/tcp
primihub-node1      "/bin/bash -c './pri…"   node1               running             50050/tcp
primihub-node2      "/bin/bash -c './pri…"   node2               running             50050/tcp
```

### 创建任务

启动成功后可以参考[创建任务](https://docs.primihub.com/docs/category/%E5%88%9B%E5%BB%BA%E4%BB%BB%E5%8A%A1)页面发起任务。

<!-- ***让三个节点共同执行一个多方安全计算（MPC）的逻辑回归任务***

```shell
docker run --network=host -it primihub/primihub-node:latest ./primihub-cli --server="127.0.0.1:8050"
```

:::tip 请求任务的节点
  你可以向计算集群中任意一个节点请求计算任务
:::

:::tip 可用的任务参数
通过primihub-cli可以指定以下参数

 1. 请求哪个节点启动任务
 2. 使用哪些共享数据集
 3. 做什么样的隐私计算任务

在这个例子中primihub-cli会使用默认参数向***node 0***请求一个ABY3的三方逻辑回归测试任务，关于cli可以指定的参数请见 ***[公共参数](../create-tasks/cli-params)***
::: -->


