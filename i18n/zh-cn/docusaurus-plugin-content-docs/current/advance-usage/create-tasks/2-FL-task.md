---
sidebar_position: 2
---


# 联邦学习（FL）任务

*** 提交联邦学习任务的参数说明 ***

创建联邦学习任务需要使用以下参数组合 `--task_lang=python --task_type=0`, 并通过`task_code`参数指定要运行的联邦学习python代码。


举例：启动一个联邦学习xgboost任务：

如果是通过docker-compose启动，执行 `docker exec -it node0_primihub bash` 进入到node0_primihub 容器，执行以下命令：

```bash
./primihub-cli --task_lang=python --task_type=0 --task_code="./python/primihub/examples/disxgb_en.py" --params="predictFileName:STRING:0:/data/result/prediction.csv,indicatorFileName:STRING:0:/data/result/indicator.json,hostLookupTable:STRING:0:/data/result/hostlookuptable.csv,guestLookupTable:STRING:0:/data/result/guestlookuptable.csv,modelFileName:STRING:0:/data/result/host/model"
```

如果是在本地编译启动，在编译完成后的代码根目录下执行以下命令：

```bash
./bazel-bin/cli --server="你的IP:50050" --task_lang=python --task_type=0 --task_code="./python/primihub/examples/disxgb_en.py" --params="predictFileName:STRING:0:/data/result/prediction.csv,indicatorFileName:STRING:0:/data/result/indicator.json,hostLookupTable:STRING:0:/data/result/hostlookuptable.csv,guestLookupTable:STRING:0:/data/result/guestlookuptable.csv,modelFileName:STRING:0:/data/result/host/model"
```

:::tip
如果遇到报错 "No module named 'primihub'", 在代码根目录下执行以下命令安装 primihub 平台库
:::

```bash
cd python
pip3 install -r requirements.txt 
python3 setup.py install
```

## 参数说明

| 参数| 数据类型 | 参数示例 | 参数说明
| ---- | ---- | ---- | ---- |
| params.predictFileName | STRING | /data/result/prediction.csv | 预测结果文件，仅出现在Host方 |
| params.indicatorFileName | STRING | /data/result/indicator.json | 模型评估指标结果文件，仅出现在Host方 |
| params.hostLookupTable | STRING | /data/result/hostlookuptable.csv | Host方特征分割点结果文件|
| params.guestLookupTable | STRING | /data/result/guestlookuptable.csv | Guest方特征分割点结果文件 |
| params.modelFileName  | STRING | /data/result/host/model  | 树结构保存路径，仅出现在Host方 |

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
