---
title: App
description: App API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/app
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

The App API handles high level App state and events.

For example, this API emits events when the app enters and leaves the foreground, handles
deeplinks, opens other apps, and manages persisted plugin state.

- [`exitApp()`](#exitapp)
- [`canOpenUrl(...)`](#canopenurl)
- [`openUrl(...)`](#openurl)
- [`getState()`](#getstate)
- [`getLaunchUrl()`](#getlaunchurl)
- [`addListener(...)`](#addlistener)
- [`addListener(...)`](#addlistener)
- [`addListener(...)`](#addlistener)
- [`addListener(...)`](#addlistener)
- [`removeAllListeners()`](#removealllisteners)
- [Interfaces](#interfaces)

## Note about `canOpenUrl`

To use `canOpenUrl`, you need to set the URL schemes your app will query for in `LSApplicationQueriesSchemes` in `Info.plist`.

Read more about [LSApplicationQueriesSchemes](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/uid/TP40009250-SW14) and [configuring Info.plist](/ios/configuration.md).

## Example

```typescript
import { Plugins, AppState } from '@capacitor/core';

const { App } = Plugins;

App.addListener('appStateChange', (state: AppState) => {
  // state.isActive contains the active state
  console.log('App state changed. Is active?', state.isActive);
});

var ret = await App.canOpenUrl({ url: 'com.getcapacitor.myapp' });
console.log('Can open url: ', ret.value);

ret = await App.openUrl({
  url: 'com.getcapacitor.myapp://page?id=ionicframework',
});
console.log('Open url response: ', ret);

ret = await App.getLaunchUrl();
if (ret && ret.url) {
  console.log('App opened with URL: ' + ret.url);
}
console.log('Launch url: ', ret);

App.addListener('appUrlOpen', (data: any) => {
  console.log('App opened with URL: ' + data.url);
});

App.addListener('appRestoredResult', (data: any) => {
  console.log('Restored state:', data);
});
```

## Android: Use appRestoredResult

On Android, due to memory constraints on low-end devices, it's possible that, if your app launches a new activity, your app will be terminated by the operating system
in order to reduce memory consumption.

For example, that means the `Camera` API, which launches a new Activity to take a photo, may not be able to return data back to your app.

To avoid this, Capacitor stores all restored activity results on launch. You should add a listener for `appRestoredResult` in order to handle any
plugin call results that were delivered when your app was not running.

Once you have that result (if any), you can update the UI to restore a logical experience for the user, such as navigating or selecting the proper tab.

We recommend every Android app using plugins that rely on external Activities (for example, Camera) to have this event and process handled.

## API

### exitApp()

```typescript
exitApp() => never
```

Force exit the app. This should only be used in conjunction with the `backButton` handler for Android to
exit the app when navigation is complete.

Ionic handles this itself so you shouldn't need to call this if using Ionic

**Returns:** <code>never</code>

---

### canOpenUrl(...)

```typescript
canOpenUrl(options: { url: string; }) => Promise<{ value: boolean; }>
```

Check if an app can be opened with the given URL

| Param         | Type                          |
| ------------- | ----------------------------- |
| **`options`** | `{ url: string; }` |

**Returns:** `Promise<{ value: boolean; }>`

---

### openUrl(...)

```typescript
openUrl(options: { url: string; }) => Promise<{ completed: boolean; }>
```

Open an app with the given URL

| Param         | Type                          |
| ------------- | ----------------------------- |
| **`options`** | `{ url: string; }` |

**Returns:** `Promise<{ completed: boolean; }>`

---

### getState()

```typescript
getState() => Promise<AppState>
```

Gets the current app state

**Returns:** <code>Promise&lt;<a href="#appstate">AppState</a>&gt;</code>

---

### getLaunchUrl()

```typescript
getLaunchUrl() => Promise<AppLaunchUrl>
```

Get the URL the app was launched with, if any

**Returns:** <code>Promise&lt;<a href="#applaunchurl">AppLaunchUrl</a>&gt;</code>

---

### addListener(...)

```typescript
addListener(eventName: 'appStateChange', listenerFunc: (state: AppState) => void) => PluginListenerHandle
```

Listen for changes in the App's active state (whether the app is in the foreground or background)

| Param              | Type                                                              |
| ------------------ | ----------------------------------------------------------------- |
| **`eventName`**    | <code>"appStateChange"</code>                                     |
| **`listenerFunc`** | <code>(state: <a href="#appstate">AppState</a>) =&gt; void</code> |

**Returns:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'appUrlOpen', listenerFunc: (data: AppUrlOpen) => void) => PluginListenerHandle
```

Listen for url open events for the app. This handles both custom URL scheme links as well
as URLs your app handles (Universal Links on iOS and App Links on Android)

| Param              | Type                                                                 |
| ------------------ | -------------------------------------------------------------------- |
| **`eventName`**    | <code>"appUrlOpen"</code>                                            |
| **`listenerFunc`** | <code>(data: <a href="#appurlopen">AppUrlOpen</a>) =&gt; void</code> |

**Returns:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'appRestoredResult', listenerFunc: (data: AppRestoredResult) => void) => PluginListenerHandle
```

If the app was launched with previously persisted plugin call data, such as on Android
when an activity returns to an app that was closed, this call will return any data
the app was launched with, converted into the form of a result from a plugin call.

| Param              | Type                                                                               |
| ------------------ | ---------------------------------------------------------------------------------- |
| **`eventName`**    | <code>"appRestoredResult"</code>                                                   |
| **`listenerFunc`** | <code>(data: <a href="#apprestoredresult">AppRestoredResult</a>) =&gt; void</code> |

**Returns:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'backButton', listenerFunc: (data: AppUrlOpen) => void) => PluginListenerHandle
```

Listen for the hardware back button event (Android only). Listening for this event will disable the
default back button behaviour, so you might want to call `window.history.back()` manually.
If you want to close the app, call `App.exitApp()`.

| Param              | Type                                                                 |
| ------------------ | -------------------------------------------------------------------- |
| **`eventName`**    | <code>"backButton"</code>                                            |
| **`listenerFunc`** | <code>(data: <a href="#appurlopen">AppUrlOpen</a>) =&gt; void</code> |

**Returns:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### removeAllListeners()

```typescript
removeAllListeners() => void
```

Remove all native listeners for this plugin

---

### Interfaces

#### AppState

| Prop           | Type                 |
| -------------- | -------------------- |
| **`isActive`** | <code>boolean</code> |

#### AppLaunchUrl

| Prop      | Type                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |

#### PluginListenerHandle

| Prop         | Type                       |
| ------------ | -------------------------- |
| **`remove`** | <code>() =&gt; void</code> |

#### AppUrlOpen

| Prop                       | Type                 | Description                                                                                                                                                                        |
| -------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`url`**                  | <code>string</code>  | The URL the app was opened with                                                                                                                                                    |
| **`iosSourceApplication`** | <code>any</code>     | The source application opening the app (iOS only) https://developer.apple.com/documentation/uikit/uiapplicationopenurloptionskey/1623128-sourceapplication                         |
| **`iosOpenInPlace`**       | <code>boolean</code> | Whether the app should open the passed document in-place or must copy it first. https://developer.apple.com/documentation/uikit/uiapplicationopenurloptionskey/1623123-openinplace |

#### AppRestoredResult

| Prop             | Type                              | Description                                                                                                                                       |
| ---------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`pluginId`**   | <code>string</code>               | The pluginId this result corresponds to. For example, `Camera`.                                                                                   |
| **`methodName`** | <code>string</code>               | The methodName this result corresponds to. For example, `getPhoto`                                                                                |
| **`data`**       | <code>any</code>                  | The result data passed from the plugin. This would be the result you'd expect from normally calling the plugin method. For example, `CameraPhoto` |
| **`success`**    | <code>boolean</code>              | Boolean indicating if the plugin call succeeded                                                                                                   |
| **`error`**      | `{ message: string; }` | If the plugin call didn't succeed, it will contain the error message                                                                              |
