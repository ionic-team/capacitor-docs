---
title: 屏幕方向 Capacitor 插件 API
description: 屏幕方向 API 提供了锁定和解锁屏幕方向的方法。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/screen-orientation/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/screen-orientation/src/definitions.ts
sidebar_label: 屏幕方向
---

# @capacitor/screen-orientation

屏幕方向 API 提供有关屏幕方向的信息和功能。

## 安装

```bash
npm install @capacitor/screen-orientation
npx cap sync
```

## iOS

锁定屏幕方向仅适用于 Capacitor 视图控制器,但不适用于其他呈现的视图控制器(例如由 Browser 插件呈现的控制器)。
要同时锁定呈现的视图控制器,可以将此代码添加到应用的 `AppDelegate.swift` 文件中：

```swift
func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
  return UIInterfaceOrientationMask(rawValue: (self.window!.rootViewController as! CAPBridgeViewController).supportedInterfaceOrientations.rawValue)
}
```

### iPad 方向锁定

默认情况下,iPad 允许多任务处理,其方向无法被锁定。如果你需要在 iPad 上锁定方向,请将选项 `Requires Full Screen` 设置为 `YES`,方法是将以下内容添加到 `Info.plist`：

```
  <key>UIRequiresFullScreen</key>
  <true/>
```

## API

<docgen-index>

* [`orientation()`](#orientation)
* [`lock(...)`](#lock)
* [`unlock()`](#unlock)
* [`addListener('screenOrientationChange', ...)`](#addlistenerscreenorientationchange-)
* [`removeAllListeners()`](#removealllisteners)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### orientation()

```typescript
orientation() => Promise<ScreenOrientationResult>
```

返回当前屏幕方向。

**Returns:** <code>Promise&lt;<a href="#screenorientationresult">ScreenOrientationResult</a>&gt;</code>

**Since:** 4.0.0

--------------------


### lock(...)

```typescript
lock(options: OrientationLockOptions) => Promise<void>
```

锁定屏幕方向。

从 Android targetSdk 36 开始,此方法对 Android 16 及更高版本上的大屏幕(例如平板电脑)无效。
你可以通过在 `AndroidManifest.xml` 中的 `&lt;application&gt;` 或 `&lt;activity&gt;` 内添加 `&lt;property android:name="android.window.PROPERTY_COMPAT_ALLOW_RESTRICTED_RESIZABILITY" android:value="true" /&gt;` 来选择退出应用中的此行为。
但请记住,此选择退出是临时的,将在 Android 17 中不再起作用。Android 不建议为大屏幕设置特定方向。
普通 Android 手机不受此更改影响。
有关更多信息,请查看 Android 文档 https://developer.android.com/about/versions/16/behavior-changes-16#adaptive-layouts

| Param         | Type                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| **`options`** | <code><a href="#orientationlockoptions">OrientationLockOptions</a></code> |

**Since:** 4.0.0

--------------------


### unlock()

```typescript
unlock() => Promise<void>
```

解锁屏幕方向。

**Since:** 4.0.0

--------------------


### addListener('screenOrientationChange', ...)

```typescript
addListener(eventName: 'screenOrientationChange', listenerFunc: (orientation: ScreenOrientationResult) => void) => Promise<PluginListenerHandle>
```

监听屏幕方向更改。

| Param              | Type                                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'screenOrientationChange'</code>                                                                |
| **`listenerFunc`** | <code>(orientation: <a href="#screenorientationresult">ScreenOrientationResult</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 4.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

删除所有监听器。

**Since:** 4.0.0

--------------------


### Interfaces


#### ScreenOrientationResult

| Prop       | Type                         |
| ---------- | ---------------------------- |
| **`type`** | <code>OrientationType</code> |


#### OrientationLockOptions

| Prop              | Type                                                                | Description                                                                                                                           |
| ----------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **`orientation`** | <code><a href="#orientationlocktype">OrientationLockType</a></code> | 注意：Typescript v5.2+ 用户应从 @capacitor/screen-orientation 导入 <a href="#orientationlocktype">OrientationLockType</a>。     |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### Type Aliases


#### OrientationLockType

<code>'any' | 'natural' | 'landscape' | 'portrait' | 'portrait-primary' | 'portrait-secondary' | 'landscape-primary' | 'landscape-secondary'</code>

</docgen-api>
