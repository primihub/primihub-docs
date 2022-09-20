---
sidebar_position: 10
---

# 常见问题

1. 如果使用docker-compose启动遇到如下报错，是因为docker-compose版本太低，请升级docker-compose版本到2.x.x，如不方便升级版本可在docker-compose.yml文件第一行添加 `version: '2'` 解决。
```bash
ERROR: The Compose file './docker-compose.yml' is invalid because:
Unsupported config option for services: 'node1'
Unsupported config option for networks: 'testing_net'
```

2. 如果使用 `primihub-cli` 发送测试命令时，提示如下错误，原因是机器配置太低，至少需要4核8G
```bash
ERROR: Server Threadpool Exhausted
```

3. 如果在启动node时遇到如下报错，请删除 `./localdb/*` 后再次启动
```bash
terminate called after throwing an instance of 'primihub::service::Error'
已放弃 (核心已转储)
```