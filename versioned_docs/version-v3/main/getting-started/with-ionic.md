---
title: Using with Ionic Framework
description: Using Capacitor with Ionic Framework
slug: /getting-started/with-ionic
---

# Using Capacitor with Ionic Framework

## Installing

Capacitor can be installed directly into any new or existing Ionic app.

### New Ionic Project

Capacitor is installed in new Ionic apps by default! All you have to do is start a new project:

```bash
ionic start
```

> If you'd like a tutorial for building your first Ionic/Capacitor app, see [this tutorial](https://ionicframework.com/docs/v3/intro/next).

### Existing Ionic Project

Install and initialize Capacitor with your app name and bundle ID:

```bash
ionic integrations enable capacitor
```

Ionic Framework makes use of the APIs in the following plugins:

- [**App**](/apis/app.md)
- [**Haptics**](/apis/haptics.md)
- [**Keyboard**](/apis/keyboard.md)
- [**StatusBar**](/apis/status-bar.md)

For the best user experience, you should make sure these plugins are installed even if you don't import them in your app:

```bash
npm install @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/status-bar
```

If your Ionic app uses Cordova, you will want to read the [Migrating from Cordova to Capacitor guide](/main/cordova/migrating-from-cordova-to-capacitor.md) as well.

### Add Platforms

After Capacitor installed, you can add native platforms to your app:

```bash
ionic capacitor add
```

This will create a new directory in the root of your project for the native platform. This directory is a native project that should be considered a source artifact. Learn more about [native project management](/main/cordova/index.md#native-project-management).

## Workflow

### Build your Ionic App

Capacitor JavaScript libraries are bundled into your app, so the web asset build is no different after Capacitor is installed.

```bash
ionic build
```

This creates the web asset directory that Capacitor copies into native projects, configured via `webDir` in the [Capacitor configuration](/main/reference/config.md).

### Ionic CLI Capacitor Commands

The Ionic CLI has a variety of high-level commands that wrap the Capacitor CLI for convenience. See the documentation for each below. Help output is also available by using the `--help` flag after each command.

- [`ionic capacitor add`](https://ionicframework.com/docs/v3/cli/commands/capacitor-add)
- [`ionic capacitor build`](https://ionicframework.com/docs/v3/cli/commands/capacitor-build)
- [`ionic capacitor run`](https://ionicframework.com/docs/v3/cli/commands/capacitor-run)
- [`ionic capacitor sync`](https://ionicframework.com/docs/v3/cli/commands/capacitor-sync)
- [`ionic capacitor open`](https://ionicframework.com/docs/v3/cli/commands/capacitor-open)

[Learn more about development workflow in Capacitor &#8250;](/main/basics/workflow.md)
