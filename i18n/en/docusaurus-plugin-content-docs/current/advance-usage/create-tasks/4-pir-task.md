---
sidebar_position: 4
---


# PIR Task

*** PIR Task Parameters Description ***

Creating a PIR task requires the following parameters:`--task_type=2`,and specify the index and the server-side dataset to query via `params`.The 'input_datasets' parameter specifies which datasets are in the' params' parameter

If starting with docker-compose, enter the node0_primihub container by running`docker exec -it node0_primihub bash` ，and run the following command：

```bash
./primihub-cli --task_type=2 --params="queryIndeies:STRING:0:11,serverData:STRING:0:pir_server_data,databaseSize:STRING:0:20,outputFullFilename:STRING:0:/data/result/pir_result.csv" --input_datasets="serverData"
```

If starting locally, run the following command from the compiled root directory:

```bash
./bazel-bin/cli --server="你的IP:50050" --task_type=2 --params="queryIndeies:STRING:0:11,serverData:STRING:0:pir_server_data,databaseSize:STRING:0:20,outputFullFilename:STRING:0:/data/result/pir_result.csv" --input_datasets="serverData"
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
| params.queryIndeies | STRING | 11 | 表示检索pir数据库index值为11数据记录，index值不能超过数据库的记录数，否则出错。（当前版本pir支持一次请求包含多个index，index值之间用英文逗号分割，而由于当前命令行请求中逗号用于分割参数，所以命令行启动任务只包含1个index值。）|
| params.serverData | STRING | pir_server_data | 该参数值为pir服务的服务端数据标识符，系统调度节点通过数据标识符找到注册对应数据的工作节点，pir客户端节点将向该节点发送匿踪查询请求。pir服务端加载该标识符对应文件生成pir数据库。（pir服务中调度节点默认作为pir服务的客户端节点。用例中数据注册到节点node1中，在config目中对应的配置文件是primihub_node1.yaml，添加数据的保存路径，设置该数据的description为"pir_server_data"，作为该数据标志符。标志符用户可以自主设置，请求任务中的参数值与配置文件中标志符保持一致））|
| params.databaseSize | STRING | 20 | 表示检索的pir数据库的数据记录数量，当前版本pir需要从cli通知客户端节点数据库的规模，如果未提供该参数或者该参数设置错误则会引发pir报错。 |
| params.outputFullFilename | STRING | "/data/result/pir_result.csv" | 指定pir匿踪查询结果保存文件的文件名和文件所在目录的绝对路径。|
| input_datasets | STRING | "serverData" | 该参数值指定params参数集合的数据集参数，实例中params.serverData是数据集参数，通过数据集参数值找到相关工作节点。|
