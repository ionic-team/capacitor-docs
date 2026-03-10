---
title: 文件系统 Capacitor 插件 API
description: 文件系统 API 提供了类似 NodeJS 的 API，用于在设备上处理文件。
custom_edit_url: https://github.com/ionic-team/capacitor-filesystem/blob/main/packages/capacitor-plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-filesystem/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: 文件系统
---

# @capacitor/filesystem

文件系统 API 提供了类似 NodeJS 的 API，用于在设备上处理文件。

## 安装

```bash
npm install @capacitor/filesystem
npx cap sync
```

## Apple 隐私清单要求

Apple 要求应用开发者现在必须指定 API 使用批准理由以增强用户隐私。到 2024 年 5 月 1 日，向 App Store Connect 提交应用时必须包含这些理由。

在您的应用中使用此特定插件时，您必须在 `/ios/App` 中创建 `PrivacyInfo.xcprivacy` 文件或使用 VS Code 扩展生成它，指定使用理由。

有关如何执行此操作的详细步骤，请参阅 [Capacitor 文档](https://capacitorjs.com/docs/ios/privacy-manifest)。

**对于此插件，必需的字典键是 [NSPrivacyAccessedAPICategoryFileTimestamp](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278393)，推荐的理由是 [C617.1](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278393)。**

### PrivacyInfo.xcprivacy 示例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>NSPrivacyAccessedAPICategoryFileTimestamp</key>
    <array>
      <dict>
        <key>NSPrivacyAccessedAPIType</key>
        <string>C617.1</string>
        <key>NSPrivacyAccessedAPIReasons</key>
        <array>
          <string>CA92.1</string>
        </array>
      </dict>
    </array>
  </dict>
</plist>
```

## 目录

<docgen-index>

* [`readFile(...)`](#readfile)
* [`writeFile(...)`](#writefile)
* [`appendFile(...)`](#appendfile)
* [`deleteFile(...)`](#deletefile)
* [`mkdir(...)`](#mkdir)
* [`rmdir(...)`](#rmdir)
* [`readdir(...)`](#readdir)
* [`getUri(...)`](#geturi)
* [`stat(...)`](#stat)
* [`rename(...)`](#rename)
* [`copy(...)`](#copy)
* [Interfaces](#interfaces)
* [Enums](#enums)

</docgen-index>

## API

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### readFile(...)

```typescript
readFile(options: ReadFileOptions) => Promise<ReadFileResult>
```

读取文件到内存中

| Param         | Type                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#readfileoptions">ReadFileOptions</a></code>     |

**Returns:** <code>Promise&lt;<a href="#readfileresult">ReadFileResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### writeFile(...)

```typescript
writeFile(options: WriteFileOptions) Promise<void>
```

将数据写入文件

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#writefileoptions">WriteFileOptions</a></code>     |

**Since:** 1.0.0

--------------------


### appendFile(...)

```typescript
appendFile(options: AppendFileOptions) => Promise<void>
```

将数据追加到文件

| Param         | Type                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#appendfileoptions">AppendFileOptions</a></code>     |

**Since:** 1.0.0

--------------------


### deleteFile(...)

```typescript
deleteFile(options: DeleteFileOptions) => Promise<void>
```

删除文件

| Param         | Type                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#deletefileoptions">DeleteFileOptions</a></code>     |

**Since:** 1.0.0

--------------------


### mkdir(...)

```typescript
mkdir(options: MkdirOptions) => Promise<void>
```

创建目录

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#mkdiroptions">MkdirOptions</a></code>     |

**Since:** 1.0.0

--------------------


### rmdir(...)

```typescript
rmdir(options: RmdirOptions) => Promise<void>
```

删除目录

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#rmdiroptions">RmdirOptions</a></code>     |

**Since:** 1.0.0

--------------------


### readdir(...)

```typescript
readdir(options: ReaddirOptions) => Promise<ReaddirResult>
```

返回目录中的文件和目录列表

| Param         | Type                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#readdiroptions">ReaddirOptions</a></code>       |

**Returns:** <code>Promise&lt;<a href="#readdirresult">ReaddirResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### getUri(...)

```typescript
getUri(options: GetUriOptions) => Promise<GetUriResult>
```

获取文件 URI

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#geturioptions">GetUriOptions</a></code>  |

**Returns:** <code>Promise&lt;<a href="#geturiresult">GetUriResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### stat(...)

```typescript
stat(options: StatOptions) => Promise<StatResult>
```

返回文件或目录元数据对象

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#statoptions">StatOptions</a></code>      |

**Returns:** <code>Promise&lt;<a href="#statresult">StatResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### rename(...)

```typescript
rename(options: RenameOptions) => Promise<void>
```

重命名文件或目录

| Param         | Type                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#renameoptions">RenameOptions</a></code>     |

**Since:** 1.0.0

--------------------


### copy(...)

```typescript
copy(options: CopyOptions) => Promise<void>
```

将文件或目录复制到新路径

| Param         | Type                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code>     |

**Since:** 1.0.0

--------------------


### Interfaces


#### ReadFileOptions

| Prop          | Type                                      | Description                       | Default  | Since |
| ------------- | ----------------------------------------- | --------------------------------- | -------- | ----- |
| **`path`**    | <code>string</code>                       | 文件或目录的路径                  |          | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 目录操作                          |          | 1.0.0 |
| **`encoding`** | <code><a href="#encoding">Encoding</a></code> | 编码，默认为 utf8                | <code>utf8</code> | 1.0.0 |


#### ReadFileResult

| Prop       | Type                | Description  | Since |
| ---------- | ------------------- | ------------ | ----- |
| **`data`** | <code>string</code> | 文件的数据   | 1.0.0 |


#### WriteFileOptions

| Prop           | Type                                      | Description                    | Default  | Since |
| -------------- | ----------------------------------------- | ------------------------------ | -------- | ----- |
| **`path`**     | <code>string</code>                       | 文件或目录的路径               |          | 1.0.0 |
| **`data`**     | <code>string</code>                       | 要写入的数据                   |          | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 目录操作                       |          | 1.0.0 |
| **`encoding`** | <code><a href="#encoding">Encoding</a></code> | 编码，默认为 utf8              | <code>utf8</code> | 1.0.0 |
| **`recursive`** | <code>boolean</code>                      | 如果路径不存在则创建           | <code>false</code> | 1.0.0 |


#### AppendFileOptions

| Prop           | Type                                      | Description                    | Default  | Since |
| -------------- | ----------------------------------------- | ------------------------------ | -------- | ----- |
| **`path`**     | <code>string</code>                       | 文件或目录的路径               |          | 1.0.0 |
| **`data`**     | <code>string</code>                       | 要追加的数据                   |          | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 目录操作                       |          | 1.0.0 |
| **`encoding`** | <code><a href="#encoding">Encoding</a></code> | 编码，默认为 utf8              | <code>utf8</code> | 1.0.0 |


#### DeleteFileOptions

| Prop           | Type                                      | Description | Default  | Since |
| -------------- | ----------------------------------------- | ----------- | -------- | ----- |
| **`path`**     | <code>string</code>                       | 文件的路径  |          | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 目录操作    |          | 1.0.0 |


#### MkdirOptions

| Prop           | Type                                      | Description                        | Default  | Since |
| -------------- | ----------------------------------------- | ---------------------------------- | -------- | ----- |
| **`path`**     | <code>string</code>                       | 要创建的目录的路径                 |          | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 目录操作                          |          | 1.0.0 |
| **`recursive`** | <code>boolean</code>                      | 如果路径不存在则创建               | <code>false</code> | 1.0.0 |


#### RmdirOptions

| Prop           | Type                                      | Description                  | Default  | Since |
| -------------- | ----------------------------------------- | ---------------------------- | -------- | ----- |
| **`path`**     | <code>string</code>                       | 目录的路径                   |          | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 目录操作                    |          | 1.0.0 |
| **`recursive`** | <code>boolean</code>                      | 如果目录非空则递归删除       | <code>false</code> | 1.0.0 |


#### ReaddirOptions

| Prop           | Type                                      | Description | Default  | Since |
| -------------- | ----------------------------------------- | ----------- | -------- | ----- |
| **`path`**     | <code>string</code>                       | 目录的路径  |          | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 目录操作    |          | 1.0.0 |


#### ReaddirResult

| Prop      | Type                  | Description                    | Since |
| --------- | --------------------- | ------------------------------ | ----- |
| **`files`** | <code>string[]</code> | 目录中的文件和目录名称数组     | 1.0.0 |


#### GetUriOptions

| Prop           | Type                                      | Description | Default  | Since |
| -------------- | ----------------------------------------- | ----------- | -------- | ----- |
| **`path`**     | <code>string</code>                       | 文件的路径  |          | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 目录操作    |          | 1.0.0 |


#### GetUriResult

| Prop     | Type                | Description           | Since |
| -------- | ------------------- | --------------------- | ----- |
| **`uri`** | <code>string</code> | 文件的 URI 表示       | 1.0.0 |


#### StatOptions

| Prop           | Type                                      | Description | Default  | Since |
| -------------- | ----------------------------------------- | ----------- | -------- | ----- |
| **`path`**     | <code>string</code>                       | 文件的路径  |          | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 目录操作    |          | 1.0.0 |


#### StatResult

| Prop           | Type                 | Description                        | Since |
| -------------- | -------------------- | ---------------------------------- | ----- |
| **`type`**     | <code>string</code>  | 文件类型                          | 1.0.0 |
| **`size`**     | <code>number</code>  | 文件大小（字节）                  | 1.0.0 |
| **`ctime`**    | <code>number</code>  | 创建时间（Unix 时间戳）            | 1.0.0 |
| **`mtime`**    | <code>number</code>  | 修改时间（Unix 时间戳）            | 1.0.0 |
| **`uri`**      | <code>string</code>  | 文件的 URI 表示                    | 1.0.0 |


#### RenameOptions

| Prop        | Type                | Description                | Since |
| ----------- | ------------------- | -------------------------- | ----- |
| **`from`**  | <code>string</code> | 文件或目录的当前路径       | 1.0.0 |
| **`to`**    | <code>string</code> | 文件或目录的新路径         | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 目录操作 | 1.0.0 |


#### CopyOptions

| Prop        | Type                | Description                | Since |
| ----------- | ------------------- | -------------------------- | ----- |
| **`from`**  | <code>string</code> | 文件或目录的当前路径       | 1.0.0 |
| **`to`**    | <code>string</code> | 文件或目录的目标路径       | 1.0.0 |
| **`directory`** | <code><a href="#directory">Directory</a></code> | 目录操作 | 1.0.0 |


### Enums


#### Directory

| Members               | Value                  | Description                                       | Since |
| --------------------- | ---------------------- | ------------------------------------------------- | ----- |
| **`Documents`**       | <code>'DOCUMENTS'</code> | Documents 目录                                  | 1.0.0 |
| **`Data`**            | <code>'DATA'</code>      | Data 目录                                       | 1.0.0 |
| **`Cache`**           | <code>'CACHE'</code>     | Cache 目录                                      | 1.0.0 |
| **`External`**        | <code>'EXTERNAL'</code>  | External 目录                                   | 1.0.0 |
| **`ExternalStorage`** | <code>'EXTERNAL_STORAGE'</code> | External Storage 目录                     | 1.0.0 |


#### Encoding

| Members     | Value                  | Description | Since |
| ----------- | ---------------------- | ----------- | ----- |
| **`UTF8`**  | <code>'utf8'</code>    |             | 1.0.0 |
| **`ASCII`** | <code>'ascii'</code>   |             | 1.0.0 |
| **`UTF16`** | <code>'utf16'</code>   |             | 1.0.0 |

</docgen-api>
