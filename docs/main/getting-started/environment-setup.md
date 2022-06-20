---
title: Environment Setup
description: Setting up a development environment for Capacitor
slug: /getting-started/environment-setup
---

# Environment Setup

Capacitor has three officially supported application targets: Android, iOS, and Progressive Web Application (PWA). Additionally, you can use the community supported [Capacitor Electron](https://github.com/capacitor-community/electron) to make a desktop application with Capacitor.

In order to create applications for all three platforms, you'll need to install all of the following dependencies. If you are not targeting one of the native mobile targets, you can skip the associated section.

## Core Requirements

In order to develop any application with Capacitor, you will need NodeJS 14 or higher installed. You can install Node by using the installer on [the Node website](https://nodejs.org), using [Volta: a JavaScript tools manager](https://volta.sh/), or installing it with a package manager like [homebrew](https://brew.sh/), or [Chocolatey](https://chocolatey.org/).

Once you have installed Node, open your terminal of choice and type in the following command to make sure node is properly installed

```bash
node --version
# v18.3.0
```

With Node installed, you can get started with creating PWAs with Capacitor.

## iOS Requirements

To build iOS apps, you will need **macOS**. While there are solutions like [Ionic Appflow](http://ionicframework.com/appflow) that be used to perform iOS cloud builds if you don't have a Mac, it is highly recommended to have the tools available to you locally in order to properly test your Capacitor application.

In order to develop iOS applications using Capacitor, you will need three additional dependencies:

- Xcode
- Xcode Command Line Tools
- Cocoapods

Once you've installed the core requirements, as well as Xcode, Xcode Command Line Tools, and Cocoapods, you'll be able to create both iOS applications and PWAs.

### Xcode

Xcode is Apple's IDE for creating native macOS, iOS, and iPadOS applications. You can install Xcode by [using the Apple App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12) on your Mac. Capacitor 4 requires a minimum of Xcode 13.

### Xcode Command Line Tools

The Xcode command line tools are additional tools not included with the core of Xcode that are required for building and testing your application. Once Xcode has been installed, you can install the Xcode Command Line Tools by running the following command in your terminal:

```bash
xcode-select --install
```

After inputting your password and waiting for a few minutes for the packages to install, you can verify that the tools are installed by running the following command:

```bash
xcode-select -p
# /Applications/Xcode.app/Contents/Developer
```

### CocoaPods

Cocoapods is an iOS dependency manager that Capacitor uses to install and manage native dependencies for your iOS project. You can install [CocoaPods](https://cocoapods.org/) by running the following command in your terminal

```bash
sudo gem install cocoapods
```

## Android Requirements

In order to develop Android applications using Capacitor, you will need two additional dependencies:

- Android Studio
- An Android SDK installation

Once you've installed the core requirements, as well as an Android SDK with Android Studio, you'll be able to create both Android applications and PWAs.

### Android Studio

Android Studio is Google's IDE for creating native Android applications. You can install Android Studio by going to the [Android Studio download page](https://developer.android.com/studio). Capacitor 4 requires a minimum of Android Studio 2020.1.

**Note:** You _do not_ need to separately install the Java Development Kit (JDK) as it comes bundled with Android Studio.

### Android SDK

Once Android Studio has been installed, you need to install an Android SDK package.

Developing Android apps requires some Android SDK packages to be installed. Make sure to install the Android SDK Tools, and a version of the Android SDK Platforms for API 21 or greater.

In Android Studio, open **Tools -> SDK Manager** from the menu and install the platform versions you'd like to test with in the **SDK Platforms** tab:

![SDK Platforms](/img/v4/docs/android/sdk-platforms.png)

To get started, you only need to install one API version. In the above image, the SDKs for Android 10 (API 30) and Android 11 (API 31) are installed. The latest stable version is Android 12 (API 32).
