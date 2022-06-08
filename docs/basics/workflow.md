---
title: Development Workflow
description: Capacitor Workflow
contributors:
  - dotNetkow
  - mlynch
---

# Capacitor Workflow

Working with Capacitor involves several key additions to your workflow.

## Develop and build your Web App

Capacitor turns your web app into a native binary for each platform. Thus, much of your work will consist of developing and then building a mobile-focused web app.

You will interact with the native platform underneath using Capacitor's plugins (such as [Camera](/docs/apis/camera)), or by using existing Cordova plugins with Capacitor's [Cordova Compatibility](/docs/cordova).

To deploy your web app to native devices, you will first need to build the web assets into an output directory. Consult your JavaScript framework's documentation for the exact command. For most, it's `npm run build`.

## Sync your Project

You may wish to sync your web app with your native project(s) in the following circumstances:

- When you want to copy web assets into your native project(s).
- Before you run your project using a Native IDE.
- After you install a new Capacitor plugin.
- After you clone your project.
- When you want to setup or reconfigure the native project(s) for Capacitor.
- When you want to install native dependencies (e.g. with Gradle or CocoaPods).

To sync your project, run:

```bash
npx cap sync
```

> If you get an error about not being able to find the web assets directory, you may need to configure `webDir` in the [Capacitor configuration](/docs/config).

[Learn more about `sync` &#8250;](/docs/cli/sync)

## Run your Project

There are a few ways to deploy your project on native devices, depending on your use case. Most common is on the command-line with `npx cap run`.

[Learn more about running your app on iOS &#8250;](/docs/ios#running-your-app)

[Learn more about running your app on Android &#8250;](/docs/android#running-your-app)

## Build your Project

After you build your web assets (e.g. with `npm run build`) and copy them into your native project(s) with `npx cap sync`, you are ready to build a native binary.

Capacitor does not have a "build" command. After `sync`, you are encouraged to open your target platform's IDE for building your native app.

For building your app on the command-line or in CI environments, you are encouraged to use your target platform's tooling: Gradle for Android and `xcodebuild` for iOS. Third-party tools such as [Fastlane](https://fastlane.tools) may make this easier. Cloud builds and more are available when using [Appflow](https://useappflow.com).

To see what the release process looks like for Capacitor, read the publishing guides for [iOS](/docs/ios/deploying-to-app-store) and [Android](/docs/android/deploying-to-google-play).

## Open your Native IDE

You may wish to open your project in a Native IDE (e.g. Xcode and Android Studio) in the following circumstances:

- When you want to run your project on a native device using the IDE.
- When you want to debug native Java/Kotlin or Swift/Objective-C code.
- When you want to work on the native side of your app.
- When you want to compile a release build for the app store.

[Learn more about opening your app in Xcode &#8250;](/docs/ios#opening-the-ios-project)

[Learn more about opening your app in Android Studio &#8250;](/docs/android#opening-the-android-project)

## Updating Capacitor

To update Capacitor Core and CLI:

```bash
npm install @capacitor/cli
npm install @capacitor/core
```

To update any or all of the platforms you are using:

```bash
npm install @capacitor/ios
npm install @capacitor/android
```

> You can subscribe to the [Capacitor repo](https://github.com/ionic-team/capacitor) to be notified of new releases. At the top of the repository index, click **Watch** -> **Releases only**.

## Hooks

Need to tie into the capacitor cli command events? Check out the [hooks here](/docs/cli/hooks).
