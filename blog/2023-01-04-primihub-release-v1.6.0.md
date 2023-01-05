---
slug: primihub-release-v1.6.0
title: 2023年首个版本，PrimiHub v1.6.0 发布
authors: fuxingbit
tags: [release]
---

开源隐私计算平台 PrimiHub [v1.6.0](https://github.com/primihub/primihub/releases/tag/1.6.0) 发布了！

<!--truncate-->

## 更新功能

- 支持GRPC作为PSI和PIR任务中的通信
- 基于Ray-cluster并行加速处理数据加解密和密文求和，提高模型训练效率数十倍
- FL-V-XBG性能优化，对密文压缩处理，减少整体运行时间1/3
- Python任务执行失败时抛出异常供前端获取任务状态
- PIR流程优化：查询条件校验、输入提示、举例新增
- 支持PSI任务整数类型
- 样本对齐逻辑调整，衍生数据保留对齐ID列
- PSI多任务并行
- 标签列判断逻辑调整，功能对齐，逻辑使用上传资源的标签列
- 画布细节优化：连接线、组件编辑细化
- 多方PSI、PIR异地部署通信问题解决
- 异常、缺失值前端集成，新增基于平均值的策略处理
- 新增FL-V-XGB模型推理功能
- 修复FL-V-XGB、FL-H-LR任务不显示全量日志


## 相关仓库

* [PrimiHub](https://github.com/primihub/primihub)
* [PrimiHub Platform](https://github.com/primihub/primihub-platform)
* [HEhub](https://github.com/primihub/hehub/)
