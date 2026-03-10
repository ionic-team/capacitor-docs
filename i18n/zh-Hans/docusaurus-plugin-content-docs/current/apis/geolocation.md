---
title: 地理位置 Capacitor 插件 API
description: 地理位置定位 API 提供了简单的方法来使用 GPS 获取和跟踪设备的当前位置，以及可用的高度、航向和速度信息。
custom_edit_url: https://github.com/ionic-team/capacitor-geolocation/blob/main/packages/capacitor-plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-geolocation/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: 地理位置定位
---

# @capacitor/geolocation

地理位置定位 API 提供了简单的方法来使用 GPS 获取和跟踪设备的当前位置，以及可用的高度、航向和速度信息。

## 安装

```bash
npm install @capacitor/geolocation
npx cap sync
```

## iOS

Apple 要求在 `Info.plist` 中指定位置信息的隐私描述：

- `NSLocationAlwaysAndWhenInUseUsageDescription` (`Privacy - Location Always and When In Use Usage Description`)
- `NSLocationWhenInUseUsageDescription` (`Privacy - Location When In Use Usage Description`)

> [!NOTE]
> 此 Capacitor 插件不直接支持后台地理定位。但是，它依赖于
> [`ion-ios-geolocation`](https://github.com/ionic-team/ion-ios-geolocation)，可以在后台报告位置。
> 因此，Apple 要求您在 `Info.plist` 中包含
> `NSLocationAlwaysAndWhenInUseUsageDescription` 条目。由于此权限提示不会向用户显示，
> 您可以安全地使用与 `NSLocationWhenInUseUsageDescription` 相同的描述字符串。

阅读 [iOS 指南](https://capacitorjs.com/docs/ios)中的[配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist)以获取有关在 Xcode 中设置 iOS 权限的更多信息

## Android

此插件需要将以下权限添加到您的 `AndroidManifest.xml` 中：

```xml
<!-- Geolocation Plugin -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<feature android:name="android.hardware.location.gps" />
```

前两个权限请求位置数据，包括精确和粗略位置，最后一行是可选的，但如果您的应用_需要_ GPS 才能运行则是必需的。您可以省略它，但请记住，这可能意味着您的应用将安装在缺少 GPS 硬件的设备上。

阅读 [Android 指南](https://capacitorjs.com/docs/android)中的[设置权限](https://capacitorjs.com/docs/android/configuration#setting-permissions)以获取有关设置 Android 权限的更多信息。


## API

<docgen-index>

* [`getCurrentPosition(...)`](#getcurrentposition)
* [`watchPosition(...)`](#watchposition)
* [`clearWatch(...)`](#clearwatch)
* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions(...)`](#requestpermissions)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

错误代码列表，请参阅[错误](#错误)

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getCurrentPosition(...)

```typescript
getCurrentPosition(options?: PositionOptions | undefined) => Promise<Position>
```

获取设备的当前 GPS 位置

| Param         | Type                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#positionoptions">PositionOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#position">Position</a>&gt;</code>

**Since:** 1.0.0

--------------------


### watchPosition(...)

```typescript
watchPosition(options: PositionOptions, callback: WatchPositionCallback) => Promise<CallbackID>
```

设置位置变化的监视。请注意，监视位置变化可能会消耗大量能量。请明智地仅在需要时进行监听。

| Param          | Type                                                                    |
| -------------- | ----------------------------------------------------------------------- |
| **`options`**  | <code><a href="#positionoptions">PositionOptions</a></code>             |
| **`callback`** | <code><a href="#watchpositioncallback">WatchPositionCallback</a></code> |

**Returns:** <code>Promise&lt;string&gt;</code>

**Since:** 1.0.0

--------------------


### clearWatch(...)

```typescript
clearWatch(options: ClearWatchOptions) => Promise<void>
```

清除指定的监视

| Param         | Type                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#clearwatchoptions">ClearWatchOptions</a></code> |

**Since:** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

检查位置权限。如果系统位置服务被禁用，将抛出异常。

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(permissions?: GeolocationPluginPermissions | undefined) => Promise<PermissionStatus>
```

请求位置权限。如果系统位置服务被禁用，将抛出异常。

在 Web 上不可用。

| Param             | Type                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------- |
| **`permissions`** | <code><a href="#geolocationpluginpermissions">GeolocationPluginPermissions</a></code> |

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 1.0.0

--------------------


### Interfaces


#### Position

| Prop            | Type                                                                                                                                                                                | Description                                             | Since |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ----- |
| **`timestamp`** | <code>number</code>                                                                                                                                                                 | 坐标的创建时间戳                           | 1.0.0 |
| **`coords`**    | <code>{ latitude: number; longitude: number; accuracy: number; altitudeAccuracy: number \| null; altitude: number \| null; speed: number \| null; heading: number \| null; }</code> | GPS 坐标以及数据的准确性 | 1.0.0 |


#### PositionOptions

| Prop                         | Type                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Default                | Since |
| ---------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----- |
| **`enableHighAccuracy`**     | <code>boolean</code> | 高精度模式（如 GPS，如果可用）。在 Android 12+ 设备上，如果用户未授予 ACCESS_FINE_LOCATION 权限（可以通过 location 别名检查），则将被忽略。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | <code>false</code>     | 1.0.0 |
| **`timeout`**                | <code>number</code>  | 等待位置更新的最长时间（毫秒）。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | <code>10000</code>     | 1.0.0 |
| **`maximumAge`**             | <code>number</code>  | 可接受返回的可能缓存位置的最大年龄（毫秒）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | <code>0</code>         | 1.0.0 |
| **`minimumUpdateInterval`**  | <code>number</code>  | `watchPosition` 的最小更新间隔。不要与 `interval` 混淆。如果位置更新可用的速度快于此间隔，则只有在自上次位置更新以来最小更新间隔已过期时才会发生更新。此参数仅适用于 Android。它对 iOS 或 Web 平台没有影响。                                                                                                                                                                                                                                                                                                                                                                                                  | <code>5000</code>      | 6.1.0 |
| **`interval`**               | <code>number</code>  | 在 `watchPosition` 中接收位置更新的期望间隔（毫秒）。对于非常低的 `interval` 值（几秒或更少），平台可能无法保证及时的位置更新 - 它们可能比指定的要长。平台也可能能够以比 `interval` 更快的速度提供位置更新。您可以使用 `minimumUpdateInterval` 来控制该行为。为了与版本 7.1.x 向后兼容，如果未传递值，则此参数的默认值为 `timeout` 的值。此参数仅适用于 Android。它对 iOS 或 Web 平台没有影响。                                                                                                                                | <code>`timeout`</code> | 8.0.0 |
| **`enableLocationFallback`** | <code>boolean</code> | 是否在 Google Play Service 的位置设置检查失败时回退到 Android 框架的 `LocationManager`。这可能发生在多种原因 - 例如设备没有 Play Services 或设备没有网络连接（飞行模式）如果设置为 `false`，失败将被传播给调用者。请注意，`LocationManager` 可能不如 Google Play Services 实现有效。如果设备处于飞行模式，则仅使用 GPS 提供程序，根据 GPS 信号，返回位置可能需要更长时间。这意味着要在这种情况下接收位置，您可能需要提供更高的超时时间。此参数仅适用于 Android。它对 iOS 或 Web 平台没有影响。 | <code>true</code>      | 8.0.0 |


#### ClearWatchOptions

| Prop     | Type                                              |
| -------- | ------------------------------------------------- |
| **`id`** | <code><a href="#callbackid">CallbackID</a></code> |


#### PermissionStatus

| Prop                 | Type                                                        | Description                                                                                                                                                                                                                                                                                                                                                        | Since |
| -------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`location`**       | <code><a href="#permissionstate">PermissionState</a></code> | 位置别名的权限状态。在 Android 上，它请求/检查 ACCESS_COARSE_LOCATION 和 ACCESS_FINE_LOCATION 权限。在 iOS 和 Web 上，它请求/检查位置权限。                                                                                                                                                                        | 1.0.0 |
| **`coarseLocation`** | <code><a href="#permissionstate">PermissionState</a></code> | coarseLocation 别名的权限状态。在 Android 上，它请求/检查 ACCESS_COARSE_LOCATION。在 Android 12+ 上，用户可以在近似位置（ACCESS_COARSE_LOCATION）或精确位置（ACCESS_FINE_LOCATION）之间进行选择，因此如果应用不需要高精度，可以使用此别名。在 iOS 和 Web 上，它将与 location 别名具有相同的值。 | 1.2.0 |


#### GeolocationPluginPermissions

| Prop              | Type                                     |
| ----------------- | ---------------------------------------- |
| **`permissions`** | <code>GeolocationPermissionType[]</code> |


### Type Aliases


#### WatchPositionCallback

<code>(position: <a href="#position">Position</a> | null, err?: any): void</code>


#### CallbackID

<code>string</code>


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


#### GeolocationPermissionType

<code>'location' | 'coarseLocation'</code>

</docgen-api>

### 错误

插件在原生 Android 和 iOS 上返回具有特定代码的特定错误。Web 不遵循此错误标准。

下表列出了所有插件错误：

| 错误代码           | 平台  | 消息                                  |
| -------------------- | ------------ | ---------------------------------------- |
| OS-PLUG-GLOC-0002 | Android, iOS | 尝试获取位置时出错。 |
| OS-PLUG-GLOC-0003 | Android, iOS | 位置权限请求被拒绝。 |
| OS-PLUG-GLOC-0004 | iOS          | 'getCurrentPosition' 输入参数无效。 |
| OS-PLUG-GLOC-0005 | iOS          | 'watchPosition' 输入参数无效。 |
| OS-PLUG-GLOC-0006 | iOS          | 'clearWatch' 输入参数无效。 |
| OS-PLUG-GLOC-0007 | Android, iOS | 位置服务未启用。 |
| OS-PLUG-GLOC-0008 | iOS          | 应用对位置服务的使用受到限制。 |
| OS-PLUG-GLOC-0009 | Android      | 启用位置的请求被拒绝。 |
| OS-PLUG-GLOC-0010 | Android, iOS | 无法及时获取位置。尝试使用更高的超时时间。 |
| OS-PLUG-GLOC-0011 | Android      | 超时时间需要为正值。 |
| OS-PLUG-GLOC-0012 | Android      | 未找到 WatchId。 |
| OS-PLUG-GLOC-0013 | Android      | 需要提供 WatchId。 |
| OS-PLUG-GLOC-0014 | Android      | Google Play Services 错误用户可解决。 |
| OS-PLUG-GLOC-0015 | Android      | Google Play Services 错误。 |
| OS-PLUG-GLOC-0016 | Android      | 位置设置错误。 |
| OS-PLUG-GLOC-0017 | Android      | 无法检索位置，因为设备的网络和位置都已关闭。 |
