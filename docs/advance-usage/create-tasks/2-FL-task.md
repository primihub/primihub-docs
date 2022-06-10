---
sidebar_position: 2
---


# 联邦学习任务

*** 提交联邦学习任务的参数说明 ***

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
