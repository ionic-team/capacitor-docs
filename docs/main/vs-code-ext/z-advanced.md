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

### Migrate from NPM to PNPM

- Click the `...` button next to `Project`. 
- Choose `Migrate to PNPM` to migrate from npm to pnpm. 

The extension will then use pnpm commands instead of npm.

### Rebuilding Node Modules

- Click the `...` button next to `Project`. 
- Choose `Rebuild Node Modules`.

The `node_modules` folder will be deleted and `npm install` will be run to restore the folder.

### Set Android Studio Location

The extension will guess the location of Android Studio to be able to find the location for Java. You can set an alternative location by clicking `Settings` > `Advanced` and setting `Java Home` to another path. The default location is usually `/Applications/Android Studio.app/Contents/jre/Contents/Home`.

### Set Shell Path

The default shell is `/bin/sh` on a Mac or `cmd` on Windows. You can change the default shell used by clicking `Setting` > `Advanced` and setting `Shell Path`. For example: `/bin/zsh`.

### ADB Path

ADB is used when debugging Android devices. The Location of the Android Debug Bridge (ADB) can be change by clicking `Settings` > `Advanced` and setting `Adb Path`.
