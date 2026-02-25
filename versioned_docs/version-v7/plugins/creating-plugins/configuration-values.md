---
title: Configuration Values
description: Capacitor Plugin Configuration Values
contributors:
  - eric-horodyski
sidebar_label: Configuration Values
slug: /plugins/configuration-values
---

# Configuration Values

When developing plugins, you can provide configuration values developers can set that impact how the plugin behaves at runtime. An example of a plugin configuration value is `launchShowDuration`, available through the `@capacitor/splash-screen` plugin, which sets how long to show the splash screen before hiding.

Capacitor plugin configuration values get set as part of the `plugins` property of a Capacitor configuration file.

## Defining Configuration Values

A Capacitor plugin can access configuration values defined under the plugin's name in the `plugins` property of a Capacitor configuration file.

```typescript
{
  appId: 'com.company.app',
  ...
  plugins: {
    MyCoolPlugin: {
      style: "dark",
      iconColor: '#FF0000'
    }
  }
}
```

In the example above, the native implementation of the MyCoolPlugin plugin can access the configured values of `style` and `iconColor`.

Capacitor configuration files support TypeScript. While not required, providing typing information defining and documenting configuration values available for your plugin is recommended.

You can provide typing for your plugin's configuration values by extending the `PluginsConfig` interface provided by `@capacitor/cli`.

```typescript
/// <reference types="@capacitor/cli" />

declare module '@capacitor/cli' {
  export interface PluginsConfig {
    MyCoolPlugin?: {
      /**
       * Override the cool theme style if your app doesn't support light/dark theme changes.
       *
       * @since 1.0.0
       * @example "light"
       */
      style?: 'dark' | 'light';

      /**
       * Color of the cool icon in hex format, #RRGGBB or #RRGGBBAA.
       *
       * @since 1.0.0
       * @default #ffffff
       * @example "#FF9900"
       */
      iconColor?: string;
    };
  }
}
```

We recommend placing this typing definition within your plugin's `definitions.ts` file. For your plugin consumers to access this typing information, they must be using TypeScript for their Capacitor configuration file and need to add a reference to the plugin's types in `capacitor.config.ts`:

```typescript
/// <reference types="@capacitor-community/my-cool-plugin" />
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "com.company.app",
  ...
  plugins: {
    MyCoolPlugin: {
      style: "dark",
      iconColor: "#034821"
    }
  }
}
export default config;
```

## Accessing Configuration Values

The Capacitor API contains the `getConfig()` utility method to access plugin configuration values from the native implementation of your plugin.

For iOS:

```swift
if let style = getConfig().getString("style") {
  // Set the style
}
```

For Android:

```Java
String style = getConfig().getString("style");
if(style) {
  // Set the style
}
```

Please note that you cannot enforce plugin consumers to provide configuration values, and plugin consumers can pass invalid data (especially if they use JSON-based Capacitor configuration).

As a plugin developer, it is up to you to provide adequate documentation surrounding your plugin’s configuration values and gracefully fall back if plugin consumers do not provide configuration values or provide them with invalid input.
