---
title: 设备 Capacitor 插件 API
description: 设备 API 公开有关设备的内部信息,例如型号和操作系统版本,以及用户信息,例如唯一 ID。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/device/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/device/src/definitions.ts
sidebar_label: 设备
---

# @capacitor/device

设备 API 公开有关设备的内部信息,例如型号和操作系统版本,以及用户信息,例如唯一 ID。

## 安装

```bash
npm install @capacitor/device
npx cap sync
```

## 插件使用示例

```typescript
import { Device } from '@capacitor/device';

const logDeviceInfo = async () => {
  const info = await Device.getInfo();

  console.log(info);
};

const logBatteryInfo = async () => {
  const info = await Device.getBatteryInfo();

  console.log(info);
};
```

## API

<docgen-index>

* [`getId()`](#getid)
* [`getInfo()`](#getinfo)
* [`getBatteryInfo()`](#getbatteryinfo)
* [`getLanguageCode()`](#getlanguagecode)
* [`getLanguageTag()`](#getlanguagetag)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### getId()

```typescript
getId() => Promise<DeviceId>
```

返回设备的唯一标识符。

**返回:** <code>Promise&lt;<a href="#deviceid">DeviceId</a>&gt;</code>

**自:** 1.0.0

--------------------


### getInfo()

```typescript
getInfo() => Promise<DeviceInfo>
```

返回有关底层设备/操作系统/平台的信息。

**返回:** <code>Promise&lt;<a href="#deviceinfo">DeviceInfo</a>&gt;</code>

**自:** 1.0.0

--------------------


### getBatteryInfo()

```typescript
getBatteryInfo() => Promise<BatteryInfo>
```

返回有关电池的信息。

**返回:** <code>Promise&lt;<a href="#batteryinfo">BatteryInfo</a>&gt;</code>

**自:** 1.0.0

--------------------


### getLanguageCode()

```typescript
getLanguageCode() => Promise<GetLanguageCodeResult>
```

获取设备的当前语言区域代码。

**返回:** <code>Promise&lt;<a href="#getlanguagecoderesult">GetLanguageCodeResult</a>&gt;</code>

**自:** 1.0.0

--------------------


### getLanguageTag()

```typescript
getLanguageTag() => Promise<LanguageTag>
```

获取设备的当前语言区域标签。

**返回:** <code>Promise&lt;<a href="#languagetag">LanguageTag</a>&gt;</code>

**自:** 4.0.0

--------------------


### Interfaces


#### DeviceId

| 属性             | 类型                | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 自    |
| ---------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`identifier`** | <code>string</code> | 应用程序可用的设备标识符。在仅允许每个应用安装 ID 的现代移动平台上,此标识符可能会更改。在 iOS 上,标识符是一个 UUID,唯一标识应用程序供应商的设备([了解更多](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor))。在 Android 8+ 上,__标识符是一个 64 位数字(表示为十六进制字符串)__,对于每个应用签名密钥、用户和设备的组合都是唯一的([了解更多](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID))。在 Web 上,会生成一个随机标识符并存储在 localStorage 上以供后续调用使用。如果 localStorage 不可用,则每次调用都会生成一个新的随机标识符。 | 1.0.0 |


#### DeviceInfo

| 属性                    | 类型                                                        | 描述                                                                                                                                                                                                                                                                                                                                      | 自    |
| ----------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`name`**              | <code>string</code>                                         | 设备名称。例如,"John's iPhone"。这仅在 iOS 和 Android 7.1 或更高版本上支持。在 iOS 16+ 上,这将返回没有适当[权限](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_device-information_user-assigned-device-name)的通用设备名称。 | 1.0.0 |
| **`model`**             | <code>string</code>                                         | 设备型号。例如,"iPhone13,4"。                                                                                                                                                                                                                                                                                                     | 1.0.0 |
| **`platform`**          | <code>'ios' \| 'android' \| 'web'</code>                    | 设备平台(小写)。                                                                                                                                                                                                                                                                                                                 | 1.0.0 |
| **`operatingSystem`**   | <code><a href="#operatingsystem">OperatingSystem</a></code> | 设备的操作系统。                                                                                                                                                                                                                                                                                                              | 1.0.0 |
| **`osVersion`**         | <code>string</code>                                         | 设备操作系统的版本。                                                                                                                                                                                                                                                                                                                    | 1.0.0 |
| **`iOSVersion`**        | <code>number</code>                                         | iOS 版本号。仅在 iOS 上可用。多部分版本号被压缩为填充到两位的整数,例如:`"16.3.1"` -&gt; `160301`                                                                                                                                                                                   | 5.0.0 |
| **`androidSDKVersion`** | <code>number</code>                                         | Android SDK 版本号。仅在 Android 上可用。                                                                                                                                                                                                                                                                                       | 5.0.0 |
| **`manufacturer`**      | <code>string</code>                                         | 设备制造商。                                                                                                                                                                                                                                                                                                                  | 1.0.0 |
| **`isVirtual`**         | <code>boolean</code>                                        | 应用程序是否在模拟器/模拟器中运行。                                                                                                                                                                                                                                                                                              | 1.0.0 |
| **`memUsed`**           | <code>number</code>                                         | 当前应用程序使用的近似内存(以字节为单位)。除以 1048576 以获取使用的 MB 数。                                                                                                                                                                                                                                           | 1.0.0 |
| **`webViewVersion`**    | <code>string</code>                                         | Web 视图浏览器版本                                                                                                                                                                                                                                                                                                                     | 1.0.0 |


#### BatteryInfo

| 属性               | 类型                 | 描述                                                       | 自    |
| ------------------ | -------------------- | ----------------------------------------------------------------- | ----- |
| **`batteryLevel`** | <code>number</code>  | 百分比(0 到 1),指示电池充电量。 | 1.0.0 |
| **`isCharging`**   | <code>boolean</code> | 设备是否正在充电。                                   | 1.0.0 |


#### GetLanguageCodeResult

| 属性        | 类型                | 描述                  | 自    |
| ----------- | ------------------- | ---------------------------- | ----- |
| **`value`** | <code>string</code> | 两个字符的语言代码。 | 1.0.0 |


#### LanguageTag

| 属性        | 类型                | 描述                                     | 自    |
| ----------- | ------------------- | ----------------------------------------------- | ----- |
| **`value`** | <code>string</code> | 返回格式良好的 IETF BCP 47 语言标签。 | 4.0.0 |


### Type Aliases


#### OperatingSystem

<code>'ios' | 'android' | 'windows' | 'mac' | 'unknown'</code>

</docgen-api>
