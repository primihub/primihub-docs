---
sidebar_position: 3
description: 梯度扰动差分隐私算法
keywords: [Gradient, Differential Privacy, DP-SGD]
---

# 横向DP-SGD算法

## 1. 简介

1. 训练时对梯度剪裁后添加噪声

2. $\epsilon$称为隐私预算，$\epsilon$越小安全性越高

## 2. SGD和DP-SGD算法对比

| 符号 | 名称 |
|---|---|
| $g$ | 梯度 |
| $g_i$ | 第$i$个样本的梯度 |
| $\bar{g}_i$ | 第$i$个样本剪裁后的梯度 |
| $\tilde{g}$ | 添加噪声后的梯度 |
| $B$ | batch size |
| $\nabla$ | 导数 |
| $\omega$ | 模型参数 |
| $\mathcal{L}$ | 损失函数 |
| $x$ | 特征 |
| $x_i$ | 第$i$个样本的特征 |
| $y$ | 标签 |
| $y_i$ | 第$i$个样本的标签 |
| $\eta$ | 学习率 |
| $\|\cdot\|_2$ | $l_2$范数 |
| $C$ | 剪裁阈值 |
| $\mathcal{N}$ | 高斯噪声 |
| $\sigma$ | 噪声参数 |

### 2.1 SGD算法步骤

1. 计算一个batch数据的梯度并取均值

    - $g=\frac{1}{B}\sum_i{\nabla_{\omega}\mathcal{L}(x_i, y_i)}$

2. 更新模型参数

    - $\omega:=\omega-\eta\cdot g$

### 2.2 DP-SGD算法步骤

1. 计算单样本的梯度

    - $g_i=\nabla_{\omega}\mathcal{L}(x_i, y_i)$

2. 单样本梯度剪裁

    - $\bar{g}_i=g_i/\max\Big(1,\frac{\|g_i\|_2}{C}\Big)$

3. 梯度中添加噪声

    - $\tilde{g}=\frac{1}{B}\Big[\sum_i\bar{g}_i+\mathcal{N}(0,\sigma^2 C^2)\Big]$

    - 高斯噪声的方差取决于$C$和$\sigma$的乘积

    - 隐私预算$\epsilon$仅取决于参数$\sigma$，与$C$无关

4. 更新模型参数

    - $\omega:=\omega-\eta\cdot \tilde{g}$

## 3. DataLoader对比

### 3.1 DataLoader

每次根据batch size，序列化选取批量数据，取完后对数据洗牌

### 3.2 DPDataLoader

每次根据采样率$q$进行有放回泊松采样，选取批量数据

## 4. DP超参数的影响

### 4.1 剪裁阈值$C$

影响梯度偏差和噪声的方差，但不影响隐私预算的大小

1. $C$越小，对梯度的剪裁力度越大，引入的偏差越大

    - 无梯度剪裁时，将一个batch中各样本梯度累加

    - 剪裁阈值偏大时，范数较大的梯度被剪裁，其余梯度不变，累加后的梯度偏差较小

    - 剪裁阈值偏小时，大部分梯度被剪裁，累加后的梯度偏差较大

    - <img src="/img/grad_clip_effect.png" width="60%" height="60%"/>

2. $C$越小，噪声的方差越大，添加的噪声越大

3. 计算隐私预算不需要参数$C$，故不影响隐私预算的大小

<img src="/img/select_l2_norm_clip.png" width="50%" height="50%"/>

### 4.2 噪声参数$\sigma$

影响模型的性能和隐私预算的大小

1. $\sigma$越小，噪声越小，模型性能越好

2. $\sigma$越小，隐私预算越大，安全性越弱

<img src="/img/select_noise_multiplier.png" width="50%" height="50%"/>

## 5. 隐私预算的计算

1. 安装: `pip install dp-accounting`

2. 参数解释

    - `steps`: 训练迭代次数，等于`epoch * num_train_examples // batch_size`

    - `noise_multiplier`: 高斯噪声参数$\sigma$

    - `num_train_examples`: 训练样本数量$n$

    - `delta`: $(\epsilon,\delta)$-DP中的参数$\delta$，需满足$\delta<\frac{1}{n}$

    - `sampling_probability`：采样率$q$，等于batch size / $n$

3. 参数对隐私预算大小的影响

    - 训练迭代次数越多，隐私预算越大

    - 高斯噪声参数$\sigma$越小，隐私预算越大

    - DP参数$\delta$越小，隐私预算越大

    - 采样率$q$越大，隐私预算越大

    - batch size影响训练迭代次数和采样率：batch size增大，训练迭代次数减少，采样率增大。一般来说采样率对隐私预算的影响大，因此batch size增大，隐私预算一般增大

    - 训练样本数量$n$影响训练迭代次数和采样率：样本数量$n$减少，训练迭代次数减少，采样率增加。一般来说采样率对隐私预算的影响大，因此样本数量$n$减少，隐私预算一般增大

4. 代码样例

```python
import dp_accounting
import logging

noise_multiplier = 1.0
batch_size = 256
num_train_examples = 60000
delta = 1e-5

def compute_epsilon(steps):
    """Computes epsilon value for given hyperparameters."""
    if noise_multiplier == 0.0:
        return float('inf')
    orders = [1 + x / 10. for x in range(1, 100)] + list(range(12, 64))
    accountant = dp_accounting.rdp.RdpAccountant(orders)

    sampling_probability = batch_size / num_train_examples
    event = dp_accounting.SelfComposedDpEvent(
        dp_accounting.PoissonSampledDpEvent(
            sampling_probability,
            dp_accounting.GaussianDpEvent(noise_multiplier)), steps)

    accountant.compose(event)

    if delta > 1. / num_train_examples:
        logging.error(f"delta {delta} should be set less than 1 / {num_train_examples}")

    return accountant.get_epsilon(target_delta=delta)
```

## 6. 安全浮点数噪声生成

使用：设置`'secure_mode'`为`True`

1. `sum(gauss(0, 1) for i in range(2 * n)) / sqrt(2 * n)`

    - 原理：高斯分布累加后还是高斯分布$\frac{1}{\sqrt{2n}}\sum_{i=1}^{2n}\mathcal{N}_i(0,1) \sim\mathcal{N}(0,1)$

2. n>1，根据效率和计算复杂性考虑，一般取n=2

## 7. HFL Logistic Regression DP-SGD运行

### 7.1 Training

- 如果是通过docker-compose启动，执行 `docker exec -it primihub-node0 bash` 进入到 `primihub-node0` 容器，执行以下命令：

```bash
./primihub-cli --task_config_file="python/primihub/FL/tests/linear/logistic_regression/hfl_binclass_dpsgd.json"
```

- 如果是在本地编译启动，在编译完成后的代码根目录下执行以下命令：

```bash
./bazel-bin/cli --server="127.0.0.1:50050" --task_config_file="python/primihub/FL/tests/linear/logistic_regression/hfl_binclass_dpsgd.json"
```

- 或者通过Python SDK启动

```bash
submit python/primihub/FL/tests/linear/logistic_regression/hfl_binclass_dpsgd.json
```

### 7.2 Prediction

- docker-compose启动

```bash
./primihub-cli --task_config_file="python/primihub/FL/tests/linear/logistic_regression/hfl_binclass_predict.json"
```

- 本地编译启动

```bash
./bazel-bin/cli --server="127.0.0.1:50050" --task_config_file="python/primihub/FL/tests/linear/logistic_regression/hfl_binclass_predict.json"
```

- Python SDK启动

```bash
submit python/primihub/FL/tests/linear/logistic_regression/hfl_binclass_predict.json
```

## 8. 参考文献

1. Abadi, Martin, Andy Chu, Ian Goodfellow, H. Brendan McMahan, Ilya Mironov, Kunal Talwar, and Li Zhang. "Deep learning with differential privacy." In Proceedings of the 2016 ACM SIGSAC conference on computer and communications security, pp. 308-318. 2016. <https://arxiv.org/pdf/1607.00133.pdf>

2. Mironov, Ilya, Kunal Talwar, and Li Zhang. "Renyi differential privacy of the sampled gaussian mechanism." arXiv preprint arXiv:1908.10530 (2019). <https://arxiv.org/pdf/1908.10530.pdf>

3. Holohan, Naoise, and Stefano Braghin. "Secure random sampling in differential privacy." In European Symposium on Research in Computer Security, pp. 523-542. Springer, Cham, 2021. <https://arxiv.org/pdf/2107.10138.pdf>

4. <https://github.com/pytorch/opacus/pull/260>
