---
sidebar_position: 2
---

# Use k8s for deployment

### Requirments

- Have a k8s cluster
- Installed the helm, version 3.1 above, if not installed by [here]](https://github.com/helm/helm/releases) to download the corresponding version
- Make sure there is a default StorageClass for the cluster (kubectl get sc returns a '(default)' configuration, as shown in the following example)

```bash
# kubectl get sc
NAME                            PROVISIONER      RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
managed-nfs-storage (default)   fuseim.pri/ifs   Delete          Immediate           false                  19d
```

### Installation

```bash
git clone https://github.com/primihub/primihub-deploy.git
cd primihub-deploy/k8s-deploy
export NAMESPACE="your namespace"
bash primihub_deploy.sh （or execute python3 deploy.py）
```

After the execution is complete, please be patient for a few minutes, it will take some time for image download, data initialization, service startup, etc

:::tip
Specified in the configuration of the platform nodePort port, if you need in a cluster deployment across multiple namespace, please modify charts/platformchart/templates/platform-svc.yaml file 3 lines of port
:::

### View deployment results

```bash
# kubectl get pod -n "your namespace"
NAME                            READY   STATUS    RESTARTS   AGE
application1-5b4c6b457d-25mfk   1/1     Running   0          5d18h
application2-68446f7887-wjdxp   1/1     Running   0          5d19h
application3-685d7fc7c6-kbnwm   1/1     Running   0          5d19h
fusion-6d6c4d8b9-4q999          1/1     Running   0          5d20h
gateway1-6979f6f9c6-jr4jb       1/1     Running   0          5d18h
gateway2-8d954d4d7-kjhr8        1/1     Running   0          5d18h
gateway3-5d978768bb-wh7v2       1/1     Running   0          5d18h
mysql-0                         1/1     Running   0          5d20h
nacos-7b8f776d46-wdg6j          1/1     Running   0          5d19h
platform1-5d98695485-98rct      1/1     Running   0          5d20h
platform2-59b666ffbb-n4b86      1/1     Running   0          5d20h
platform3-74b9dbcd7f-sqrgp      1/1     Running   0          5d20h
primihubnode-59fbbb554d-grwzb   4/4     Running   0          5d3h
rabbitmq1-55f5b55bb9-c9pqz      1/1     Running   0          5d20h
rabbitmq2-5c9fbbb575-vsktm      1/1     Running   0          5d20h
rabbitmq3-5cd59678cc-jx59r      1/1     Running   0          5d20h
redis-595ff4c87b-ph6n6          1/1     Running   0          5d20h
```

### Instructions 

All services are accessed separately in the browser after they are started

http://IP of any machine in the k8s cluster:30801

http://IP of any machine in the k8s cluster:30802

http://IP of any machine in the k8s cluster:30803

Three management backgrounds simulate three institutions, and the default user, password is admin / 123456

Please refer to [Quick Trial Management Platform](/docs/quick-start-platform) for specific operation steps of management background.

### Remove the service

Executing the following script will remove all the services installed above
```bash
export NAMESPACE="change to the namespace you deploy"
bash primihub_delete.sh
```

### k8s common operation commands

```bash
kubectl get pod -n <namespace> 获取对应的pod信息
kubectl get svc -n <namespace> 获取对应的svc信息
kubectl get cm -n <namespace>  获取对应的configmap信息
kubectl get pvc -n <namespace> 获取对应的pvc信息
kubectl logs -n <namespace> <pod-name> -f --tail=100 查看对应pod-name的日志
kubectl exec -it -n <namespace> <pod-name> bash 进入到对应容器中
helm install <helm-name> -n <namespace>  charts/<chartname>chart  使用helm安装对应chart中的服务
helm uninstall <helm-name> -n <namespace>  卸载使用helm安装的服务
```