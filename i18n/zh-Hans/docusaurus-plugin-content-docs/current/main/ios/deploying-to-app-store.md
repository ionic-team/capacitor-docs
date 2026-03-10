---
title: 部署到 App Store
description: 如何将 iOS Capacitor 应用部署到 Apple App Store
contributors:
  - mlynch
slug: /ios/deploying-to-app-store
---

# 将您的 Capacitor iOS 应用部署到 App Store

因为 Capacitor 应用本质上就是普通的原生应用，所以它们部署到 App Store 的方式就像任何其他原生应用一样。

首先，请参阅 Apple 官方文档关于 [向 App Store 提交应用](https://developer.apple.com/app-store/submissions/) 的说明。有关为您的应用生成启动屏幕和图标的详细信息，请[参阅此处](/main/guides/splash-screens-and-icons.md)。

有关一些 Capacitor 特定注意事项的指南，请参阅 [Josh Morony 的精彩指南](https://www.joshmorony.com/deploying-capacitor-applications-to-ios-development-distribution/)。

## 自动化部署

对于希望简化 App Store（和 Google Play Store）提交流程甚至通过集成到 CI/CD 工作流中自动化的团队，Capacitor 的母公司 Ionic 提供了一个名为 [Appflow](https://useappflow.com/) 的强大移动 DevOps 服务，提供端到端的应用开发和部署能力。

感兴趣？查看此[简要指南](/main/guides/deploying-updates.md)，了解它的工作原理以及您今天如何将它与 Capacitor 一起使用，或查看官方 [Appflow 文档](https://ionicframework.com/docs/appflow/)。
