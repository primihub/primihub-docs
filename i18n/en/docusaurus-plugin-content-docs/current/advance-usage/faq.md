---
sidebar_position: 10
---

# FAQ

1. If you encounter the following error when starting with docker-compose, it is because docker-compose version is too low, please upgrade docker-compose version to 2.x.x.
```bash
ERROR: The Compose file './docker-compose.yaml' is invalid because:
services.node0.depends_on contains an invalid type, it should be an array
services.node1.depends_on contains an invalid type, it should be an array
services.node2.depends_on contains an invalid type, it should be an array
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

4. If you encounter the following error when starting after downloading the binary or compiling it locally
```
W20230619 18:50:22.585558 21601 grpc_impl.cc:52] PutMeta to Node [:127.0.0.1:7977:0:] rpc failed. 14: failed to connect to all addresses
W20230619 18:50:22.585599 21601 grpc_impl.cc:59] PutMeta to Node [:127.0.0.1:7977:0:] rpc failed. reaches max retry times: 3 abort this operation
I20230619 18:50:22.586076 21601 main.cc:55] server runing in no tls mode
I20230619 18:50:22.586817 21601 main.cc:86]  💻 Node listening on port: 50050
```
First, make sure that Meta service is started successfully.If normal, replace `127.0.0.1` in the `config/node*.yaml` file with your host IP.
```bash
host_ip=`hostname -I | awk '{print $1}'`
sed -ri 's/127.0.0.1/'$host_ip'/g' config/node*.yaml
```
You also need to specify the IP address of the host when launching a task after starting normally, e.g. MPC task
```bash
./primihub-cli --server="你的IP:50050" --task_config_file="example/mpc_lr_task_conf.json"
```