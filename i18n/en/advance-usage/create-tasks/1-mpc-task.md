---
sidebar_position: 1
---


# MPC Task

*** Parameter description of submitted MPC tasks ***

To create an MPC task, you need to use the following parameter combination `--task_lang=proto --task_type=0`, and specify the MPC algorithm by defining the `task_code` parameter.
The `params` specifies the input parameters for algorithm execution, and the `input_datasets` specifies which parameters in the `params` are the input datasets.

For example, Start an MPC logistic regression task:

If it is started through docker-compose, execute `docker exec -it node0_primihub bash` to enter the *node0_primihub* container and execute the following command:

```bash
./primihub-cli --task_lang=proto --task_type=0 --task_code="logistic_regression" --params="BatchSize:INT32:0:128,NumIters:INT32:0:100,TrainData:STRING:0:train_party_0;train_party_1;train_party_2,TestData:STRING:0:test_party_0;test_party_1;test_party_2"
```

If the compilation is started locally, execute the following command in the code root directory after compilation:

```bash
./bazel-bin/cli --task_lang=proto --task_type=0 --task_code="logistic_regression" --params="BatchSize:INT32:0:128,NumIters:INT32:0:100,TrainData:STRING:0:train_party_0;train_party_1;train_party_2,TestData:STRING:0:test_party_0;test_party_1;test_party_2"
```

In the above example, the parameter names supported by the algorithm are defined in `--params`, `input_datasets` needs to define `TrainData` `TestData` in params is the dataset used, each of these two parameters has 3 data sets participating in this calculation task.

The supported algorithm types:

| task code | Parameter |
| ---- | ---- |
| logistic_regression | BatchSize: data size NumIters：number of iterations TrainData: training dataset TestData: test dataset |

