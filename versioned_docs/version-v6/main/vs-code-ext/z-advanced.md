---
title: Advanced Topics
description: Visual Studio Code Extension for Capacitor
contributors:
  - dtarnawsky
slug: /vscode/advanced
---

The extension has some advanced features that you may be interested in.

### Exporting Project Information

Click `Configuration` > `Export` to create a markdown file that describes the dependencies and plugins of your project. This includes the version number used and latest version available. 

If a recommendation is made it will be described. A list of files in your project that do not match the standard naming convention will also be listed.


### Keyboard Shortcuts

The following keyboard shortcuts can be used:

| Mac Shortcut | Windows Shortcut | Action |
| --- | --- | ----------- |
| `⌥` + R | `ALT` + R | Run the app |
| `⌥` + B | `ALT` + B | Build the app for web |
| `⌥` + D | `ALT` + D | Debug the app for web |

### Set Android Studio Location

The extension will guess the location of Android Studio to be able to find the location for Java. You can set an alternative location by clicking `Settings` > `Advanced` and setting `Java Home` to another path. The default location is usually `/Applications/Android Studio.app/Contents/jbr/Contents/Home`.

### Set Shell Path

The default shell is `/bin/sh` on a Mac or `cmd` on Windows. You can change the default shell used by clicking `Setting` > `Advanced` and setting `Shell Path`. For example: `/bin/zsh`.

### ADB Path

ADB is used when debugging Android devices. The Location of the Android Debug Bridge (ADB) can be change by clicking `Settings` > `Advanced` and setting `Adb Path`.

### Other Features

Click the `...` button next to `Project` to show a list of expermental features:
- **Migrate from NPM to PNPM** - Your project will be switched to use pnpm as its package manager.
- **Switch from WebPack to ESBuild** - Your Angular project will be switched to use the ESBuild option.
- **Rebuild Node Modules** - The `node_modules` folder will be deleted and `npm install` will be run to restore the folder.
