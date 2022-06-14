---
title: Building a Capacitor Plugin
description: Building a Capacitor Plugin - Packaging the Plugin
contributors:
  - eric-horodyski
sidebar_label: Packaging the Plugin
slug: /plugins/tutorial/packaging-the-plugin
---

# Packaging the Plugin

The `ScreenOrientation` plugin is functionally complete and integrated into the Capacitor application as a local plugin. However, the `ScreenOrientation` plugin can’t be used by other Capacitor applications in its current state.

Let’s go ahead and package the plugin for publishing to make the `ScreenOrientation` plugin globally available.

> **Note:** This section references steps and procedures from the <a href="https://capacitorjs.com/docs/plugins/creating-plugins" target="_blank">Creating Capacitor Plugins</a> portion of the Capacitor documentation. Please refer to the documentation for details beyond the scope of this tutorial.

## Generating a new plugin project

Capacitor has a <a href="https://github.com/ionic-team/create-capacitor-plugin" target="_blank">a plugin generator</a> we can use to scaffold a project in a format suitable for publishing a global plugin.

In a new terminal, run the following command:

```bash
npx @capacitor/create-plugin \
  --name @capacitor-community/screen-orientation \
  --package-id io.ionic.plugins.screenorientation \
  --class-name ScreenOrientation \
  --repo "https://ionic.io" \
  --license "MIT" \
  --description "Work with the screen orientation in a common way for iOS, Android, and web"
```

When prompted to provide a directory, use the default by pressing Enter. When asked for the author’s name, use your own!

## Port the plugin code

Take a look at the generated project’s structure; it looks very similar to the structure built for the Capacitor application, doesn't it? 🤔

Obviously, this was intentional to easily port plugin code from the Capacitor application’s codebase into the generated plugin project.

Copy the contents of the files in `src/plugins/screen-orientation` into their equivalent `web.ts`, `index.ts`, and `definitions.ts` files in the plugin project.

Next, copy the contents of `ScreenOrientation.swift`, `ScreenOrientationPlugin.m`, and `ScreenOrientationPlugin.swift` from one codebase to the other.

Then, do the same for `ScreenOrientation.java` and `ScreenOrientationPlugin.java`. Afterward, update the package of these files in the plugin project:

```java
package io.ionic.plugins.screenorientation
```

The package name above was supplied when generating the plugin project, and any Android files in the project should use this package name.

Finally, let’s verify that no issues occurred when porting over the code by running the following command:

```bash
npm run verify
```

> **Note:** You can test the plugin before publishing it by linking the plugin folder to a Capacitor project. See <a href="https://capacitorjs.com/docs/plugins/workflow#local-testing" target="_blank">Plugin Development Workflow</a> for details.

## Update the plugin documentation

Take a look at the plugin project’s `README.md` file; it was updated to document the plugin’s API. This update happened when we ran `npm run verify`. Any changes made to source file JSDoc comments can be reflected within the readme file’s API section by running `npm run docgen`.

The plugin requires developers to modify their Capacitor application’s `AppDelegate.swift` file, so instructions on how to do so should be included in the plugin’s documentation.

> **Note:** Always document any modifications developers will need to make when installing or configuring plugins you build.

Replace the “Install” section of `README.md` with the following markdown:

## Install

```bash
npm install @capacitor-community/screen-orientation
npx cap sync
```

### iOS

For iOS, you must make the following adjustments to your `AppDelegate.swift` file:

```diff
import UIKit
+ import CapacitorCommunityScreenOrientation

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
+   func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -\> UIInterfaceOrientationMask {
+     return ScreenOrientationPlugin.supportedOrientations
+  }
}
```

## Publishing the plugin

The plugin is in a state where it can be published to an npm registry. We won’t do that in this tutorial, but note that the command to publish a Capacitor plugin project is the same as publishing any other npm package: `npm publish`.

You can publish a global Capacitor plugin to the public npm registry, a private registry, or just link it to a bunch of projects locally on your machine. Whatever fits your use-case.

What’s more, there is a <a href="https://github.com/capacitor-community/welcome" target="_blank">Capacitor Community GitHub organization</a> where you can get your plugin hosted and work closely with the community and Capacitor team as you continue development and maintenance on your plugin.

## Conclusion

Capacitor’s Plugin API is a flexible and robust solution to supplement Capacitor applications with native functionality unavailable to the web, whether the need is to add custom native code to a specific application or reuse native code between a fleet of apps.

Looking forward to the plugin you develop next! 🎉
