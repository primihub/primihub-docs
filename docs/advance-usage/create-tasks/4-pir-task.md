---
sidebar_position: 4
---


# 隐私查询（PIR）任务

*** 提交PIR任务的参数说明 ***

创建隐私查询（PIR）任务需要使用以下参数组合 `--task_type==PIR_TASK`, 并通过`params`参数指定要查询index和服务端数据集, `input_datasets`参数指定`params`参数中的哪些是数据集。

```bash
primihub-cli --task_type==2  
--params=="queryIndeies:STRING:0:11,serverData:STRING:0:pir_server_data,outputFullFilename:STRING:0:/data/result/pir5.csv" --input_datasets="serverData"
```

## 参数说明

| 参数| 数据类型 | 参数示例 | 参数说明
| ---- | ---- | ---- | ---- |
| params.queryIndeies | STRING | 11 | 表示检索pir数据库index值为11数据记录，index值不能超过数据库的记录数，否则出错。（当前版本pir支持固定为20条记录的pir数据库，支持一次请求包含多个index，index值之间用英文逗号分割，由于当前命令行请求中逗号用于分割参数，所以命令行启动任务只包含1个index值。）|
| params.serverData | STRING | pir_server_data | 该参数值为pir服务的服务端数据标识符，系统调度节点通过数据标识符找到注册对应数据的工作节点，pir客户端节点将向该节点发送匿踪查询请求。pir服务端加载该标识符对应文件生成pir数据库。（pir服务中调度节点默认作为pir服务的客户端节点。用例中数据注册到节点node1中，在config目中对应的配置文件是primihub_node1.yaml，添加数据的保存路径，设置该数据的description为"pir_server_data"，作为该数据标志符。标志符用户可以自主设置，请求任务中的参数值与配置文件中标志符保持一致））|
| params.outputFullFilename | STRING | /data/result/pir5.csv | 指定pir匿踪查询结果保存文件的文件名和文件所在目录的绝对路径。|
