---
sidebar_position: 3
description: 创建神经网络任务
keywords: [FL, Neural Network]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Neural Network

<table>
    <tr>
        <th>联邦学习分类</th>
        <th>训练模式</th>
        <th>隐私计算技术</th>
    </tr>
    <tr>
        <td rowspan="3">横向联邦</td>
        <td>明文</td>
        <td></td>
    </tr>
    <tr>
        <td>DPSGD</td>
        <td>差分隐私</td>
    </tr>
</table>

如果是通过docker方式部署，先执行 `docker exec -it primihub-node0 bash` 进入到 `primihub-node0` 容器中，再执行CLI命令启动。

## 横向联邦

### 明文模式训练

<Tabs>
<TabItem value="CLI">

- 二分类

    ```bash
    ./primihub-cli --task_config_file="example/FL/neural_network/hfl_binclass_plaintext.json"
    ```

- 多分类

    ```bash
    ./primihub-cli --task_config_file="example/FL/neural_network/hfl_multiclass_plaintext.json"
    ```

- 回归

    ```bash
    ./primihub-cli --task_config_file="example/FL/neural_network/hfl_regression_plaintext.json"
    ```

</TabItem>

<TabItem value="Python SDK">

- 二分类

    ```bash
    submit example/FL/neural_network/hfl_binclass_plaintext.json
    ```

- 多分类

    ```bash
    submit example/FL/neural_network/hfl_multiclass_plaintext.json
    ```

- 回归

    ```bash
    submit example/FL/neural_network/hfl_regression_plaintext.json
    ```

</TabItem>
</Tabs>

### DPSGD模式训练

<Tabs>
<TabItem value="CLI">

- 二分类

    ```bash
    ./primihub-cli --task_config_file="example/FL/neural_network/hfl_binclass_dpsgd.json"
    ```

- 多分类

    ```bash
    ./primihub-cli --task_config_file="example/FL/neural_network/hfl_multiclass_dpsgd.json"
    ```

- 回归

    ```bash
    ./primihub-cli --task_config_file="example/FL/neural_network/hfl_regression_dpsgd.json"
    ```

</TabItem>

<TabItem value="Python SDK">

- 二分类

    ```bash
    submit example/FL/neural_network/hfl_binclass_dpsgd.json
    ```

- 多分类

    ```bash
    submit example/FL/neural_network/hfl_multiclass_dpsgd.json
    ```

- 回归

    ```bash
    submit example/FL/neural_network/hfl_regression_dpsgd.json
    ```

</TabItem>
</Tabs>

### 预测

<Tabs>
<TabItem value="CLI">

- 二分类

    ```bash
    ./primihub-cli --task_config_file="example/FL/neural_network/hfl_binclass_predict.json"
    ```

- 多分类

    ```bash
    ./primihub-cli --task_config_file="example/FL/neural_network/hfl_multiclass_predict.json"
    ```

- 回归

    ```bash
    ./primihub-cli --task_config_file="example/FL/neural_network/hfl_regression_predict.json"
    ```

</TabItem>

<TabItem value="Python SDK">

- 二分类

    ```bash
    submit example/FL/neural_network/hfl_binclass_predict.json
    ```

- 多分类

    ```bash
    submit example/FL/neural_network/hfl_multiclass_predict.json
    ```

- 回归

    ```bash
    submit example/FL/neural_network/hfl_regression_predict.json
    ```

</TabItem>
</Tabs>
