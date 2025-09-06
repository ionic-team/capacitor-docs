---
title: CLI Command - cap sync
description: Capacitor CLI 命令 - cap sync
contributors:
  - dotNetkow
sidebar_label: sync
---

# Capacitor CLI - cap sync

此命令依次执行 [`copy`](/cli/commands/copy.md) 和 [`update`](/cli/commands/update.md)。

```bash
npx cap sync [options] [<platform>]
```

<strong>输入参数：</strong>

- `platform` (可选): `android`, `ios`

<strong>选项：</strong>

- `--deployment`: 不删除 Podfile.lock，且 pod install 将使用 `--deployment` 选项。
- `--inline`: 同步后，所有 JS 源映射将被内联，以便在基于 Chromium 的浏览器中调试 Android Web View。

## 钩子函数 (Hooks)

sync 命令可使用以下钩子：

- `capacitor:sync:before`
- `capacitor:sync:after`

[更多信息](../hooks)