---
sidebar_position: 4
---
# Connect Datasource

*** Connect custom dataset ***

在primihub-node启动参数参数config指定的yaml配置文件可以指定接入的数据集。We need to define datasets.

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

* description：A unique readable name for the dataset
* model: Datasource type, in this case 'csv'
* source: The absolute path to the data source on the Node machine
