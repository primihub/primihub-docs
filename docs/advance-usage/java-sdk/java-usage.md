---
sidebar_position: 1
---

# 使用

***如何使用Java SDK***

## 简介

Java SDK是为了让用户能够简单配置后node地址后填充指定的参数即可发起一个PSI、PIR、XGB等任务。具有易上手性、易使用性。

## 任务参数详解

```base
    任务主类
    com.primihub.sdk.task.param.TaskParam       
        requestId           任务的唯一ID
        taskId              任务ID
        jobId               程序顺序
        isSuccess           是否成功
        isEnd               是否结束
        error               任务失败后node的错误信息
        partyCount          任务需等待几个success
        isOpenGetStatus     是否打开提交任务后持续获取任务状态
        taskContentParam    任务类型具体参数实体
        
        
    taskContentParam 任务参数实体
        com.primihub.sdk.task.param.TaskPSIParam
        com.primihub.sdk.task.param.TaskPIRParam
        com.primihub.sdk.task.param.TaskMPCParam
        com.primihub.sdk.task.param.TaskDataSetParam
        com.primihub.sdk.task.param.TaskComponentParam
```

## 发起一个任务

```java
package com.primihub;

import com.primihub.sdk.config.GrpcClientConfig;
import com.primihub.sdk.task.TaskHelper;
import com.primihub.sdk.task.param.TaskPIRParam;
import com.primihub.sdk.task.param.TaskParam;

import java.util.UUID;

public class PrimihubSDK {
    public static void main(String[] args) {
        // 设置node地址信息
        GrpcClientConfig grpcClientConfig = new GrpcClientConfig();
        grpcClientConfig.setAddress("127.0.0.1");
        grpcClientConfig.setPort(50050);
        // 获取任务帮助类
        try {
            TaskHelper taskHelper = TaskHelper.getInstance(grpcClientConfig);
            // 发起一个PIR任务
            TaskParam<TaskPIRParam> taskParam = new TaskParam<>(new TaskPIRParam());
            // 设置taskID
            taskParam.setTaskId(UUID.randomUUID().toString().replace("-",""));
            // 设置PIR参数
            taskParam.getTaskContentParam().setServerData("keyword_pir_server_data");
            taskParam.getTaskContentParam().setQueryParam(
                    new String[]{
                            "SXUiwPmLNohCROXPMZIqbnLrfhCtREPzCiDYZaDghlkfGBCTqyPdqnjoaWzyNzBT",
                            "IGvEVefbEuKPEIEoRxBUhGaiJlbaQqoGtXhzLFdrKMdBpqAkJJOqNvomqPBvBKmL",
                            "nLmrRIMTaYRaeMRoGHcTGumAJsgsGjNKvJkEYgEEspLHDUIaxUtqEdowjDWOjsJn"
                    }
            );
            taskParam.getTaskContentParam().setOutputFullFilename("/data/result/pir_sdk_result.csv");
            // 提交任务 - 阻塞持续获取任务状态
            taskHelper.submit(taskParam);
        }catch (Exception e){
            System.out.println("错误信息:");
            e.printStackTrace();
        }
    }
}

```
