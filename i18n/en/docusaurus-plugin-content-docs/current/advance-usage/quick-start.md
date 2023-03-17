---
sidebar_position: 0
description: Start an MPC Application in 5 minutes
keywords: [MPC, QuickStart]
---

# Quick Start

:::tip
Minimum machine configuration requirement 4C8G
:::

Take 5 minutes to run an MPC application


Install [docker](https://docs.docker.com/install/overview/) and [docker-compose](https://docs.docker.com/compose/install/)

Download the code and switch to the code root path

```shell
git clone https://github.com/primihub/primihub.git
cd primihub
```

## Run an MPC application
![Depolyment](/img/tutorial-depolyment.jpg)

### Start node

*** Start the node for testing  *** 

Start up three docker containers using docker-compose.
The container includes: bootstrap node, redis(default), three nodes

```bash
docker-compose up -d
```

View a running docker container：

```shell
docker-compose ps -a
```

```shell
NAME                    COMMAND                  SERVICE                 STATUS              PORTS
node0_primihub          "/bin/bash -c './pri…"   node0                   running             0.0.0.0:6666->6666/tcp, 0.0.0.0:8050->50050/tcp
node1_primihub          "/bin/bash -c './pri…"   node1                   running             0.0.0.0:6667->6667/tcp, 0.0.0.0:8051->50051/tcp
node2_primihub          "/bin/bash -c './pri…"   node2                   running             0.0.0.0:6668->6668/tcp, 0.0.0.0:8052->50052/tcp
redis                   "docker-entrypoint.s…"   redis                   running             0.0.0.0:6379->6379/tcp
simple_bootstrap_node   "/app/simple-bootstr…"   simple_bootstrap_node   running             0.0.0.0:4001->4001/tcp
```                                                   

### Create an MPC task

*** Let three nodes jointly perform a logistic regression task of multi-party secure computation (MPC) ***

```shell
docker run --network=host -it primihub/primihub-node:latest ./primihub-cli --server="127.0.0.1:8050"
```

:::tip The node that requested the task
  You can request a task from any node in your cluster
:::

:::tip Available task parameters

With primihub-cli, the following parameters can be specified
 1. Request which node to start the task
 2. Which shared datasets to use
 3. What kind of privacy computing tasks to do
 
In this case, primihub-cli will request a ABY3 tripartite logistic regression testing task from*** node 0 ***with default parameters. For the parameters that the cli can specify, see *** [Create Tasks](../docs/advance-usage/create-tasks/cli-params) ***

:::

## Core features
In addition to the MPC examples above, PrimiHub also supports Federated Learning, Private Intersection (PSI), and Private Query (PIR) features, as described in the PrimiHub [Core features](../docs/core-concept/model) .

## Use the advanced
Want to learn how to start a native app and how to leverage PrimiHub features to implement more apps, see [Advanced Usage](../docs/advance-usage/start-nodes)

## Developer
See [Developer Documentation](../docs/developer-docs/build) for instructions on compiling code and how to contribute
