---
sidebar_position: 1
---

# 代码编译

## 依赖编译工具

bazel 5.0.0， 安装和配置见[这里](https://docs.bazel.build/versions/5.0.0/install.html)


## 获取代码

```bash
$ git clone https://github.com/primihub/primihub.git
```

## 编译
:::tip 如果你无法直接访问github等开源代码仓库，需要自行设置代理，并设置*** HTTPS_PROXY *** 环境变量
  
  比如： HTTPS_PROXY=http://127.0.0.1:7890

:::

### linux
* 依赖环境
  gcc-8，g++-8，python3，python3-dev，cmake-3.20
* 编译
```bash
    $ ./pre_build.sh
    $ bazel build --config=linux :node :cli :opt_paillier_c2py
```

### mac
 * 依赖环境 clang 12+，python3，cmake-3.20
 
 * Apple Intel CPU
 
```bash
    $ ./pre_build.sh
    $ bazel build --config=darwin_x86_64 --config=macos :node :cli :opt_paillier_c2py
```

 *  Apple sillicon M1

```bash
    $ ./pre_build.sh
    $ bazel build --config=darwin_arm64 --config=macos  :node :cli :opt_paillier_c2py
```

 *  MacOS Monterey with Apple M1

```bash
   $ ./pre_build.sh
   $ bazel build --config=darwin --config=macos  :node :cli :opt_paillier_c2py
```

### windows 

***TODO 待测***

```bash
    $ ./pre_build.sh
    $ bazel build --config=windows :node :cli :opt_paillier_c2py
```

### docker
使用代码根目录下的Dockerfile进行docker镜像编译

```
docker build .

```

:::caution Apple M1 docker 编译问题

在Apple M1设备上进行docker镜像编译，使用bazel 5.0.0会编译出错，这是bazel的bug，具体的问题见[bazel github issue #13925](https://github.com/bazelbuild/bazel/issues/13925)， 需要修改代码下的.bazelvsersion 文件内容为 `4d900ceea12919ad62012830a95e51f9ec1a48bb`

:::

## 编译常见问题
 1. Bazel编译新增平台和工具链问题见[这里](https://docs.bazel.build/versions/5.0.0/platforms-intro.html)

     
