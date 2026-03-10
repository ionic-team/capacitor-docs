---
title: 后台运行器 Capacitor 插件 API
description: Capacitor 后台运行器
custom_edit_url: https://github.com/ionic-team/capacitor-background-runner/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-background-runner/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: 后台运行器
---

# @capacitor/background-runner

后台运行器提供了一个基于事件的独立 JavaScript 环境,用于在 Web 视图之外执行您的 JavaScript 代码。

## 安装

```bash
npm install @capacitor/background-runner
npx cap sync
```

后台运行器支持各种需要用户预先授权的设备 API。

## iOS

在 iOS 上,您必须启用后台模式能力。

![在 Xcode 中启用后台模式能力](https://github.com/ionic-team/capacitor-background-runner/raw/main/docs/enable_background_mode_capability.png)

添加后,您必须至少启用`后台获取`和`后台处理`模式,以启用注册和调度后台任务的能力。

如果您将使用地理位置或推送通知,请分别启用`位置更新`或`远程通知`。

![在 Xcode 中配置后台模式](https://github.com/ionic-team/capacitor-background-runner/raw/main/docs/configure_background_modes.png)

您还需要在`Info.plist`文件中添加以下条目:
```
<key>BGTaskSchedulerPermittedIdentifiers</key>
<array>
  <string>com.example.background.task</string>
</array>
```

请在[iOS 指南](https://capacitorjs.com/docs/ios)中阅读关于[配置`Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist),以获取有关在 Xcode 中设置 iOS 权限的更多信息。

请确保在插件配置的`label`字段中使用与`BGTaskSchedulerPermittedIdentifiers`相同的 ID(例如 "com.example.background.task")。

启用后台模式能力后,将以下内容添加到应用程序的`AppDelegate.swift`中:

在文件顶部,`import Capacitor`下添加:
```swift
import CapacitorBackgroundRunner
```

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

    // ....
    BackgroundRunnerPlugin.registerBackgroundTask()
    BackgroundRunnerPlugin.handleApplicationDidFinishLaunching(launchOptions: launchOptions)
    // ....

    return true
}
```

要允许后台运行器处理远程通知,请添加以下内容:

```swift
func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
        // ....
        BackgroundRunnerPlugin.dispatchEvent(event: "remoteNotification", eventArgs: userInfo) { result in
            switch result {
            case .success:
                completionHandler(.newData)
            case .failure:
                completionHandler(.failed)
            }
        }
    }
```

### 地理位置定位

Apple 要求在`Info.plist`中指定位置信息的隐私描述:

- `NSLocationAlwaysUsageDescription` (`Privacy - Location Always Usage Description`)
- `NSLocationWhenInUseUsageDescription` (`Privacy - Location When In Use Usage Description`)

## Android

将以下行插入到`android/app/build.gradle`中:

```diff
...

repositories {
    flatDir{
        dirs '../capacitor-cordova-android-plugins/src/main/libs', 'libs'
+		dirs '/main/node_modules/@capacitor/background-runner/android/src/main/libs', 'libs'
    }
}
...

```

如果您要从 1.0.5 版本升级现有 Android 项目,请确保删除`android/src/main/libs`中的`android-js-engine-release.aar`。

### 地理位置定位

此 API 要求将以下权限添加到您的`AndroidManifest.xml`中:

```xml
<!-- 地理位置定位 API -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

前两个权限请求位置数据,包括粗略和精确位置,最后一行是可选的,但如果您的应用程序_需要_ GPS 才能运行,则是必需的。您可以将其省略,但请记住,这可能会导致您的应用程序安装在没有 GPS 硬件的设备上。

### 本地通知

Android 13 需要权限检查才能发送通知。您需要相应地调用`checkPermissions()`和`requestPermissions()`。

在 Android 12 及更早版本上,不会显示提示,只会返回为已授予。

从 Android 12 开始,除非将此权限添加到您的`AndroidManifest.xml`,否则调度的通知将不会是精确的:

```xml
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
```

请注意,即使存在权限,用户仍然可以从应用程序设置中禁用精确通知。

请在[Android 指南](https://capacitorjs.com/docs/android)中阅读关于[设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions),以获取有关设置 Android 权限的更多信息。

## 关于后台运行器
在构建复杂应用程序的过程中,有时需要在应用程序不在前台时执行工作。标准 Capacitor 应用程序的挑战在于,当这些后台事件发生时,webview 不可用,需要您编写原生代码来处理这些事件。这就是后台运行器插件发挥作用的地方。

后台运行器使编写 JavaScript 代码来处理原生后台事件变得容易。您只需要创建运行器 JavaScript 文件并[定义您的配置](#配置后台运行器),然后后台运行器插件将自动配置和调度原生后台任务,该任务将根据您的配置和平台规则执行。无需修改 UI 代码。


## 使用后台运行器

后台运行器包含一个无头 JavaScript 环境,它调用您在`capacitor.config.ts`文件中指定的 javascript 文件中的事件处理程序。如果运行器在您的运行器文件中找到与传入事件对应的事件处理程序,它将执行该事件处理程序,然后在调用`resolve()`或`reject()`后关闭(或者如果操作系统强制终止您的进程)。

#### 运行器 JS 文件示例

```js
addEventListener('myCustomEvent', (resolve, reject, args) => {
  console.log('在此处执行某些操作以更新系统');
  resolve();
});

addEventListener('myCustomEventWithReturnData', (resolve, reject, args) => {
  try {
    console.log('接受此数据: ' + JSON.stringify(args.user));

    const updatedUser = args.user;
    updatedUser.firstName = updatedUser.firstName + ' HELLO';
    updatedUser.lastName = updatedUser.lastName + ' WORLD';

    resolve(updatedUser);
  } catch (err) {
    reject(err);
  }
});

addEventListener('remoteNotification', (resolve, reject, args) => {
  try {
    console.log('收到静默推送通知');

    CapacitorNotifications.schedule([
      {
        id: 100,
        title: '企业后台运行器',
        body: '收到静默推送通知',
      },
    ]);

    resolve();
  } catch (err) {
    reject();
  }
});
```

在运行器调用的每个事件处理程序中调用`resolve()` \ `reject()`是**必需的**。如果不这样做,可能会导致您的运行器在应用程序处于后台时调用事件时被操作系统终止。如果应用程序处于前台,对`dispatchEvent`的异步调用可能无法解析。

有关使用后台运行器的更多真实示例,请查看[后台运行器测试应用程序](https://github.com/ionic-team/background-runner-testapp)。

## 配置后台运行器

<docgen-config>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

在加载时,后台运行器将自动注册一个后台任务,该任务将在应用程序进入后台时调度并运行。

| 属性            | 类型                 | 描述                                                                                                                                                                                          | 自    |
| --------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`label`**     | <code>string</code>  | 运行器的名称,用于日志记录。                                                                                                                                                                | 1.0.0 |
| **`src`**       | <code>string</code>  | 运行器 JavaScript 文件的路径,相对于应用程序包。                                                                                                                                  | 1.0.0 |
| **`event`**     | <code>string</code>  | 操作系统执行后台任务时将调用的事件的名称。                                                                                                                  | 1.0.0 |
| **`repeat`**    | <code>boolean</code> | 后台任务是否应基于`interval`中设置的间隔重复。                                                                                                                            | 1.0.0 |
| **`interval`**  | <code>number</code>  | 应用程序进入后台后开始后台任务的分钟数。如果`repeat`为 true,这也指定每次执行之间的分钟数。 | 1.0.0 |
| **`autoStart`** | <code>boolean</code> | 在应用程序加载时自动注册和调度后台任务。                                                                                                                                     | 1.0.0 |

### 示例

在`capacitor.config.json`中:

```json
{
  "plugins": {
    "BackgroundRunner": {
      "label": "com.example.background.task",
      "src": "runners/background.js",
      "event": "myCustomEvent",
      "repeat": true,
      "interval": 15,
      "autoStart": true
    }
  }
}
```

在`capacitor.config.ts`中:

```ts
/// <reference types="@capacitor/background-runner" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    BackgroundRunner: {
      label: "com.example.background.task",
      src: "runners/background.js",
      event: "myCustomEvent",
      repeat: true,
      interval: 15,
      autoStart: true,
    },
  },
};

export default config;
```

</docgen-config>

## JavaScript API

后台运行器不在浏览器或 Web 视图中执行您的 JavaScript 代码,因此您可能习惯的典型 Web API 可能不可用。这包括 DOM API 以及与应用程序 DOM 交互的能力。

以下是后台运行器中提供的可用 Web API 列表:

- [console](https://developer.mozilla.org/en-US/docs/Web/API/console)
  - 仅`info`、`log`、`warn`、`error`和`debug`可用
- [TextDecoder](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder)
  - 仅`decode`可用
- [TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder)
  - 仅`encode`可用
- [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
  - 不支持事件监听器选项和`useCapture`
- [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
- [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)
- [clearTimeout](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout)
- [clearInterval](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval)
- [crypto](https://developer.mozilla.org/en-US/docs/Web/API/Crypto)
- [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  - 尚不支持 Request 对象
  - 选项对象中仅支持`method`、`headers`和`body`

除了标准 Web API 之外,后台运行器还支持许多[自定义 Capacitor API](#capacitor-api)自定义 API,这些 API 公开相关的移动设备功能

## 运行器生命周期

目前,运行器旨在在应用程序处于后台时执行周期性的工作突发,或在应用程序处于前台时在与 UI 分离的线程中执行异步工作。因此,运行器的生命周期不长。状态不会在运行器中的事件调用之间维护。每次调用`dispatchEvent()`都会创建一个新上下文,在该上下文中加载和执行运行器代码,一旦调用`resolve()`或`reject()`,上下文就会被销毁。

## Android 电池优化

某些 Android 供应商提供内置的电池优化设置,超出了 stock Android 的范围。其中一些优化必须由最终用户禁用,以便您的后台任务正常工作。

访问[不要杀死我的应用程序!](https://dontkillmyapp.com)以获取有关受影响的制造商以及用户调整设置所需步骤的更多信息。

## 后台任务的限制

在移动操作系统上运行持久的、始终运行的后台服务是不可能的。由于 iOS 和 Android 为减少电池和数据消耗而施加的限制,后台任务受到各种限制,您在设计和实施后台任务时必须记住这些限制。

### iOS

- 每次调用任务时,您有大约 30 秒的运行时间,然后必须调用`completed()`,否则任务将被终止。
- 虽然您可以设置一个间隔来定义任务在应用程序进入后台后运行的时间或运行频率,但这不能保证。iOS 将最终决定您任务运行的时间和频率,这部分取决于您使用应用程序的频率。
- 后台任务不在模拟器中执行。

### Android

- 您的任务最多有 10 分钟的时间来执行工作,但为了保持您的任务跨平台兼容,您应该将工作限制在最多 30 秒。
- 重复的后台任务的最小间隔至少为 15 分钟。与 iOS 类似,您请求的任何间隔可能不会完全命中 - 实际执行时间取决于操作系统的电池优化和其他启发式方法。

## API

<docgen-index>

* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions(...)`](#requestpermissions)
* [`dispatchEvent(...)`](#dispatchevent)
* [`addListener('backgroundRunnerNotificationReceived', ...)`](#addlistenerbackgroundrunnernotificationreceived-)
* [`removeNotificationListeners()`](#removenotificationlisteners)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### checkPermissions()

```typescript
checkPermissions() => any
```

检查各种 Capacitor 设备 API 的权限。

**返回:** <code>any</code>

**自:** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(options: RequestPermissionOptions) => any
```

请求显示本地通知的权限。

| 参数         | 类型                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#requestpermissionoptions">RequestPermissionOptions</a></code> |

**返回:** <code>any</code>

**自:** 1.0.0

--------------------


### dispatchEvent(...)

```typescript
dispatchEvent<T = void>(options: DispatchEventOptions) => any
```

向配置的运行器分发事件。

| 参数         | 类型                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#dispatcheventoptions">DispatchEventOptions</a></code> |

**返回:** <code>any</code>

**自:** 1.0.0

--------------------


### addListener('backgroundRunnerNotificationReceived', ...)

```typescript
addListener(eventName: 'backgroundRunnerNotificationReceived', listenerFunc: (event: NotificationActionEvent) => void) => any
```

为通知操作添加监听器。

| 参数              | 类型                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'backgroundRunnerNotificationReceived'</code>                                             |
| **`listenerFunc`** | <code>(event: <a href="#notificationactionevent">NotificationActionEvent</a>) =&gt; void</code> |

**返回:** <code>any</code>

**自:** 2.1.1

--------------------


### removeNotificationListeners()

```typescript
removeNotificationListeners() => any
```

移除此插件的通知操作监听器。

**返回:** <code>any</code>

**自:** 2.1.1

--------------------


### Interfaces


#### PermissionStatus

| 属性                | 类型                                                        |
| ------------------- | ----------------------------------------------------------- |
| **`geolocation`**   | <code><a href="#permissionstate">PermissionState</a></code> |
| **`notifications`** | <code><a href="#permissionstate">PermissionState</a></code> |


#### RequestPermissionOptions

| 属性       | 类型            |
| ---------- | --------------- |
| **`apis`** | <code>{}</code> |


#### DispatchEventOptions

| 属性          | 类型                                 | 描述                                | 自    |
| ------------- | ------------------------------------ | ------------------------------------------ | ----- |
| **`label`**   | <code>string</code>                  | 要将事件分发到的运行器标签  | 1.0.0 |
| **`event`**   | <code>string</code>                  | 注册的事件监听器的名称。 | 1.0.0 |
| **`details`** | <code>{ [key: string]: any; }</code> |                                            |       |


#### NotificationActionEvent

| 属性                 | 类型                |
| -------------------- | ------------------- |
| **`actionTypeId`**   | <code>string</code> |
| **`notificationId`** | <code>number</code> |


#### PluginListenerHandle

| 属性         | 类型                      |
| ------------ | ------------------------- |
| **`remove`** | <code>() =&gt; any</code> |


### Type Aliases


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


#### API

<code>'geolocation' | 'notifications'</code>

</docgen-api>

## Capacitor API

<capacitor-api-docs>

<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### Interfaces


#### CapacitorDevice

获取有关设备的信息,例如网络连接和电池状态。

| 属性                   | 类型                                                             | 描述                                    | 自    |
| ---------------------- | ---------------------------------------------------------------- | ---------------------------------------------- | ----- |
| **`getBatteryStatus`** | <code>() =&gt; <a href="#batterystatus">BatteryStatus</a></code> | 获取设备的当前电池状态。 | 1.0.0 |
| **`getNetworkStatus`** | <code>() =&gt; <a href="#networkstatus">NetworkStatus</a></code> | 获取设备的当前网络状态。 | 1.0.0 |


#### BatteryStatus

| 属性               | 类型                 |
| ------------------ | -------------------- |
| **`batteryLevel`** | <code>number</code>  |
| **`isCharging`**   | <code>boolean</code> |


#### NetworkStatus

| 属性                 | 类型                 |
| -------------------- | -------------------- |
| **`connected`**      | <code>boolean</code> |
| **`connectionType`** | <code>string</code>  |


#### CapacitorKV

一个简单的字符串键/值存储,在 iOS 上由 UserDefaults 支持,在 Android 上由 Shared Preferences 支持。

| 属性         | 类型                                                 | 描述                            | 自    |
| ------------ | ---------------------------------------------------- | -------------------------------------- | ----- |
| **`set`**    | <code>(key: string, value: string) =&gt; void</code> | 使用给定键设置字符串值。 | 1.0.0 |
| **`get`**    | <code>(key: string) =&gt; { value: string; }</code>  | 获取给定键的字符串值。  | 1.0.0 |
| **`remove`** | <code>(key: string) =&gt; void</code>                | 移除给定键的值。     | 1.0.0 |


#### CapacitorNotifications

发送基本本地通知。

| 属性             | 类型                                                                                                | 描述                        | 自    |
| ---------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------- | ----- |
| **`schedule`**   | <code>(options: {}) =&gt; void</code>                                                               | 调度本地通知      | 1.0.0 |
| **`setBadge`**   | <code>(options: <a href="#notificationbadgeoptions">NotificationBadgeOptions</a>) =&gt; void</code> | 设置应用程序徽章计数    | 2.0.0 |
| **`clearBadge`** | <code>() =&gt; void</code>                                                                          | 清除应用程序徽章计数 | 2.0.0 |


#### NotificationScheduleOptions

| 属性                   | 类型                 | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 自    |
| ---------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**               | <code>number</code>  | 通知标识符。在 Android 上,它是一个 32 位整数。因此,该值应介于 -2147483648 和 2147483647 之间(含)。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 1.0.0 |
| **`title`**            | <code>string</code>  | 通知的标题。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 1.0.0 |
| **`body`**             | <code>string</code>  | 通知的正文,显示在标题下方。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 1.0.0 |
| **`scheduleAt`**       | <code>Date</code>    | 发送此通知的日期。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 1.0.0 |
| **`sound`**            | <code>string</code>  | 显示此通知时要播放的音频文件名。在文件名中包含文件扩展名。在 iOS 上,文件应在应用程序包中。在 Android 上,文件应在 res/raw 文件夹中。推荐的格式是`.wav`,因为 iOS 和 Android 都支持。仅适用于 iOS 和 Android < 26。对于 Android 26+,使用配置了所需声音的频道的 channelId。如果找不到声音文件(即空字符串或错误的名称),将使用默认系统通知声音。如果未提供,它将在 Android 上产生默认声音,在 iOS 上不产生声音。 | 1.0.0 |
| **`actionTypeId`**     | <code>string</code>  | 将操作类型与此通知关联。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`threadIdentifier`** | <code>string</code>  | 用于对多个通知进行分组。在[`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent)上设置`threadIdentifier`。仅适用于 iOS。                                                                                                                                                                                                                                                                                                                                                                                                        | 1.0.0 |
| **`summaryArgument`**  | <code>string</code>  | 此通知添加到类别的摘要格式字符串的字符串。在[`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent)上设置`summaryArgument`。仅适用于 iOS。                                                                                                                                                                                                                                                                                                                                                                    | 1.0.0 |
| **`group`**            | <code>string</code>  | 用于对多个通知进行分组。使用提供的值在[`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder)上调用`setGroup()`。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                           | 1.0.0 |
| **`groupSummary`**     | <code>string</code>  | 如果为 true,此通知将成为一组通知的摘要。使用提供的值在[`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder)上调用`setGroupSummary()`。仅适用于使用`group`的 Android。                                                                                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`extra`**            | <code>any</code>     | 设置要在此通知中存储的额外数据。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`ongoing`**          | <code>boolean</code> | 如果为 true,则无法滑动关闭通知。使用提供的值在[`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder)上调用`setOngoing()`。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`autoCancel`**       | <code>boolean</code> | 如果为 true,则当用户单击通知时取消通知。使用提供的值在[`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder)上调用`setAutoCancel()`。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`largeBody`**        | <code>string</code>  | 设置多行文本块以大文本通知样式显示。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 1.0.0 |
| **`summaryText`**      | <code>string</code>  | 用于在收件箱和大文本通知样式中设置摘要文本详细信息。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 1.0.0 |
| **`smallIcon`**        | <code>string</code>  | 设置自定义状态栏图标。如果设置,这将覆盖 Capacitor 配置中的`smallIcon`选项。图标应放置在应用程序的`res/drawable`文件夹中。此选项的值应该是可绘制资源 ID,即不带扩展名的文件名。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                     | 1.0.0 |
| **`largeIcon`**        | <code>string</code>  | 为通知设置大图标。图标应放置在应用程序的`res/drawable`文件夹中。此选项的值应该是可绘制资源 ID,即不带扩展名的文件名。仅适用于 Android。                                                                                                                                                                                                                                                                                                                                                                                           | 1.0.0 |
| **`channelId`**        | <code>string</code>  | 指定应在哪个频道上传递通知。如果具有给定名称的频道不存在,则通知不会触发。如果未提供,它将使用默认频道。使用提供的值在[`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder)上调用`setChannelId()`。仅适用于 Android 26+。                                                                                                                                                                                                                     | 1.0.0 |


#### NotificationBadgeOptions

| 属性                       | 类型                | 描述                                                                           | 自    |
| -------------------------- | ------------------- | ------------------------------------------------------------------------------------- | ----- |
| **`count`**                | <code>number</code> | 要在应用程序徽章计数上设置的数字。                                     | 2.0.0 |
| **`notificationTitle`**    | <code>string</code> | 关联徽章计数通知的**必需**标题。仅适用于 Android。 | 2.0.0 |
| **`notificationSubtitle`** | <code>string</code> | 关联徽章计数通知的副标题。仅适用于 Android。           | 2.0.0 |


#### CapacitorGeolocation

获取访问设备位置信息的权限。

| 属性                     | 类型                                                                                   | 描述                          | 自    |
| ------------------------ | -------------------------------------------------------------------------------------- | ------------------------------------ | ----- |
| **`getCurrentPosition`** | <code>() =&gt; <a href="#getcurrentpositionresult">GetCurrentPositionResult</a></code> | 获取设备的最后已知位置 | 1.0.0 |


#### GetCurrentPositionResult

| 属性                   | 类型                        | 描述                                                                                                           | 自    |
| ---------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----- |
| **`latitude`**         | <code>number</code>         | 十进制度数                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`longitude`**        | <code>number</code>         | 十进制度数                                                                                                                                                                                                                                                                                                                         | 1.0.0 |
| **`accuracy`**         | <code>number</code>         | 纬度和经度坐标的精度级别(米)                                                                                    | 1.0.0 |
| **`altitude`**         | <code>number \| null</code> | 用户所在的海拔(如果可用)                                                                            | 1.0.0 |
| **`altitudeAccuracy`** | <code>number \| null</code> | 海拔坐标的精度级别(米,如果可用)。适用于所有 iOS 版本和 Android 8.0+。 | 1.0.0 |
| **`speed`**            | <code>number \| null</code> | 用户移动的速度(如果可用)                                                                        | 1.0.0 |
| **`heading`**          | <code>number \| null</code> | 用户面向的方向(如果可用)                                                                         | 1.0.0 |


#### CapacitorWatch

与此应用程序配对的手表交互

sendMessage、transferUserInfo 和 updateApplicationContext 是 WCSession 委托方法的原始路由,但在<a href="#capacitorwatch">CapacitorWatch</a> Watch 应用程序中目前没有效果。
如果将原生手表应用程序开发为 Capacitor 应用程序的配套应用程序,则可以使用它们

| 属性                           | 类型                                                                     | 描述                                                                                                                                                                               |
| ------------------------------ | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`sendMessage`**              | <code>(options: []) =&gt; void</code>                                    | 使用 sendMessage() WCSession 委托方法向手表发送消息。这对<a href="#capacitorwatch">CapacitorWatch</a>手表应用程序没有影响                              |
| **`transferUserInfo`**         | <code>(options: []) =&gt; void</code>                                    | 使用 transferUserInfo() WCSession 委托方法向手表发送信息。这对<a href="#capacitorwatch">CapacitorWatch</a>手表应用程序没有效果                       |
| **`updateApplicationContext`** | <code>(options: []) =&gt; void</code>                                    | 使用 updateApplicationContext() WCSession 委托方法更新手表上的应用程序上下文。这对<a href="#capacitorwatch">CapacitorWatch</a>手表应用程序没有效果 |
| **`isReachable`**              | <code>boolean</code>                                                     | 检查配套手表是否可访问                                                                                                                                          |
| **`updateWatchUI`**            | <code>(options: { watchUI: string; }) =&gt; void</code>                  | 用此处指定的内容替换手表上的当前 UI。                                                                                                                         |
| **`updateWatchData`**          | <code>(options: { data: { [key: string]: string; }; }) =&gt; void</code> | 更新手表用于在文本和按钮字段中显示变量的数据                                                                                                        |


#### CapacitorApp

| 属性           | 类型                                                   |
| -------------- | ------------------------------------------------------ |
| **`getState`** | <code>() =&gt; <a href="#appstate">AppState</a></code> |
| **`getInfo`**  | <code>() =&gt; <a href="#appinfo">AppInfo</a></code>   |


#### AppState

| 属性           | 类型                 | 描述                       | 自    |
| -------------- | -------------------- | --------------------------------- | ----- |
| **`isActive`** | <code>boolean</code> | 应用程序是否处于活动状态。 | 1.0.0 |


#### AppInfo

| 属性          | 类型                | 描述                                                                                         | 自    |
| ------------- | ------------------- | --------------------------------------------------------------------------------------------------- | ----- |
| **`name`**    | <code>string</code> | 应用程序的名称。                                                                                | 1.0.0 |
| **`id`**      | <code>string</code> | 应用程序的标识符。在 iOS 上,它是 Bundle Identifier。在 Android 上,它是 Application ID    | 1.0.0 |
| **`build`**   | <code>string</code> | 构建版本。在 iOS 上,它是 CFBundleVersion。在 Android 上,它是 versionCode。                | 1.0.0 |
| **`version`** | <code>string</code> | 应用程序版本。在 iOS 上,它是 CFBundleShortVersionString。在 Android 上,它是包的 versionName。 | 1.0.0 |


</capacitor-api-docs>
