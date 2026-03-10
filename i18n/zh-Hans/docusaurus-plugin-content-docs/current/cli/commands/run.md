---
title: CLI 命令 - cap run
description: Capacitor CLI - cap run
sidebar_label: run
---

# Capacitor CLI - cap run

此命令首先运行 [`sync`](/cli/commands/sync.md)，然后构建原生应用并将其部署到您选择的目标设备。

要启用在无线 iOS 设备上运行，请遵循[此处](/main/ios/index.md#wireless-ios-devices)详细说明的说明。

```bash
npx cap run [options] <platform>
```

<strong>输入:</strong>

- `platform` (必需): `android`、`ios`

<strong>选项:</strong>

- `--flavor <flavorName>`: 设置 Android 项目的 flavor(暂不支持 flavor 维度)
- `--list`: 打印给定平台可用的目标设备列表
- `--no-sync`: 不运行 sync 命令
- `--scheme <schemeName>`: 设置 iOS 项目的 scheme
- `--configuration <name>`: iOS Scheme 的配置名称
- `--target <id>`: 在特定的目标设备上运行
- `--target-name <name>`: 按名称在特定的目标设备上运行(例如: "iPhone 17 Pro"、"John's iPhone")
- `--target-name-sdk-version <version>`: 使用 --target-name 时，在具有特定 sdk 版本的按名称命名的目标设备上运行(例如: iOS 26 为 "26.0" 或 Android API 35 为 "35")。对于具有相同名称但不同操作系统/SDK 版本的目标很有用
- `--live-reload`: 通过 CLI 设置实时重载 URL(使用默认值，覆盖 `server.url` 配置)
- `-l`: `--live-reload` 的简写
- `--host <host>`: 为实时重载 URL 配置主机(与 `--live-reload` 一起使用)
- `--port <port>`: 为实时重载 URL 配置端口(与 `--live-reload` 一起使用)
- `--https`: 对实时重载 URL 使用 https:// 而不是 http://(与 `--live-reload` 一起使用)
- `--forwardPorts <port1:port2>`: 自动运行 "adb reverse" 以获得更好的实时重载支持
