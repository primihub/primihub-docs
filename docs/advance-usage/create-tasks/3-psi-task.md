---
sidebar_position: 3
---


# 隐私求交（PSI）任务

*** 提交PSI任务的参数说明 ***

创建隐私求交（PSI）任务需要使用以下参数组合 `--task_type=3`, 并通过`params`参数指定要求交的客户端数据集和服务端数据集, `input_datasets`参数指定`params`参数中的哪些是数据集。

如果是通过docker-compose启动，执行 `docker exec -it node0_primihub bash` 进入到node0_primihub 容器，执行以下命令：

```bash
./primihub-cli --task_type=3 --params="clientData:STRING:0:psi_client_data,serverData:STRING:0:psi_server_data,clientIndex:INT32:0:0,serverIndex:INT32:0:1,psiType:INT32:0:0,psiTag:INT32:0:0,outputFullFilename:STRING:0:/data/result/psi_result.csv" --input_datasets="clientData,serverData"
```

如果是在本地编译启动，在编译完成后的代码根目录下执行以下命令：

```bash
./bazel-bin/cli --server="你的IP:50050" --task_type=3 --params="clientData:STRING:0:psi_client_data,serverData:STRING:0:psi_server_data,clientIndex:INT32:0:0,serverIndex:INT32:0:1,psiType:INT32:0:0,psiTag:INT32:0:0,outputFullFilename:STRING:0:/data/result/psi_result.csv" --input_datasets="clientData,serverData"
```
## 参数说明

| 参数| 数据类型 | 参数示例 | 参数说明
| ---- | ---- | ---- | ---- |
| params.clientData | STRING | psi_client_data | 该参数值为psi服务的客户端数据标识符，系统调度节点通过该标识符找到注册该数据的工作节点，将psi任务发往该工作节点。（当前在用例在node1中注册客户端数据，在config目录中的配置文件是primihub_node1.yaml，添加数据的保存路径，设置该数据的description为"psi_client_data"，作为该数据标志符。标志符由用户自主设置，请求任务中的参数值与配置文件中的值保持一致）|
| params.serverData | STRING | psi_server_data | 该参数值为psi服务的服务端数据标识符，系统调度节点通过该标识符找到注册该数据的工作节点，psi客户端节点将向该节点发送隐私求交请求。（用例中数据注册到节点node2中，数据注册方式与params.clientData参数说明描述相同）|
| params.psiType | INT32 | 0或者1 | 0表示该psi任务是求数据交集，1表示该psi任务是求数据的差集。|
| params.psiTag | INT32 | 0或者1 | psi支持多种底层协议实现，通过该参数区分，当前支持协议：0-ECDH,1-KKRT|
| params.clientIndex | INT32 | 0 | 表示psi客服端用表格形式的客服端数据的第几列数据进行求交，该参数值取值范围[0，文件最大列-1]。|
| params.serverIndex | INT32 | 1 | 表示psi服务端用表格形式的服务端数据的第几列数据进行求交，该参数取值范围[0，文件最大列-1]。 |
| params.outputFullFilename | STRING | "/data/result/psi_result.csv" | 指定pis结果保存文件的文件名以及文件存储目录的绝对路径。 |
| input_datasets | STRING | "clientData,serverData" | 该参数值指定params参数集合的数据集参数，实例中params.clientData和params.serverData，通过数据集参数找到相关工作节点。 |

