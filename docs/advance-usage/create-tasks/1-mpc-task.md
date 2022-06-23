---
sidebar_position: 1
---


# MPC任务

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
./bazel-bin/cli --task_lang=proto --task_type=0 --task_code="logistic_regression" --params="BatchSize:INT32:0:128,NumIters:INT32:0:100,TrainData:STRING:0:train_party_0;train_party_1;train_party_2,TestData:STRING:0:test_party_0;test_party_1;test_party_2"
```

上面的例子中，算法支持的参数名称在params中定义，`input_datasets`需要定义params中`TrainData` `TestData`是使用的数据集, 这两个参数中各有3个数据集参与本次计算任务。

支持的算法类型有

| task code | 参数 |
| ---- | ---- |
| logistic_regression | BatchSize: 数据大小 NumIters：迭代次数 TrainData: 训练数据集TestData: 测试数据集 |

