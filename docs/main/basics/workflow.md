---
title: Development Workflow
description: Capacitor Workflow
slug: /basics/workflow
---

# Capacitor 工作流程

使用 Capacitor 的开发方式与传统 Web 应用略有不同。要将你的 Web 应用构建为原生移动应用，你需要遵循以下步骤。

## 构建你的 Web 代码

当你准备好要在移动设备上测试 Web 应用时，你需要先构建用于分发的 Web 应用。如果你使用的是 [Create React App](https://create-react-app.dev/) 或 [Vite](https://vitejs.dev/) 这类工具，构建命令通常是 `npm run build`；而像 [Angular](https://angular.io/) 这样的工具则使用 `ng build` 命令。无论使用什么命令，你都需要构建用于分发的 Web 代码，才能与 Capacitor 配合使用。

## 将 Web 代码同步到 Capacitor 项目

当你的 Web 代码构建完成后，需要将其推送到 Capacitor 原生应用中。你可以使用 [Capacitor CLI](/cli/index.md) 来“同步”你的 Web 代码，并安装/更新所需的原生依赖。

运行以下命令来同步项目：

```bash
npx cap sync
```

运行 `npx cap sync` 会将已构建的 Web 资源包**复制**到 Android 和 iOS 项目中，并**更新** Capacitor 使用的原生依赖。

你可以在 [Capacitor CLI 参考文档](/cli/index.md)中[阅读关于 `sync` 的详细说明](/cli/commands/sync.md)。

:::info
如果遇到“找不到 Web 资源目录”的错误？请更新你的 [Capacitor 配置文件](/main/reference/config.md)，确保 `webDir` 设置正确。
:::

## 测试你的 Capacitor 应用

将 Web 资源包同步到原生项目后，就可以在移动设备上测试应用了。测试方式有多种，最简单的是使用 Capacitor CLI 内置命令。

要在 iOS 设备上运行调试版本，可以执行：
```bash
npx cap run ios
```

类似地，要在 Android 设备上运行调试版本，可以执行：
```bash
npx cap run android
```

完成应用迭代和测试后，就可以编译最终的分发版本了。

:::info
你也可以[通过 Xcode 在 iOS 上运行应用](/main/ios/index.md#running-in-xcode)或[通过 Android Studio 在 Android 上运行应用](/main/android/index.md#running-with-android-studio)。两种方式都适用于开发环境，不妨都试试看哪种更适合你！
:::

### 打开原生 IDE

如果你想更精细地控制原生项目，可以使用 Capacitor CLI 快速打开原生 IDE。

要[在 Xcode 中打开 iOS Capacitor `.xcworkspace` 项目](/main/ios/index.md#opening-the-ios-project)，可以运行：
```bash
npx cap open ios
```

类似地，要[在 Android Studio 中打开 Android Capacitor 项目](/main/android/index.md#opening-the-android-project)，可以运行：
```bash
npx cap open android
```

打开原生项目可以让你完全掌控应用的原生运行时环境。你可以[创建插件](/plugins.mdx)、[添加自定义原生代码](/main/ios/custom-code.md)，或[编译应用](#编译原生二进制文件)进行发布。

## 编译原生二进制文件

执行 `sync` 后，建议打开目标平台的 IDE：iOS 使用 Xcode，Android 使用 Android Studio，来编译你的原生应用。

另外，如果需要在终端或 CI 环境中编译应用，可以使用 [cap build 命令](/cli/commands/build)构建原生项目，生成已签名的 AAB、APK 或 IPA 文件，准备分发到设备或最终用户。

```bash
npx cap build android
```

我们还建议使用 [Fastlane](https://fastlane.tools) 等工具或 [Appflow](https://useappflow.com) 等云端构建工具来自动化这些流程。虽然每个应用的需求不同，但我们提供了 Capacitor 项目的一般发布流程示例。请阅读我们的 [iOS](/main/ios/deploying-to-app-store.md) 和 [Android](/main/android/deploying-to-google-play.md) 发布指南，了解更多关于部署到 Apple App Store 或 Google Play Store 的信息。

## 更新 Capacitor

更新 Capacitor 运行时非常简单，只需运行 `npm install`。

```bash
npm i @capacitor/core @capacitor/ios @capacitor/android
npm i -D @capacitor/cli
```

更新 Capacitor 时，请确保 Core、Android 和 iOS 库的版本一致。Capacitor Core、Android 和 iOS 的发布是同步进行的，因此只要同时安装所有库，就不会有问题！

:::info
你可以订阅 [Capacitor 代码库](https://github.com/ionic-team/capacitor)来获取新版本通知。在代码库首页顶部，点击 **Watch** -> **Releases only**。
:::