---
sidebar_position: 3
---


# Privacy Inquiry (PSI) Task

*** Parameter description for submitting PSI tasks ***

To create a Privacy Intersection (PSI) task, you need to use the following parameter combination `--task_type=3`, and specify the client data set and server data set to be submitted through the `params` parameter, and the `input_datasets` parameter to specify the `params` parameter Which of the are datasets.

If it is started through docker-compose, execute `docker exec -it node0_primihub bash` to enter the node0_primihub container and execute the following command:

```bash
./primihub-cli --task_type=3 --params="clientData:STRING:0:psi_client_data,serverData:STRING:0:psi_server_data，clientIndex:INT32:0:0,serverIndex:INT32:0:1,psiType:INT32:0:0,outputFullFilename:STRING:0:/data/result/psi_result.csv" --input_datasets="clientData,serverData"
```

If the compilation is started locally, execute the following command in the code root directory after compilation:

```bash
./bazel-bin/cli --task_type=3 --params="clientData:STRING:0:psi_client_data,serverData:STRING:0:psi_server_data，clientIndex:INT32:0:0,serverIndex:INT32:0:1,psiType:INT32:0:0,outputFullFilename:STRING:0:/data/result/psi_result.csv" --input_datasets="clientData,serverData"
```
## Parameter Description

| Parameter| type of data | Parameter example | Parameter Description
| ---- | ---- | ---- | ---- |
| params.clientData | STRING | psi_client_data | The parameter value is the client data identifier of the PSI service, and the system scheduling node uses the identifier to find the worker node that registers the data, and sends the PSI task to the worker node. (Currently in the use case, the client data is registered in *node1*, the configuration file in the config directory is primihub_node1.yaml, add the data storage path, set the description of the data to "psi_client_data", as the data identifier. The identifier is determined by the user Independent settings, the parameter values in the request task are consistent with the values in the configuration file)|
| params.serverData | STRING | psi_server_data | The parameter value is the server data identifier of the PSI service. The system scheduling node uses this identifier to find the worker node that registered the data, and the psi client node will send a privacy handover request to this node. (In the use case, the data is registered to the node *node2*, and the data registration method is the same as the description of the *params.clientData* parameter description)|
| params.psiType | INT32 | 0或者1 | 0 indicates that the psi task is to find the intersection of data, and 1 indicates that the PSI task is to find the difference of the data.|
| params.clientIndex | INT32 | 0 | Indicates that the psi customer service terminal uses the column data of the customer service terminal data in tabular form for intersection, and the value range of this parameter [0, file maximum column -1]. |
| params.serverIndex | INT32 | 1 | Indicates that the PSI server uses the column data of the server data in tabular form for intersection, and the value range of this parameter [0, file maximum column -1]. |
| params.outputFullFilename | STRING | "/data/result/psi_result.csv" | Specify the file name of the PSI result save file and the absolute path of the file storage directory. |

