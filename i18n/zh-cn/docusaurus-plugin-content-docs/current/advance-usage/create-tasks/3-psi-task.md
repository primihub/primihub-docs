---
sidebar_position: 3
description: 通过开源隐私计算平台 PrimiHub 隐私求交（PSI）任务
keywords: [隐私求交, PSI]
---

# 隐私求交（PSI）任务

## 提交任务
*** 提交PSI任务的参数说明 ***

创建隐私求交（PSI）任务需要使用以下参数组合 `--task_type=3`, 并通过`params`参数指定要求交的客户端数据集和服务端数据集, `input_datasets`参数指定`params`参数中的哪些是数据集。

如果是通过docker-compose启动，执行 `docker exec -it primihub-node0 bash` 进入到 `primihub-node0` 容器，执行以下命令：

```bash
/app/primihub-cli --task_type=3 \
    --params="clientData:STRING:0:psi_client_data,serverData:STRING:0:psi_server_data,clientIndex:INT32:0:0,serverIndex:INT32:0:1,psiType:INT32:0:0,psiTag:INT32:0:0,outputFullFilename:STRING:0:/data/result/psi_result.csv" \
    --input_datasets="clientData,serverData"
```

如果是在本地编译启动，在编译完成后的代码根目录下执行以下命令：

```bash
export IP=your-ip
./bazel-bin/cli --server="$IP:50050" --task_type=3 \
    --params="clientData:STRING:0:psi_client_data,serverData:STRING:0:psi_server_data,clientIndex:INT32:0:0,serverIndex:INT32:0:1,psiType:INT32:0:0,psiTag:INT32:0:0,outputFullFilename:STRING:0:/data/result/psi_result.csv" \
    --input_datasets="clientData,serverData"
```

## 检查结果
分别观察`node0`、`node1`和`node2`的日志，有如下输出则代表任务运行成功，可参考参数说明中的结果文件路径验证生成的结果文件是否正确

```
node0:
···
I20220922 07:16:06.318814    25 parser.cc:197]  🔍 PSItask found meta list from datasets: 2
I20220922 07:16:06.318981    25 psi_scheduler.cc:254]  📧  Dispatch SubmitTask to PSI client node
I20220922 07:16:06.319172    66 psi_scheduler.cc:200] dest node 172.28.1.12:50050
I20220922 07:16:06.319336    67 psi_scheduler.cc:200] dest node 172.28.1.11:50050
I20220922 07:16:06.321499    67 psi_scheduler.cc:209] Psi task server node is active.
I20220922 07:16:06.346092    66 psi_scheduler.cc:207] Node push psi task rpc succeeded.


node1:
···
I20220922 07:16:06.321259    26 node.cc:114] start to create worker for task
I20220922 07:16:06.321269    26 node.cc:169]  🤖️ Start create worker node1
I20220922 07:16:06.321276    26 node.cc:173]  🤖️ Fininsh create worker node1
I20220922 07:16:06.328846    26 node.cc:155] Start to create PSI/PIR server task
I20220922 07:16:06.328874    26 node.cc:169]  🤖️ Start create worker node1
I20220922 07:16:06.328881    26 node.cc:173]  🤖️ Fininsh create worker node1


node2:
···
I20220922 07:16:06.321429    26 node.cc:114] start to create worker for task
I20220922 07:16:06.321435    26 node.cc:169]  🤖️ Start create worker node2
I20220922 07:16:06.321442    26 node.cc:173]  🤖️ Fininsh create worker node2
I20220922 07:16:06.345343    26 psi_client_task.cc:257] Save PSI result to /data/result/psi_result.csv.
```

## 参数说明

| 参数| 数据类型 | 参数示例 | 参数说明
| ---- | ---- | ---- | ---- |
| params.clientData | STRING | psi_client_data | 该参数值为psi服务的客户端数据标识符，系统调度节点通过该标识符找到注册该数据的工作节点，将psi任务发往该工作节点。（当前在用例在node1中注册客户端数据，在config目录中的配置文件是primihub_node1.yaml，添加数据的保存路径，设置该数据的description为"psi_client_data"，作为该数据标志符。标志符由用户自主设置，请求任务中的参数值与配置文件中的值保持一致）|
| params.serverData | STRING | psi_server_data | 该参数值为psi服务的服务端数据标识符，系统调度节点通过该标识符找到注册该数据的工作节点，psi客户端节点将向该节点发送隐私求交请求。（用例中数据注册到节点node2中，数据注册方式与params.clientData参数说明描述相同）|
| params.psiType | INT32 | 0或者1 | 0表示该psi任务是求数据交集，1表示该psi任务是求数据的差集。|
| params.psiTag | INT32 | 0或者1 | psi支持多种底层协议实现，通过该参数区分，当前支持协议：0-ECDH,1-KKRT。|
| params.clientIndex | INT32 | 0 | 表示psi客服端用表格形式的客服端数据的第几列数据进行求交，该参数值取值范围[0，文件最大列-1]。|
| params.serverIndex | INT32 | 1 | 表示psi服务端用表格形式的服务端数据的第几列数据进行求交，该参数取值范围[0，文件最大列-1]。 |
| params.outputFullFilename | STRING | "/data/result/psi_result.csv" | 指定pis结果保存文件的文件名以及文件存储目录的绝对路径。 |
| input_datasets | STRING | "clientData,serverData" | 该参数值指定params参数集合的数据集参数，实例中params.clientData和params.serverData是数据集参数，通过数据集参数值找到相关工作节点。 |
