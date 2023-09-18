---
sidebar_position: 3
keywords: [PrimiHub编译]
displayed_sidebar: lensonsSidebar
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 本地编译启动

## 配置环境

Linux 环境配置步骤可参考 [Dockerfile](https://github.com/primihub/primihub/blob/develop/Dockerfile) 文件

<Tabs>
<TabItem value="Ubuntu 20.04">

```shell
apt update
apt install -y python3 python3-dev gcc-8 g++-8 python-dev libgmp-dev cmake libmysqlclient-dev
apt install -y automake ca-certificates git libtool m4 patch pkg-config unzip make wget curl zip ninja-build npm
update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-8 800 --slave /usr/bin/g++ g++ /usr/bin/g++-8

npm install -g @bazel/bazelisk
```
</TabItem>
<TabItem value="CentOS 7">

```shell
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


## 克隆代码

国内用户如果`GitHub`访问缓慢推荐使用`Gitee`地址

<Tabs>
<TabItem value="Github">

```shell
git clone https://github.com/primihub/primihub.git
```
</TabItem>
<TabItem value="Gitee">

```shell
git clone https://gitee.com/primihub/primihub.git
```
</TabItem>
</Tabs>

## 编译

:::tip 如果你无法直接访问一部分地址，例如 GitHub，需要自行设置代理，并设置***https_proxy*** 环境变量
比如： https_proxy=<http://127.0.0.1:7890>
:::

<Tabs>
<TabItem value="Linux & MacOS">

### Linux & MacOS

* Linux 依赖环境 gcc-8，g++-8，python3.8，python3.8-dev，cmake-3.22
* MacOS 依赖环境 clang 12+，python3.8，cmake-3.20

```bash
# 必须先执行脚本再编译
./pre_build.sh
make
```

编译完成后，在代码根目录下执行以下脚本启动节点，`meta service`启动包含在脚本中，其相关日志保存在meta-service目录下的meta_log0，meta_log1，meta_log2文件中，node的相关日志分别保存在log_node0, log_node1, log_node2文件中

```shell
bash start_server.sh
```

查看日志，如下则启动正常

```shell
tail -f log_node0
...
I20230619 18:53:17.816563 29477 grpc_impl.cc:49] PutMeta to node: [:127.0.0.1:7977:0:] rpc succeeded.
I20230619 18:53:17.817224 29477 main.cc:55] server runing in no tls mode
I20230619 18:53:17.818142 29477 main.cc:86]  💻 Node listening on port: 50050
```
</TabItem>
<TabItem value="Windows">

### Windows
***暂不支持，可使用 WSL***

</TabItem>
<TabItem value="Docker">

### Docker
使用代码根目录下的Dockerfile进行docker镜像编译

```shell
docker build -t primihub/primihub-node .
```

如果`build`时有依赖包下载不下来的情况，可通过如下命令在`build`时加上代理

```shell
docker build --build-arg "HTTP_PROXY=http://你的代理地址" --build-arg "HTTPS_PROXY=http://你的代理地址" -t primihub/primihub-node .
```

</TabItem>
</Tabs>

## 编译常见问题

 1. Bazel编译新增平台和工具链问题见[这里](https://docs.bazel.build/versions/5.0.0/platforms-intro.html)
