---
title: 安装 Capacitor
description: 安装 Capacitor
slug: /getting-started
---

# 安装 Capacitor

您既可以创建一个全新的 Capacitor 应用，也可以将 Capacitor 添加到现有的 Web 项目中。这可以通过 CLI 或使用社区维护的 [VS Code 扩展](/main/getting-started/vscode-extension.mdx)来实现。

请确保您已为将要构建的平台完成[环境配置](/main/getting-started/environment-setup.md)。

## 创建新的 Capacitor 应用

可以使用 `@capacitor/create-app` 包快速创建 Capacitor 应用程序。您可以在空目录中运行以下命令来搭建新的 Capacitor 应用骨架。

```bash
npm init @capacitor/app@latest
```

## 将 Capacitor 添加到现有 Web 应用

Capacitor 设计为可无缝集成到任何现代 JavaScript Web 应用中。但您的项目需要满足以下三个要求才能使用 Capacitor：

- 具备 `package.json` 文件
- 拥有独立的构建资源目录（如 `dist` 或 `www`）
- web 资源目录根路径下存在 `index.html` 文件

:::info
您的 `index.html` 文件必须包含 `<head>` 标签才能正确注入 Capacitor。如果 HTML 中没有 `<head>` 标签，Capacitor 插件将无法正常工作。
:::

### 安装 Capacitor

在应用根目录下，安装 Capacitor 的核心 npm 依赖：JavaScript 运行时和命令行界面（CLI）。

```bash
npm i @capacitor/core
npm i -D @capacitor/cli
```

### 初始化 Capacitor 配置

然后使用 CLI 问卷初始化 Capacitor：

```bash
npx cap init
```

CLI 会询问几个问题，包括应用名称和要使用的包 ID。它将根据这些配置详情创建 capacitor-config 文件，其中包含构建工具预期的输出目录（例如 Angular 的 `www`、React 的 `build`、Vue 的 `public` 等）。

:::info
您可以通过修改 `npx cap init` 过程中创建的 [Capacitor 配置](/docs/config)文件中的 `webDir` 变量来自定义 Capacitor 使用的文件夹。请注意，Capacitor 会通过检测您使用的框架来尝试推断默认值。但在首次同步构建遇到问题时，最好仔细核对此配置变量。
:::

### 创建 Android 和 iOS 项目

安装 Capacitor 核心运行时后，可以安装 Android 和 iOS 平台支持。

```bash
npm i @capacitor/android @capacitor/ios
```

将平台添加到 `package.json` 后，运行以下命令为原生应用创建 Android 和 iOS 项目。

```bash
npx cap add android
npx cap add ios
```

### 将 Web 代码同步到原生项目

创建原生项目后，可通过运行以下命令将 Web 应用同步到原生项目。

```bash
npx cap sync
```

`npx cap sync` 会将构建好的 Web 资源包（预期位于 [Capacitor 配置](/docs/config)文件的 `webDir` 中）复制到原生项目，并安装原生项目的依赖项。

## 下一步

完成环境设置和项目结构配置后，您已准备就绪！如需更具体的文档，可参考以下链接：

[iOS 入门指南 &#8250;](/main/ios/index.md)

[Android 入门指南 &#8250;](/main/android/index.md)

[开发工作流指南 &#8250;](/main/basics/workflow.md)