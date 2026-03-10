---
title: 构建您的 UI
description: 用于构建出色的 Capacitor 移动应用程序的流行 UI 选项
slug: /getting-started/ui
---

# 构建您的 UI

Capacitor 应用程序的核心是网络应用程序。但要提供出色的原生质量移动应用程序体验，不仅仅是包装一个网站。

如今，团队的应用程序 UI 有多种选择。让我们探索一些最流行的选项。

## Ionic Framework

[Ionic Framework](https://ionicframework.com/)是一个以移动为中心的 UI 工具包和实用程序集，使使用 Capacitor 的网络开发者能够获得遵循平台约定的原生质量应用程序体验。Ionic Framework 由制作 Capacitor 的同一家公司创建，并专门考虑了 Capacitor。

今天，Ionic Framework 是我们推荐的 Capacitor UI 框架，因为我们相信它将帮助团队实现最高质量的原始应用程序体验。但是，_不_需要在您的 Capacitor 应用程序中使用它。

Ionic Framework 带有原生质量的转换和路由，适用于 [Angular](https://ionicframework.com/docs/angular/navigation)、[React](https://ionicframework.com/docs/react/navigation)和 [Vue](https://ionicframework.com/docs/vue/navigation)，并深入集成到每个框架中最流行的路由解决方案中。此外，Ionic 还带有强大的组件，如[模态框](https://ionicframework.com/docs/api/modal)、[菜单](https://ionicframework.com/docs/api/menu)、[列表](https://ionicframework.com/docs/api/list)，以及强大的项目功能，如[滑动项目](https://ionicframework.com/docs/api/item-sliding)、[表单输入](https://ionicframework.com/docs/api/input)、[日期时间选择器](https://ionicframework.com/docs/api/datetime)、[卡片](https://ionicframework.com/docs/api/card)、[标签](https://ionicframework.com/docs/api/tabs)、[iOS 风格的压缩标题](https://ionicframework.com/docs/api/header#condensed-header)以及[更多](https://ionicframework.com/docs/components)。

Ionic Framework 需要 Angular、React 或 Vue，因此只适合使用这些技术的团队。

要开始使用，请查看[将 Capacitor 与 Ionic 一起使用](./with-ionic)文档以了解更多信息。

## Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/)是一个流行的 CSS 框架，配有配套的 UI 模板库，许多 Capacitor 开发者用它来构建出色的应用程序体验。我们要喜欢的一些示例包括[Reflect](https://reflect.app/)和[LogSnag](https://twitter.com/ImSh4yy/status/1615080429417103366?s=20&t=bmVrAb9PNFY6AQPNXwMFYA)。

还有一些有趣的专注于 Tailwind 的移动 UI 框架，例如[Konsta UI](https://konstaui.com/)。

使用 Tailwind 时，重要的是要记住，Tailwind 不提供移动风格的导航和路由原语，因此团队需要小心地构建适合平台约定的 UX。一种方法是将 Tailwind 与 Ionic Framework 混合使用，如本[Next.js + Tailwind + Ionic Framework + Capacitor 模板](https://github.com/mlynch/nextjs-tailwind-ionic-capacitor-starter)所示。另一种方法是设计避免传统的前进/后退导航，而是使用标签或模态的 UX。最后，如果需要，团队可以自由构建自定义导航和路由体验。

## Framework7

[Framework7](https://framework7.io/)是一个流行的以移动为中心的 UI 库，由[Swiper](https://swiperjs.com/)的开发者创建，Swiper 是一个强大的移动触摸滑块库。

## Quasar

[Quasar](https://quasar.dev/)是一个 Vue.js 框架，具有以移动为中心的组件和[对 Capacitor 的官方支持](https://quasar.dev/quasar-cli-vite/developing-capacitor-apps/introduction#introduction)。

## Material UI

[Material UI](https://mui.com/)是一个流行的专注于 React 的库，实现了 Material Design 指南。

## 自行构建

如果您已经有现有的 UI 工具包或想要实现自己的 UI 工具包，我们建议您查看 Ionic Framework 和此处介绍的其他选项以获取灵感。Capacitor 提供了一个空白画板来构建您的梦想，但如果您选择自己构建 UI，您有责任构建用户期望的出色体验。在构建应用程序的同时做到这一点可能具有挑战性，因此我们通常只建议非常高级的团队或已经过移动优化的网络应用程序这样做。
