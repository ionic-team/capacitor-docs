---
title: iOS 故障排除指南
sidebar_label: 故障排除
description: iOS 故障排除指南
contributors:
  - dotNetkow
  - mlynch
  - ryanccn
slug: /ios/troubleshooting
---

# iOS 故障排除指南

创建一个 100% 完美的原生管理工具几乎是不可能的，迟早您会在 iOS 工作流程的某些部分遇到各种问题。

本指南试图记录常见的 iOS/Xcode 问题及可能的解决方案。

## iOS 工具箱

每个 iOS 开发者都会学习一些调试 iOS 问题的常见技术，您应该将这些技术纳入您的工作流程：

### Google、Google、Google

每当您遇到 iOS 或 Xcode 问题时，第一步都应该将错误复制并粘贴到 Google 搜索中。

Capacitor 使用标准的 iOS 工具链，因此如果您遇到某些问题，许多 iOS 开发者可能也遇到过，并且有解决方案。

这可能就像更新依赖项、运行清理或删除 Derived Data 一样简单。

### 清理/重建

清理和重建可以解决许多构建问题。导航到 Xcode 菜单中的 Product -> Clean Build Folder 以清理当前的构建。

### 删除 Derived Data

有时，Xcode 会保留旧的、过时的构建产物。要重新开始，您需要删除磁盘上的任何 Derived Data。

为此，请打开 Xcode Preferences，选择 Locations 标签，然后点击 Derived Data 路径旁边的小箭头：

![位置](/img/v6/docs/ios/location-prefs.png)

这将打开一个 Finder 窗口，显示 Xcode 的临时 Derived Data 的位置。

接下来，选择该目录中的所有项目并删除：

![删除 Derived Data](/img/v6/docs/ios/deleting-derived-data.png)

最后，在 Xcode 中进行重新构建。

## 错误：Sandbox 与 Podfile.lock 不同步

如果 CocoaPods 未能运行来安装您的依赖项，则可能会发生此错误。

运行此命令来更新您的 pods：

```bash
npx cap update ios
```

运行此命令后执行新构建。

## 永久索引

Xcode 有时会卡在永久索引中。这种不幸的情况看起来像这样：

![Xcode 索引](/img/v6/docs/ios/indexing.png)

唯一的解决方案是强制关闭 Xcode（使用 Activity Monitor）并重新启动它。

## CocoaPods：无法连接到 GitHub

在安装了旧版本 openssl 和 ruby 的 Mac 上可能会发生此错误，因为 GitHub 在访问仓库时限制允许的加密协议。

解决方案是更新 openssl 并更新 Ruby：

```bash
brew install openssl
brew upgrade openssl
brew install ruby
brew link --overwrite ruby
```

最后，确保您的 `PATH` 环境变量不会将 `/usr/local/bin` 放在 `$PATH` 之后，而是放在它_之前_。

请参阅 [此 StackOverflow 问题](https://stackoverflow.com/questions/38993527/cocoapods-failed-to-connect-to-github-to-update-the-cocoapods-specs-specs-repo/48996424#48996424) 以获取此问题的其他可能解决方案。

## 插件未实现

在 iOS 上，如果 Capacitor 找不到插件或无法将其代码注入到 WebView 中，则可能会发生这种情况。

首先，确保插件已安装并出现在 `package.json` 中。

然后，运行 `npx cap sync ios`。

最后，检查插件是否在 `ios/App/Podfile` 中。如果未列出插件，请确保您的 Podfile 看起来像 [这个](https://github.com/ionic-team/capacitor/blob/main/ios-pods-template/App/Podfile)，并再次运行 `npx cap sync`。

如果仍然收到"插件未实现"错误，请确保您在 `ios/App/App/Info.plist` 中没有 `WKAppBoundDomains` 键，这会阻止 Capacitor 和插件代码注入。如果不需要，请删除该键，或者如果无法删除，请在 capacitor 配置文件的 `ios` 对象内添加 `limitsNavigationsToAppBoundDomains`，其值为 `true`。
