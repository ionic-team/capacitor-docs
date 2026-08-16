---
title: Building a Capacitor Plugin
description: Building a Capacitor Plugin - Code Abstraction Patterns
contributors:
  - eric-horodyski
sidebar_label: Code Abstraction Patterns
slug: /plugins/tutorial/code-abstraction-patterns
---

# Capacitor Plugin Abstraction Patterns

Plugins that get built for Capacitor can vary in complexity. Let’s use the <a href="https://capacitorjs.com/docs/plugins" target="_blank">Official Capacitor Plugins</a> as an example: the Android implementation of the <a href="https://github.com/ionic-team/capacitor-plugins/blob/main/toast/android/src/main/java/com/capacitorjs/plugins/toast/Toast.java" target="_blank">Toast plugin</a> is simple, while <a href="https://github.com/ionic-team/capacitor-plugins/tree/main/push-notifications/android/src/main/java/com/capacitorjs/plugins/pushnotifications" target="_blank">Push Notifications</a> is quite complex with multiple files.

Depending on the plugin’s complexity and requirements, it would not be a stretch to scope the work required to build a plugin as its own software project, specifically if implementing requirements vary between iOS and Android.

That said, a refresher on design patterns and a review of standard Capacitor plugin code abstractions are in order.

## Design Patterns 101

Design patterns are general, reusable solutions to common problems in software design. Design patterns aren’t programmatic solutions to problems; instead, they are guides or blueprints on abstracting code to solve recurring problems.

You have most likely used design patterns even if you aren’t aware of them. Angular heavily relies on the Dependency Injection and Singleton patterns. React uses the Mediator and State patterns. Push notifications use the Observer pattern.

As a developer, you should feel empowered to use the library of design patterns to craft code abstractions that work for your Capacitor plugins.

Some good resources that describe and provide examples of design patterns are:

- <a href="https://www.oreilly.com/library/view/head-first-design/0596007124/" target="_blank">Head First Design Patterns (O'Reilly Publishing)</a>
- <a href="https://refactoring.guru/design-patterns" target="_blank">Design Patterns (Refactoring Guru)</a>

> Personally speaking, I keep a copy of _Head First Design Patterns_ to leaf through in the planning phases of projects and browse _Refactoring Guru_ when I’m heads-down writing code.

## Patterns in the wild

If you look through the source code of enough Capacitor plugins, you will see that specific design patterns are popular with Capacitor plugin developers.

**Bridge Design Pattern**

The Bridge design pattern splits the abstraction from the implementation of code. It is a design mechanism that encapsulates an implementation class inside of an interface class.

The Official Capacitor plugins heavily use the Bridge pattern, evidenced by this example from the Device plugin:

```swift
@objc func getLanguageCode(_ call: CAPPluginCall) {
    let code = implementation.getLanguageCode()
    call.resolve([ "value": code ])
}
```

Why does this design pattern fit so well for Capacitor plugins?

- You can focus on high-level logic in the abstraction and on platform details in the implementation.
- You hide implementation details from the client.
- You can introduce new implementations independently from each other.
- You can create platform-independent classes and implementations.

**Facade Design Pattern**

The Facade design pattern provides a simple interface to a complex subsystem containing many moving parts. It may not expose all the functionality of the subsystem. However, it does expose the features that clients care about.

Some of the more complex Capacitor Official plugins use the Facade pattern, including the Local Notifications plugin:

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

Why does this design pattern fit well for Capacitor plugins?

- You can isolate your code from the complexity of a subsystem.
- You can protect the client code from any changes in the subsystem code.
- You can structure a subsystem into layers.

## What will the screen orientation plugin use?

The `ScreenOrientation` plugin will use the Bridge design pattern. While we haven’t addressed the underlying iOS and Android APIs required to perform the actions the plugin requires, implementing our plugin’s API is straightforward and relatively simple, as you will see, starting with the next step: the iOS implementation.
