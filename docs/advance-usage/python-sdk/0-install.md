---
sidebar_position: 0
---

# 安装

***如何安装***

## 下载

```bash
git clone https://github.com/primihub/primihub.git
```

:::tip
建议新建虚拟环境，在虚拟环境中进行以下操作。
:::

## [编译](/docs/advance-usage/start/build)

参考[编译说明](/docs/advance-usage/start/build)
:::tip
导入primihub package 需要引用primihub c++底层的SDK，所以这里需要先进行编译。
:::

## 安装

:::tip
要想正确的安装primihub python sdk，注意要使用和编译primihub同样的Python解释器。
:::

```bash
cd primihub/python
pip3 install -r requirements.txt
python3 setup.py install --user
```
