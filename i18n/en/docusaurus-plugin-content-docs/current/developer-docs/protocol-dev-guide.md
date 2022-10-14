---
sidebar_position: 2
---

# PrimiHub Security Protocol development Guide

*** How to develop a secure protocol *** 

:::tip

👨‍🎓 本文档面向安全协议开发和算法开发的工程师

🕗 适用于PrimiHub v1.0 版本

:::

## 如何开发一个新的多方安全计算协议


### 要继承实现的类
1. 算子（ Envaluator）
用于计算共享数据，以乘法举例

```c++
sf64Matrix<D> Envaluator::mul(const sf64Matrix<D>& left, const sf64Matrix<D>& right)；
```

2.  密文数据表示 （Encryptor）
使用通信子与参与方交换数据，表示为本地数据。以int数据为例

```c++
// 本地i64类型转换为共享的si64类型数据，comm用于数据已经与其他参与方共享通信使用
si64 Sh3Encryptor::localInt(CommPkg & comm, i64 val);


// 从通信子获取一个si64类型的共享数据
si64 Sh3Encryptor::remoteInt(CommPkg & comm);

// 使用异步回调任务的方式将本地的i64类型数据转换为共享的si64类型数据
Sh3Task Sh3Encryptor::localInt(Sh3Task dep, i64 val, si64 & dest);

// 使用异步回调任务的方式从通信子获取一个si64类型的共享数据
Sh3Task Sh3Encryptor::remoteInt(Sh3Task dep, si64 & dest) 
```

3. 通信子 (CommPkg)
管理若干个参与方的通信信道，用于交换密文数据，需要根据协议模型定义参与方的通信子中的通信信道以及getter方法。

(4) Share随机数生成和交换( ShareGen)
用于协议生成SecretShare随机数

### 使用的类
- 运行时 （Runtime）：管理用于通信子执行的异步任务列表，在算子（ Envaluator）和密文数据表示 （Encryptor）中需要传入唯一的Runtime对象引用。
- ShareOT：不经意传输工具，会使用通信子。可以根据需要继承实现ShareOT的变种。
- 本地数据类型  ：数fp、矩阵fpMatrix，具体见代码type包
- 共享数据类型：浮点共享sf64、整型共享si64、矩阵si64Matrix/sf64Matrix，具体见代码type包

## 算法开发
算法在安全协议之上开发，使用协议中的定义的
- 算子（ Envaluator）
- 密文数据表示 （Encryptor）
- 通信子 (CommPkg)
- Share随机数生成和交换( ShareGen)

算法对象初始化过程如下伪代码：
```c++ 
// 创建通信子
CommPkg comm (party0_channel, party1_channel, ...)

// 创建并从初始化 runtime，并指定runtime使用的通信子
runtime = CreateRunTimeObject(partyIdx)
runtime.init(partyIdx, comm)

// 初始化算子 Envaluator）和密文数据表示 （Encryptor）对象
env  = Envaluator(partyIdx, comm)
enc = Encryptor(partyIdx, comm)
```

算法根据需要实现自己的MPC计算方法，如：mul、add、sort等等，可以参考aby3ML类的实现。
