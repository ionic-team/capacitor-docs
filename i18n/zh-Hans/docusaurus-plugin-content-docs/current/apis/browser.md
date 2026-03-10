---
title: 浏览器 Capacitor 插件 API
description: 浏览器 API 提供打开应用内浏览器和订阅浏览器事件的功能。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/browser/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/browser/src/definitions.ts
sidebar_label: 浏览器
---

# @capacitor/browser

浏览器 API 提供打开应用内浏览器和订阅浏览器事件的功能。

在 iOS 上,这使用 `SFSafariViewController`,并符合主要 OAuth 服务应用内浏览器要求。

## 安装

```bash
npm install @capacitor/browser
npx cap sync
```

## Android

### 变量

此插件将使用以下项目变量(在应用程序的 `variables.gradle` 文件中定义):

- `androidxBrowserVersion`:`androidx.browser:browser` 的版本(默认:`1.9.0`)

## 示例

```typescript
import { Browser } from '@capacitor/browser';

const openCapacitorSite = async () => {
  await Browser.open({ url: 'http://capacitorjs.com/' });
};
```

## API

<docgen-index>

* [`open(...)`](#open)
* [`close()`](#close)
* [`addListener('browserFinished', ...)`](#addlistenerbrowserfinished-)
* [`addListener('browserPageLoaded', ...)`](#addlistenerbrowserpageloaded-)
* [`removeAllListeners()`](#removealllisteners)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### open(...)

```typescript
open(options: OpenOptions) => Promise<void>
```

使用指定选项打开页面。

| 参数         | 类型                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#openoptions">OpenOptions</a></code> |

**自:** 1.0.0

--------------------


### close()

```typescript
close() => Promise<void>
```

仅 Web 和 iOS:关闭打开的浏览器窗口。

在其他平台上为空操作。

**自:** 1.0.0

--------------------


### addListener('browserFinished', ...)

```typescript
addListener(eventName: 'browserFinished', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

仅 Android 和 iOS:监听浏览器完成事件。
当用户关闭浏览器时触发。

| 参数              | 类型                           |
| ------------------ | ------------------------------ |
| **`eventName`**    | <code>'browserFinished'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code>     |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自:** 1.0.0

--------------------


### addListener('browserPageLoaded', ...)

```typescript
addListener(eventName: 'browserPageLoaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

仅 Android 和 iOS:监听页面加载事件。
仅在传递给 open 方法的 URL 完成加载时触发。
不会为任何后续页面加载调用。

| 参数              | 类型                             |
| ------------------ | -------------------------------- |
| **`eventName`**    | <code>'browserPageLoaded'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code>       |

**返回:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自:** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除此插件的所有原生监听器。

**自:** 1.0.0

--------------------


### Interfaces


#### OpenOptions

表示传递给 `open` 的选项。

| 属性                    | 类型                                   | 描述                                                                                                                                | 自    |
| ----------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`url`**               | <code>string</code>                    | 浏览器打开的 URL。                                                                                                    | 1.0.0 |
| **`windowName`**        | <code>string</code>                    | 仅 Web:浏览器打开的可选目标。遵循 window.open 的 `target` 属性。默认为 _blank。在其他平台上忽略。 | 1.0.0 |
| **`toolbarColor`**      | <code>string</code>                    | 设置工具栏颜色的十六进制颜色。                                                                                             | 1.0.0 |
| **`presentationStyle`** | <code>'fullscreen' \| 'popover'</code> | 仅 iOS:浏览器的呈现样式。默认为全屏。在其他平台上忽略。                                       | 1.0.0 |
| **`width`**             | <code>number</code>                    | 仅 iOS:在 iPad 上使用 presentationStyle 'popover' 时浏览器的宽度。在其他平台上忽略。                               | 4.0.0 |
| **`height`**            | <code>number</code>                    | 仅 iOS:在 iPad 上使用 presentationStyle 'popover' 时浏览器的高度。在其他平台上忽略。                              | 4.0.0 |


#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |

</docgen-api>
