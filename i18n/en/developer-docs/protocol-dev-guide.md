---
sidebar_position: 2
---

# Primihub Security Protocol Development Guide

*** How to develop a security protocol *** 

:::tip

👨‍🎓 This document is intended for engineers working on security protocol development and algorithm development

🕗 For Primihub v1.0

:::

## How to develop a new multi-party secure computing protocol


### The Class to inherit the implementation
1. Envaluator
Used to calculate shared data, with multiplication as an example

```c++
sf64Matrix<D> Envaluator::mul(const sf64Matrix<D>& left, const sf64Matrix<D>& right)；
```

2. Encryptor
Use communicators to exchange data with participants, represented as local data. Take int data as an example

```c++
// The local i64 type is converted to shared si64 type data, comm is used for data that has been shared with other parties for communication use
si64 Sh3Encryptor::localInt(CommPkg & comm, i64 val);


// Get a si64 type of shared data from the ComPkg
si64 Sh3Encryptor::remoteInt(CommPkg & comm);

// Convert local i64 type data to shared si64 type data using asynchronous callback tasks
Sh3Task Sh3Encryptor::localInt(Sh3Task dep, i64 val, si64 & dest);

// Get a si64 type of shared data from the communicator using an asynchronous callback task
Sh3Task Sh3Encryptor::remoteInt(Sh3Task dep, si64 & dest) 
```

3. CommPkg

   To manage the communication channels of several participants for exchanging ciphertext data, it is necessary to define the communication channels and *getter* methods in the communicators of the participants according to the protocol model.

4. ShareGen

   Share random number generation and exchange 
   
   Used for the protocol to generate SecretShare random numbers

### Class used
- Runtime：Manage the list of asynchronous tasks used for CommPkg execution. In the Envaluator and Encryptor, you need to pass in a unique Runtime object reference.
- ShareOT：Inadvertent transmission tools, communicators are used. Variants implementing ShareOT can be inherited as needed.
- Local data type：Number(fp)、Matrix(fpMatrix)，See code type package for details
- Shared data type: Floating point shared SF64, integer shared si64, matrix si64matrix/sf64matrix. See code type package for details

## Algorithm development
The algorithm is developed on top of the security protocol, using the
- Envaluator
- Ciphertext data representation (Encryptor)
- Communicator (CommPkg)
- Share random number generation and exchange (ShareGen)

The initialization process of the algorithm object is as follows:
```c++ 
// Create CommPkg
CommPkg comm (party0_channel, party1_channel, ...)

// Create and initialize the runtime, and specify the communicator used by the runtime
runtime = CreateRunTimeObject(partyIdx)
runtime.init(partyIdx, comm)

// Initialization Envaluator and Encryptor object
env  = Envaluator(partyIdx, comm)
enc = Encryptor(partyIdx, comm)
```

The algorithm implements its own MPC calculation method as needed, such as: mul, add, sort, etc., you can refer to the implementation of the aby3ML class.
