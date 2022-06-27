---
sidebar_position: 0
---

# xgboost

*** Implementation of Vertical Federated Learning Application *** 


```
$ git clone https://github.com/primihub/primihub.git
$ cd primihub/python
```


## Quickly verify plaintext vertical XGBoost

1. Install required packages `pip3 install -r requirements.txt` ，

2. Install the primihub platform library, `python setup.py install --user` ，

3. Run the plaintext vertical XGBoost test application,`python python/primihub/tests/test_disxgb.py` 。


## Fast verification of ciphertext vertical XGBoost (based on Paillier)

1. Compile the Paillier shared library,`bazel build --config=linux :opt_paillier_c2py_test` ，

2. Copy the shared library to the specified directory,`cp bazel-bin/opt_paillier_c2py.so python/primihub/primitive/` ，

3. Install required packages `pip3 install -r requirements.txt` , (ignored if the previous application has already been executed)

4. Install the primihub platform library, `python setup.py install --user` ，

5. Run the ciphertext vertical XGBoost test application,`python python/primihub/tests/test_disxgb_en.py` 。


## Principle of XGBoost
### Objective Function
#### Original Objective Function
The original objective function is divided into two parts: one is the loss function, and the other is the regularization (used to control the complexity of the model).

For the t-th tree, the i-th sample, the predicted value of the model is: $\hat{y}_{i}^{t}=\sum_{k=1}^{t}f_{k}(x_{i})=\hat{y}_{i}^{t-1}+f_{t}(x_{i})$。

**Note: where $\hat{y}_{i}^{t}$ is the prediction result of sample i after the t-th iteration; $f_{t}(x_{i})$ is the model prediction of the t-th tree Result; $\hat{y}_{i}^{t-1}$ is the prediction result of the t-1th tree.**

Further, the original objective function can be obtained:$Obj=\sum_{i=1}^{n}l(y_{i},\hat{y}_{i})+\sum_{j=1}^{t}\Omega (f_{j})$

**Note: where $`l(y_{i},\hat{y}_{i})`$ is the loss function of the model; $`\hat{y}_{i}`$ is the i-th pair of the entire model The predicted value of the sample; $`y_{i}`$ is the true value of the ith sample; $`\sum_{j=1}^{t}\Omega (f_{j})`$ is the t tree Complexity summation (understood as regularization term)**
#### Simplified Objective Function
Since XGBoost is a forward iteration, the top t-1 tree variables or parameters involved can be regarded as constants, so the objective function is simplified as follows:

$$
Obj=\sum_{i=1}^{n}l(y_{i},\hat{y}_{i}^{t})+\sum_{j=1}^{t}\Omega (f_{j})=\sum_{i=1}^{n}l(y_{i},\hat{y}_{i}^{t-1}+f_{t}(x_{i}))+\sum_{j=1}^{t}\Omega (f_{j})=\sum_{i=1}^{n}l(y_{i},\hat{y}_{i}^{t-1}+f_{t}(x_{i}))+\Omega (f_{t})+constant
$$

#### Approximate expansion of the objective function by Taylor formula
The basic Taylor formula is expanded as follows:

$$
f(x+\Delta x)\simeq f(x)+f'(x)\Delta x+\frac{1}{2}f''(x)\Delta x^{2}
$$

The second-order expansion of Taylor's formula is carried out on the loss function, and the result is:$l(y_{i},\hat{y}_{i}^{t-1}+f_{t}(x_{i}))\simeq l(y_{i},\hat{y}_{i}^{t-1})+g_{i}f_{t}(x_{i})+\frac{1}{2}h_{i}f_{t}^{2}(x_{i})$

**Note: $g_{i}$ corresponds to the first derivative of the loss function, $h_{i}$ corresponds to the second derivative of the loss function**

Then, the expansion formula of the objective function can be obtained as follows:
$Obj\simeq \sum_{i=1}^{n}[l(y_{i},\hat{y}_{i}^{t-1})+g_{i}f_{t}(x_{i})+\frac{1}{2}h_{i}f_{t}^{2}(x_{i})]+\Omega (f_{t})+constant$
### Parameterization of Trees
#### Tree Model Parameterization
* The value of each leaf node of each tree (ie the weight of each leaf node) w
* The mapping relationship between samples and leaf nodes (that is, which leaf node of the current tree each sample falls on) q
* Leaf node sample attribution set I
#### Tree Complexity Parameterization
* The number of leaf nodes in each tree
* The weight value of the leaf node

The complexity expression of the tree is as follows: $\Omega(f_{t})=\gamma T+\frac{1}{2}\lambda \sum_{j=1}^{T}\omega _{j}^{2}$

**Note: T is the current number of leaf nodes in this tree; $\omega _{j}^{2}$ is the $L_{2}$ norm of the leaf node value**