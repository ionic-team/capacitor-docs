---
title: Frequently Asked Questions
description: 常见 Capacitor 问题
slug: /getting-started/faqs
sidebar_label: 常见问题
---

# 常见问题

以下是关于 Capacitor 的常见问题列表。如果这里没有找到答案，请查看[我们的论坛](https://forum.ionicframework.com)或[Discord 社区](https://ionic.link/discord)。也可以查看侧边栏中的常见问题列表 👉

## Capacitor 支持哪些平台？

Capacitor 能够通过官方及社区平台支持几乎所有设备。

### 官方平台

Capacitor 官方支持以下平台：
- iOS 14+
- Android 6+
  - 需要 Chrome WebView 60+
- 现代网页浏览器
  - Chrome
  - Firefox
  - Safari
  - Edge

### 社区平台

Capacitor 还提供面向跨平台桌面框架的社区平台。当前的社区目标平台包括：
- Electron
  - https://github.com/capacitor-community/electron

## 我必须配合 Ionic Framework 使用 Capacitor 吗？

不！完全不需要！Capacitor 可与**任何** Web 应用程序配合使用，不仅限于基于其他 Ionic 工具构建的应用。如果你希望为 Capacitor 应用定制特定的外观和感觉，而 Ionic Framework 不符合你的 UI 工具包需求，不必强制使用它。应用商店中有许多应用使用 Capacitor 但未采用 Ionic Framework。

## 在哪里可以找到适用于 Capacitor 项目的插件？

要查找项目所需的插件，建议按以下顺序查看这些资源：

### Capacitor 社区 GitHub ⚡

[Capacitor 社区 GitHub 组织](https://github.com/capacitor-community)列出了我们优秀开发者社区创建的插件。这些是专为 Capacitor 设计的插件，积极维护，并适用于任何 Capacitor 3+ 项目。如果你需要插件，这里应是首选之一。

### Awesome Capacitor 😎

与其他许多[Awesome 列表](https://github.com/sindresorhus/awesome)类似，[Awesome Capacitor](https://github.com/riderx/awesome-capacitor)是一个社区精选的优质 Capacitor 插件列表。如果找不到官方或社区插件，很可能有人已经在这里创建了你需要的插件。

### Project Fugu 🐡

[Project Fugu](https://www.chromium.org/teams/web-capabilities-fugu/)是 Chromium 团队跟踪已添加到 Chromium 浏览器的 Web API 的[追踪器](https://fugu-tracker.web.app/#shipped)。虽然某些功能可能不兼容 Android 和 iOS，但像[Web Share](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API)和[ContactsManager（仅限 Android）](https://developer.mozilla.org/en-US/docs/Web/API/ContactsManager)这样的功能，可能替代 `@capacitor/share` 或 `@capacitor-community/contacts` 来满足你的需求。

你可以使用[Can I Use...?](https://caniuse.com)来检查这些功能是否可以在 Android 和 iOS 上使用，而**无需**任何原生插件。

### Cordova 插件 🔌

你知道吗？Capacitor 支持 Cordova 插件。如果你正在从 Cordova 迁移，或者有一个没有等效 Capacitor 插件的 Cordova 插件，你可以直接在 Capacitor 中使用大多数 Cordova 插件。可以[阅读我们的指南](https://capacitorjs.com/docs/plugins/cordova)了解如何在 Capacitor 中使用 Cordova 插件。

## 没有 Mac 可以用 Capacitor 构建 iOS 应用吗？

简短回答：不行。更详细的解释是，虽然你可以使用像[Ionic AppFlow](https://ionic.io/appflow)这样的云服务，但你无法在设备或模拟器上测试应用。你应该始终确保使用物理设备测试应用，以保证 Capacitor 应用对苹果产品用户是可用的。

## 为什么在 Android 模拟器上运行时出现空白屏幕？

Capacitor 需要 Android 6 及以上版本，并且 WebView 版本需为 60 或更高。例如，如果你创建了一个 Android 6 或 7 的模拟器，可能不会安装最新版本的 WebView，导致出现空白屏幕。解决方法是安装一个较新的 Android 模拟器来测试你的应用。