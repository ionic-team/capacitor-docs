---
title: 设置 Android 目标 SDK
sidebar_label: 设置目标 SDK
description: 设置 Android 目标 SDK
slug: /android/setting-target-sdk
---

所有 Android 应用都必须指定目标 SDK 版本，即应用设计运行的 Android 版本。每年，Google 都会发布 Android 操作系统的更新，并相应提高应用程序需要定位的版本号。通常，[这个日期是每年的 8 月 31 日](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en)。因此，重要的是让您的应用与最新版本的 Android 保持同步。在 Capacitor 应用中，这是通过在 `/android/variables.gradle` 文件中指定目标 SDK 来完成的。

```groovy
targetSdkVersion = 36
```

## Capacitor Android 要求

在 Capacitor 中，Android 目标 SDK 版本与 Capacitor 的主要版本紧密相关。这意味着虽然您可以将目标 SDK 更改为更高版本并重新构建应用，但您的应用很有可能会遇到其他情况下不存在的问题。Capacitor 团队每年都会发布一个新的 Capacitor 主要版本，其中包括对新目标 SDK 版本的支持，以确保应用程序符合 Google 的要求。因此，重要的是让您的应用与 Capacitor 的最新主要版本保持同步。

## Android 目标 SDK 版本对照表

下表显示了 Capacitor Android 支持的目标 SDK 版本。

| Capacitor Android | 目标 SDK 版本 |
| ----------------- | ------------------ |
| 8.x               | 36                 |
| 7.x               | 35                 |
| 6.x               | 34                 |
| 5.x               | 33                 |
| 4.x               | 32                 |
| 3.x               | 30                 |
| 2.x               | 29                 |
| 1.x               | 28                 |

## 自定义目标 SDK 版本

Capacitor Android 不支持自定义目标 SDK 版本。每个版本的 Capacitor Android 都需要特定的目标 SDK 版本，并且仅提供对该匹配版本的支持。
