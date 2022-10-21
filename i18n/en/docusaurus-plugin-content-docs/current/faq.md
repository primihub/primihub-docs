---
sidebar_position: 10
---

# FAQ

1. If you encounter the following error when starting with docker-compose, it is because docker-compose version is too low, please upgrade docker-compose version to 2.x.x. If it is not convenient to upgrade the version, add 'version: '2'' to the first line of docker-compose.yml file.
```bash
ERROR: The Compose file './docker-compose.yml' is invalid because:
Unsupported config option for services: 'node1'
Unsupported config option for networks: 'testing_net'
```

2. If you send a test command using 'primihub-cli', you get the following error, because the machine configuration is too low, requiring at least 4 cores and 8 gigabyte
```bash
ERROR: Server Threadpool Exhausted
```

3. If you get the following error when starting node, remove the `./localdb/*` and start again
```bash
terminate called after throwing an instance of 'primihub::service::Error'
abandoned (core dumped)
```