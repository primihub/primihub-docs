---
sidebar_position: 10
description: 隐私计算常见问题
keywords: [隐私计算常见问题, PrimiHub 常见问题, PrimiHub FAQ]
---

# 常见问题

1. 如果使用 `docker-compose` 启动遇到如下报错，是因为 `docker-compose` 版本太低，请升级 `docker-compose` 版本到2.x.x，如不方便升级版本可在 `docker-compose.yml` 文件第一行添加 `version: '2'` 解决
```shell
ERROR: The Compose file './docker-compose.yml' is invalid because:
Unsupported config option for services: 'node1'
Unsupported config option for networks: 'testing_net'
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
sudo apt-get install m4

