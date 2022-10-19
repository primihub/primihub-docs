---
sidebar_position: 1
---

# Core Model

*** How PrimiHub works ***

- Node：It is an executable program that loads security protocols and receives computing requests. Nodes provide basic services for the execution of upper layer protocols, such as dataset metadata service and data cache service;
- Protocol：Secure Multiparty Computation(MPC) protocol
- VMNode：Executors of all tasks on a node
- VMNode role：The role played in a task execution is divided into two kinds a. Scheduler b. Worker 
- Dataset：The data that the task needs to compute
- Algorithm：The specific logic of task execution will be assigned to the specified node according to the protocol
- Task：The MPC computation task being performed by a specific protocol. A computation task needs to specify an algorithm, a dataset, and a protocol (the protocol can be automatically negotiated by nodes based on the algorithm or manually specified)
- 运行时（Worker）：任务（Task）的加载和运行器，一个运行时在启动时由VMNode分配使用的协议（Protocol）；
- Worker party：运行时角色根据传入的安全协议指定与安全协议相关的角色

## How Core Model Works

![Concept](./core-concept-top.jpg)