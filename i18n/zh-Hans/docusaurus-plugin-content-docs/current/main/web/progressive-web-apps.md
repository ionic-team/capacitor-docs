---
title: 构建渐进式 Web 应用
description: 如何使用 Capacitor 构建渐进式 Web 应用
contributors:
  - jcesarmobile
  - dotNetkow
slug: /web/progressive-web-apps
---

# 构建渐进式 Web 应用

Capacitor 对渐进式 Web 应用提供一流的支持,使您可以轻松构建在 iOS 和 Android 上原生运行,同时在 Web 上作为移动 Web 应用或"渐进式 Web 应用"运行的应用。

## 什么是渐进式 Web 应用?

简而言之,渐进式 Web 应用 (PWA) 是一种使用现代 Web 功能为用户提供类似应用体验的 Web 应用。这些应用部署在传统 Web 服务器上,可通过 URL 访问,并可被搜索引擎索引。

就所有实际用途而言,渐进式 Web 应用只是针对移动性能进行了优化并利用新可用的 Web API 提供类似传统原生应用功能(如推送通知和离线存储)的网站的另一种说法。

## Capacitor 和渐进式 Web 应用

Capacitor 对渐进式 Web 应用和原生应用都提供一流的支持。这意味着 Capacitor 的桥接支持在原生上下文或 Web 中运行,许多插件在两种上下文中都可用,具有完全相同的 API 和调用约定。

这意味着您可以将 `@capacitor/core` 和 Capacitor 插件作为原生应用和渐进式 Web 应用的依赖项,Capacitor 会根据需要在 Web 代码和原生代码之间无缝调用。

此外,Capacitor 还提供了许多实用程序来查询当前平台,以便在原生或 Web 上运行时提供定制体验。

## 为应用添加渐进式 Web 应用支持

渐进式 Web 应用应具有应用清单和服务工作器。

### 应用清单

首先,您需要一个[应用清单](https://developer.mozilla.org/en-US/docs/Web/Manifest)文件 ([manifest.json](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json)),该文件与您的 `index.html` 文件放在一起,并提供有关应用的元数据,如其名称、主题颜色和图标。例如,当您的应用安装到主屏幕时,将使用此信息。

### 服务工作器

接下来,为了发送推送通知和离线存储数据,[服务工作器](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)将使您的 Web 应用能够代理网络请求并执行处理和同步数据所需的后台任务。

服务工作器功能强大但很复杂。通常不建议从头开始编写它们。相反,请查看 [Workbox](https://developers.google.com/web/tools/workbox/) 等工具,它们提供常见的服务工作器配方,您可以轻松地将其集成到您的应用中。

在 MDN 的[使用服务工作器](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)页面上了解更多关于使用服务工作器的信息,包括如何注册它们。

## 渐进式 Web 应用性能

渐进式 Web 应用通过多个性能标准进行评估,包括[可交互时间](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive)和[首次有效绘制](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint)。

在上线之前,请遵循[渐进式 Web 应用清单](https://developers.google.com/web/progressive-web-apps/checklist),并使用 [Lighthouse](https://developers.google.com/web/tools/lighthouse/)来审计和测试您的应用。

如果您在现有前端堆栈上难以满足渐进式 Web 应用性能标准,请考虑使用 [Ionic Framework](http://ionicframework.com/) 作为几乎零配置即可获得快速 PWA 支持的选项。
