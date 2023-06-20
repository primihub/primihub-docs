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
- Runtime (Worker): the loader and runner of a Task, a protocol assigned by the VMNode for use by the runtime at boot time
- Worker party：Runtime roles specify the role associated with the security protocol based on the incoming security protocol

## How Core Model Works

![Concept](/img/core-concept.drawio.svg)