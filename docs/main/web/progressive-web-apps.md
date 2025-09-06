---
title: 构建渐进式Web应用
description: 如何使用Capacitor构建渐进式Web应用
contributors:
  - jcesarmobile
  - dotNetkow
slug: /web/progressive-web-apps
---

# 构建渐进式Web应用

Capacitor为渐进式Web应用（PWA）提供一流支持，让您能够轻松构建既可在iOS和Android上原生运行，又能在网页端作为移动Web应用或"渐进式Web应用"运行的应用程序。

## 什么是渐进式Web应用？

简而言之，渐进式Web应用（PWA）是一种利用现代Web技术为用户提供类应用体验的Web应用。这些应用部署在传统Web服务器上，可通过URL访问，并能被搜索引擎索引。

实际上，渐进式Web应用就是对移动性能进行优化，并利用新兴Web API提供类似传统原生应用功能（如推送通知和离线存储）的网站的另一种称呼。

## Capacitor与渐进式Web应用

Capacitor对渐进式Web应用和原生应用都提供一流支持。这意味着Capacitor桥接器既能在原生环境中运行，也能在Web环境中运行，许多插件在两种环境中都可用，且具有完全相同的API和调用约定。

这意味着您可以为原生应用和渐进式Web应用同时使用`@capacitor/core`和Capacitor插件作为依赖项，而Capacitor会在需要时无缝调用Web代码，在可用时调用原生代码。

此外，Capacitor还提供了多种实用工具来查询当前平台，以便在原生环境或Web环境中运行时提供定制化体验。

## 为应用添加渐进式Web应用支持

渐进式Web应用应具备应用清单（App Manifest）和服务工作者（Service Worker）。

### 应用清单

首先，您需要一个[应用清单](https://developer.mozilla.org/en-US/docs/Web/Manifest)文件（[manifest.json](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json)），该文件与您的`index.html`文件位于同一目录，提供应用的元数据，如名称、主题颜色和图标。这些信息将在应用安装到主屏幕时使用。

### 服务工作者

其次，为了发送推送通知和离线存储数据，需要使用[服务工作者](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)来让您的Web应用能够代理网络请求，并执行处理和同步数据所需的后台任务。

服务工作者功能强大但复杂。通常不建议从头开始编写。相反，可以查看像[Workbox](https://developers.google.com/web/tools/workbox/)这样的工具，它们提供了常见的服务工作者方案，您可以轻松地将其集成到应用中。

在MDN的[使用服务工作者](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)页面上阅读更多关于使用服务工作者的信息，包括如何注册它们。

## 渐进式Web应用性能

渐进式Web应用根据多个性能标准进行评估，包括[可交互时间](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive)和[首次有效绘制](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint)。

在上线前遵循[渐进式Web应用检查清单](https://developers.google.com/web/progressive-web-apps/checklist)，并使用[Lighthouse](https://developers.google.com/web/tools/lighthouse/)来审核和测试您的应用。

如果您在使用现有前端技术栈时难以满足渐进式Web应用的性能标准，可以考虑使用[Ionic Framework](http://ionicframework.com/)，它能够以几乎零配置的方式提供快速的PWA支持。