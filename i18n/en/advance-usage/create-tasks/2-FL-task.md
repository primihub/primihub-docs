---
sidebar_position: 2
---


# Federated Learning Task

*** Parameter description for submitting a federated learning task ***

To create a federated learning task, you need to use the following parameter combination `--task_lang=python --task_type=0`, and specify the federated learning python code by defining the `task_code` parameter.


For example, start a federated learning xgboost task:

If it is started through docker-compose, execute `docker exec -it node0_primihub bash` to enter the *node0_primihub* container and execute the following command:

```bash
$ ./primihub-cli --task_lang=python --task_type=0 --task_code="./primihub_python/primihub/examples/disxgb.py"
```

If the compilation is started locally, execute the following command in the code root directory after compilation:

```bash
$ ./bazel-bin/cli --task_lang=python --task_type=0 --task_code="./python/primihub/examples/disxgb.py"
```

In the python file, algorithm developers can use the primihub python api to specify:
* dataset used
* The security protocol used by the algorithm

The key APIs are as follows:
```python
import primihub as ph

ph.dataset.define("guest_dataset")
ph.dataset.define("label_dataset")

@ph.function(role='host', protocol='xgboost', datasets=["label_dataset"])
def xgb_host_logic():
  print("start xgb host logic...")
  ...

@ph.function(role='guest', protocol='xgboost', datasets=["guest_dataset"])
def xgb_guest_logic():
  print("start xgx guest logic...")
  ...
  
```
