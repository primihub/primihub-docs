---
sidebar_position: 3
---


# 隐私求交（PSI）任务

创建隐私求交（PSI）任务需要使用以下参数组合 `--task_type==PSI_TASK`, 并通过`params`参数指定要求交的客户端数据集和服务端数据集, `input_datasets`参数指定`params`参数中的哪些是数据集。

```bash
primihub-cli --task_type==PSI_TASK  
--params=="ClientData:STRING:0:client_dataset;ServerData:STRING:0:server_dataset" --input_datasets="ClientData,ServerData"
```

:::caution TODO

  PSI任务支持的其他参数

:::
