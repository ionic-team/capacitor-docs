---
title: Plugin Development Workflow
description: Capacitor Plugin Development Workflow
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/plugins/workflow
---

# Plugin Development Workflow

With the new plugin created, you can begin implementing functionality across a variety of platforms.

## Implementing a New Function

Each plugin comes with some TypeScript files that provide typing to TypeScript consumers of your plugin.

Starting with the TypeScript interface is a good way to build out the API for your plugin. For example,
here's the default interface for our Plugin located in `src/definitions.ts`:

```typescript
declare module '@capacitor/core' {
  interface PluginRegistry {
    Echo: EchoPlugin;
  }
}

export interface EchoPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
```

To implement new functionality in your plugin, begin by defining a new function in the exported interface:

```typescript
export interface EchoPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  openMap(location: { latitude: number; longitude: number }): Promise<void>;
}
```

Implement the web implementation in `src/web.ts`:

```typescript
async openMap(location: { latitude: number, longitude: number}): Promise<void> {
  // logic here
}
```

To compile the plugin, navigate into the plugin directory then run:

```bash
$ npm run build
```

Implement [Android functionality](./android) in `android/src/main/[nested folders]/PluginName.java`:

```java
@PluginMethod()
public void openMap(PluginCall call) {
  Double latitude = call.getDouble("latitude");
  Double longitude = call.getDouble("longitude");

  // more logic
}
```

Implement [iOS functionality](./ios) in `ios/Plugin/Plugin.swift`:

```swift
@objc func openMap(_ call: CAPPluginCall) {
  let latitude = call.getString("latitude")
  let longitude = call.getNumber("longitude")

  // more logic
}
```

> Remember to export the plugin to Capacitor (to make it aware of the plugin) on [iOS](/docs/plugins/ios#export-to-capacitor) and [Android](/docs/plugins/android#export-to-capacitor).

## Local Testing

To test the plugin locally while developing it, link the plugin folder to your app project using the [npm link command](https://docs.npmjs.com/cli/link).

First, within the plugin folder, run:

```bash
$ npm link
```

Then, within the project that will test the plugin, run:

```bash
$ npm link plugin-name
$ npm install plugin-name
```

The project's `package.json` file now shows the plugin package link in the dependencies list:

```json
"my-plugin": "file:my-plugin",
```

Finally, run `npx cap sync` to make the native projects aware of your plugin. If it was detected correctly, it will print something similar to:

> Found 1 Capacitor plugin for android: my-plugin (0.0.1)

### Unlinking the Plugin

Once you're done with local testing, be sure to unlink the plugin. Otherwise, subsequent `npm install`s will install the local plugin, not the published version on npm (assuming you publish it).

First, run `npm unlink --no-save plugin-name` in the app project folder.

Next, run `npm unlink` in the plugin folder.

## Publishing

Whenever you are ready to publish your plugin, just use:

```bash
npm publish
```

This will build the JS portion of your plugin and publish the rest of your plugin files to npm.

Your package can now be installed using `npm install your-plugin` in any Capacitor app.
