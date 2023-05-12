---
title: Build and Run
description: Visual Studio Code Extension for Capacitor
contributors:
  - dtarnawsky
slug: /vscode/build-and-run
---

There are a few different ways to build or run your app depending on your preference and whether you want to test in a web browser or a real or emulated mobile device.

:::tip
You can press `⌥` + R to run your app (`ALT` + `R` on Windows).
:::

## Testing for Web
Click `Run` > `Web` to build and launch in the default web browser.

:::note
You can preview your app inside the VS Code editor by clicking the `...` next to `Web` and choose `Open App in Editor`.
:::

## Testing on Device

Testing using an emulator or real mobile device can be done in one of these ways:
- **Native IDE** - Click `Build` in the VS Code extension then run the app in XCode or Android Studio.
- **Using VS Code** - Click `Run` > `iOS` or `Android`, select the device to launch.

## Live Reload

The **Live Reload** feature allows you to run your app on a mobile device and whenever a code change is made in VS Code and saved it will reload the application.

To turn on this feature click `Settings` > `Live Reload`

## Debugging
You can debug (use breakpoints, inspect variables etc) by clicking the `Debug` item and choosing:
- **`Web`** - To launch Chrome or Edge and begin a debugging session.
- **`Android`** - To attach to a running Android web view and begin a debugging session.
- **`iOS`** - iOS is not currently supported in VS Code. You can use [Safari](debugging#use-safari).


## Using HTTPS

The feature (`Settings` > `Use HTTPS`) will create a certificate and serve your application using HTTPS. Instructions to trust the certificate on web, iOS and Android are displayed.

The option to serve your application via `HTTPS` is required if you make Web API calls that require a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) like [Geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation).

:::note
This feature is currently only available with Angular projects and will temporarily install [a plugin](https://github.com/jcesarmobile/ssl-skip) due to a quirk with the Android web view not trusting user installed CA Certificates.
:::

