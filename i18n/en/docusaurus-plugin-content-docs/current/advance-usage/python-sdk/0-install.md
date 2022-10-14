---
sidebar_position: 0
---

# Install

***How to install***

## 下载

```
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
要想正确的安装primihub python sdk，注意要使用和编译primihub同样的Python解释器。
:::

1. 执行 `pip install --no-cache-dir  --force-reinstall -Iv grpcio grpcio_tools`

2. 安装 primihub， 执行 `python setup.py install --user`
