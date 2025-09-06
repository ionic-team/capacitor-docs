---
title: App Launcher Capacitor 插件 API
description: AppLauncher API 允许打开其他应用
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/app-launcher/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/app-launcher/src/definitions.ts
sidebar_label: App Launcher
---

# @capacitor/app-launcher

AppLauncher API 允许你的应用检查是否能够打开其他应用并执行打开操作。

在 iOS 上，你只能通过已知的 URL 方案（URL scheme）来打开应用。

在 Android 上，你可以通过已知的 URL 方案或使用应用的公开包名来打开应用。

**注意：** 在 [Android 11](https://developer.android.com/about/versions/11/privacy/package-visibility) 及更高版本中，你需要在 `AndroidManifest.xml` 文件的 `queries` 标签内添加你想要查询的应用包名。

示例：
```xml
<queries>
  <package android:name="com.getcapacitor.myapp" />
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

const checkCanOpenUrl = async () => {
  const { value } = await AppLauncher.canOpenUrl({ url: 'com.getcapacitor.myapp' });

  console.log('能否打开该 URL：', value);
};

const openPortfolioPage = async () => {
  await AppLauncher.openUrl({ url: 'com.getcapacitor.myapp://page?id=portfolio' });
};
```

## API

<docgen-index>

* [`canOpenUrl(...)`](#canopenurl)
* [`openUrl(...)`](#openurl)
* [接口](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### canOpenUrl(...)

```typescript
canOpenUrl(options: CanOpenURLOptions) => Promise<CanOpenURLResult>
```

检查是否可以使用给定的 URL 打开应用。

在 iOS 上，你必须将传递给此方法的 URL 方案添加到应用的 `Info.plist` 文件中的 `LSApplicationQueriesSchemes` 键中。
了解更多关于配置 [`Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 的信息。

对于未声明的方案，无论是否安装了相应的应用，此方法始终返回 false。要了解更多关于该键的信息，请参见 [LSApplicationQueriesSchemes](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/plist/info/LSApplicationQueriesSchemes)。

| 参数          | 类型                                                              |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#canopenurloptions">CanOpenURLOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#canopenurlresult">CanOpenURLResult</a>&gt;</code>

**起始版本：** 1.0.0

--------------------


### openUrl(...)

```typescript
openUrl(options: OpenURLOptions) => Promise<OpenURLResult>
```

使用给定的 URL 打开应用。
在 iOS 上，URL 应为已知的 URLScheme。
在 Android 上，URL 可以是已知的 URLScheme 或应用包名。

| 参数          | 类型                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#openurloptions">OpenURLOptions</a></code> |

**返回值：** <code>Promise&lt;<a href="#openurlresult">OpenURLResult</a>&gt;</code>

**起始版本：** 1.0.0

--------------------


### 接口


#### CanOpenURLResult

| 属性        | 类型                 |
| ----------- | -------------------- |
| **`value`** | <code>boolean</code> |


#### CanOpenURLOptions

| 属性      | 类型                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


#### OpenURLResult

| 属性            | 类型                 |
| --------------- | -------------------- |
| **`completed`** | <code>boolean</code> |


#### OpenURLOptions

| 属性      | 类型                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |

</docgen-api>