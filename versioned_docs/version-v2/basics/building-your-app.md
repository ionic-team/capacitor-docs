---
title: Building your App
description: Building your App
contributors:
  - dotNetkow
  - mlynch
---

# Building your App

Capacitor works on a three-step build process: First, your web code is built (if necessary). Next, the built web code is copied to each platform. Finally, the app is compiled using the platform-specific tooling.

## 1. Building web code

Capacitor does not have any built-in feature to build web code. Instead, you will use your framework's build process of choice.

Regardless of your build process, we recommend adding a `build` script to your `package.json` to enable the standard frontend
build command:

```json
{
  "scripts": {
    "build": "command-to-build (ex: webpack, tsc, babel, etc.)"
  }
}
```

```bash
npm run build
```

This builds your Progressive Web App if you've configured [Progressive Web App](./progressive-web-app.md) support already.

## 2. Copying Web Code

Once your web code is built, it needs to be copied into each native project:

```bash
npx cap copy
```

Run this command each time you perform a build and consider adding it to the end of your build script in `package.json`.

## 3. Building Native Project

### iOS

iOS relies on Xcode to do the final app compile:

```bash
npx cap copy ios
npx cap open ios
```

Once Xcode launches, you can build your app binary through the standard Xcode workflow.

### Android

Android relies on Android Studio (or, optionally, the Android CLI tools) to build the app:

```bash
npx cap copy android
npx cap open android
```

Once Android Studio launches, you can build your app through the standard Android Studio workflow.
