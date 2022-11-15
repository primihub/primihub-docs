---
sidebar_position: 1
description: 5 分钟运行起来一个 MPC 应用
keywords: [多方安全计算, MPC]
displayed_sidebar: tutorialSidebar
---

# 快速开始

:::tip
机器的最低配置要求 4核8G
:::

5 分钟运行起来一个 MPC（Secure multi-party computation, 安全多方计算）应用

首先，安装 [docker](https://docs.docker.com/install/overview/) 和 [docker-compose](https://docs.docker.com/compose/install/) 后，然后下载 `docker-compose` 文件：

```shell
curl https://get.primihub.com/release/1.4.5/docker-compose.yml -s -o docker-compose.yml
```

:::tip

* 如需要特定版本，请在上面的 URL 中指定
* 当前支持的平台为： `linux/amd64`，Docker 支持以模拟器的形式支持，但可能会[遇到一些诸如性能等已知问题](https://docs.docker.com/desktop/mac/apple-silicon/#known-issues)。
* 如果遇到 Docker Hub 拉取镜像限制或其他问题，可以尝试通过环境变量来使用替换的镜像地址，例如： `REGISTRY=registry.cn-beijing.aliyuncs.com`
:::

## 运行一个MPC案例

![Depolyment](./tutorial-depolyment.jpg)

### 启动节点

***启动测试用的节点***

使用 `docker-compose` 启动三个docker容器。
容器包括：启动点、三个节点

```shell
docker-compose up -d
```

查看运行起来的docker容器：

```shell
docker-compose ps -a
```

你会看到类似下面的输出

```shell
CONTAINER ID   IMAGE                                COMMAND                  CREATED          STATUS          PORTS                                                                         NAMES
cf875c1280be   primihub/primihub-node:latest        "/bin/bash -c './pri…"   11 minutes ago   Up 11 minutes   0.0.0.0:12120-12121->12120-12121/tcp, 0.0.0.0:8052->50050/tcp                 node2_primihub
6a822ff5c6f7   primihub/primihub-node:latest        "/bin/bash -c './pri…"   11 minutes ago   Up 11 minutes   0.0.0.0:10120->12120/tcp, 0.0.0.0:10121->12121/tcp, 0.0.0.0:8050->50050/tcp   node0_primihub
11d55ce06ff0   primihub/primihub-node:latest        "/bin/bash -c './pri…"   11 minutes ago   Up 11 minutes   0.0.0.0:11120->12120/tcp, 0.0.0.0:11121->12121/tcp, 0.0.0.0:8051->50050/tcp   node1_primihub
68befa6ab2a5   primihub/simple-bootstrap-node:1.0   "/app/simple-bootstr…"   11 minutes ago   Up 11 minutes   0.0.0.0:4001->4001/tcp                                                        simple_bootstrap_node
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

在这个例子中primihub-cli会使用默认参数向***node 0***请求一个ABY3的三方逻辑回归测试任务，关于cli可以指定的参数请见 ***[创建任务](../docs/advance-usage/create-tasks/cli-params)***
:::

---

了解更多有关如何创建 [PMC 任务](../docs/advance-usage/create-tasks/mpc-task)的细节。

:::tip传送门：

[运行一个纵向联邦学习](../docs/advance-usage/fedreated-learning/hetero-xgb/)

[运行一个横向联邦学习](../docs/advance-usage/fedreated-learning/homo-lr/)

:::

### 查看MPC任务计算结果

-------

## 核心特性

除了上面的MPC案例，PrimiHub还支持联邦学习、隐私求交(PSI)、隐私查询(PIR)特性，具体请见 PrimiHub [核心特性](../docs/core-concept/model) 。

## 进阶使用

想了解如何从原生应用启动以及关于如何利用PrimiHub的特性，实现更多应用，见[进阶使用](../docs/advance-usage/start-nodes)。

## 开发者

关于代码编译和如何贡献代码，请见[开发者文档](../docs/developer-docs/build)。
