---
sidebar_position: 2
description: 创建逻辑回归任务
keywords: [FL, Logistic Regression]
---
# Logistic Regression

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

- CLI命令启动

  - 二分类

    ```bash
    ./primihub-cli --task_config_file="example/FL/logistic_regression/hfl_binclass_plaintext.json"
    ```

  - 多分类

    ```bash
    ./primihub-cli --task_config_file="example/FL/logistic_regression/hfl_multiclass_plaintext.json"
    ```

- Python SDK启动

  - 二分类

    ```bash
    submit example/FL/logistic_regression/hfl_binclass_plaintext.json
    ```

  - 多分类

    ```bash
    submit example/FL/logistic_regression/hfl_multiclass_plaintext.json
    ```

### DPSGD模式训练

- CLI命令启动

  - 二分类

    ```bash
    ./primihub-cli --task_config_file="example/FL/logistic_regression/hfl_binclass_dpsgd.json"
    ```

  - 多分类

    ```bash
    ./primihub-cli --task_config_file="example/FL/logistic_regression/hfl_multiclass_dpsgd.json"
    ```

- Python SDK启动

  - 二分类

    ```bash
    submit example/FL/logistic_regression/hfl_binclass_dpsgd.json
    ```

  - 多分类

    ```bash
    submit example/FL/logistic_regression/hfl_multiclass_dpsgd.json
    ```

### Paillier同态模式训练

- CLI命令启动

  - 二分类

    ```bash
    ./primihub-cli --task_config_file="example/FL/logistic_regression/hfl_binclass_paillier.json"
    ```

- Python SDK启动

  - 二分类

    ```bash
    submit example/FL/logistic_regression/hfl_binclass_paillier.json
    ```

### 预测

- CLI命令启动

  - 二分类

    ```bash
    ./primihub-cli --task_config_file="example/FL/logistic_regression/hfl_binclass_predict.json"
    ```

  - 多分类

    ```bash
    ./primihub-cli --task_config_file="example/FL/logistic_regression/hfl_multiclass_predict.json"
    ```

- Python SDK启动

  - 二分类

    ```bash
    submit example/FL/logistic_regression/hfl_binclass_predict.json
    ```

  - 多分类

    ```bash
    submit example/FL/logistic_regression/hfl_multiclass_predict.json
    ```

## 纵向联邦

### 明文模式训练

- CLI命令启动

  - 二分类

    ```bash
    ./primihub-cli --task_config_file="example/FL/logistic_regression/vfl_binclass_plaintext.json"
    ```

  - 多分类

    ```bash
    ./primihub-cli --task_config_file="example/FL/logistic_regression/vfl_multiclass_plaintext.json"
    ```

- Python SDK启动

  - 二分类

    ```bash
    submit example/FL/logistic_regression/vfl_binclass_plaintext.json
    ```

  - 多分类

    ```bash
    submit example/FL/logistic_regression/vfl_multiclass_plaintext.json
    ```

### CKKS同态模式训练

- CLI命令启动

  - 二分类

    ```bash
    ./primihub-cli --task_config_file="example/FL/logistic_regression/vfl_binclass_ckks.json"
    ```

  - 多分类

    ```bash
    ./primihub-cli --task_config_file="example/FL/logistic_regression/vfl_multiclass_ckks.json"
    ```

- Python SDK启动

  - 二分类

    ```bash
    submit example/FL/logistic_regression/vfl_binclass_ckks.json
    ```

  - 多分类

    ```bash
    submit example/FL/logistic_regression/vfl_multiclass_ckks.json
    ```

### 预测

- CLI命令启动

  - 二分类

    ```bash
    ./primihub-cli --task_config_file="example/FL/logistic_regression/vfl_binclass_predict.json"
    ```

  - 多分类

    ```bash
    ./primihub-cli --task_config_file="example/FL/logistic_regression/vfl_multiclass_predict.json"
    ```

- Python SDK启动

  - 二分类

    ```bash
    submit example/FL/logistic_regression/vfl_binclass_predict.json
    ```

  - 多分类

    ```bash
    submit example/FL/logistic_regression/vfl_multiclass_predict.json
    ```
