---
title: Configuring Your App
description: Native Project Configuration
contributors:
  - jcesarmobile
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/basics/configuring-your-app
---

# Configuring Your App

Capacitor embraces the idea of "Code once, configure everywhere": configuration is
managed per-platform instead of in an abstracted system like `config.xml` in Cordova.

## Per-platform Management

Capacitor requires you to be more involved in the native project configuration than with Cordova. We think this is the right approach because it makes it easy to follow existing native iOS/Android guides, get help on Stack Overflow, and have complete control over your project.

Additionally, since configuring a Capacitor project is no different from configuring any iOS or Android project, existing native development teams can easily work alongside web developers, with each side using the tools and SDKs they are familiar with. Of course, we believe web developers can handle all the required native configuration on their own, and the Capacitor documentation exists to help web developers do just that.

## Common Configuration

Capacitor has some high-level configuration options that are set in the [Capacitor configuration file](/docs/config). These generally don't modify native functionality, but control Capacitor's tooling.

## Native Configuration

iOS and Android each have configuration guides walking through making common changes to their behavior:

[Configuring iOS &#8250;](/docs/ios/configuration)

[Configuring Android &#8250;](/docs/android/configuration)
