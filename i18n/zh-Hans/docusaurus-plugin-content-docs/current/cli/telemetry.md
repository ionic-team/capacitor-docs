---
title: 遥测
description: Capacitor CLI 遥测
contributors:
  - eric-horodyski
---

Capacitor 会收集有关一般使用的匿名遥测数据。这是一个选择退出计划，为 Capacitor 团队提供洞察力，以帮助改进产品。通过提供使用数据，您可以帮助提供有价值的洞察，这些洞察可能会塑造产品的未来。

在 Capacitor CLI 成功完成其第一个命令后，您将自动加入。您可以随时选择退出，在这种情况下，除非您重新加入，否则不会收集遥测数据。

> **注意:** 遥测不会在非交互式环境中运行，例如 CI 服务器，确保在这些情况下不收集数据。

## 为什么?

匿名使用数据使团队能够深入了解如何使用 Capacitor。有了这些信息，我们可以更好地确定修复和功能的优先级。它还为团队提供了对开发者体验的更好理解。

## 收集了什么?

使用数据完全匿名，仅包括以下内容:

* 时间戳
* 命令名称、参数和选定的标志
* 命令持续时间
* 错误消息(如果命令失败，不包括堆栈跟踪)
* Capacitor 机器 ID(匿名、生成的 ID)
* 项目 ID(匿名、生成的 ID)
* 您的操作系统(Mac、Linux、Windows)
* 版本: NodeJS、Capacitor CLI、核心以及官方平台和插件

## 如何选择加入或退出

您可以随时通过在项目根目录中运行 `npx cap telemetry off` 来退出该计划:

```bash
npx cap telemetry off
```

您可以通过在项目根目录中运行以下命令来检查状态:

```bash
npx cap telemetry
```

如果您想重新加入该计划并为您的项目提供遥测数据，请运行以下命令:

```bash
npx cap telemetry on
```
