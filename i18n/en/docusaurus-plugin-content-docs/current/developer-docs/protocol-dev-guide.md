---
sidebar_position: 2
---

# PrimiHub Security Protocol development Guide

*** How to develop a secure protocol *** 

:::tip

👨‍🎓 This document is intended for security protocol development and algorithm development engineers

🕗 Works with PrimiHub v1.0

:::

## How to develop a new multi-party secure computation protocol


### 要继承实现的类
1. Envaluator
Used to compute shared data, for example multiplication

```c++
sf64Matrix<D> Envaluator::mul(const sf64Matrix<D>& left, const sf64Matrix<D>& right)；
```

2. Encryptor
Data is exchanged with the participants using the CommPkg, represented as local data. Consider the int data

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

3. CommPkg
To manage the communication channel of several participants for exchanging ciphertext data, it is necessary to define the communication channel and getter method in the communication sub-of the participants according to the protocol model.


(4) ShareGen
Used for protocol generation of SecretShare random number

### Classes you need
- Runtime：To manage the asynchronous task list of CommPKg, the Envaluator and Encryptor need to pass in a unique Runtime object reference.
- ShareOT：Oblivious transfer tool, will use CommPkg. Variants of ShareOT can be inherited and implemented as needed.
- Local data type  ：数fp、矩阵fpMatrix，具体见代码type包
- Shared data type：浮点共享sf64、整型共享si64、矩阵si64Matrix/sf64Matrix，具体见代码type包

## Algorithm Development
The algorithm is developed based on the security protocol, using the definitions in the protocol
- Envaluator
- Encryptor
- CommPkg
- ShareGen

The algorithm object initialization process is pseudocode as follows:
```c++ 
// create CommPKg
CommPkg comm (party0_channel, party1_channel, ...)

// The runtime is created and initialized, and the CommPKg used by the runtime is specified
runtime = CreateRunTimeObject(partyIdx)
runtime.init(partyIdx, comm)

// Initialization Envaluator and Encryptor
env  = Envaluator(partyIdx, comm)
enc = Encryptor(partyIdx, comm)
```

The algorithm implements its own MPC calculation methods as needed, such as mul, add, sort, etc. See aby3ML for an implementation.
