---
title: Splash Screen & Icon
description: Visual Studio Code Extension for Capacitor
contributors:
  - dtarnawsky
slug: /vscode/splash-icon
---

The extension allows you to set a splash screen and icon image and [generate](https://github.com/ionic-team/capacitor-assets) the necessary assets for your native iOS and Android projects.

### Setting a Splash Screen

- Click `Configuration` > `Splash Screen & Icon`
- Click `Splash Screen` to select a Splash Screen file

Your splash screen should be a 2732 x 2732 pixel png file. After you have set both a Splash and Icon file the extension will generate all necessary assets for the native projects.

### Setting an Icon

- Click `Configuration` > `Splash Screen & Icon`
- Click `Icon` to select an Icon File

Your Icon should be a 1024 x 1024 pixel png file. After you have set both a Splash and Icon file the extension will generate all necessary assets for the native projects.

### Rebuilding Assets

Hover over the `Splash Screen & Icon` item and click the `Rebuild` button to regenerate the assets for the native projects.

### Adaptive Icons

[Adaptive Icons](https://github.com/ionic-team/capacitor-assets#adaptive-icons) are an Android concept used for some Android devices that have either circular or rounded icons. You can define these by clicking `Icon Foreground` or `Icon Background`. Although these are optional, it is recommended to set these.