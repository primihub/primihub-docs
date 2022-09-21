---
sidebar_position: 1
---


# 多方安全计算（MPC）任务

*** 提交MPC任务的参数说明 ***

创建MPC任务需要使用以下参数组合`--task_lang=proto --task_type=0`, 并通过`task_code`参数指定要运行MPC算法。
`params`参数指定了算法执行输入的参数, `input_datasets`参数指定了`params`参数中哪些参数是输入的数据集。

举例：启动一个MPC的逻辑回归任务：

如果是通过docker-compose启动，执行 `docker exec -it node0_primihub bash` 进入到node0_primihub 容器，执行以下命令：

```bash
./primihub-cli --task_lang=proto --task_type=0 --task_code="logistic_regression" --params="BatchSize:INT32:0:128,NumIters:INT32:0:100,TrainData:STRING:0:train_party_0;train_party_1;train_party_2,TestData:STRING:0:test_party_0;test_party_1;test_party_2"
```

如果是在本地编译启动，在编译完成后的代码根目录下执行以下命令：

```bash
./bazel-bin/cli --server="你的IP:50050" --task_lang=proto --task_type=0 --task_code="logistic_regression" --params="BatchSize:INT32:0:128,NumIters:INT32:0:100,TrainData:STRING:0:train_party_0;train_party_1;train_party_2,TestData:STRING:0:test_party_0;test_party_1;test_party_2"
```

上面的例子中，算法支持的参数名称在params中定义，`input_datasets`需要定义params中`TrainData` `TestData`是使用的数据集, 这两个参数中各有3个数据集参与本次计算任务。

## 参数说明

| 参数| 数据类型 | 参数示例 | 参数说明
| ---- | ---- | ---- | ---- |
| params.BatchSize | INT32 | 128 | 数据大小 |
| params.NumIters | INT32 | 100 | 迭代次数 |
| params.TrainData | STRING | train_party_0;train_party_1;train_party_2 | 训练数据集 |
| params.TestData | STRING | test_party_0;test_party_1;test_party_2 | 测试数据集 |

