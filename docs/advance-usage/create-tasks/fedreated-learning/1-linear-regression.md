---
sidebar_position: 1
description: 创建线性回归任务
keywords: [FL, Linear Regression]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Linear Regression

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
    <tr>
        <td>Paillier</td>
        <td>同态加密</td>
    </tr>
    <tr>
        <td rowspan="2">纵向联邦</td>
        <td>明文</td>
        <td></td>
    </tr>
    <tr>
        <td>CKKS</td>
        <td>同态加密</td>
    </tr>
</table>

如果是通过docker方式部署，先执行 `docker exec -it primihub-node0 bash` 进入到 `primihub-node0` 容器中，再执行CLI命令启动。

## 横向联邦

### 明文模式训练

<Tabs>
<TabItem value="CLI">

```bash
./primihub-cli --task_config_file="example/FL/linear_regression/hfl_plaintext.json"
```

</TabItem>

<TabItem value="Python SDK">

```bash
submit example/FL/linear_regression/hfl_plaintext.json
```

</TabItem>
</Tabs>

### DPSGD模式训练

<Tabs>
<TabItem value="CLI">

```bash
./primihub-cli --task_config_file="example/FL/linear_regression/hfl_dpsgd.json"
```

</TabItem>

<TabItem value="Python SDK">

```bash
submit example/FL/linear_regression/hfl_dpsgd.json
```

</TabItem>
</Tabs>

### Paillier同态模式训练

<Tabs>
<TabItem value="CLI">

```bash
./primihub-cli --task_config_file="example/FL/linear_regression/hfl_paillier.json"
```

</TabItem>

<TabItem value="Python SDK">

```bash
submit example/FL/linear_regression/hfl_paillier.json
```

</TabItem>
</Tabs>

### 预测

<Tabs>
<TabItem value="CLI">

```bash
./primihub-cli --task_config_file="example/FL/linear_regression/hfl_predict.json"
```

</TabItem>

<TabItem value="Python SDK">

```bash
submit example/FL/linear_regression/hfl_predict.json
```

</TabItem>
</Tabs>

## 纵向联邦

### 明文模式训练

<Tabs>
<TabItem value="CLI">

```bash
./primihub-cli --task_config_file="example/FL/linear_regression/vfl_plaintext.json"
```

</TabItem>

<TabItem value="Python SDK">

```bash
submit example/FL/linear_regression/vfl_plaintext.json
```

</TabItem>
</Tabs>

### CKKS同态模式训练

<Tabs>
<TabItem value="CLI">

```bash
./primihub-cli --task_config_file="example/FL/linear_regression/vfl_ckks.json"
```

</TabItem>

<TabItem value="Python SDK">

```bash
submit example/FL/linear_regression/vfl_ckks.json
```

</TabItem>
</Tabs>

### 预测

<Tabs>
<TabItem value="CLI">

```bash
./primihub-cli --task_config_file="example/FL/linear_regression/vfl_predict.json"
```

</TabItem>

<TabItem value="Python SDK">

```bash
submit example/FL/linear_regression/vfl_predict.json
```

</TabItem>
</Tabs>
