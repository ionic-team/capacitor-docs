---
title: Telemetry
description: Capacitor CLI 遥测
contributors:
  - eric-horodyski
---

Capacitor 会收集关于常规使用情况的匿名遥测数据。这是一个默认启用的项目，旨在帮助 Capacitor 团队深入了解产品使用情况以改进产品。通过提供使用数据，您将帮助提供可能塑造产品未来发展的宝贵见解。

在 Capacitor CLI 成功完成首次命令后，您将自动加入此项目。您随时可以选择退出，选择退出后除非重新启用，否则将不再收集遥测数据。

> **注意：** 遥测功能不会在非交互式环境（如 CI 服务器）中运行，确保在这些场景下不会收集任何数据。

## 为什么需要遥测？

匿名使用数据能让团队深入了解 Capacitor 的使用情况。借助这些信息，我们可以更好地确定修复和功能的优先级。同时也能让团队更好地理解开发者的使用体验。

## 收集哪些数据？

使用数据完全匿名，仅包含以下内容：

* 时间戳
* 命令名称、参数和所选标志
* 命令执行时长
* 错误消息（如果命令失败，不包含堆栈跟踪）
* Capacitor 机器 ID（匿名生成的 ID）
* 项目 ID（匿名生成的 ID）
* 您的操作系统（Mac、Linux、Windows）
* 以下版本信息：NodeJS、Capacitor CLI、核心组件以及官方平台和插件

## 如何启用或禁用

您随时可以在项目根目录运行 `npx cap telemetry off` 来选择退出此项目：

```bash
npx cap telemetry off
```

您可以通过在项目根目录运行以下命令来检查状态：

```bash
npx cap telemetry
```

如果您想重新加入项目并提供遥测数据，请运行以下命令：

```bash
npx cap telemetry on
```