---
title: Debugging
description: Visual Studio Code Extension for Capacitor
contributors:
  - dtarnawsky
slug: /vscode/debugging
---

Debug your application using either [the extension](#debug-in-vs-code) or [attaching to the web view](#attach-to-web-view). You can alternatively use [Remote Logging](#remote-logging) to perform `console.log` style debugging.

:::tip
You can press `⌥` + D to debug your app (`ALT` + `D` on Windows).
:::

## Debug in VS Code

Click the `Debug` item to launch a web browser or attach to a running Android web view for debugging.

Click `Debug` > `Web` to launch a _debuggable_ web browser such as Chrome or MS Edge. This will build your app then put VS Code into debugging mode allowing you to set breakpoints, inspect variables etc. 

:::note
You can choose which browser to debug from `Settings` > `Advanced` > `Browser`.
:::

## Attach to Web View

You can debug a running real or emulated Android Device by first running for Android by either clicking `Run` > `Android` or running the app in Android Studio.

Click the `Debug` item and all running Android web views will appear, click one to start a debugging session for that view.

:::note
You can also attach to Web View using Chrome or Safari and use their built in debugging and inspection tools.
:::

### Use Chrome Inspect

When you have run your app from `Run` > `Android` or Android Studio:
- Open **Google Chrome** and enter into the url bar: `chrome://inspect` and press enter.
- Any running web views will appear as remote targets which you can open
- Use Chrome's debugging and inspection tools.

### Use Edge Inspect

When you have run your app from `Run` > `Android` or Android Studio:
- Open **Microsoft Edge** and enter into the url bar: `edge://inspect` and press enter.
- Any running web views will appear as remote targets which you can open
- Use Edge's debugging and inspection tools.

### Use Safari

When you have run your app from `Run` > `iOS` or XCode:
- Open **Safari** and select the iOS Device from the `Develop` menu
- Use Safari's debugging and inspection tools.

:::note
You will need to turn on the development mode for Safari by going to the `Safari` menu > `Settings`, `Advanced` and check the box `Show Develop menu in menu bar`.

You'll also need to ensure your mobile device has been enabled for debugging.
:::

## Remote Logging

The remote logging feature will send all calls to `console.log` (and `console.error` etc) to the VS Code `output` window. This makes debugging your app when it is running on a device easier as you do not have to attach to its web view.

To use this feature install Nexus Browser on the device ([App Store](https://apps.apple.com/us/app/nexus-web-browser/id6445866986) or [Play Store](https://play.google.com/store/apps/details?id=com.nexusconcepts.nexus)) and Run your app for web in VS Code. If the device is on the same Wifi network it will detect your app and allow you to launch it.

:::tip
Select `Settings` > `Logging` to filter what is logged to the output window.
:::