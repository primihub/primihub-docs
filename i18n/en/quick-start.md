---
sidebar_position: 1
---

# Quick Start

Run an Multi-Party Computing application in 5 minutes


Install [docker](https://docs.docker.com/install/overview/) and [docker-compose](https://docs.docker.com/compose/install/)

Download the code and switch to its root path

```
$ git clone https://github.com/primihub/primihub.git
$ cd primihub
```


## Run an MPC case
![Depolyment](./tutorial-depolyment.jpg)


### Start the test nodes

Start three docker containers using docker-compose. The container includes: one simple bootstrap node, three nodes

  ```bash
  $ docker-compose up -d
  ```

Check out the running docker container

```bash
$ docker-compose ps -a
```
```
  CONTAINER ID   IMAGE                                COMMAND                  CREATED          STATUS          PORTS                                                                         NAMES
cf875c1280be   primihub-node:1.0.5                  "/bin/bash -c './pri…"   11 minutes ago   Up 11 minutes   0.0.0.0:12120-12121->12120-12121/tcp, 0.0.0.0:8052->50050/tcp                 node2_primihub
6a822ff5c6f7   primihub-node:1.0.5                  "/bin/bash -c './pri…"   11 minutes ago   Up 11 minutes   0.0.0.0:10120->12120/tcp, 0.0.0.0:10121->12121/tcp, 0.0.0.0:8050->50050/tcp   node0_primihub
11d55ce06ff0   primihub-node:1.0.5                  "/bin/bash -c './pri…"   11 minutes ago   Up 11 minutes   0.0.0.0:11120->12120/tcp, 0.0.0.0:11121->12121/tcp, 0.0.0.0:8051->50050/tcp   node1_primihub
68befa6ab2a5   primihub/simple-bootstrap-node:1.0   "/app/simple-bootstr…"   11 minutes ago   Up 11 minutes   0.0.0.0:4001->4001/tcp                                                        simple_bootstrap_node

```                                                   


### Create an MPC task

***  Let three nodes jointly perform a logistic regression task of multi-party secure computation (MPC) ***


```bash
$ docker run --network=host -it primihub/primihub-node:1.0.5 ./primihub-cli --server="127.0.0.1:8050"
```

:::tip The node requesting the task

You can send a request of compute task to any node

:::

:::tip Available task parameters

The following parameters can be specified through primihub-cli
  1. Which node is requested to start the task
  2. Which shared datasets are used
  3. What kind of private computing tasks to do
 
In this example, primihub-cli will use the default parameters to request an ABY3 tripartite logistic regression test task from *** node 0 ***. For the parameters that can be specified by cli, please refer to *** [Create Task](../docs/advance-usage/create-tasks/cli-params) ***

:::



## Core Features
 In addition to the above MPC case, Primihub also supports Federated Learning, Privacy Intersection (PSI), and Privacy Inquiry (PIR) features, see Primihub for details [Core Features](../docs/core-concept/model) 

## Advanced use
  To learn how to start from native apps and how to use Primihub features to implement more apps, see [Advanced use](../docs/advance-usage/start-nodes)

## Developer
  For code compilation and how to contribute code, see [Build](../docs/developer-docs/build)


