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
- `--live-reload`: Set live-reload URL via CLI (uses defaults, overrides `server.url` config)
- `-l`: Shorthand for `--live-reload`
- `--host <host>`: Configure host for live-reload URL (used with `--live-reload`)
- `--port <port>`: Configure port for live-reload URL (used with `--live-reload`)
- `--https`: Use https:// instead of http:// for live-reload URL (used with `--live-reload`)
- `--forwardPorts <port1:port2>`: Automatically run "adb reverse" for better live-reloading support

