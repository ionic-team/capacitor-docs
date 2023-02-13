---
title: Build and Run
description: Visual Studio Code Extension for Capacitor
contributors:
  - dtarnawsky
slug: /vscode/build-and-run
---

There are a few different ways to build or run your app depending on your preference and whether you want to test in a web browser or a real or emulated mobile device.

## Testing for Web
Click `Run` > `Web` to build and launch the options windows:
- Click `Open in Browser` to open the default web browser and start your app
- Click `Open in Editor` to open your app in a VS Code window
- Click `Debug in Browser` to begin a debugging session using Chrome or Edge
- Click `Stop Web Server` to stop the development web server and close the window
- Scan the QR Code `with Camera App` to preview in a mobile browser
- Scan the QR Code `with Capacitor Preview App` to preview the app as if it were integrated with Capacitor

:::note
If you would prefer to always run in browser or editor then click `...` next to `Web` and choose your preference.
:::

## Testing on Device

Testing using an emulator or real mobile device can be done in one of these ways:
- **Native IDE** - Click `Build` in the VS Code extension then run the app in XCode or Android Studio.
- **Using VS Code** - Click `Run` > `iOS` or `Android`, select the attached device.
- **Using Capacitor Preview** - Run the `Capacitor Preview` app on your mobile device and scan the QR Code shown with `Run` > `Web`

:::note
The feedback loop between coding and running can be long if your build is slow. Use the [`Live Reload`](#live-reload) feature or `Capacitor Preview` for faster feedback.
:::

## Live Reload

The **Live Reload** feature allows you to run your app on a mobile device and whenever a code change is made in VS Code and saved it will reload the application.

To turn on this feature click `Settings` > `Live Reload`

## Using HTTPS

The feature (`Settings` > `Use HTTPS`) will create a certificate and serve your application using HTTPS. Instructions to trust the certificate on web, iOS and Android are displayed.

The option to serve your application via `HTTPS` is requires if you make Web API calls that require a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) like [Geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation).

:::note
This feature is currently only available with Angular projects and will temporarily install [a plugin](https://github.com/jcesarmobile/ssl-skip) due to a quirk with the Android web view not trusting user installed CA Certificates.
:::

