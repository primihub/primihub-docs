---
sidebar_position: 4
---


# 隐匿查询（PIR）任务

隐匿查询（Private Information Retrieval，PIR）功能是指在不暴露参与方私有数据的情况下，实现对数据的查询和分析。

## 提交任务

***提交基于关键字(keyword)查询的PIR任务的参数说明***

如果是通过下载二进制文件或本地编译启动，编译完成后在代码根目录下执行以下命令；如果是通过docker-compose启动，先执行 `docker exec -it primihub-node0 bash` 进入到 `primihub-node0` 容器中，再执行以下命令。

```bash
./primihub-cli --task_config_file="example/keyword_pir_task_conf.json"
```

分别观察`node0`和`node1`的日志，有如下输出则代表任务运行成功，可参考参数说明中的结果文件路径验证生成的结果文件是否正确

注意：启动node的时候可以指定日志级别GLOG_logtostderr=1 GLOG_v=5 其中GLOG_v中指定的参数，数字越大代表打印的日志越详细

```
node0:
···
I20230614 18:19:30.339798    49 node.cc:749] start to schedule task, task_type: 2
I20230614 18:19:30.339884    49 node.cc:1069]  🤖️ Start create worker node0 worker id: 3d1b4923-648e-4613-b244-b8ae168437be
I20230614 18:19:30.339934    49 node.cc:1073]  🤖️ Fininsh create worker node0 worker id: 3d1b4923-648e-4613-b244-b8ae168437be
I20230614 18:19:30.339969    49 node.cc:756] insert worker id: 3d1b4923-648e-4613-b244-b8ae168437be into task_scheduler_map_
E20230614 18:19:30.340076    49 proto_parser.cc:56] party_datasets: 1
I20230614 18:19:30.340148    49 parser.cc:78] Finding meta list from datasets...
I20230614 18:19:30.365765    49 parser.cc:83] Find meta list from datasets: 1
I20230614 18:19:30.365887    49 parser.cc:87] end of MergePartyAccessInfo
I20230614 18:19:30.366051    49 pir_scheduler.cc:91] begin to Dispatch SubmitTask to PIR task party node ...
I20230614 18:19:30.366122    49 pir_scheduler.cc:100] Dispatch SubmitTask to PIR party node: node1:primihub-node1:50051:0: party_name: SERVER
I20230614 18:19:30.366313    49 pir_scheduler.cc:100] Dispatch SubmitTask to PIR party node: node0:primihub-node0:50050:0: party_name: CLIENT
I20230614 18:19:30.366684    63 pir_scheduler.cc:56] dest node node1:primihub-node1:50051:0:
I20230614 18:19:30.366724    64 pir_scheduler.cc:56] dest node node0:primihub-node0:50050:0:
I20230614 18:19:30.371186    62 node.cc:848] start to create worker for task: job_id : 100 task_id: 200 request id: 3d1b4923-648e-4613-b244-b8ae168437be
I20230614 18:19:30.371254    62 node.cc:1069]  🤖️ Start create worker node0 worker id: 3d1b4923-648e-4613-b244-b8ae168437be
I20230614 18:19:30.371296    62 node.cc:1073]  🤖️ Fininsh create worker node0 worker id: 3d1b4923-648e-4613-b244-b8ae168437be
I20230614 18:19:30.371521    62 node.cc:858] create worker thread future for task: job_id : 100 task_id: 200 request id: 3d1b4923-648e-4613-b244-b8ae168437be finished
I20230614 18:19:30.371630    66 node.cc:821] begin to execute task
I20230614 18:19:30.374213    65 worker.cc:122] Request id: 3d1b4923-648e-4613-b244-b8ae168437be update party: CLIENT status to: RUNNING
I20230614 18:19:30.374786    66 worker.cc:61] Worker::execute task type: 2
I20230614 18:19:30.374992    66 worker.cc:70] Worker start execute task
I20230614 18:19:30.375034    62 node.cc:875] create worker thread for task: job_id : 100 task_id: 200 request id: 3d1b4923-648e-4613-b244-b8ae168437be finished
I20230614 18:19:30.376495    67 worker.cc:122] Request id: 3d1b4923-648e-4613-b244-b8ae168437be update party: SERVER status to: RUNNING
I20230614 18:19:30.385742    66 receiver.cpp:159] Created OPRFReceiver for 3 items
I20230614 18:19:30.575682    66 receiver.cpp:229] Creating encrypted query for 3 items
I20230614 18:19:30.666715    66 receiver.cpp:353] Finished creating encrypted query
I20230614 18:19:30.726406    72 worker.cc:119] collected finished party count: 1
I20230614 18:19:30.726450    72 worker.cc:122] Request id: 3d1b4923-648e-4613-b244-b8ae168437be update party: SERVER status to: SUCCESS
I20230614 18:19:30.727962    66 receiver.cpp:581] Processing 1 result parts
I20230614 18:19:30.732764    66 receiver.cpp:616] Found 3 matches
I20230614 18:19:30.733783    73 worker.cc:119] collected finished party count: 2
I20230614 18:19:30.733834    73 worker.cc:122] Request id: 3d1b4923-648e-4613-b244-b8ae168437be update party: CLIENT status to: SUCCESS
I20230614 18:19:36.976497    47 node.cc:118] number of timeout task status need to earse: 1


node1:
···
I20230614 18:19:30.372288    58 node.cc:848] start to create worker for task: job_id : 100 task_id: 200 request id: 3d1b4923-648e-4613-b244-b8ae168437be
I20230614 18:19:30.372376    58 node.cc:1069]  🤖️ Start create worker node1 worker id: 3d1b4923-648e-4613-b244-b8ae168437be
I20230614 18:19:30.372438    58 node.cc:1073]  🤖️ Fininsh create worker node1 worker id: 3d1b4923-648e-4613-b244-b8ae168437be
I20230614 18:19:30.372689    58 node.cc:858] create worker thread future for task: job_id : 100 task_id: 200 request id: 3d1b4923-648e-4613-b244-b8ae168437be finished
I20230614 18:19:30.372799    61 node.cc:821] begin to execute task
I20230614 18:19:30.377077    61 worker.cc:61] Worker::execute task type: 2
I20230614 18:19:30.377228    61 keyword_pir_server_task.cc:107] enter KeywordPIRServerTask ctr
I20230614 18:19:30.377333    61 keyword_pir_server_task.cc:109] exit KeywordPIRServerTask ctr
I20230614 18:19:30.377377    61 worker.cc:70] Worker start execute task
I20230614 18:19:30.377425    58 node.cc:875] create worker thread for task: job_id : 100 task_id: 200 request id: 3d1b4923-648e-4613-b244-b8ae168437be finished
I20230614 18:19:30.402772    61 sender_db.cpp:767] Start inserting 50 items in SenderDB
I20230614 18:19:30.436977    61 sender_db.cpp:829] Found 50 new items to insert in SenderDB
I20230614 18:19:30.442929    61 sender_db.cpp:372] Launching 1 insert-or-assign worker tasks
I20230614 18:19:30.452275    61 sender_db.cpp:395] Finished insert-or-assign worker tasks
I20230614 18:19:30.452469    61 sender_db.cpp:699] Start generating bin bundle caches
I20230614 18:19:30.559722    61 sender_db.cpp:707] Finished generating bin bundle caches
I20230614 18:19:30.559908    61 sender_db.cpp:851] Finished inserting 50 items in SenderDB
I20230614 18:19:30.563670    61 sender_db.cpp:740] SenderDB has been stripped
I20230614 18:19:37.850311    56 node.cc:118] number of timeout task status need to earse: 1
```

## 参数说明

| 参数| 数据类型 | 参数示例 | 参数说明
| ---- | ---- | ---- | ---- |
| params.clientData | STRING | HXfUhjJ... | 表示需要检索pir数据库中关键字的记录，（对于查询的每个关键字作为一条单独的记录，支持多个关键字同时查询）， 在任务发起后，通过该标识获取对应client节点端的数据配置并加载数据，用例中数据注册到节点node1中，在config目录中对应的配置文件为primihub_node1.yaml, 设置该数据为 "keyword_pir_server_data" 对应的文件中包含的字符串 |
| params.pirType | INT32 | 1或0 | 1：基于关键字的隐匿查询，0:基于ID |
| params.outputFullFilename | STRING | "data/result/pir_result.csv" | 指定结果保存文件路径 |
| party_datasets | STRING | "keyword_pir_server_data" | 该参数值为pir服务的服务端数据标识符，系统调度节点通过数据标识符找到注册对应数据的工作节点，pir客户端节点将向该节点发送隐匿查询请求。pir服务端加载该标识符对应文件生成pir数据库 |

# 隐匿查询（PIR）预生成DB数据库任务

在有些场景下，被查询端的数据变化不是很频繁的，这种情况下可以将数据做离线处理，预生成查询过程中使用的数据库，供在线过程查询使用，以提高查询效率
此过程与在线服务是完全独立的两个流程，在线任务会首先搜索预指定的cache位置是否存在与设置的数据集id相同名称的数据库cache文件，如果存在则使用cache数据，否则按照一般流程执行。

## 提交生成DB数据库任务

```bash
./primihub-cli --task_config_file="example/keyword_pir_db_build_task_conf.json"
```

## 参数说明

| 参数| 数据类型 | 参数示例 | 参数说明
| ---- | ---- | ---- | ---- |
| params.pirType | INT32 | 1 | 1：基于关键字的隐匿查询任务 |
| params.DbInfo | STRING | “data/cache/keyword_pir_server_data” | 指定生产的数据cache存储的路径 |
