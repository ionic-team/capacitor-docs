---
title: Plugin Development Workflow
description: Capacitor Plugin Development Workflow
contributors:
  - dotNetkow
sidebar_label: Development Workflow
slug: /plugins/workflow
---

# Plugin Development Workflow

With the new plugin created, you can begin implementing functionality across a variety of platforms.

## Implementing a New Method

To implement new functionality in your plugin, begin by defining the method's signature in the exported TypeScript interface for your plugin in `src/definitions.ts`.

In the example below, the `openMap()` method is added which takes a `latitude` and `longitude`. It is good practice to define interfaces for method parameters that can be imported and used in apps.

```diff
 export interface EchoPlugin {
   echo(options: { value: string }): Promise<{ value: string }>;
+  openMap(options: OpenMapOptions): Promise<void>;
 }

+export interface OpenMapOptions {
+  latitude: number;
+  longitude: number;
+}
```

Implement the web implementation in `src/web.ts`:

```diff
 import type {
   EchoPlugin,
+  OpenMapOptions,
 } from './definitions';

 export class EchoWeb extends WebPlugin implements EchoPlugin {
   // other methods

+  async openMap(location: OpenMapOptions): Promise<void> {
+    // logic here
+  }
 }
```

To compile the plugin, navigate into the plugin directory then run:

```bash
npm run build
```

Implement [Android functionality](./android) in `android/src/main/[nested folders]/EchoPlugin.java`:

```java
@PluginMethod()
public void openMap(PluginCall call) {
  Double latitude = call.getDouble("latitude");
  Double longitude = call.getDouble("longitude");

  // more logic

  call.resolve();
}
```

Implement [iOS functionality](./ios) in `ios/Sources/EchoPlugin/EchoPlugin.swift`:

```swift
@objc func openMap(_ call: CAPPluginCall) {
  let latitude = call.getString("latitude")
  let longitude = call.getNumber("longitude")

  // more logic

  call.resolve()
}
```

> Remember to [register plugin methods](/plugins/creating-plugins/ios-guide.md#export-to-capacitor) in your `.swift` file.

This example contains the most common type of method in plugins but details about all the supported types [can be found here.](/plugins/creating-plugins/method-types.md)

## Local Testing

To test the plugin locally while developing it, link the plugin folder to your app using `npm install` with the path to your plugin.

```bash
npm install ../path/to/echo
```

The project's `package.json` file now shows the plugin package link in the dependencies list:

```json
"echo": "file:../path/to/echo",
```

Finally, run `npx cap sync` to make the native projects aware of your plugin. If it was detected correctly, it will print something like this:

```bash
[info] Found 1 Capacitor plugin for android:
    - echo (0.0.1)
```

### Unlinking the Plugin

To unlink the local plugin from your app, use `npm uninstall` with the package name of your plugin.

```bash
npm uninstall echo
```

## Package Scripts

The plugin template ships with a variety of scripts in `package.json`.

- `verify`: builds and tests web and native code
- `lint`: lints web and native code
- `fmt`: autoformats web and native code
- `docgen`: generates documentation from plugin interface (see [Documentation](#documentation))
- `build`: builds web code into ESM and bundle distributions

## Documentation

To document plugin functionality, add [JSDoc](https://jsdoc.app) comment blocks to methods and properties.

> It is usually not necessary to include type information with the `@param` and `@returns` JSDoc tags in TypeScript files.

Using our `openMap()` method as an example, open `src/definitions.ts` and start documenting!

```diff
 export interface EchoPlugin {
   echo(options: { value: string }): Promise<{ value: string }>;

+  /**
+   * Opens the map at a given location.
+   *
+   * @since 1.1.0
+   */
   openMap(options: OpenMapOptions): Promise<void>;
 }

 export interface OpenMapOptions {
+  /**
+   * The latitude at which to open the map.
+   */
   latitude: number;

+  /**
+   * The longitude at which to open the map.
+   */
   longitude: number;
 }
```

The plugin template ships with [`@capacitor/docgen`](https://github.com/ionic-team/capacitor-docgen), which writes generated documentation to `README.md`. Documentation is generated during `npm run build`. You can also run it manually:

```bash
npm run docgen
```

## Publishing

Whenever you are ready to publish your plugin, just use:

```bash
npm publish
```

This will build the JS portion of your plugin and publish the rest of your plugin files to npm.

Your package can now be installed using `npm install echo` in any Capacitor app.
