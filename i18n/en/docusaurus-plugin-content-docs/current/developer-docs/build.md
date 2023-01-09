---
sidebar_position: 1
---

# Build

## Build Tools

Linux environment configuration refer to [Dockerfile.build](https://github.com/primihub/primihub/blob/develop/Dockerfile.build) 

For `ubuntu 20.04` ，run the following command to set up the base environment
```
apt update 
apt install -y python3 python3-dev gcc-8 g++-8 python-dev libgmp-dev cmake
apt install -y automake ca-certificates git libtool m4 patch pkg-config unzip make wget curl zip ninja-build npm
update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-8 800 --slave /usr/bin/g++ g++ /usr/bin/g++-8

npm install -g @bazel/bazelisk
```
## Get the code

```bash
git clone https://github.com/primihub/primihub.git
```

## Build
:::tip  If you don't have direct access to an open source repository like github, you'll need to set up your own proxy and set the *** HTTPS_PROXY ***   environment variable  
  Example： https_proxy=http://127.0.0.1:7890

:::

### linux
* Environment
  gcc-8，g++-8，python3.7 and higher，python3.7-dev，cmake-3.20
* Build
```bash
./pre_build.sh
bazel build --config=linux_x86_64 :node :cli :opt_paillier_c2py :linkcontext

# Arm
bazel build --config=linux_aarch64 :node :cli :opt_paillier_c2py :linkcontext
```

### mac
 * environment: clang 12+，python3.7 and higher，cmake-3.20
 
 * Apple Intel CPU
 
```bash
./pre_build.sh
bazel build --config=darwin_x86_64 --config=macos :node :cli :opt_paillier_c2py :linkcontext
```

 *  Apple sillicon M1

```bash
./pre_build.sh
bazel build --config=darwin_arm64 --config=macos  :node :cli :opt_paillier_c2py :linkcontext
```

 *  MacOS Monterey with Apple M1

```bash
./pre_build.sh
bazel build --config=darwin --config=macos  :node :cli :opt_paillier_c2py :linkcontext
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

     
