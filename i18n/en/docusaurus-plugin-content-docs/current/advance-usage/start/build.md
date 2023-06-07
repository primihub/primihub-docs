---
sidebar_position: 3
---

# Build

## Build Tools

Linux environment configuration refer to [Dockerfile](https://github.com/primihub/primihub/blob/develop/Dockerfile) 

For `ubuntu 20.04` ，run the following command to set up the base environment
```
apt update 
apt install -y python3 python3-dev gcc-8 g++-8 python-dev libgmp-dev cmake libmysqlclient-dev
apt install -y automake ca-certificates git libtool m4 patch pkg-config unzip make wget curl zip ninja-build npm
update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-8 800 --slave /usr/bin/g++ g++ /usr/bin/g++-8

npm install -g @bazel/bazelisk
```

`CentOS 7` system basic environment configuration
```
yum -y install epel-release
yum -y install python-devel gmp-devel centos-release-scl libtool ninja-build git npm make
yum -y install devtoolset-8-gcc*
yum -y install rh-python38 rh-python38-python-devel
echo "source /opt/rh/devtoolset-8/enable" >> /etc/profile
echo "source /opt/rh/rh-python38/enable" >> /etc/profile
source /etc/profile

npm install -g @bazel/bazelisk

# Check the version of libstdc++.so.6, if it is the default 6.0.19, you need to upgrade the version
ls -l /usr/lib64/libstdc++.so.6
wget https://primihub.oss-cn-beijing.aliyuncs.com/tools/libstdc.so_.6.0.26.zip
unzip libstdc.so_.6.0.26.zip
mv libstdc++.so.6.0.26 /usr/lib64
rm -f /usr/lib64/libstdc++.so.6
ln -s /usr/lib64/libstdc++.so.6.0.26 /usr/lib64/libstdc++.so.6
```
## Get the code

```bash
git clone https://github.com/primihub/primihub.git
```

## Build
:::tip  If you don't have direct access to an open source repository like github, you'll need to set up your own proxy and set the *** HTTPS_PROXY ***   environment variable  
  Example： https_proxy=http://127.0.0.1:7890

:::

### linux & Mac
* Linux Environment: gcc-8，g++-8，python3.7 and higher，python3.7-dev，cmake-3.20
* Mac Environment: clang 12+，python3.7 and higher，cmake-3.20

```bash
./pre_build.sh
make
```

After compiling, you need to start the `meta service` service before starting the service, refer to [here](https://docs.primihub.com/docs/advance-usage/start/start-nodes) 

After starting the `meta service` service, execute the following command in the root directory of the code to start the node, and its related logs are saved in log_node0, log_node1, log_node2 files respectively

```shell
bash start_server.sh
```

### windows 

***TODO ***

```bash
./pre_build.sh
bazel build --config=windows :node :cli :opt_paillier_c2py
```

### docker
Use the Dockerfile in the root directory to build the docker image

```
docker build -t primihub/primihub-node .
```
If the dependencies can't be downloaded during `build`, you can add a proxy to `build` by running the following command
```
docker build --build-arg "HTTP_PROXY=http://your proxy address" --build-arg "HTTPS_PROXY=http://your proxy address" -t primihub/primihub-node .
```


:::caution Apple M1 docker build problems

When building docker images on Apple M1 devices, bazel 5.0.0 will cause build errors, which is a bug in bazel. Specific question see [bazel github issue #13925](https://github.com/bazelbuild/bazel/issues/13925), Need to modify the code .bazelvsersion file contents of `4d900ceea12919ad62012830a95e51f9ec1a48bb`

:::

## Build FAQ
 1. Bazel build new platform and toolchain issues see[Here](https://docs.bazel.build/versions/5.0.0/platforms-intro.html)

     
