---
title: 常见问题
description: Capacitor 常见问题
slug: /getting-started/faqs
sidebar_label: 常见问题
---

# 常见问题

以下是 Capacitor 的常见问题列表。如果您在这里找不到答案，请查看[我们的论坛](https://forum.ionicframework.com)或[我们的 Discord](https://ionic.link/discord)。查看侧边栏以获取常见问题列表 👉

## Capacitor 支持哪些平台？

Capacitor 可以通过我们的官方和社区平台几乎定位到任何设备。

### 官方平台

Capacitor 官方支持以下平台：
- iOS 15+
- Android 7+
  - 需要 Chrome WebView 60+
- 现代网络浏览器
  - Chrome
  - Firefox
  - Safari
  - Edge

### 社区平台

Capacitor 还有用于定位跨平台桌面框架的社区平台。当前的社区目标如下：
- Electron
  - https://github.com/capacitor-community/electron

## 我需要在 Capacitor 中使用 Ionic Framework 吗？

不需要！您不需要！Capacitor 可以与**任何**网络应用程序一起使用，而不仅仅是使用其他 Ionic 工具构建的应用程序。如果您希望 Capacitor 应用程序具有特定的外观和感觉，而 Ionic Framework 不是适合您的 UI 工具包，您不应该感到被迫使用它。两个应用商店中有很多应用程序使用 Capacitor 而不是 Ionic Framework。

## 在哪里可以找到我的 Capacitor 项目的插件？

要为您的项目寻找插件，您应该按顺序检查以下位置。

### Capacitor 社区 GitHub ⚡

[Capacitor 社区 GitHub 组织](https://github.com/capacitor-community)列出了我们优秀的开发者社区创建的插件。它们是 Capacitor 优先的插件，积极开发，应该可以在任何 Capacitor 3+ 项目中工作。如果您需要插件，这应该是您首先查看的地方之一。

### Awesome Capacitor 😎

像许多其他[Awesome 列表](https://github.com/sindresorhus/awesome)一样，[Awesome Capacitor](https://github.com/riderx/awesome-capacitor)是社区策划的出色 Capacitor 插件列表。如果您找不到官方或社区插件，很可能有人已经在这里制作了您正在寻找的插件。

### Project Fugu 🐡

[Project Fugu](https://www.chromium.org/teams/web-capabilities-fugu/)是 Chromium 团队已添加到 Chromium 浏览器的[Web API 跟踪器](https://fugu-tracker.web.app/#shipped)。虽然某些功能可能无法在 Android 和 iOS 上都支持，但诸如[Web Share](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API)和[ContactsManager（仅限 Android）](https://developer.mozilla.org/en-US/docs/Web/API/ContactsManager)之类的功能可能会取代您的用例的 `@capacitor/share` 或 `@capacitor-community/contacts`。

您可以使用[Can I Use...?](https://caniuse.com)来检查您是否可以在 Android 和 iOS 上使用这些功能，而_不需要_任何原生插件。

### Cordova 插件 🔌

您知道 Capacitor 支持 Cordova 插件吗？如果您正在从 Cordova 迁移，或者有一个没有 Capacitor 等效项的 Cordova 插件，您可以直接在 Capacitor 中使用大多数 Cordova 插件。您可以[阅读我们的指南](https://capacitorjs.com/docs/plugins/cordova)，了解如何在 Capacitor 中使用 Cordova 插件。

## 我可以在没有 Mac 的情况下使用 Capacitor 构建 iOS 应用程序吗？

简短的回答是：不。更长的答案是，虽然您可以使用云服务（如[Ionic AppFlow](https://ionic.io/appflow)），但您将无法在设备或模拟器上测试您的应用程序。您应该始终确保使用物理设备测试您的应用程序，以确保您的 Capacitor 应用程序对使用 Apple 产品的人可用。

## 为什么在 Android 模拟器上运行时会出现空白屏幕？

Capacitor 需要 Android 7 以及 WebView 版本 60 或更高版本。例如，如果您创建 Android 7 模拟器，则不会安装最新版本的 WebView，并且您会得到空白的白屏。为了解决这个问题，您可以安装更新的 Android 模拟器来测试您的应用程序。
