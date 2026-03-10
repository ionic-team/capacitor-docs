---
title: 创建 Capacitor 插件
description: 创建 Capacitor 插件
contributors:
  - mlynch
  - jcesarmobile
  - dotNetkow
sidebar_label: 概述
slug: /plugins/creating-plugins
---

# 创建 Capacitor 插件

Capacitor 中的插件使 JavaScript 能够直接与原生 API 交互。

本指南将帮助你开始创建可共享的 Capacitor 插件,该插件将发布在 npm 上。你也可以为应用创建本地 Capacitor 插件。请参阅 [iOS](/main/ios/custom-code.md) 和 [Android](/main/android/custom-code.md) 的自定义原生代码指南。

## 理念

如果你的插件面向公众,我们在你开始之前分享一些关于 Capacitor 插件的理念。

### 协作

我们相信合作将产生比竞争更高质量的插件。这就是我们创建 [Capacitor Community GitHub 组织](https://github.com/capacitor-community)的原因之一,它促进了社区之间的更轻松合作,而不是插件托管在个人存储库中。

如果 [Capacitor Community](https://github.com/capacitor-community) 中存在特定主题的插件,请考虑为其做出贡献!如果插件缺少主要维护者,Capacitor 团队很乐意考虑将你添加到 GitHub 组织。

### 范围小

我们相信 Capacitor 插件应该范围相当小。Capacitor 插件向应用添加可能使用也可能不使用的原生代码。通过保持插件范围小,我们可以确保应用需要最少的原生代码。这避免了不必要的应用膨胀和来自应用商店的警告/拒绝,因为缺少使用描述的 API 等。

当然,范围小还有其他好处,例如更快的部署、更容易的合作、可维护性等。

### 统一和惯用

Capacitor 插件应努力提供跨平台的统一体验,这对 JavaScript 开发者来说很熟悉。这意味着来自原生平台的值可能需要强制转换。

以下是一些带有示例的指南,演示了如何创建统一和惯用的体验:

- **优先使用 `undefined` 而不是 `null` 和其他非值。** 示例:如果 Android API 返回 `0.0` 表示"无值",则该值应强制转换为 JavaScript 层的 `undefined`。
- **优先使用相同的单位。** 示例:如果 iOS API 使用摄氏度,Android API 使用华氏度,则该值应在到达 JavaScript 使用者之前强制转换为其中之一。
- **优先使用带时区的 ISO 8601 日期时间而不是其他格式。** 示例:很容易从像 `"2020-12-13T20:21:58.415Z"` 这样的字符串中获取准确的 JavaScript `Date`,但如果给定 Unix 时间戳则令人困惑(JavaScript 时间戳以毫秒为单位)。始终包含时区,否则日期时间可能会从不同的区域设置不准确解释。

## 插件生成器 {#plugin-generator}

准备开始了吗?Capacitor 有一个[插件生成器](https://github.com/ionic-team/create-capacitor-plugin),你可以用它来开始处理你的插件。

> 在继续之前,你可能需要确保你使用的是最新的 Node LTS 版本和 npm 6+。

在新终端中,运行以下命令:

```bash
npm init @capacitor/plugin@latest
```

生成器将提示你输入。你也可以提供命令行选项(参见 [GitHub 存储库](https://github.com/ionic-team/create-capacitor-plugin/))。

## 下一步

[了解 Capacitor 插件开发工作流程 &#8250;](/plugins/creating-plugins/development-workflow.md)

[了解为 Capacitor 构建 Android 插件 &#8250;](/plugins/creating-plugins/android-guide.md)

[了解为 Capacitor 构建 iOS 插件 &#8250;](/plugins/creating-plugins/ios-guide.md)

[了解为 Capacitor 构建 Web/PWA 插件 &#8250;](/plugins/creating-plugins/web-guide.md)
