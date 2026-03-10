---
title: 入门指南
description: 在 JavaScript 和原生 Swift 或 Objective-C 代码之间通信
slug: /ios
contributors:
  - dotNetkow
  - mlynch
---

# Capacitor iOS 文档

Capacitor 具有原生 iOS 运行时，使开发者能够在 JavaScript 和原生 Swift 或 Objective-C 代码之间通信。

Capacitor iOS 应用使用 Xcode 和 [CocoaPods](https://cocoapods.org/) 进行配置和管理。

## iOS 支持

支持 iOS 15+。需要 Xcode 26.0+（请参阅[环境设置](/main/getting-started/environment-setup.md#ios-requirements)）。Capacitor 使用 [WKWebView](https://developer.apple.com/documentation/webkit/wkwebview)，而不是已弃用的 [UIWebView](https://developer.apple.com/documentation/uikit/uiwebview)。

## 添加 iOS 平台

首先，安装 `@capacitor/ios` 包。

```bash
npm install @capacitor/ios
```

然后，添加 iOS 平台。

```bash
npx cap add ios
```

## 打开 iOS 项目 {#opening-the-ios-project}

要在 Xcode 中打开项目，请运行：

```bash
npx cap open ios
```

或者，您可以通过运行以下命令手动打开 Xcode：

```bash
open ios/App/App.xcworkspace
```

## 运行您的应用

您可以在命令行或使用 Xcode 运行您的应用。

### 在命令行上运行

要在设备或模拟器上运行项目，请运行：

```bash
npx cap run ios
```

该命令将提示您选择一个 target。[了解有关 `run` 的更多信息](/cli/commands/run.md)。

### 无线 iOS 设备 {#wireless-ios-devices}

要启用在无线 iOS 设备上运行，请确保您的设备与 Finder 配对并选择"在 Wi-Fi 上时显示此 iPhone"选项：

![启用无线 iPhone 调试](/img/wireless-iphone.png)

您的设备现在应该显示在 `npx cap run ios --list` 提供的可用设备列表中。

### 在 Xcode 中运行 {#running-in-xcode}

在 Xcode 中，首先选择设备或模拟器，然后点击播放按钮来运行您的应用。

![运行您的应用](/img/v6/docs/ios/running.png)

## 故障排除

如果您在入门过程中遇到任何问题，可以查阅 [iOS 故障排除指南](/main/ios/troubleshooting.md)。如果您需要帮助，请随时[开启讨论](https://github.com/ionic-team/capacitor/discussions/)。

## 下一步

您现在可以继续开发和构建您的应用。使用各种可用的 API、Capacitor 或 Cordova 插件或自定义原生代码来构建应用的其余部分。

## 延伸阅读

遵循这些指南以获取有关每个主题的更多信息：

[配置 iOS 和设置权限 &#8250;](/main/ios/configuration.md)

[为 iOS 构建原生插件 &#8250;](/plugins/creating-plugins/ios-guide.md)
