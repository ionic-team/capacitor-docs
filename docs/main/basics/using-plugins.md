---
title: 使用插件
description: 如何在 Capacitor 中使用插件
slug: /basics/using-plugins
---

# 使用插件

WebView 和 Capacitor 运行时通过 **Capacitor 插件**进行通信。插件为您的 Web 应用提供对原生 API（如相机、地理位置和文件系统访问）的调用能力。

## Capacitor 插件

Capacitor 团队维护着[一套官方 Capacitor 插件](/plugins/official.md)，用于访问常用 API。此外，[Capacitor 社区](https://github.com/capacitor-community/)也提供了大量插件资源。如果您有插件需求建议，可以使用[社区提案仓库](https://github.com/capacitor-community/proposals/)。

[深入了解 Capacitor 插件 &#8250;](/plugins.mdx)

:::info
想要**开发** Capacitor 插件？浏览同一个提案仓库，并尝试[按照我们的插件创建指南](/plugins/creating-plugins/overview.md)进行开发！
:::

## Cordova 插件

找不到适合您项目的 Web API 或 Capacitor 插件？或者您正在[从 Cordova 迁移到 Capacitor](/main/cordova/migration-strategy.md)？Capacitor 提供了 Cordova 兼容层，可模拟 Cordova 插件功能。虽然兼容大多数 Cordova 插件，但在安装时可能需要额外步骤。

[了解在 Capacitor 应用中使用 Cordova 插件的更多信息 &#8250;](/plugins/cordova.md)

:::info
如果您因找不到合适的 Capacitor 插件而使用 Cordova 插件，是否愿意[为 Capacitor 社区创建提案](https://github.com/capacitor-community/proposals/)？
:::