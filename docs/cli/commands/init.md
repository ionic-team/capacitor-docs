---
title: CLI 命令 - cap init
description: Capacitor CLI 命令 - cap init
contributors:
  - thomasvidas
sidebar_label: init
---

# Capacitor CLI - cap init

通过提供应用名称、应用 ID 以及现有 Web 应用的可选 Web 目录，初始化 Capacitor 配置。

```bash
npx cap init <appName> <appID>
```

<strong>输入参数：</strong>

- `appName`（必填）：应用程序名称
- `appID`（必填）：应用程序 ID；格式类似 `com.example.appname`

<strong>选项：</strong>

- `--web-dir <value>`：用于初始化的现有 Web 应用目录