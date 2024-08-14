---
title: Using with Ionic Framework
description: Using Capacitor with Ionic Framework
slug: /getting-started/with-ionic
---

# Using Capacitor with Ionic Framework

Capacitor does not require Ionic Framework in order to build apps. However, developers may find the [large collection](https://ionicframework.com/docs/components) of Ionic UI components helpful in order to build a high-quality app.

Capacitor can quickly be installed directly into any new or existing Ionic app by using the [Ionic CLI](https://ionicframework.com/docs/cli).

## Installing Capacitor in a new Ionic Project
For new Ionic projects, Capacitor is already installed in new Ionic apps by default! All you have to do is start a new project. To create a new Ionic project, run the following command:

```bash
ionic start
```

If you'd like a tutorial for building your first Capacitor-based Ionic app, check out [this tutorial](https://ionicframework.com/docs/intro/next) by the Ionic Framework team.

## Installing Capacitor to an existing Ionic Project
If you have an existing Ionic project that doesn't have Capacitor enabled, you can enable Capacitor by running the following command.

```bash
ionic integrations enable capacitor
```

### Install Capacitor Plugin Dependencies

Ionic Framework makes use of the APIs in the following Capacitor plugins:

- [`@capacitor/app`](/apis/app.md)
- [`@capacitor/haptics`](/apis/haptics.md)
- [`@capacitor/keyboard`](/apis/keyboard.md)
- [`@capacitor/status-bar`](/apis/status-bar.md)

For the best user experience, you should make sure these plugins are installed even if you don't import them in your app. To install these plugins, run the following command in the root of your project:

```bash
npm i @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/status-bar
```

### Add Platforms

After Capacitor installed and its plugins are installed, you can add mobile platforms to your app:

```bash
ionic capacitor add android
ionic capacitor add ios
```

This will create a new directory in the root of your project for the native platform. This directory is a native project that should be considered a source artifact. Learn more about [native project management](/main/cordova/index.md#native-project-management).

:::info
If your Ionic app uses Cordova, we have a guide on how to [migrate from Cordova to Capacitor](/main/cordova/migrating-from-cordova-to-capacitor.md) as well.
:::

## Ionic CLI Capacitor Commands

The Ionic CLI has a variety of high-level commands that wrap the Capacitor CLI for convenience. See the documentation for each below. Help output is also available by using the `--help` flag after each command.

- [`ionic capacitor add`](https://ionicframework.com/docs/cli/commands/capacitor-add)
- [`ionic capacitor build`](https://ionicframework.com/docs/cli/commands/capacitor-build)
- [`ionic capacitor run`](https://ionicframework.com/docs/cli/commands/capacitor-run)
- [`ionic capacitor sync`](https://ionicframework.com/docs/cli/commands/capacitor-sync)
- [`ionic capacitor open`](https://ionicframework.com/docs/cli/commands/capacitor-open)

For more information on the Ionic CLI, and how to use it with Capacitor, you can see the documentation [here](https://ionicframework.com/docs/cli).
