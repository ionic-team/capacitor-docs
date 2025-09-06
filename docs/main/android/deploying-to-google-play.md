---
title: 部署到 Google Play
description: 如何将 Capacitor Android 应用部署至 Google Play 商店
contributors:
  - mlynch
slug: /android/deploying-to-google-play
---

# 将 Capacitor Android 应用部署至 Google Play 商店

由于 Capacitor 应用本质上就是标准的原生应用，因此其部署到 Google Play 商店的方式与任何其他原生 Android 应用完全相同。

首先，请查阅官方 Google 文档中的 [发布清单](https://developer.android.com/distribute/best-practices/launch/launch-checklist) 来为应用提交做好准备。有关为应用生成启动画面和图标的详细信息，请 [参见此处](/main/guides/splash-screens-and-icons.md)。

若需包含 Capacitor 相关注意事项的指南，可参考 [Josh Morony 的优秀指南](https://www.joshmorony.com/deploying-capacitor-applications-to-android-development-distribution/)。

## 自动化部署

对于希望简化 Google Play 商店（及 Apple App Store）提交流程，甚至通过集成到 CI/CD 工作流实现自动化的团队，Capacitor 的母公司 Ionic 提供了一项强大的移动开发运维服务——[Appflow](https://useappflow.com/)，该服务提供端到端的应用开发和部署能力。

感兴趣吗？查看这篇 [简要指南](/main/guides/deploying-updates.md) 了解其工作原理及如何在 Capacitor 中使用，或参阅官方 [Appflow 文档](https://ionicframework.com/docs/appflow/)。