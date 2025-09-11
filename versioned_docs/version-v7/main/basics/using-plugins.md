---
title: Using Plugins
description: How to use plugins in Capacitor
slug: /basics/using-plugins
---

# Using Plugins

The WebView and the Capacitor runtime communicate through the use of **Capacitor Plugins**. Plugins provide access to native APIs such as camera, geolocation, and filesystem access in your web app.

## Capacitor Plugins

The Capacitor team maintains [a set of Capacitor plugins](/plugins/official.md) for commonly used APIs. There is also a large set of Capacitor plugins available from [the Capacitor Community](https://github.com/capacitor-community/). If you have a suggestion for a Capacitor plugin, you can use [the Capacitor Community proposals repo](https://github.com/capacitor-community/proposals/).

[Learn more about Capacitor plugins &#8250;](/plugins.mdx)

:::info
Do you want to **make** Capacitor plugins? Browse the same proposal repo and try to make one [following our plugin creation guides](/plugins/creating-plugins/overview.md)!
:::

## Cordova Plugins

Can't find the exact Web API or Capacitor plugin for your project? Or maybe you're [migrating off of Cordova and onto Capacitor](/main/cordova/migration-strategy.md)? Capacitor has a Cordova compatibility layer that attempts to mimic Cordova plugin functionality. Capacitor has compatibility with most Cordova plugins, but there may be additional steps when installing them.

[Learn more about using Cordova plugins in Capacitor apps &#8250;](/plugins/cordova.md)

:::info
If you use a Cordova plugin because you weren't able to find a suitable Capacitor plugin, would you mind [creating a proposal for the Capacitor Community](https://github.com/capacitor-community/proposals/)?
:::
