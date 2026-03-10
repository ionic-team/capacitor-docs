---
title: 迁移策略
description: 迁移策略
contributors:
  - dotNetkow
slug: /cordova/migration-strategy
---

# 迁移策略

从 Cordova 迁移到 Capacitor 可以随着时间的推移进行，或者在许多情况下可以完全替换。所涉及的工作量将在很大程度上取决于应用程序的复杂性。

## 为什么要迁移？

长期的稳定性和安心。

Capacitor 由 [Ionic 支持](https://ionicframework.com/)，Ionic 是 Cordova 和更大的开源生态系统的长期贡献者。Ionic 仍然大量使用 Cordova，并将在很长一段时间内继续投资于该平台。

它与 Cordova 向后兼容，因此您可以随时轻松地将现有的 Web 应用程序切换到它。Capacitor 从一开始就被设计为开箱即用地支持丰富的 Cordova 插件生态系统。因此，在 Capacitor 中使用 Cordova 插件很容易。

## 为什么要将 Ionic Framework 与 Capacitor 一起使用？

Capacitor 是 Ionic Framework 的官方支持的原生运行时。将 Ionic 和 Capacitor 一起使用是构建出色应用程序体验的最佳方式，因为 Ionic Framework 提供了 Capacitor 没有的 UI 和 UX 增强。此外，它适用于您喜欢的 Web 应用程序框架，包括 Angular、React 和 Vue。

随着 Capacitor 的发布，Ionic 现在控制着其几乎所有的技术栈。当您今天构建 Ionic 应用程序时，我们现在控制原生运行时层（Capacitor）、UI 控件（[Ionic Framework](https://ionicframework.com)）和用于构建控件的"框架"（由 [Stencil](https://stenciljs.com/) 支持的 Web 组件）。这非常重要：如果我们控制的堆栈的任何部分出现问题，我们可以立即修复它。我们唯一不控制的部分是您在顶部使用的前端框架（Angular、React、Vue 或纯 JavaScript）。

## 迁移过程概述

### 利用 Ionic VS Code 扩展

[Ionic VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=ionic.ionic)提供了帮助您从 Cordova 迁移到 Capacitor 的工具，包括安装 Capacitor 的依赖项、替换等效的插件等。这是一个有用的工具，可以自动完成迁移到 Capacitor 的大部分过程。

### 审核然后迁移现有的 Cordova 插件

首先审核您现有的 Cordova 插件。您可能能够删除不再需要的插件。

接下来，查看 Capacitor 的所有[官方插件](/plugins/official.md)以及[社区插件](/plugins/community.md)。您可能能够切换到 Capacitor 等效的 Cordova 插件。

某些插件可能无法完全匹配功能，但根据您需要的功能，这可能并不重要。

### 根据需要继续使用 Cordova

要在您的 Capacitor 应用程序中利用 Cordova 插件，[请参阅此处](/plugins/cordova.md)。如果不存在替换插件，请继续按原样使用 Cordova 插件。如果您希望看到支持某个插件，请打开[插件提案](https://github.com/capacitor-community/proposals)！

准备好[迁移到 Capacitor](/main/cordova/migrating-from-cordova-to-capacitor.md)了吗？
