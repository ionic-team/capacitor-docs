---
title: Capacitor Plugins
description: Capacitor Plugins
contributors:
  - mlynch
  - jcesarmobile
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/plugins
---

# Capacitor Plugins

Plugins in Capacitor enable JavaScript to interface directly with Native APIs.

With Plugins, a web app can access the full power of the Native APIs, doing everything a traditional native app can. Plugins are especially great for wrapping common native operations that might use very different APIs across platforms, while exposing a consistent, cross-platform API to JavaScript.

Additionally, the Plugin capability in Capacitor makes it possible for teams with a mix of traditional native developers and web developers to work together on different parts of the app.

Capacitor auto generates JavaScript hooks on the client, so most plugins only need to build a native Swift/Obj-C plugin for iOS, and/or a Java one for Android. Of course, adding custom JavaScript for a plugin is possible, and is just like providing a JavaScript npm package.
