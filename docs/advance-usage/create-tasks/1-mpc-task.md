---
sidebar_position: 1
---


# 多方安全计算（MPC）任务

*** 提交MPC任务的参数说明 ***

创建MPC任务需要使用以下参数组合`--task_lang=proto --task_type=0`, 并通过`task_code`参数指定要运行MPC算法。
`params`参数指定了算法执行输入的参数, `input_datasets`参数指定了`params`参数中哪些参数是输入的数据集。

举例：启动一个MPC的逻辑回归任务：

如果是通过docker-compose启动，执行 `docker exec -it primihub-node0 bash` 进入到 `primihub-node0` 容器，执行以下命令：

```bash
./primihub-cli --task_lang=proto --task_type=0 --task_code="logistic_regression" --params="BatchSize:INT32:0:128,NumIters:INT32:0:100,Data_File:STRING:0:train_party_0;train_party_1;train_party_2,modelName:STRING:0:/data/result/lr_mode.csv" --input_datasets="Data_File"
```

如果是在本地编译启动，在编译完成后的代码根目录下执行以下命令：

```bash
./bazel-bin/cli --server="你的IP:50050" --task_lang=proto --task_type=0 --task_code="logistic_regression" --params="BatchSize:INT32:0:128,NumIters:INT32:0:100,Data_File:STRING:0:train_party_0;train_party_1;train_party_2,modelName:STRING:0:/data/result/lr_mode.csv" --input_datasets="Data_File"
```
分别观察`node0`、`node1`和`node2`的日志，有如下输出则代表任务运行成功，可参考参数说明中的结果文件路径验证生成的结果文件是否正确

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
I20220922 07:43:23.193424    40 logistic.cc:613] Save model to /data/result/lr_mode_0.csv.
I20220922 07:43:23.195238    55 aby3_scheduler.cc:74] Node push task rpc succeeded.
I20220922 07:43:23.195415    54 aby3_scheduler.cc:74] Node push task rpc succeeded.
I20220922 07:43:23.196365    56 aby3_scheduler.cc:74] Node push task rpc succeeded.


node1 和 node2 日志和 node0 类似，省略。
```

上面的例子中，算法支持的参数名称在params中定义，`input_datasets`对应的值为"Data_File"，算法会将三方的数据集中80%样本作为训练集、20%样本作为测试集。

## 参数说明

| 参数| 数据类型 | 参数示例 | 参数说明
| ---- | ---- | ---- | ---- |
| params.BatchSize | INT32 | 128 | 数据大小 |
| params.NumIters | INT32 | 100 | 迭代次数 |
| params.Data_File | STRING | train_party_0;train_party_1;train_party_2 | 训练数据集 |
| params.modelName | STRING | /data/result/lr_mode.csv | 生成模型的存储路径（包含模型文件名）| 
