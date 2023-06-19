---
sidebar_position: 1
---


# 多方安全计算（MPC）任务

多方安全计算（Multi-Party Computation，MPC）功能是指多个参与方在不暴露私有数据的情况下，共同完成一项计算任务的过程。

## 提交任务

启动一个MPC的逻辑回归任务：

通过`docker-compose`启动，执行 `docker exec -it primihub-node0 bash` 进入到 `primihub-node0` 容器，执行以下命令：

```bash
./primihub-cli --task_config_file="example/mpc_lr_task_conf.json"
```

下载二进制文件或本地编译启动，在代码根目录下执行以下命令：

```bash
./bazel-bin/cli --task_config_file="example/mpc_lr_task_conf.json"
```
分别观察`node0`、`node1`和`node2`的日志，有结果文件生成则代表任务运行成功。

```
node0:
···
I20230614 17:46:15.512172    48 node.cc:749] start to schedule task, task_type: 0
I20230614 17:46:15.512256    48 node.cc:1069]  🤖️ Start create worker node0 worker id: 28ca8b00-c1bf-414d-a9f3-0752d2f1a55c
I20230614 17:46:15.512315    48 node.cc:1073]  🤖️ Fininsh create worker node0 worker id: 28ca8b00-c1bf-414d-a9f3-0752d2f1a55c
E20230614 17:46:15.512459    48 proto_parser.cc:56] party_datasets: 3
W20230614 17:46:15.541919    48 parser.cc:192] update access info for party_name: PARTY0
W20230614 17:46:15.542023    48 parser.cc:192] update access info for party_name: PARTY1
W20230614 17:46:15.542083    48 parser.cc:192] update access info for party_name: PARTY2
I20230614 17:46:15.542430    48 aby3_scheduler.cc:191] Dispatch SubmitTask to 3 node
I20230614 17:46:15.542496    48 aby3_scheduler.cc:203] Dispatch Task to party: node1:primihub-node1:50051:0: party_name: PARTY1
I20230614 17:46:15.542651    48 aby3_scheduler.cc:203] Dispatch Task to party: node2:primihub-node2:50052:0: party_name: PARTY2
I20230614 17:46:15.542924    48 aby3_scheduler.cc:203] Dispatch Task to party: node0:primihub-node0:50050:0: party_name: PARTY0
I20230614 17:46:15.542958    62 aby3_scheduler.cc:49] dest node node1:primihub-node1:50051:0:
I20230614 17:46:15.543244    63 aby3_scheduler.cc:49] dest node node2:primihub-node2:50052:0:
I20230614 17:46:15.543543    64 aby3_scheduler.cc:49] dest node node0:primihub-node0:50050:0:
I20230614 17:46:15.549181    61 node.cc:848] start to create worker for task: job_id : 100 task_id: 200 request id: 28ca8b00-c1bf-414d-a9f3-0752d2f1a55c
I20230614 17:46:15.549252    61 node.cc:1069]  🤖️ Start create worker node0 worker id: 28ca8b00-c1bf-414d-a9f3-0752d2f1a55c
I20230614 17:46:15.549294    61 node.cc:1073]  🤖️ Fininsh create worker node0 worker id: 28ca8b00-c1bf-414d-a9f3-0752d2f1a55c
I20230614 17:46:15.549533    61 node.cc:858] create worker thread future for task: job_id : 100 task_id: 200 request id: 28ca8b00-c1bf-414d-a9f3-0752d2f1a55c finished
I20230614 17:46:15.549640    67 node.cc:821] begin to execute task
I20230614 17:46:15.552394    66 worker.cc:122] Request id: 28ca8b00-c1bf-414d-a9f3-0752d2f1a55c update party: PARTY0 status to: RUNNING
I20230614 17:46:15.553223    67 worker.cc:70] Worker start execute task 
I20230614 17:46:15.553269    67 logistic.cc:131] party_name: PARTY0
I20230614 17:46:15.553288    61 node.cc:875] create worker thread for task: job_id : 100 task_id: 200 request id: 28ca8b00-c1bf-414d-a9f3-0752d2f1a55c finished
I20230614 17:46:15.553335    67 logistic.cc:158] Train data train_party_0, test data .
I20230614 17:46:15.554432    68 worker.cc:122] Request id: 28ca8b00-c1bf-414d-a9f3-0752d2f1a55c update party: PARTY2 status to: RUNNING
I20230614 17:46:15.554865    68 worker.cc:122] Request id: 28ca8b00-c1bf-414d-a9f3-0752d2f1a55c update party: PARTY1 status to: RUNNING
I20230614 17:46:15.565569    67 logistic.cc:430] local_id_local_id_: 2
I20230614 17:46:15.565621    67 logistic.cc:431] next_party: PARTY1 detail: node1:primihub-node1:50051:0:
I20230614 17:46:15.565647    67 logistic.cc:432] prev_party: PARTY2 detail: node2:primihub-node2:50052:0:
I20230614 17:46:15.565676    67 mpc_channel.cc:11] Init channel to PARTY1.
I20230614 17:46:15.565696    67 mpc_channel.cc:11] Init channel to PARTY2.
I20230614 17:46:15.565726    67 runtime.h:48] Init Runtime : 2, 0x7f2a5000a060
I20230614 17:46:15.565752    67 aby3ML.cc:35] Runtime init finish.
I20230614 17:46:15.606828    67 aby3ML.cc:39] Encryptor init finish.
I20230614 17:46:15.624158    67 aby3ML.cc:42] Evaluator init finish.
E20230614 17:46:15.624224    67 logistic.cc:462] Construct shares of train data and train label.
E20230614 17:46:15.718981    67 logistic.cc:470] end Construct shares of train data and train label.
I20230614 17:46:15.757925    67 logistic.cc:584] Train dataset has 558 examples, dimension of each is 11.
I20230614 17:46:15.757994    67 logistic.cc:587] Test dataset has 141 examples, dimension of each is 11.
I20230614 17:46:15.758018    67 logistic.cc:49] (Learning rate):0.0078125.
I20230614 17:46:15.758060    67 logistic.cc:50] (Epoch):100.
I20230614 17:46:15.758076    67 logistic.cc:51] (Batchsize) :128.
I20230614 17:46:15.758090    67 logistic.cc:52] (Train_loader size):4.
I20230614 17:46:15.976900    67 regression.h:249] 0 @  percent:0.326241.
I20230614 17:46:17.106693    67 regression.h:249] 10 @  percent:0.893617.
I20230614 17:46:18.369973    67 regression.h:249] 20 @  percent:0.921986.
I20230614 17:46:19.758834    67 regression.h:249] 30 @  percent:0.929078.
I20230614 17:46:20.961714    67 regression.h:249] 40 @  percent:0.929078.
I20230614 17:46:22.073453    67 regression.h:249] 50 @  percent:0.929078.
I20230614 17:46:23.093506    67 regression.h:249] 60 @  percent:0.929078.
I20230614 17:46:24.239471    67 regression.h:249] 70 @  percent:0.929078.
I20230614 17:46:25.444774    67 regression.h:249] 80 @  percent:0.929078.
I20230614 17:46:26.469460    67 regression.h:249] 90 @  percent:0.93617.
I20230614 17:46:27.379612    67 logistic.cc:607] Party 2 train finish.
I20230614 17:46:27.384567    67 logistic.cc:667] Save model to data/result/mpc_lr_model.csv.
I20230614 17:46:27.420114  3032 worker.cc:119] collected finished party count: 1
I20230614 17:46:27.420164  3032 worker.cc:122] Request id: 28ca8b00-c1bf-414d-a9f3-0752d2f1a55c update party: PARTY2 status to: SUCCESS
I20230614 17:46:27.424995  3032 worker.cc:119] collected finished party count: 2
I20230614 17:46:27.425034  3032 worker.cc:122] Request id: 28ca8b00-c1bf-414d-a9f3-0752d2f1a55c update party: PARTY1 status to: SUCCESS
I20230614 17:46:27.428491    67 logistic.cc:673] Register new dataset finish.
I20230614 17:46:27.429445  3035 worker.cc:119] collected finished party count: 3
I20230614 17:46:27.429504  3035 worker.cc:122] Request id: 28ca8b00-c1bf-414d-a9f3-0752d2f1a55c update party: PARTY0 status to: SUCCESS


node1 和 node2 日志和 node0 类似，省略。
```

MPC任务除了支持逻辑回归外、还支持四则运算、求均求和最大最小值统计、缺失值异常值处理等，具体各任务的示例配置请参考 `example目录下的mpc_*.json` 文件
## 参数说明

| 参数| 数据类型 | 参数示例 | 参数说明
| ---- | ---- | ---- | ---- |
| task_code.code |  | logistic_regression | MPC的任务类型 |
| params.BatchSize | INT32 | 128 | 数据大小 |
| params.NumIters | INT32 | 100 | 迭代次数 |
| params.modelName | STRING | data/result/mpc_lr_mode.csv | 生成模型的存储路径及文件名|
| party_datasets.PARTY0 | STRING | test_party_0,train_party_0 | 训练数据集 |
| party_datasets.PARTY1 | STRING | test_party_1,train_party_1 | 训练数据集 |
| party_datasets.PARTY2 | STRING | test_party_2,train_party_2 | 训练数据集 |
