---
title: Environment Setup
description: 设置 Capacitor 的开发环境
slug: /getting-started/environment-setup
---

# 环境设置

Capacitor 支持三个官方应用目标平台：Android、iOS 和 Web。要开发所有三个平台的应用，你需要安装以下所有依赖项。如果不需要针对某个原生移动平台，可以跳过相关部分。

## 核心要求

要使用 Capacitor 开发任何应用程序，你需要安装 NodeJS 20 或更高版本。可以通过以下方式安装 Node：使用 [Node 官网](https://nodejs.org)的安装程序、使用 JavaScript 工具管理器 [Volta](https://volta.sh/)，或通过 [homebrew](https://brew.sh/) 或 [Chocolatey](https://chocolatey.org/) 等包管理器安装。

安装 Node 后，打开终端并输入以下命令以确保 Node 已正确安装：

```bash
node --version
# v20.9.0
```

安装 Node 后，你就可以开始使用 Capacitor 开发渐进式 Web 应用（PWA）。

## iOS 要求

要构建 iOS 应用，你需要 **macOS** 系统。虽然如果你没有 Mac，可以使用 [Ionic Appflow](http://ionicframework.com/appflow) 等解决方案进行 iOS 云构建，但强烈建议在本地安装相关工具，以便正确测试 Capacitor 应用。

要使用 Capacitor 开发 iOS 应用，你需要四个额外的依赖项：

- Xcode
- Xcode 命令行工具
- Homebrew
- Cocoapods

安装完核心要求以及 Xcode、Xcode 命令行工具和 Cocoapods 后，你将能够创建 iOS 应用和 PWA。

### Xcode

Xcode 是 Apple 用于创建原生 macOS、iOS 和 iPadOS 应用的 IDE。你可以通过 [Apple App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12) 在 Mac 上安装 Xcode。Capacitor 7 最低要求 Xcode 16.0。

### Xcode 命令行工具

Xcode 命令行工具是 Xcode 核心未包含的附加工具，用于构建和测试应用。安装 Xcode 后，可以在终端中运行以下命令来安装 Xcode 命令行工具：

```bash
xcode-select --install
```

输入密码并等待几分钟安装完成后，可以通过运行以下命令验证工具是否已安装：

```bash
xcode-select -p
# /Applications/Xcode.app/Contents/Developer
```

### Homebrew

Homebrew 是 macOS 的包管理器。你需要安装它才能为 Intel 和 Apple Silicon 芯片的 Mac 安装 CocoaPods。

要安装 Homebrew，请运行以下 bash 命令：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

:::info
别只听我们的！这是 [brew.sh](https://brew.sh) 推荐的 Homebrew 安装方式。
:::

如果不想安装 Homebrew，可以在下方找到替代（但不推荐）的安装说明。

### CocoaPods

CocoaPods 是 iOS 的依赖管理器，Capacitor 使用它来安装和管理 iOS 项目的原生依赖项。你可以在终端中运行以下命令安装 [CocoaPods](https://cocoapods.org/)：

```bash
brew install cocoapods
```

可以通过运行以下命令验证 CocoaPods 是否已正确安装：

```bash
pod --version
# 1.12.1
```

#### 不使用 Homebrew 安装 CocoaPods

你可以直接使用 Ruby Gem 安装 CocoaPods。运行以下命令进行安装：

```
sudo gem install cocoapods
```

如需无需 sudo 权限运行，请参阅 [CocoaPods 无 sudo 安装文档](https://guides.cocoapods.org/using/getting-started.html#sudo-less-installation)

## Android 要求

要使用 Capacitor 开发 Android 应用，你需要两个额外的依赖项：

- Android Studio
- Android SDK 安装

:::note
你无需单独安装 Java 开发工具包（JDK）。Android Studio 会自动为你安装合适的 JDK。
:::

安装完核心要求以及 Android Studio 和 Android SDK 后，你将能够创建 Android 应用和 PWA。

### Android Studio

Android Studio 是 Google 用于创建原生 Android 应用的 IDE。你可以访问 [Android Studio 下载页面](https://developer.android.com/studio)进行安装。Capacitor 7 最低要求 Android Studio 2024.2.1。

### Android SDK

安装 Android Studio 后，你需要安装 Android SDK 包。

开发 Android 应用需要安装一些 Android SDK 包。确保安装 Android SDK Tools 以及 API 23 或更高版本的 Android SDK Platforms。

在 Android Studio 中，从菜单打开 **Tools -> SDK Manager**，然后在 **SDK Platforms** 选项卡中安装你想要测试的平台版本：

![SDK Platforms](/img/v6/docs/android/sdk-platforms.png)

刚开始时，你只需要安装一个 API 版本。上图中安装了 Android 9 (API 28) 和 Android 10 (API 29) 的 SDK。最新稳定版本是 Android 15 (API 35)。