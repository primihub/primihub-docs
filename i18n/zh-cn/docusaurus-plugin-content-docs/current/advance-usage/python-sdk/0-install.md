---
sidebar_position: 0
keywords: [PrimiHub Python SDK]
description: 介绍如何安装 PrimiHub Python SDK
---

# 安装

***如何安装***

## 下载

```shell
git clone https://github.com/primihub/primihub.git
cd primihub/python
```

:::tip
建议新建虚拟环境，在虚拟环境中进行以下操作。
:::

## [编译](https://docs.primihub.com/docs/developer-docs/build)

参考[编译说明](https://docs.primihub.com/docs/developer-docs/build)
:::tip
导入primihub package 需要引用primihub c++底层的SDK，所以这里需要先进行编译。
:::

## 安装

:::tip
要想正确的安装 PrimiHub Python SDK ，注意要使用和编译 `PrimiHub` 同样的 `Python` 解释器。
:::

1. 执行 `pip install --no-cache-dir  --force-reinstall -Iv grpcio grpcio_tools`
1. 安装 `PrimiHub`， 执行 `python setup.py install --user`
