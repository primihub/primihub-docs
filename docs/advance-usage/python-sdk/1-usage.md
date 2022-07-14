---
sidebar_position: 0
---

# 使用

***如何使用Python SDK***

## 前提

- 在虚拟环境中正确安装了Primihub
- 使用docker-compose启动节点应用

## 在python文件中使用

1. 新建Python文件
2. 在文件开头引入primihub cli

    ```
    import primihub as ph
    from primihub.client.client import primihub_cli as cli
    from primihub import context, dataset
    ```

3. client 初始化,输入正确的node信息，和证书地址（TODO）

    ```
    cli.init(config={"node": "node_address:node_port", "cert": ""})
    ```

4. 定义你的远程方法

    ```
    # define a remote method
    @ph.context.function(role='host', protocol='xgboost', datasets=["label_dataset"], next_peer="*:12120")
    def func1(value):
        print("params: ", value)
        # do something
        return value + 1

    ```

    ```
    # define a remote method
    @ph.context.function(role='guest', protocol='xgboost', datasets=["guest_dataset"], next_peer="localhost:12120")
    def func2(value):
        print("params: ", value)
        # do something
        return value + 1
    ```

5. 执行函数调用

   ```
    value1 = 1
    value2 = 2
    cli.remote_execute((func1, value1), (func2, value2))
   ```

6. ***完整示例：***

    ```
    # python sdk client demo

    import primihub as ph
    from primihub.client.client import primihub_cli as cli
    from primihub import context, dataset

    # client init
    cli.init(config={"node": "127.0.0.1:8051", "cert": ""})

    # define a remote method
    @ph.context.function(role='host', protocol='xgboost', datasets=["label_dataset"], next_peer="*:12120")
    def func1(value):
        # do something
        print("params: ", value)
        return value + 1

    # define a remote method
    @ph.context.function(role='guest', protocol='xgboost', datasets=["guest_dataset"], next_peer="localhost:12120")
    def func2(value):
        # do something
        print("params: ", value)
        return value + 1

    # context
    value1 = 1
    value2 = 2
    cli.remote_execute((func1, value1), (func2, value2))

    ```

# 在python交互式解释器中使用

  TODO
