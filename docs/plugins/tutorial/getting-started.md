---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件
contributors:
  - eric-horodyski
sidebar_label: 开始使用
slug: /plugins/tutorial/introduction
---

# 构建 Capacitor 插件

Capacitor 提供了一套全面的插件 API，可用于为 Capacitor 应用添加原生功能。

Capacitor 插件分为两种类型：_本地插件_是局限于特定 Capacitor 应用的自定义原生代码，存在于作为源代码管理一部分提交的原生项目中；_全局插件_则是发布的 npm 包，开发者可以将其添加到任何 Capacitor 应用中。

本教程将从空白的 Capacitor 应用开始，通过添加原生代码构建本地插件，然后将其打包成可发布的全局插件。

## 那么，我们要构建什么？

假设您在一家快递公司工作，您编写的应用程序让司机能够获取客户的签名以确认包裹已送达。法务团队发现客户签名质量较差，因为司机让客户在竖屏模式下签名。他们要求您在捕获签名时强制应用进入横屏模式。

我们将构建的插件将实现**屏幕方向**功能以满足这一需求：

- 检测设备当前的**方向**，为竖屏和横屏模式提供不同的用户界面。
- 为用户提供旋转并**锁定**屏幕方向至横屏模式的选项。
- 确认签名后，应用将**解除**屏幕方向旋转的锁定。

在本教程中，我们将模拟一个签名板，但仅构建屏幕方向功能。

这个 `ScreenOrientation` 插件将支持 Web、iOS 和 Android 平台。

## 开始使用

克隆<a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial" target="_blank">此仓库</a>并检出 `start` 分支。在项目根目录运行 `npm install`。

> 本教程使用 `@ionic/react` 构建用户界面。如果您不熟悉 React 或 Ionic Framework，没关系！所涵盖的概念适用于使用任何支持 TypeScript 的 Web 框架的 Capacitor 应用。

为 Capacitor 应用添加 iOS 和 Android 平台：

```bash
npm run build
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
npx cap sync
```

现在我们已经有了一个添加了原生平台的 Capacitor 应用，可以继续进行构建插件的第一步：设计 API。