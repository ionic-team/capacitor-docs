---
title: 从 Cordova 迁移到 Capacitor
description: 从 Cordova 迁移到 Capacitor
contributors:
  - dotNetkow
slug: /cordova/migrating-from-cordova-to-capacitor
---

# 将使用 Cordova 的 Web 应用迁移到 Capacitor

将使用 Cordova 的 Web 应用完全迁移到 Capacitor 需要几个步骤。

> 建议在应用这些更改时在单独的代码分支中工作。

## 添加 Capacitor

首先在终端中打开您的项目，然后按照[将 Capacitor 添加到 Web 应用](/main/getting-started/installation.md#将-capacitor-添加到您的-web-应用)或[将 Capacitor 添加到 Ionic 应用](/main/getting-started/with-ionic.md#在现有-ionic-项目中安装-capacitor)的指南进行操作。

使用 Capacitor 初始化您的应用程序。系统将提示您输入的一些信息可以在 Cordova `config.xml` 文件中找到：

- 应用程序名称可以在 `<name>` 元素中找到。
- Bundle ID 可以在根 `<widget>` 元素的 `id` 属性中找到。

```bash
npx cap init
```

### 构建 Web 应用

在添加任何原生平台之前，您必须至少构建一次 Web 项目。

```bash
npm run build
```

这确保 Capacitor [自动配置](/main/basics/configuring-your-app.md)为在 Capacitor 配置文件中用作 `webDir` 的 `www` 文件夹。

### 添加平台

Capacitor 原生平台存在于自己的顶级文件夹中。Cordova 的位于 `platforms/ios` 或 `platforms/android` 下。

```bash
npx cap add ios
npx cap add android
```

在项目根目录下创建了 android 和 ios 文件夹。这些是完全独立的原生项目工件，应被视为应用程序的一部分（即，将它们提交到源代码控制，在自己的 IDE 中编辑它们等）。此外，在 `package.json` 的 `dependencies` 下找到的任何 Cordova 插件都会由 Capacitor 自动安装到每个新的原生项目中（不包括任何[不兼容的插件](/plugins/cordova#已知不兼容的插件)）：

```json
"dependencies": {
    "@ionic-native/camera": "^5.3.0",
    "@ionic-native/core": "^5.3.0",
    "@ionic-native/file": "^5.3.0",
    "cordova-android": "8.0.0",
    "cordova-ios": "5.0.0",
    "cordova-plugin-camera": "4.0.3",
    "cordova-plugin-file": "6.0.1",
}
```

## 启动屏幕和图标

如果您之前创建了图标和启动屏幕图像，可以在项目的顶级 `resources` 文件夹中找到它们。有了这些图像后，您可以使用 `@capacitor/assets` 工具为基于 Capacitor 的 iOS 和 Android 项目生成图标和启动屏幕。

运行以下命令以重新生成图像并将它们复制到原生项目中：

```bash
npx @capacitor/assets generate --ios
npx @capacitor/assets generate --android
```

[完整详细信息在此](https://github.com/ionic-team/capacitor-assets)。

## 迁移插件

首先审核您现有的 Cordova 插件 - 您可能能够删除不再需要的插件。

接下来，查看 Capacitor 的所有[官方插件](/plugins/official.md)以及[社区插件](/plugins/community.md)。您可能能够切换到 Capacitor 等效的 Cordova 插件。

某些插件可能无法完全匹配功能，但根据您需要的功能，这可能并不重要。

请注意，任何[不兼容或导致构建问题](/plugins/cordova#已知不兼容的插件)的插件都会被自动跳过。

### 删除 Cordova 插件

用 Capacitor 插件替换 Cordova 插件后（或简单地将其完全删除），请卸载插件，然后运行 `sync` 命令以从原生项目中删除插件代码：

```bash
npm uninstall cordova-plugin-name
npx cap sync
```

## 设置权限

默认情况下，Capacitor 最新版本所需的全部初始权限已在 iOS 和 Android 的默认原生项目中为您设置。但是，您可能需要通过在 `plugin.xml` 和 iOS 及 Android 上的所需设置之间进行映射来手动应用其他权限。请参阅 [iOS](/main/ios/configuration.md) 和 [Android](/main/android/configuration.md) 配置指南，了解如何配置每个平台的信息。

## Cordova 插件首选项

当运行 `npx cap init` 时，Capacitor 会读取 `config.xml` 中的所有首选项，并将它们移植到 [Capacitor 配置文件](/main/reference/config.md)。您可以手动向 `cordova.preferences` 对象添加更多首选项。

```json
{
  "cordova": {
    "preferences": {
      "DisableDeploy": "true",
      "CameraUsesGeolocation": "true"
    }
  }
}
```

## `config.xml` 中的其他字段

您可能对 `config.xml` 中的其他元素在 Capacitor 应用程序中如何工作感到好奇。

Author 元素可以在 `package.json` 中配置，但 Capacitor 或您的应用程序中不使用它：

```xml
<author email="email@test.com" href="http://ionicframework.com/">Ionic Framework Team</author>
```

大多数 `allow-intent` 值要么不使用，要么有[可配置的替代方案](/main/basics/configuring-your-app.md)。

```xml
<allow-intent href="http://*/*" />
<allow-intent href="https://*/*" />
<allow-intent href="tel:*" />
<allow-intent href="sms:*" />
<allow-intent href="mailto:*" />
<allow-intent href="geo:*" />
```

iOS `edit-config` 元素需要在 [Info.plist 中配置](/main/ios/configuration.md)。

```xml
<edit-config file="*-Info.plist" mode="merge" target="NSCameraUsageDescription">
    <string>Used to take photos</string>
</edit-config>
```

不可能涵盖 `config.xml` 中可用的每个元素。但是，大多数与"如何在 Capacitor 中配置 X？"相关的问题都应该被视为"如何在 [平台]（iOS/Android）中配置 X？"在线搜索答案。

## 设置 Scheme

在 Ionic 中使用 Cordova 时，您的应用程序默认使用 `cordova-plugin-ionic-webview`，在 iOS 上使用 `ionic://` scheme 来提供内容。Capacitor 应用程序在 iOS 上使用 `capacitor://` 作为默认 scheme。这意味着使用与 origin 绑定的 Web API（如 LocalStorage）会导致数据丢失，因为 origin 不同。可以通过更改用于提供内容的 scheme 来解决此问题：

```json
{
  "server": {
    "iosScheme": "ionic"
  }
}
```

## 删除 Cordova

一旦您测试了所有迁移更改已应用并且应用程序运行良好，就可以从项目中删除 Cordova。删除 `config.xml` 以及 `platforms` 和 `plugins` 文件夹。请注意，您技术上不必删除 Cordova，因为 Capacitor 与它一起工作。事实上，如果您计划继续使用 Cordova 插件或认为将来可能使用，可以将 Cordova 资产保留在原处。

## 下一步

这只是您 Capacitor 之旅的开始。了解有关在 Capacitor 项目中[使用 Cordova 插件](/plugins/cordova.md)的更多信息，或有关 Capacitor [开发工作流程](/main/basics/workflow.md)的更多详细信息。
