---
sidebar_position: 1
---

# Code Compilation

## Compile dependent tools

bazel 5.0.0， For installation and configuration see [here](https://docs.bazel.build/versions/5.0.0/install.html)


## Get source code

```bash
$ git clone https://github.com/primihub/primihub.git
```

## 编译
:::tip If you cannot directly access open source code repositories such as github, you need to set the proxy yourself and set the *** HTTPS_PROXY *** environment variable
  
  For example: HTTPS_PROXY=http://127.0.0.1:7890

:::

### linux
* dependent environment
  gcc-8，g++-8，python3，python3-dev，cmake-3.20
* compile
```bash
    $ ./pre_build.sh
    $ bazel build --config=linux :node :cli
```

### mac
 * dependent environment clang 12+，python3，cmake-3.20
 
 * Apple Intel CPU
 
```bash
    $ ./pre_build.sh
    $ bazel build --config=darwin_x86_64 --config=macos :node :cli
```

 *  Apple sillicon M1

```bash
    $ ./pre_build.sh
    $ bazel build --config=darwin_arm64 --config=macos  :node :cli
```

 *  MacOS Monterey with Apple M1

```bash
   $ ./pre_build.sh
   $ bazel build --config=darwin --config=macos  :node :cli
```

### windows 

***TODO To be tested***

```bash
    $ ./pre_build.sh
    $ bazel build --config=windows :node :cli
```

### docker
Use the Dockerfile in the code root directory to compile the docker image

```
docker build .

```

:::caution Apple M1 docker compilation problem

Compiling the docker image on the Apple M1 device will result in a compilation error when using bazel 5.0.0. This is a bazel bug. For details, see [bazel github issue #13925](https://github.com/bazelbuild/bazel/issues/13925)， The content of the .bazelvsersion file that needs to be modified under the code is `4d900ceea12919ad62012830a95e51f9ec1a48bb`

:::

## Compilation FAQ
 1. For Bazel compilation new platforms and toolchain issues, see [here](https://docs.bazel.build/versions/5.0.0/platforms-intro.html)

     
