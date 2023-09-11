---
title: 如何贡献
id: contribute
slug: /contribute
sidebar_position: 11
sidebar_label: 如何贡献

---

欢迎加入 PrimiHub 开源社区，这里将介绍 **如何为 PrimiHub 做贡献**。

## 一、贡献方式

参与贡献的方式主要有 3 种：

1. 反馈问题：GitHub Issue、微信群
2. 贡献代码：Pull Request
3. 编写内容：教程、文档、技术分享

## 二、反馈问题

有价值的问题对于开源社区也是一笔宝贵的财富！

### 2.1 GitHub Issue（推荐）

GitHub 提供的 Issues 功能，可以用来记录、讨论用户反馈的问题，并且已解决的问题也会永久保存，方便后续遇到同样问题的用户找到问题的答案。

> 地址：https://github.com/primihub/primihub/issues

在 Issue 上提问可以**更快地获得技术人员的响应**帮助你解决问题。


<p align="center">
    <img src="/img/docs/contribute/1.png" width='100%'/>
</p>

具体的提问步骤如下：

1. 在提 Issue 前建议先搜索 Issue 历史，查看是否已存在解决方案。
2. 创建 Issue 提出问题
3. 选择问题的类别
    - Bug report：缺陷报告，反馈使用中的问题，遇到的 Bug。
    - Feature request：功能建议，分享你想要添加的功能。
4. 按照 Issue 模板填写相关信息


<p align="center">
    <img src="/img/docs/contribute/2.png" width='40%'/>
</p>



#### 2.1.1 Bug report（缺陷报告）

如果在使用过程中遇到了问题，例如任务报错、失败、异常等，建议提交 Bug report。示例如下：

<p align="center">
    <img src="/img/docs/contribute/3.png" width='70%'/>
</p>

**如何写 Bug report？**
- 包含复现代码、运行环境、（多节点的）报错日志等，方便我们排查错误
- 如果无法提交复现代码，请详细描述报错问题、函数、使用的数据集等信息
- 建议写明版本号、运行环境、操作系统等



#### 2.1.2 Feature request（功能建议）
如果在希望增加新的功能、算法、特性等，建议提交 Feature request。

**如何写 Feature request？**
- 详细描述希望增加的特征、功能
- 为什么需要增加这个特性，有哪些应用场景
- 已有的功能为什么不能满足当前的需求


### 2.2 微信群

扫描二维码添加「PrimiHub 小助手」，小助手会拉你进群。

<p align="center">
    <img src="/img/docs/contribute/4.png" width='20%'/>
</p>

在这里你可以获得技术支持、商务合作及学习交流的机会～  欢迎各位志同道合的小伙伴加入👏

## 三、贡献代码

贡献代码是通过提交 Pull Request（PR）的方式。可以提交新增的算法或功能，或者修复已有的 Bug。

如果不确定的话，可以先提交 Issue 询问想要贡献的代码是否需要，得到肯定的答复后在提交代码。提交 PR 时需拟个合适的标题，添加详细的描述文字，比如新增的功能、修复的 Bug等。


### 3.1 下载项目

<p align="center">
    <img src="/img/docs/contribute/5.png" width='100%'/>
</p>

> PrimiHub 项目地址：https://github.com/primihub/primihub


1. Fork [PrimiHub](https://github.com/primihub/primihub) 仓库到你的账号下
2. 打开命令行，下载你账号下已 fork 的仓库。
```
git clone git@github.com:你的GitHub用户名/primihub.git  # 如果网络慢请添加 --depth 1
cd primihub
```
3. 添加 primihub 远程仓库，保持与主仓库的同步。
```
git remote add upstream git@github.com:primihub/primihub.git
git remote -v  # 检查是否设置成功
```
4. 进行本地编译，详情见[文档](/docs/advance-usage/start/build)


### 3.2 Git 工作流

下载完项目并安装好依赖的环境后，现在就可以进行开发了。

因为是通过 Git 多人协作的方式，所以我们需要遵循统一的 Git 工作流。

1. 首先创建一个新分支
```
git checkout -b my_feature
```
2. 然后可以修改代码，修改完成后使用 `git add` 和 `git commit` 保存修改
```
git add modified_files
git commit -m "description of the changes"
```
3. 保持与主仓库 develop 分支的同步，如有冲突请在本地解决冲突
```
git fetch upstream develop
git merge upstream/develop
```
4. 将修改记录提交到 fork 的仓库
```
git push -u origin my_feature
```

### 3.3 Pull Request

打开 GitHub 提交 PR，可以参考 [GitHub 官方文档](https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)


## 四、贡献内容

## 反馈问题

如果发现问题可以[点击](https://github.com/primihub/primihub-docs/issues/new)反馈问题，我们更欢迎点击当前页面最下面的 **「编辑此页」** 帮助我们修复问题。