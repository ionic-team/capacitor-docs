---
title: In App Purchases
description: How to register and consume In App Purchases in your Capacitor app or game
contributors:
  - mlynch
slug: /guides/in-app-purchases
---

# In App Purchases in Capacitor

Most apps need to create and consume In App Purchases in order to generate revenue and enable upgrades. Adding In App Purchase support to your Capacitor app is straightforward, but requires a fair amount of work configuring and registering your own app products.

To do this, we will use the [cordova-plugin-purchase](https://github.com/j3k0/cordova-plugin-purchase) plugin.

```shell
npm install cordova-plugin-purchase
npx cap update
```

## Setting up products and consumables

The bulk of the work in setting up In App Purchases in your Capacitor app comes in registering your products and consumables for iOS and Android, and then setting up the proper flow to register and consume those items in your app.

This is a fairly complicated process, and we recommend the following guides as next steps:

- [In App Purchase Plugin Guide](https://purchase.cordova.fovea.cc/)
- [How to use In App Purchase with Capacitor](https://devdactic.com/ionic-in-app-purchase-capacitor/)
