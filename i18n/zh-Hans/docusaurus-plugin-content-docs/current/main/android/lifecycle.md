---
title: Android 生命周期
description: Android 生命周期
contributors:
  - mlynch
  - jcesarmobile
slug: /android/lifecycle
---

# Android 生命周期

理解 Android Activity 生命周期对于构建符合 Android 用户期望的应用至关重要。

本文试图解释与 Capacitor 相关的生命周期。有关更多信息，官方 Android 文档中的 [Activity 生命周期](https://developer.android.com/guide/components/activities/activity-lifecycle.html)参考是最好的资源。

## 处理应用重启

Android 应用经常利用其他应用（或 Activity）来实现功能，这些功能太复杂而无法包含在自己的应用中，例如相机或浏览器功能。

在某些情况下，当设备内存不足时，启动新的 Activity 可能会导致您的应用被终止以释放内存。

在这种情况下，当新的 Activity 将数据返回给您的应用时，您的应用将希望向用户显示应用状态，以恢复用户刚才正在做的事情。
