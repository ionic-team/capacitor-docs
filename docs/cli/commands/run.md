---
title: CLI Command - cap run
description: Capacitor CLI - cap run
sidebar_label: run
---

# Capacitor CLI - cap run

This command first runs [`sync`](/cli/commands/sync.md), then it builds and deploys the native app to a target device of your choice.

To enable running on wireless iOS devices, follow the instructions detailed [here](/main/ios/index.md#wireless-ios-devices).

```bash
npx cap run [options] <platform>
```

<strong>Inputs:</strong>

- `platform` (required): `android`, `ios`

<strong>Options:</strong>

- `--flavor <flavorName>`: set the flavor of the Android project (flavor dimensions not yet supported)
- `--list`: Print a list of target devices available to the given platform
- `--no-sync`: do not run the sync command
- `--scheme <schemeName>`: set the scheme of the iOS project
- `--configuration <name>`: Configuration name of the iOS Scheme
- `--target <id>`: Run on a specific target device
- `--target-name <name>`: Run on a specific target device by its name (ex: "iPhone 17 Pro", "John's iPhone")
- `--target-name-sdk-version <version>`: Run on a target device by name with a specific sdk version when using --target-name, (ex: "26.0" for iOS 26 or "35" for Android API 35).  Useful for targets that have the same name but have different OS / SDK versions
- `--url <url>`: Load an external URL in the Web View, useful for live-reload (overrides `server.url` config)
- `--forwardPorts <port1:port2>`: Automatically run "adb reverse" for better live-reloading support
- `--allowLocalNetwork`: Android only. Declare and grant the `ACCESS_LOCAL_NETWORK` permission (Android 17+) for this run, so a page loaded from a local network address, such as a live reload URL, can load. See [Live Reload on Android 17](/main/guides/live-reload.md#live-reload-on-android-17)

