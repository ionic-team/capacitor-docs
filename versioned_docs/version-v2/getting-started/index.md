---
title: Installing Capacitor
description: Installing Capacitor
contributors:
  - dotNetkow
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/getting-started
---

# Installing Capacitor

There are two ways to start using Capacitor: adding Capacitor to an existing frontend project (recommended), or starting a fresh project. Capacitor was designed primarily to drop-in to existing frontend projects, but comes with a simple starting project structure if you'd like to start fresh.

Capacitor provides a native mobile runtime and API layer for web apps. It does _not_ come with any specific set of UI controls which you will most likely need unless you're building a game or something similar.

We strongly recommend starting a Capacitor project with your mobile frontend framework of choice (such as [Ionic Framework](https://ionicframework.com/)).

## Before you start

Make sure you have all the required [Dependencies](/getting-started/dependencies.md) installed for the platforms you will be building for. Most importantly, make sure you update CocoaPods using `pod repo update` before starting a new project, if you plan on building for iOS using a Mac.

## Adding Capacitor to an existing Ionic App

[See here.](/getting-started/with-ionic.md)

## Adding Capacitor to an existing web app

Capacitor was designed to drop into any existing modern JavaScript web app. A valid `package.json` file and a folder containing all web assets are required to get started. In addition, a `<head>` element is needed in the main `index.html` file, as Capacitor is injected there upon app initialization.

To add Capacitor to your web app, run the following commands:

```bash
cd my-app
npm install @capacitor/core @capacitor/cli
```

Then, initialize Capacitor with your app information.

_Note: `npx` is a new utility available in npm 5 or above that executes local binaries/scripts to avoid global installs._

```bash
npx cap init
```

This command will prompt you to enter the name of your app and the app id (the package name for Android and the bundle identifier for iOS). Use the `--web-dir` flag to set the web assets folder (the default is `www`).

Next, install any of the desired native platforms:

```bash
npx cap add android
npx cap add ios
```

🎉 Capacitor is now installed in your project. 🎉

## Optional: Starting a fresh project

Capacitor comes with a stock project structure if you'd rather start fresh and plan to add a UI/frontend framework separately.

To create it, run:

```bash
npx @capacitor/cli create
```

This command will prompt you to enter the name of your app and the app id (the package name for Android and the bundle identifier for iOS).

This will create a very simple starting app with no UI library.

## Where to go next

Make sure you have the [Required Dependencies](/getting-started/dependencies.md) installed, including [PWA Elements](/web/pwa-elements.mdx), then proceed to the [Developer Workflow Guide](/basics/workflow.md) to learn how Capacitor apps are built.
