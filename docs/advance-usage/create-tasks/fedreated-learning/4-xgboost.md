---
sidebar_position: 4
description: 创建XGBoost任务
keywords: [FL, XGBoost]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# XGBoost

<table>
    <tr>
        <th>联邦学习分类</th>
        <th>训练模式</th>
        <th>隐私计算技术</th>
    </tr>
    <tr>
        <td rowspan="1">纵向联邦</td>
        <td>Paillier</td>
        <td>同态加密</td>
    </tr>
</table>

如果是通过docker方式部署，先执行 `docker exec -it primihub-node0 bash` 进入到 `primihub-node0` 容器中，再执行CLI命令启动。

## 纵向联邦

### Paillier同态模式训练

<Tabs>
<TabItem value="CLI">

```bash
./primihub-cli --task_config_file="example/FL/xgboost/hetero_xgb.json"
```

</TabItem>

<TabItem value="Python SDK">

```bash
submit example/FL/xgboost/hetero_xgb.json
```

</TabItem>
</Tabs>

### 预测

<Tabs>
<TabItem value="CLI">

```bash
./primihub-cli --task_config_file="example/FL/xgboost/hetero_xgb_infer.json"
```

</TabItem>

<TabItem value="Python SDK">

```bash
submit example/FL/xgboost/hetero_xgb_infer.json
```

</TabItem>
</Tabs>
