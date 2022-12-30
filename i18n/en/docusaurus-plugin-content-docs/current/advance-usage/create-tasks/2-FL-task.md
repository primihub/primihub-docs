---
sidebar_position: 2
---


# FL Task

*** FL Task Parameters Description ***

Creating a FL task requires the following parameters:`--task_lang=python --task_type=0`,and  specify the FL python code to run via the `task_code` parameter.


Example: launching a FL xgboosttask：

If starting with docker-compose, enter the primihub-node0 container by running `docker exec -it primihub-node0 bash` ，and run the following command：

```bash
./primihub-cli --task_lang=python --task_type=0 --task_code="./python/primihub/examples/disxgb_en.py" --params="predictFileName:STRING:0:/data/result/prediction.csv,indicatorFileName:STRING:0:/data/result/indicator.json,hostLookupTable:STRING:0:/data/result/hostlookuptable.csv,guestLookupTable:STRING:0:/data/result/guestlookuptable.csv,modelFileName:STRING:0:/data/result/host/model"
```

If starting locally, run the following command from the compiled root directory:

```bash
./bazel-bin/cli --server="你的IP:50050" --task_lang=python --task_type=0 --task_code="./python/primihub/examples/disxgb_en.py" --params="predictFileName:STRING:0:/data/result/prediction.csv,indicatorFileName:STRING:0:/data/result/indicator.json,hostLookupTable:STRING:0:/data/result/hostlookuptable.csv,guestLookupTable:STRING:0:/data/result/guestlookuptable.csv,modelFileName:STRING:0:/data/result/host/model"
```

:::tip
If you get the error "No module named 'primihub'", run the following command from the root directory to install the primihub platform library
:::

```bash
cd python
pip3 install -r requirements.txt 
python3 setup.py install
```

Observe the logs of `node0`、`node1`and`node2` respectively,and the following output means that the task runs successfully. Refer to the result file path in the parameter description to verify whether the generated result file is correct.
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
## Parameter Description

| parameter| data type | example | parameter description
| ---- | ---- | ---- | ---- |
| params.predictFileName | STRING | /data/result/prediction.csv | prediction result file, only appears at Host |
| params.indicatorFileName | STRING | /data/result/indicator.json | model evaluation metrics result file, appearing only at Host |
| params.hostLookupTable | STRING | /data/result/hostlookuptable.csv | Host feature split point result file|
| params.guestLookupTable | STRING | /data/result/guestlookuptable.csv | Guest feature split point result file |
| params.modelFileName  | STRING | /data/result/host/model  | The tree structure holds paths that occur only at Host |

In a python file, the algorithm developer can specify using the primihub python api:
* Dataset to use
* The security protocol used by the algorithm

The key apis are as follows:
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
