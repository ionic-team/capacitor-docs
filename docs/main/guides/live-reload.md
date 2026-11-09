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

Alternatively to setting `url` in `capacitor.config.json`, you can set the live reload url directly from the CLI when running the app from the command line:

```bash
npx cap run --url http://192.168.1.68:8100
```

## Live Reload on Android 17

On Android 17 (API level 37), apps that target API 37 can't connect to devices on the local network unless they hold the `ACCESS_LOCAL_NETWORK` permission. Live Reload can load your app from your computer's address on the local network, so this applies to it too. It affects both `server.url` in `capacitor.config.json` and `npx cap run --url`, including the `server` entry that the CLI creates for you.

Without the permission, the Web View can't load the page and shows `net::ERR_LOCAL_NETWORK_PERMISSION_MISSING`. Android doesn't show a permission dialog, because the page that would request the permission is the one that fails to load. A cached copy of the page can still load, so clear your app's data if you're not sure whether the permission is in effect.

To work around this during development, use one of the following:

- **Forward the port over USB.** With the device connected by USB, the Web View loads the page from `localhost` instead of the local network, so it doesn't need the permission:

  ```bash
  npx cap run android --url http://localhost:8100 --forwardPorts 8100:8100
  ```

  Replace `8100` with the port of your dev server. `--forwardPorts` runs `adb reverse` for you.

- **Grant the permission with `adb`.** Your app must declare the permission in `AndroidManifest.xml` for this to work. Run the following once the app is installed, replacing `com.example.app` with your app's package ID:

  ```bash
  adb shell pm grant com.example.app android.permission.ACCESS_LOCAL_NETWORK
  ```

  The permission is revoked again if you clear the app's data or uninstall the app, so run the command again after that.

- **Grant the permission in the device settings.** Open **Settings** > **Apps** > your app > **Permissions** > **Nearby devices** and choose **Allow**. The permission appears there when your app declares it in `AndroidManifest.xml`, even if the app never requests it at runtime. The exact menu names can vary by device.

Apps that load their content from a local network address in production, by setting `server.url` to one, have the same restriction. Their users have to grant the permission in the device settings. See [Accessing Devices on the Local Network](/main/android/configuration.md#accessing-devices-on-the-local-network) for more about the permission.
