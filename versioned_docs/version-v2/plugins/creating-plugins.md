---
title: Creating Capacitor Plugins
description: Creating Capacitor Plugins
contributors:
  - mlynch
  - jcesarmobile
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/plugins/creating-plugins
---

# Creating Capacitor Plugins

Plugins in Capacitor enable JavaScript to interface directly with Native APIs.

Capacitor comes with a Plugin generator to start new plugins quickly. To use it, run

```bash
npx @capacitor/cli@2.4.7 plugin:generate
```

This starts a wizard prompting you for information about your new plugin. For example:

```bash
npx @capacitor/cli@2.4.7 plugin:generate
✏️  Creating new Capacitor plugin
? Plugin NPM name (kebab-case): my-plugin
? Plugin id (domain-style syntax. ex: com.example.plugin) com.ionicframework.myplugin
? Plugin class name (ex: AwesomePlugin) MyPlugin
? description:
? git repository:
? author:
? license: MIT
? package.json will be created, do you want to continue? (Y/n)
```

- `Plugin NPM name`: a kebab-case name of a package that will be available on npm (not a strict requirement if your package will be on a private npm repo).
- `Plugin ID`: a domain-style identifier. It is primarily used for the package name in Java.
- `Plugin Class Name`: the initial name of the class used in Java and Swift. See the additional note about class names in the [iOS Plugin](./ios) section of this guide.
- `description`: a brief introduction about the plugin.
- `git repository`: the URL to a git repository where the source code of the plugin will be hosted.
- `author` (optional): the name of the plugin creator in `package.json`.
- `license` (optional): the license under which the plugin is bound. MIT license is the default.
- `package.json will be created`: enter "Y" and/or hit Enter/Return to finish plugin setup.

## Next steps

Now it's up to you to make your plugin do something truly awesome! [Read on](./workflow) to learn how to implement new functionality, test the plugin locally, and publish it on npm.

Afterward, check out the details covering how to build for each platform. Follow the [iOS](./ios) guide for information on using Swift (or Obj-C) to build an iOS plugin, the [Android](./android) guide for building Android plugins with Java, the [Web](./web) guide for implementing web and PWA functionality for your plugin, and the [Custom JavaScript](./js) guide for information on how to build a custom JavaScript plugin (i.e. in addition to Capacitor's auto-JS plugin binding).
