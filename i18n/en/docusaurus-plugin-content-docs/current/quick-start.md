---
sidebar_position: 1
description: Start an MPC Application in 5 minutes
keywords: [MPC, QuickStart]
---

# Quick Start

:::tip
Minimum machine configuration requirement 4C8G
:::

Take 5 minutes to run an MPC (Secure multi-party computation) application

Install [docker](https://docs.docker.com/install/overview/) and [docker-compose](https://docs.docker.com/compose/install/), then download the `docker-compose` file:

```shell
curl https://get.primihub.com/release/1.3.9/docker-compose.yml -s -o docker-compose.yml
```

:::tip
* Please specify the version in the URL if you need
* Support platform: `linux/amd64`. Docker can run container in emulation mode, but there are [some known issues](https://docs.docker.com/desktop/mac/apple-silicon/#known-issues), for example the performance issue.。
* Please use the follwing environment variables if you meet the Docker Hub pull limitation or other issues, for example: `REGISTRY=registry.cn-beijing.aliyuncs.com`
:::

## Run an MPC application
![Depolyment](./tutorial-depolyment.jpg)

### Start node

*** Start the node for testing  *** 

Start up three docker containers using docker-compose.
The container includes: start node, three nodes

```bash
docker-compose up -d
```

View a running docker container：

```shell
docker-compose ps -a
```

You will see the output like this:
```shell
CONTAINER ID   IMAGE                                COMMAND                  CREATED          STATUS          PORTS                                                                         NAMES
cf875c1280be   primihub/primihub-node:latest        "/bin/bash -c './pri…"   11 minutes ago   Up 11 minutes   0.0.0.0:12120-12121->12120-12121/tcp, 0.0.0.0:8052->50050/tcp                 node2_primihub
6a822ff5c6f7   primihub/primihub-node:latest        "/bin/bash -c './pri…"   11 minutes ago   Up 11 minutes   0.0.0.0:10120->12120/tcp, 0.0.0.0:10121->12121/tcp, 0.0.0.0:8050->50050/tcp   node0_primihub
11d55ce06ff0   primihub/primihub-node:latest        "/bin/bash -c './pri…"   11 minutes ago   Up 11 minutes   0.0.0.0:11120->12120/tcp, 0.0.0.0:11121->12121/tcp, 0.0.0.0:8051->50050/tcp   node1_primihub
68befa6ab2a5   primihub/simple-bootstrap-node:1.0   "/app/simple-bootstr…"   11 minutes ago   Up 11 minutes   0.0.0.0:4001->4001/tcp                                                        simple_bootstrap_node
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

Read more details about how to create a [PMC task](../docs/advance-usage/create-tasks/mpc-task).

## Core features
In addition to the MPC examples above, PrimiHub also supports Federated Learning, Private Intersection (PSI), and Private Query (PIR) features, as described in the PrimiHub [core features](../docs/core-concept/model).

## Use the advanced
Want to learn how to start a native app and how to leverage PrimiHub features to implement more apps, see the [advanced usage](../docs/advance-usage/start-nodes).

## Developer
See the [developer documentation](../docs/developer-docs/build) for instructions on compiling code and how to contribute.
