---
title: Getting Started
description: Communicate between JavaScript and Native Swift or Objective-C code
slug: /ios
contributors:
  - dotNetkow
  - mlynch
---

# Capacitor iOS Documentation

Capacitor features a native iOS runtime that enables developers to communicate between JavaScript and Native Swift or Objective-C code.

Capacitor iOS apps are configured and managed with Xcode and [CocoaPods](https://cocoapods.org/).

## iOS Support

iOS 13+ is supported. Xcode 15.0+ is required (see [Environment Setup](/main/getting-started/environment-setup.md#ios-requirements)). Capacitor uses [WKWebView](https://developer.apple.com/documentation/webkit/wkwebview), not the deprecated [UIWebView](https://developer.apple.com/documentation/uikit/uiwebview).

## Adding the iOS Platform

First, install the `@capacitor/ios` package.

```bash
npm install @capacitor/ios
```

Then, add the iOS platform.

```bash
npx cap add ios
```

## Opening the iOS Project

To open the project in Xcode, run:

```bash
npx cap open ios
```

Alternatively, you can open Xcode manually by running:

```bash
open ios/App/App.xcworkspace
```

## Running Your App

You can either run your app on the command-line or with Xcode.

### Running on the Command-Line

To run the project on a device or simulator, run:

```bash
npx cap run ios
```

The command will prompt you to select a target. [Learn more about `run`](/cli/commands/run.md).

### Running in Xcode

In Xcode, first select the device or simulator and then click the play button to run your app.

![Running your app](/img/v6/docs/ios/running.png)

## Troubleshooting

If you encountered any issues while getting started, you can consult the [iOS Troubleshooting Guide](/main/ios/troubleshooting.md). Feel free to [open a discussion](https://github.com/ionic-team/capacitor/discussions/) if you need help.

## Next steps

You are now ready to continue developing and building your app. Use the various APIs available, Capacitor or Cordova plugins, or custom native code to build out the rest of your app.

## Further Reading

Follow these guides for more information on each topic:

[Configuring and setting permissions for iOS &#8250;](/main/ios/configuration.md)

[Building Native Plugins for iOS &#8250;](/plugins/creating-plugins/ios-guide.md)
