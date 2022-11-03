---
sidebar_position: 1
keywords: [bootstrap]
description: Start the PrimiHub node manually
---

# Bootstrap Nodes

 *** Start the test node via a Golang application *** 
 
## Running the Bootstrap Nodes

```bash
git clone https://github.com/primihub/simple-bootstrap-node.git && cd simple-bootstrap-node
go mod tidy
go run main.go
```

## Run Node

First download the Primihub source code and compile it，see the [Developer Documentation-Code Compilation](docs/../../developer-docs/build).

Run it in three different terminals from the root directory:

```bash
./bazel-bin/node --node_id=node0 --service_port=50050 --config=./config/node0.yaml
```

```bash
./bazel-bin/node --node_id=node1 --service_port=50051 --config=./config/node1.yaml
```

```bash
./bazel-bin/node --node_id=node2 --service_port=50052 --config=./config/node2.yaml
```

:::tip Connect custom data
You could use the flag `--config` to specific a custom data by a YAML configuration file, see also [connect datasource](docs/../connect-datasource).
:::

