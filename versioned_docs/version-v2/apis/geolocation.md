---
title: Geolocation
description: Geolocation API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/geolocation
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

The Geolocation API provides simple methods for getting and tracking the current position of the device using GPS, along
with altitude, heading, and speed information if available.

- [`getCurrentPosition(...)`](#getcurrentposition)
- [`watchPosition(...)`](#watchposition)
- [`clearWatch(...)`](#clearwatch)
- [Interfaces](#interfaces)

## iOS Notes

Apple requires privacy descriptions to be specified in `Info.plist` for location information:

Name: `Privacy - Location Always Usage Description`
Key: `NSLocationAlwaysUsageDescription`

Name: `Privacy - Location When In Use Usage Description`
Key: `NSLocationWhenInUseUsageDescription`

Read about [Setting iOS Permissions](/ios/configuration.md) in the [iOS Guide](/ios/index.md) for more information on setting iOS permissions in Xcode

## Android Notes

This API requires the following permissions be added to your `AndroidManifest.xml`:

```xml
<!-- Geolocation API -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

The first two permissions ask for location data, both fine and coarse, and the last line is optional but necessary if your app _requires_ GPS to function. You may leave it out, though keep in mind that this may mean your app is installed on devices lacking GPS hardware.

Read about [Setting Android Permissions](/android/configuration.md) in the [Android Guide](/android/index.md) for more information on setting Android permissions.

## Example

```typescript
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

class GeolocationExample {
  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current', coordinates);
  }

  watchPosition() {
    const wait = Geolocation.watchPosition({}, (position, err) => {});
  }
}
```

## API

### getCurrentPosition(...)

```typescript
getCurrentPosition(options?: GeolocationOptions) => Promise<GeolocationPosition>
```

Get the current GPS location of the device

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#geolocationoptions">GeolocationOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#geolocationposition">GeolocationPosition</a>&gt;</code>

---

### watchPosition(...)

```typescript
watchPosition(options: GeolocationOptions, callback: GeolocationWatchCallback) => CallbackID
```

Set up a watch for location changes. Note that watching for location changes
can consume a large amount of energy. Be smart about listening only when you need to.

| Param          | Type                                                                                                  |
| -------------- | ----------------------------------------------------------------------------------------------------- |
| **`options`**  | <code><a href="#geolocationoptions">GeolocationOptions</a></code>                                     |
| **`callback`** | <code>(position: <a href="#geolocationposition">GeolocationPosition</a>, err?: any) =&gt; void</code> |

**Returns:** <code>string</code>

---

### clearWatch(...)

```typescript
clearWatch(options: { id: string; }) => Promise<void>
```

Clear a given watch

| Param         | Type                         |
| ------------- | ---------------------------- |
| **`options`** | `{ id: string; }` |

---

### Interfaces

#### GeolocationPosition

| Prop            | Type                                                                                                                                                    | Description                                             |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| **`timestamp`** | <code>number</code>                                                                                                                                     | Creation timestamp for coords                           |
| **`coords`**    | `{ latitude: number; longitude: number; accuracy: number; altitudeAccuracy?: number; altitude?: number; speed?: number; heading?: number; }` | The GPS coordinates along with the accuracy of the data |

#### GeolocationOptions

| Prop                     | Type                 |
| ------------------------ | -------------------- |
| **`enableHighAccuracy`** | <code>boolean</code> |
| **`timeout`**            | <code>number</code>  |
| **`maximumAge`**         | <code>number</code>  |
