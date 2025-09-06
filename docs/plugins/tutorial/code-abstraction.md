---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 代码抽象模式
contributors:
  - eric-horodyski
sidebar_label: 代码抽象模式
slug: /plugins/tutorial/code-abstraction-patterns
---

# Capacitor 插件抽象模式

为 Capacitor 构建的插件在复杂度上可能各不相同。以 <a href="https://capacitorjs.com/docs/plugins" target="_blank">官方 Capacitor 插件</a>为例：<a href="https://github.com/ionic-team/capacitor-plugins/blob/main/toast/android/src/main/java/com/capacitorjs/plugins/toast/Toast.java" target="_blank">Toast 插件</a>的 Android 实现较为简单，而 <a href="https://github.com/ionic-team/capacitor-plugins/tree/main/push-notifications/android/src/main/java/com/capacitorjs/plugins/pushnotifications" target="_blank">推送通知</a>插件则相当复杂，包含多个文件。

根据插件的复杂度和需求，将构建插件所需的工作范围划定为一个独立的软件项目并不为过，特别是在 iOS 和 Android 的实现要求各不相同的情况下。

因此，有必要重温设计模式并回顾标准的 Capacitor 插件代码抽象方法。

## 设计模式基础

设计模式是软件设计中针对常见问题的通用、可复用解决方案。设计模式并非问题的程序化解决方案，而是指导如何抽象代码以解决重复出现问题的蓝图或指南。

即使您没有意识到，您很可能已经使用过设计模式。Angular 重度依赖依赖注入和单例模式。React 使用中介者和状态模式。推送通知则采用观察者模式。

作为开发者，您完全可以使用设计模式库来构建适合您 Capacitor 插件的代码抽象。

以下是一些描述并提供设计模式示例的优秀资源：

- <a href="https://www.oreilly.com/library/view/head-first-design/0596007124/" target="_blank">Head First Design Patterns（O'Reilly 出版社）</a>
- <a href="https://refactoring.guru/design-patterns" target="_blank">设计模式（Refactoring Guru）</a>

> 就个人而言，我会在项目规划阶段翻阅《Head First Design Patterns》，并在埋头写代码时浏览《Refactoring Guru》。

## 实战中的模式

如果您浏览足够多的 Capacitor 插件源代码，会发现某些设计模式在 Capacitor 插件开发者中特别受欢迎。

**桥接设计模式**

桥接设计模式将代码的抽象与实现分离。这是一种将实现类封装在接口类内部的设计机制。

官方 Capacitor 插件大量使用桥接模式，以下面这个来自设备插件的示例为证：

```swift
@objc func getLanguageCode(_ call: CAPPluginCall) {
    let code = implementation.getLanguageCode()
    call.resolve([ "value": code ])
}
```

为何这种设计模式如此适合 Capacitor 插件？

- 您可以在抽象中专注于高层逻辑，在实现中专注于平台细节
- 向客户端隐藏实现细节
- 可以独立引入新的实现
- 能够创建平台无关的类和实现

**外观设计模式**

外观设计模式为包含许多移动部件的复杂子系统提供简单接口。它可能不会暴露子系统的所有功能，但会展示客户端关心的特性。

一些较复杂的官方 Capacitor 插件使用外观模式，包括本地通知插件：

```java
@Override
public void load() {
    super.load();
    notificationStorage = new NotificationStorage(getContext());
    manager = new LocalNotificationManager( … );
    manager.createNotificationChannel();
    notificationChannelManager = new NotificationChannelManager(getActivity());
    staticBridge = this.bridge;
}
```

为何这种设计模式适合 Capacitor 插件？

- 可以将代码与子系统的复杂性隔离
- 保护客户端代码免受子系统代码变更的影响
- 可以将子系统结构分层组织

## 屏幕方向插件将采用哪种模式？

`ScreenOrientation` 插件将采用桥接设计模式。虽然我们尚未处理插件所需的基础 iOS 和 Android API，但正如您将在下一步（iOS 实现）中看到的，实现插件 API 是直接且相对简单的。