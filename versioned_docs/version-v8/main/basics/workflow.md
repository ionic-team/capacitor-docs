---
title: Development Workflow
description: Capacitor Workflow
slug: /basics/workflow
---

# Capacitor Workflow

Working with Capacitor is slightly different than working with a traditional web app. To make your web native Capacitor application, you'll need to do the following steps.

## Building your web code

Once you are ready to test your web app on a mobile device, you'll need to build your web app for distribution. If you are using a tool like [Create React App](https://create-react-app.dev/) or [Vite](https://vitejs.dev/) that command will be `npm run build`; while a tool like [Angular](https://angular.io/) uses the command `ng build`. Whatever your command is, you will need to build your web code for distribution in order to use it with Capacitor.

## Syncing your web code to your Capacitor project

Once your web code has been built for distribution, you will need to push your web code to the web native Capacitor application. To do this, you can use the [Capacitor CLI](/cli/index.md) to "sync" your web code and install/update the required native dependencies.

To sync your project, run:

```bash
npx cap sync
```

Running `npx cap sync` will **copy** over your already built web bundle to both your Android and iOS projects as well as **update** the native dependencies that Capacitor uses.

You can [read our docs](/cli/commands/sync.md) on `sync` and more on the [Capacitor CLI reference](/cli/index.md) documentation.

:::info
Did you get an error about "not being able to find the web assets directory?" Update your [Capacitor configuration](/main/reference/config.md) file to use the proper `webDir`.
:::


## Testing your Capacitor app

Once you've synced over your web bundle to your native project, it is time to test your application on a mobile device. There are a few different ways to do this, but the easiest way is to use the built in Capacitor CLI commands.

To run a debug build of your Capacitor app on an iOS device, you can run:
```bash
npx cap run ios
```

Similarly, to run a debug build of your Capacitor app on an Android device, you can run:
```bash
npx cap run android
```


Once you've iterated and tested your application, it is time to compile the final binary to distribute to other mobile devices.

:::info
You can also [run your app on iOS via Xcode](/main/ios/index.md#running-in-xcode) or [run your app on Android via Android Studio](/main/android/index.md#running-with-android-studio) as well. Both options are valid for development. Go ahead and try both to see which option you prefer!
:::

### Open your Native IDE

If you'd like more control over your native project you can quickly open the native IDEs using the Capacitor CLI.

To [open the iOS Capacitor `.xcworkspace` project in Xcode](/main/ios/index.md#opening-the-ios-project), you can run:
```bash
npx cap open ios
```

Similarly, to [open the Android Capacitor project in Android Studio](/main/android/index.md#opening-the-android-project), you can run:
```bash
npx cap open android
```

Opening the native project can give you full control over the native runtime of your application. You can [create plugins](/plugins.mdx), [add custom native code](/main/ios/custom-code.md), or [compile your application](#compiling-your-native-binary) for releasing.

## Compiling your native binary

After `sync`, you are encouraged to open your target platform's IDE: Xcode for iOS or Android Studio for Android, for compiling your native app.

Alternatively, to compile your app in a terminal or in CI environments, you can use the [cap build command](/cli/commands/build) to build the native project, outputting a signed AAB, APK or IPA file ready for distribution to a device or end users.

```bash
npx cap build android
```

We also  suggest using tools such as [Fastlane](https://fastlane.tools) or a cloud build tool like [Appflow](https://useappflow.com) to automate these processes for you. While every application is different, we have an example of a general release process for Capacitor projects. Go and read our publishing guides for [iOS](/main/ios/deploying-to-app-store.md) and [Android](/main/android/deploying-to-google-play.md) for more info on how to deploy to the Apple App Store or the Google Play Store.

## Updating Capacitor

Updating your Capacitor runtime is as straightforward as running `npm install`.

```bash
npm i @capacitor/core @capacitor/ios @capacitor/android
npm i -D @capacitor/cli
```

When updating Capacitor, you want to make sure your Core, Android, and iOS libraries are all the same version. Capacitor Core, Android, and iOS releases are all uploaded simultaneously, meaning that if you install all of the libraries at the same time, you'll be fine!

:::info
You can subscribe to the [Capacitor repo](https://github.com/ionic-team/capacitor) to be notified of new releases. At the top of the repository index, click **Watch** -> **Releases only**.
:::

