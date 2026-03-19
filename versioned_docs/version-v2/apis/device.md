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

**Returns:** <code>Promise&lt;<a href="#deviceinfo">DeviceInfo</a>&gt;</code>

---

### getBatteryInfo()

```typescript
getBatteryInfo() => Promise<DeviceBatteryInfo>
```

Return information about the battery

**Returns:** <code>Promise&lt;<a href="#devicebatteryinfo">DeviceBatteryInfo</a>&gt;</code>

---

### getLanguageCode()

```typescript
getLanguageCode() => Promise<DeviceLanguageCodeResult>
```

Get the device's current language locale code

**Returns:** <code>Promise&lt;<a href="#devicelanguagecoderesult">DeviceLanguageCodeResult</a>&gt;</code>

---

### Interfaces

#### DeviceInfo

| Prop                  | Type                                                               | Description                                                                                                                                  |
| --------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **`name`**            | <code>string</code>                                                | Note: this property is iOS only. The name of the device. For example, "John's iPhone"                                                        |
| **`model`**           | <code>string</code>                                                | The device model. For example, "iPhone"                                                                                                      |
| **`platform`**        | <code>"ios" \| "android" \| "electron" \| "web"</code>             | The device platform (lowercase).                                                                                                             |
| **`uuid`**            | <code>string</code>                                                | The UUID of the device as available to the app. This identifier may change on modern mobile platforms that only allow per-app install UUIDs. |
| **`appVersion`**      | <code>string</code>                                                | The current bundle version of the app                                                                                                        |
| **`appBuild`**        | <code>string</code>                                                | The current bundle build of the app                                                                                                          |
| **`appId`**           | <code>string</code>                                                | The bundle id of the app                                                                                                                     |
| **`appName`**         | <code>string</code>                                                | The display name of the app                                                                                                                  |
| **`operatingSystem`** | <code>"unknown" \| "ios" \| "android" \| "windows" \| "mac"</code> | The operating system of the device                                                                                                           |
| **`osVersion`**       | <code>string</code>                                                | The version of the device OS                                                                                                                 |
| **`manufacturer`**    | <code>string</code>                                                | The manufacturer of the device                                                                                                               |
| **`isVirtual`**       | <code>boolean</code>                                               | Whether the app is running in a simulator/emulator                                                                                           |
| **`memUsed`**         | <code>number</code>                                                | Approximate memory used by the current app, in bytes. Divide by 1048576 to get the number of MBs used.                                       |
| **`diskFree`**        | <code>number</code>                                                | How much free disk space is available on the the normal data storage path for the os, in bytes                                               |
| **`diskTotal`**       | <code>number</code>                                                | The total size of the normal data storage path for the OS, in bytes                                                                          |

#### DeviceBatteryInfo

| Prop               | Type                 | Description                                                      |
| ------------------ | -------------------- | ---------------------------------------------------------------- |
| **`batteryLevel`** | <code>number</code>  | A percentage (0 to 1) indicating how much the battery is charged |
| **`isCharging`**   | <code>boolean</code> | Whether the device is charging                                   |

#### DeviceLanguageCodeResult

| Prop        | Type                |
| ----------- | ------------------- |
| **`value`** | <code>string</code> |
