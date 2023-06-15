---
sidebar_position: 3
---


# PSI Task

*** PSI Task Parameters Description ***

If starting with docker-compose, enter the primihub-node0 container by running `docker exec -it primihub-node0 bash` ，and run the following command：

```bash
./primihub-cli --task_config_file="example/psi_ecdh_task_conf.json"
./primihub-cli --task_config_file="example/psi_kkrt_task_conf.json"
```

If starting locally, run the following command from the compiled root directory:

```bash
./bazel-bin/cli --server="你的IP:50050" --task_config_file="example/psi_ecdh_task_conf.json"
./bazel-bin/cli --server="你的IP:50050" --task_config_file="example/psi_kkrt_task_conf.json"
```

Observe the logs of `node0`and`node1` respectively,and the following output means that the task runs successfully. Refer to the result file path in the parameter description to verify whether the generated result file is correct.

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
## Parameter Description

| parameter| data type | example | parameter description
| ---- | ---- | ---- | ---- |
| params.clientIndex | INT32 | 0 | Indicates that the psi client intersects with the first column of the client data, the parameter takes values in the range [0, file maximum column-1]. |
| params.serverIndex | INT32 | 0 | Indicates that the psi server intersects with the first column of the server-side data, and the parameter takes the value range [0, file maximum column-1]. |
| params.psiType | INT32 | 0 or 1 | 0: find the intersection of the data, 1: find the difference of the data |
| params.psiTag | INT32 | 0 or 1 | si supports multiple underlying protocol implementations, distinguished by this parameter, 0: ECDH,1: KKRT |
| params.outputFullFilename | STRING | "data/result/psi_result.csv" | Client result file save path |
| params.sync_result_to_server | INT32 | 0 or 1 | If or not the client synchronizes the result to the server. 1: push, 0: no push |
| params.server_outputFullFilname | STRING | "data/result/server/psi_result.csv" | Server-side result file save path |
| party_datasets | STRING | "psi_client_data,psi_server_data" | The value of this parameter is the client-side and server-side data identifier of the psi service, through which the system dispatch node finds the working node that registers the data. (The current use case registers the client data in node0, adds the path to save the data in config/primihub_node0.yaml, and sets the description of the data to "psi_client_data" as the data identifier. (The identifier is set by the user, and the parameter value in the request task is consistent with the value in the configuration file) |

