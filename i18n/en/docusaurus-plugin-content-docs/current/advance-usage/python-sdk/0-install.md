---
sidebar_position: 0
---

# Install

***How to install***

## Download

```
git clone https://github.com/primihub/primihub.git
cd primihub/python
```

:::tip
It is recommended to create a new virtual environment, in which the following actions are performed
:::

## [Compile](https://docs.primihub.com/en/docs/advance-usage/build)

Refer to[Compile Description](https://docs.primihub.com/en/docs/advance-usage/build)
:::tip
Importing the primihub package requires a reference to the primihub c++ low-level SDK, so we need to compile it first.
:::

## Install

:::tip
To properly install the primihub python sdk, be sure to use the same Python interpreter used to compile primihub.
:::

1. Run `pip install --no-cache-dir  --force-reinstall -Iv grpcio grpcio_tools`

2. Install primihub， and run `python setup.py install --user`
