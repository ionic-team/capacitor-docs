---
title: Capacitor Web/PWA Plugin Guide
description: Capacitor Web/PWA Plugin Guide
contributors:
  - mlynch
  - jcesarmobile
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/plugins/web
---

# Capacitor Web/PWA Plugin Guide

Capacitor utilizes a web/native compatibility layer, making it easy to build plugins that have functionality when running natively, as well as when running in a PWA on the Web.

## Getting Started

To get started, first generate a plugin as shown in the [Getting Started](creating-plugins.md) section of the Plugin guide.

Next, open `your-plugin/src/web.ts` in your editor of choice.

## Example

The basic structure of a Web plugin looks like this, follow the comments inline for
more explanation:

```typescript
import { WebPlugin } from '@capacitor/core';
import { MyPlugin } from './definitions';

export class MyPluginWeb extends WebPlugin implements MyPlugin {
  constructor() {
    // Call super with the name of our plugin (this should match the native name),
    // along with the platforms this plugin will activate on. For example, it's possible
    // to use a web plugin for Android and iOS by adding them to the platforms list (lowercased)
    super({
      name: 'MyPlugin',
      platforms: ['web'],
    });
  }

  async echo(options: { value: string }) {
    console.log('ECHO', options);
    return options;
  }
}

// Instantiate the plugin
const MyPlugin = new MyPluginWeb();

// Export the plugin
export { MyPlugin };

// Register as a web plugin
import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(MyPlugin);
```

Finally, make sure your `src/index.ts` has this line:

```typescript
export * from './definitions';
export * from './web';
```

## Usage

Custom Capacitor plugins are merged into Capacitor Core and thus are accessed through object destructuring. To use a plugin's features in a PWA, import the plugin package in addition to importing from Capacitor Core.

> If you don't import the plugin, `registerWebPlugin` won't get called, resulting in Capacitor not finding the web implementation. Native implementations are automatically detected by Capacitor.

```typescript
// Import plugins from Capacitor Core
import { Plugins } from '@capacitor/core';
// Import custom plugin package for web support too
import 'my-plugin';

// Destructure custom plugin from core plugins
const { MyPlugin } = Plugins;
await MyPlugin.echo({
  value: 'Hello from web!',
});
```
