---
sidebar_position: 10
description: 横向联邦学习介绍及其应用场景
keywords: [横向联邦学习, 横向联邦应用场景, Homo LR, Primihub SDK Demo]
---
# 横向联邦学习

## Example

```python
# Using Python sdk client： home lr
import logging

import primihub as ph
from primihub import context
from primihub.FL.model.logistic_regression.homo_lr import run_homo_lr_host, run_homo_lr_guest, run_homo_lr_arbiter
from primihub.client import primihub_cli as cli

# client init
cli.init(config={"node": "your primihub node address:50050", "cert": ""})


def get_logger(name):
    LOG_FORMAT = "[%(asctime)s][%(filename)s:%(lineno)d][%(levelname)s] %(message)s"
    DATE_FORMAT = "%m/%d/%Y %H:%M:%S %p"
    logging.basicConfig(level=logging.DEBUG,
                        format=LOG_FORMAT,
                        datefmt=DATE_FORMAT)
    logger = logging.getLogger(name)
    return logger

task_params = {}
logger = get_logger("Homo-LR")


@ph.context.function(role='arbiter', protocol='lr', datasets=['breast_0'], port='9010', task_type="lr-train")
def run_arbiter_party():
    role_node_map = ph.context.Context.get_role_node_map()
    node_addr_map = ph.context.Context.get_node_addr_map()
    dataset_map = ph.context.Context.dataset_map
    data_key = list(dataset_map.keys())[0]

    logger.debug(
        "role_nodeid_map {}".format(role_node_map))

    logger.debug(
        "dataset_map {}".format(dataset_map))

    logger.debug(
        "node_addr_map {}".format(node_addr_map))

    run_homo_lr_arbiter(role_node_map, node_addr_map, data_key)

    logger.info("Finish homo-LR arbiter logic.")


@ph.context.function(role='host', protocol='lr', datasets=['breast_1'], port='9020', task_type="lr-train")
def run_host_party():
    role_node_map = ph.context.Context.get_role_node_map()
    node_addr_map = ph.context.Context.get_node_addr_map()
    dataset_map = ph.context.Context.dataset_map

    logger.debug(
        "dataset_map {}".format(dataset_map))
    data_key = list(dataset_map.keys())[0]

    logger.debug(
        "role_nodeid_map {}".format(role_node_map))

    logger.debug(
        "node_addr_map {}".format(node_addr_map))
    logger.info("Start homo-LR host logic.")

    run_homo_lr_host(role_node_map, node_addr_map, data_key)

    logger.info("Finish homo-LR host logic.")


@ph.context.function(role='guest', protocol='lr', datasets=['breast_2'], port='9030', task_type="lr-train")
def run_guest_party():
    role_node_map = ph.context.Context.get_role_node_map()
    node_addr_map = ph.context.Context.get_node_addr_map()
    dataset_map = ph.context.Context.dataset_map

    logger.debug(
        "dataset_map {}".format(dataset_map))

    data_key = list(dataset_map.keys())[0]
    logger.debug(
        "role_nodeid_map {}".format(role_node_map))

    logger.debug(
        "node_addr_map {}".format(node_addr_map))
    logger.info("Start homo-LR guest logic.")

    run_homo_lr_guest(role_node_map, node_addr_map, datakey=data_key)

    logger.info("Finish homo-LR guest logic.")


cli.async_remote_execute((run_host_party, ), (run_guest_party, ))

```
