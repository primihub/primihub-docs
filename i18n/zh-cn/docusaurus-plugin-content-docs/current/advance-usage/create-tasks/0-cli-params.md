---
sidebar_position: 0
description: primihub-cli 参数说明
keywords: [primihub-cli]
---

# 公共参数

## 参数说明
*** 提交任务的公共参数说明 ***

`primihub-cli` 的公共参数：

```bash
--input_datasets (input datasets name list); default: TrainData,TestData;
--job_id (job id); default: "100";
--params (task params, format is <name, type, is array, value>);
  default: BatchSize:INT32:0:128,NumIters:INT32:0:100,TrainData:STRING:0:train_party_0;train_party_1;train_party_2,TestData:STRING:0:test_party_0;test_party_1;test_party_2;
--server (server address); default: "127.0.0.1:50050";
--task_code (task code); default: "logistic_regression";
--task_id (task id); default: "200";
--task_lang (task language, proto or python); default: "proto";
--task_type (task type, 0-ACTOR_TASK, 1-NODE_TASK, 2-PIR_TASK, 3-PSI_TASK, 4-NODE_PIR_TASK, 5-NODE_PSI_TASK); default: 0;
```

## 任务类型
上面提到的参数 `--task_type` 的可用值包括如下：

| 任务代码 | 说明 |
|---|---|
| `0` | 调度任务，需要配合 `--task_lang` 使用 |
| `2` | 匿踪查询（PIR）任务 |
| `3` | 隐私求交（PSI）任务 |
| `6` | 可信执行环境（TEE）任务 |

相关源码文件，请参考[这里](https://github.com/primihub/primihub/blob/790e3da51f41a8b3c5e1dc5267e75f8a7bb53e6b/src/primihub/protos/common.proto#L21)。

参数 `--task_lang` 的可用值包括：`python` 和 `proto`。
