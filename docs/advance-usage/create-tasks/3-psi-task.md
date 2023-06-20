---
sidebar_position: 3
description: 通过开源隐私计算平台 PrimiHub 隐私求交（PSI）任务
keywords: [隐私求交, PSI]
---

# 隐私求交（PSI）任务
隐私求交（Private Set Intersection，PSI）功能是指在不暴露参与方私有数据的情况下，实现两个或多个参与方之间的数据交集计算。
## 提交任务

通过`docker-compose`启动，执行 `docker exec -it primihub-node0 bash` 进入到 `primihub-node0` 容器，执行以下命令：(以下两个任务使用了不同协议)
```bash
./primihub-cli --task_config_file="example/psi_ecdh_task_conf.json"
```
或：
```bash
./primihub-cli --task_config_file="example/psi_kkrt_task_conf.json"
```

下载二进制文件或本地编译启动，在代码根目录下执行以下命令：

```bash
./bazel-bin/cli --task_config_file="example/psi_ecdh_task_conf.json"
```
或
```bash
./bazel-bin/cli --task_config_file="example/psi_kkrt_task_conf.json"
```
## 检查结果
分别观察`node0`和`node1`的日志，有如下输出则代表任务运行成功，可参考参数说明中的结果文件路径验证生成的结果文件是否正确

```
node0:
···
I20230614 17:25:05.435564    46 node.cc:749] start to schedule task, task_type: 3
I20230614 17:25:05.435674    46 node.cc:1069]  🤖️ Start create worker node0 worker id: 043795b3-66f4-490b-8d50-124608432c12
I20230614 17:25:05.435745    46 node.cc:1073]  🤖️ Fininsh create worker node0 worker id: 043795b3-66f4-490b-8d50-124608432c12
E20230614 17:25:05.435909    46 proto_parser.cc:56] party_datasets: 2
I20230614 17:25:05.464829    60 scheduler.cc:111] dest node node0:primihub-node0:50050:0:
I20230614 17:25:05.464947    61 scheduler.cc:111] dest node node1:primihub-node1:50051:0:
I20230614 17:25:05.468982    59 node.cc:848] start to create worker for task: job_id : 100 task_id: 200 request id: 043795b3-66f4-490b-8d50-124608432c12
I20230614 17:25:05.469048    59 node.cc:1069]  🤖️ Start create worker node0 worker id: 043795b3-66f4-490b-8d50-124608432c12
I20230614 17:25:05.469089    59 node.cc:1073]  🤖️ Fininsh create worker node0 worker id: 043795b3-66f4-490b-8d50-124608432c12
I20230614 17:25:05.469316    59 node.cc:858] create worker thread future for task: job_id : 100 task_id: 200 request id: 043795b3-66f4-490b-8d50-124608432c12 finished
I20230614 17:25:05.469419    63 node.cc:821] begin to execute task
I20230614 17:25:05.471896    62 worker.cc:122] Request id: 043795b3-66f4-490b-8d50-124608432c12 update party: CLIENT status to: RUNNING
I20230614 17:25:05.472594    63 worker.cc:70] Worker start execute task 
I20230614 17:25:05.472652    59 node.cc:875] create worker thread for task: job_id : 100 task_id: 200 request id: 043795b3-66f4-490b-8d50-124608432c12 finished
I20230614 17:25:05.473728    62 worker.cc:122] Request id: 043795b3-66f4-490b-8d50-124608432c12 update party: SERVER status to: RUNNING
I20230614 17:25:05.488062    63 psi_kkrt_task.cc:372] start recv.
I20230614 17:25:05.702018    63 psi_kkrt_task.cc:402] kkrt psi run success
I20230614 17:25:05.708776    63 psi_task.cc:212] Save PSI result to data/result/psi_result.csv.
I20230614 17:25:05.710378   184 worker.cc:119] collected finished party count: 1
I20230614 17:25:05.710426   184 worker.cc:122] Request id: 043795b3-66f4-490b-8d50-124608432c12 update party: CLIENT status to: SUCCESS
I20230614 17:25:05.714468   184 worker.cc:119] collected finished party count: 2
I20230614 17:25:05.714504   184 worker.cc:122] Request id: 043795b3-66f4-490b-8d50-124608432c12 update party: SERVER status to: SUCCESS


node1:
···
I20230614 17:25:05.469849    54 node.cc:848] start to create worker for task: job_id : 100 task_id: 200 request id: 043795b3-66f4-490b-8d50-124608432c12
I20230614 17:25:05.469933    54 node.cc:1069]  🤖️ Start create worker node1 worker id: 043795b3-66f4-490b-8d50-124608432c12
I20230614 17:25:05.469978    54 node.cc:1073]  🤖️ Fininsh create worker node1 worker id: 043795b3-66f4-490b-8d50-124608432c12
I20230614 17:25:05.470230    54 node.cc:858] create worker thread future for task: job_id : 100 task_id: 200 request id: 043795b3-66f4-490b-8d50-124608432c12 finished
I20230614 17:25:05.470335    57 node.cc:821] begin to execute task
I20230614 17:25:05.474314    57 worker.cc:70] Worker start execute task 
I20230614 17:25:05.474380    54 node.cc:875] create worker thread for task: job_id : 100 task_id: 200 request id: 043795b3-66f4-490b-8d50-124608432c12 finished
I20230614 17:25:05.497123    57 psi_kkrt_task.cc:386] start send
I20230614 17:25:05.701987    57 psi_kkrt_task.cc:402] kkrt psi run success
I20230614 17:25:05.713833    57 psi_task.cc:212] Save PSI result to data/result/server/psi_result.csv.
```
## 参数说明

| 参数| 数据类型 | 参数示例 | 参数说明
| ---- | ---- | ---- | ---- |
| params.clientIndex | INT32 | 0 | 表示psi客户端以客户端数据的第几列数据进行求交，该参数取值范围[0，文件最大列-1] |
| params.serverIndex | INT32 | 0 | 表示psi服务端以服务端数据的第几列数据进行求交，该参数取值范围[0，文件最大列-1] |
| params.psiType | INT32 | 0或者1 | 0：求数据交集，1：求数据差集 |
| params.psiTag | INT32 | 0或者1 | psi支持多种底层协议实现，通过该参数区分，0：ECDH,1：KKRT |
| params.outputFullFilename | STRING | "data/result/psi_result.csv" | 客户端结果文件保存路径 |
| params.sync_result_to_server | INT32 | 0或者1 | 客户端是否将结果同步到服务端。 1：推送，0：不推送 |
| params.server_outputFullFilname | STRING | "data/result/server/psi_result.csv" | 服务端结果文件保存路径 |
| party_datasets | STRING | "psi_client_data,psi_server_data" | 该参数值为psi服务的客户端和服务端数据标识符，系统调度节点通过该标识符找到注册该数据的工作节点。（当前在用例在node0中注册客户端数据，在config/primihub_node0.yaml中，添加数据的保存路径，设置该数据的description为"psi_client_data"，作为该数据标志符。标志符由用户自主设置，请求任务中的参数值与配置文件中的值保持一致） |
