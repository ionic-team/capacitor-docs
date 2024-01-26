---
title: Environment Specific Configurations
description: Creating environment specific configurations
contributors:
  - eric-horodyski
slug: /guides/environment-specific-configurations
---

# Creating Environment Specific Configurations

**Platforms:** iOS, Android

Many software development teams utilize different environments during the software development lifecycle. Configuration may differ between environments, such as bundle IDs, deep-link schemes, or icons and splash screens.

The Capacitor configuration file handles high-level options for Capacitor tooling and plugin configuration. iOS schemes and Android product flavors allow developers to provide differing app values for different environments. By combining the two, developers can use the Capacitor CLI to build apps for different environments.

This guide will walk you through setting up a QA environment configuration alongside the default environment configuration provided out-of-the-box. To demonstrate differences between each environment, the app name and bundle ID will differ between the two.

## Prepare a Capacitor App

You will need a Capacitor app with both iOS and Android platforms added. If you have an existing Capacitor app with both platforms added, skip this section.

Depending on your preference, you can either [add Capacitor to an existing web application](/main/getting-started/installation.md) or [create a new Capacitor application with the Ionic Framework](/main/getting-started/with-ionic.md).

The Capacitor app must use TypeScript for configuration. This guide uses `capacitor.config.ts` to dynamically export different configurations.

Before adding any native platforms to the project, you must build the Capacitor App at least once.

```bash
npm run build
```

Once built, you can add the platforms.

```bash
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
```

## Setup a new iOS scheme

### Create a new Xcode target

Start by opening the native iOS project in Xcode: `npx cap open ios`.

1. Go to the project's settings in the Project Navigator panel. Under the _Targets_ section, right-click the "App" target and select **Duplicate** to copy the existing target.
2. Click the new "App copy" target and press the `Enter` key to rename it. Set the target's name to "App QA".

This process created an additional "App copy" scheme and added a new file called `App copy-Info.plist`.

You can find additional information on iOS targets [at this link](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/WorkingwithTargets.html).

### Rename the new scheme and Plist file

1. Select **Manage Schemes...** from the Scheme menu.
2. Find the "App copy" scheme and press the `Enter` key to rename it. Set the name to "App QA" and close the dialog.
3. Find the "App copy-Info" file in the Project Navigator panel and press the `Enter` key to rename it. Set the file's name to "App QA-Info.plist".
4. Return to the project's settings. Ensuring that the "App QA" target is selected, open the _Build Settings_ section. Scroll down to Packaging and change the **Info.plist File** entry to "App QA-Info.plist".

The iOS project now has two runnable schemes: "App" and "App QA". Capacitor's configuration file allows you to supply which scheme to build during the `run` command.

You can find additional information on iOS schemes [at this link](https://developer.apple.com/library/archive/documentation/ToolsLanguages/Conceptual/Xcode_Overview/ManagingSchemes.html).

### Set environment-specific values

Return to the _General_ portion of the project's settings. Ensure you have the "App QA" target selected and change the **Display Name** and **Bundle Identifier**.

Make sure these values are different than what exists for the default "App" target. Target-specific values get stored in the target's associated `Info.plist` file. Following this guide, that file is `App QA-Info.plist`.

### Update the Podfile and sync the App

Exit Xcode; you can use your preferred IDE going forward.

Open `/ios/App/Podfile` and duplicate the code block for the "App" target, replacing "App" with "App QA" for the duplicate entry like so:

```ruby
...snip...
target 'App' do
  capacitor_pods
  # Add your Pods here
end

target 'App QA' do
  capacitor_pods
  # Add your Pods here
end
```

Run `npx cap sync` to sync plugins with the "App QA" target.

### Add iOS-specific Capacitor configuration

With the target and scheme for the QA environment created, the Capacitor configuration needs to be updated to use them.

Add the property below to the configuration object in `capacitor.config.ts`:

```typescript
ios: {
  scheme: 'App QA',
}
```

The `scheme` property tells Capacitor which iOS scheme to use for the `run` command. Test this out; run `npx cap run ios` and you'll see that the app name is different.

## Setup Android product flavors

### Modify the App's Gradle file

Android projects contain multiple `build.gradle` files; the one to modify to set up product flavors resides in the `/android/app` folder.

Open `/android/app/build.gradle` and add the following code within the `android` block:

```groovy
flavorDimensions = ["environment"]
productFlavors {
  dev {
      dimension "environment"
      manifestPlaceholders = [displayName:"My App"]
  }
  qa {
      dimension "environment"
      applicationIdSuffix ".qa"
      manifestPlaceholders = [displayName:"My App - QA"]
  }
}
```

This code requires some explanation:

1. Android does not provide a "default" flavor. In this guide, the non-QA environment is called "dev".
2. `applicationIdSuffix` will append `.qa` to the end of the bundle ID.
3. `manifestPlaceholders` are values that are usable in `AndroidManifest.xml`.

> **Note:** You are free to modify the bundle ID and display name values to your liking.

You can find additional information on Android product flavors [at this link](https://developer.android.com/studio/build/build-variants).

### Update the Android manifest

In the last section, you created a placeholder, `displayName`. Open `AndroidManifest.xml` and change the value of `android:label` to `${displayName}` within the `application` and `activity` nodes.

```xml
<application
  ...snip...
  android:label="${displayName}">

  <activity
    ...snip...
    android:label="${displayName}">
```

### Add Android-specific Capacitor configuration

Like iOS, you must update the Capacitor configuration to use the QA product flavor.

Add the property below to the configuration object in `capacitor.config.ts`:

```typescript
android: {
   flavor: "qa",
 },
```

Test this out; run `npx cap run android` and you'll see that the app name is different.

## Dynamically build for different environments

### Export environment-specific Capacitor configuration

All the pieces in place, now `capacitor.config.ts` can be written such that it exports a different configuration object based on a particular value.

Open `capacitor.config.ts` and modify the code like so:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

let config: CapacitorConfig;

const baseConfig: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'My App',
  webDir: 'build',
  bundledWebRuntime: false,
};

switch (process.env.NODE_ENV) {
  case 'qa':
    config = {
      ...baseConfig,
      ios: {
        scheme: 'App QA',
      },
      android: {
        flavor: 'qa',
      },
    };
    break;
  default:
    config = {
      ...baseConfig,
      ios: {
        scheme: 'App',
      },
      android: {
        flavor: 'dev',
      },
    };
    break;
}

export default config;
```

When `NODE_ENV` equals `qa`, Capacitor will use configuration pointing to the "App QA" scheme and "qa" product flavor. Otherwise, Capacitor uses configuration pointing to the "App" scheme and the "dev" product flavor.

### Run the App for different environments

You can run a build using the QA environment-specific configuration by prepending `NODE_ENV=qa` to the `npx cap copy` and `npx cap run` commands.

```bash
NODE_ENV=qa npx cap copy
NODE_ENV=qa npx cap run ios 	#NODE_ENV=qa npx cap run android
```

To run a build using the “default” environment-specific configuration, use the Capacitor commands as you would normally.

```bash
npx cap copy
npx cap run ios 	#npx cap run android
```

Go ahead and test it out! If you’ve followed the guide correctly, you'll be able to run builds for both environments and see that the app name differs depending on the environment-specific configuration used.

## Additional environments and configuration options

Use the information provided in this guide as a foundation to build upon. The Capacitor CLI has no limitation on how many schemes or product flavors can be used, and you can configure each one as deep as iOS and Android allow you to. You can also provide different environment-specific configuration values for Capacitor plugins! The sky’s the limit.
