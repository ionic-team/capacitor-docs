---
title: 开发工作流程
description: Capacitor 工作流程
slug: /basics/workflow
---

# Capacitor 工作流程

使用 Capacitor 与使用传统 Web 应用略有不同。要使您的 Web 应用成为原生 Capacitor 应用，您需要执行以下步骤。

## 构建 Web 代码

一旦您准备好在移动设备上测试您的 Web 应用，就需要构建您的 Web 应用以进行分发。如果您使用的是 [Create React App](https://create-react-app.dev/) 或 [Vite](https://vitejs.dev/) 等工具，该命令将是 `npm run build`；而像 [Angular](https://angular.io/) 这样的工具使用命令 `ng build`。无论您的命令是什么，您都需要构建 Web 代码以进行分发，以便与 Capacitor 一起使用。

## 将 Web 代码同步到 Capacitor 项目

构建 Web 代码以进行分发后，您需要将 Web 代码推送到 Web 原生 Capacitor 应用程序。为此，您可以使用 [Capacitor CLI](/cli/index.md) "同步"您的 Web 代码并安装/更新所需的原生依赖项。

要同步您的项目，请运行：

```bash
npx cap sync
```

运行 `npx cap sync` 将**复制**您已构建的 Web 包到 Android 和 iOS 项目，以及**更新** Capacitor 使用的原生依赖项。

您可以[阅读我们的文档](/cli/commands/sync.md)了解 `sync` 以及更多关于 [Capacitor CLI 参考](/cli/index.md)文档。

:::info
您是否收到关于"无法找到 Web 资源目录"的错误？更新您的 [Capacitor 配置](/main/reference/config.md)文件以使用正确的 `webDir`。
:::


## 测试您的 Capacitor 应用

将您的 Web 包同步到原生项目后，就可以在移动设备上测试您的应用程序了。有几种不同的方法可以做到这一点，但最简单的方法是使用内置的 Capacitor CLI 命令。

要在 iOS 设备上运行 Capacitor 应用的调试版本，可以运行：
```bash
npx cap run ios
```

同样，要在 Android 设备上运行 Capacitor 应用的调试版本，可以运行：
```bash
npx cap run android
```


完成应用程序的迭代和测试后，就可以编译最终的二进制文件以分发到其他移动设备。

:::info
您也可以[通过 Xcode 在 iOS 上运行您的应用](/main/ios/index.md#running-in-xcode)或[通过 Android Studio 在 Android 上运行您的应用](/main/android/index.md#running-with-android-studio)。这两种选项对于开发都是有效的。请尝试两种选项，看看您更喜欢哪一种！
:::

### 打开原生 IDE

如果您想对原生项目进行更多控制，可以使用 Capacitor CLI 快速打开原生 IDE。

要[在 Xcode 中打开 iOS Capacitor `.xcworkspace` 项目](/main/ios/index.md#opening-the-ios-project)，可以运行：
```bash
npx cap open ios
```

同样，要[在 Android Studio 中打开 Android Capacitor 项目](/main/android/index.md#opening-the-android-project)，可以运行：
```bash
npx cap open android
```

打开原生项目可以让您完全控制应用程序的原生运行时。您可以[创建插件](/plugins.mdx)、[添加自定义原生代码](/main/ios/custom-code.md)或[编译应用程序](#编译原生二进制文件)以进行发布。

## 编译原生二进制文件

在 `sync` 之后，建议您打开目标平台的 IDE：iOS 的 Xcode 或 Android 的 Android Studio，以编译您的原生应用。

或者，要在终端或 CI 环境中编译您的应用程序，您可以使用 [cap build 命令](/cli/commands/build)来构建原生项目，输出已签名的 AAB、APK 或 IPA 文件，准备好分发到设备或最终用户。

```bash
npx cap build android
```

我们还建议使用 [Fastlane](https://fastlane.tools) 等工具或像 [Appflow](https://useappflow.com) 这样的云构建工具来自动化这些过程。虽然每个应用程序都不同，但我们有一个 Capacitor 项目通用发布流程的示例。请阅读我们的 [iOS](/main/ios/deploying-to-app-store.md) 和 [Android](/main/android/deploying-to-google-play.md) 发布指南，了解更多关于如何部署到 Apple App Store 或 Google Play Store 的信息。

## 更新 Capacitor

更新 Capacitor 运行时就像运行 `npm install` 一样简单。

```bash
npm i @capacitor/core @capacitor/ios @capacitor/android
npm i -D @capacitor/cli
```

更新 Capacitor 时，您需要确保 Core、Android 和 iOS 库都是相同的版本。Capacitor Core、Android 和 iOS 版本都是同时上传的，这意味着如果您同时安装所有库，就不会有问题！

:::info
您可以订阅 [Capacitor 仓库](https://github.com/ionic-team/capacitor)以获取新版本通知。在仓库索引的顶部，点击 **Watch** -> **Releases only**。
:::
