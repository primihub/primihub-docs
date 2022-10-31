---
sidebar_position: 2
---

# 使用k8s部署

### 要求

- 拥有一个k8s集群
- 安装了helm，版本3.1以上，如未安装可通过 [这里](https://github.com/helm/helm/releases) 下载对应版本
- 确认集群存在默认的StorageClass（执行kubectl get sc 获取的结果中，结果中含有'(default)'配置，示例如下）

```bash
# kubectl get sc
NAME                            PROVISIONER      RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
managed-nfs-storage (default)   fuseim.pri/ifs   Delete          Immediate           false                  19d
```

### 开始安装

```bash
git clone https://github.com/primihub/primihub-deploy.git
cd k8s-deploy
export NAMESPACE="修改为你的namespace"
bash primihub_deploy
```

执行完成后请耐心等待，镜像下载、数据初始化、服务启动等需要一点时间

:::tip
目前配置中指定了platform的nodePort端口，如需在一个集群多个namespace下部署，请自行修改 charts/platformchart/templates/platform-svc.yaml 文件第3行的端口
:::

### 查看部署结果

```bash
# kubectl get pod -n "你的namespace"
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

### 使用说明

所有服务启动完成后在浏览器分别访问

http://k8s集群的任意一台机器的IP:30801

http://k8s集群的任意一台机器的IP:30802

http://k8s集群的任意一台机器的IP:30803

3 个管理后台模拟 3 个机构，默认用户密码都是 admin / 123456

管理后台的具体操作步骤请参考 [快速试用管理平台](/docs/quick-start-platform)

### 删除服务

执行以下脚本，将删除以上安装的所有服务
```bash
bash primihub_delete.sh
```

### k8s操作常用命令

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