---
title: Cordova 插件
description: 使用 Cordova 插件
sidebar_label: Cordova 插件
slug: /plugins/cordova
---

# Cordova 插件

开发使用 Capacitor 的应用时，可以使用 Cordova 插件。

## 安装 Cordova 插件

Capacitor 插件使用常规包管理器安装，然后同步到原生项目。Cordova 插件在 Capacitor 中的安装过程是相同的。

安装插件，同步，然后完成任何必需的原生项目配置(参见 [变量和 Hooks](#变量和-hooks)):

```bash
npm install cordova-plugin-name
npx cap sync
```

> 如果 Cordova 插件有 [`@awesome-cordova-plugins`](https://ionicframework.com/docs/native) 包装器，您还可以安装它以获得 TypeScript 支持:
>
> ```bash
> npm install @awesome-cordova-plugins/plugin-name
> ```

## 更新 Cordova 插件

使用常规包管理器更新插件。然后，将更新的插件同步到原生项目:

```bash
npm install cordova-plugin-name@version
npx cap sync
```

## 确定已安装的插件版本

查看项目中安装的 Capacitor 和 Cordova 插件列表(及其确切版本号):

```bash
npx cap ls
```

## 兼容性问题

Capacitor 和某些 Cordova 插件可能存在兼容性问题。不应使用许多官方 Cordova 插件，因为 Capacitor 提供[官方替代方案](/plugins/official.md)。使用变量和 hooks 的 Cordova 插件可能部分兼容。某些 Cordova 插件完全不兼容(参见[此列表](#已知不兼容的插件))。

如果您发现现有 Cordova 插件存在问题，请通过提供问题详细信息和插件信息[告诉我们](https://github.com/ionic-team/capacitor/issues/new)。

### 变量和 Hooks {#变量和-hooks}

由于我们的理念是让您控制原生项目源代码(意味着像 hooks 这样的事情是不必要的)，Capacitor 不支持 Cordova 安装变量、自动配置或 hooks。如果您的插件需要设置变量或设置，您需要通过在插件的 `plugin.xml` 和 iOS 和 Android 上的所需设置之间进行映射来手动应用这些配置设置。

请参阅 [iOS](/main/ios/configuration.md) 和 [Android](/main/android/configuration.md) 配置指南，了解如何配置每个平台的信息。

### 已知不兼容的插件

如果插件已知冲突或导致构建问题，则在运行 `npx cap sync` 时将跳过它。

以下是已知不兼容插件的列表:

- [`cordova-plugin-add-swift-support`](https://github.com/akofman/cordova-plugin-add-swift-support) (不需要，Capacitor 内置 Swift 支持)
- [`cordova-plugin-admobpro`](https://github.com/floatinghotpot/cordova-admob-pro) ([参见详细信息](https://github.com/ionic-team/capacitor/issues/1101))
- [`cordova-plugin-braintree`](https://github.com/Taracque/cordova-plugin-braintree) ([参见详细信息](https://github.com/ionic-team/capacitor/issues/1415))
- [`cordova-plugin-code-push`](https://github.com/microsoft/code-push) ([参见详细信息](https://github.com/microsoft/code-push/issues/615))
- [`cordova-plugin-compat`](https://github.com/apache/cordova-plugin-compat) (不需要)
- [`cordova-plugin-console`](https://github.com/apache/cordova-plugin-console) (不需要，Capacitor 有自己的)
- [`cordova-plugin-crosswalk-webview`](https://github.com/crosswalk-project/cordova-plugin-crosswalk-webview) (Capacitor 不允许更改 webview)
- [`cordova-plugin-fcm`](https://github.com/fechanique/cordova-plugin-fcm) ([参见详细信息](https://github.com/ionic-team/capacitor/issues/584))
- [`cordova-plugin-firebase`](https://github.com/arnesson/cordova-plugin-firebase) ([参见详细信息](https://github.com/ionic-team/capacitor/issues/815))
- [`cordova-plugin-ionic-keyboard`](https://github.com/ionic-team/cordova-plugin-ionic-keyboard) (不需要，Capacitor 有自己的)
- [`cordova-plugin-ionic-webview`](https://github.com/ionic-team/cordova-plugin-ionic-webview) (不需要，Capacitor 使用 WKWebView)
- [`cordova-plugin-music-controls`](https://github.com/homerours/cordova-music-controls-plugin) (导致构建失败，跳过)
- [`cordova-plugin-qrscanner`](https://github.com/bitpay/cordova-plugin-qrscanner) ([参见详细信息](https://github.com/ionic-team/capacitor/issues/1213))
- [`cordova-plugin-splashscreen`](https://github.com/apache/cordova-plugin-splashscreen) (不需要，Capacitor 有自己的)
- [`cordova-plugin-statusbar`](https://github.com/apache/cordova-plugin-statusbar) (不需要，Capacitor 有自己的)
- [`cordova-plugin-wkwebview-engine`](https://github.com/apache/cordova-plugin-wkwebview-engine) (不需要，Capacitor 使用 WKWebView)
- [`cordova-plugin-googlemaps`](https://github.com/mapsplugin/cordova-plugin-googlemaps) (在 iOS 上导致构建失败，仅跳过 iOS)
