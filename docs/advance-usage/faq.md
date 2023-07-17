---
sidebar_position: 10
description: 隐私计算常见问题
keywords: [隐私计算常见问题, PrimiHub 常见问题, PrimiHub FAQ]
---

# 常见问题

1. 如果使用 `docker-compose` 启动遇到如下报错，是因为 `docker-compose` 版本太低，请升级 `docker-compose` 版本到2.x.x
```shell
ERROR: The Compose file './docker-compose.yaml' is invalid because:
services.node0.depends_on contains an invalid type, it should be an array
services.node1.depends_on contains an invalid type, it should be an array
services.node2.depends_on contains an invalid type, it should be an array
```

2. 如果使用 `primihub-cli` 发送测试命令时，提示如下错误，原因是机器配置太低，至少需要4核8G
```shell
ERROR: Server Threadpool Exhausted
```

3. 如果在启动 `node` 时遇到如下报错，请删除 `./localdb/*` 后再次启动
```shell
terminate called after throwing an instance of 'primihub::service::Error'
已放弃 (核心已转储)
```

4. 提示无法通过 `docker-compose` 启动，例如：无法创建网络
```shell
[+] Running 0/0
 ⠿ Network test_testing_net  Error                                                                                                    0.0s
failed to create network test_testing_net: Error response from daemon: Pool overlaps with other one on this address space
```

请检查 `docker-compose` 中指定的网段是否已经被占用，考虑删除已有的，或者更[改网段配置](https://docs.docker.com/compose/networking/)后重新启动。

5. configure: error: No usable m4 in $PATH or /usr/5bin (see config.log for reasons).

安装M4库，ubuntu安装命令如下：
```
sudo apt-get install m4
```
6. 如果在下载二进制文件或本地编译后启动时遇到如下报错
```
W20230619 18:50:22.585558 21601 grpc_impl.cc:52] PutMeta to Node [:127.0.0.1:7977:0:] rpc failed. 14: failed to connect to all addresses
W20230619 18:50:22.585599 21601 grpc_impl.cc:59] PutMeta to Node [:127.0.0.1:7977:0:] rpc failed. reaches max retry times: 3 abort this operation
I20230619 18:50:22.586076 21601 main.cc:55] server runing in no tls mode
I20230619 18:50:22.586817 21601 main.cc:86]  💻 Node listening on port: 50050
```
先确认Meta service是否正常启动，如正常则替换 `config/node*.yaml` 文件中的 `127.0.0.1` 为你的主机IP
```bash
host_ip=`hostname -I | awk '{print $1}'`
sed -ri 's/127.0.0.1/'$host_ip'/g' config/node*.yaml
```
启动正常后发起任务时也需要指定主机IP地址，例如MPC任务
```bash
./bazel-bin/cli --server="你的IP:50050" --task_config_file="example/mpc_lr_task_conf.json"
```
7. primihub-meta、primihub-service工程grpc编译问题

提示在工程中有以下错误信息程序包java_worker不存在、程序包Common不存在
```xml
    修改环境配置,常见的os系统有windows-x86_64、osx-x86_64、linux-x86_64根据系统更换下面的value即可
    <properties>
        <os.detected.classifier>windows-x86_64</os.detected.classifier>
    </properties>
```
其他系统环境请参考os-maven-plugin插件开源库[os-maven-plugin](https://github.com/trustin/os-maven-plugin)
