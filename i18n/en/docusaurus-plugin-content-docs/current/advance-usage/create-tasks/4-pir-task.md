---
sidebar_position: 4
---


# PIR Task

*** PIR Task Parameters Description ***

Creating a PIR task requires the following parameters:`--task_type=2`,and specify the index and the server-side dataset to query via `params`.The 'input_datasets' parameter specifies which datasets are in the' params' parameter

If starting with docker-compose, enter the primihub-node0 container by running`docker exec -it primihub-node0 bash` ，and run the following command：

```bash
./primihub-cli --task_config_file="example/keyword_pir_task_conf.json"
```

If starting locally, run the following command from the compiled root directory:

```bash
./bazel-bin/cli --server="你的IP:50050" --task_config_file="example/keyword_pir_task_conf.json"
```

Observe the logs of `node0`and`node1` respectively,and the following output means that the task runs successfully. Refer to the result file path in the parameter description to verify whether the generated result file is correct.

```
node0:
···
I20220922 07:36:36.533622    48 node.cc:114] start to create worker for task
I20220922 07:36:36.533638    48 node.cc:169]  🤖️ Start create worker node0
I20220922 07:36:36.533649    48 node.cc:173]  🤖️ Fininsh create worker node0
I20220922 07:36:36.535051   287 pir_scheduler.cc:111] Node push pir task rpc succeeded.
I20220922 07:36:36.790385    48 pir_client_task.cc:153] Save PIR result to /data/result/pir_result.csv.
I20220922 07:36:36.793393   286 pir_scheduler.cc:111] Node push pir task rpc succeeded.


node1:
···
I20220922 07:36:36.534358    35 node.cc:114] start to create worker for task
I20220922 07:36:36.534391    35 node.cc:169]  🤖️ Start create worker node1
I20220922 07:36:36.534508    35 node.cc:173]  🤖️ Fininsh create worker node1
I20220922 07:36:36.682356    35 node.cc:155] Start to create PSI/PIR server task
I20220922 07:36:36.682410    35 node.cc:169]  🤖️ Start create worker node1
I20220922 07:36:36.682437    35 node.cc:173]  🤖️ Fininsh create worker node1
I20220922 07:36:36.682521    35 pir_server_task.cc:134] load parameters
I20220922 07:36:36.682569    35 pir_server_task.cc:140] parameters loaded
I20220922 07:36:36.682590    35 pir_server_task.cc:142] load dataset
I20220922 07:36:36.682605    35 private_server_base.cc:72] loading file ...
I20220922 07:36:36.682760    35 pir_server_task.cc:64] db size = 20
I20220922 07:36:36.682785    35 pir_server_task.cc:148] dataset loaded
I20220922 07:36:36.682801    35 pir_server_task.cc:157] create database
I20220922 07:36:36.709856    35 pir_server_task.cc:165] database created
I20220922 07:36:36.711696    35 pir_server_task.cc:170] create server
I20220922 07:36:36.724994    35 pir_server_task.cc:178] server created
I20220922 07:36:36.725018    35 pir_server_task.cc:180] process request
I20220922 07:36:36.778131    35 pir_server_task.cc:187] request processed
```

## Parameter Description
| parameter| data type | example | parameter description
| ---- | ---- | ---- | ---- |
| params.clientData | STRING | HXfUhjJCfMssfPIjhDBXeMyZFmfbIAYvijkSCsyqvoGsJwcFhZiYIYSpFDdTUxvG | keyword for client to query from the server |
| params.serverData | STRING | keyword_pir_server_data | id of server dataset |
| params.outputFullFilename | STRING | "/data/result/kw_pir_result.csv" | path to save query result。|
| params.pirType | INT32 | 1 | pir type, 1 for keyword pir |
| input_datasets | STRING | "serverData" | datasets which used to search the location of the dataset。|

