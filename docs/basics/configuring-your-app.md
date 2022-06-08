---
title: Configuring Your App
description: Native Project Configuration
contributors:
  - jcesarmobile
  - dotNetkow
---

# Configuring Your App

Much of Capacitor is configured per-platform instead of in an abstracted system like Cordova's `config.xml`. This means that you will make most configuration changes in the native project using native tooling.

## Per-platform Management

Capacitor requires you to be more involved in the native project configuration than with Cordova. We think this approach makes it easy to follow existing iOS/Android guides, get help on Stack Overflow, and have complete control over your project.

Additionally, since configuring a Capacitor project is no different from configuring any iOS or Android project, existing native development teams can easily work alongside web developers, with each side using the tools and SDKs they are familiar with. Of course, we believe web developers can handle all the required native configuration on their own, and the Capacitor documentation exists to help web developers do just that.

## Capacitor Configuration

Capacitor specific configuration is handled in the [Capacitor configuration file](/docs/config). These generally don't modify native functionality, but control Capacitor's tooling.

## Native Configuration

iOS and Android each have configuration guides walking through making common changes to their behavior:

[Configuring iOS &#8250;](/docs/ios/configuration)

[Configuring Android &#8250;](/docs/android/configuration)
