---
sidebar_position: 0

---

# 使用

***如何使用Python SDK***

## 简介

[![v2F11I.png](https://s1.ax1x.com/2022/08/25/v2F11I.png)](https://imgse.com/i/v2F11I)

## 前提

- 安装了primihub python sdk
- 使用docker-compose启动节点应用，见[快速开始](https://docs.primihub.com/docs/quick-start)

## Python Client 初始化

1. 新建Python文件

2. 在文件开头引入primihub cli

   ```python
   import primihub as ph
   from primihub.client import primihub_cli as cli
   from primihub import context, dataset
   ```

3. client 初始化,输入正确的node信息，和证书地址（TODO）

   ```python
   cli.init(config={"node": "node_address:node_port", "cert": ""})
   ```

## 上传下载数据集

```python
d = {'col1': [2, 3], 'col2': [3, 4], 'col3': [4, 5]}
df = pd.DataFrame(d)

# 上传
data_ref = ph.dataset.put(df, "test_dataset_key")
print(data_ref)

# 下载
df_data = ph.dataset.get(data_ref)
```


## 提交任务

1. 定义你的远程方法

   ```python
   # define a remote method
   @ph.context.function(role='host', protocol='xgboost', datasets=["label_dataset"], next_peer="*:12120")
   def func1(value):
       print("params: ", value)
       # do something
       return value + 1
   
   ```

   ```python
   # define a remote method
   @ph.context.function(role='guest', protocol='xgboost', datasets=["guest_dataset"], next_peer="localhost:12120")
   def func2(value):
       print("params: ", value)
       # do something
       return value + 1
   ```

2. 执行函数调用

   ```python
    value1 = 1
    value2 = 2
    cli.async_remote_execute((func1, value1), (func2, value2))
    cli.start()
   ```



4. ***联邦学习示例：***

   ```python
   # python sdk client demo
   
   import primihub as ph
   from primihub.client import primihub_cli as cli
   from primihub.channel.zmq_channel import IOService, Session
   import pandas as pd
   import numpy as np
   from primihub import dataset, context
   from primihub.FL.model.evaluation.evaluation import Regression_eva
   
   # client init
   
   connect_str = "node server address"
   cli.init(config={"node": connect_str, "cert": ""})
   
   num_tree = 1
   
   # Max depth of each tree
   
   max_depth = 1
   
   # define a remote method
   
   @ph.context.function(role='host', protocol='xgboost', datasets=["label_dataset"], next_peer="*:12121")
   def xgb_host_logic():
       print("start xgb host logic...")
       next_peer = ph.context.Context.nodes_context["host"].next_peer
       print(ph.context.Context.datasets)
       print(ph.context.Context.dataset_map)
       ip, port = next_peer.split(":")
       ios = IOService()
       server = Session(ios, ip, port, "server")
   
       channel = server.addChannel()
       data = ph.dataset.read(dataset_key="label_dataset").df_data
       label_true = ['Class']
   
       labels = ['Class']  # noqa
       X_host = data[
           [x for x in data.columns if x not in labels]
       ]
       Y = data['Class'].values
       from primihub.FL.model.xgboost.xgb_host import XGB_HOST
       xgb_host = XGB_HOST(n_estimators=num_tree, max_depth=max_depth, reg_lambda=1,
                           min_child_weight=1, objective='linear', channel=channel)
       channel.recv()
       y_hat = np.array([0.5] * Y.shape[0])
       for t in range(xgb_host.n_estimators):
           print("Begin to trian tree {}.".format(t))
   
           f_t = pd.Series([0] * Y.shape[0])
           gh = xgb_host.get_gh(y_hat, Y)
           xgb_host.channel.send(gh)
           GH_guest = xgb_host.channel.recv()
           xgb_host.tree_structure[t + 1], f_t = xgb_host.xgb_tree(X_host, GH_guest, gh, f_t, 0)  # noqa
           y_hat = y_hat + xgb_host.learning_rate * f_t
   
           print("Finish to trian tree {}.".format(t))
   
       predict_file_path = "predict.csv"
       indicator_file_path = "indicator.json"
       print("predict_file_path: %s" % predict_file_path)
       print("indicator_file_path: %s" % indicator_file_path)
   
   # define a remote method
   
   @ph.context.function(role='guest', protocol='xgboost', datasets=["guest_dataset"], next_peer="localhost:12121")
   def xgb_guest_logic():
       print("start xgb guest logic...")
       ios = IOService()
       next_peer = ph.context.Context.nodes_context["guest"].next_peer
       print(ph.context.Context.nodes_context["guest"])
       print(ph.context.Context.datasets)
       print(ph.context.Context.dataset_map)
       print("guest next peer: ", next_peer)
       ip, port = next_peer.split(":")
       client = Session(ios, ip, port, "client")
       channel = client.addChannel()
   
       X_guest = ph.dataset.read(dataset_key="guest_dataset").df_data
   
       from primihub.FL.model.xgboost.xgb_guest import XGB_GUEST
       xgb_guest = XGB_GUEST(n_estimators=num_tree, max_depth=max_depth, reg_lambda=1, min_child_weight=1, objective='linear',
                               channel=channel)  # noqa
       channel.send(b'guest ready')
       for t in range(xgb_guest.n_estimators):
           gh_host = xgb_guest.channel.recv()
           X_guest_gh = pd.concat([X_guest, gh_host], axis=1)
           print(X_guest_gh)
           gh_sum = xgb_guest.get_GH(X_guest_gh)
           xgb_guest.channel.send(gh_sum)
           xgb_guest.cart_tree(X_guest_gh, 0)
   
   # context
   
   cry_pri = "plaintext"
   cli.async_remote_execute((xgb_host_logic, cry_pri), (xgb_guest_logic, cry_pri))
   cli.start()
   ```