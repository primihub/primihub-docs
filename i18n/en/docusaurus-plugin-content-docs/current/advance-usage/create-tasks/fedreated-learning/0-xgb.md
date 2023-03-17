---
sidebar_position: 0
---

# xgboost

*** Implementation of a Vertical Federated Learning application *** 


```
$ git clone https://github.com/primihub/primihub.git
$ cd primihub/python
```


## Fast verification of plaintext longitudinal XGBoost

1. Install the required package `pip3 install -r requirements.txt` ，

2. Install primihub platform libraries， `python setup.py install --user` ，

3. Run the plaintext longitudinal XGBoost test application，`python python/primihub/tests/test_disxgb.py` 。


## Fast Verification of ciphertext Longitudinal XGBoost (Paillier based)

1. Compile the Paillier shared library，`bazel build --config=linux :opt_paillier_c2py_test` ，

2. Copy the shared library to the specified directory，`cp bazel-bin/opt_paillier_c2py.so python/primihub/primitive/` ，

3. Install the required package `pip3 install -r requirements.txt` ，(Ignored if the previous application has already been executed)

4. Install primihub platform libraries， `python setup.py install --user` ，

5. Run the ciphertext longitudinal XGBoost test application，`python python/primihub/tests/test_disxgb_en.py` 。


## XGBoost theory
### The objective function
#### Original objective function
The original objective function has two parts: a loss function and a regularization (which controls the complexity of the model).

对于第t棵树，第i个样本，模型的预测值为:$\hat{y}_{i}^{t}=\sum_{k=1}^{t}f_{k}(x_{i})=\hat{y}_{i}^{t-1}+f_{t}(x_{i})$。

**注：其中$\hat{y}_{i}^{t}$是第t次迭代之后样本i的预测结果；$f_{t}(x_{i})$是第t棵树的模型预测结果；$\hat{y}_{i}^{t-1}$是第t-1棵树的预测结果。**

进一步可以得到原始的目标函数：$Obj=\sum_{i=1}^{n}l(y_{i},\hat{y}_{i})+\sum_{j=1}^{t}\Omega (f_{j})$

**注：其中$`l(y_{i},\hat{y}_{i})`$是模型的损失函数；$`\hat{y}_{i}`$是整个模型对第i个样本的预测值；$`y_{i}`$是第i个样本的真实值；$`\sum_{j=1}^{t}\Omega (f_{j})`$是t棵树的复杂度求和（理解为正则化项）**
#### 简化目标函数
由于XGBoost是前向迭代，可以将涉及到的前t-1个树变量或者参数看作常数，所以对目标函数进行如下简化：

$$
Obj=\sum_{i=1}^{n}l(y_{i},\hat{y}_{i}^{t})+\sum_{j=1}^{t}\Omega (f_{j})=\sum_{i=1}^{n}l(y_{i},\hat{y}_{i}^{t-1}+f_{t}(x_{i}))+\sum_{j=1}^{t}\Omega (f_{j})=\sum_{i=1}^{n}l(y_{i},\hat{y}_{i}^{t-1}+f_{t}(x_{i}))+\Omega (f_{t})+constant
$$

#### 泰勒公式对目标函数近似展开
基本泰勒公式展开如下:

$$
f(x+\Delta x)\simeq f(x)+f'(x)\Delta x+\frac{1}{2}f''(x)\Delta x^{2}
$$

将损失函数进行泰勒公式二阶展开，结果为：$l(y_{i},\hat{y}_{i}^{t-1}+f_{t}(x_{i}))\simeq l(y_{i},\hat{y}_{i}^{t-1})+g_{i}f_{t}(x_{i})+\frac{1}{2}h_{i}f_{t}^{2}(x_{i})$

**注：$g_{i}$对应的是损失函数一阶导数，$h_{i}$对应的是损失函数二阶导数**

进而可以得到目标函数展开公式如下：
$Obj\simeq \sum_{i=1}^{n}[l(y_{i},\hat{y}_{i}^{t-1})+g_{i}f_{t}(x_{i})+\frac{1}{2}h_{i}f_{t}^{2}(x_{i})]+\Omega (f_{t})+constant$
### 树的参数化
#### 树模型参数化
* 每棵树每个叶子节点的值（即每个叶子节点的权重）w
* 样本到叶子节点的映射关系（即每个样本落在当前这棵树的哪一个叶子节点上）q
* 叶子节点样本归属集合I
####  树的复杂度参数化
* 每个树的叶子节点的个数
* 叶子节点的权重值

树的复杂度表达式如下：$\Omega(f_{t})=\gamma T+\frac{1}{2}\lambda \sum_{j=1}^{T}\omega _{j}^{2}$

**注：T为当前这棵树叶子节点的个数；$\omega _{j}^{2}$为叶子节点值的$L_{2}$范数**