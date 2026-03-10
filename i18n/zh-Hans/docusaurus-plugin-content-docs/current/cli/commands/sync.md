---
title: CLI 命令 - cap sync
description: Capacitor CLI 命令 - cap sync
contributors:
  - dotNetkow
sidebar_label: sync
---

# Capacitor CLI - cap sync

此命令运行 [`copy`](/cli/commands/copy.md)，然后运行 [`update`](/cli/commands/update.md)。

```bash
npx cap sync [options] [<platform>]
```

<strong>输入:</strong>

- `platform` (可选): `android`、`ios`

<strong>选项:</strong>

- `--deployment`: Podfile.lock 将不会被删除，pod install 将使用 `--deployment` 选项。
- `--inline`: 同步后，所有 JS source maps 都将被内联，允许在基于 Chromium 的浏览器中调试 Android WebView。

## Hooks

sync 命令可用的以下 hooks:

- `capacitor:sync:before`
- `capacitor:sync:after`

[更多信息](../hooks)
