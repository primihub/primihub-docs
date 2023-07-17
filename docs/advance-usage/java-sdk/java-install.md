---
sidebar_position: 0
---

# 安装
## 本地安装
***如何安装***

### 下载

```bash
git clone https://github.com/primihub/primihub-platform.git
```

### 编译安装

参考[编译说明](/docs/developer-docs/privacy-platform/privacy-platform-service#编译打包)

## maven 安装

primihub-sdk 工程包持续向maven中央仓库推送[检索地址](https://s01.oss.sonatype.org/#nexus-search;quick~primihub-sdk)

primihub-sdk maven引入代码
```xml
    <dependency>
        <groupId>com.primihub</groupId>
        <artifactId>primihub-sdk</artifactId>
        <version>${primihub.version}</version>
    </dependency>
```