---
title: 应用内浏览器 Capacitor 插件 API
description: 应用内浏览器插件提供了一个 Web 浏览器视图，允许您在外部加载任何网页。它表现得像一个标准 Web 浏览器，对于加载不受信任的内容很有用，而不会危及应用程序的安全性。它提供了三种不同的方式来打开 URL；在 WebView 中，在应用内系统浏览器（Android 的 Custom Tabs 和 iOS 的 SFSafariViewController）中，以及在设备的默认浏览器中。
custom_edit_url: https://github.com/ionic-team/capacitor-os-inappbrowser/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-os-inappbrowser/blob/main/src/definitions.ts
sidebar_label: 应用内浏览器
---

# @capacitor/inappbrowser

应用内浏览器插件提供了一个 Web 浏览器视图，允许您在外部加载任何网页。它表现得像一个标准 Web 浏览器，对于加载不受信任的内容很有用，而不会危及应用程序的安全性。它提供了三种不同的方式来打开 URL；在 WebView 中，在应用内系统浏览器（Android 的 Custom Tabs 和 iOS 的 SFSafariViewController）中，以及在设备的默认浏览器中。

## 安装

```bash
npm install @capacitor/inappbrowser
npx cap sync
```

## 支持的平台

- iOS
- Android

#### Android

InAppBrowser 插件要求最低 Android SDK 目标为 26。这高于 Capacitor 应用程序附带的默认值。您可以在 `android/variables.gradle` 文件中更新此值。

```gradle
ext {
    minSdkVersion = 26
}
```

## 使用示例
#### 在外部浏览器中打开
```typescript
import { InAppBrowser } from '@capacitor/inappbrowser';
await InAppBrowser.openInExternalBrowser({
    url: "https://www.google.com"
});
```

#### 在系统浏览器中打开（Android 的 Custom Tabs，iOS 的 SFSafariViewController）
```typescript
import { InAppBrowser, DefaultSystemBrowserOptions } from '@capacitor/inappbrowser';
await InAppBrowser.openInSystemBrowser({
    url: "https://www.google.com",
    options: DefaultSystemBrowserOptions
});
```

#### 在 Web View 中打开
```typescript
import { InAppBrowser, DefaultWebViewOptions } from '@capacitor/inappbrowser';
await InAppBrowser.openInWebView({
    url: "https://www.google.com",
    options: DefaultWebViewOptions
});
```

#### 关闭（Web View 或系统浏览器）
```typescript
import { InAppBrowser } from '@capacitor/inappbrowser';
await InAppBrowser.close();
```

#### 添加监听器
```typescript
import { InAppBrowser } from '@capacitor/inappbrowser';
await InAppBrowser.addListener('browserClosed', () => {
    console.log("浏览器已关闭。");
});

await InAppBrowser.addListener('browserPageNavigationCompleted', (data) => {
    console.log("浏览器页面导航已完成。" + data.url);
});

await InAppBrowser.addListener('browserPageLoaded', () => {
    console.log("浏览器已加载。");
});
```

#### 移除所有监听器
```typescript
import { InAppBrowser } from '@capacitor/inappbrowser';
InAppBrowser.removeAllListeners();
```

## API

<docgen-index>

* [`openInWebView(...)`](#openinwebview)
* [`openInSystemBrowser(...)`](#openinsystembrowser)
* [`openInExternalBrowser(...)`](#openinexternalbrowser)
* [`close()`](#close)
* [`addListener('browserClosed' | 'browserPageLoaded', ...)`](#addlistenerbrowserclosed--browserpageloaded-)
* [`addListener('browserPageNavigationCompleted', ...)`](#addlistenerbrowserpagenavigationcompleted-)
* [`removeAllListeners()`](#removealllisteners)
* [Interfaces](#interfaces)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### openInWebView(...)

```typescript
openInWebView(model: OpenInWebViewParameterModel) => Promise<void>
```

使用应用程序内的自定义 Web 视图在移动应用程序中打开给定 URL 的 Web 内容。

| Param       | Type                                                                                | Description                                    |
| ----------- | ----------------------------------------------------------------------------------- | ---------------------------------------------- |
| **`model`** | <code><a href="#openinwebviewparametermodel">OpenInWebViewParameterModel</a></code> | 在 Web 视图中打开 URL 的参数 |

--------------------


### openInSystemBrowser(...)

```typescript
openInSystemBrowser(model: OpenInSystemBrowserParameterModel) => Promise<void>
```

使用 iOS 的 SafariViewController 和 Android 的 Custom Tabs 在移动应用程序中打开给定 URL 的 Web 内容。

| Param       | Type                                                                                            | Description                                          |
| ----------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **`model`** | <code><a href="#openinsystembrowserparametermodel">OpenInSystemBrowserParameterModel</a></code> | 在系统浏览器中打开 URL 的参数 |

--------------------


### openInExternalBrowser(...)

```typescript
openInExternalBrowser(model: OpenInDefaultParameterModel) => Promise<void>
```

在移动应用程序之外的独立浏览器中打开给定 URL 的 Web 内容。

| Param       | Type                                                                                | Description                                            |
| ----------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------ |
| **`model`** | <code><a href="#openindefaultparametermodel">OpenInDefaultParameterModel</a></code> | 在外部浏览器中打开 URL 的参数 |

--------------------


### close()

```typescript
close() => Promise<void>
```

关闭当前活动的浏览器。它可用于关闭通过 openInSystemBrowser 或 openInWebView 操作启动的浏览器。

--------------------


### addListener('browserClosed' | 'browserPageLoaded', ...)

```typescript
addListener(eventName: "browserClosed" | "browserPageLoaded", listenerFunc: () => void) => Promise<PluginListenerHandle>
```

为指定的浏览器事件添加监听器，不返回任何数据。

| Param              | Type                                                | Description                                                                          |
| ------------------ | --------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **`eventName`**    | <code>'browserClosed' \| 'browserPageLoaded'</code> | 要监听的浏览器事件名称：'browserClosed' 或 'browserPageLoaded'。 |
| **`listenerFunc`** | <code>() =&gt; void</code>                          | 事件发生时要调用的函数。                                     |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('browserPageNavigationCompleted', ...)

```typescript
addListener(eventName: "browserPageNavigationCompleted", listenerFunc: (data: BrowserPageNavigationCompletedEventData) => void) => Promise<PluginListenerHandle>
```

为指定的浏览器事件添加监听器，该监听器接收数据。

| Param              | Type                                                                                                                           | Description                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'browserPageNavigationCompleted'</code>                                                                                  | 要监听的浏览器事件名称：'browserPageNavigationCompleted'。仅适用于 openInWebView。 |
| **`listenerFunc`** | <code>(data: <a href="#browserpagenavigationcompletedeventdata">BrowserPageNavigationCompletedEventData</a>) =&gt; void</code> | 事件发生时要调用的函数。                                                              |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => void
```

移除浏览器事件的所有监听器。

--------------------


### Interfaces


#### OpenInWebViewParameterModel

定义在 Web 视图中打开 URL 的选项。

| Prop                | Type                                                      | Description                                                          |
| ------------------- | --------------------------------------------------------- | -------------------------------------------------------------------- |
| **`options`**       | <code><a href="#webviewoptions">WebViewOptions</a></code> | 包含要应用于 Web 视图的一些配置的结构。 |
| **`customHeaders`** | <code>{ [key: string]: string; }</code>                   | 随请求一起发送的自定义标头映射。                 |


#### WebViewOptions

| Prop                                  | Type                                                                    | Description                                                                                             |
| ------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **`showURL`**                         | <code>boolean</code>                                                    | 在 Web 视图上显示 URL。                                                                       |
| **`showToolbar`**                     | <code>boolean</code>                                                    | 在 Web 视图上显示工具栏。                                                                   |
| **`clearCache`**                      | <code>boolean</code>                                                    | 在打开新窗口之前清除 Web 视图的 Cookie 缓存。                                       |
| **`clearSessionCache`**               | <code>boolean</code>                                                    | 在打开新窗口之前清除会话 Cookie 缓存。                                          |
| **`mediaPlaybackRequiresUserAction`** | <code>boolean</code>                                                    | 防止 HTML5 音频或视频自动播放。                                                        |
| **`closeButtonText`**                 | <code>string</code>                                                     | 设置要在 Web 视图上的关闭按钮上显示的文本。                                           |
| **`toolbarPosition`**                 | <code><a href="#toolbarposition">ToolbarPosition</a></code>             | 设置要在 Web 视图上显示工具栏的位置。                                               |
| **`showNavigationButtons`**           | <code>boolean</code>                                                    | 显示导航按钮。                                                                        |
| **`leftToRight`**                     | <code>boolean</code>                                                    | 交换导航按钮和关闭按钮的位置。                                     |
| **`customWebViewUserAgent`**          | <code>string \| null</code>                                             | 设置自定义用户代理以打开 Web 视图。如果为空或未设置，则将忽略该参数。 |
| **`android`**                         | <code><a href="#androidwebviewoptions">AndroidWebViewOptions</a></code> | Android 特定的 Web 视图选项。                                                                      |
| **`iOS`**                             | <code><a href="#ioswebviewoptions">iOSWebViewOptions</a></code>         | iOS 特定的 Web 视图选项。                                                                          |


#### AndroidWebViewOptions

| Prop               | Type                 | Description                                                                                                                                |
| ------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **`allowZoom`**    | <code>boolean</code> | 显示 Android 浏览器的缩放控件。                                                                                                 |
| **`hardwareBack`** | <code>boolean</code> | 使用硬件返回按钮在 Web 视图的历史记录中向后导航。如果没有上一页，Web 视图将关闭。 |
| **`pauseMedia`**   | <code>boolean</code> | 使 Web 视图与应用程序一起暂停/恢复以停止后台音频。                                                                     |


#### iOSWebViewOptions

| Prop                                      | Type                                                  | Description                                                                                                                                                                                                    |
| ----------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`allowOverScroll`**                     | <code>boolean</code>                                  | 启用 Web 视图反弹属性。                                                                                                                                                                         |
| **`enableViewportScale`**                 | <code>boolean</code>                                  | 防止通过 meta 标记进行视口缩放。                                                                                                                                                                  |
| **`allowInLineMediaPlayback`**            | <code>boolean</code>                                  | 允许内联 HTML5 媒体播放，在浏览器窗口内显示而不是设备特定的播放界面。注意：HTML 的 video 元素还必须包括 webkit-playsinline 属性。 |
| **`surpressIncrementalRendering`**        | <code>boolean</code>                                  | 等到所有新视图内容都被接收后才渲染。                                                                                                                                                            |
| **`viewStyle`**                           | <code><a href="#iosviewstyle">iOSViewStyle</a></code> | 设置 Web 视图的呈现样式。                                                                                                                                                                   |
| **`animationEffect`**                     | <code><a href="#iosanimation">iOSAnimation</a></code> | 设置 Web 视图的过渡样式。                                                                                                                                                                     |
| **`allowsBackForwardNavigationGestures`** | <code>boolean</code>                                  | 在 Web 视图中启用后退和前进滑动手势。                                                                                                                                                       |


#### OpenInSystemBrowserParameterModel

定义在系统浏览器中打开 URL 的选项。

| Prop          | Type                                                                  | Description                                                                |
| ------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **`options`** | <code><a href="#systembrowseroptions">SystemBrowserOptions</a></code> | 包含要应用于系统浏览器的一些配置的结构。 |


#### SystemBrowserOptions

| Prop          | Type                                                                                | Description                              |
| ------------- | ----------------------------------------------------------------------------------- | ---------------------------------------- |
| **`android`** | <code><a href="#androidsystembrowseroptions">AndroidSystemBrowserOptions</a></code> | Android 特定的系统浏览器选项。 |
| **`iOS`**     | <code><a href="#iossystembrowseroptions">iOSSystemBrowserOptions</a></code>         | iOS 特定的系统浏览器选项。     |


#### AndroidSystemBrowserOptions

| Prop                      | Type                                                              | Description                                                                                                                      |
| ------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **`showTitle`**           | <code>boolean</code>                                              | 启用标题显示。                                                                                                       |
| **`hideToolbarOnScroll`** | <code>boolean</code>                                              | 滚动时隐藏工具栏。                                                                                                |
| **`viewStyle`**           | <code><a href="#androidviewstyle">AndroidViewStyle</a></code>     | 设置 CustomTabs 的呈现样式。                                                                                       |
| **`bottomSheetOptions`**  | <code><a href="#androidbottomsheet">AndroidBottomSheet</a></code> | 设置选择此样式作为 viewStyle 时的底部表单选项。如果 viewStyle 是 FULL_SCREEN，则将忽略此项。 |
| **`startAnimation`**      | <code><a href="#androidanimation">AndroidAnimation</a></code>     | 设置浏览器出现时的开始动画。                                                                           |
| **`exitAnimation`**       | <code><a href="#androidanimation">AndroidAnimation</a></code>     | 设置浏览器消失时的退出动画。                                                                         |


#### AndroidBottomSheet

| Prop          | Type                 | Description                                                                                                                                                                        |
| ------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`height`**  | <code>number</code>  | 设置底部表单的高度，以像素为单位。Custom Tabs 将底部高度设置为屏幕的至少 50％。如果未传递任何值，它将默认为最小值。 |
| **`isFixed`** | <code>boolean</code> | 设置底部表单是否固定。                                                                                                                                                            |


#### iOSSystemBrowserOptions

| Prop                       | Type                                                  | Description                                          |
| -------------------------- | ----------------------------------------------------- | ---------------------------------------------------- |
| **`closeButtonText`**      | <code><a href="#dismissstyle">DismissStyle</a></code> | 设置要用作关闭按钮标题的文本。    |
| **`viewStyle`**            | <code><a href="#iosviewstyle">iOSViewStyle</a></code> | 设置 SafariViewController 的呈现样式。 |
| **`animationEffect`**      | <code><a href="#iosanimation">iOSAnimation</a></code> | 设置 SafariViewController 的过渡样式。   |
| **`enableBarsCollapsing`** | <code>boolean</code>                                  | 启用向下滚动时栏的折叠。          |
| **`enableReadersMode`**    | <code>boolean</code>                                  | 启用阅读器模式。                                |


#### OpenInDefaultParameterModel

定义在外部浏览器中打开 URL 的选项，并供其他选项使用。

| Prop      | Type                | Description                                                                            |
| --------- | ------------------- | -------------------------------------------------------------------------------------- |
| **`url`** | <code>string</code> | 要打开的 URL。它必须包含 'http' 或 'https' 作为协议前缀。 |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### BrowserPageNavigationCompletedEventData

定义 'browserPageNavigationCompleted' 事件的数据。

| Prop      | Type                | Description                          |
| --------- | ------------------- | ------------------------------------ |
| **`url`** | <code>string</code> | 已加载页面的 URL。 |


### Enums


#### ToolbarPosition

| Members      |
| ------------ |
| **`TOP`**    |
| **`BOTTOM`** |


#### iOSViewStyle

| Members           |
| ----------------- |
| **`PAGE_SHEET`**  |
| **`FORM_SHEET`**  |
| **`FULL_SCREEN`** |


#### iOSAnimation

| Members               |
| --------------------- |
| **`FLIP_HORIZONTAL`** |
| **`CROSS_DISSOLVE`**  |
| **`COVER_VERTICAL`**  |


#### AndroidViewStyle

| Members            |
| ------------------ |
| **`BOTTOM_SHEET`** |
| **`FULL_SCREEN`**  |


#### AndroidAnimation

| Members               |
| --------------------- |
| **`FADE_IN`**         |
| **`FADE_OUT`**        |
| **`SLIDE_IN_LEFT`**   |
| **`SLIDE_OUT_RIGHT`** |


#### DismissStyle

| Members      |
| ------------ |
| **`CLOSE`**  |
| **`CANCEL`** |
| **`DONE`**   |

</docgen-api>
