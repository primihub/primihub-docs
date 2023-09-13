---
sidebar_position: 0
---
# 公共参数

***提交任务的公共参数说明***

primihub-cli 的公共参数：

```bash
--server (server address); default: "127.0.0.1:50050";
--task_config_file (input task config file); example: "example/mpc_lr_task_conf.json"; Required;
```

目前任务的配置信息都通过 `--task_config_file` 参数指定的 `json` 文件设置，默认提供的所有任务的示例配置在 [PrimiHub](https://github.com/primihub/primihub) 仓库 `example` 目录下。
