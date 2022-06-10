---
sidebar_position: 4
---


# 隐私查询（PIR）任务

创建隐私查询（PIR）任务需要使用以下参数组合 `--task_type==PIR_TASK`, 并通过`params`参数指定要查询index和服务端数据集, `input_datasets`参数指定`params`参数中的哪些是数据集。

```bash
primihub-cli --task_type==PSI_TASK  
--params=="QueryIndeies:STRING:0:0,1,2,3;ServerData:STRING:0:server_dataset" --input_datasets="ServerData"
```
:::caution TODO

  PIR任务支持的其他参数

:::