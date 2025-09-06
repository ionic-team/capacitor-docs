---
title: CI/CD
description: 将移动端 CI/CD 集成到您的 Capacitor 应用开发流程中
contributors:
  - mlynch
slug: /guides/ci-cd
---

# Capacitor 应用的 CI/CD 流程

任何成熟的应用都会采用 CI/CD（持续集成/持续交付）流程来进行持续测试、集成和交付。

但移动端开发在 CI/CD 方面面临着独特挑战，前端开发者常用的 Web 端 CI/CD 技术无法直接应用于移动端，因为两者的构建和部署流程存在根本性差异。

## 前端基础 CI/CD

Capacitor 应用 CI/CD 的第一步是针对您的 _前端_ JavaScript 应用建立构建和测试流程。

目前通常使用通用 CI/CD 服务来实现，例如 GitHub Actions、CircleCI、Jenkins 等。

在此流程中，应用会在每次提交时触发构建，并经常运行本地测试套件。这是典型的 JavaScript CI/CD 流程，您的团队可能已经熟悉这套机制。

但这只是冰山一角，团队还需要解决如何构建、测试和部署实际的原生移动应用端。

## 集成移动端 CI/CD

对于移动应用而言，仅构建和运行 JavaScript 应用测试是远远不够的，因为应用的重要部分需要作为原生 iOS 和 Android 应用进行构建和运行。

此外，移动应用的部署和更新方式与 Web 应用截然不同。Web 应用托管在可快速更新的服务器上，而移动应用则"托管"在应用商店中，并以加密签名的二进制文件形式分发。更新流程也大相径庭。

这意味着我们需要一种能够执行原生移动构建和测试的服务，同时提供符合移动端特性的应用部署和更新方式。

## Appflow：专为 Capacitor 应用打造的移动 CI/CD

[Appflow](https://ionic.io/appflow) 就是这样一种提供端到端移动 CI/CD 的服务，它是官方为 Capacitor 应用推出的移动 CI/CD 和移动 DevOps 平台。

Appflow 提供频繁更新的托管式 iOS 和 Android 构建环境。该平台与主流 git 服务（如 Azure DevOps、GitLab、GitHub 和 Bitbucket）集成，支持在每次提交时触发 JavaScript 和原生移动构建。Appflow 还支持将构建按渠道分离，分别面向利益相关者、测试用户和生产用户。此外，Appflow 能作为自动化工作流的一部分，自动将应用提交到应用商店，让团队无需再管理复杂的原生 iOS 和 Android 构建环境。

对于 Capacitor 开发者，Appflow 还具备实时推送应用更新的能力——只要更新仅涉及应用的 JS/HTML/CSS 层面，就无需经过应用商店审核。

更多详细信息，请参阅 [Appflow 文档](https://ionicframework.com/docs/appflow)。

## 将传统 CI/CD 服务与 Appflow 结合使用

虽然 Appflow 可以替代传统 CI/CD 服务（因为它同时处理 Web/JS 构建和原生移动构建），但它也能与传统 CI/CD 服务完美协作。

要实现这种协作模式，可以通过 webhook 在每次提交时将构建产物发送至 Appflow。

## 其他移动 CI/CD 方案

市场上有其他移动 CI/CD 服务，但尚无专注于 Capacitor 的解决方案。无论您偏好哪种 CI/CD 服务，Capacitor 都能与之集成，因为 Capacitor 应用本质上是原生应用。不过，针对 Capacitor 应用的远程实时更新功能，目前仅有 [Appflow](https://ionic.io/appflow) 提供该特性。