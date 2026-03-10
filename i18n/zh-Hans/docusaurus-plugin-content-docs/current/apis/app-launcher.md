---
title: 应用启动器 Capacitor 插件 API
description: 应用启动器 API 允许打开其他应用
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/app-launcher/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/app-launcher/src/definitions.ts
sidebar_label: 应用启动器
---

# @capacitor/app-launcher

应用启动器 API 允许您的应用程序检查应用是否可以打开并打开它。

在 iOS 上,您只有在知道应用的 URL scheme 时才能打开它们。

在 Android 上,您可以在知道应用的 URL scheme 或使用其公共包名的情况下打开它们。

**注意:** 在 [Android 11](https://developer.android.com/about/versions/11/privacy/package-visibility) 及更高版本上,您必须在 `AndroidManifest.xml` 的 `queries` 标签中添加要查询的应用包名或 URL scheme。

示例:
```xml
<queries>
  <!-- 通过包名查询 -->
  <package android:name="com.twitter.android" />
  <!-- 通过 URL scheme 查询 -->
  <intent>
      <action android:name="android.intent.action.VIEW"/>
      <data android:scheme="twitter"/>
  </intent>
</queries>
```

## 安装

```bash
npm install @capacitor/app-launcher
npx cap sync
```

## 示例

```typescript
import { AppLauncher } from '@capacitor/app-launcher';

const checkCanOpenTwitterUrl = async () => {
  const { value } = await AppLauncher.canOpenUrl({ url: 'twitter://timeline' });
  console.log('Can open url: ', value);
};

const openTwitterUrl = async () => {
  const { completed } = await AppLauncher.openUrl({ url: 'twitter://timeline' });
  console.log('openUrl completed: ', completed);
};

// 仅限 Android
const checkCanOpenTwitterPackage = async () => {
  const { value } = await AppLauncher.canOpenUrl({ url: 'com.twitter.android' });
  console.log('Can open package: ', value);
};

// 仅限 Android
const openTwitterPackage = async () => {
  const { completed } = await AppLauncher.openUrl({ url: 'com.twitter.android' });
  console.log('openUrl package completed: ', completed);
};
```

## API

<docgen-index>

* [`canOpenUrl(...)`](#canopenurl)
* [`openUrl(...)`](#openurl)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### canOpenUrl(...)

```typescript
canOpenUrl(options: CanOpenURLOptions) => Promise<CanOpenURLResult>
```

检查应用是否可以使用给定的 URL 打开。

在 iOS 上,您必须通过将 `LSApplicationQueriesSchemes` 键添加到应用程序的 `Info.plist` 文件中来声明传递给此方法的 URL scheme。
了解有关配置
[`Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 的更多信息。

对于未声明的 scheme,无论是否安装了相应的应用,此方法始终返回 false。要了解有关此键的更多信息,请参阅
[LSApplicationQueriesSchemes](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/plist/info/LSApplicationQueriesSchemes)。

在 Android 上,URL 可以是已知的 URLScheme 或应用包名。

在 [Android 11](https://developer.android.com/about/versions/11/privacy/package-visibility)
及更高版本上,您必须在 `AndroidManifest.xml` 的 `queries` 标签中添加要查询的应用包名或 URL scheme。

| Param         | Type                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#canopenurloptions">CanOpenURLOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#canopenurlresult">CanOpenURLResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### openUrl(...)

```typescript
openUrl(options: OpenURLOptions) => Promise<OpenURLResult>
```

使用给定的 URL 打开应用。
在 iOS 上,URL 应该是已知的 URLScheme。
在 Android 上,URL 可以是已知的 URLScheme 或应用包名。

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#openurloptions">OpenURLOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#openurlresult">OpenURLResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### Interfaces


#### CanOpenURLResult

| Prop        | Type                 |
| ----------- | -------------------- |
| **`value`** | <code>boolean</code> |


#### CanOpenURLOptions

| Prop      | Type                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


#### OpenURLResult

| Prop            | Type                 |
| --------------- | -------------------- |
| **`completed`** | <code>boolean</code> |


#### OpenURLOptions

| Prop      | Type                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |

</docgen-api>
