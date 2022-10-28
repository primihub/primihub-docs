---
sidebar_position: 10
description: 隐私计算常见问题
keywords: [隐私计算常见问题, PrimiHub 常见问题, PrimiHub FAQ]
---

# FAQ

1. If you encounter the following error when starting with `docker-compose`, it is because `docker-compose` version is too low, please upgrade `docker-compose` version to 2.x.x. If it is not convenient to upgrade the version, add 'version: '2'' to the first line of `docker-compose.yml` file.
```shell
ERROR: The Compose file './docker-compose.yml' is invalid because:
Unsupported config option for services: 'node1'
Unsupported config option for networks: 'testing_net'
```

2. If you send a test command using `primihub-cli`, you get the following error, because the machine configuration is too low, requiring at least 4 cores and 8 gigabyte
```shell
ERROR: Server Threadpool Exhausted
```

3. If you get the following error when starting node, remove the `./localdb/*` and start again
```shell
terminate called after throwing an instance of 'primihub::service::Error'
```

abandoned (core dumped)


4. Unable to start via `docker-compose`, such as: failed to create network
```shell
[+] Running 0/0
 ⠿ Network test_testing_net  Error                                                                                                    0.0s
failed to create network test_testing_net: Error response from daemon: Pool overlaps with other one on this address space
```

Please check the network setting from `docker-compose` to see if the network address was used. Consider deleting the existing,
or [modify it](https://docs.docker.com/compose/networking/).
