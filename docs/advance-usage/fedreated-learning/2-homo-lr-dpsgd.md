---
sidebar_position: 2
description: 梯度扰动差分隐私算法
keywords: [横向联邦学习, 差分隐私, Homo LR, SGD]
---
# 横向联邦学习DP-SGD算法

## 简介

1. client端训练时在梯度中添加噪声

2. $\epsilon$称为隐私预算，$\epsilon$越小安全性越高

## SGD和DP-SGD算法对比

### SGD算法步骤

1. 计算一个batch数据的梯度并取均值

    - $g$为梯度，$n$为batch size，$\nabla_{\omega}$指对$\omega$求导数，$\omega$为训练参数，$\mathcal{L}$为损失函数，$x$为特征，$y$为标签，下标$i$表示第$i$条数据

    - $g=\frac{1}{n}\sum_i{\nabla_{\omega}\mathcal{L}(x_i, y_i)}$

2. 更新参数

    - $\alpha$为学习率

    - $\omega:=\omega-\alpha\cdot g$

### DP-SGD算法步骤

1. 计算单样本的梯度

    - $g_i$为第$i$条数据的梯度

    - $g_i=\nabla_{\omega}\mathcal{L}(x_i, y_i)$

2. 单样本梯度剪裁

    - $\bar{g}_i$为样本剪裁后的梯度，$\|\cdot\|_2$为$l_2$范数，$C$为剪裁阈值

    - $\bar{g}_i=g_i/\max\Big(1,\frac{\|g_i\|_2}{C}\Big)$

3. 梯度中添加噪声

    - $\mathcal{N}$为高斯噪声，$\sigma$为噪声参数

    - $\tilde{g}=\frac{1}{n}\Big[\sum_i\bar{g}_i+\mathcal{N}(0,\sigma^2 C^2)\Big]$

    - 高斯噪声的方差取决于$C$和$\sigma$的乘积

4. 更新参数

    - $\omega:=\omega-\alpha\cdot \tilde{g}$

## DP超参数的影响

1. 剪裁阈值$C$：影响梯度偏差和噪声的方差，但不影响隐私预算的大小

    - $C$越小，对梯度的剪裁力度越大，引入的偏差越大

        + 无梯度剪裁时，将一个batch中各样本梯度累加

        + 剪裁阈值偏大时，范数较大的梯度被剪裁，其余梯度不变，累加后的梯度偏差较小

        + 剪裁阈值偏小时，大部分梯度被剪裁，累加后的梯度偏差较大

        + <img src="/img/grad_clip_effect.png" width="60%" height="60%"/>

    - $C$越小，噪声的方差越大，添加的噪声越大

    - 计算隐私预算不需要参数$C$，故不影响隐私预算的大小

    - <img src="/img/select_l2_norm_clip.png" width="50%" height="50%"/>

2. 噪声参数$\sigma$：影响模型的性能和隐私预算的大小

    - $\sigma$越小，噪声越小，模型性能越好

    - $\sigma$越小，隐私预算越大，安全性越弱

    - <img src="/img/select_noise_multiplier.png" width="50%" height="50%"/>

## 隐私预算的计算

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

    assert delta < 1. / num_train_examples
    return accountant.get_epsilon(target_delta=delta)
```

## 安全浮点数噪声生成

使用：`config`中设置`'secure_mode': True`

1. `sum(gauss(0, 1) for i in range(2 * n)) / sqrt(2 * n)`

    - 原理：高斯分布累加后还是高斯分布$\frac{1}{\sqrt{2n}}\sum_{i=1}^{2n}\mathcal{N}_i(0,1) \sim\mathcal{N}(0,1)$

2. n>1，一般取`n=2`

## Primihub Homo LR DP-SGD运行

:::tip
运行环境初始化，见[代码编译](../../../docs/developer-docs/build/)
:::

运行：

- 如果是通过docker-compose启动，执行 `docker exec -it primihub-node0 bash` 进入到 `primihub-node0` 容器，执行以下命令：

```bash
./primihub-cli --task_type=0 --task_lang=python --task_code=./python/primihub/FL/model/logistic_regression/homo_lr_dpsgd.py --params="predictFileName:STRING:0:/data/result/lr_train_predict.csv, indicatorFileName:STRING:0:/data/result/lr_train_indicator.json, modelFileName:STRING:0:/data/result/lr_model.pl"
```

- 如果是在本地编译启动，在编译完成后的代码根目录下执行以下命令：

```bash
./bazel-bin/cli --server="你的IP:50050" --task_type=0 --task_lang=python --task_code=./python/primihub/FL/model/logistic_regression/homo_lr_dpsgd.py --params="predictFileName:STRING:0:/data/result/lr_train_predict.csv, indicatorFileName:STRING:0:/data/result/lr_train_indicator.json, modelFileName:STRING:0:/data/result/lr_model.pl"
```

#### Homo LR Prediction
```bash
./bazel-bin/cli --server="你的IP:50050" --task_type=0 --task_lang=python --task_code=./python/primihub/FL/model/logistic_regression/homo_lr_infer.py --params="predictFileName:STRING:0:/data/result/lr_test_predict.csv, indicatorFileName:STRING:0:/data/result/lr_test_indicator.json, modelFileName:STRING:0:/data/result/lr_model.pl"
```

- 通过Python SDK Client启动，见[Python SDK homo-lr-demo](../../../docs/advance-usage/python-sdk/homo-lr)

## 参考文献

1. Abadi, Martin, Andy Chu, Ian Goodfellow, H. Brendan McMahan, Ilya Mironov, Kunal Talwar, and Li Zhang. "Deep learning with differential privacy." In Proceedings of the 2016 ACM SIGSAC conference on computer and communications security, pp. 308-318. 2016. <https://arxiv.org/pdf/1607.00133.pdf>
2. Mironov, Ilya, Kunal Talwar, and Li Zhang. "Renyi differential privacy of the sampled gaussian mechanism." arXiv preprint arXiv:1908.10530 (2019). <https://arxiv.org/pdf/1908.10530.pdf>
3. Holohan, Naoise, and Stefano Braghin. "Secure random sampling in differential privacy." In European Symposium on Research in Computer Security, pp. 523-542. Springer, Cham, 2021. <https://arxiv.org/pdf/2107.10138.pdf>
4. <https://github.com/pytorch/opacus/pull/260>
