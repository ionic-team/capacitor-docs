---
title: CLI Command - cap copy
description: Capacitor CLI command - cap copy
contributors:
  - dotNetkow
sidebar_label: copy
---

# Capacitor CLI - cap copy

Copy the web app build and Capacitor configuration file into the native platform project. Run this each time you make changes to your web app or change a configuration value.

```bash
npx cap copy [<platform>]
```

<strong>Inputs:</strong>

- `platform` (optional): `android`, `ios`

<strong>Options:</strong>

- `--inline`: After syncing, all JS source maps will be inlined allowing for debugging an Android Web View in Chromium based browsers.

## Hooks

The following hooks are available for copy command:

- `capacitor:copy:before`
- `capacitor:copy:after`

[More information](../hooks)
