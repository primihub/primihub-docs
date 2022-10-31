---
sidebar_position: 4
---
# 创建任务

*** 创建不同类型的任务 ***

cli参数说明：

```
--input_datasets (input datasets name list); default: TrainData,TestData;
--job_id (job id); default: "100";
--params (task params, format is <name, type, is array, value>);
  default: BatchSize:INT32:0:128,NumIters:INT32:0:100,TrainData:STRING:0:train_party_0;train_party_1;train_party_2,TestData:STRING:0:test_party_0;test_party_1;test_party_2;
--server (server address); default: "127.0.0.1:50050";
--task_code (task code); default: "logistic_regression";
--task_id (task id); default: "200";
--task_lang (task language, proto or python); default: "proto";
--task_type (task type, 0-ACTOR_TASK, 1-PSI_TASK 2-PIR_TASK); default: 0;

```

## 创建MPC任务
创建MPC任务需要使用以下参数组合`--task_lang=proto --task_type==ACTOR_TASK`, 并通过`task_code`参数指定要运行MPC算法。
`params`参数指定了算法执行输入的参数, `input_datasets`参数指定了`params`参数中哪些参数是输入的数据集。

举例：启动一个MPC的逻辑回归任务：

```bash
primihub-cli --task_lang=cpp --task_type==ACTOR_TASK --task_code=="logistic_regression" --params="BatchSize:INT32:0:128,NumIters:INT32:0:100,TrainData:STRING:0:train_party_0;train_party_1;train_party_2,TestData:STRING:0:test_party_0;test_party_1;test_party_2"
```

上面的例子中，算法支持的参数名称在params中定义，`input_datasets`需要定义params中`TrainData` `TestData`是使用的数据集, 这两个参数中各有3个数据集参与本次计算任务。

支持的算法类型有

| task code | 参数 |
| ---- | ---- |
|logistic_regression| BatchSize: 数据大小 NumIters：迭代次数 TrainData: 训练数据集TestData: 测试数据集|




## 创建联邦学习(Fedrate learning)任务

创建联邦学习任务需要使用以下参数组合 `--task_lang=python --task_type==ACTOR_TASK`, 并通过`task_code`参数指定要运行的联邦学习python代码。


举例：启动一个联邦学习xgboost任务：

```bash
$ primihub-cli --task_lang=python --task_type==ACTOR_TASK --task_code=="./python/primihub/examples/disxgb.py"
```

在python文件中，算法开发者可以使用primihub python api指定：
* 使用的数据集
* 算法使用的安全协议

关键的api如下：
```python
import primihub as ph

ph.dataset.define("guest_dataset")
ph.dataset.define("label_dataset")

@ph.function(role='host', protocol='xgboost', datasets=["label_dataset"])
def xgb_host_logic():
  print("start xgb host logic...")
  ...

@ph.function(role='guest', protocol='xgboost', datasets=["guest_dataset"])
def xgb_guest_logic():
  print("start xgx guest logic...")
  ...
  
```


## 创建隐私求交（PSI）任务

创建隐私求交（PSI）任务需要使用以下参数组合 `--task_type==PSI_TASK`, 并通过`params`参数指定要求交的客户端数据集和服务端数据集, `input_datasets`参数指定`params`参数中的哪些是数据集。

```bash
primihub-cli --task_type==PSI_TASK  
--params=="ClientData:STRING:0:client_dataset;ServerData:STRING:0:server_dataset" --input_datasets="ClientData,ServerData"
```

:::caution TODO

  PSI任务支持的其他参数

:::

## 创建隐私查询（PIR）任务

创建隐私查询（PIR）任务需要使用以下参数组合 `--task_type==PIR_TASK`, 并通过`params`参数指定要查询index和服务端数据集, `input_datasets`参数指定`params`参数中的哪些是数据集。

```bash
primihub-cli --task_type==PSI_TASK  
--params=="QueryIndeies:STRING:0:0,1,2,3;ServerData:STRING:0:server_dataset" --input_datasets="ServerData"
```
:::caution TODO

  PIR任务支持的其他参数

:::