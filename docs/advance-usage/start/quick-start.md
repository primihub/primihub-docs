---
title: 本地启动
sidebar_position: 1
sidebar_label: 本地启动
displayed_sidebar: lensonsSidebar
---

PrimiHub 提供了**三种**本地的启动方式：
- Docker Compose（推荐）
- 二进制文件
- 编译

根据文档的步骤即可在本地启动 PrimiHub 隐私计算平台，开启你的隐私计算之旅。

:::tip
机器最低配置要求 4C16G 支持 `avx` 指令集，可通过 `lscpu | grep avx` 验证。
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  groupId="install_method"
  defaultValue="docker-compose"
  values={[
    { label: 'Docker Compose', value: 'docker-compose', },
    { label: '二进制文件', value: 'binary', },
    { label: '编译', value: 'compile', }
  ]
}>
<TabItem value="docker-compose">

Docker Compose 是 Docker 官方编排项目之一，可快速完成分布式应用的部署。

PrimiHub 项目中提供了 `docker-compose.yml`，支持一条 `docker-compose` 命令启动。

## 安装 Docker 和 Docker Compose

:::tip
要求 Docker Compose 版本 2.0 以上
:::

可参照[官方文档](https://docs.docker.com/engine/install/)自行安装 Docker 和 Docker Compose 或者下载我们整理好的安装包。

提供的安装包将 Docker 和 Docker Compose 一起**打包上传到了国内** OSS(云存储)，包含**一键安装脚本**。安装步骤如下：

```shell
# 1.下载
wget https://primihub.oss-cn-beijing.aliyuncs.com/dev/docker20.10.tar.gz
# 2.解压
tar xf docker20.10.tar.gz
# 3.进入目录
cd docker20.10
# 4.执行安装脚本
bash install_docker.sh

# 验证
docker -v
docker-compose version
```

## 启动

:::tip
国内用户如无法访问 GitHub 可使用 Gitee 仓库
:::

下载仓库并进入到代码根目录：

<Tabs
  groupId="clone_method"
  defaultValue="github"
  values={[
    { label: 'GitHub', value: 'github', },
    { label: 'Gitee', value: 'gitee', }
  ]
}>

<TabItem value="github">

```shell
git clone https://github.com/primihub/primihub.git
cd primihub
```

</TabItem>

<TabItem value="gitee">

```shell
git clone https://gitee.com/primihub/primihub.git
cd primihub
```

</TabItem>
</Tabs>

使用 `docker-compose` 启动容器。

```shell
docker-compose up -d
```

查看 Docker 容器的运行状态：

```shell
docker-compose ps -a
```

看到如下输出则启动正常：

```shell
NAME                COMMAND                  SERVICE             STATUS              PORTS
primihub-meta0      "/bin/bash -c 'java …"   meta0               running (healthy)   
primihub-meta1      "/bin/bash -c 'java …"   meta1               running (healthy)   
primihub-meta2      "/bin/bash -c 'java …"   meta2               running (healthy)   
primihub-node0      "/bin/bash -c './pri…"   node0               running             50050/tcp
primihub-node1      "/bin/bash -c './pri…"   node1               running             50050/tcp
primihub-node2      "/bin/bash -c './pri…"   node2               running             50050/tcp
```

显示的容器包括：

- 三个 meta service 服务：meta0、meta1、meta2 
- 三个 primihub-node 节点：node0、node1、node2

查看 node0 的日志：

```shell
docker logs -f primihub-node0
```

日志输出如下：
```
I20230619 19:18:38.774282     1 service.cc:205] 💾 Restore dataset from local storage...
I20230619 19:18:39.279953     1 service.cc:171] 📃 Load default datasets from config: /app/config/primihub_node0.yaml
I20230619 19:18:40.231341     1 main.cc:55] server runing in no tls mode
I20230619 19:18:40.232587     1 main.cc:86]  💻 Node listening on port: 50050
```

</TabItem>

<TabItem value="binary">

:::tip
目前二进制文件仅支持 Ubuntu20.04 和 MacOS 系统，支持平台为 `amd64` 和 `arm64`，可通过 `uname -a` 验证。
:::

## 依赖环境

安装 JDK8 和 Python(3.8)

<Tabs
  groupId="jdk"
  defaultValue="ubuntu"
  values={[
    { label: 'Ubuntu', value: 'ubuntu', },
    { label: 'MacOS', value: 'macos', }
  ]
}>

<TabItem value="ubuntu">

```bash
apt install openjdk-8-jdk
apt-get install -y python3 python3-dev libgmp-dev python3-pip libmysqlclient-dev
```
</TabItem>

<TabItem value="macos">

```bash
brew install --build-from-source openjdk@8
```
</TabItem>

</Tabs>


## 下载和启动

下载最新的二进制文件，可在 [GitHub Release](https://github.com/primihub/primihub/releases) 页面可以获取最新版本。

```shell
curl -L https://github.com/primihub/primihub/releases/download/1.6.6/primihub-linux-amd64.tar.gz | tar xz
```

完成下载，进入解压出来的目录，执行 `start_server.sh` 启动节点。

```shell
bash start_server.sh
```

查看 node0 的日志：

```shell
tail -f log_node0
```

显示如下则启动正常：

```
...
I20230619 18:53:17.816563 29477 grpc_impl.cc:49] PutMeta to node: [:127.0.0.1:7977:0:] rpc succeeded.
I20230619 18:53:17.817224 29477 main.cc:55] server runing in no tls mode
I20230619 18:53:17.818142 29477 main.cc:86]  💻 Node listening on port: 50050
```

</TabItem>

<TabItem value="compile">

## 克隆代码

<Tabs
  groupId="compile_clone_method"
  defaultValue="github"
  values={[
    { label: 'GitHub', value: 'github', },
    { label: 'Gitee', value: 'gitee', }
  ]
}>

<TabItem value="github">

```shell
git clone https://github.com/primihub/primihub.git
cd primihub
```

</TabItem>

<TabItem value="gitee">

```shell
git clone https://gitee.com/primihub/primihub.git
cd primihub
```

</TabItem>
</Tabs>

## 配置环境

Linux 环境配置步骤可参考 [Dockerfile](https://github.com/primihub/primihub/blob/develop/Dockerfile) 文件。

<Tabs
  groupId="env"
  defaultValue="ubuntu"
  values={[
    { label: 'Ubuntu 20.04', value: 'ubuntu', },
    { label: 'CentOS 7', value: 'centos', }
  ]
}>

<TabItem value="ubuntu">

以 Ubuntu 20.04 系统为例，执行如下命令即可完成基础环境配置。

```
apt update
apt install -y python3 python3-dev gcc-8 g++-8 python-dev libgmp-dev cmake libmysqlclient-dev
apt install -y automake ca-certificates git libtool m4 patch pkg-config unzip make wget curl zip ninja-build npm
update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-8 800 --slave /usr/bin/g++ g++ /usr/bin/g++-8

npm install -g @bazel/bazelisk
```

</TabItem>

<TabItem value="centos">

以 CentOS 7 系统为例，执行如下命令即可完成基础环境配置。

```
yum -y install epel-release
yum -y install python-devel gmp-devel centos-release-scl libtool ninja-build git npm make
yum -y install devtoolset-8-gcc*
yum -y install rh-python38 rh-python38-python-devel
echo "source /opt/rh/devtoolset-8/enable" >> /etc/profile
echo "source /opt/rh/rh-python38/enable" >> /etc/profile
source /etc/profile

npm install -g @bazel/bazelisk

# 查看libstdc++.so.6链接的版本,如果是默认的6.0.19则需要升级版本
ls -l /usr/lib64/libstdc++.so.6
wget https://primihub.oss-cn-beijing.aliyuncs.com/tools/libstdc.so_.6.0.26.zip
unzip libstdc.so_.6.0.26.zip
mv libstdc++.so.6.0.26 /usr/lib64
rm -f /usr/lib64/libstdc++.so.6
ln -s /usr/lib64/libstdc++.so.6.0.26 /usr/lib64/libstdc++.so.6
```
</TabItem>
</Tabs>

## 开始编译

:::tip 如果你无法直接访问一部分地址，例如 GitHub，需要自行设置代理，并设置*** https_proxy *** 环境变量
比如： https_proxy=http://127.0.0.1:7890
:::

<Tabs
  groupId="start_compile"
  defaultValue="linux"
  values={[
    { label: 'Linux & MacOS', value: 'linux', },
    { label: 'Windows', value: 'windows', },
    { label: 'Docker', value: 'docker', }
]}>

<TabItem value='linux'>

* Linux 依赖环境 gcc-8，g++-8，python3.8，python3.8-dev，cmake-3.22
* MacOS 依赖环境 clang 12+，python3.8，cmake-3.20

```bash
# 必须先执行脚本再编译
./pre_build.sh
make
```

编译完成后，在代码根目录下执行以下脚本启动节点。

```shell
bash start_server.sh
```

`meta service` 和 `node`：

- `meta service` 的相关日志保存在 meta-service 目录下的 meta_log0，meta_log1，meta_log2 文件中。

- `node` 的相关日志分别保存在 log_node0, log_node1, log_node2 文件中。

查看 node0 日志

```
tail -f log_node0
```

如下则启动正常

```
...
I20230619 18:53:17.816563 29477 grpc_impl.cc:49] PutMeta to node: [:127.0.0.1:7977:0:] rpc succeeded.
I20230619 18:53:17.817224 29477 main.cc:55] server runing in no tls mode
I20230619 18:53:17.818142 29477 main.cc:86]  💻 Node listening on port: 50050
```
</TabItem>

<TabItem value='windows'>

**Windows 暂不支持，可使用 WSL**

</TabItem>


<TabItem value='docker'>

使用代码根目录下的 Dockerfile 进行 docker 镜像编译

```shell
docker build -t primihub/primihub-node .
```

如果`build`时有依赖包下载不下来的情况，可通过如下命令在`build`时加上代理
```shell
docker build --build-arg "HTTP_PROXY=http://你的代理地址" --build-arg "HTTPS_PROXY=http://你的代理地址" -t primihub/primihub-node .
```
</TabItem>
</Tabs>

</TabItem>

</Tabs>
