---
sidebar_position: 1
description: 使用 docker-compose 启动PrimiHub
keywords: [多方安全计算, MPC]
displayed_sidebar: lensonsSidebar
---

# docker-compose启动

:::tip
测试机器的最低配置要求 4核8G，支持`avx` 指令集，可通过`lscpu | grep avx` 验证
:::

首先，安装 [docker](https://docs.docker.com/install/overview/) 和 [docker-compose](https://docs.docker.com/compose/install/) ，或者下载我们整理好的 [安装包](https://primihub.oss-cn-beijing.aliyuncs.com/dev/docker20.10.tar.gz)，下载解压后执行 `bash install_docker.sh` 即完成`docker`和`docker-compose`的安装。


然后下载仓库并进入到代码根目录：

```shell
git clone https://github.com/primihub/primihub.git
cd primihub
```

:::tip
* 国内用户如访问GitHub缓慢可使用Gitee仓库地址：https://gitee.com/primihub/primihub.git
* 当前支持的平台为： `amd64`，`arm64`
* 如果遇到 Docker Hub 拉取镜像缓慢，可以通过环境变量来使用阿里云的镜像地址

 `echo "REGISTRY=registry.cn-beijing.aliyuncs.com" >> .env`
:::

<!-- ## 运行一个MPC案例

![Depolyment](/img/tutorial-depolyment.jpg) -->

### 启动节点

***启动测试用的节点***

使用 `docker-compose` 启动容器。
容器包括: redis（数据集查找默认使用redis）、三个节点

```shell
docker-compose up -d
```

查看运行起来的docker容器：

```shell
docker-compose ps -a
```

你会看到类似下面的输出

```shell
NAME                    COMMAND                  SERVICE                 STATUS              PORTS
primihub-node0          "/bin/bash -c './pri…"   node0                   running             0.0.0.0:6666->6666/tcp, 0.0.0.0:8050->50050/tcp
primihub-node1          "/bin/bash -c './pri…"   node1                   running             0.0.0.0:6667->6667/tcp, 0.0.0.0:8051->50051/tcp
primihub-node2          "/bin/bash -c './pri…"   node2                   running             0.0.0.0:6668->6668/tcp, 0.0.0.0:8052->50052/tcp
redis                   "docker-entrypoint.s…"   redis                   running             0.0.0.0:6379->6379/tcp
```

### 创建一个MPC任务

***让三个节点共同执行一个多方安全计算（MPC）的逻辑回归任务***

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
:::


