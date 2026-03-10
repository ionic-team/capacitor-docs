---
title: 手表 Capacitor 插件 API
description: 提供手表接口和通信
custom_edit_url: https://github.com/ionic-team/CapacitorWatch/blob/main/README.md
editApiUrl: https://github.com/ionic-team/CapacitorWatch/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: 手表 🧪
---

# @capacitor/watch

<p align="center">
  <a href="https://github.com/ionic-team/capacitorwatch/actions?query=workflow%3ACI"><img src="https://img.shields.io/github/actions/workflow/status/ionic-team/capacitor/ci.yml?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/@capacitor/watch"><img src="https://img.shields.io/npm/dw/@capacitor/watch?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/@capacitor/watch"><img src="https://img.shields.io/npm/v/@capacitor/watch?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/@capacitor/watch"><img src="https://img.shields.io/npm/l/@capacitor/watch?style=flat-square" /></a>
</p>
<p align="center">
  <a href="https://capacitorjs.com/docs"><img src="https://img.shields.io/img/v1?label=docs&message=capacitorjs.com&color=blue&style=flat-square" /></a>
  <a href="https://twitter.com/capacitorjs"><img src="https://img.shields.io/twitter/follow/capacitorjs" /></a>
</p>

---

_CapacitorLABS_ - 此项目是实验性的。不提供支持。请在需要时打开问题。

---

Capacitor 手表插件允许你在 Web 代码中为手表定义 UI,并在配对的手表上显示它。

目前仅支持 iOS。本指南假设你已经将 iOS 添加到 capacitor 项目中。

还要注意 - 所有这些仅在真实的 Apple Watch 上有效。模拟器不允许像真实设备那样进行应用<->手表通信。

## 安装

步骤 1

将手表插件添加到 capacitor 项目,然后打开 Xcode 项目：

```bash
npm install @capacitor/watch
npx cap sync
npx cap open ios
```

步骤 2

转到添加功能：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/add-capability.png" />

添加"后台模式"和"推送通知"功能。然后在后台模式选项中,选择"后台获取"、"远程通知"和"后台处理"。你的应用目标应如下所示：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/capabilities-final.png" />

步骤 3

打开 `AppDelegate.swift` 并将 `import WatchConnectivity` 和 `import CapactiorWatch` 添加到文件顶部,然后在 `application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?)` 方法中添加以下代码：

```swift
assert(WCSession.isSupported(), "This sample requires Watch Connectivity support!")
WCSession.default.delegate = CapWatchSessionDelegate.shared
WCSession.default.activate()
```

步骤 4

在 Xcode 中选择 File -> New -> Target,然后选择 watchOS 选项卡和"App"：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/target-watch.png" />

点击"Next",然后按如下方式填写选项：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/watch-target-options.png" />

此对话框可能有点令人困惑,关键是你的"Bundle Identifier"必须是 `[你的应用 bundle ID].watchapp` 才能使手表<->应用配对工作。你还必须为界面选择 SwiftUI,为语言选择 Swift。项目应为 `App`。

步骤 5

我们将添加使 Capacitor Watch 在手表应用中工作的代码。

---

如果你使用 <b>Xcode 15 或更高版本</b>,则需要从 node_modules 添加 Capacitor Watch Swift 包：

首先转到项目包依赖项

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-project-dependancies.png" />

然后选择"添加本地"

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-add-local.png" />

然后导航到 `node_modules/@capacitor/watch/CapWatch-Watch-SPM` 文件夹并点击"添加包"

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-nav-to-package.png" />

然后在右侧列中选择你的手表应用作为目标并点击"添加包"

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-pick-target.png" />

完成后,你的包依赖项应如下所示：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-finished.png" />

---

使用 <b>Xcode 14</b>,你需要转到 https://github.com/ionic-team/CapacitorWatch/tree/main/packages/iOS-capWatch-watch/Sources/iOS-capWatch-watch 并将所有文件复制到你的 Watch 项目中,并确保选择的目标是你的手表应用。它应如下所示：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/watch-sources-added.png" />

步骤 6

然后打开手表应用的"Main"文件,应该是 `watchappApp.swift`。在 `@main` 语句上方添加 `import WatchConnectivity` 和 `import iOS_capWatch_watch` 行。然后用以下内容替换显示 `ContentView()` 的行：

完成的文件应如下所示：

```swift
import SwiftUI
import WatchConnectivity
import iOS_capWatch_watch

@main
struct watchddgg_Watch_AppApp: App {
    var body: some Scene {
        WindowGroup {
            CapWatchContentView()
                .onAppear {
                    assert(WCSession.isSupported(), "This sample requires Watch Connectivity support!")
                    WCSession.default.delegate = WatchViewModel.shared
                    WCSession.default.activate()
                }
        }
    }
}
```

步骤 7

将"后台模式"功能添加到手表应用目标,并启用"远程通知"：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/watch-remote-not.png" />

你现在应该可以开发 Capacitor Watch 了!

## 开发工作流程

你仍然可以像开发普通 capacitor 应用一样开发 iOS 应用,但要在手表上运行需要在 Xcode 中更改目标和目的地。你可以使用 Xcode 中心顶部附近的"目标下拉菜单"更改它：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/target-dropdown.png" />

此栏的右侧允许你选择目标设备或模拟器。你需要选择与手机配对的手表,然后点击"运行"按钮或使用 `cmd+r` 运行快捷方式。

在同步手表和手机应用时可能会遇到一些挑战。有时你会收到 xcode 控制台错误,抱怨配套应用不存在。在这种情况下,最好的解决方案是在两个设备上重新构建并重新安装应用。

## 构建手表 UI 并将其发送到手表

你将使用长字符串来定义手表 UI。换行符分隔组件。目前,此插件仅支持 Text 或 Button 组件的垂直滚动视图。

定义 UI 后,可以使用 `updateWatchUI()` 方法将其发送到手表：

```typescript
async uploadMyWatchUI() {
    const watchUI = 
        `Text("Capacitor WATCH")
         Button("Add One", "inc")`;

    await Watch.updateWatchUI({"watchUI": watchUI});
}
```

将产生：

<img src="https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/example-watchui.png" />

## 与手表通信

这篇文章很好地总结了原生方法及其影响：https://alexanderweiss.dev/blog/2023-01-18-three-ways-to-communicate-via-watchconnectivity

在手机端,你可以使用 Capacitor Background Runner 插件(https://github.com/ionic-team/capacitor-background-runner)实现这些方法。目前,手表插件主要处理 `didReceiveUserInfo` 方法,你可以使用以下代码在 runner.js 中从你的应用在后台时接收来自手表的事件：

```javascript
addEventListener("WatchConnectivity_didReceiveUserInfo", (args) => {
  console.log(args.message.jsCommand);
})
```

你还可以为前台处理实现 `runCommand` 事件监听器：

```typescript
Watch.addListener("runCommand", (data: {command: string}) => {
  console.log("PHONE got command - " + data.command);
})
```

命令是手表 UI 的 `Button()` 定义中的第二个参数。这可以是任何字符串。

## 更新手表数据

你可以使用 `$` 变量向 `Text()` 元素添加变量,并使用 `updateWatchData` 命令更新：

```
Text("Show my $number")
```

执行此示例时将更新 `$number`：

```typescript
var stateData = {
  number: 0
}

async function counterIncrement() {
  stateData.counter++  
  await Watch.updateWatchData({"data": convertValuesOfObjectToStringValues(stateData)})
}
```

# 手表上的持久化

Capacitor Watch 将保留你使用 `updateWatchUI()` 发送的最后一个 UI。来自 `updateWatchData()` 的状态不会被保留。

## 安装

```bash
npm install @capacitor/watch
npx cap sync
```

## API

<docgen-index>

* [`addListener('runCommand', ...)`](#addlistenerruncommand-)
* [`updateWatchUI(...)`](#updatewatchui)
* [`updateWatchData(...)`](#updatewatchdata)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### addListener('runCommand', ...)

```typescript
addListener(eventName: 'runCommand', listenerFunc: (data: { command: string; }) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

监听来自手表的命令

| Param              | Type                                                 |
| ------------------ | ---------------------------------------------------- |
| **`eventName`**    | <code>'runCommand'</code>                            |
| **`listenerFunc`** | <code>(data: { command: string; }) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

--------------------


### updateWatchUI(...)

```typescript
updateWatchUI(options: { watchUI: string; }) => Promise<void>
```

用 watchUI 替换当前手表 UI

| Param         | Type                              |
| ------------- | --------------------------------- |
| **`options`** | <code>{ watchUI: string; }</code> |

--------------------


### updateWatchData(...)

```typescript
updateWatchData(options: { data: { [key: string]: string; }; }) => Promise<void>
```

更新手表的状态数据

| Param         | Type                                               |
| ------------- | -------------------------------------------------- |
| **`options`** | <code>{ data: { [key: string]: string; }; }</code> |

--------------------


### Interfaces


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |

</docgen-api>
