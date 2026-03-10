---
title: 应用 Capacitor 插件 API
description: 应用 API 处理高级应用状态和事件。例如,此 API 在应用进入和离开前台时发出事件,处理深度链接,打开其他应用,并管理持久化的插件状态。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/app/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/app/src/definitions.ts
sidebar_label: 应用
---

# @capacitor/app

应用 API 处理高级应用状态和事件。例如,此 API 在应用进入和离开前台时发出事件,处理深度链接,打开其他应用,并管理持久化的插件状态。

## 安装

```bash
npm install @capacitor/app
npx cap sync
```

## iOS

要能够从自定义 scheme 打开应用,您需要先注册该 scheme。您可以通过编辑 [`Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) 文件并添加以下行来实现。


```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLName</key>
    <string>com.getcapacitor.capacitor</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>mycustomscheme</string>
    </array>
  </dict>
</array>
```

## Android

要能够从自定义 scheme 打开应用,您需要先注册该 scheme。您可以通过在 `AndroidManifest.xml` 的 `activity` 部分添加以下行来实现。

```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="@string/custom_url_scheme" />
</intent-filter>
```

`custom_url_scheme` 值存储在 `strings.xml` 中。当添加 Android 平台时,`@capacitor/cli` 会将应用的包名添加为默认值,但可以通过编辑 `strings.xml` 文件来替换。

## 示例

```typescript
import { App } from '@capacitor/app';

App.addListener('appStateChange', ({ isActive }) => {
  console.log('App state changed. Is active?', isActive);
});

App.addListener('appUrlOpen', data => {
  console.log('App opened with URL:', data);
});

App.addListener('appRestoredResult', data => {
  console.log('Restored state:', data);
});

const checkAppLaunchUrl = async () => {
  const { url } = await App.getLaunchUrl();

  console.log('App opened with URL: ' + url);
};
```

## 配置

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

| Prop                           | Type                 | Description                                                                    | Default            | Since |
| ------------------------------ | -------------------- | ------------------------------------------------------------------------------ | ------------------ | ----- |
| **`disableBackButtonHandler`** | <code>boolean</code> | 禁用插件的默认返回按钮处理。仅适用于 Android。 | <code>false</code> | 7.1.0 |

### 示例

在 `capacitor.config.json` 中:

```json
{
  "plugins": {
    "App": {
      "disableBackButtonHandler": true
    }
  }
}
```

在 `capacitor.config.ts` 中:

```ts
/// <reference types="@capacitor/app" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    App: {
      disableBackButtonHandler: true,
    },
  },
};

export default config;
```

</docgen-config>

## API

<docgen-index>

* [`exitApp()`](#exitapp)
* [`getInfo()`](#getinfo)
* [`getState()`](#getstate)
* [`getLaunchUrl()`](#getlaunchurl)
* [`minimizeApp()`](#minimizeapp)
* [`toggleBackButtonHandler(...)`](#togglebackbuttonhandler)
* [`addListener('appStateChange', ...)`](#addlistenerappstatechange-)
* [`addListener('pause', ...)`](#addlistenerpause-)
* [`addListener('resume', ...)`](#addlistenerresume-)
* [`addListener('appUrlOpen', ...)`](#addlistenerappurlopen-)
* [`addListener('appRestoredResult', ...)`](#addlistenerapprestoredresult-)
* [`addListener('backButton', ...)`](#addlistenerbackbutton-)
* [`removeAllListeners()`](#removealllisteners)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### exitApp()

```typescript
exitApp() => Promise<void>
```

强制退出应用。这应该仅与 Android 的 `backButton` 处理程序一起使用,以便在导航完成时退出应用。

Ionic 会自动处理此问题,因此如果您使用 Ionic,则无需调用此方法。

**Since:** 1.0.0

--------------------


### getInfo()

```typescript
getInfo() => Promise<AppInfo>
```

返回有关应用的信息。

**Returns:** <code>Promise&lt;<a href="#appinfo">AppInfo</a>&gt;</code>

**Since:** 1.0.0

--------------------


### getState()

```typescript
getState() => Promise<AppState>
```

获取当前应用状态。

**Returns:** <code>Promise&lt;<a href="#appstate">AppState</a>&gt;</code>

**Since:** 1.0.0

--------------------


### getLaunchUrl()

```typescript
getLaunchUrl() => Promise<AppLaunchUrl | undefined>
```

获取应用启动时使用的 URL(如果有)。

**Returns:** <code>Promise&lt;<a href="#applaunchurl">AppLaunchUrl</a>&gt;</code>

**Since:** 1.0.0

--------------------


### minimizeApp()

```typescript
minimizeApp() => Promise<void>
```

最小化应用程序。

仅适用于 Android。

**Since:** 1.1.0

--------------------


### toggleBackButtonHandler(...)

```typescript
toggleBackButtonHandler(options: ToggleBackButtonHandlerOptions) => Promise<void>
```

在运行时启用或禁用插件的返回按钮处理。

仅适用于 Android。

| Param         | Type                                                                                      |
| ------------- | ----------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#togglebackbuttonhandleroptions">ToggleBackButtonHandlerOptions</a></code> |

**Since:** 7.1.0

--------------------


### addListener('appStateChange', ...)

```typescript
addListener(eventName: 'appStateChange', listenerFunc: StateChangeListener) => Promise<PluginListenerHandle>
```

监听应用或 Activity 状态的变化。

在 iOS 上,当原生的 [UIApplication.willResignActiveNotification](https://developer.apple.com/documentation/uikit/uiapplication/1622973-willresignactivenotification) 和
[UIApplication.didBecomeActiveNotification](https://developer.apple.com/documentation/uikit/uiapplication/1622953-didbecomeactivenotification) 事件被触发时触发。
在 Android 上,当 Capacitor 的 Activity [onResume](https://developer.android.com/reference/android/app/Activity#onResume()) 和 [onStop](https://developer.android.com/reference/android/app/Activity#onStop()) 方法被调用时触发。
在 Web 上,当文档的 visibilitychange 被触发时触发。

| Param              | Type                                                                |
| ------------------ | ------------------------------------------------------------------- |
| **`eventName`**    | <code>'appStateChange'</code>                                       |
| **`listenerFunc`** | <code><a href="#statechangelistener">StateChangeListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('pause', ...)

```typescript
addListener(eventName: 'pause', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

监听应用或 Activity 暂停的事件。

在 iOS 上,当原生的 [UIApplication.didEnterBackgroundNotification](https://developer.apple.com/documentation/uikit/uiapplication/1623071-didenterbackgroundnotification) 事件被触发时触发。
在 Android 上,当 Capacitor 的 Activity [onPause](https://developer.android.com/reference/android/app/Activity#onPause()) 方法被调用时触发。
在 Web 上,当文档的 visibilitychange 被触发且 document.hidden 为 true 时触发。

| Param              | Type                       |
| ------------------ | -------------------------- |
| **`eventName`**    | <code>'pause'</code>       |
| **`listenerFunc`** | <code>() =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 4.1.0

--------------------


### addListener('resume', ...)

```typescript
addListener(eventName: 'resume', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

监听应用或 Activity 恢复的事件。

在 iOS 上,当原生的 [UIApplication.willEnterForegroundNotification](https://developer.apple.com/documentation/uikit/uiapplication/1622944-willenterforegroundnotification) 事件被触发时触发。
在 Android 上,当 Capacitor 的 Activity [onResume](https://developer.android.com/reference/android/app/Activity#onResume()) 方法被调用时触发,
但仅在 resume 首次触发之后。
在 Web 上,当文档的 visibilitychange 被触发且 document.hidden 为 false 时触发。

| Param              | Type                       |
| ------------------ | -------------------------- |
| **`eventName`**    | <code>'resume'</code>      |
| **`listenerFunc`** | <code>() =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 4.1.0

--------------------


### addListener('appUrlOpen', ...)

```typescript
addListener(eventName: 'appUrlOpen', listenerFunc: URLOpenListener) => Promise<PluginListenerHandle>
```

监听应用的 URL 打开事件。这既处理自定义 URL scheme 链接,也处理应用处理的 URL(iOS 上的 Universal Links 和 Android 上的 App Links)。

| Param              | Type                                                        |
| ------------------ | ----------------------------------------------------------- |
| **`eventName`**    | <code>'appUrlOpen'</code>                                   |
| **`listenerFunc`** | <code><a href="#urlopenlistener">URLOpenListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('appRestoredResult', ...)

```typescript
addListener(eventName: 'appRestoredResult', listenerFunc: RestoredListener) => Promise<PluginListenerHandle>
```

如果应用使用之前持久化的插件调用数据启动,例如在 Android 上,当 Activity 返回到已关闭的应用时,此调用将返回应用启动时的任何数据,并将其转换为插件调用的结果形式。

在 Android 上,由于低端设备的内存限制,如果您的应用启动新的 Activity,应用可能会被操作系统终止以减少内存消耗。

例如,这意味着相机 API(它启动新的 Activity 来拍照)可能无法将数据返回到您的应用。

为了避免这种情况,Capacitor 会在启动时存储所有恢复的 Activity 结果。您应该为 `appRestoredResult` 添加监听器,以处理在应用未运行时传递的任何插件调用结果。

一旦获得该结果(如果有),您可以更新 UI 以恢复用户的逻辑体验,例如导航或选择正确的选项卡。

我们建议每个使用依赖外部 Activity 的插件(例如相机)的 Android 应用都应该处理此事件和进程。

| Param              | Type                                                          |
| ------------------ | ------------------------------------------------------------- |
| **`eventName`**    | <code>'appRestoredResult'</code>                              |
| **`listenerFunc`** | <code><a href="#restoredlistener">RestoredListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('backButton', ...)

```typescript
addListener(eventName: 'backButton', listenerFunc: BackButtonListener) => Promise<PluginListenerHandle>
```

监听硬件返回按钮事件(仅限 Android)。监听此事件将禁用默认的返回按钮行为,因此您可能需要手动调用 `window.history.back()`。
如果要关闭应用,请调用 `App.exitApp()`。

| Param              | Type                                                              |
| ------------------ | ----------------------------------------------------------------- |
| **`eventName`**    | <code>'backButton'</code>                                         |
| **`listenerFunc`** | <code><a href="#backbuttonlistener">BackButtonListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有原生监听器

**Since:** 1.0.0

--------------------


### Interfaces


#### AppInfo

| Prop          | Type                | Description                                                                                         | Since |
| ------------- | ------------------- | --------------------------------------------------------------------------------------------------- | ----- |
| **`name`**    | <code>string</code> | 应用的名称。                                                                                | 1.0.0 |
| **`id`**      | <code>string</code> | 应用的标识符。在 iOS 上是 Bundle Identifier。在 Android 上是 Application ID    | 1.0.0 |
| **`build`**   | <code>string</code> | 构建版本。在 iOS 上是 CFBundleVersion。在 Android 上是 versionCode。                | 1.0.0 |
| **`version`** | <code>string</code> | 应用版本。在 iOS 上是 CFBundleShortVersionString。在 Android 上是包的 versionName。 | 1.0.0 |


#### AppState

| Prop           | Type                 | Description                       | Since |
| -------------- | -------------------- | --------------------------------- | ----- |
| **`isActive`** | <code>boolean</code> | 应用是否处于活动状态。 | 1.0.0 |


#### AppLaunchUrl

| Prop      | Type                | Description                   | Since |
| --------- | ------------------- | ----------------------------- | ----- |
| **`url`** | <code>string</code> | 用于打开应用的 URL。 | 1.0.0 |


#### ToggleBackButtonHandlerOptions

| Prop          | Type                 | Description                                                          | Since |
| ------------- | -------------------- | -------------------------------------------------------------------- | ----- |
| **`enabled`** | <code>boolean</code> | 指示是启用还是禁用默认返回按钮处理。 | 7.1.0 |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### URLOpenListenerEvent

| Prop                       | Type                 | Description                                                                                                                                                                        | Since |
| -------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`url`**                  | <code>string</code>  | 应用打开时使用的 URL。                                                                                                                                                   | 1.0.0 |
| **`iosSourceApplication`** | <code>any</code>     | 打开应用的源应用(仅限 iOS) https://developer.apple.com/documentation/uikit/uiapplicationopenurloptionskey/1623128-sourceapplication                         | 1.0.0 |
| **`iosOpenInPlace`**       | <code>boolean</code> | 应用是否应该就地打开传递的文档,还是必须先复制它。 https://developer.apple.com/documentation/uikit/uiapplicationopenurloptionskey/1623123-openinplace | 1.0.0 |


#### RestoredListenerEvent

| Prop             | Type                              | Description                                                                                                                                       | Since |
| ---------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`pluginId`**   | <code>string</code>               | 此结果对应的 pluginId。例如,`Camera`。                                                                                   | 1.0.0 |
| **`methodName`** | <code>string</code>               | 此结果对应的 methodName。例如,`getPhoto`                                                                                | 1.0.0 |
| **`data`**       | <code>any</code>                  | 从插件传递的结果数据。这通常是您从正常调用插件方法时期望的结果。例如,`CameraPhoto` | 1.0.0 |
| **`success`**    | <code>boolean</code>              | 指示插件调用是否成功的布尔值。                                                                                                  | 1.0.0 |
| **`error`**      | <code>{ message: string; }</code> | 如果插件调用未成功,它将包含错误消息。                                                                             | 1.0.0 |


#### BackButtonListenerEvent

| Prop            | Type                 | Description                                                                                               | Since |
| --------------- | -------------------- | --------------------------------------------------------------------------------------------------------- | ----- |
| **`canGoBack`** | <code>boolean</code> | 指示浏览器是否可以返回历史记录。当历史记录堆栈位于第一个条目时为 false。 | 1.0.0 |


### Type Aliases


#### StateChangeListener

<code>(state: <a href="#appstate">AppState</a>): void</code>


#### URLOpenListener

<code>(event: <a href="#urlopenlistenerevent">URLOpenListenerEvent</a>): void</code>


#### RestoredListener

<code>(event: <a href="#restoredlistenerevent">RestoredListenerEvent</a>): void</code>


#### BackButtonListener

<code>(event: <a href="#backbuttonlistenerevent">BackButtonListenerEvent</a>): void</code>

</docgen-api>
