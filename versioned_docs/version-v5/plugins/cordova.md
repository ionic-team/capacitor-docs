---
title: Cordova Plugins
description: Using Cordova Plugins
sidebar_label: Cordova Plugins
slug: /plugins/cordova
---

# Cordova Plugins

When developing an app that uses Capacitor, it's possible to use Cordova plugins.

## Installing Cordova Plugins

Capacitor plugins are installed using your regular package manager and then synced to the native project(s). The installation process is the same for Cordova plugins in Capacitor.

Install the plugin, sync, and then finish any required native project configuration (see [Variables and Hooks](/plugins/cordova.md#variables-and-hooks)):

```bash
npm install cordova-plugin-name
npx cap sync
```

> If the Cordova plugin has an [`@awesome-cordova-plugins`](https://ionicframework.com/docs/native) wrapper, you can also install it for TypeScript support:
>
> ```bash
> npm install @awesome-cordova-plugins/plugin-name
> ```

## Updating Cordova Plugins

Use your regular package manager to update plugins. Then, sync the updated plugin to the native project(s):

```bash
npm install cordova-plugin-name@version
npx cap sync
```

## Determining Installed Plugin Version

See the list of Capacitor and Cordova plugins (and their exact version numbers) installed in your project with:

```bash
npx cap ls
```

## Compatibility Issues

There may be compatibility issues with Capacitor and some Cordova plugins. Many of the official Cordova plugins should not be used, as Capacitor offers [official alternatives](/plugins/official.md). Cordova plugins that use variables and hooks may be partially compatible. Some Cordova plugins are completely incompatible (see [this list](/plugins/cordova.md#known-incompatible-plugins)).

If you find an issue with an existing Cordova plugin, please [let us know](https://github.com/ionic-team/capacitor/issues/new) by providing the issue's details and plugin information.

### Variables and Hooks

Capacitor does not support Cordova install variables, auto configuration, or hooks, due to our philosophy of letting you control your native project source code (meaning things like hooks are unnecessary). If your plugin requires variables or settings to be set, you'll need to apply those configuration settings manually by mapping between the plugin's `plugin.xml` and required settings on iOS and Android.

Consult the [iOS](/main/ios/configuration.md) and [Android](/main/android/configuration.md) configuration guides for info on how to configure each platform.

### Known Incompatible Plugins

If a plugin is known to conflict or cause build issues, it will be skipped when running `npx cap sync`.

Here is a list of known incompatible plugins:

- [`cordova-plugin-add-swift-support`](https://github.com/akofman/cordova-plugin-add-swift-support) (not needed, Capacitor has built in Swift support)
- [`cordova-plugin-admobpro`](https://github.com/floatinghotpot/cordova-admob-pro) ([see details](https://github.com/ionic-team/capacitor/issues/1101))
- [`cordova-plugin-braintree`](https://github.com/Taracque/cordova-plugin-braintree) ([see details](https://github.com/ionic-team/capacitor/issues/1415))
- [`cordova-plugin-code-push`](https://github.com/microsoft/code-push) ([see details](https://github.com/microsoft/code-push/issues/615))
- [`cordova-plugin-compat`](https://github.com/apache/cordova-plugin-compat) (not needed)
- [`cordova-plugin-console`](https://github.com/apache/cordova-plugin-console) (not needed, Capacitor has its own)
- [`cordova-plugin-crosswalk-webview`](https://github.com/crosswalk-project/cordova-plugin-crosswalk-webview) (Capacitor doesn't allow to change the webview)
- [`cordova-plugin-fcm`](https://github.com/fechanique/cordova-plugin-fcm) ([see details](https://github.com/ionic-team/capacitor/issues/584))
- [`cordova-plugin-firebase`](https://github.com/arnesson/cordova-plugin-firebase) ([see details](https://github.com/ionic-team/capacitor/issues/815))
- [`cordova-plugin-ionic-keyboard`](https://github.com/ionic-team/cordova-plugin-ionic-keyboard) (not needed, Capacitor has it's own)
- [`cordova-plugin-ionic-webview`](https://github.com/ionic-team/cordova-plugin-ionic-webview) (not needed, Capacitor uses WKWebView)
- [`cordova-plugin-music-controls`](https://github.com/homerours/cordova-music-controls-plugin) (causes build failures, skipped)
- [`cordova-plugin-qrscanner`](https://github.com/bitpay/cordova-plugin-qrscanner) ([see details](https://github.com/ionic-team/capacitor/issues/1213))
- [`cordova-plugin-splashscreen`](https://github.com/apache/cordova-plugin-splashscreen) (not needed, Capacitor has its own)
- [`cordova-plugin-statusbar`](https://github.com/apache/cordova-plugin-statusbar) (not needed, Capacitor has its own)
- [`cordova-plugin-wkwebview-engine`](https://github.com/apache/cordova-plugin-wkwebview-engine) (not needed, Capacitor uses WKWebView)
- [`cordova-plugin-googlemaps`](https://github.com/mapsplugin/cordova-plugin-googlemaps) (causes build failures on iOS, skipped for iOS only)
