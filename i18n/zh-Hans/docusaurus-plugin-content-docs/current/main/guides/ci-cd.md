---
title: CI/CD
description: 在您的 Capacitor 应用开发流程中添加移动 CI/CD
contributors:
  - mlynch
slug: /guides/ci-cd
---

# Capacitor 应用的 CI/CD

每个严肃的应用都会使用 CI/CD 流程进行持续测试、集成和交付。

不幸的是，移动端带来了独特的 CI/CD 挑战，Web 开发人员用于前端 CI/CD 的相同技术不适用于移动端，因为构建和部署流程完全不同。

## 前端的基本 CI/CD

Capacitor 应用的 CI/CD 的第一步是使用构建和测试您的 _前端_ JS 应用的流程。

如今，这通常使用通用的 CI/CD 服务（如 GitHub Actions、CircleCI、Jenkins 等）来完成。

在此流程中，应用设置为在每次提交时构建，并经常运行本地测试套件。这是典型的 JS CI/CD 流程，您的团队可能已经熟悉它。

但这只是冰山一角，因为团队需要弄清楚如何构建、测试和部署应用的实际本机移动端。

## 添加移动 CI/CD

仅仅构建和运行 JS 应用测试对于移动应用来说远远不够，因为应用的很大一部分需要构建并作为本机 iOS 和 Android 应用运行。

此外，移动应用的部署和更新方式与 Web 应用非常不同。Web 应用将托管在可以快速更新的服务器上，而移动应用"托管"在应用商店中，并以加密签名二进制文件的形式分发。更新过程非常不同。

这意味着我们需要一种能够进行本机构建和移动测试的服务，并且还提供一种以本机移动方式部署和更新我们的应用的方法。

## Appflow：Capacitor 应用的移动 CI/CD

提供端到端移动 CI/CD 的这样一种服务是 [Appflow](https://ionic.io/appflow)，Capacitor 应用的官方移动 CI/CD 和移动 DevOps 平台。

Appflow 提供频繁更新的托管 iOS 和 Android 构建环境。Appflow 与流行的 git 服务（如 Azure DevOps、GitLab、GitHub 和 Bitbucket）集成，以支持在每次提交时触发 JS 和本机移动构建。Appflow 还支持将构建分离到不同的通道，供利益相关者、beta 测试人员和生产用户使用。此外，Appflow 可以作为自动化工作流程的一部分自动将您的应用提交到应用商店，并消除了您的团队管理复杂的本机 iOS 和 Android 构建堆栈的需要。

对于 Capacitor 开发人员，Appflow 还提供了向应用推送实时更新而无需应用商店提交的能力，只要这些更新位于应用的 JS/HTML/CSS 层。

有关更多详细信息，请参阅 [Appflow 文档](https://ionicframework.com/docs/appflow)。

## 将传统 CI/CD 服务与 Appflow 一起使用

Appflow 可以替代传统的 CI/CD 服务，因为它执行 Web/JS 构建和本机移动构建。但是，它与传统的 CI/CD 服务配合得很好。

要以这种方式使用它，请使用 webhooks 在每次提交时将构建的资源发送到 Appflow。

## 其他移动 CI/CD 选项

还有其他移动 CI/CD 服务，但没有一个专注于 Capacitor。无论您喜欢哪种 CI/CD 服务，Capacitor 都可以与之集成，因为 Capacitor 应用只是本机应用。但是，对于 Capacitor 应用的远程实时更新，[Appflow](https://ionic.io/appflow) 是唯一具有此功能的服务。
