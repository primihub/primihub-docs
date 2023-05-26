---
sidebar_position: 4
---


# 匿踪查询（PIR）任务

*** 提交基于关键字(keyword)查询的PIR任务的参数说明 ***

## 任务执行

创建匿踪查询（PIR）任务需要使用以下参数组合 `--task_type=2`, 并通过`params`参数指定客户端和服务端数据集, `input_datasets`参数指定`params`参数中的哪些是数据集。

如果是通过docker-compose启动，执行 `docker exec -it primihub-node0 bash` 进入到 `primihub-node0` 容器，执行以下命令：

```bash
./primihub-cli --task_config_file="example/keyword_pir_task_conf.json"
```

如果是在本地编译启动，在编译完成后的代码根目录下执行以下命令：

```bash
./bazel-bin/cli --server="你的IP:50050" --task_config_file="example/keyword_pir_task_conf.json"
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
I20221026 16:17:16.703640 567770 keyword_pir_client_task.cc:45] result_file_path_: /data/result/kw_pir_result.csv
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
I20221026 16:17:21.970459 567770 keyword_pir_client_task.cc:98] result_file_path_: /data/result/kw_pir_result.csv
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
| params.clientData | STRING | HXfUhjJCfMssfPIjhDBXeMyZFmfbIAYvijkSCsyqvoGsJwcFhZiYIYSpFDdTUxvG | 表示需要检索pir数据库中关键字的记录，（对于查询的每个关键字作为一条单独的记录，支持多个关键字同时查询）， 在任务发起后，通过该标识获取对应client节点端的数据配置并加载数据，用例中数据注册到节点node1中，在config目录中对应的配置文件为primihub_node1.yaml, 设置该数据为 "keyword_pir_server_data" 对应的文件中包含的字符串 |
| params.serverData | STRING | keyword_pir_server_data | 该参数值为pir服务的服务端数据标识符，系统调度节点通过数据标识符找到注册对应数据的工作节点，pir客户端节点将向该节点发送匿踪查询请求。pir服务端加载该标识符对应文件生成pir数据库。（pir服务中调度节点默认作为pir服务的客户端节点。用例中数据注册到节点node1中，在config目中对应的配置文件是primihub_node1.yaml，添加数据的保存路径，设置该数据的description为"keyword_pir_server_data"，作为该数据标志符。标志符用户可以自主设置，请求任务中的参数值与配置文件中标志符保持一致））|
| params.outputFullFilename | STRING | "/data/result/kw_pir_result.csv" | 指定pir匿踪查询结果保存文件的文件名和文件所在目录的绝对路径。|
| params.pirType | INT32 | 1 | 指定发起的任务为基于关键字隐匿查询，参数为1代表基于关键字查询|
| input_datasets | STRING | "serverData" | 该参数值指定params参数集合的数据集参数，实例中params.serverData是数据集参数，通过数据集参数值找到相关工作节点。|
