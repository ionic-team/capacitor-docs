---
title: CLI Command - cap sync
description: Capacitor CLI command - cap sync
contributors:
  - dotNetkow
sidebar_label: sync
---

# Capacitor CLI - cap sync

This command runs [`copy`](/cli/commands/copy.md) and then [`update`](/cli/commands/update.md).

```bash
npx cap sync [options] [<platform>]
```

<strong>Inputs:</strong>

- `platform` (optional): `android`, `ios`

<strong>Options:</strong>

- `--deployment`: Podfile.lock won't be deleted and pod install will use `--deployment` option.
- `--inline`: After syncing, all JS source maps will be inlined allowing for debugging an Android Web View in Chromium based browsers.

## Hooks

The following hooks are available for sync command:

- `capacitor:sync:before`
- `capacitor:sync:after`

[More information](../hooks)
