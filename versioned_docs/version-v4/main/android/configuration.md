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
