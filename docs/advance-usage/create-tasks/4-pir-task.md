---
sidebar_position: 4
---


# 匿踪查询（PIR）任务

*** 提交基于ID查询的PIR任务的参数说明 ***

创建匿踪查询（PIR）任务需要使用以下参数组合 `--task_type=2`, 并通过`params`参数指定要查询index和服务端数据集, `input_datasets`参数指定`params`参数中的哪些是数据集。

如果是通过docker-compose启动，执行 `docker exec -it node0_primihub bash` 进入到node0_primihub 容器，执行以下命令：

```bash
./primihub-cli --task_type=2 --params="queryIndeies:STRING:0:11,serverData:STRING:0:pir_server_data,databaseSize:STRING:0:20,pirType:INT32:0:0,outputFullFilename:STRING:0:/data/result/pir_result.csv" --input_datasets="serverData"
```

如果是在本地编译启动，在编译完成后的代码根目录下执行以下命令：

```bash
./bazel-bin/cli --server="你的IP:50050" --task_type=2 --params="queryIndeies:STRING:0:11,serverData:STRING:0:pir_server_data,pirType:INT32:0:0,databaseSize:STRING:0:20,outputFullFilename:STRING:0:/data/result/pir_result.csv" --input_datasets="serverData"
```


分别观察`node0`和`node1`的日志，有如下输出则代表任务运行成功，可参考参数说明中的结果文件路径验证生成的结果文件是否正确

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

## 参数说明

| 参数| 数据类型 | 参数示例 | 参数说明
| ---- | ---- | ---- | ---- |
| params.queryIndeies | STRING | 11 | 表示检索pir数据库index值为11数据记录，index值不能超过数据库的记录数，否则出错。（当前版本pir支持一次请求包含多个index，index值之间用英文逗号分割，而由于当前命令行请求中逗号用于分割参数，所以命令行启动任务只包含1个index值。）|
| params.serverData | STRING | pir_server_data | 该参数值为pir服务的服务端数据标识符，系统调度节点通过数据标识符找到注册对应数据的工作节点，pir客户端节点将向该节点发送匿踪查询请求。pir服务端加载该标识符对应文件生成pir数据库。（pir服务中调度节点默认作为pir服务的客户端节点。用例中数据注册到节点node1中，在config目中对应的配置文件是primihub_node1.yaml，添加数据的保存路径，设置该数据的description为"pir_server_data"，作为该数据标志符。标志符用户可以自主设置，请求任务中的参数值与配置文件中标志符保持一致））|
| params.databaseSize | STRING | 20 | 表示检索的pir数据库的数据记录数量，当前版本pir需要从cli通知客户端节点数据库的规模，如果未提供该参数或者该参数设置错误则会引发pir报错。 |
| params.outputFullFilename | STRING | "/data/result/pir_result.csv" | 指定pir匿踪查询结果保存文件的文件名和文件所在目录的绝对路径。|
| input_datasets | STRING | "serverData" | 该参数值指定params参数集合的数据集参数，实例中params.serverData是数据集参数，通过数据集参数值找到相关工作节点。|
| params.pirType | INT32 | 0 | 指定发起的任务为基于索引隐匿查询, 参数为0代表基于id查询。|


*** 提交基于关键字(keyword)查询的PIR任务的参数说明 ***

## 编译依赖

基于关键字查询PIR任务是基于APSI库实现的，当前APSI库通信采用mq的形式实现，需要预先安装下mq和flatbuffer
macos安装：
```shell
mq相关组件
brew install cppzmq zeromq
flatbuffers-2.0.0 通过源码安装
```
ubuntu操作系统安装：
```shell
sudo apt-get install cppzmq zeromq
flatbuffers-2.0.0 通过源码安装
```
## 任务执行

创建匿踪查询（PIR）任务需要使用以下参数组合 `--task_type=2`, 并通过`params`参数指定客户端和服务端数据集, `input_datasets`参数指定`params`参数中的哪些是数据集。

如果是通过docker-compose启动，执行 `docker exec -it node0_primihub bash` 进入到node0_primihub 容器，执行以下命令：

```bash
./primihub-cli --task_type=2 --params="clientData:STRING:0:pir_client_data,serverData:STRING:0:pir_server_data,pirType:INT32:0:1,outputFullFilename:STRING:0:/opt/data/result/pir_result.csv" --input_datasets="clientData,serverData"
```

如果是在本地编译启动，在编译完成后的代码根目录下执行以下命令：

```bash
./bazel-bin/cli --server="你的IP:50050" --task_type=2 --params="clientData:STRING:0:pir_client_data,serverData:STRING:0:pir_server_data,pirType:INT32:0:1,outputFullFilename:STRING:0:/opt/data/result/pir_result.csv" --input_datasets="clientData,serverData"
```


分别观察`node0`和`node1`的日志，有如下输出则代表任务运行成功，可参考参数说明中的结果文件路径验证生成的结果文件是否正确
注意：启动node的时候可以指定日志级别GLOG_logtostderr=1 GLOG_v=5 其中GLOG_v中指定的参数，数字越大代表打印的日志越详细，当中只使用到level=5

```
node0:
···
I20221026 16:17:16.703593 567770 node.cc:112] start to create worker for task
I20221026 16:17:16.703600 567770 node.cc:167]  🤖️ Start create worker node0
I20221026 16:17:16.703603 567770 node.cc:171]  🤖️ Fininsh create worker node0
I20221026 16:17:16.703614 567770 worker.cc:39] Worker::execute task type: 4
I20221026 16:17:16.703619 567770 worker.cc:93] get pirType: 1
I20221026 16:17:16.703636 567770 keyword_pir_client_task.cc:43] dataset_path_: data/pir_client.csv
I20221026 16:17:16.703640 567770 keyword_pir_client_task.cc:45] result_file_path_: /opt/data/result/pir_result.csv
I20221026 16:17:16.703644 567770 keyword_pir_client_task.cc:47] server_address_: 127.0.0.1:50051
I20221026 16:17:16.703706 567770 keyword_pir_client_task.cc:123] begin to connect to server: tcp://127.0.0.1:1212
I20221026 16:17:16.703859 567770 keyword_pir_client_task.cc:125] connect to server: tcp://127.0.0.1:1212 end
I20221026 16:17:16.703866 567770 keyword_pir_client_task.cc:130] connect to server: tcp://127.0.0.1:1212 success, begin to create PSIParams
I20221026 16:17:16.703868 567770 keyword_pir_client_task.cc:134] begin to create PSIParams
I20221026 16:17:21.785364 567770 keyword_pir_client_task.cc:136] get reqeust param success
I20221026 16:17:21.785388 567770 keyword_pir_client_task.cc:137] PSI parameters set to: item_params.felts_per_item: 5; table_params.table_size: 409; table_params.max_items_per_bin: 20; table_params.hash_func_count: 1; query_params.ps_low_degree: 0; query_params.query_powers: {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20}; seal_params.poly_modulus_degree: 2048; seal_params.coeff_modulus: [48]; seal_params.plain_modulus: 65537
I20221026 16:17:21.785413 567770 keyword_pir_client_task.cc:138] Derived parameters: item_bit_count_per_felt: 16; item_bit_count: 80; bins_per_bundle: 2045; bundle_idx_count: 1
I20221026 16:17:21.785421 567770 keyword_pir_client_task.cc:150] Keyword PIR setting thread count to 8
I20221026 16:17:21.786209 567770 keyword_pir_client_task.cc:164] begin to Receiver::RequestOPRF
I20221026 16:17:21.786216 567770 keyword_pir_client_task.cc:166] Sending OPRF request for 2 items
I20221026 16:17:21.834780 567770 keyword_pir_client_task.cc:168] Received OPRF request for 2 items oprf_items: 2 label_keys: 2
I20221026 16:17:21.834795 567770 keyword_pir_client_task.cc:174] Receiver::RequestOPRF end, begin to receiver.request_query
I20221026 16:17:21.970415 567770 keyword_pir_client_task.cc:183] receiver.request_query end
I20221026 16:17:21.970459 567770 keyword_pir_client_task.cc:98] result_file_path_: /opt/data/result/pir_result.csv
I20221026 16:17:21.971082 567804 pir_scheduler.cc:191] Node push pir task rpc succeeded for remot node: 127.0.0.1:50050
I20221026 16:17:21.971101 567804 pir_scheduler.cc:195] dest_node: 127.0.0.1:50050 reply success
I20221026 16:17:21.972643 567803 pir_scheduler.cc:191] Node push pir task rpc succeeded for remot node: 127.0.0.1:50051
I20221026 16:17:21.972668 567803 pir_scheduler.cc:195] dest_node: 127.0.0.1:50051 reply success
I20221026 16:17:21.972864 567737 pir_scheduler.cc:301] end of PIRScheduler::dispatch
I20221026 16:17:21.972929 567737 node.cc:110] end schedule schedule task for type: 2


node1:
···
I20221026 16:17:16.704870 567744 node.cc:112] start to create worker for task
I20221026 16:17:16.704876 567744 node.cc:167]  🤖️ Start create worker node1
I20221026 16:17:16.704880 567744 node.cc:171]  🤖️ Fininsh create worker node1
I20221026 16:17:16.704883 567744 worker.cc:39] Worker::execute task type: 4
I20221026 16:17:16.704887 567744 worker.cc:93] get pirType: 1
I20221026 16:17:16.704918 567744 keyword_pir_server_task.cc:120] pir_server_config_path: config/pir_server_config.json
I20221026 16:17:16.705915 567744 keyword_pir_server_task.cc:105] begin to read data, dataset path: data/pir_server.csv
I20221026 16:17:16.779757 567744 keyword_pir_server_task.cc:53] CSVReader::LabeledData
I20221026 16:17:16.780781 567744 keyword_pir_server_task.cc:62] label_byte_count: 64 nonce_byte_count: 16
I20221026 16:17:21.629544 567744 keyword_pir_server_task.cc:170] begin to create ZMQSenderDispatcher
I20221026 16:17:21.630190 567744 keyword_pir_server_task.cc:174] ZMQSenderDispatcher begin to run port: 1212
I20221026 16:17:21.969250 567744 keyword_pir_server_task.cc:177] key word pir task execute finished
```

## 参数说明

| 参数| 数据类型 | 参数示例 | 参数说明
| ---- | ---- | ---- | ---- |
| params.clientData | STRING | pir_client_data | 表示需要检索pir数据库中关键字的记录，（对于查询的每个关键字作为一条单独的记录，支持多个关键字同时查询）， 在任务发起后，通过该标识获取对应client节点端的数据配置并加载数据，用例中数据注册到节点node0中，在config目录中对应的配置文件为primihub_node0.yaml, 设置该数据的description为"pir_client_data"，作为该数据标志符。标志符用户可以自主设置，请求任务中的参数值与配置文件中标志符保持一致|
| params.serverData | STRING | pir_server_data | 该参数值为pir服务的服务端数据标识符，系统调度节点通过数据标识符找到注册对应数据的工作节点，pir客户端节点将向该节点发送匿踪查询请求。pir服务端加载该标识符对应文件生成pir数据库。（pir服务中调度节点默认作为pir服务的客户端节点。用例中数据注册到节点node1中，在config目中对应的配置文件是primihub_node1.yaml，添加数据的保存路径，设置该数据的description为"pir_server_data"，作为该数据标志符。标志符用户可以自主设置，请求任务中的参数值与配置文件中标志符保持一致））|
| params.outputFullFilename | STRING | "/data/result/pir_result.csv" | 指定pir匿踪查询结果保存文件的文件名和文件所在目录的绝对路径。|
| params.pirType | INT32 | 1 | 指定发起的任务为基于关键字隐匿查询，参数为1代表基于关键字查询|
| input_datasets | STRING | "serverData" | 该参数值指定params参数集合的数据集参数，实例中params.serverData是数据集参数，通过数据集参数值找到相关工作节点。|
