---
title: Migrate from Cordova
description: Visual Studio Code Extension for Capacitor
contributors:
  - dtarnawsky
slug: /vscode/cordova
---

The extension automates the experience of migrating from Cordova to Capacitor. Most Cordova plugins will work in a Capacitor application but the extension will suggest recommendations for improvement as well.

## Migrating

The `Capacitor Migration` section will appear if Cordova is detected:
1. Click each item and choose an action (`Uninstall`, `Upgrade` or `Ignore`).
2. Finally click [`Remove Cordova`](#remove-cordova) to finalize the migration.

:::note
Capacitor will work with most Cordova plugins and there are only a few Cordova plugins that are incompatible and will require you to refactor your code after migration.
:::

### Unneeded Plugins
Cordova plugins that you **no longer need** will be flagged and you can click `Uninstall` to remove them.

### Incompatible Plugins
Cordova plugins that are on a known **[incompatible list](https://capacitorjs.com/docs/plugins/cordova#known-incompatible-plugins)** will be flagged. There may be Capacitor equivalents, your code will need to be refactored.

### Better Plugins
Cordova plugins that have **better** equivalent Capacitor plugins will show as optional suggestions (light bulb icon). A **better** plugin is defined as one that has official support from the Capacitor team. Some Cordova plugins have been deprecated or are no longer maintained, we track these and provide suggestions for alternatives.

### Remove Cordova

The final step of migration is to choose the **Remove Cordova** item which will backup your `config.xml` and remove the `cordova` section from `package.json`. After this you'll see additional features appear like debugging and running.
