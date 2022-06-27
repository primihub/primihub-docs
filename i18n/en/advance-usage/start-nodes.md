---
sidebar_position: 1
---

# Start Nodes

 *** Start a node for testing from a native application *** 
 
## Run Boostrap Node

```bash
$ git clone https://github.com/primihub/simple-bootstrap-node.git && cd simple-bootstrap-node
$ go mod tidy
$ go run main.go
```

## Run Node

  First download the primihub source code and compile it, see[developer docs-build](docs/../../developer-docs/build)

  In the root directory of the code after compilation, run in the three terminals respectively
  
  ```bash
  $ ./bazel-bin/node --node_id=node0 --service_port=50050 --config=./config/node0.yaml
  ```
  ```bash
  $ ./bazel-bin/node --node_id=node1 --service_port=50051 --config=./config/node1.yaml
  ```
  ```bash
  $ ./bazel-bin/node --node_id=node2 --service_port=50052 --config=./config/node2.yaml
  ```

:::tip Connect custom data

  The yaml configuration file specified by --config can connect custom data, see [Connect datasource](docs/../connect-datasource)

:::

TODO