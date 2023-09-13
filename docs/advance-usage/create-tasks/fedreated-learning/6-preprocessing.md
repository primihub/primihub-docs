---
sidebar_position: 6
description: 创建Preprocessing任务
keywords: [FL, Preprocessing]
---
# Preprocessing

<table>
    <tr>
        <th>分类</th>
        <th>名称</th>
        <th>说明</th>
    </tr>
    <tr>
        <td>Binning</td>
        <td><a href="https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.KBinsDiscretizer.html">KBinsDiscretizer</a></td>
        <td>特征分箱：等频、等宽、Kmeans</td>
    </tr>
    <tr>
        <td rowspan="5">Scaling</td>
        <td><a href="https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.MaxAbsScaler.html">MaxAbsScaler</a></td>
        <td>特征缩放：绝对值最大为1</td>
    </tr>
    <tr>
        <td><a href="https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.MinMaxScaler.html">MinMaxScaler</a></td>
        <td>特征缩放：数值范围 [-1, 1]</td>
    </tr>
    <tr>
        <td><a href="https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.StandardScaler.html">StandardScaler</a></td>
        <td>特征缩放：均值为0、方差为1</td>
    </tr>
    <tr>
        <td><a href="https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.RobustScaler.html">RobustScaler</a></td>
        <td>特征缩放：数值范围 [Q2, Q3]（分位数）</td>
    </tr>
    <tr>
        <td><a href="https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.Normalizer.html">Normalizer</a></td>
        <td>样本缩放：范数等于1</td>
    </tr>
    <tr>
        <td rowspan="5">Encoding</td>
        <td><a href="https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.LabelBinarizer.html">LabelBinarizer</a></td>
        <td>标签编码：one-hot</td>
    </tr>
    <tr>
        <td><a href="https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.LabelEncoder.html">LabelEncoder</a></td>
        <td>标签编码：序数</td>
    </tr>
    <tr>
        <td><a href="https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.MultiLabelBinarizer.html">MultiLabelBinarizer</a></td>
        <td>标签编码：multi-hot</td>
    </tr>
    <tr>
        <td><a href="https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.OneHotEncoder.html">OneHotEncoder</a></td>
        <td>特征编码：one-hot</td>
    </tr>
    <tr>
        <td><a href="https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.OrdinalEncoder.html">OrdinalEncoder</a></td>
        <td>特征编码：序数</td>
    </tr>
    <tr>
        <td rowspan="1">Transformation</td>
        <td><a href="https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.QuantileTransformer.html">QuantileTransformer</a></td>
        <td>特征变换：均匀分布、高斯分布</td>
    </tr>
    <tr>
        <td rowspan="1">Imputation</td>
        <td><a href="https://scikit-learn.org/stable/modules/generated/sklearn.impute.SimpleImputer.html">SimpleImputer</a></td>
        <td>缺失值填充：平均数、中位数、众数、常数</td>
    </tr>
</table>

如果是通过docker方式部署：先执行 `docker exec -it primihub-node0 bash` 进入到 `primihub-node0` 容器中：再执行CLI命令启动。

## 横向联邦

### KBinsDiscretizer

- CLI命令启动

```bash
./primihub-cli --task_config_file="example/FL/preprocessing/hfl_kbinsdiscretizer.json"
```

- Python SDK启动

```bash
submit example/FL/preprocessing/hfl_kbinsdiscretizer.json
```

### MaxAbsScaler

- CLI命令启动

```bash
./primihub-cli --task_config_file="example/FL/preprocessing/hfl_maxabsscaler.json"
```

- Python SDK启动

```bash
submit example/FL/preprocessing/hfl_maxabsscaler.json
```

### MinMaxScaler

- CLI命令启动

```bash
./primihub-cli --task_config_file="example/FL/preprocessing/hfl_minmaxscaler.json"
```

- Python SDK启动

```bash
submit example/FL/preprocessing/hfl_minmaxscaler.json
```

### StandardScaler

- CLI命令启动

```bash
./primihub-cli --task_config_file="example/FL/preprocessing/hfl_standardscaler.json"
```

- Python SDK启动

```bash
submit example/FL/preprocessing/hfl_standardscaler.json
```

### RobustScaler

- CLI命令启动

```bash
./primihub-cli --task_config_file="example/FL/preprocessing/hfl_robustscaler.json"
```

- Python SDK启动

```bash
submit example/FL/preprocessing/hfl_robustscaler.json
```

### LabelBinarizer

- CLI命令启动

```bash
./primihub-cli --task_config_file="example/FL/preprocessing/hfl_labelbinarizer.json"
```

- Python SDK启动

```bash
submit example/FL/preprocessing/hfl_labelbinarizer.json
```

### LabelEncoder

- CLI命令启动

```bash
./primihub-cli --task_config_file="example/FL/preprocessing/hfl_labelencoder.json"
```

- Python SDK启动

```bash
submit example/FL/preprocessing/hfl_labelencoder.json
```

### MultiLabelBinarizer

- CLI命令启动

```bash
./primihub-cli --task_config_file="example/FL/preprocessing/hfl_multilabelbinarizer.json"
```

- Python SDK启动

```bash
submit example/FL/preprocessing/hfl_multilabelbinarizer.json
```

### OneHotEncoder

- CLI命令启动

```bash
./primihub-cli --task_config_file="example/FL/preprocessing/hfl_onehotencoder.json"
```

- Python SDK启动

```bash
submit example/FL/preprocessing/hfl_onehotencoder.json
```

### OrdinalEncoder

- CLI命令启动

```bash
./primihub-cli --task_config_file="example/FL/preprocessing/hfl_ordinalencoder.json"
```

- Python SDK启动

```bash
submit example/FL/preprocessing/hfl_ordinalencoder.json
```

### QuantileTransformer

- CLI命令启动

```bash
./primihub-cli --task_config_file="example/FL/preprocessing/hfl_quantiletransformer.json"
```

- Python SDK启动

```bash
submit example/FL/preprocessing/hfl_quantiletransformer.json
```

### SimpleImputer

- CLI命令启动

  - 数字型数据

    ```bash
    ./primihub-cli --task_config_file="example/FL/preprocessing/hfl_simpleimputer_numeric.json"
    ```

  - 字符型数据

    ```bash
    ./primihub-cli --task_config_file="example/FL/preprocessing/hfl_simpleimputer_string.json"
    ```

- Python SDK启动

  - 数字型数据

    ```bash
    submit example/FL/preprocessing/hfl_simpleimputer_numeric.json
    ```

  - 字符型数据

    ```bash
    submit example/FL/preprocessing/hfl_simpleimputer_string.json
    ```

### Pipeline Demo

- CLI命令启动

```bash
./primihub-cli --task_config_file="example/FL/preprocessing/hfl_pipeline.json"
```

- Python SDK启动

```bash
submit example/FL/preprocessing/hfl_pipeline.json
```

### transform

- CLI命令启动

```bash
./primihub-cli --task_config_file="example/FL/preprocessing/hfl_transform.json"
```

- Python SDK启动

```bash
submit example/FL/preprocessing/hfl_transform.json
```

## 纵向联邦

### Normalizer

- CLI命令启动

```bash
./primihub-cli --task_config_file="example/FL/preprocessing/vfl_normalizer.json"
```

- Python SDK启动

```bash
submit example/FL/preprocessing/vfl_normalizer.json
```

### Pipeline Demo

- CLI命令启动

```bash
./primihub-cli --task_config_file="example/FL/preprocessing/vfl_pipeline.json"
```

- Python SDK启动

```bash
submit example/FL/preprocessing/vfl_pipeline.json
```

### transform

- CLI命令启动

```bash
./primihub-cli --task_config_file="example/FL/preprocessing/vfl_transform.json"
```

- Python SDK启动

```bash
submit example/FL/preprocessing/vfl_transform.json
```
