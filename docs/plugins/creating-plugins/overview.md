---
title: Creating Capacitor Plugins
description: 创建 Capacitor 插件
contributors:
  - mlynch
  - jcesarmobile
  - dotNetkow
sidebar_label: 概述
slug: /plugins/creating-plugins
---

# 创建 Capacitor 插件

Capacitor 中的插件让 JavaScript 能够直接与原生 API 进行交互。

本指南将帮助您开始创建可共享的 Capacitor 插件，这些插件将发布到 npm 上。您也可以创建仅限应用本地的 Capacitor 插件。请参阅 [iOS](/main/ios/custom-code.md) 和 [Android](/main/android/custom-code.md) 的自定义原生代码指南。

## 设计理念

如果您的插件打算公开使用，在开始之前，我们有一些关于 Capacitor 插件的理念想与您分享。

### 协作开发

我们相信合作比竞争更能产出高质量的插件。这也是我们创建 [Capacitor 社区 GitHub 组织](https://github.com/capacitor-community)的原因之一，相比个人仓库托管插件，该组织能促进社区成员之间更轻松地协作。

如果 [Capacitor 社区](https://github.com/capacitor-community)中已有某个特定主题的插件，请考虑为其做出贡献！如果某个插件缺少主要维护者，Capacitor 团队很乐意考虑将您加入该 GitHub 组织。

### 小巧精悍

我们相信 Capacitor 插件应当保持合理的精简范围。Capacitor 插件会向应用添加可能用不到的原生代码。通过保持插件的小巧精悍，我们可以确保应用仅包含必需的最小原生代码量。这能避免不必要的应用臃肿，以及应用商店因未使用 API 描述等问题发出的警告或拒绝。

当然，保持小巧还能带来其他好处，比如更快的部署、更轻松的协作、更好的可维护性等。

### 统一且符合习惯

Capacitor 插件应努力为 JavaScript 开发者提供跨平台的统一体验。这意味着可能需要将来自原生平台的值进行转换。

以下是一些指导原则及示例，展示如何创建统一且符合习惯的体验：

- **优先使用 `undefined` 而非 `null` 和其他空值。** 示例：如果 Android API 返回 `0.0` 表示“无值”，则应将该值转换为 `undefined` 再传递给 JavaScript 层。
- **优先使用统一单位。** 示例：如果 iOS API 使用摄氏度而 Android API 使用华氏度，应在值到达 JavaScript 使用者之前将其转换为统一的单位。
- **优先使用带时区的 ISO 8601 日期时间格式而非其他格式。** 示例：从类似 `"2020-12-13T20:21:58.415Z"` 的字符串轻松获取准确的 JavaScript `Date` 对象，但若给定 Unix 时间戳（JavaScript 时间戳单位为毫秒）则容易混淆。务必包含时区，否则不同地区的日期时间解析可能不准确。

## 插件生成器

准备好开始了吗？Capacitor 提供了 [一个插件生成器](https://github.com/ionic-team/create-capacitor-plugin)，您可以用它来开始开发插件。

> 继续之前，建议确保您使用的是最新的 Node LTS 版本和 npm 6+。

在新的终端中，运行以下命令：

```bash
npm init @capacitor/plugin@latest
```

生成器会提示您输入信息。您也可以提供命令行选项（参见 [GitHub 仓库](https://github.com/ionic-team/create-capacitor-plugin/)）。

## 后续步骤

[了解 Capacitor 插件开发工作流程 &#8250;](/plugins/creating-plugins/development-workflow.md)

[了解为 Capacitor 构建 Android 插件 &#8250;](/plugins/creating-plugins/android-guide.md)

[了解为 Capacitor 构建 iOS 插件 &#8250;](/plugins/creating-plugins/ios-guide.md)

[了解为 Capacitor 构建 Web/PWA 插件 &#8250;](/plugins/creating-plugins/web-guide.md)