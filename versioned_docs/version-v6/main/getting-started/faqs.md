---
title: Frequently Asked Questions
description: Common Capacitor questions
slug: /getting-started/faqs
sidebar_label: FAQs
---

# FAQs

Below are a list of commonly asked Capacitor questions. If you don't find an answer here, check out [our forum](https://forum.ionicframework.com) or [our Discord](https://ionic.link/discord). Check out the sidebar for a list of frequently asked questions 👉

## What platforms does Capacitor support?

Capacitor can target virtually any device with our official and community platforms.

### Official Platforms

Capacitor officially supports the following platforms:
- iOS 13+
- Android 5.1+
  - Requires Chrome WebView 60+
- Modern Web Browsers
  - Chrome
  - Firefox
  - Safari
  - Edge

### Community Platforms

Capacitor also has community platforms to target cross platform desktop frameworks. The current community targets are the following.
- Electron
  - https://github.com/capacitor-community/electron
- Tauri (alpha)
  - https://github.com/capacitor-community/tauri


## Do I need to use Ionic Framework with Capacitor?

No! You don't! Capacitor works with **any** web application, not just ones built with other Ionic tools. If you want a specific look and feel for your Capacitor app, and Ionic Framework isn't the right UI toolkit for you, you shouldn't feel forced to use it. There are plenty of apps in both app stores that utilize Capacitor and not Ionic Framework.

## Where can I find plugins for my Capacitor project?

To find plugins for your project, you should check the following places in this order.

### Capacitor Community GitHub ⚡

The [Capacitor Community GitHub organization](https://github.com/capacitor-community) lists plugins that our excellent community of developers creates. They are Capacitor first plugins that are actively developed and should work in any Capacitor 3+ project. If you need a plugin, this should be one of the first places you look.

### Awesome Capacitor 😎

Like many other [Awesome lists](https://github.com/sindresorhus/awesome), [Awesome Capacitor](https://github.com/riderx/awesome-capacitor) is a community-curated list of great Capacitor plugins. If you can't find an official or community plugin, chances are that someone has already made the plugin you are looking for here.

### Project Fugu 🐡

[Project Fugu](https://www.chromium.org/teams/web-capabilities-fugu/) is the Chromium Team's [tracker](https://fugu-tracker.web.app/#shipped) of web APIs that have been added to Chromium browsers. While some features may not be supported on both Android and iOS, features like [Web Share](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API) and [ContactsManager (Android Only)](https://developer.mozilla.org/en-US/docs/Web/API/ContactsManager), may replace `@capacitor/share` or `@capacitor-community/contacts` for your use case.

You can [Can I Use...?](https://caniuse.com) to check if you can use these features on Android and iOS _without_ needing any native plugins.

### Cordova Plugins 🔌

Did you know Capacitor supports Cordova plugins? If you are migrating off of Cordova, or have a Cordova plugin that doesn't have a Capacitor equivalent, you can use most Cordova plugins directly in Capacitor. You can [read our guide](https://capacitorjs.com/docs/plugins/cordova) on how to use Cordova plugins in Capacitor.

## Can I build iOS apps without a Mac with Capacitor?

Short answer, no. The longer answer is that while you can use cloud services like [Ionic AppFlow](https://ionic.io/appflow), you won't be able to test your application on a device or simulator. You should always be sure to test your application with a physical device to make sure that your Capacitor application is usable to people with Apple products.

## Why do I get a blank screen when running on an Android emulator?

Capacitor requires Android 5.1 as well as a WebView version of 60 or higher. If you create an Android 6 or 7 emulator for example, the newest version of the WebView won't be installed, and you'll get a blank white screen. To get around this, you can install a newer Android emulator for testing your application.

## Why am I getting CocoaPods errors on my Apple Silicon Device?

If you installed CocoaPods with `sudo gem install cocoapods` and you're using an Apple Silicon-powered Mac, you might encounter something like this when running `npx cap update`:

```
[error] Analyzing dependencies
        /Library/Ruby/Gems/2.6.0/gems/ffi-1.15.3/lib/ffi/library.rb:275: [BUG] Bus Error at 0x0000000000000000
        ruby 2.6.3p62 (2019-04-16 revision 67580) [universal.arm64e-darwin20]
```

This is a CocoaPods bug related to `ffi` not installing on Apple Silicon computers.
We recommend using [Homebrew to installl CocoaPods](/main/getting-started/environment-setup.md#homebrew).
Alternatively, if you have Rosetta installed, you can install `ffi` on a `x86_64` architecture and run `pod install` using the simulated Intel architecture for the first time.

```
$ sudo arch -x86_64 gem install ffi
$ arch -x86_64 pod install
```

After that, running Capacitor should work as expected.
