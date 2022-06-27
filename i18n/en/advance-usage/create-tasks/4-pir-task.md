---
sidebar_position: 4
---


# Privacy Inquiry (PIR) Task

*** Parameter description for submitting PIR tasks ***

To create a privacy query (PIR) task, you need to use the following parameter combination `--task_type=2`, and specify the index and server-side datasets to query through the `params` parameter, and the `input_datasets` parameter to specify which of the `params` parameters are data set.

If it is started through docker-compose, execute `docker exec -it node0_primihub bash` to enter the *node0_primihub* container and execute the following command:

```bash
./primihub-cli --task_type=2 --params="queryIndeies:STRING:0:11,serverData:STRING:0:pir_server_data,outputFullFilename:STRING:0:/data/result/pir5.csv" --input_datasets="serverData"
```

If the compilation is started locally, execute the following command in the code root directory after compilation:

```bash
./bazel-bin/cli --task_type=2 --params="queryIndeies:STRING:0:11,serverData:STRING:0:pir_server_data,outputFullFilename:STRING:0:/data/result/pir5.csv" --input_datasets="serverData"
```
## Parameter Description

| Parameter| Type of Data | Parameter Example | Parameter Description
| ---- | ---- | ---- | ---- |
| params.queryIndeies | STRING | 11 | Indicates that the index value of the retrieved PIR database is 11 data records, and the index value cannot exceed the number of records in the database, otherwise an error occurs. (The current version of PIR supports a fixed pir database of 20 records. It supports multiple indexes in one request, and the index values are separated by commas. Since commas are used to separate parameters in the current command line request, the command line startup task only contains 1 index value.)|
| params.serverData | STRING | pir_server_data | The parameter value is the server data identifier of the PIR service. The system scheduling node finds the worker node that registers the corresponding data through the data identifier, and the PIR client node will send an anonymous query request to this node. The PIR server loads the file corresponding to the identifier to generate the PIR database. (The scheduling node in the pir service is the client node of the PIR service by default. In the use case, the data is registered in the node *node1*, the corresponding configuration file in the *config* directory is primihub_node1.yaml, add the data storage path, and set the *description* of the data to" "pir_server_data", as the data identifier. The user can set the identifier independently, and the parameter value in the request task is consistent with the identifier in the configuration file) |
| params.outputFullFilename | STRING | /data/result/pir5.csv | Specify the file name and the absolute path of the directory where the PIR anonymous query result saves the file.|
