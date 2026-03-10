---
title: 概述
description: Cordova 和 PhoneGap
slug: /cordova
---

# Cordova 和 PhoneGap

Apache Cordova（以及 Adobe PhoneGap）创建于 2008 年，是一个开源项目，使 Web 开发人员能够使用他们的 HTML、CSS 和 JavaScript 内容为各种移动和桌面平台创建原生应用程序。

有关 Cordova 历史及其工作原理的更多详细信息，[请参阅此处](https://ionicframework.com/resources/articles/what-is-apache-cordova)。

## 为什么要创建 Capacitor？

开源领域充满了建立在旧项目思想之上的新项目，这些项目做出了切实的改进，而这些改进在不彻底改变原始产品的情况下是无法实现的。出于技术和政治原因，Ionic 团队不想试图将这些彻底的改变强加到 Cordova 中。

Capacitor 项目的一个好处是，Ionic 团队对技术栈有更多的控制权。当您使用 Ionic Framework 和 Capacitor 构建应用程序时，Ionic 团队是原生运行时层、UI 组件和创建组件的工具链（[Stencil](https://stenciljs.com/)）的维护者。这非常重要，因为 Ionic 团队可以更快地修复问题，并提供更加连贯的技术栈。

## Capacitor 和 Cordova 之间的区别

从本质上讲，Capacitor 和 Cordova 非常相似。两者都管理 Web View，并提供了一种结构化的方式向您的 Web 代码暴露原生功能。然而，Capacitor 有一些关键区别，需要以前习惯于 Cordova 方式的 Web 开发人员改变应用程序开发工作流程。

### 原生项目管理

Capacitor 将每个平台项目视为_源代码资产_而不是_构建时资产_。这意味着您将把 Xcode 和 Android Studio 项目提交到源代码控制中，并在必要时使用这些 IDE 进行平台特定的配置和构建/测试。

这种方法的变化有几个影响。首先，Capacitor 不使用 `config.xml` 或类似的自定义配置来设置平台。相反，配置更改是通过直接编辑适当的平台特定配置文件来完成的，例如 Android 的 `AndroidManifest.xml` 和 iOS 的 `Info.plist`。Capacitor 确实有一些[高级配置选项](/main/basics/configuring-your-app.md)。这些通常不会修改原生功能，而是控制 Capacitor 的工具。

此外，Capacitor 不提供在命令行上构建原生应用程序的方法。应该使用平台特定的工具（或在 IDE 中），这样可以提供更快、更典型的体验，并遵循该平台应用程序开发的标准。

虽然这些差异可能会让长期使用 Cordova 的用户感到担忧，但有一些值得的好处：

1. 通过诸如 `config.xml` 之类的抽象工具来更新和修改原生项目容易出错，并且是一个不断变化的目标。更加熟悉平台特定的工具会使故障排除变得更加容易。
2. 更容易为您的应用程序添加所需的自定义原生代码，而无需在应用程序代码库之外构建专用插件。此外，原生团队可以与 Web 团队在同一个项目上并肩工作。
3. 创建更具吸引力的应用程序体验现在变得更容易，因为您"拥有"原生项目，例如在 Web 应用程序周围添加原生 UI 外壳。
4. 更好地了解原生项目更改，并随着新移动操作系统版本的发布提高应用程序可维护性。当引入 Capacitor 的重大更改或对原生项目模板应用更改时，团队将发布逐步升级说明，以确保更新过程尽可能顺利。

### 插件管理

Capacitor 以与 Cordova 不同的方式管理插件。首先，Capacitor 不会在构建之前将插件源代码复制到您的应用程序中。相反，所有插件都构建为"框架"（在 iOS 上）和"库"（在 Android 上），并使用每个平台的主要依赖管理工具（分别是 CocoaPods 和 Gradle）进行安装。此外，Capacitor 不会修改原生源代码，因此任何必要的原生项目设置都必须手动添加（例如，`AndroidManifest.xml` 中的权限）。我们认为这种方法更不容易出错，并且使开发人员更容易在每个特定平台的社区中找到帮助。

一个主要区别是插件处理它们需要从 WebView 执行的 JavaScript 代码的方式。Cordova 要求插件提供自己的 JavaScript 并手动调用 `exec()`。相比之下，Capacitor 根据运行时检测到的原生方法注册和导出每个插件的所有 JavaScript，因此所有插件方法在 WebView 加载时就立即可用。这意味着一个重要的含义：不再需要 `deviceready` 事件。应用程序代码加载后，您就可以开始调用插件方法。

虽然 Capacitor 不要求插件为 iOS 或 Android 提供 JavaScript，但插件在 JavaScript 中具有共享逻辑是很常见的，这也很容易实现。

最后，Capacitor 对插件作者有影响。在 iOS 上，Swift 5 得到官方支持，甚至是构建插件的_首选_（也支持 Objective-C）。插件不再导出 `Plugin.xml` 文件；Capacitor 在 iOS 上提供了一些简单的宏，在 Android 上提供了一些注解，用于向插件源代码添加元数据，Capacitor 在运行时读取这些元数据。

### CLI/版本管理

与 Cordova 不同，Capacitor 不使用全局 CLI。相反，Capacitor CLI 作为 npm 脚本在本地安装到每个项目中。这使得在许多不同的应用程序中管理 Capacitor 版本变得更容易。

因此，Capacitor 不是直接从命令行运行，而是通过在应用程序目录中调用 `npx cap` 来调用。

[了解有关 Capacitor CLI 的更多信息 &#8250;](/cli/index.md)

## 开始迁移

了解有关[迁移过程](/main/cordova/migration-strategy.md)的更多信息，或立即[开始迁移](/main/cordova/migrating-from-cordova-to-capacitor.md)。
