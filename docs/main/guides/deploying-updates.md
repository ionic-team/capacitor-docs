---
title: 部署与更新
description: 即使通过应用商店，也能实时远程更新您的 Capacitor 应用
contributors:
  - mlynch
slug: /guides/deploying-updates
---

# 应用部署与实时更新

应用开发的最后一公里包括将应用发布到应用商店，并随着时间的推移保持其更新。

Web Native 移动开发方法的一个关键优势是，只要更改不需要二进制更新（即编译的原生功能），就能够以应用商店友好的方式进行实时更新。

此外，由于大多数 Capacitor 开发者同时面向 iOS 和 Android（以及 Web），手动将应用和二进制更新发布到每个商店可能会变得不必要的繁琐。

为了简化应用商店发布和长期应用更新，Capacitor 背后的公司 Ionic 提供了一个强大的 Mobile DevOps 平台，名为 [Appflow](https://useappflow.com/)。

## 使用 Appflow 自动化应用商店发布

Appflow 为 Capacitor 开发者提供了几项主要的省时功能。其中最有趣的是能够直接发布到 Apple App Store 和 Google Play Store。所有计划都支持每月一定数量的部署，更高的计划提供扩展限制以支持更多应用，并能够完全自动化部署。

## 使用 Appflow 部署实时更新

结合应用商店发布功能，开发者可以使用 Appflow 的实时部署功能，在整个应用生命周期内部署实时应用更新。

实时部署的工作原理是，Capacitor 应用主要构建为具有原生功能钩子的 Web 应用。Apple 和 Google 明确允许对应用进行 Web 内容更新，因此此功能与应用商店兼容，并为移动应用团队提供了前所未有的灵活性。

## 连接 GitHub、Bitbucket 和 GitLab

Appflow 可以直接连接到 GitHub、Bitbucket 或 GitLab 仓库，以进行 git 触发的构建和部署。

这使得连接现有开发工作流程变得容易，从而开始添加自动化的应用商店和实时更新，而不会造成任何中断。

## 立即试用 Appflow

Appflow 为数亿用户的主要消费者和企业应用提供支持，并产生显著的商业影响。Appflow 团队与许多财富 500 强公司以及数千家中小型公司密切合作。

而且，由于 Appflow 背后的团队与 Capacitor 团队密切合作，Appflow 经过优化，能够与 Capacitor 最佳配合。

Appflow 可以免费开始使用，并使用您过去可能使用过的相同 Ionic 账户。要开始使用，请访问 [useappflow.com](https://useappflow.com/) 或浏览 [文档](https://ionicframework.com/docs/appflow) 以了解更多关于 Appflow 的工作原理。