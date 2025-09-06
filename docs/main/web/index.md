---
title: Capacitor Web 文档
description: Web 入门指南
sidebar_label: 入门指南
slug: /web
contributors:
  - mlynch
---

# 在 Web 项目中使用 Capacitor

Capacitor 完全支持传统 Web 和渐进式 Web 应用（PWA）。实际上，使用 Capacitor 可以轻松地将 iOS 和 Android 应用商店应用的 PWA 版本以最小的工作量发布。

## 浏览器支持

Capacitor 核心和插件构建目标为 ES2017。这种较新的 JavaScript 语法在所有现代浏览器中（包括 iOS 和 Android 上支持 PWA 的浏览器）都受支持，但在 IE11 中需要额外的 JavaScript 转换才能工作，例如使用 [Babel](https://babeljs.io)。

支持 Web 的插件会执行功能检测，如果浏览器不支持特定的 Web API，则会抛出异常。

## 安装

如果您已经在为 iOS 或 Android 使用 Capacitor 构建应用，无需额外的安装步骤！

否则，请先查看 [安装指南](/main/getting-started/installation.md) 再继续。

### 将 Capacitor 作为模块使用

大多数情况下，应用会使用带有支持导入 JavaScript 模块的构建系统的框架。通过从 `@capacitor/core` 导入，或导入插件，Capacitor JavaScript 运行时将随您的应用一起加载。

### 将 Capacitor 作为脚本包含使用

此选项不再可用，请使用 JavaScript 模块打包工具。

## 上线发布

当您准备好发布渐进式 Web 应用并与世界分享时，只需上传您的 Web 资源目录的内容即可。

那将包含运行您的应用所需的一切！