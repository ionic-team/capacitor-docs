---
title: Capacitor Web/PWA Plugin Guide
description: Capacitor Web/PWA Plugin Guide
contributors:
  - mlynch
  - jcesarmobile
  - dotNetkow
sidebar_label: Web/PWA Guide
slug: /plugins/web
---

# Capacitor Web/PWA Plugin Guide

Capacitor utilizes a web/native compatibility layer, making it easy to build plugins that have functionality when running natively as well as when running in a PWA on the Web.

## Getting Started

To get started, first generate a plugin as shown in the [Getting Started](/plugins/creating-plugins/overview.md#plugin-generator) section of the Plugin guide.

Next, open `echo/src/web.ts` in your editor of choice.

## Example

The basic structure of a web plugin for Capacitor looks like this:

```typescript
import { WebPlugin } from '@capacitor/core';

import type { EchoPlugin } from './definitions';

export class EchoWeb extends WebPlugin implements EchoPlugin {
  async echo(options: { value: string }) {
    console.log('ECHO', options);
    return options;
  }
}
```

The `EchoPlugin` interface defines the method signatures of your plugin. In TypeScript, we can ensure the web implementation (the `EchoWeb` class) correctly implements the interface.

## Permissions

If your plugin has functionality on web that requires permissions from the end user, then you will need to implement the permissions pattern.

### Aliases

You will need to develop one or more aliases for abstracting and grouping permissions that your plugin requires. These aliases are used to convey permission state. By default, an alias can be in one of the following states:

- `granted`: Every permission in this alias has been granted by the end user (or prompting is not necessary).
- `denied`: One or more permissions in this alias have been denied by the end user.
- `prompt`: The end user should be prompted for permission, because it has neither been granted nor denied.
- `prompt-with-rationale`: The end user has denied permission before, but has not blocked the prompt yet.

These are represented by the `PermissionState` type exported from `@capacitor/core`.

It is also possible to define custom states for aliases, if need be. For example, the official [Camera plugin](/apis/camera.md) also defines a `limited` state for the `camera` and `photos` aliases.

Aliases are cross-platform, so make sure to take iOS, Android, and web permissions into account when deciding on the aliases for your plugin.

### Permission Status Definitions

In `src/definitions.ts`, import `PermissionState` from Capacitor and define a `PermissionStatus` interface which represents the status of permissions in your plugin, keyed by the alias(es) you came up with.

In the example below, the permission status can be entirely represented by a `location` alias which can be `granted`, `denied`, etc.

```typescript
import type { PermissionState } from '@capacitor/core';

export interface PermissionStatus {
  // TODO: change 'location' to the actual name of your alias!
  location: PermissionState;
}
```

Then, add the definitions for `checkPermissions()` and `requestPermissions()` in your plugin interface. Both of these methods will return the current status of permissions in your plugin as defined by `PermissionStatus`.

```diff
 export interface EchoPlugin {
   echo(options: { value: string }): Promise<{ value: string }>;
+  checkPermissions(): Promise<PermissionStatus>;
+  requestPermissions(): Promise<PermissionStatus>;
 }
```

Because these methods are added to your plugin interface, they must be implemented on all platforms that your plugin supports.

### Implementing Permissions

In `src/web.ts`, add the `checkPermissions()` and `requestPermissions()` methods to your web implementation.

```diff
+import { PermissionStatus } from './definitions';

 export class EchoWeb extends WebPlugin implements EchoPlugin {
   async echo(options: { value: string }) {
     ...
   }

+  async checkPermissions(): Promise<PermissionStatus> {
+    // TODO
+  }

+  async requestPermissions(): Promise<PermissionStatus> {
+    // TODO
+  }
 }
```

#### `checkPermissions()`

This method should return the current status of permissions in your plugin. This information may be available on the specific web API directly, or from the [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API).

Remember, when working with web APIs with spotty browser adoption (such as the Permissions API), you should implement feature detection and throw an appropriate error when the end user's browser is not supported.

```diff
 async checkPermissions(): Promise<PermissionStatus> {
+  if (typeof navigator === 'undefined' || !navigator.permissions) {
+    throw this.unavailable('Permissions API not available in this browser.');
+  }

   const permission = await navigator.permissions.query( ... );

   // TODO
 }
```

#### `requestPermissions()`

This method should prompt the end user for permission to use the platform APIs that your plugin requires. Then, it should return the new state of permissions in your plugin after prompting (just like with the `checkPermissions()` method).

On web, is it sometimes not possible to separate the requesting of permission from the actual call. For example, the Geolocation API only requests permission at the time a location is requested. For situations like this, we recommended throwing the unimplemented exception.

```typescript
async requestPermissions(): Promise<PermissionStatus> {
  // TODO: does the web support requesting permissions for my plugin?
  throw this.unimplemented('Not implemented on web.');
}
```

## Error Handling

Capacitor plugins for web often work with APIs that haven't been adopted in some browsers or even remotely standardized. Despite this, it is common to take a best-effort approach for the web implementation of your plugin and gracefully fail when APIs are unavailable. This is why error handling is especially important on web!

### Unavailable

This error should be thrown to indicate that the functionality can't be used right now.

Reasons for this include:

- It is currently missing a prerequisite, such as network connectivity.
- It requires a browser that has implemented the underlying API.

In the example below, we first check that `geolocation` is defined on `navigator`. If it does not, it means the browser does not support Geolocation and we should throw the "unavailable" error. Otherwise, we can proceed with the implementation.

```typescript
async getLocation(): Promise<Location> {
  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    throw this.unavailable('Geolocation API not available in this browser.');
  }

  // TODO: actual web implementation
}

```

### Unimplemented

This error can be thrown to indicate that the functionality is not implemented. You can use this to stub out your methods on web for a later implementation or use it to indicate the functionality can't be implemented on a certain platform.

```typescript
async getLocation(): Promise<Location> {
  throw this.unimplemented('Not implemented on web.');
}
```
