---
title: Migrating Strategy
description: Migration Strategy
contributors:
  - dotNetkow
slug: /cordova/migration-strategy
---

# Migration Strategy

Migrating from Cordova to Capacitor can occur over time or can be fully replaced in many cases. The effort involved will largely depend on the complexity of the app.

## Why Migrate?

Long-term stability and peace of mind.

Capacitor is [backed by Ionic](https://ionicframework.com/), a long-term contributor to Cordova and the larger open source ecosystem. Ionic still uses Cordova heavily and will continue to invest in the platform for a long time to come.

It's backward-compatible with Cordova, so you can comfortably switch your existing web apps to it whenever you're ready. Capacitor was designed from the start to support the rich Cordova plugin ecosystem out of the box. Thus, using Cordova plugins in Capacitor is easy.

## Why Use Ionic Framework with Capacitor?

Capacitor is the officially supported native runtime for Ionic Framework. Using Ionic and Capacitor together is the best way to build a great app experience, since Ionic Framework provides UI and UX enhancements that Capacitor does not have. Additionally, it works with your favorite web app framework, including Angular, React, and Vue.

With the release of Capacitor, Ionic now controls almost all of its technology stack. When you build an Ionic app today, we now control the native runtime layer (Capacitor), the UI controls ([Ionic Framework](https://ionicframework.com)), and the "framework" used to build the controls (web components powered by [Stencil](https://stenciljs.com/)). This is significant: If there's an issue in any part of the stack that we control, we can fix it right away. The only part we don't control is the frontend framework you use on top (Angular, React, Vue, or plain JavaScript).

## Migration Process Overview

### Utilize the Ionic VS Code Extension

The [Ionic VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ionic.ionic) provides tools to help assist your migration from Cordova to Capacitor by installing Capacitor's dependencies, replacing equivalent plugins, and more. It is a helpful tool that will automate much of the process of moving to Capacitor.

### Audit Then Migrate Existing Cordova Plugins

Begin by auditing your existing Cordova plugins. It's possible that you may be able to remove ones that are no longer needed.

Next, review all of Capacitor's [official plugins](/plugins/official.md) as well as [community plugins](/plugins/community.md). You may be able to switch to the Capacitor-equivalent Cordova plugin.

Some plugins may not match functionality entirely, but based on the features you need that may not matter.

### Continue to Use Cordova if Needed

To leverage Cordova plugins in your Capacitor app, [see here](/plugins/cordova.md). If a replacement plugin doesn't exist, continue to use the Cordova plugin as-is. If there's a plugin you'd like to see supported, open a [plugin proposal](https://github.com/capacitor-community/proposals)!

Ready to [migrate to Capacitor](/main/cordova/migrating-from-cordova-to-capacitor.md)?
