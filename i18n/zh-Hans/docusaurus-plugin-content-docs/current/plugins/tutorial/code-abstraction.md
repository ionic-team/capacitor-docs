---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 代码抽象模式
contributors:
  - eric-horodyski
sidebar_label: 代码抽象模式
slug: /plugins/tutorial/code-abstraction-patterns
---

# Capacitor 插件抽象模式

为 Capacitor 构建的插件在复杂性上可能有所不同。让我们使用 <a href="https://capacitorjs.com/docs/plugins" target="_blank">官方 Capacitor 插件</a>作为示例:<a href="https://github.com/ionic-team/capacitor-plugins/blob/main/toast/android/src/main/java/com/capacitorjs/plugins/toast/Toast.java" target="_blank">Toast 插件</a>的 Android 实现很简单,而 <a href="https://github.com/ionic-team/capacitor-plugins/tree/main/push-notifications/android/src/main/java/com/capacitorjs/plugins/pushnotifications" target="_blank">推送通知</a>相当复杂,有多个文件。

根据插件的复杂性和要求,将构建插件所需的工作范围视为其自己的软件项目并不夸张,特别是如果 iOS 和 Android 的实现要求有所不同。

也就是说,有必要重新审视设计模式并审查标准 Capacitor 插件代码抽象。

## 设计模式 101

设计模式是软件设计中常见问题的通用、可重用的解决方案。设计模式不是问题的程序化解决方案;相反,它们是抽象代码以解决重复问题的指南或蓝图。

你很可能使用过设计模式,即使你没有意识到它们。Angular 严重依赖依赖注入和单例模式。React 使用中介者和状态模式。推送通知使用观察者模式。

作为开发者,你应该感到有权使用设计模式库来为你的 Capacitor 插件制作有效的代码抽象。

一些描述和提供设计模式示例的好资源是:

- <a href="https://www.oreilly.com/library/view/head-first-design/0596007124/" target="_blank">Head First Design Patterns (O'Reilly Publishing)</a>
- <a href="https://refactoring.guru/design-patterns" target="_blank">设计模式 (Refactoring Guru)</a>

> 就个人而言,我会在项目的规划阶段翻阅 _Head First Design Patterns_,并在埋头编写代码时浏览 _Refactoring Guru_。

## 实际中的模式

如果你浏览足够多的 Capacitor 插件源代码,你会发现特定的设计模式在 Capacitor 插件开发者中很受欢迎。

**桥接设计模式**

桥接设计模式将抽象与代码实现分离。它是一种设计机制,将实现类封装在接口类内部。

官方 Capacitor 插件大量使用桥接模式,这可以从设备插件的示例中看出:

```swift
@objc func getLanguageCode(_ call: CAPPluginCall) {
    let code = implementation.getLanguageCode()
    call.resolve([ "value": code ])
}
```

为什么这种设计模式如此适合 Capacitor 插件?

- 你可以专注于抽象中的高级逻辑和实现中的平台细节。
- 你向客户端隐藏实现细节。
- 你可以彼此独立地引入新实现。
- 你可以创建平台无关的类和实现。

**外观设计模式**

外观设计模式为包含许多移动部分的复杂子系统提供简单的接口。它可能不会暴露子系统的所有功能。但是,它确实暴露了客户端关心的功能。

一些更复杂的 Capacitor 官方插件使用外观模式,包括本地通知插件:

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

为什么这种设计模式适合 Capacitor 插件?

- 你可以将代码与子系统的复杂性隔离开来。
- 你可以保护客户端代码免受子系统代码中的任何更改的影响。
- 你可以将子系统构建为层。

## 屏幕方向插件将使用什么?

`ScreenOrientation` 插件将使用桥接设计模式。虽然我们没有解决执行插件所需的底层 iOS 和 Android API,但实现插件的 API 很简单且相对简单,正如你将从下一步开始看到的那样:iOS 实现。
