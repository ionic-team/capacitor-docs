---
title: CLI 命令 - cap run
description: Capacitor CLI - cap run
sidebar_label: run
---

# Capacitor CLI - cap run

此命令首先执行 [`sync`](/cli/commands/sync.md) 操作，然后将原生应用构建并部署到您选择的目标设备。

```bash
npx cap run [options] <platform>
```

<strong>输入参数：</strong>

- `platform`（必需）：`android`、`ios`

<strong>选项：</strong>

- `--flavor <flavorName>`：设置 Android 项目的构建变体（目前不支持维度变体）
- `--list`：显示指定平台可用的目标设备列表
- `--no-sync`：跳过同步命令的执行
- `--scheme <schemeName>`：设置 iOS 项目的方案配置
- `--configuration <name>`：iOS 方案的配置名称
- `--target <id>`：在特定目标设备上运行
- `--live-reload`：启用实时重载功能
- `-l`：`--live-reload` 的简写形式
- `--host <host>`：通过指定主机地址加载 Web 视图实现实时重载
- `--port <port>`：通过指定端口加载 Web 视图实现实时重载
- `--forwardPorts <port1:port2>`：自动运行 "adb reverse" 以提供更好的实时重载支持