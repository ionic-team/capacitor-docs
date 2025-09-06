---
title: 迁移策略
description: 迁移策略
contributors:
  - dotNetkow
slug: /cordova/migration-strategy
---

# 迁移策略

从 Cordova 迁移到 Capacitor 可以逐步进行，也可以在大多数情况下直接完全替换。所需工作量主要取决于应用的复杂程度。

## 为何要迁移？

为了长期的稳定性和安心使用。

Capacitor 由 [Ionic](https://ionicframework.com) 提供支持，Ionic 是 Cordova 及更广泛开源生态的长期贡献者。Ionic 仍然大量使用 Cordova，并将持续投入该平台的发展。

它向后兼容 Cordova，因此您可以随时将现有的 Web 应用轻松切换到 Capacitor。Capacitor 从一开始就设计为开箱即用地支持丰富的 Cordova 插件生态系统。因此，在 Capacitor 中使用 Cordova 插件非常方便。

## 为何要将 Ionic Framework 与 Capacitor 结合使用？

Capacitor 是 Ionic Framework 官方支持的原生运行时。将 Ionic 和 Capacitor 结合使用是打造卓越应用体验的最佳方式，因为 Ionic Framework 提供了 Capacitor 所不具备的 UI 和 UX 增强功能。此外，它还能与您喜爱的 Web 应用框架（包括 Angular、React 和 Vue）协同工作。

随着 Capacitor 的发布，Ionic 现在几乎控制了其整个技术栈。当您构建 Ionic 应用时，我们现在控制了原生运行时层（Capacitor）、UI 控件（[Ionic Framework](https://ionicframework.com)）以及用于构建控件的“框架”（由 [Stencil](https://stenciljs.com/) 驱动的 Web 组件）。这一点非常重要：如果我们技术栈的任何部分出现问题，我们可以立即修复。唯一不受我们控制的部分是您使用的上层前端框架（Angular、React、Vue 或纯 JavaScript）。

## 迁移流程概览

### 利用 Ionic VS Code 扩展

[Ionic VS Code 扩展](https://marketplace.visualstudio.com/items?itemName=ionic.ionic) 提供了工具，帮助您从 Cordova 迁移到 Capacitor，包括安装 Capacitor 的依赖项、替换等效插件等。这是一个有用的工具，可以自动化迁移到 Capacitor 的大部分过程。

### 审核并迁移现有的 Cordova 插件

首先审核您现有的 Cordova 插件。您可能会发现一些不再需要的插件可以移除。

接下来，查阅所有 Capacitor 的[官方插件](/plugins/official.md)以及[社区插件](/plugins/community.md)。您可能可以切换到与 Cordova 插件等效的 Capacitor 插件。

有些插件可能在功能上不完全匹配，但根据您需要的特性，这可能并不重要。

### 必要时继续使用 Cordova

要在 Capacitor 应用中使用 Cordova 插件，[请参见此处](/plugins/cordova.md)。如果没有替代插件，可以继续按原样使用 Cordova 插件。如果您希望某个插件得到支持，可以提交[插件提案](https://github.com/capacitor-community/proposals)！

准备好[迁移到 Capacitor](/main/cordova/migrating-from-cordova-to-capacitor.md) 了吗？