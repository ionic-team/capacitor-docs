---
title: Configuring Android
sidebar_label: Configuration
description: Configuring Android
contributors:
  - mlynch
  - jcesarmobile
slug: /android/configuration
---

# Configuring Android

## Configuring `AndroidManifest.xml`

Android apps manage permissions, device features, and other settings in the `AndroidManifest.xml` file, which is located at `android/app/src/main/AndroidManifest.xml`.

> `AndroidManifest.xml` may reference additional files such as `styles.xml` and `strings.xml` within the `android/app/src/main/res/values` directory via `@style` and `@string`. [Read more about Android Resources](https://developer.android.com/guide/topics/resources/available-resources).

This article covers the basic modifications you'll need to make to your app. Read the [Android Manifest docs](https://developer.android.com/guide/topics/manifest/manifest-intro.html) to learn a whole lot more.

## Changing the Package ID

To change your app's Package ID (aka **Application ID** for Android), edit `applicationId` at the top of `android/app/build.gradle`:

```diff
defaultConfig {
-       applicationId "com.capacitorjs.app"
+       applicationId "com.mycompany.myapp"
```

## Changing the App Name

To change the name of your app, change the value for `app_name` in `strings.xml`:

```xml
<string name="app_name">MyApp</string>
```

It may make sense to change the activity name to match, especially if your app has a single activity:

```xml
<string name="title_activity_main">MyApp</string>
```

## Deeplinks (aka Android App Links)

> For a Deep Links guide, [see here](/main/guides/deep-links.md).

To enable deeplinking through Android App Links, follow the official Android guide on [Adding Android App Links](https://developer.android.com/studio/write/app-link-indexing). Android Studio comes with a handy wizard for configuring App Links.

Once configured, the [`getLaunchUrl()` method in the App API](/apis/app.md#getlaunchurl) will provide any URL the app was launched with, and the [`'appUrlOpen'` event](/apis/app.md#addlistenerpause-) will fire any time the app receives a new App Link deeplink.

## URL Schemes

Your app can respond to custom URLs on launch, making it possible to handle deeplinks and app interactions.

To change the URL, search for and modify this line in `strings.xml`. It's recommended to set this to the Package ID.

```xml
<string name="custom_url_scheme">com.capacitorjs.myapp</string>
```

In this example, the app will respond to URLs with the `com.capacitorjs.myapp://` scheme.

To get any custom URL the app may have launched with, see the Deeplinks section above.

## Setting Permissions

In Android, permissions your app will need are defined in `AndroidManifest.xml` inside of the `<manifest>` tag, generally at the bottom of the file.

For example, here's what adding Network permissions looks like:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
package="com.getcapacitor.myapp">
    <activity>
      <!-- other stuff -->
    </activity>

    <!-- More stuff -->

    <!-- Your permissions -->

    <!-- Network API -->
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
</manifest>
```

Generally, the plugin you choose to use will ask you to set a permission. Add it in this file.

## Accessing Devices on the Local Network

Android 17 (API level 37) introduces the `ACCESS_LOCAL_NETWORK` runtime permission. Apps that target API 37 or higher need it to connect to devices on the local network (LAN), such as a local server, a printer, or a smart-home device. Connections to the internet are not affected, and nothing changes on devices running Android 16 or lower.

Without the permission, connections to local network addresses fail without a clear error. HTTP requests (including `CapacitorHttp`, `fetch` and `XMLHttpRequest`), WebSocket connections and TCP connections time out, and UDP sockets fail with `EPERM`.

To access local network devices:

1. Declare the permission in `AndroidManifest.xml`, inside the `<manifest>` tag:

   ```xml
   <uses-permission android:name="android.permission.ACCESS_LOCAL_NETWORK" />
   ```

   Older Android versions ignore this entry.

2. Request the permission at runtime, before your app's first request to a local network address. Capacitor doesn't include a plugin for this. You can use a community plugin that requests it, or [write your own Capacitor plugin](/main/android/custom-code.md) that declares the permission and uses the [permission request flow](/plugins/creating-plugins/android-guide.md#permissions). Android shows the standard permission dialog, which describes the permission as access to "Nearby devices" and doesn't mention the local network.

Once granted, the permission applies to the whole app, including requests made from the Web View and from native code. If the user denies the request twice, Android stops showing the dialog and they have to grant the permission in the system settings instead: **Settings** > **Apps** > your app > **Permissions** > **Nearby devices**. The exact menu names can vary by device.

:::note
Plain HTTP requests to local network addresses also require cleartext traffic to be enabled for your app. See the [Android documentation on opting in to cleartext traffic](https://developer.android.com/privacy-and-security/security-config#CleartextTrafficOptIn).
:::

:::note
The permission is also required when the Web View loads your app from a local network address, for example when using [Live Reload](/main/guides/live-reload.md) or setting `server.url` to a local address. In that case the page can't load at all, so your app can't request the permission itself. See [Live Reload on Android 17](/main/guides/live-reload.md#live-reload-on-android-17) for how to work around this.
:::
