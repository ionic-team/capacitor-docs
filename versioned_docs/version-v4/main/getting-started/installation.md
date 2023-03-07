---
title: Installing Capacitor
description: Installing Capacitor
slug: /getting-started
---

# Installing Capacitor

You can create a new Capacitor application or add Capacitor to your existing web project. This can be done via CLI or using the [VS Code extension](vscode/getting-started).

Remember to make sure your [environment is set up](/docs/getting-started/environment-setup) for the platforms you will be building for.

## Create a new Capacitor app

The `@capacitor/create-app` package can be used to quickly create a Capacitor application. You can run the following command in an empty directory to scaffold a new Capacitor application.

```bash
npm init @capacitor/app
```

## Add Capacitor to your web app

Capacitor was designed to drop into any modern JavaScript web app. However, your project needs to have the following three requirements in order to use Capacitor with your existing application:

- A `package.json` file
- A separate directory for built web assets such as `dist` or `www`
- An `index.html` file at the root of your web assets directory

:::info
Your `index.html` file must have a `<head>` tag in order to properly inject Capacitor. If you do not have a
`<head>` in your Html, Capacitor plugins will not work.
:::

### Install Capacitor

In the root of your app, install Capacitor's main npm dependencies: the core JavaScript runtime and the command line interface (CLI).

```bash
npm i @capacitor/core
npm i -D @capacitor/cli
```

### Initialize your Capacitor config

Then, initialize Capacitor using the CLI questionnaire:

```bash
npx cap init
```

The CLI will ask you a few questions, starting with your app name, and the package ID you would like to use for your app.

### Create your Android and iOS projects

After the Capacitor core runtime is installed, you can install the Android and iOS platforms.

```bash
npm i @capacitor/android @capacitor/ios
```

Once the platforms have been added to your `package.json`, you can run the following commands to create your Android and iOS projects for your native application.

```bash
npx cap add android
npx cap add ios
```

### Sync your web code to your native project

Once you've created your native projects, you can sync your web application to your native project by running the following command.

```bash
npx cap sync
```

`npx cap sync` will copy your built web application, by default `www`, to your native project and install the native projects dependencies.

:::info
You can customize what folder is copied over by modifying the `webDir` variable in your [Capacitor Config](/docs/config) file that is created during `npx cap init`.
:::

## Where to go next

With your environment setup, and your project structure set up properly, you're ready to go! You can follow any of the links below if you need more specific documentation.

[Get started with iOS &#8250;](/docs/ios)

[Get started with Android &#8250;](/docs/android)

[Developer Workflow Guide &#8250;](/docs/basics/workflow)
