---
sidebar_position: 4
---


# PIR Task

*** PIR Task Parameters Description ***

If starting locally, run the following command from the compiled root directory,if starting with docker-compose, enter the primihub-node0 container by running`docker exec -it primihub-node0 bash` ，and run the following command：

```bash
./primihub-cli --task_config_file="example/keyword_pir_task_conf.json"
```

Observe the logs of `node0`and`node1` respectively,and the following output means that the task runs successfully. Refer to the result file path in the parameter description to verify whether the generated result file is correct.

```
node0:
···
I20230614 18:19:30.339798    49 node.cc:749] start to schedule task, task_type: 2
I20230614 18:19:30.339884    49 node.cc:1069]  🤖️ Start create worker node0 worker id: 3d1b4923-648e-4613-b244-b8ae168437be
I20230614 18:19:30.339934    49 node.cc:1073]  🤖️ Fininsh create worker node0 worker id: 3d1b4923-648e-4613-b244-b8ae168437be
I20230614 18:19:30.339969    49 node.cc:756] insert worker id: 3d1b4923-648e-4613-b244-b8ae168437be into task_scheduler_map_
E20230614 18:19:30.340076    49 proto_parser.cc:56] party_datasets: 1
I20230614 18:19:30.340148    49 parser.cc:78] Finding meta list from datasets...
I20230614 18:19:30.365765    49 parser.cc:83] Find meta list from datasets: 1
I20230614 18:19:30.365887    49 parser.cc:87] end of MergePartyAccessInfo
I20230614 18:19:30.366051    49 pir_scheduler.cc:91] begin to Dispatch SubmitTask to PIR task party node ...
I20230614 18:19:30.366122    49 pir_scheduler.cc:100] Dispatch SubmitTask to PIR party node: node1:primihub-node1:50051:0: party_name: SERVER
I20230614 18:19:30.366313    49 pir_scheduler.cc:100] Dispatch SubmitTask to PIR party node: node0:primihub-node0:50050:0: party_name: CLIENT
I20230614 18:19:30.366684    63 pir_scheduler.cc:56] dest node node1:primihub-node1:50051:0:
I20230614 18:19:30.366724    64 pir_scheduler.cc:56] dest node node0:primihub-node0:50050:0:
I20230614 18:19:30.371186    62 node.cc:848] start to create worker for task: job_id : 100 task_id: 200 request id: 3d1b4923-648e-4613-b244-b8ae168437be
I20230614 18:19:30.371254    62 node.cc:1069]  🤖️ Start create worker node0 worker id: 3d1b4923-648e-4613-b244-b8ae168437be
I20230614 18:19:30.371296    62 node.cc:1073]  🤖️ Fininsh create worker node0 worker id: 3d1b4923-648e-4613-b244-b8ae168437be
I20230614 18:19:30.371521    62 node.cc:858] create worker thread future for task: job_id : 100 task_id: 200 request id: 3d1b4923-648e-4613-b244-b8ae168437be finished
I20230614 18:19:30.371630    66 node.cc:821] begin to execute task
I20230614 18:19:30.374213    65 worker.cc:122] Request id: 3d1b4923-648e-4613-b244-b8ae168437be update party: CLIENT status to: RUNNING
I20230614 18:19:30.374786    66 worker.cc:61] Worker::execute task type: 2
I20230614 18:19:30.374992    66 worker.cc:70] Worker start execute task 
I20230614 18:19:30.375034    62 node.cc:875] create worker thread for task: job_id : 100 task_id: 200 request id: 3d1b4923-648e-4613-b244-b8ae168437be finished
I20230614 18:19:30.376495    67 worker.cc:122] Request id: 3d1b4923-648e-4613-b244-b8ae168437be update party: SERVER status to: RUNNING
I20230614 18:19:30.385742    66 receiver.cpp:159] Created OPRFReceiver for 3 items
I20230614 18:19:30.575682    66 receiver.cpp:229] Creating encrypted query for 3 items
I20230614 18:19:30.666715    66 receiver.cpp:353] Finished creating encrypted query
I20230614 18:19:30.726406    72 worker.cc:119] collected finished party count: 1
I20230614 18:19:30.726450    72 worker.cc:122] Request id: 3d1b4923-648e-4613-b244-b8ae168437be update party: SERVER status to: SUCCESS
I20230614 18:19:30.727962    66 receiver.cpp:581] Processing 1 result parts
I20230614 18:19:30.732764    66 receiver.cpp:616] Found 3 matches
I20230614 18:19:30.733783    73 worker.cc:119] collected finished party count: 2
I20230614 18:19:30.733834    73 worker.cc:122] Request id: 3d1b4923-648e-4613-b244-b8ae168437be update party: CLIENT status to: SUCCESS
I20230614 18:19:36.976497    47 node.cc:118] number of timeout task status need to earse: 1


node1:
···
I20230614 18:19:30.372288    58 node.cc:848] start to create worker for task: job_id : 100 task_id: 200 request id: 3d1b4923-648e-4613-b244-b8ae168437be
I20230614 18:19:30.372376    58 node.cc:1069]  🤖️ Start create worker node1 worker id: 3d1b4923-648e-4613-b244-b8ae168437be
I20230614 18:19:30.372438    58 node.cc:1073]  🤖️ Fininsh create worker node1 worker id: 3d1b4923-648e-4613-b244-b8ae168437be
I20230614 18:19:30.372689    58 node.cc:858] create worker thread future for task: job_id : 100 task_id: 200 request id: 3d1b4923-648e-4613-b244-b8ae168437be finished
I20230614 18:19:30.372799    61 node.cc:821] begin to execute task
I20230614 18:19:30.377077    61 worker.cc:61] Worker::execute task type: 2
I20230614 18:19:30.377228    61 keyword_pir_server_task.cc:107] enter KeywordPIRServerTask ctr
I20230614 18:19:30.377333    61 keyword_pir_server_task.cc:109] exit KeywordPIRServerTask ctr
I20230614 18:19:30.377377    61 worker.cc:70] Worker start execute task 
I20230614 18:19:30.377425    58 node.cc:875] create worker thread for task: job_id : 100 task_id: 200 request id: 3d1b4923-648e-4613-b244-b8ae168437be finished
I20230614 18:19:30.402772    61 sender_db.cpp:767] Start inserting 50 items in SenderDB
I20230614 18:19:30.436977    61 sender_db.cpp:829] Found 50 new items to insert in SenderDB
I20230614 18:19:30.442929    61 sender_db.cpp:372] Launching 1 insert-or-assign worker tasks
I20230614 18:19:30.452275    61 sender_db.cpp:395] Finished insert-or-assign worker tasks
I20230614 18:19:30.452469    61 sender_db.cpp:699] Start generating bin bundle caches
I20230614 18:19:30.559722    61 sender_db.cpp:707] Finished generating bin bundle caches
I20230614 18:19:30.559908    61 sender_db.cpp:851] Finished inserting 50 items in SenderDB
I20230614 18:19:30.563670    61 sender_db.cpp:740] SenderDB has been stripped
I20230614 18:19:37.850311    56 node.cc:118] number of timeout task status need to earse: 1
```

## Parameter Description
| parameter| data type | example | parameter description
| ---- | ---- | ---- | ---- |
| params.clientData | STRING | HXfUhjJ... | indicates the need to retrieve the keyword records in the pir database, (for each keyword query as a separate record, support multiple keyword queries at the same time), after the task is launched, through this logo to obtain the corresponding client node data configuration and load the data, the use case data registered to the node node1, in the config directory corresponding to the configuration file for primihub_node1.yaml, set the data as "keyword_pir_server_data" corresponding to the string contained in the file |
| params.pirType | INT32 | 1或0 | 1: keyword-based steganographic query, 0: ID-based |
| params.outputFullFilename | STRING | "data/result/pir_result.csv" | Specify the path to the file where the results are saved |
| party_datasets | STRING | "keyword_pir_server_data" | The value of this parameter is the server-side data identifier of the pir service, the system scheduling node finds the working node that registers the corresponding data through the data identifier, and the pir client node will send a stash query request to this node. pir server loads the file corresponding to this identifier to generate the pir database |

