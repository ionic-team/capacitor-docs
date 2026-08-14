---
title: Setting Android Target SDK
sidebar_label: Setting Target SDK
description: Setting Android Target SDK
slug: /android/setting-target-sdk
---

All Android applications must specify a target SDK version, or the version of Android that the application is designed to run on. Each year, Google releases updates to the Android operating system and subsequently bumps the version number that applications are required to target. Typically, [this date is August 31st](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en) of each year. Because of this, it is important to keep your application up to date with the latest version of Android. In a Capacitor application, this is done by specifying your target SDK in the `/android/variables.gradle` file.

```groovy
targetSdkVersion = 34
```

## Capacitor Android Requirements

In Capacitor, the Android target SDK version is strongly tied to the major version of Capacitor. This means that while you could change the target SDK to a higher version and rebuild your application, there's a very strong likelihood that your application will experience issues not otherwise present. The Capacitor team releases a new major version of Capacitor every year that includes support for the new target SDK version to ensure that applications remain compliant with Google's requirements. For this reason, it is important to keep your application up to date with the latest major version of Capacitor.

## Android Target SDK Matrix

The following table shows the target SDK versions that are supported by Capacitor Android.

| Capacitor Android | Target SDK Version |
| ----------------- | ------------------ |
| 6.x               | 34                 |
| 5.x               | 33                 |
| 4.x               | 32                 |
| 3.x               | 30                 |
| 2.x               | 29                 |
| 1.x               | 28                 |

## Custom Target SDK Versions

Capacitor Android does not support custom target SDK versions. Each version of Capacitor Android requires a specific target SDK version and support is only provided for that matching version.