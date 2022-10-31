---
sidebar_position: 2
---
# 接入你的数据

*** 接入自定义数据集 ***

在primihub-node启动参数参数config指定的yaml配置文件可以指定接入的数据集。需要定义datasets。

```yaml
datasets:
  - description: "train_party_2"
    model: "csv"
    source: "/tmp/train_party_2.csv" 
  - description: "test_party_2"
    model: "csv"
    source: "/tmp/test_party_2.csv"
```
## dataset的字段定义

* description：数据集的唯一可读性名称
* model: 数据源类型，例子中是'csv'
* source: 数据源在Node运行机器上的绝对路径
