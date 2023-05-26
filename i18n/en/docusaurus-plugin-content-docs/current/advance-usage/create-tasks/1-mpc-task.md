---
sidebar_position: 1
---


# MPC Task

*** MPC Task Parameters Description ***

Creating a MPC task requires the following parameters:`--task_lang=proto --task_type=0`, and specify the MPC algorithm to run via the `task_code` parameter.The`params`specifies the input parameters for the algorithm to execute.The `input_datasets`' parameter specifies which of the`params` parameters are the input datasets.

Example: launching an MPC logistic regression task：

If starting with docker-compose, enter the primihub-node0 container by running `docker exec -it primihub-node0 bash`,and run the following command:

```bash
./primihub-cli --server="Your IP:50050" --task_config_file="example/mpc_lr_task_conf.json"
```

If starting locally, run the following command from the compiled root directory:

```bash
./bazel-bin/node --server="Your IP:50050" --task_config_file="example/mpc_lr_task_conf.json"
```
Observe the logs of `node0`、`node1`and`node2` respectively,and the following output means that the task runs successfully. Refer to the result file path in the parameter description to verify whether the generated result file is correct.

```
node0:
···
I20220922 07:42:45.991482    40 node.cc:114] start to create worker for task
I20220922 07:42:45.991490    40 node.cc:169]  🤖️ Start create worker node0
I20220922 07:42:45.991498    40 node.cc:173]  🤖️ Fininsh create worker node0
I20220922 07:42:45.991870    40 logistic.cc:127] Note party id of this node is 0.
I20220922 07:42:45.991905    40 worker.cc:47]  🚀 Worker start execute task
I20220922 07:42:45.991930    40 logistic.cc:187] Train data /tmp/train_party_0.csv, test data /tmp/test_party_0.csv.
I20220922 07:42:46.003528    40 logistic.cc:303] [Next] Init server session, party 0, ip 172.28.1.10, port 12120, name sess_0_1.
I20220922 07:42:46.003578    40 logistic.cc:309] [Prev] Init server session, party 0, ip 172.28.1.10, port 12120, name sess_0_2.
I20220922 07:42:46.005451    40 runtime.h:44] Init Runtime : 0, 0x7f54bc050540
I20220922 07:42:46.037920    40 logistic.cc:391] Init party communication finish.
I20220922 07:42:46.113417    40 logistic.cc:552] Train dataset has 696 examples, dimension of each is 10.
I20220922 07:42:46.113448    40 logistic.cc:555] Test dataset has 120 examples, dimension of each is 10.
I20220922 07:42:46.114208    40 logistic.cc:64] (Learning rate):0.015625.
I20220922 07:42:46.114240    40 logistic.cc:65] (Epoch):100.
I20220922 07:42:46.114244    40 logistic.cc:66] (Batchsize) :128.
I20220922 07:42:46.114248    40 logistic.cc:67] (Train_loader size):5.
I20220922 07:42:46.114251    40 logistic.cc:70] Epochs : ( 0/100 )
···
I20220922 07:43:22.827548    40 logistic.cc:70] Epochs : ( 99/100 )
I20220922 07:43:23.188999    40 logistic.cc:581] Party 0 train finish.
I20220922 07:43:23.193424    40 logistic.cc:613] Save model to data/100_200_party_0_lr.csv.
I20220922 07:43:23.195238    55 aby3_scheduler.cc:74] Node push task rpc succeeded.
I20220922 07:43:23.195415    54 aby3_scheduler.cc:74] Node push task rpc succeeded.
I20220922 07:43:23.196365    56 aby3_scheduler.cc:74] Node push task rpc succeeded.


node1 and node2 logs are similar to node0 and are omitted.
```

上面的例子中，算法支持的参数名称在params中定义，`input_datasets`需要定义params中`TrainData` `TestData`是使用的数据集, 这两个参数中各有3个数据集参与本次计算任务。In the above example, the parameter names of the algorithm are defined in params,

## Parameter Description

| parameter| data type | example | parameter description
| ---- | ---- | ---- | ---- |
| params.BatchSize | INT32 | 128 | data size |
| params.NumIters | INT32 | 100 | iterations
 |
| params.TrainData | STRING | train_party_0;train_party_1;train_party_2 | training dataset |
| params.TestData | STRING | test_party_0;test_party_1;test_party_2 | testing dataset |

