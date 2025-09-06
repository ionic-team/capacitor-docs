---
title: 部署到 App Store
description: 如何将 iOS Capacitor 应用部署到苹果 App Store
contributors:
  - mlynch
slug: /ios/deploying-to-app-store
---

# 将你的 Capacitor iOS 应用部署到 App Store

由于 Capacitor 应用本质上是标准的原生应用，因此其部署到 App Store 的方式与其他原生应用完全相同。

首先，请参考苹果官方关于[提交应用到 App Store](https://developer.apple.com/app-store/submissions/) 的文档。关于为你的应用生成启动画面和图标的详细信息，[请参阅此处](/main/guides/splash-screens-and-icons.md)。

如需了解针对 Capacitor 特定需求的指南，请参考 [Josh Morony 的优秀指南](https://www.joshmorony.com/deploying-capacitor-applications-to-ios-development-distribution/)。

## 自动化部署

对于希望简化 App Store（以及 Google Play Store）提交流程，甚至将其与 CI/CD 工作流集成以实现自动化的团队，Capacitor 的母公司 Ionic 提供了一个强大的移动开发运维服务 [Appflow](https://useappflow.com/)，该服务提供端到端的应用开发和部署能力。

感兴趣吗？查看这篇[简要指南](/main/guides/deploying-updates.md)了解其工作原理以及如何立即与 Capacitor 配合使用，或查阅官方 [Appflow 文档](https://ionicframework.com/docs/appflow/)。