---
title: Background Runner Capacitor Plugin API
description: Capacitor Background Runner
editUrl: https://github.com/ionic-team/capacitor-background-runner/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-background-runner/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: Background Runner
---

# @capacitor/background-runner

Background Runner provides an event-based standalone JavaScript environment for executing your Javascript code outside of the web view.

## Install

```bash
npm install @capacitor/background-runner
npx cap sync
```

Background Runner has support for various device APIs that require permission from the user prior to use.

## iOS

On iOS you must enable the Background Modes capability.

![Enable Background Mode Capability in Xcode](https://github.com/ionic-team/capacitor-background-runner/raw/main/docs/enable_background_mode_capability.png)

Once added, you must enable the `Background fetch` and `Background processing` modes at a minimum to enable the ability to register and schedule your background tasks.

If you will be making use of Geolocation or Push Notifications, enable `Location updates` or `Remote notifications` respectively.

![Configure Background Modes in Xcode](https://github.com/ionic-team/capacitor-background-runner/raw/main/docs/configure_background_modes.png)

After enabling the Background Modes capability, add the following to your app's `AppDelegate.swift`:

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

    // ....
    BackgroundRunnerPlugin.registerBackgroundTask()
    BackgroundRunnerPlugin.handleApplicationDidFinishLaunching(launchOptions: launchOptions)
    // ....

    return true
}
```

To allow the Background Runner to handle remote notifications, add the following:

```swift
func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
        // ....
        BackgroundRunnerPlugin.dispatchEvent(event: "remoteNotification", eventArgs: userInfo) { result in
            switch result {
            case .success:
                completionHandler(.newData)
            case .failure:
                completionHandler(.failed)
            }
        }
    }
```

### Geolocation

Apple requires privacy descriptions to be specified in `Info.plist` for location information:

- `NSLocationAlwaysUsageDescription` (`Privacy - Location Always Usage Description`)
- `NSLocationWhenInUseUsageDescription` (`Privacy - Location When In Use Usage Description`)

Read about [Configuring `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) in the [iOS Guide](https://capacitorjs.com/docs/ios) for more information on setting iOS permissions in Xcode

## Android

### Geolocation

This API requires the following permissions be added to your `AndroidManifest.xml`:

```xml

<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />
```

The first two permissions ask for location data, both fine and coarse, and the last line is optional but necessary if your app _requires_ GPS to function. You may leave it out, though keep in mind that this may mean your app is installed on devices lacking GPS hardware.

### Local Notifications

Android 13 requires a permission check in order to send notifications. You are required to call `checkPermissions()` and `requestPermissions()` accordingly.

On Android 12 and older it won't show a prompt and will just return as granted.

Starting on Android 12, scheduled notifications won't be exact unless this permission is added to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
```

Note that even if the permission is present, users can still disable exact notifications from the app settings.

Read about [Setting Permissions](https://capacitorjs.com/docs/android/configuration#setting-permissions) in the [Android Guide](https://capacitorjs.com/docs/android) for more information on setting Android permissions.

## Using Background Runner

Background Runner is an event based JavaScript environment that emits events to a javascript runner file that you designate in your `capacitor.config.ts` file. If the runner finds a event handler corresponding to incoming event in your runner file, it will execute the event handler, then shutdown once `resolve()` or `reject()` are called (or if the OS force kills your process).

#### Example Runner JS File

```js
addEventListener('myCustomEvent', (resolve, reject, args) => {
  console.log('do something to update the system here');
  resolve();
});

addEventListener('myCustomEventWithReturnData', (resolve, reject, args) => {
  try {
    console.log('accepted this data: ' + JSON.stringify(args.user));

    const updatedUser = args.user;
    updatedUser.firstName = updatedUser.firstName + ' HELLO';
    updatedUser.lastName = updatedUser.lastName + ' WORLD';

    resolve(updatedUser);
  } catch (err) {
    reject(err);
  }
});

addEventListener('remoteNotification', (resolve, reject, args) => {
  try {
    console.log('received silent push notification');

    CapacitorNotifications.schedule([
      {
        id: 100,
        title: 'Enterprise Background Runner',
        body: 'Received silent push notification',
      },
    ]);

    resolve();
  } catch (err) {
    reject();
  }
});
```

Calling `resolve()` \ `reject()` is **required** within every event handler called by the runner. Failure to do this could result in your runner being killed by the OS if your event is called while the app is in the background. If the app is in the foreground, async calls to `dispatchEvent` may not resolve.

## Configuring Background Runner

On load, Background Runner will automatically register a background task that will be scheduled and ran once your app is backgrounded. The settings for this behavior is defined in your `capacitor.config.ts` file:

```ts
const config: CapacitorConfig = {
  plugins: {
    BackgroundRunner: {
      label: 'com.example.background.task',
      src: 'background.js',
      event: 'myCustomEvent',
      repeat: true,
      interval: 2,
      autoStart: false,
    },
  },
};
```

## JavaScript API

Background Runner does not execute your Javascript code in a browser or web view, therefore the typical Web APIs you may be used to may not be available. This includes DOM APIs nor ability to interact with your application's DOM.

Below is a list of the available Web APIs provided in Background Runner:

- [console](https://developer.mozilla.org/en-US/docs/Web/API/console)
  - only `info`, `log`, `warn`, `error` , and `debug` are available
- [TextDecoder](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder)
  - only `decode` is available
- [TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder)
  - only `encode` is available
- [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
  - Event Listener options and `useCapture` not supported
- [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
- [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)
- [clearTimeout](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout)
- [clearInterval](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval)
- [crypto](https://developer.mozilla.org/en-US/docs/Web/API/Crypto)
- [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  - Request object not yet supported
  - Only `method`, `headers` and `body` supported in options object

In addition to the standard Web APIs, Background Runner also supports a number of [custom Capacitor APIs](#capacitor-api) custom APIs that expose relevant mobile device functionality

## Runner Lifetimes

Currently, the runners are designed for performing periodic bursts of work while your app is in the background, or for executing asynchronous work in a thread separate from your UI while your app is in the foreground. As a result, runners are not long lived. State is not maintained between calls to events in the runner. Each call to `dispatchEvent()` creates a new context in which your runner code is loaded and executed, and once `resolve()` or `reject()` is called, the context is destroyed.

## Android Battery Optimizations

Some Android vendors offer built-in battery optimization settings that go beyond what stock Android provides. Some of these optimizations must be disabled by your end users in order for your background tasks to work properly.

Visit [Don't kill my app!](https://dontkillmyapp.com) for more information on the affected manufacturers and steps required by your users to adjust the settings.

## Limitations of Background Tasks

It’s not possible to run persistent, always running background services on mobile operating systems. Due to the limitations imposed by iOS and Android designed to reduce battery and data consumption, background tasks are constrained with various limitations that you must keep in mind while designing and implementing your background task.

### iOS

- Each invocation of your task has approximately up to 30 seconds of runtime before you must call `completed()` or your task is killed.
- While you can set an interval to define when your task runs after the app is backgrounded, or how often it should run, this is not guaranteed. iOS will determine when and how often you task will ultimately run, determined in part by how often you app is used.

### Android

- Your task has a maximum of 10 minutes to perform work, but to keep your task cross platform compatible, you should limit your work to 30 seconds at most.
- Repeating background tasks have a minimal interval of at least 15 minutes. Similar to iOS, any interval you request may not be hit exactly - actual execution time is subject to OS battery optimizations and other heuristics.

## API

<docgen-index>

* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions(...)`](#requestpermissions)
* [`dispatchEvent(...)`](#dispatchevent)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>


### checkPermissions()

```typescript
checkPermissions() => any
```

Check permissions for the various Capacitor device APIs.

**Returns:** `any`

**Since:** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(options: RequestPermissionOptions) => any
```

Request permission to display local notifications.

| Param         | Type                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | `<a href="#requestpermissionoptions">RequestPermissionOptions</a>` |

**Returns:** `any`

**Since:** 1.0.0

--------------------


### dispatchEvent(...)

```typescript
dispatchEvent(options: DispatchEventOptions) => any
```

Dispatches an event to the configured runner.

| Param         | Type                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | `<a href="#dispatcheventoptions">DispatchEventOptions</a>` |

**Returns:** `any`

**Since:** 1.0.0

--------------------


### Interfaces


#### PermissionStatus

| Prop                | Type                                                        |
| ------------------- | ----------------------------------------------------------- |
| **`geolocation`**   | `<a href="#permissionstate">PermissionState</a>` |
| **`notifications`** | `<a href="#permissionstate">PermissionState</a>` |


#### RequestPermissionOptions

| Prop       | Type            |
| ---------- | --------------- |
| **`apis`** | `{}` |


#### DispatchEventOptions

| Prop          | Type                                 | Description                                | Since |
| ------------- | ------------------------------------ | ------------------------------------------ | ----- |
| **`label`**   | `string`                  | The runner label to dispatch the event to  | 1.0.0 |
| **`event`**   | `string`                  | The name of the registered event listener. | 1.0.0 |
| **`details`** | `{ [key: string]: any; }` |                                            |       |


### Type Aliases


#### PermissionState

`'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'`


#### API

`'geolocation' | 'notifications'`

</docgen-api>

## Capacitor API

<capacitor-api-docs>



### Interfaces


#### CapacitorDevice

Get information on the device, such as network connectivity and battery status.

| Prop                   | Type                                                             | Description                                    | Since |
| ---------------------- | ---------------------------------------------------------------- | ---------------------------------------------- | ----- |
| **`getBatteryStatus`** | `() =&gt; <a href="#batterystatus">BatteryStatus</a>` | Get the current battery status for the device. | 1.0.0 |
| **`getNetworkStatus`** | `() =&gt; <a href="#networkstatus">NetworkStatus</a>` | Get the current network status for the device. | 1.0.0 |


#### BatteryStatus

| Prop               | Type                 |
| ------------------ | -------------------- |
| **`batteryLevel`** | `number`  |
| **`isCharging`**   | `boolean` |


#### NetworkStatus

| Prop                 | Type                 |
| -------------------- | -------------------- |
| **`connected`**      | `boolean` |
| **`connectionType`** | `string`  |


#### CapacitorKV

A simple string key / value store backed by UserDefaults on iOS and Shared Preferences on Android.

| Prop         | Type                                                 | Description                            | Since |
| ------------ | ---------------------------------------------------- | -------------------------------------- | ----- |
| **`set`**    | `(key: string, value: string) =&gt; void` | Set a string value with the given key. | 1.0.0 |
| **`get`**    | `(key: string) =&gt; string`              | Get a string value for the given key.  | 1.0.0 |
| **`remove`** | `(key: string) =&gt; void`                | Remove a value with the given key.     | 1.0.0 |


#### CapacitorNotifications

Send basic local notifications.

| Prop           | Type                                  | Description                   | Since |
| -------------- | ------------------------------------- | ----------------------------- | ----- |
| **`schedule`** | `(options: {}) =&gt; void` | Schedule a local notification | 1.0.0 |


#### NotificationScheduleOptions

| Prop                   | Type                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Since |
| ---------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`id`**               | `number`  | The notification identifier. On Android it's a 32-bit int. So the value should be between -2147483648 and 2147483647 inclusive.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 1.0.0 |
| **`title`**            | `string`  | The title of the notification.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 1.0.0 |
| **`body`**             | `string`  | The body of the notification, shown below the title.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 1.0.0 |
| **`scheduleAt`**       | `Date`    | Date to send this notification.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 1.0.0 |
| **`sound`**            | `string`  | Name of the audio file to play when this notification is displayed. Include the file extension with the filename. On iOS, the file should be in the app bundle. On Android, the file should be in res/raw folder. Recommended format is `.wav` because is supported by both iOS and Android. Only available for iOS and Android &lt; 26. For Android 26+ use channelId of a channel configured with the desired sound. If the sound file is not found, (i.e. empty string or wrong name) the default system notification sound will be used. If not provided, it will produce the default sound on Android and no sound on iOS. | 1.0.0 |
| **`actionTypeId`**     | `string`  | Associate an action type with this notification.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 1.0.0 |
| **`threadIdentifier`** | `string`  | Used to group multiple notifications. Sets `threadIdentifier` on the [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent). Only available for iOS.                                                                                                                                                                                                                                                                                                                                                                                                        | 1.0.0 |
| **`summaryArgument`**  | `string`  | The string this notification adds to the category's summary format string. Sets `summaryArgument` on the [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent). Only available for iOS.                                                                                                                                                                                                                                                                                                                                                                    | 1.0.0 |
| **`group`**            | `string`  | Used to group multiple notifications. Calls `setGroup()` on [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) with the provided value. Only available for Android.                                                                                                                                                                                                                                                                                                                                                                                           | 1.0.0 |
| **`groupSummary`**     | `string`  | If true, this notification becomes the summary for a group of notifications. Calls `setGroupSummary()` on [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) with the provided value. Only available for Android when using `group`.                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`extra`**            | `any`     | Set extra data to store within this notification.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`ongoing`**          | `boolean` | If true, the notification can't be swiped away. Calls `setOngoing()` on [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) with the provided value. Only available for Android.                                                                                                                                                                                                                                                                                                                                                                               | 1.0.0 |
| **`autoCancel`**       | `boolean` | If true, the notification is canceled when the user clicks on it. Calls `setAutoCancel()` on [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) with the provided value. Only available for Android.                                                                                                                                                                                                                                                                                                                                                          | 1.0.0 |
| **`largeBody`**        | `string`  | Sets a multiline text block for display in a big text notification style.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 1.0.0 |
| **`summaryText`**      | `string`  | Used to set the summary text detail in inbox and big text notification styles. Only available for Android.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 1.0.0 |
| **`smallIcon`**        | `string`  | Set a custom status bar icon. If set, this overrides the `smallIcon` option from Capacitor configuration. Icons should be placed in your app's `res/drawable` folder. The value for this option should be the drawable resource ID, which is the filename without an extension. Only available for Android.                                                                                                                                                                                                                                                                                                                     | 1.0.0 |
| **`largeIcon`**        | `string`  | Set a large icon for notifications. Icons should be placed in your app's `res/drawable` folder. The value for this option should be the drawable resource ID, which is the filename without an extension. Only available for Android.                                                                                                                                                                                                                                                                                                                                                                                           | 1.0.0 |
| **`channelId`**        | `string`  | Specifies the channel the notification should be delivered on. If channel with the given name does not exist then the notification will not fire. If not provided, it will use the default channel. Calls `setChannelId()` on [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) with the provided value. Only available for Android 26+.                                                                                                                                                                                                                     | 1.0.0 |


#### CapacitorGeolocation

Get access to device location information.

| Prop                     | Type                                                                                   | Description                          | Since |
| ------------------------ | -------------------------------------------------------------------------------------- | ------------------------------------ | ----- |
| **`getCurrentLocation`** | `() =&gt; <a href="#getcurrentpositionresult">GetCurrentPositionResult</a>` | Get the device's last known location | 1.0.0 |


#### GetCurrentPositionResult

| Prop                   | Type                        | Description                                                                                                           | Since |
| ---------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----- |
| **`latitude`**         | `number`         | Latitude in decimal degrees                                                                                           | 1.0.0 |
| **`longitude`**        | `number`         | longitude in decimal degrees                                                                                          | 1.0.0 |
| **`accuracy`**         | `number`         | Accuracy level of the latitude and longitude coordinates in meters                                                    | 1.0.0 |
| **`altitude`**         | `number \| null` | The altitude the user is at (if available)                                                                            | 1.0.0 |
| **`altitudeAccuracy`** | `number \| null` | Accuracy level of the altitude coordinate in meters, if available. Available on all iOS versions and on Android 8.0+. | 1.0.0 |
| **`speed`**            | `number \| null` | The speed the user is traveling (if available)                                                                        | 1.0.0 |
| **`heading`**          | `number \| null` | The heading the user is facing (if available)                                                                         | 1.0.0 |


#### CapcacitorWatch

Interact with a watch paired with this app

sendMessage, transferUserInfo and updateApplicationContext are raw routes to the WCSession delegate methods, but have no effects currently in a CapactiorWatch Watch application.
They could be used if a native watch app is developed as a companion app to a Capacitor app

| Prop                           | Type                                                                     | Description                                                                                                                                                 |
| ------------------------------ | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`sendMessage`**              | `(options: []) =&gt; void`                                    | Sends a message to the watch with the sendMessage() WCSession delegate method This has no effect on a CapacitorWatch watch app                              |
| **`transferUserInfo`**         | `(options: []) =&gt; void`                                    | Sends information to the watch with the transferUserInfo() WCSession delegate method This has no effect on a CapacitorWatch watch app                       |
| **`updateApplicationContext`** | `(options: []) =&gt; void`                                    | Updates the application context on the watch with the updateApplicationContext() WCSession delegate method This has no effect on a CapacitorWatch watch app |
| **`isReachable`**              | `boolean`                                                     | Checks to see if the compaion watch is reachable                                                                                                            |
| **`updateWatchUI`**            | `(options: { watchUI: string; }) =&gt; void`                  | Replaces the current UI on the watch with what is specified here.                                                                                           |
| **`updateWatchData`**          | `(options: { data: { [key: string]: string; }; }) =&gt; void` | Updates the data the watch is using to display variables in text and button fields                                                                          |

</capacitor-api-docs>