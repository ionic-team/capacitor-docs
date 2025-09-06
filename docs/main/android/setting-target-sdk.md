---
title: 设置 Android Target SDK
sidebar_label: 设置 Target SDK
description: 设置 Android Target SDK
slug: /android/setting-target-sdk
---

所有 Android 应用程序都必须指定目标 SDK 版本，即应用程序设计运行所针对的 Android 版本。每年，Google 都会发布 Android 操作系统的更新，并随后提升应用程序需要针对的版本号。通常，[这个日期是每年的 8 月 31 日](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en)。因此，让您的应用程序保持与最新 Android 版本的兼容性非常重要。在 Capacitor 应用程序中，这可以通过在 `/android/variables.gradle` 文件中指定目标 SDK 来完成。

```groovy
targetSdkVersion = 35
```

## Capacitor Android 要求

在 Capacitor 中，Android 目标 SDK 版本与 Capacitor 的主版本号紧密相关。这意味着虽然您可以更改目标 SDK 到更高版本并重新构建应用程序，但极有可能遇到原本不存在的兼容性问题。Capacitor 团队每年都会发布一个新的主版本，包含对新目标 SDK 版本的支持，以确保应用程序符合 Google 的要求。因此，保持应用程序与最新主版本的 Capacitor 同步非常重要。

## Android Target SDK 对照表

下表显示了 Capacitor Android 支持的目标 SDK 版本。

| Capacitor Android | 目标 SDK 版本 |
| ----------------- | ------------------ |
| 7.x               | 35                 |
| 6.x               | 34                 |
| 5.x               | 33                 |
| 4.x               | 32                 |
| 3.x               | 30                 |
| 2.x               | 29                 |
| 1.x               | 28                 |

## 自定义 Target SDK 版本

Capacitor Android 不支持自定义目标 SDK 版本。每个版本的 Capacitor Android 都需要特定的目标 SDK 版本，且仅提供对该匹配版本的支持。