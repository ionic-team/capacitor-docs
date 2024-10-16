---
title: Recommendations
description: Visual Studio Code Extension for Capacitor
contributors:
  - dtarnawsky
slug: /vscode/recommendations
---

The extension will make recommendations based on experience of common problems discovered by engineers at Ionic. Recommendations appear with a light bulb icon and can either be acted upon or ignored.

## Common Recommendations

The follow scenarios will show a recommendation:
- When packages are deprecated or archived by their author in Github
- When a plugin has a better officially supported Capacitor plugin
- When a plugin has known issues and is no longer maintained by its author
- When a project has problems in its [`browserlist`](https://github.com/browserslist/browserslist) support
- When there are misconfigurations of `angular.json` found
- When versions of Capacitor `cli`, `ios`, `android`, `core` are mismatched
- If an incompatible plugin can be replaced by a Capacitor equivalent
- When a plugins functionality is already built into Capacitor
- When a dependency has been replaced (such as `ionic-native` -> `awesome-cordova-plugins`)
- If a plugin or dependency has known security vulnerabilities that need to be addressed
- When a plugin is not required (eg `cordova-plugin-add-swift-support`)

:::note
Not all scenarios are covered, so if there a fix you've needed to apply to your project that you think would be of benefit to other developers please [submit a suggestion](https://github.com/ionic-team/vscode-ionic/issues).
:::