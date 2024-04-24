---
title: Configuring iOS
description: Configuring iOS
contributors:
  - dotNetkow
  - mlynch
slug: /ios/configuration
---

# Configuring iOS

## Configuring `Info.plist`

The `Info.plist` file is the main configuration file for iOS apps. You may need to edit it whenever a Capacitor plugin requires new settings or permissions.

To modify it, [open your project in Xcode](/main/ios/index.md#opening-the-ios-project), select the **App** project and the **App** target, and click the **Info** tab.

![Xcode info editor](/img/v6/docs/ios/xcode-info-editor.png)

> You can show the true key names by right-clicking in the table and checking **Raw Keys & Values** in the context menu.
>
> You can also open and edit the `ios/App/App/Info.plist` file manually to inspect the raw keys. Use [this reference documentation](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Introduction/Introduction.html) for a list of possible keys.

## Managing Permissions

iOS permissions do not need to be specified explicitly like they are in Android. However, iOS requires "Usage Descriptions" to be defined in `Info.plist`. These settings are human-readable descriptions that will be presented to the end user when permission is requested for a particular device API.

Consult the [Cocoa Keys](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html) list for keys containing `UsageDescription` to see the various usage description settings that may be required for your app.

For more information, Apple has provided a guide to [Resolving the Privacy-Sensitive Data App Rejection](https://developer.apple.com/library/content/qa/qa1937/_index.html) which contains more information on APIs that require usage descriptions.

## Setting Capabilities

Capabilities are used to enable key features that your app may need. You may need to configure them whenever a Capacitor plugin requires it.

Unlike other configuration options and usage descriptions, capabilities are _not_ configured in `Info.plist`.

To add a new capability, [open your app in Xcode](/main/ios/index.md#opening-the-ios-project), select the **App** project and the **App** target, click **Signing & Capabilities** in the tab bar, and then click the **+ Capability** button. See [this article](https://developer.apple.com/documentation/xcode/adding_capabilities_to_your_app) for more information about iOS capabilities.

![Xcode Capabilities](/img/v6/docs/ios/xcode-capabilities.png)

## Renaming your App

You can't rename the `App` directory, but you can set the name of your app by renaming the **App** target.

To rename the **App** target, [open your project in Xcode](/main/ios/index.md#opening-the-ios-project), select the **App** project, and double-click the **App** target.

![Xcode Target](/img/v6/docs/ios/xcode-target.png)

Then, open `ios/App/Podfile` and rename the current target at the bottom of the file:

```diff
-target 'App' do
+target 'MyRenamedApp' do
   capacitor_pods
   # Add your Pods here
 end
```

Finally, add the `scheme` attribute inside the `ios` object in the [Capacitor configuration file](/main/reference/config.md#schema).

## Deeplinks (aka Universal Links)

For a Deep Links guide, [see here](/main/guides/deep-links.md).
