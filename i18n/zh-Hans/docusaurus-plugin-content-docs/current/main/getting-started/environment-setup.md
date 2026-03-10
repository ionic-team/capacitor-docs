---
title: 环境设置
description: 为 Capacitor 设置开发环境
slug: /getting-started/environment-setup
---

# 环境设置

Capacitor 有三个官方支持的应用目标：Android、iOS 和 Web。为了为所有三个平台创建应用程序，您需要安装以下所有依赖项。如果您不以某个原生移动平台为目标，则可以跳过相关部分。

## 核心要求

为了使用 Capacitor 开发任何应用程序，您需要安装 NodeJS 22 或更高版本。您可以通过使用 [Node 网站](https://nodejs.org)上的安装程序、使用 [Volta](https://volta.sh/)（一个 JavaScript 工具管理器）或使用包管理器如 [homebrew](https://brew.sh/) 或 [Chocolatey](https://chocolatey.org/) 来安装 Node。

安装 Node 后，打开您选择的终端并输入以下命令以确保 node 已正确安装

```bash
node --version
# v22.21.1
```

安装 Node 后，您就可以开始使用 Capacitor 创建渐进式 Web 应用程序 (PWA) 了。

## iOS 要求 {#ios-requirements}

要构建 iOS 应用程序，您需要 **macOS**。虽然有一些解决方案（如 [Ionic Appflow](http://ionicframework.com/appflow)）可以在没有 Mac 的情况下执行 iOS 云构建，但强烈建议您在本地安装可用工具，以便正确测试您的 Capacitor 应用程序。

为了使用 Capacitor 开发 iOS 应用程序，您需要两个额外的依赖项：

- Xcode
- Xcode 命令行工具

安装核心要求以及 Xcode、Xcode 命令行工具后，您就可以创建 iOS 应用程序和 PWA 了。

### Xcode

Xcode 是 Apple 用于创建原生 macOS、iOS 和 iPadOS 应用程序的 IDE。您可以通过在 Mac 上[使用 Apple App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12)安装 Xcode。Capacitor 8 最低需要 Xcode 26.0。

### Xcode 命令行工具

Xcode 命令行工具是 Xcode 核心中不包含的额外工具，是构建和测试应用程序所必需的。安装 Xcode 后，可以通过在终端中运行以下命令来安装 Xcode 命令行工具：

```bash
xcode-select --install
```

输入密码并等待几分钟安装包后，可以通过运行以下命令来验证工具是否已安装：

```bash
xcode-select -p
# /Applications/Xcode.app/Contents/Developer
```

### 可选依赖项

以下依赖项对于在 iOS 上使用 Capacitor 是可选的。

如果您需要使用 CocoaPods 作为原生 iOS 包的依赖项管理器，那么您应该安装这两个包管理器：

- Homebrew
- CocoaPods

我们建议使用 [Swift Package Manager](https://docs.swift.org/swiftpm/documentation/packagemanagerdocs) (SPM) 作为 iOS 的依赖项管理器。如果您不需要 CocoaPods，则可以使用 SPM 并跳过这两个依赖项的安装。

#### Homebrew

Homebrew 是 macOS 包的包管理器。您需要安装它才能为 Intel 和 Apple Silicon Mac 安装 CocoaPods。

要安装 Homebrew，请运行以下 bash 命令：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

:::info
不要只相信我们！这是 [brew.sh](https://brew.sh) 推荐安装 Homebrew 的方式。
:::

如果您不想安装 Homebrew，可以在下面找到替代但不推荐的说明。

#### CocoaPods

CocoaPods 是 Capacitor 7 及更早版本中的默认 iOS 依赖项管理器。自 Capacitor 8 起，默认值已被 SPM 取代，但如果您的项目需要，您仍然可以使用 CocoaPods 作为替代方案，方法是将 `--packagemanager CocoaPods` 传递给 `npx cap add ios` 命令。

您可以通过在终端中运行以下命令来安装 [CocoaPods](https://cocoapods.org/)

```bash
brew install cocoapods
```

您可以通过运行以下命令来验证 CocoaPods 是否已正确安装。

```bash
pod --version
# 1.12.1
```

##### 在没有 Homebrew 的情况下安装 CocoaPods

您可以直接使用 Ruby Gem 安装 CocoaPods。要安装它，可以运行以下命令。
```
sudo gem install cocoapods
```

有关在没有 sudo 的情况下运行，请参阅 [CocoaPods 无 sudo 安装文档](https://guides.cocoapods.org/using/getting-started.html#sudo-less-installation)

## Android 要求

为了使用 Capacitor 开发 Android 应用程序，您需要两个额外的依赖项：

- Android Studio
- Android SDK 安装

:::note
您不需要单独安装 Java 开发工具包 (JDK)。Android Studio 会自动为您安装正确的 JDK。
:::

安装核心要求以及带有 Android Studio 的 Android SDK 后，您就可以创建 Android 应用程序和 PWA 了。

### Android Studio

Android Studio 是 Google 用于创建原生 Android 应用程序的 IDE。您可以通过转到 [Android Studio 下载页面](https://developer.android.com/studio)安装 Android Studio。Capacitor 8 最低需要 Android Studio 2025.2.1。

### Android SDK

安装 Android Studio 后，您需要安装 Android SDK 包。

开发 Android 应用程序需要安装一些 Android SDK 包。确保安装 Android SDK 工具，以及 API 24 或更高版本的 Android SDK 平台版本。

在 Android Studio 中，从菜单中打开 **Tools -> SDK Manager**，并在 **SDK Platforms** 选项卡中安装您想要测试的平台版本：

![SDK Platforms](/img/v6/docs/android/sdk-platforms.png)

要开始使用，您只需要安装一个 API 版本。在上图中，安装了 Android 9 (API 28) 和 Android 10 (API 29) 的 SDK。最新的稳定版本是 Android 16 (API 36)。
