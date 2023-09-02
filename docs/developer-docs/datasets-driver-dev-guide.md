---
sidebar_position: 3
keywords: [datasets, PrimiHub]
description: PrimiHub 扩展不同访问方式的数据源
---

# 如何接入自己的数据源类型
当前PrimiHub支持的数据源类型有csv，mysql以及sqlite，对于其他数据类型的数据源则需要扩展实现新的Driver

## 实现Driver类
```cpp
class XXXDriver : public DataDriver,
                  public std::enable_shared_from_this<XXXDriver> {
 public:
  XXXDriver() = default;
  std::unique_ptr<Cursor> read() override;
  [[deprecated("use GetCursor instead")]]
  std::unique_ptr<Cursor> read(const std::string &con_str) override;
  std::unique_ptr<Cursor> GetCursor() override;
  std::unique_ptr<Cursor> GetCursor(const std::vector<int>& col_index) override;
  std::unique_ptr<Cursor> initCursor(const std::string &conn_str) override;
  std::string getDataURL() const override;
};
```

## 实现Cursor类
Cursor表示一个对数据源类型读取的实例，真正实现对数据源的读取和写入
```cpp
class XXXCursor : public Cursor {
 public:
  XXXCursor();
  std::shared_ptr<Dataset> readMeta() override;
  std::shared_ptr<Dataset> read() override;
  std::shared_ptr<Dataset> read(const std::shared_ptr<arrow::Schema>& data_schema) override;
  std::shared_ptr<Dataset> read(int64_t offset, int64_t limit) override;
  int write(std::shared_ptr<Dataset> dataset) override;
  void close() override;
};

```

## 实现数据源访问信息DataAccessInfo类
AccessInfo中保存了当前数据源的访问方式
```cpp
struct XXXAccessInfo : public DataSetAccessInfo {
  XXXAccessInfo() = default;
  std::string toString() override;
  retcode fromJsonString(const std::string& access_info) override;
  retcode ParseFromJsonImpl(const nlohmann::json& access_info) override;
  retcode ParseFromYamlConfigImpl(const YAML::Node& meta_info) override;
  retcode ParseFromMetaInfoImpl(const DatasetMetaInfo& meta_info) override;
};
```

## 将Driver注册到Factory中
```cpp
// 将新增的driver加入到生成driver的工厂中
class DataDirverFactory;

```
