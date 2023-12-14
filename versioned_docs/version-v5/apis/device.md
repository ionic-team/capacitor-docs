---
title: Device Capacitor Plugin API
description: The Device API exposes internal information about the device, such as the model and operating system version, along with user information such as unique ids.
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/device/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/device/src/definitions.ts
sidebar_label: Device
---

# @capacitor/device

The Device API exposes internal information about the device, such as the model and operating system version, along with user information such as unique ids.

## Install

```bash
npm install @capacitor/device
npx cap sync
```

## Example

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


### getId()

```typescript
getId() => Promise<DeviceId>
```

Return an unique identifier for the device.

**Returns:** `Promise&lt;<a href="#deviceid">DeviceId</a>&gt;`

**Since:** 1.0.0

--------------------


### getInfo()

```typescript
getInfo() => Promise<DeviceInfo>
```

Return information about the underlying device/os/platform.

**Returns:** `Promise&lt;<a href="#deviceinfo">DeviceInfo</a>&gt;`

**Since:** 1.0.0

--------------------


### getBatteryInfo()

```typescript
getBatteryInfo() => Promise<BatteryInfo>
```

Return information about the battery.

**Returns:** `Promise&lt;<a href="#batteryinfo">BatteryInfo</a>&gt;`

**Since:** 1.0.0

--------------------


### getLanguageCode()

```typescript
getLanguageCode() => Promise<GetLanguageCodeResult>
```

Get the device's current language locale code.

**Returns:** `Promise&lt;<a href="#getlanguagecoderesult">GetLanguageCodeResult</a>&gt;`

**Since:** 1.0.0

--------------------


### getLanguageTag()

```typescript
getLanguageTag() => Promise<LanguageTag>
```

Get the device's current language locale tag.

**Returns:** `Promise&lt;<a href="#languagetag">LanguageTag</a>&gt;`

**Since:** 4.0.0

--------------------


### Interfaces


#### DeviceId

| Prop             | Type                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Since |
| ---------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`identifier`** | `string` | The identifier of the device as available to the app. This identifier may change on modern mobile platforms that only allow per-app install ids. On iOS, the identifier is a UUID that uniquely identifies a device to the app’s vendor ([read more](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor)). on Android 8+, __the identifier is a 64-bit number (expressed as a hexadecimal string)__, unique to each combination of app-signing key, user, and device ([read more](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID)). On web, a random identifier is generated and stored on localStorage for subsequent calls. If localStorage is not available a new random identifier will be generated on every call. | 1.0.0 |


#### DeviceInfo

| Prop                    | Type                                                        | Description                                                                                                                                                                                                                                                                                                                                      | Since |
| ----------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`name`**              | `string`                                         | The name of the device. For example, "John's iPhone". This is only supported on iOS and Android 7.1 or above. On iOS 16+ this will return a generic device name without the appropriate [entitlements](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_device-information_user-assigned-device-name). | 1.0.0 |
| **`model`**             | `string`                                         | The device model. For example, "iPhone13,4".                                                                                                                                                                                                                                                                                                     | 1.0.0 |
| **`platform`**          | `'ios' \| 'android' \| 'web'`                    | The device platform (lowercase).                                                                                                                                                                                                                                                                                                                 | 1.0.0 |
| **`operatingSystem`**   | `<a href="#operatingsystem">OperatingSystem</a>` | The operating system of the device.                                                                                                                                                                                                                                                                                                              | 1.0.0 |
| **`osVersion`**         | `string`                                         | The version of the device OS.                                                                                                                                                                                                                                                                                                                    | 1.0.0 |
| **`iOSVersion`**        | `number`                                         | The iOS version number. Only available on iOS. Multi-part version numbers are crushed down into an integer padded to two-digits, ex: `"16.3.1"` -&gt; `160301`                                                                                                                                                                                   | 5.0.0 |
| **`androidSDKVersion`** | `number`                                         | The Android SDK version number. Only available on Android.                                                                                                                                                                                                                                                                                       | 5.0.0 |
| **`manufacturer`**      | `string`                                         | The manufacturer of the device.                                                                                                                                                                                                                                                                                                                  | 1.0.0 |
| **`isVirtual`**         | `boolean`                                        | Whether the app is running in a simulator/emulator.                                                                                                                                                                                                                                                                                              | 1.0.0 |
| **`memUsed`**           | `number`                                         | Approximate memory used by the current app, in bytes. Divide by 1048576 to get the number of MBs used.                                                                                                                                                                                                                                           | 1.0.0 |
| **`diskFree`**          | `number`                                         | How much free disk space is available on the normal data storage path for the os, in bytes. On Android it returns the free disk space on the "system" partition holding the core Android OS. On iOS this value is not accurate.                                                                                                                  | 1.0.0 |
| **`diskTotal`**         | `number`                                         | The total size of the normal data storage path for the OS, in bytes. On Android it returns the disk space on the "system" partition holding the core Android OS.                                                                                                                                                                                 | 1.0.0 |
| **`realDiskFree`**      | `number`                                         | How much free disk space is available on the normal data storage, in bytes.                                                                                                                                                                                                                                                                      | 1.1.0 |
| **`realDiskTotal`**     | `number`                                         | The total size of the normal data storage path, in bytes.                                                                                                                                                                                                                                                                                        | 1.1.0 |
| **`webViewVersion`**    | `string`                                         | The web view browser version                                                                                                                                                                                                                                                                                                                     | 1.0.0 |


#### BatteryInfo

| Prop               | Type                 | Description                                                       | Since |
| ------------------ | -------------------- | ----------------------------------------------------------------- | ----- |
| **`batteryLevel`** | `number`  | A percentage (0 to 1) indicating how much the battery is charged. | 1.0.0 |
| **`isCharging`**   | `boolean` | Whether the device is charging.                                   | 1.0.0 |


#### GetLanguageCodeResult

| Prop        | Type                | Description                  | Since |
| ----------- | ------------------- | ---------------------------- | ----- |
| **`value`** | `string` | Two character language code. | 1.0.0 |


#### LanguageTag

| Prop        | Type                | Description                                     | Since |
| ----------- | ------------------- | ----------------------------------------------- | ----- |
| **`value`** | `string` | Returns a well-formed IETF BCP 47 language tag. | 4.0.0 |


### Type Aliases


#### OperatingSystem

`'ios' | 'android' | 'windows' | 'mac' | 'unknown'`

</docgen-api>