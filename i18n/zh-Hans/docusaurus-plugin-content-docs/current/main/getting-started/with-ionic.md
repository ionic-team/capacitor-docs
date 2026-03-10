---
title: 与 Ionic Framework 一起使用
description: 将 Capacitor 与 Ionic Framework 一起使用
slug: /getting-started/with-ionic
---

# 将 Capacitor 与 Ionic Framework 一起使用

Capacitor 不需要 Ionic Framework 来构建应用程序。然而，开发者可能会发现[大量的 Ionic UI 组件集合](https://ionicframework.com/docs/components)有助于构建高质量的应用程序。

可以通过使用[Ionic CLI](https://ionicframework.com/docs/cli)将 Capacitor 快速直接安装到任何新的或现有的 Ionic 应用程序中。

## 在新的 Ionic 项目中安装 Capacitor
对于新的 Ionic 项目，默认情况下 Capacitor 已经安装在新 Ionic 应用程序中！您所要做的就是开始一个新项目。要创建新的 Ionic 项目，请运行以下命令：

```bash
ionic start
```

如果您想要一个构建基于 Capacitor 的 Ionic 应用程序的教程，请查看 Ionic Framework 团队的[本教程](https://ionicframework.com/docs/intro/next)。

## 在现有 Ionic 项目中安装 Capacitor
如果您有一个尚未启用 Capacitor 的现有 Ionic 项目，您可以通过运行以下命令来启用 Capacitor。

```bash
ionic integrations enable capacitor
```

### 安装 Capacitor 插件依赖项

Ionic Framework 使用以下 Capacitor 插件中的 API：

- [`@capacitor/app`](/apis/app.md)
- [`@capacitor/haptics`](/apis/haptics.md)
- [`@capacitor/keyboard`](/apis/keyboard.md)
- [`@capacitor/status-bar`](/apis/status-bar.md)

为了获得最佳用户体验，您应该确保即使不在应用程序中导入这些插件也要安装它们。要安装这些插件，请在项目的根目录中运行以下命令：

```bash
npm i @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/status-bar
```

### 添加平台

安装 Capacitor 及其插件后，您可以将移动平台添加到您的应用程序中：

```bash
ionic capacitor add android
ionic capacitor add ios
```

这将在项目的根目录中为原生平台创建一个新目录。该目录是一个原生项目，应被视为源代码工件。了解更多关于[原生项目管理](/main/cordova/index.md#原生项目管理)的信息。

:::info
如果您的 Ionic 应用程序使用 Cordova，我们也有关于如何[从 Cordova 迁移到 Capacitor](/main/cordova/migrating-from-cordova-to-capacitor.md)的指南。
:::

## Ionic CLI Capacitor 命令

Ionic CLI 有各种高级命令，为了方便起见，它们包装了 Capacitor CLI。请参阅下面的每个命令的文档。还可以通过在每个命令后使用 `--help` 标志来获取帮助输出。

- [`ionic capacitor add`](https://ionicframework.com/docs/cli/commands/capacitor-add)
- [`ionic capacitor build`](https://ionicframework.com/docs/cli/commands/capacitor-build)
- [`ionic capacitor run`](https://ionicframework.com/docs/cli/commands/capacitor-run)
- [`ionic capacitor sync`](https://ionicframework.com/docs/cli/commands/capacitor-sync)
- [`ionic capacitor open`](https://ionicframework.com/docs/cli/commands/capacitor-open)

有关 Ionic CLI 的更多信息以及如何将其与 Capacitor 一起使用，您可以查看[此处](https://ionicframework.com/docs/cli)的文档。
