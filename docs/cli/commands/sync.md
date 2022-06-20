---
title: CLI Command - cap sync
description: Capacitor CLI command - cap sync
contributors:
  - dotNetkow
sidebar_label: sync
---

# Capacitor CLI - cap sync

This command runs [`copy`](/docs/cli/copy) and then [`update`](/docs/cli/update).

```bash
npx cap sync [options] [<platform>]
```

<strong>Inputs:</strong>

- `platform` (optional): `android`, `ios`

<strong>Options:</strong>

- `--deployment`: Podfile.lock won't be deleted and pod install will use `--deployment` option.

## Hooks

The following hooks are available for sync command:

- `capacitor:sync:before`
- `capacitor:sync:after`

[More information](hooks)
