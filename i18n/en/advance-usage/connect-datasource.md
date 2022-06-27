---
sidebar_position: 2
---
# Connect Datasource

*** Connect custom datasets ***

In the startup parameters of primihub-node,the *yaml* configuration file specified by the parameter `--config` can specify the dataset to be accessed. *datasets* need to be defined.

```yaml
datasets:
  - description: "train_party_2"
    model: "csv"
    source: "/tmp/train_party_2.csv" 
  - description: "test_party_2"
    model: "csv"
    source: "/tmp/test_party_2.csv"
```
## dataset field definition

* description: Unique human-readable name for the dataset
* model: data source type, in this case 'csv'
* source: the absolute path of the data source on the Node running machine
