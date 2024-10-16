---
title: Capacitor Web Documentation
description: Web Getting Started
sidebar_label: Getting Started
slug: /web
contributors:
  - mlynch
---

# Using Capacitor in a Web Project

Capacitor fully supports traditional web and Progressive Web Apps. In fact, using Capacitor makes it easy to ship a PWA version of your iOS and Android app store apps with minimal work.

## Browser Support

Capacitor core and plugins build for ES2017. This newer JavaScript syntax is supported in all modern browsers (including those that power PWAs on iOS and Android), but will not work in IE11 without additional JavaScript transformations, e.g. with [Babel](https://babeljs.io).

Plugins with web support will perform feature detection and throw exceptions if a browser does not support a particular Web API.

## Installation

If you're already building with Capacitor for iOS or Android, there are no additional installation steps!

Otherwise, see the [Installation](/main/getting-started/installation.md) guide before continuing.

### Using Capacitor as a Module

Most commonly, apps will be using a framework with a build system that supports importing JavaScript modules. By importing from `@capacitor/core`, or by importing a plugin, the Capacitor JavaScript runtime will be loaded with your app.

### Using Capacitor as a Script Include

To use the Capacitor runtime in a web app that is not using a build system or bundler/module loader, do the following:

1. Set `bundledWebRuntime` to `true` in the [Capacitor configuration file](/main/reference/config.md)

```json
"bundledWebRuntime": true
```

2. Copy the Capacitor runtime bundle (`capacitor.js`) into your web assets directory

```bash
npx cap sync web
```

3. Import `capacitor.js` in `index.html` before other JavaScript

```html
<script src="capacitor.js"></script>
<script src="your/app.js"></script>
```

## Going Live

When you're ready to publish your Progressive Web App and share it with the world, just upload the contents of your web assets directory.

That will contain everything you need to run your app!
