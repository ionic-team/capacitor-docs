---
title: Native Settings
description: Visual Studio Code Extension for Capacitor
contributors:
  - dtarnawsky
slug: /vscode/native-settings
---

Your native projects Version, Bundle Id and Display Name can be easily read and changed.

![Native Settings](/img/native-settings.png)

Click `Configuration` > `Properties` to change:

- **Display Name** - The name shown underneath the icon on the home screen.
- **Bundle Identifier** - The unique identifier for your application.
- **Version Number** - The Major and minor version number (eg `2.5`).
- **Build Number** - The build number usually associated with the version number (eg `3`).

:::note
When changing one of these it will change both the `ios` and `android` native project so that both projects are in sync.
:::
