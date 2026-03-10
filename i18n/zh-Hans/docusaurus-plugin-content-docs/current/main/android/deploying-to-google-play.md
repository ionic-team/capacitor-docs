---
title: 部署到 Google Play
description: 如何将 Android Capacitor 应用部署到 Google Play 商店
contributors:
  - mlynch
slug: /android/deploying-to-google-play
---

# 将 Capacitor Android 应用部署到 Google Play 商店

由于 Capacitor 应用本质上是普通的原生应用，因此它们部署到 Google Play 商店的方式与任何其他原生 Android 应用完全相同。

首先，请查阅官方 Google 文档中的[发布检查清单](https://developer.android.com/distribute/best-practices/launch/launch-checklist)以准备好您的应用提交。[请参阅此处](/main/guides/splash-screens-and-icons.md)了解为应用生成启动屏幕和图标的详细信息。

有关一些 Capacitor 特定注意事项的指南，请参阅 [Josh Morony 的精彩指南](https://www.joshmorony.com/deploying-capacitor-applications-to-android-development-distribution/)。

## 自动化部署

对于希望简化其 Google Play 商店（和 Apple App Store）提交流程，甚至通过与 CI/CD 工作流集成来自动化的团队，Capacitor 的母公司 Ionic 提供了一个强大的移动 DevOps 服务，称为 [Appflow](https://useappflow.com/)，它提供端到端的应用开发和部署功能。

感兴趣吗？查看这个[简短指南](/main/guides/deploying-updates.md)，了解它的工作原理以及您现在如何将它与 Capacitor 一起使用，或查看官方 [Appflow 文档](https://ionicframework.com/docs/appflow/)。
