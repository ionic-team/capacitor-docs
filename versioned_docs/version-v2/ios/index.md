---
title: Capacitor iOS Documentation
description: Communicate between JavaScript and Native Swift or Objective-C code
contributors:
  - dotNetkow
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/ios
---

# Capacitor iOS Documentation

Capacitor features a native iOS bridge that enables developers to communicate between JavaScript and Native Swift or Objective-C code.

Capacitor iOS apps are configured and managed through Xcode, with dependencies managed by CocoaPods.

## Getting Started

Building iOS apps requires some iOS development dependencies to be installed, including Xcode 11 and the Xcode command line tools.

> Note: It's possible to develop and build iOS apps without a Mac, such as by using Ionic Appflow's [Package feature](https://ionicframework.com/docs/appflow/package/intro). Consult your service of choice for more information.

### Creating iOS App

By default, an iOS project is created for every Capacitor project. If you are adding Capacitor to an existing
project, you can manually add the iOS project using:

```bash
npx cap add ios
npx cap sync
```

The `sync` command updates dependencies, and copies any web assets to your project. You can also run:

```bash
npx cap copy
```

To copy web assets only, which is faster if you know you don't need to update native dependencies.

### Opening iOS Project

To open the project in Xcode, run:

```bash
npx cap open ios
```

### Running Your App

Once Xcode is open, just click the Play button to run your app on a Simulator or Device.

![Running your app](../../../static/img/v3/docs/ios/running.png)

## Next steps

You are now ready to continue developing and building your app. Use the various APIs available, Capacitor or Cordova plugins, or custom native code to build out the rest of your app.

## Further Reading

Follow these guides for more information on each topic:

[Configuring and setting permissions for iOS &#8250;](/ios/configuration.md)

[Building Native Plugins for iOS &#8250;](/plugins.md)
