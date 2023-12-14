---
title: Device
description: Device API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/device
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

The Device API exposes internal information about the device, such as the model and operating system version, along with user information
such as unique ids.

- [`getInfo()`](#getinfo)
- [`getBatteryInfo()`](#getbatteryinfo)
- [`getLanguageCode()`](#getlanguagecode)
- [Interfaces](#interfaces)

## Example

```typescript
import { Plugins } from '@capacitor/core';

const { Device } = Plugins;

const info = await Device.getInfo();
console.log(info);

// Example output:
{
  "diskFree": 12228108288,
  "appVersion": "1.0.2",
  "appBuild": "123",
  "appId": "com.capacitorjs.myapp",
  "appName": "MyApp",
  "operatingSystem": "ios",
  "osVersion": "11.2",
  "platform": "ios",
  "memUsed": 93851648,
  "diskTotal": 499054952448,
  "model": "iPhone",
  "manufacturer": "Apple",
  "uuid": "84AE7AA1-7000-4696-8A74-4FD588A4A5C7",
  "isVirtual":true
}

const info = await Device.getBatteryInfo();
console.log(info);

// Example output:
{
  "batteryLevel": -1,
  "isCharging": true
}
```

## API

### getInfo()

```typescript
getInfo() => Promise<DeviceInfo>
```

Return information about the underlying device/os/platform

**Returns:** `Promise&lt;<a href="#deviceinfo">DeviceInfo</a>&gt;`

---

### getBatteryInfo()

```typescript
getBatteryInfo() => Promise<DeviceBatteryInfo>
```

Return information about the battery

**Returns:** `Promise&lt;<a href="#devicebatteryinfo">DeviceBatteryInfo</a>&gt;`

---

### getLanguageCode()

```typescript
getLanguageCode() => Promise<DeviceLanguageCodeResult>
```

Get the device's current language locale code

**Returns:** `Promise&lt;<a href="#devicelanguagecoderesult">DeviceLanguageCodeResult</a>&gt;`

---

### Interfaces

#### DeviceInfo

| Prop                  | Type                                                               | Description                                                                                                                                  |
| --------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **`name`**            | `string`                                                | Note: this property is iOS only. The name of the device. For example, "John's iPhone"                                                        |
| **`model`**           | `string`                                                | The device model. For example, "iPhone"                                                                                                      |
| **`platform`**        | `"ios" \| "android" \| "electron" \| "web"`             | The device platform (lowercase).                                                                                                             |
| **`uuid`**            | `string`                                                | The UUID of the device as available to the app. This identifier may change on modern mobile platforms that only allow per-app install UUIDs. |
| **`appVersion`**      | `string`                                                | The current bundle verison of the app                                                                                                        |
| **`appBuild`**        | `string`                                                | The current bundle build of the app                                                                                                          |
| **`appId`**           | `string`                                                | The bundle id of the app                                                                                                                     |
| **`appName`**         | `string`                                                | The display name of the app                                                                                                                  |
| **`operatingSystem`** | `"unknown" \| "ios" \| "android" \| "windows" \| "mac"` | The operating system of the device                                                                                                           |
| **`osVersion`**       | `string`                                                | The version of the device OS                                                                                                                 |
| **`manufacturer`**    | `string`                                                | The manufacturer of the device                                                                                                               |
| **`isVirtual`**       | `boolean`                                               | Whether the app is running in a simulator/emulator                                                                                           |
| **`memUsed`**         | `number`                                                | Approximate memory used by the current app, in bytes. Divide by 1048576 to get the number of MBs used.                                       |
| **`diskFree`**        | `number`                                                | How much free disk space is available on the the normal data storage path for the os, in bytes                                               |
| **`diskTotal`**       | `number`                                                | The total size of the normal data storage path for the OS, in bytes                                                                          |

#### DeviceBatteryInfo

| Prop               | Type                 | Description                                                      |
| ------------------ | -------------------- | ---------------------------------------------------------------- |
| **`batteryLevel`** | `number`  | A percentage (0 to 1) indicating how much the battery is charged |
| **`isCharging`**   | `boolean` | Whether the device is charging                                   |

#### DeviceLanguageCodeResult

| Prop        | Type                |
| ----------- | ------------------- |
| **`value`** | `string` |
