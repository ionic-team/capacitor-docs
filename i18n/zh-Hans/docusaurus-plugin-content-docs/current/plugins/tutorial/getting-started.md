---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件
contributors:
  - eric-horodyski
sidebar_label: 快速开始
slug: /plugins/tutorial/introduction
---

# 构建 Capacitor 插件

Capacitor 提供了一个全面的插件 API,用于在向 Capacitor 应用添加原生功能时使用。

有两种类型的 Capacitor 插件:_本地插件_是隔离到特定 Capacitor 应用的自定义原生代码,驻留在作为源代码控制的一部分提交的原生项目中。_全局插件_是已发布的 npm 包,开发者可以将其添加到任何 Capacitor 应用。

在本教程中,我们将从空白的 Capacitor 应用开始,并向其添加原生代码以构建本地插件。然后,我们将其打包为全局插件,准备发布。

## 那么,我们要构建什么?

假设你为快递公司工作,你编写的应用允许司机从客户那里获取签名,确认他们已收到送货。法律团队注意到客户签名的质量很差,因为司机让客户以纵向模式签名。他们让你强制应用在捕获签名时进入横向模式。

我们要构建的插件将实现**屏幕方向**功能以满足此请求:

- 将检测设备的当前**方向**,纵向和横向模式有不同的 UI。
- 用户可以选择旋转并**锁定**其屏幕方向为横向模式。
- 确认签名后,应用将**解锁**屏幕方向旋转。

对于本教程,我们将模拟一个签名板,但只构建屏幕方向功能。

此 `ScreenOrientation` 插件将跨 Web、iOS 和 Android 平台工作。

## 快速开始

克隆 <a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial" target="_blank">此存储库</a>并检出 `start` 分支。在项目根目录运行 `npm install`。

> 本教程使用 `@ionic/react` 来构建用户界面。如果你不熟悉 React 或 Ionic Framework,那也没关系!所涵盖的概念适用于使用任何支持 TypeScript 的 Web 框架的 Capacitor 应用。

将 iOS 和 Android 平台添加到 Capacitor 应用:

```bash
npm run build
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
npx cap sync
```

现在我们有了一个带有添加的原生平台的 Capacitor 应用,我们准备继续构建插件的第一步:设计 API。
