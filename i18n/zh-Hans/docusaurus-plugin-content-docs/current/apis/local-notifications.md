---
title: 本地通知 Capacitor 插件 API
description: 本地通知 API 提供了一种在本地调度设备通知的方法（即无需服务器发送推送通知）。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/local-notifications/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/local-notifications/src/definitions.ts
sidebar_label: 本地通知
---

# @capacitor/local-notifications

本地通知 API 提供了一种在本地调度设备通知的方法（即无需服务器发送推送通知）。

## 安装

```bash
npm install @capacitor/local-notifications
npx cap sync
```

## Android

Android 13 需要权限检查才能发送通知。你需要相应地调用 `checkPermissions()` 和 `requestPermissions()`。

在 Android 12 及更早版本上，不会显示提示，只会返回已授予。

从 Android 12 开始，除非将以下权限添加到 `AndroidManifest.xml`，否则定时通知不会精确：

```xml
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
```

请注意，即使存在该权限，用户仍然可以从应用设置中禁用精确通知。使用 `checkExactNotificationSetting()` 来检查设置的值。如果用户禁用此设置，应用将重启，任何使用精确闹钟调度的通知都将被删除。如果你的应用依赖于精确闹钟，请确保在应用启动时检查此设置（例如，在 [`App.appStateChange`](https://capacitorjs.com/docs/apis/app#addlistenerappstatechange-) 中），以提供后备或替代行为。

从 Android 15 开始，应用可以安装在[私密空间](https://developer.android.com/about/versions/15/features#private-space)中。用户可以随时锁定其私密空间，这意味着在用户解锁之前不会显示推送通知。

无法检测应用是否安装在私密空间中。因此，如果你的应用显示任何关键通知，请告知用户避免在私密空间中安装应用。

有关与私密空间相关的应用行为更改的更多信息，请参阅 [Android 文档](https://developer.android.com/about/versions/15/behavior-changes-all#private-space-changes)。

## 配置

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

这些配置值可用：

| Prop                  | Type                  | Description                                                                                                                                                                                                                                                                                                                                                  | Default              | Since |
| --------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- | ----- |
| **`sound`**           | <code>string</code>   | 用于通知的声音文件的名称。该值必须不包含扩展名。                                                                                                                                                                                                                                                                                               | <code>default</code> | 1.0.0 |
| **`iconColor`**       | <code>string</code>   | 图标的十六进制颜色，格式为 #RRGGBB。仅适用于 Android。                                                                                                                                                                                                                                                                                                           |                      | 1.0.0 |
| **`listOptions`**     | <code>object</code>   | 获取通知时列表的选项。包含 `limit`（最大通知数）类型为 `number`。                                                                                                                                                                                                                                                                         |                      | 5.0.0 |
| **`notifications`**   | <code>object[]</code> | 应用启动时通知的默认设置。完整的选项列表可以在 [LocalNotificationSchema](#localnotificationschema) 接口中找到。包含 `title`（通知标题）类型为 `string`，`body`（通知正文）类型为 `string`，`id`（通知的唯一标识符）类型为 `number`，`sound`（通知的声音）类型为 `string`，`schedule`（通知的时间表信息）类型为 `object`。 |                      | 1.0.0 |

### 示例

在 `capacitor.config.json` 中：

```json
{
  "plugins": {
    "LocalNotifications": {
      "sound": "beep.wav",
      "iconColor": "#FF00FF",
      "listOptions": {
        "limit": 10
      },
      "notifications": [
        {
          "title": "Hey you",
          "body": "This is a notification",
          "id": 1,
          "sound": "beep.wav",
          "schedule": {
            "at": new Date(new Date().getTime() + 60000)
          }
        }
      ]
    }
  }
}
```

在 `capacitor.config.ts` 中：

```ts
/// <reference types="@capacitor/local-notifications" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    LocalNotifications: {
      sound: "beep.wav",
      iconColor: "#FF00FF",
      listOptions: {
        limit: 10
      },
      notifications: [
        {
          title: "Hey you",
          body: "This is a notification",
          id: 1,
          sound: "beep.wav",
          schedule: {
            at: new Date(new Date().getTime() + 60000)
          }
        }
      ]
    },
  },
};

export default config;
```

</docgen-config>

## 示例

```typescript
import { LocalNotifications } from '@capacitor/local-notifications';

const scheduleNotifs = async () => {
  await LocalNotifications.schedule({
    notifications: [
      {
        title: 'Title',
        body: 'Body',
        id: 1,
        schedule: {
          at: new Date(new Date().getTime() + 60000),
        },
        sound: 'beep.wav',
        smallIcon: 'ic_stat_icon_config_sample',
        iconColor: '#FF00FF',
      },
    ],
  });
};

// 检查权限
const checkPermissions = async () => {
  const permissions = await LocalNotifications.checkPermissions();

  console.log('permissions:', permissions);
};

// 请求权限
const requestPermissions = async () => {
  const permissions = await LocalNotifications.requestPermissions();

  console.log('permissions:', permissions);
};

// 检查是否启用了精确通知设置（仅限 Android 13+）
const checkExactNotificationSetting = async () => {
  const result = await LocalNotifications.checkExactNotificationSetting();

  console.log('Exact notification setting enabled:', result.enabled);
};

// 取消通知
const cancelNotifs = async () => {
  await LocalNotifications.cancel({
    notifications: [{ id: 1 }],
  });
};

// 获取待处理的通知
const getPending = async () => {
  const pending = await LocalNotifications.getPending();

  console.log('pending notifications:', pending);
};

// 获取已发送的通知
const getDelivered = async () => {
  const delivered = await LocalNotifications.getDelivered();

  console.log('delivered notifications:', delivered);
};

// 注册用于接收操作的监听器
LocalNotifications.addListener('localNotificationReceived', (notification) => {
  console.log('Notification received: ', notification);
});

LocalNotifications.addListener('localNotificationActionPerformed', (action) => {
  console.log('Notification action performed', action);
});
```

## 允许的操作类型

这些是允许的通知操作类型：

| 值             | 描述                                                                                               | Since  |
| -------------- | -------------------------------------------------------------------------------------------------- | ------ |
| `button`       | 按钮操作，文本来自操作 `title`。                                                                     | 6.0.0  |
| `textInput`    | 文本输入操作，文本来自操作 `title`，接受用户输入。用户提交文本后，`inputValue` 将在通知操作事件中返回。 | 6.0.0  |

## 指定声音

要在通知中使用自定义声音，请遵循特定平台的说明。

### iOS

对于 iOS，声音文件必须放在 `res/sounds` 文件夹中。

### Android

对于 Android，声音文件必须放在 `res/raw` 文件夹中。

## 指定图标

在 Android 上，通知必须指定图标。如果没有指定图标，将使用应用图标，但会显示为白色或灰色（取决于 Android 版本）。

通知由一个状态栏图标（单色，对于 Oreo 及以上版本为透明）和通知抽屉中的图标组成。

### 状态栏图标（小图标）

状态栏图标应该仅包含白色像素和透明像素。配置 `smallIcon` 以指定此图标。它应该是没有扩展名的资源名称。

如果未指定，将使用 `ic_stat_icon_config_sample`。

### 通知抽屉图标（大图标）

如果提供了 `iconColor`，`largeIcon` 中指定的图标（如果有）将着色为该颜色。

它应该是指向资源的文件 URI，例如：`file:///path_to_icon.png`。

如果未指定，将使用应用启动器图标。

## Android 通知渠道

从 Android 8.0（API 级别 26）开始，支持并推荐使用通知渠道。SDK 将按以下顺序获取传入推送通知的 `channelId`：

1. **首先检查传入通知是否设置了 `channelId`。**
   从 FCM 控制台或通过其 API 发送推送通知时，可以指定 `channelId`。
2. **然后检查 `AndroidManifest.xml` 中可能给定的值。**
   如果你想创建并使用自己的默认渠道，请将 `default_notification_channel_id` 设置为你的通知渠道对象的 ID，如所示；FCM 将在传入消息未明确设置通知渠道时使用此值。

```xml
<meta-data
    android:name="com.google.firebase.messaging.default_notification_channel_id"
    android:value="@string/default_notification_channel_id" />
```

3. **最后使用 Firebase SDK 为我们提供的后备 `channelId`。**
   FCM 提供了一个具有基本设置的默认通知渠道。此渠道将在收到第一条推送消息时由 Firebase SDK 创建。

## API

<docgen-index>

* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions()`](#requestpermissions)
* [`schedule(...)`](#schedule)
* [`requestPermissionForAllChannels()`](#requestpermissionforallchannels)
* [`cancel(...)`](#cancel)
* [`getPending()`](#getpending)
* [`getDeliveredNotifications()`](#getdeliverednotifications)
* [`removeDeliveredNotifications(...)`](#removedeliverednotifications)
* [`removeAllDeliveredNotifications()`](#removealldeliverednotifications)
* [`removeAllPendingNotifications()`](#removeallpendingnotifications)
* [`createChannel(...)`](#createchannel)
* [`deleteChannel(...)`](#deletechannel)
* [`listChannels()`](#listchannels)
* [`checkExactNotificationSetting()`](#checkexactnotificationsetting)
* [`addListener('localNotificationReceived', ...)`](#addlistenerlocalnotificationreceived-)
* [`addListener('localNotificationActionPerformed', ...)`](#addlistenerlocalnotificationactionperformed-)
* [`removeAllListeners()`](#removealllisteners)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查接收通知的权限。

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 5.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

请求接收通知的权限。

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 5.0.0

--------------------


### schedule(...)

```typescript
schedule(options: ScheduleOptions) => Promise<ScheduleResult>
```

调度通知。

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#scheduleoptions">ScheduleOptions</a></code>   |

**Returns:** <code>Promise&lt;<a href="#scheduleresult">ScheduleResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### requestPermissionForAllChannels()

```typescript
requestPermissionForAllChannels() => Promise<void>
```

请求用户启用系统设置中的所有通知渠道。

仅适用于 Android O 或更高版本（SDK 26+）。

**Since:** 6.0.0

--------------------


### cancel(...)

```typescript
cancel(options: CancelOptions) => Promise<void>
```

取消已调度的通知。

| Param         | Type                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#canceloptions">CancelOptions</a></code> |

**Since:** 1.0.0

--------------------


### getPending()

```typescript
getPending() => Promise<PendingResult>
```

获取待处理的通知列表。

**Returns:** <code>Promise&lt;<a href="#pendingresult">PendingResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### getDeliveredNotifications()

```typescript
getDeliveredNotifications() => Promise<DeliveredNotifications>
```

获取通知屏幕上可见的通知列表。

**Returns:** <code>Promise&lt;<a href="#deliverednotifications">DeliveredNotifications</a>&gt;</code>

**Since:** 1.0.0

--------------------


### removeDeliveredNotifications(...)

```typescript
removeDeliveredNotifications(delivered: DeliveredNotifications) => Promise<void>
```

从通知屏幕中删除指定的通知。

| Param           | Type                                                                      |
| --------------- | ------------------------------------------------------------------------- |
| **`delivered`** | <code><a href="#deliverednotifications">DeliveredNotifications</a></code> |

**Since:** 1.0.0

--------------------


### removeAllDeliveredNotifications()

```typescript
removeAllDeliveredNotifications() => Promise<void>
```

从通知屏幕中删除所有通知。

**Since:** 1.0.0

--------------------


### removeAllPendingNotifications()

```typescript
removeAllPendingNotifications() => Promise<void>
```

删除所有待处理的通知。

**Since:** 1.0.0

--------------------


### createChannel(...)

```typescript
createChannel(channel: Channel) => Promise<void>
```

创建通知渠道。

仅适用于 Android O 或更高版本（SDK 26+）。

| Param         | Type                                        |
| ------------- | ------------------------------------------- |
| **`channel`** | <code><a href="#channel">Channel</a></code> |

**Since:** 1.0.0

--------------------


### deleteChannel(...)

```typescript
deleteChannel(args: { id: string; }) => Promise<void>
```

删除通知渠道。

仅适用于 Android O 或更高版本（SDK 26+）。

| Param      | Type                         |
| ---------- | ---------------------------- |
| **`args`** | <code>{ id: string; }</code> |

**Since:** 1.0.0

--------------------


### listChannels()

```typescript
listChannels() => Promise<ListChannelsResult>
```

列出现有的通知渠道。

仅适用于 Android O 或更高版本（SDK 26+）。

**Returns:** <code>Promise&lt;<a href="#listchannelsresult">ListChannelsResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### checkExactNotificationSetting()

```typescript
checkExactNotificationSetting() => Promise<CheckExactNotificationSettingResult>
```

检查是否启用了精确通知设置。

仅适用于 Android 13 或更高版本（SDK 33+）。

**Returns:** <code>Promise&lt;<a href="#checkexactnotificationsettingresult">CheckExactNotificationSettingResult</a>&gt;</code>

**Since:** 6.1.0

--------------------


### addListener('localNotificationReceived', ...)

```typescript
addListener(eventName: 'localNotificationReceived', listenerFunc: (notification: LocalNotificationSchema) => void) => Promise<PluginListenerHandle>
```

当应用处于打开状态时，收到通知时调用。

| Param              | Type                                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'localNotificationReceived'</code>                                                               |
| **`listenerFunc`** | <code>(notification: <a href="#localnotificationschema">LocalNotificationSchema</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('localNotificationActionPerformed', ...)

```typescript
addListener(eventName: 'localNotificationActionPerformed', listenerFunc: (actionPerformed: ActionPerformed) => void) => Promise<PluginListenerHandle>
```

对通知执行操作时调用。

| Param              | Type                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'localNotificationActionPerformed'</code>                                            |
| **`listenerFunc`** | <code>(actionPerformed: <a href="#actionperformed">ActionPerformed</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

删除此插件的所有本地监听器。

**Since:** 1.0.0

--------------------


### Interfaces


#### AttachmentOptions

| Prop              | Type                | Description                                                                              | Since |
| ----------------- | ------------------- | ---------------------------------------------------------------------------------------- | ----- |
| **`id`**          | <code>string</code> | 附件的唯一标识符。                                                                           | 1.0.0 |
| **`url`**         | <code>string</code> | 文件附件的 URL。可以是文件路径（`file:///path/to/file`）或资源 URI（`content://...`）。        | 1.0.0 |
| **`type`**        | <code>string</code> | 附件的 MIME 类型。                                                                          | 1.0.0 |
| **`thumbnailHidden`** | <code>boolean</code> | 如果为 `true`，附件应隐藏在展开的通知中。仅适用于 iOS。                                           | 6.1.0 |


#### ScheduleResult

| Prop                    | Type                  | Description                                    | Since |
| ----------------------- | --------------------- | ---------------------------------------------- | ----- |
| **`notifications`**     | <code>any[]</code>    | 包含已调度通知的数组，如果取消则返回空。                      | 1.0.0 |


#### CancelOptions

| Prop               | Type                  | Description                     | Since |
| ------------------ | --------------------- | ------------------------------- | ----- |
| **`notifications`** | <code>any[]</code>    | 要取消的通知列表。                     | 1.0.0 |


#### PendingResult

| Prop               | Type                                             | Description                 | Since |
| ------------------ | ------------------------------------------------ | --------------------------- | ----- |
| **`notifications`** | <code><a href="#localnotificationschema">LocalNotificationSchema</a>[]</code> | 待处理的通知列表。        | 1.0.0 |


#### DeliveredNotifications

| Prop                | Type                                             | Description                    | Since |
| ------------------- | ------------------------------------------------ | ------------------------------ | ----- |
| **`notifications`** | <code><a href="#localnotificationschema">LocalNotificationSchema</a>[]</code> | 通知屏幕上可见的通知列表。 | 1.0.0 |


#### Channel

| Prop              | Type                                              | Description                                                                                                                                                                                                                                                   | Default          | Since |
| ----------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----- |
| **`id`**          | <code>string</code>                               | 渠道标识符。                                                                                                                                                                                                                                                    |                  | 1.0.0 |
| **`name`**        | <code>string</code>                               | 此渠道的用户友好名称（呈现给用户）。                                                                                                                                                                                                                                 |                  | 1.0.0 |
| **`description`** | <code>string</code>                               | 此渠道的描述（呈现给用户）。                                                                                                                                                                                                                                       |                  | 1.0.0 |
| **`sound`**       | <code>string</code>                               | 应为发布到此渠道的通知播放的声音。重要性至少为 `3` 的通知渠道应该有声音。应指定声音文件的文件名，相对于 android app `res/raw` 目录。                                                                                                                                      |                  | 1.0.0 |
| **`importance`**  | <code><a href="#importance">Importance</a></code> | 发布到此渠道的通知的中断级别。                                                                                                                                                                                                                                     | <code>`3`</code> | 1.0.0 |
| **`visibility`**  | <code><a href="#visibility">Visibility</a></code> | 发布到此渠道的通知的可见性。此设置用于发布到此渠道的通知是否显示在锁定屏幕上，如果是，是否以编辑形式显示。                                                                                                                                                                 |                  | 1.0.0 |
| **`lights`**      | <code>boolean</code>                              | 发布到此渠道的通知应显示通知灯，在支持的设备上。                                                                                                                                                                                                                       |                  | 1.0.0 |
| **`lightColor`**  | <code>string</code>                               | 发布到此渠道的通知的灯光颜色。仅当在此渠道上启用灯光且设备支持时才支持。支持的颜色格式为 `#RRGGBB` 和 `#RRGGBBAA`。                                                                                                                                                |                  | 1.0.0 |
| **`vibration`**   | <code>boolean</code>                              | 发布到此渠道的通知是否应振动。                                                                                                                                                                                                                                     |                  | 1.0.0 |


#### ListChannelsResult

| Prop           | Type                   | Description                | Since |
| -------------- | ---------------------- | -------------------------- | ----- |
| **`channels`** | <code>Channel[]</code> | 你的应用创建的所有渠道的列表。 | 1.0.0 |


#### ScheduleOptions

| Prop               | Type                                             | Description       | Since |
| ------------------ | ------------------------------------------------ | ----------------- | ----- |
| **`notifications`** | <code><a href="#localnotificationschema">LocalNotificationSchema</a>[]</code> | 要调度的通知列表。 | 1.0.0 |


#### LocalNotificationSchema

| Prop                      | Type                                                                  | Description                                                                                                                                                                | Since |
| ------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`title`**               | <code>string</code>                                                   | 通知标题。                                                                                                                                                                   | 1.0.0 |
| **`body`**                | <code>string</code>                                                   | 通知正文。                                                                                                                                                                   | 1.0.0 |
| **`id`**                  | <code>number</code>                                                   | 通知的唯一标识符。                                                                                                                                                             | 1.0.0 |
| **`schedule`**            | <code><a href="#notificationschedule">NotificationSchedule</a></code> | 通知的时间表信息。                                                                                                                                                             | 1.0.0 |
| **`smallIcon`**           | <code>string</code>                                                   | 小图标资源仅支持 Android。如果未提供，将使用 `ic_stat_icon_config_sample`。                                                                                             | 1.0.0 |
| **`iconColor`**           | <code>string</code>                                                   | 图标的十六进制颜色，格式为 #RRGGBB。仅适用于 Android。                                                                                                                               | 1.0.0 |
| **`largeIcon`**           | <code>string</code>                                                   | 大图标。                                                                                                                                                                   | 1.0.0 |
| **`attachments`**         | <code><a href="#attachmentoptions">AttachmentOptions</a>[]</code>    | 附件。                                                                                                                                                                    | 6.1.0 |
| **`actionTypeId`**        | <code>string</code>                                                   | 操作类型的唯一标识符。                                                                                                                                                             | 1.0.0 |
| **`extra`**               | <code>any</code>                                                      | 要传递的任何额外数据。                                                                                                                                                             | 1.0.0 |
| **`sound`**               | <code>string</code>                                                   | 通知的声音。                                                                                                                                                                  | 1.0.0 |
| **`autoCancel`**          | <code>boolean</code>                                                  | Android 特定：用户点击时是否自动取消通知。默认值为 true。                                                                                                                             | 1.0.0 |
| **`ongoing`**             | <code>boolean</code>                                                  | Android 特定：是否为正在进行的。                                                                                                                                                   | 1.0.0 |
| **`group`**               | <code>string</code>                                                   | Android 特定：将通知分组在一起。                                                                                                                                                   | 1.0.0 |
| **`groupSummary`**        | <code>boolean</code>                                                  | Android 特定：此通知是否为组的摘要。                                                                                                                                            | 1.0.0 |
| **`lights`**              | <code>boolean</code>                                                  | Android 特定：通知是否应发出灯光。                                                                                                                                                  | 1.0.0 |
| **`lightColor`**          | <code>string</code>                                                   | Android 特定：灯光的颜色，格式为 #AARRGGBB 或 #RRGGBB。                                                                                                                              | 1.0.0 |
| **`vibration`**           | <code>boolean</code>                                                  | Android 特定：通知是否应振动。                                                                                                                                                    | 1.0.0 |
| **`lockscreen`**          | <code>boolean</code>                                                  | Android 特定：通知是否应显示在锁定屏幕上。                                                                                                                                            | 1.0.0 |
| **`launchUrl`**           | <code>string</code>                                                   | Android 特定：打开通知时应用应打开的 URL。                                                                                                                                           | 6.0.0 |
| **`launch`**              | <code>boolean</code>                                                  | Android 特定：是否在点击通知时启动应用。默认值为 false。                                                                                                                                  | 1.0.0 |
| **`priority`**            | <code>number</code>                                                   | Android 特定：优先级。应为 min、low、default、high 或 max 其中之一。                                                                                                                  | 1.0.0 |
| **`threads`**             | <code>string</code>                                                   | iOS 特定：用于将通知分组在一起的标识符。                                                                                                                                               | 1.0.0 |
| **`summaryArgument`**     | <code>string</code>                                                   | iOS 特定：摘要参数。                                                                                                                                                             | 1.0.0 |
| **`summaryArgumentCount`** | <code>number</code>                                                   | iOS 特定：摘要参数计数。                                                                                                                                                           | 1.0.0 |


#### NotificationSchedule

| Prop           | Type                  | Description                                                                          | Since |
| -------------- | --------------------- | ------------------------------------------------------------------------------------ | ----- |
| **`at`**       | <code>Date</code>     | 触发通知的日期。如果重复为空，则在设置此时间时触发通知。如果提供了重复，则忽略该日期的日期部分。                      | 1.0.0 |
| **`repeats`**  | <code>boolean</code>  | 是否应重复通知。                                                                        | 1.0.0 |
| **`every`**    | <code>string</code>   | 通知应重复的频率。对于分钟和秒，如果用户超过一次，则使用带逗号分隔的单个值（例如：'minute', 'hour', 'day', 'week', 'month', 'year', '30,45'）。 | 1.0.0 |
| **`count`**    | <code>number</code>   | 通知应重复的次数。每次通知触发时计数器都会递减。直到计数达到零为止，通知都会被触发。                                      | 1.0.0 |
| **`on`**       | <code>object</code>   | 重复触发器的详细信息。包含 `year`（年份）类型为 `number`，`month`（月份，范围 0-11）类型为 `number`，`day`（日期）类型为 `number`，`hour`（小时）类型为 `number`，`minute`（分钟）类型为 `number`。    | 1.0.0 |
| **`allowWhileIdle`** | <code>boolean</code>  | Android 特定：如果为 true，即使应用处于空闲状态，也会触发通知。                                               | 1.0.0 |


#### ActionPerformed

| Prop               | Type                                                                             | Description                     | Since |
| ------------------ | -------------------------------------------------------------------------------- | ------------------------------- | ----- |
| **`actionId`**     | <code>string</code>                                                              | 执行的操作的 ID。                   | 1.0.0 |
| **`inputValue`**   | <code>string</code>                                                              | 输入操作的值。                     | 5.0.0 |
| **`notification`** | <code><a href="#localnotificationschema">LocalNotificationSchema</a></code> | 在其上执行操作的通知。                 | 1.0.0 |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### CheckExactNotificationSettingResult

| Prop        | Type                 | Description                           | Since |
| ----------- | -------------------- | ------------------------------------- | ----- |
| **`enabled`** | <code>boolean</code> | 是否启用了精确通知设置。                    | 6.1.0 |


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


#### PermissionStatus

| Prop                 | Type                                                    | Description            | Since |
| -------------------- | ------------------------------------------------------- | ---------------------- | ----- |
| **`display`**        | <code><a href="#permissionstate">PermissionState</a></code> | 显示通知的权限状态。     | 5.0.0 |
| **`exact`**          | <code><a href="#permissionstate">PermissionState</a></code> | 精确闹钟的权限状态。    | 6.1.0 |


### Type Aliases


#### Importance

重要性级别。有关更多详细信息，请参阅 [Android 开发者文档](https://developer.android.com/reference/android/app/NotificationManager#IMPORTANCE_DEFAULT)

<code>1 | 2 | 3 | 4 | 5</code>


#### Visibility

通知可见性。有关更多详细信息，请参阅 [Android 开发者文档](https://developer.android.com/reference/androidx/core/app/NotificationCompat#VISIBILITY_PRIVATE)

<code>-1 | 0 | 1</code>

</docgen-api>
