---
title: Geolocation Capacitor Plugin API
description: The Geolocation API provides simple methods for getting and tracking the current position of the device using GPS, along with altitude, heading, and speed information if available.
custom_edit_url: https://github.com/ionic-team/capacitor-geolocation/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-geolocation/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: Geolocation
---

# @capacitor/geolocation

The Geolocation API provides simple methods for getting and tracking the current position of the device using GPS, along with altitude, heading, and speed information if available.

## Install

```bash
npm install @capacitor/geolocation
npx cap sync
```

## iOS

Apple requires privacy descriptions to be specified in `Info.plist` for location information:

- `NSLocationAlwaysAndWhenInUseUsageDescription` (`Privacy - Location Always and When In Use Usage Description`)
- `NSLocationWhenInUseUsageDescription` (`Privacy - Location When In Use Usage Description`)

Read about [Configuring `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) in the [iOS Guide](https://capacitorjs.com/docs/ios) for more information on setting iOS permissions in Xcode

## Android

This plugin requires the following permissions be added to your `AndroidManifest.xml`:

```xml
<!-- Geolocation Plugin -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

The first two permissions ask for location data, both fine and coarse, and the last line is optional but necessary if your app _requires_ GPS to function. You may leave it out, though keep in mind that this may mean your app is installed on devices lacking GPS hardware.

Read about [Setting Permissions](https://capacitorjs.com/docs/android/configuration#setting-permissions) in the [Android Guide](https://capacitorjs.com/docs/android) for more information on setting Android permissions.


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

For list of error codes, see [Errors](#errors)

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getCurrentPosition(...)

```typescript
getCurrentPosition(options?: PositionOptions | undefined) => Promise<Position>
```

Get the current GPS location of the device

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

Set up a watch for location changes. Note that watching for location changes
can consume a large amount of energy. Be smart about listening only when you need to.

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

Clear a given watch

| Param         | Type                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#clearwatchoptions">ClearWatchOptions</a></code> |

**Since:** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

Check location permissions.  Will throw if system location services are disabled.

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(permissions?: GeolocationPluginPermissions | undefined) => Promise<PermissionStatus>
```

Request location permissions.  Will throw if system location services are disabled.

Not available on web.

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
| **`timestamp`** | <code>number</code>                                                                                                                                                                 | Creation timestamp for coords                           | 1.0.0 |
| **`coords`**    | <code>{ latitude: number; longitude: number; accuracy: number; altitudeAccuracy: number \| null; altitude: number \| null; speed: number \| null; heading: number \| null; }</code> | The GPS coordinates along with the accuracy of the data | 1.0.0 |


#### PositionOptions

| Prop                        | Type                 | Description                                                                                                                                                                                                                                                                                                     | Default            | Since |
| --------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`enableHighAccuracy`**    | <code>boolean</code> | High accuracy mode (such as GPS, if available) On Android 12+ devices it will be ignored if users didn't grant ACCESS_FINE_LOCATION permissions (can be checked with location alias).                                                                                                                           | <code>false</code> | 1.0.0 |
| **`timeout`**               | <code>number</code>  | The maximum wait time in milliseconds for location updates. In Android, since version 7.1.0 of the plugin, it is also used to determine the interval of location updates for `watchPosition`.                                                                                                                   | <code>10000</code> | 1.0.0 |
| **`maximumAge`**            | <code>number</code>  | The maximum age in milliseconds of a possible cached position that is acceptable to return                                                                                                                                                                                                                      | <code>0</code>     | 1.0.0 |
| **`minimumUpdateInterval`** | <code>number</code>  | The minumum update interval for location updates. If location updates are available faster than this interval then an update will only occur if the minimum update interval has expired since the last location update. This parameter is only available for Android. It has no effect on iOS or Web platforms. | <code>5000</code>  | 6.1.0 |


#### ClearWatchOptions

| Prop     | Type                                              |
| -------- | ------------------------------------------------- |
| **`id`** | <code><a href="#callbackid">CallbackID</a></code> |


#### PermissionStatus

| Prop                 | Type                                                        | Description                                                                                                                                                                                                                                                                                                                                                        | Since |
| -------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`location`**       | <code><a href="#permissionstate">PermissionState</a></code> | Permission state for location alias. On Android it requests/checks both ACCESS_COARSE_LOCATION and ACCESS_FINE_LOCATION permissions. On iOS and web it requests/checks location permission.                                                                                                                                                                        | 1.0.0 |
| **`coarseLocation`** | <code><a href="#permissionstate">PermissionState</a></code> | Permission state for coarseLocation alias. On Android it requests/checks ACCESS_COARSE_LOCATION. On Android 12+, users can choose between Approximate location (ACCESS_COARSE_LOCATION) or Precise location (ACCESS_FINE_LOCATION), so this alias can be used if the app doesn't need high accuracy. On iOS and web it will have the same value as location alias. | 1.2.0 |


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

### Errors

The plugin returns specific errors with specific codes on native Android and iOS. Web does not follow this standard for errors. 

The following table list all the plugin errors:

| Error code           | Platform(s)  | Message                                  |
| -------------------- | ------------ | ---------------------------------------- |
| OS-PLUG-GLOC-0002 | Android, iOS | There was en error trying to obtain the location. |
| OS-PLUG-GLOC-0003 | Android, iOS | Location permission request was denied. |
| OS-PLUG-GLOC-0004 | iOS          | The 'getCurrentPosition' input parameters aren't valid. |
| OS-PLUG-GLOC-0005 | iOS          | The 'watchPosition' input parameters aren't valid. |
| OS-PLUG-GLOC-0006 | iOS          | The 'clearWatch' input parameters aren't valid. |
| OS-PLUG-GLOC-0007 | Android, iOS | Location services are not enabled. |
| OS-PLUG-GLOC-0008 | iOS          | Application's use of location services was restricted. |
| OS-PLUG-GLOC-0009 | Android      | Request to enable location was denied. |
| OS-PLUG-GLOC-0010 | Android      | Could not obtain location in time. Try with a higher timeout. |
| OS-PLUG-GLOC-0011 | Android      | Timeout needs to be a positive value. |
| OS-PLUG-GLOC-0012 | Android      | WatchId not found. |
| OS-PLUG-GLOC-0013 | Android      | WatchId needs to be provided. |
| OS-PLUG-GLOC-0014 | Android      | Google Play Services error user resolvable. |
| OS-PLUG-GLOC-0015 | Android      | Google Play Services error. |
| OS-PLUG-GLOC-0016 | Android      | Location settings error. |