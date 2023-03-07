---
title: Configuring Your App
description: Native Project Configuration
slug: /basics/configuring-your-app
---

# Configuring Your App

Most of Capacitor is configured per-platform; meaning that you will make most configuration changes in the native project using native tooling.

## Native Project Management

Configuring a Capacitor project is no different from configuring any iOS or Android project. Existing native developers  can easily work alongside web developers; with each side using the tools and SDKs they know best. While mobile application is a bit different than web development, we believe web developers can handle all the required native configuration on their own, and the Capacitor team provides documentation on things like how to deploy to [the Apple App Stores](/docs/ios/deploying-to-app-store) or [the Google Play Store](/docs/android/deploying-to-google-play) to help fill in knowledge gaps.

## Capacitor Configuration File

Capacitor specific configuration is handled in the [Capacitor Configuration File](/docs/config). These generally don't modify native functionality, but control Capacitor's tooling. This config file includes things such as, setting the web directory to copy on `npx cap sync`, specifying the Android or iOS project folder, or setting the App ID/Name in your native project.

## Native Configuration

iOS and Android each have configuration guides walking through making common changes to their behavior:

[Configuring iOS &#8250;](/docs/ios/configuration)

[Configuring Android &#8250;](/docs/android/configuration)
