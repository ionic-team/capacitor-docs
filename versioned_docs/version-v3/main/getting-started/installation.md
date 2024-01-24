---
title: Installing Capacitor
description: Installing Capacitor
slug: /getting-started
---

# Installing Capacitor

This guide will help you install Capacitor into an existing frontend web app.

> If starting a new app, we recommend using the documentation from your JavaScript framework of choice and then following this guide to integrate Capacitor.
>
> You can also create a new basic app with `npm init @capacitor/app`.

Capacitor provides a native mobile runtime and API layer for web apps. It does not come with any specific set of UI controls. We recommend you use a mobile component framework (such as [Ionic Framework](https://ionicframework.com/)).

## Before you start

Make sure your [environment is set up](/main/getting-started/environment-setup.md) for the platforms you will be building for.

## Project Requirements

Capacitor was designed to drop into any modern JavaScript web app. Projects must meet the following requirements:

- Must have a `package.json` file.
- Must have a separate directory for web assets.
- Must have an `index.html` file with a `<head>` tag in the root of the web assets directory.

## Adding Capacitor to your app

In the root of your app, install Capacitor:

```bash
npm install @capacitor/core
npm install @capacitor/cli --save-dev
```

Then, initialize Capacitor using the CLI questionnaire:

```bash
npx cap init
```

The CLI will ask you a few questions, starting with your app name, and the package id you would like to use for your app.

> The `npx cap` command is how Capacitor is executed locally on the command-line in your project. [Learn more about the Capacitor CLI](/cli/index.md).

## Where to go next

[Get started with iOS &#8250;](/main/ios/index.md)

[Get started with Android &#8250;](/main/android/index.md)

[Developer Workflow Guide &#8250;](/main/basics/workflow.md)
