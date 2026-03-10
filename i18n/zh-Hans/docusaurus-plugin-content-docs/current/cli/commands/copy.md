---
title: CLI 命令 - cap copy
description: Capacitor CLI 命令 - cap copy
contributors:
  - dotNetkow
sidebar_label: copy
---

# Capacitor CLI - cap copy

将 Web 应用构建和 Capacitor 配置文件复制到原生平台项目中。每次对 Web 应用进行更改或更改配置值时运行此命令。

```bash
npx cap copy [<platform>]
```

<strong>输入:</strong>

- `platform` (可选): `android`、`ios`

<strong>选项:</strong>

- `--inline`: 同步后，所有 JS source maps 都将被内联，允许在基于 Chromium 的浏览器中调试 Android WebView。

## Hooks

copy 命令可用的以下 hooks:

- `capacitor:copy:before`
- `capacitor:copy:after`

[更多信息](../hooks)
