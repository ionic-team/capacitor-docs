---
title: Live Reload
description: Use Live Reload to easily debug the web and native portions of an app on a device or simulator.
contributors:
  - dotNetkow
slug: /guides/live-reload
---

# Live Reload

Live Reload is useful for debugging both the web portion of an app as well as native functionality on device hardware or simulators. Rather than deploy a new native binary every time you make a code change, it reloads the browser (or Web View) when changes in the app are detected.

> If running on a device, make sure it is on the same Wi-Fi network as your computer.

## Using with Ionic CLI

The Ionic CLI includes a complete Live Reload experience, automating all of the steps that are detailed manually below. Install it along with `native-run` (a cross-platform command-line utility for running native binaries on devices and simulators/emulators):

```bash
npm install -g @ionic/cli native-run
```

Next, use the `ionic cap run` command to start the Live Reload process:

```bash
ionic cap run android -l --external
ionic cap run ios -l --external
```

This performs an `ionic build`, copies web assets into the specified native platform, then opens the IDE for your native project (Xcode for iOS, Android Studio for Android).

The `server` entry automatically created in `capacitor.config.json` is removed after the command terminates. For complete details on the `ionic cap run` command, [see here](https://ionicframework.com/docs/cli/commands/capacitor-run).

## Using with Framework CLIs

Capacitor supports CLIs with live reload capability.

First, determine your computer's IP address on your LAN.

- On macOS, run `ifconfig`. The IP address is listed under `en0` entry, after `inet`. Alternatively, open System Preferences -> Network -> (select active network) then find the IP listed under Status.
- On Windows, run `ipconfig`. Look for the `IPv4` address.

Next, start your local web server. The server must be bound to `0.0.0.0` in order to be accessible from the LAN. The command to run will vary, but is typically:

```bash
npm run start
```

> With react-scripts, use `HOST=0.0.0.0 npm run start`

Within `capacitor.config.json`, create a `server` entry then configure the `url` field using the local web server's IP address and port:

```json
"server": {
  "url": "http://192.168.1.68:8100",
  "cleartext": true
},
```

Next, run `npx cap copy` to copy the updated Capacitor config into all native projects.

Open the native IDE if it's not already open:

```bash
npx cap open ios
npx cap open android
```

Finally, click the Run button to launch the app and start using Live Reload.

> Be careful not to commit the server config to source control.
