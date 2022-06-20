---
title: Known Incompatible Cordova Plugins
description: Known Incompatible Cordova Plugins
contributors:
  - dotNetkow
---

# Known Incompatible Cordova Plugins

While we've tested a number of popular Cordova plugins, it's possible Capacitor doesn't support every Cordova plugin. Some don't work with Capacitor or Capacitor provides a conflicting alternative. If it's known that the plugin is conflicting or causes build issues, it will be skipped when running `npx cap update`.

If you find an issue with an existing Cordova plugin, please [let us know](https://github.com/ionic-team/capacitor/issues/new) by providing the issue's details and plugin information.

## Known incompatible plugins (Subject to change)

- cordova-plugin-add-swift-support (not needed, Capacitor has built in Swift support)
- cordova-plugin-admobpro ([see details](https://github.com/ionic-team/capacitor/issues/1101))
- cordova-plugin-braintree ([see details](https://github.com/ionic-team/capacitor/issues/1415))
- cordova-plugin-code-push ([see details](https://github.com/microsoft/code-push/issues/615))
- cordova-plugin-compat (not needed)
- cordova-plugin-console (not needed, Capacitor has its own)
- cordova-plugin-crosswalk-webview (Capacitor doesn't allow to change the webview)
- cordova-plugin-fcm ([see details](https://github.com/ionic-team/capacitor/issues/584))
- cordova-plugin-firebase ([see details](https://github.com/ionic-team/capacitor/issues/815))
- cordova-plugin-ionic-keyboard (not needed, Capacitor has it's own)
- cordova-plugin-ionic-webview (not needed, Capacitor uses WKWebView)
- cordova-plugin-music-controls (causes build failures, skipped)
- cordova-plugin-qrscanner ([see details](https://github.com/ionic-team/capacitor/issues/1213))
- cordova-plugin-splashscreen (not needed, Capacitor has its own)
- cordova-plugin-statusbar (not needed, Capacitor has its own)
- cordova-plugin-wkwebview-engine (not needed, Capacitor uses WKWebView)
- cordova-plugin-googlemaps (causes build failures on iOS, skipped for iOS only)
- cordova-plugin-lottie-splashscreen (it's incompatible and some further work is needed)
