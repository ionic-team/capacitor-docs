---
title: CLI Command - cap run
description: Capacitor CLI - cap run
sidebar_label: run
---

# Capacitor CLI - cap run

This command first runs [`sync`](/cli/commands/sync.md), then it builds and deploys the native app to a target device of your choice.

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
- `--live-reload`: Enable Live Reload
- `-l`: Shorthand for `--live-reload`
- `--host <host>`: Live Reload by loading the web view from the specified host
- `--port <port>`: Live Reload by loading the web view from the specified port
- `--forwardPorts <port1:port2>`: Automatically run "adb reverse" for better live-reloading support

