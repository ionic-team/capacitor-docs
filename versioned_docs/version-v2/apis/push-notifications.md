---
title: Push Notifications
description: Push Notifications API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/push-notifications
---

<plugin-platforms platforms="ios,android"></plugin-platforms>

# Push Notifications

The Push Notifications API provides methods for registering a device to receive notifications from a server, along with processing received notifications and responding to them. In contrast, the [Local Notifications](/apis/local-notifications.md) API provides means for offline, local notification scheduling and processing.

## Enabling Push Notifications Capabilites

On iOS you must enable Push Notifications Capabilities in your project to enable the Push Notifications plugin to work. To do so, go to the `Capabilities` section of the app project and switch the `Push Notifications` button from `OFF` to the `ON` position.

This change adds the push capabilites to the app and creates an entitlements file in the project.

![Enabling Push Notifications Capabilities](../../../static/img/v3/docs/ios/enable-push-capabilities.png)

On Android just download the app project's `google-services.json` file from the Firebase console, and place it in the `projectName/android/app` folder.

## Push Notifications icon

On Android, the Push Notifications icon with the appropriate name should be added to the `AndroidManifest.xml` file:

```xml
<meta-data android:name="com.google.firebase.messaging.default_notification_icon" android:resource="@mipmap/push_icon_name" />
```

If no icon is specified Android will use the application icon, but push icon should be white pixels on a transparent backdrop. As the application icon is not usually like that, it will show a white square or circle. So it's recommended to provide the separate icon for Push Notifications.

Android Studio has an icon generator you can use to create your Push Notifications icon.

## Disabling Push Notifications plugin

If you are not using Push Notifications in your project, when you submit the app to iTunes Connect, Apple will send you an email saying it has issues because of `Missing Push Notification Entitlement`. That happens because Capacitor includes the code for registering for push notifications and getting the token.

Apple sends that mail just to make sure you didn't make a mistake and forgot to enable Push Notifications Capabilities in your app, but can safely ignore it if you are not using the Push Notifications plugin.

In case you don't want to receive the mail, you can disable the Push Notifications plugin by removing `USE_PUSH` from `Active Compilation Conditions` in your project's Build Settings section.

![Disable Push Notifications](../../../static/img/v3/docs/ios/disable-push-plugin.png)

## Push notifications appearance in foreground

On iOS you can configure the way the push notifications are displayed when the app is in foreground by providing the `presentationOptions` in your `capacitor.config.json` as an Array of Strings you can combine.

Possible values are:

- `badge`: badge count on the app icon is updated (default value)
- `sound`: the device will ring/vibrate when the push notification is received
- `alert`: the push notification is displayed in a native dialog

An empty Array can be provided if none of the previous options are desired. `pushNotificationReceived` event will still be fired with the push notification information.

```json
"plugins": {
  "PushNotifications": {
    "presentationOptions": ["badge", "sound", "alert"]
  }
}
```



- [`register()`](#register)
- [`requestPermission()`](#requestpermission)
- [`getDeliveredNotifications()`](#getdeliverednotifications)
- [`removeDeliveredNotifications(...)`](#removedeliverednotifications)
- [`removeAllDeliveredNotifications()`](#removealldeliverednotifications)
- [`createChannel(...)`](#createchannel)
- [`deleteChannel(...)`](#deletechannel)
- [`listChannels()`](#listchannels)
- [`addListener(...)`](#addlistener)
- [`addListener(...)`](#addlistener)
- [`addListener(...)`](#addlistener)
- [`addListener(...)`](#addlistener)
- [`removeAllListeners()`](#removealllisteners)
- [Interfaces](#interfaces)



## Example Guides

[Using Push Notifications with Firebase in an Ionic Angular App](/guides/push-notifications-firebase.md)

## API




### register()

```typescript
register() => Promise<void>
```

Register the app to receive push notifications.
Will trigger registration event with the push token
or registrationError if there was some problem.
Doesn't prompt the user for notification permissions, use requestPermission() first.

---

### requestPermission()

```typescript
requestPermission() => Promise<NotificationPermissionResponse>
```

On iOS it prompts the user to allow displaying notifications
and return if the permission was granted or not.
On Android there is no such prompt, so just return as granted.

**Returns:** <code>Promise&lt;<a href="#notificationpermissionresponse">NotificationPermissionResponse</a>&gt;</code>

---

### getDeliveredNotifications()

```typescript
getDeliveredNotifications() => Promise<PushNotificationDeliveredList>
```

Returns the notifications that are visible on the notifications screen.

**Returns:** <code>Promise&lt;<a href="#pushnotificationdeliveredlist">PushNotificationDeliveredList</a>&gt;</code>

---

### removeDeliveredNotifications(...)

```typescript
removeDeliveredNotifications(delivered: PushNotificationDeliveredList) => Promise<void>
```

Removes the specified notifications from the notifications screen.

| Param           | Type                                                                                    | Description                      |
| --------------- | --------------------------------------------------------------------------------------- | -------------------------------- |
| **`delivered`** | <code><a href="#pushnotificationdeliveredlist">PushNotificationDeliveredList</a></code> | list of delivered notifications. |

---

### removeAllDeliveredNotifications()

```typescript
removeAllDeliveredNotifications() => Promise<void>
```

Removes all the notifications from the notifications screen.

---

### createChannel(...)

```typescript
createChannel(channel: NotificationChannel) => Promise<void>
```

On Android O or newer (SDK 26+) creates a notification channel.

| Param         | Type                                                                | Description |
| ------------- | ------------------------------------------------------------------- | ----------- |
| **`channel`** | <code><a href="#notificationchannel">NotificationChannel</a></code> | to create.  |

---

### deleteChannel(...)

```typescript
deleteChannel(channel: NotificationChannel) => Promise<void>
```

On Android O or newer (SDK 26+) deletes a notification channel.

| Param         | Type                                                                | Description |
| ------------- | ------------------------------------------------------------------- | ----------- |
| **`channel`** | <code><a href="#notificationchannel">NotificationChannel</a></code> | to delete.  |

---

### listChannels()

```typescript
listChannels() => Promise<NotificationChannelList>
```

On Android O or newer (SDK 26+) list the available notification channels.

**Returns:** <code>Promise&lt;<a href="#notificationchannellist">NotificationChannelList</a>&gt;</code>

---

### addListener(...)

```typescript
addListener(eventName: 'registration', listenerFunc: (token: PushNotificationToken) => void) => PluginListenerHandle
```

Event called when the push notification registration finished without problems.
Provides the push notification token.

| Param              | Type                                                                                        | Description                   |
| ------------------ | ------------------------------------------------------------------------------------------- | ----------------------------- |
| **`eventName`**    | <code>"registration"</code>                                                                 | registration.                 |
| **`listenerFunc`** | <code>(token: <a href="#pushnotificationtoken">PushNotificationToken</a>) =&gt; void</code> | callback with the push token. |

**Returns:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'registrationError', listenerFunc: (error: any) => void) => PluginListenerHandle
```

Event called when the push notification registration finished with problems.
Provides an error with the registration problem.

| Param              | Type                                 | Description                           |
| ------------------ | ------------------------------------ | ------------------------------------- |
| **`eventName`**    | <code>"registrationError"</code>     | registrationError.                    |
| **`listenerFunc`** | <code>(error: any) =&gt; void</code> | callback with the registration error. |

**Returns:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'pushNotificationReceived', listenerFunc: (notification: PushNotification) => void) => PluginListenerHandle
```

Event called when the device receives a push notification.

| Param              | Type                                                                                     | Description                              |
| ------------------ | ---------------------------------------------------------------------------------------- | ---------------------------------------- |
| **`eventName`**    | <code>"pushNotificationReceived"</code>                                                  | pushNotificationReceived.                |
| **`listenerFunc`** | <code>(notification: <a href="#pushnotification">PushNotification</a>) =&gt; void</code> | callback with the received notification. |

**Returns:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'pushNotificationActionPerformed', listenerFunc: (notification: PushNotificationActionPerformed) => void) => PluginListenerHandle
```

Event called when an action is performed on a push notification.

| Param              | Type                                                                                                                   | Description                            |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| **`eventName`**    | <code>"pushNotificationActionPerformed"</code>                                                                         | pushNotificationActionPerformed.       |
| **`listenerFunc`** | <code>(notification: <a href="#pushnotificationactionperformed">PushNotificationActionPerformed</a>) =&gt; void</code> | callback with the notification action. |

**Returns:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### removeAllListeners()

```typescript
removeAllListeners() => void
```

Remove all native listeners for this plugin.

---

### Interfaces

#### NotificationPermissionResponse

| Prop          | Type                 |
| ------------- | -------------------- |
| **`granted`** | <code>boolean</code> |

#### PushNotificationDeliveredList

| Prop                | Type                            |
| ------------------- | ------------------------------- |
| **`notifications`** | <code>PushNotification[]</code> |

#### PushNotification

| Prop               | Type                 | Description                                                                                                      |
| ------------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **`title`**        | <code>string</code>  |                                                                                                                  |
| **`subtitle`**     | <code>string</code>  |                                                                                                                  |
| **`body`**         | <code>string</code>  |                                                                                                                  |
| **`id`**           | <code>string</code>  |                                                                                                                  |
| **`badge`**        | <code>number</code>  |                                                                                                                  |
| **`notification`** | <code>any</code>     |                                                                                                                  |
| **`data`**         | <code>any</code>     |                                                                                                                  |
| **`click_action`** | <code>string</code>  |                                                                                                                  |
| **`link`**         | <code>string</code>  |                                                                                                                  |
| **`group`**        | <code>string</code>  | Android only: set the group identifier for notification grouping, like threadIdentifier on iOS.                  |
| **`groupSummary`** | <code>boolean</code> | Android only: designate this notification as the summary for a group (should be used with the `group` property). |

#### NotificationChannel

| Prop              | Type                               |
| ----------------- | ---------------------------------- |
| **`id`**          | <code>string</code>                |
| **`name`**        | <code>string</code>                |
| **`description`** | <code>string</code>                |
| **`sound`**       | <code>string</code>                |
| **`importance`**  | <code>1 \| 2 \| 5 \| 4 \| 3</code> |
| **`visibility`**  | <code>0 \| 1 \| -1</code>          |
| **`lights`**      | <code>boolean</code>               |
| **`lightColor`**  | <code>string</code>                |
| **`vibration`**   | <code>boolean</code>               |

#### NotificationChannelList

| Prop           | Type                               |
| -------------- | ---------------------------------- |
| **`channels`** | <code>NotificationChannel[]</code> |

#### PluginListenerHandle

| Prop         | Type                       |
| ------------ | -------------------------- |
| **`remove`** | <code>() =&gt; void</code> |

#### PushNotificationToken

| Prop        | Type                |
| ----------- | ------------------- |
| **`value`** | <code>string</code> |

#### PushNotificationActionPerformed

| Prop               | Type                                                          |
| ------------------ | ------------------------------------------------------------- |
| **`actionId`**     | <code>string</code>                                           |
| **`inputValue`**   | <code>string</code>                                           |
| **`notification`** | <code><a href="#pushnotification">PushNotification</a></code> |


