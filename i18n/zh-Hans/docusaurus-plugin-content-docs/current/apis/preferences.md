---
title: 偏好设置 Capacitor 插件 API
description: 偏好设置 API 为轻量级数据提供简单的键/值持久化存储。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/preferences/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/preferences/src/definitions.ts
sidebar_label: 偏好设置
---

# @capacitor/preferences

偏好设置 API 为轻量级数据提供简单的键/值持久化存储。

移动操作系统可能会定期清除 `window.localStorage` 中设置的数据，因此应该使用此 API。当作为渐进式 Web 应用运行时，此 API 将回退到使用 `localStorage`。

此插件将在 iOS 上使用
[`UserDefaults`](https://developer.apple.com/documentation/foundation/userdefaults)
，在 Android 上使用
[`SharedPreferences`](https://developer.android.com/reference/android/content/SharedPreferences)。
如果应用被卸载，存储的数据将被清除。

**注意**：此 API _不_ 旨在用作本地数据库。如果你的应用存储大量数据、具有高读/写负载或需要复杂查询，我们建议查看基于 SQLite 的解决方案。其中一个解决方案是 [Ionic Secure Storage](https://ionic.io/docs/secure-storage)，它是一个完全支持加密的基于 SQLite 的引擎。[Capacitor Community](https://github.com/capacitor-community/) 还构建了许多其他存储引擎。

## 安装

```bash
npm install @capacitor/preferences
npx cap sync
```

## Apple 隐私清单要求

Apple 要求应用开发者现在必须指定 API 使用的批准理由以增强用户隐私。到 2024 年 5 月 1 日，在向 App Store Connect 提交应用时必须包含这些理由。

在你的应用中使用此特定插件时，你必须在 `/ios/App` 中创建 `PrivacyInfo.xcprivacy` 文件或使用 VS Code 扩展生成它，指定使用理由。

有关如何执行此操作的详细步骤，请参阅 [Capacitor 文档](https://capacitorjs.com/docs/ios/privacy-manifest)。

**对于此插件，所需的字典键是 [NSPrivacyAccessedAPICategoryUserDefaults](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278401)，推荐的理由是 [CA92.1](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278401)。**

### PrivacyInfo.xcprivacy 示例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
      <!-- 如果 PrivacyInfo 文件已存在，则将此字典条目添加到数组中 -->
      <dict>
        <key>NSPrivacyAccessedAPIType</key>
        <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
        <key>NSPrivacyAccessedAPITypeReasons</key>
        <array>
          <string>CA92.1</string>
        </array>
      </dict>
    </array>
  </dict>
</plist>
```

## 插件使用示例

```typescript
import { Preferences } from '@capacitor/preferences';

const setName = async () => {
  await Preferences.set({
    key: 'name',
    value: 'Max',
  });
};

const checkName = async () => {
  const { value } = await Preferences.get({ key: 'name' });

  console.log(`Hello ${value}!`);
};

const removeName = async () => {
  await Preferences.remove({ key: 'name' });
};
```

## 使用 JSON

偏好设置 API 仅支持字符串值。但是，你可以使用 JSON，如果在使用 `set()` 之前对对象进行 `JSON.stringify`，然后对从 `get()` 返回的值进行 `JSON.parse`。

此方法也可用于存储非字符串值，例如数字和布尔值。

## API

<docgen-index>

* [`configure(...)`](#configure)
* [`get(...)`](#get)
* [`set(...)`](#set)
* [`remove(...)`](#remove)
* [`clear()`](#clear)
* [`keys()`](#keys)
* [`migrate()`](#migrate)
* [`removeOld()`](#removeold)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### configure(...)

```typescript
configure(options: ConfigureOptions) => Promise<void>
```

在运行时配置偏好设置插件。

值为 `undefined` 的选项将不会被使用。

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#configureoptions">ConfigureOptions</a></code> |

**Since:** 1.0.0

--------------------


### get(...)

```typescript
get(options: GetOptions) => Promise<GetResult>
```

从给定键的偏好设置中获取值。

| Param         | Type                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#getoptions">GetOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#getresult">GetResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### set(...)

```typescript
set(options: SetOptions) => Promise<void>
```

为给定键在偏好设置中设置值。

| Param         | Type                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#setoptions">SetOptions</a></code> |

**Since:** 1.0.0

--------------------


### remove(...)

```typescript
remove(options: RemoveOptions) => Promise<void>
```

从给定键的偏好设置中删除值（如果有）。

| Param         | Type                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#removeoptions">RemoveOptions</a></code> |

**Since:** 1.0.0

--------------------


### clear()

```typescript
clear() => Promise<void>
```

从偏好设置中清除键和值。

**Since:** 1.0.0

--------------------


### keys()

```typescript
keys() => Promise<KeysResult>
```

返回偏好设置中已知键的列表。

**Returns:** <code>Promise&lt;<a href="#keysresult">KeysResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### migrate()

```typescript
migrate() => Promise<MigrateResult>
```

从 Capacitor 2 Storage 插件迁移数据。

此操作是非破坏性的。它不会删除旧数据，只有在键尚未设置时才会写入新数据。
要在迁移后删除旧数据，请调用 removeOld()。

**Returns:** <code>Promise&lt;<a href="#migrateresult">MigrateResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### removeOld()

```typescript
removeOld() => Promise<void>
```

从 Capacitor 2 Storage 插件中删除带有 `_cap_` 前缀的旧数据。

**Since:** 1.1.0

--------------------


### Interfaces


#### ConfigureOptions

| Prop        | Type                | Description                                                                                                                                                                                                                                                                                                                                              | Default                       | Since |
| ----------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ----- |
| **`group`** | <code>string</code> | 设置偏好设置组。偏好设置组用于组织键/值对。使用值 'NativeStorage' 提供与 [`cordova-plugin-nativestorage`](https://www.npmjs.com/package/cordova-plugin-nativestorage) 的向后兼容性。警告：使用 'NativeStorage' 组时，`clear()` 方法可能会删除意外值。 | <code>CapacitorStorage</code> | 1.0.0 |


#### GetResult

| Prop        | Type                        | Description                                                                                                                       | Since |
| ----------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`value`** | <code>string \| null</code> | 与给定键关联的偏好设置中的值。如果之前未设置值或已删除，则 value 将为 `null`。                                                                 | 1.0.0 |


#### GetOptions

| Prop      | Type                | Description                                       | Since |
| --------- | ------------------- | ------------------------------------------------- | ----- |
| **`key`** | <code>string</code> | 要从偏好设置中检索其值的键。                            | 1.0.0 |


#### SetOptions

| Prop        | Type                | Description                                                   | Since |
| ----------- | ------------------- | ------------------------------------------------------------- | ----- |
| **`key`**   | <code>string</code> | 要与在偏好设置中设置的值关联的键。                                | 1.0.0 |
| **`value`** | <code>string</code> | 要在偏好设置中与关联键一起设置的值。                              | 1.0.0 |


#### RemoveOptions

| Prop      | Type                | Description                                     | Since |
| --------- | ------------------- | ----------------------------------------------- | ----- |
| **`key`** | <code>string</code> | 要从偏好设置中删除其值的键。                           | 1.0.0 |


#### KeysResult

| Prop       | Type                  | Description            | Since |
| ---------- | --------------------- | ---------------------- | ----- |
| **`keys`** | <code>string[]</code> | 偏好设置中的已知键。 | 1.0.0 |


#### MigrateResult

| Prop           | Type                  | Description                                                                                                                           | Since |
| -------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`migrated`** | <code>string[]</code> | 已迁移的键数组。                                                                                                                     | 1.0.0 |
| **`existing`** | <code>string[]</code> | 已经迁移或在偏好设置中存在的键数组，这些键在 Capacitor 2 偏好设置插件中具有值。                                                                   | 1.0.0 |

</docgen-api>
