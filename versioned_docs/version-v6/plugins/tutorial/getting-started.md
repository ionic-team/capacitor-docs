---
title: Building a Capacitor Plugin
description: Building a Capacitor Plugin
contributors:
  - eric-horodyski
sidebar_label: Getting Started
slug: /plugins/tutorial/introduction
---

# Building a Capacitor Plugin

Capacitor provides a comprehensive Plugin API to use when adding native functionality to a Capacitor app.

There are two types of Capacitor plugins: a _local plugin_ is custom native code isolated to a particular Capacitor application, residing within the native projects committed as part of source control. A _global plugin_ is a published npm package that developers can add to any Capacitor application.

In this tutorial, we will start with a blank Capacitor application and add native code to it to build a local plugin. Then we will package it up into a global plugin, ready to be published.

## So, what are we going to build?

Pretend that you work for a delivery carrier, and the application you wrote lets drivers obtain signatures from customers, confirming they have received their deliveries. The legal team noticed customer signatures were of poor quality because drivers had customers sign in portrait mode. They’ve tasked you to force the app into landscape mode when capturing signatures.

The plugin we build will implement **screen orientation** features to accommodate this request:

- The device’s current **orientation** will be detected, with differing UIs for portrait and landscape mode.
- Users will be given the option to rotate and **lock** their screen orientation to landscape mode.
- After a signature has been confirmed, the app will **unlock** screen orientation rotation.

For this tutorial, we will mock up a signature pad but only build out screen orientation functionality.

This `ScreenOrientation` plugin will work across the web, iOS, and Android platforms.

## Getting started

Clone <a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial" target="_blank">this repository</a> and check out the `start` branch. Run `npm install` at the root of the project.

> This tutorial uses `@ionic/react` to build the user interface. If you are not familiar with React or the Ionic Framework, that’s OK! The concepts covered apply to Capacitor apps using any TypeScript-enabled web framework.

Add both the iOS and Android platforms to the Capacitor app:

```bash
npm run build
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
npx cap sync
```

Now that we have a Capacitor app in place with native platforms added, we’re ready to move on to the first step of building a plugin: designing the API.
