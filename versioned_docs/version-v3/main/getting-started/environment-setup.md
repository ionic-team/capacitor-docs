---
title: Environment Setup
description: Setting up a development environment for Capacitor
slug: /getting-started/environment-setup
---

# Environment Setup

Capacitor has a number of dependencies depending on which platforms you're targeting and which operating systems you are developing on.

## Requirements

You will need at least [NodeJS 12 LTS](https://nodejs.org) or later to get started. For specific platforms, follow each guide below to ensure you have the correct dependencies installed.

## iOS Development

To build iOS apps, you will need **macOS**. You will also need to download and set up [Xcode](https://developer.apple.com/xcode/). If you are developing on Linux or Windows, you can skip this section.

> [Ionic Appflow](http://ionicframework.com/appflow) can be used to perform iOS cloud builds if you don't have a Mac.

### CocoaPods

Install [CocoaPods](https://cocoapods.org/), which is used to manage Capacitor packages for iOS.

```bash
sudo gem install cocoapods
```

### Xcode Command Line Tools

Install the **Xcode Command Line Tools** by opening **Xcode -> Preferences -> Locations** and selecting the latest version in the dropdown.

![Xcode locations preferences](../../../../static/img/v3/docs/ios/xcode-preferences-location.png)

## Android Development

To build Android apps, you will need to download and set up [Android Studio](https://developer.android.com/studio/index.html).

### Android SDK

Developing Android apps requires some Android SDK packages to be installed. Make sure to install the Android SDK Tools, and a version of the Android SDK Platforms for API 21 or greater.

In Android Studio open **Tools -> SDK Manager** from the menu and install the platform versions you'd like to test with in the **SDK Platforms** tab:

![SDK Platforms](../../../../static/img/v3/docs/android/sdk-platforms.png)

In the **SDK Tools** tab, make sure to install at least the following:

- Android SDK Build-Tools
- Android SDK Command-line Tools
- Android Emulator
- Android SDK Platform-Tools

![SDK Tools](../../../../static/img/v3/docs/android/sdk-tools.png)
