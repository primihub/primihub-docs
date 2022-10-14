---
sidebar_position: 2
---


# FL Task

*** FL Task Parameters Description ***

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

分别观察`node0`、`node1`和`node2`的日志，有如下输出则代表任务运行成功，可参考参数说明中的路径验证生成的结果文件是否正确
```
node0:
...
I20220922 03:50:42.045462    25 parser.cc:122]  🔍 Python task found meta list from datasets: 2
I20220922 03:50:42.045540    25 parser.cc:351] Dump content of all node in FL task before schedule:
I20220922 03:50:42.045554    25 parser.cc:357] Node content: node_id node2, role guest, ip 172.28.1.12, port 50050, data port 9000.
I20220922 03:50:42.045560    25 parser.cc:357] Node content: node_id node1, role host, ip 172.28.1.11, port 50050, data port 8000.
I20220922 03:50:42.045563    25 parser.cc:362] Dump finish, dump count 2.
I20220922 03:50:42.045660    25 fl_scheduler.cc:154] nodePushTaskRequest task_id: 200
I20220922 03:50:42.045668    25 fl_scheduler.cc:155] nodePushTaskRequest submit_client_id: 
I20220922 03:50:42.045691    25 model.cc:68] get task status event: 200 RUNNING , clientId:
W20220922 03:50:42.045697    25 model.cc:84] session not found for task status event: 200
I20220922 03:50:42.046998    25 fl_scheduler.cc:169] dest_node_address: 172.28.1.12:50050
I20220922 03:50:42.047430    25 fl_scheduler.cc:169] dest_node_address: 172.28.1.11:50050
I20220922 03:54:01.564533    58 fl_scheduler.cc:109] Node push task rpc succeeded.
I20220922 03:54:01.573029    59 fl_scheduler.cc:109] Node push task rpc succeeded.


node1:
...
I20220922 03:50:42.130049    26 fl_task.cc:191] <<<<<<<<< 🐍 Start executing Python code <<<<<<<<<
2022-09-22 03:50:42.323 | INFO     | primihub.executor:execute_py:65 - execute py code.
2022-09-22 03:50:43.298 | DEBUG    | primihub.executor:execute_py:67 - func name: 
2022-09-22 03:50:43.298 | DEBUG    | primihub.executor:execute_py:70 - func params: 
2022-09-22 03:50:43.299 | DEBUG    | primihub.executor:execute_py:73 - start execute
taskType is not specified, set to default value 'regression'.
2022-09-22 03:54:01.544 | INFO     | primihub.context:get_predict_file_path:118 - predict: /data/result/prediction.csv
2022-09-22 03:54:01.544 | INFO     | primihub.context:get_indicator_file_path:128 - indicator: /data/result/indicator.json
2022-09-22 03:54:01.544 | INFO     | primihub.context:get_model_file_path:138 - model: /data/result/host/model
2022-09-22 03:54:01.544 | INFO     | primihub.context:get_host_lookup_file_path:148 - host lookup table: /data/result/hostlookuptable.csv
2022-09-22 03:54:01.572 | DEBUG    | primihub.executor:execute_py:75 - end execute
I20220922 03:54:01.572441    26 fl_task.cc:195] <<<<<<<<< 🐍 Execute Python Code End <<<<<<<<<
I20220922 03:54:01.572511    26 model.cc:68] get task status event: 200 SUCCESS , clientId:
W20220922 03:54:01.572522    26 model.cc:84] session not found for task status event: 200


node2:
...
I20220922 03:50:42.129631    26 fl_task.cc:191] <<<<<<<<< 🐍 Start executing Python code <<<<<<<<<
2022-09-22 03:50:42.327 | INFO     | primihub.executor:execute_py:65 - execute py code.
2022-09-22 03:50:42.820 | DEBUG    | primihub.executor:execute_py:67 - func name: 
2022-09-22 03:50:42.821 | DEBUG    | primihub.executor:execute_py:70 - func params: 
2022-09-22 03:50:42.821 | DEBUG    | primihub.executor:execute_py:73 - start execute
taskType is not specified, set to default value 'regression'.
2022-09-22 03:53:57.811 | INFO     | primihub.context:get_guest_lookup_file_path:158 - guest lookup table: /data/result/guestlookuptable.csv
2022-09-22 03:54:01.563 | DEBUG    | primihub.executor:execute_py:75 - end execute
I20220922 03:54:01.563899    26 fl_task.cc:195] <<<<<<<<< 🐍 Execute Python Code End <<<<<<<<<
I20220922 03:54:01.563971    26 model.cc:68] get task status event: 200 SUCCESS , clientId:
W20220922 03:54:01.563983    26 model.cc:84] session not found for task status event: 200
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
