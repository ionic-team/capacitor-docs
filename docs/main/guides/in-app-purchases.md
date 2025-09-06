---
title: In App Purchases
description: 如何在您的 Capacitor 应用或游戏中注册和使用应用内购买功能
contributors:
  - mlynch
slug: /guides/in-app-purchases
---

# Capacitor 中的应用内购买

大多数应用需要通过创建和使用应用内购买（In App Purchases）来产生收入并支持功能升级。为您的 Capacitor 应用添加应用内购买功能流程清晰，但需要投入大量工作来配置和注册您的应用产品。

为此，我们将使用 [cordova-plugin-purchase](https://github.com/j3k0/cordova-plugin-purchase) 插件。

```shell
npm install cordova-plugin-purchase
npx cap update
```

## 设置产品和消耗型商品

在 Capacitor 应用中设置应用内购买的主要工作量在于为 iOS 和 Android 平台注册您的产品和消耗型商品，然后在应用中建立正确的流程来注册和使用这些项目。

这是一个相对复杂的过程，我们推荐您参考以下指南作为后续步骤：

- [应用内购买插件指南](https://purchase.cordova.fovea.cc/)
- [如何在 Capacitor 中使用应用内购买功能](https://devdactic.com/ionic-in-app-purchase-capacitor/)