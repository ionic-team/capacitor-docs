---
title: Building a Capacitor Plugin
description: Building a Capacitor Plugin - Designing the Plugin API
contributors:
  - eric-horodyski
sidebar_label: Designing the Plugin API
slug: /plugins/tutorial/designing-the-plugin-api
---

# Designing the Plugin API

The first - and arguably most important - step when building a Capacitor plugin is to design the API. The API is the contract we will adhere to when writing each platform’s specific implementation.

We can define the plugin API using TypeScript; it will serve as our contract when implementing and provides the niceties that come with TypeScript, such as code completion and type checking.

## Wait, do you even need a plugin for that?

Believe it or not, modern web browsers can do many things that we think of as “native functionality,” such as checking battery status, speech recognition, and, yes, screen orientation. It’s not uncommon when building Web Native applications to see functionality that once required plugins to access are now available as Web APIs.

> Before building a plugin for a particular feature, we recommend checking out sites such as <a href="https://whatwebcando.today/" target="_blank">What Web Can Do Today</a> to see if the functionality you are looking for is already available as a Web API.

If screen orientation already has a Web API, why would we go out of our way to build one? Taking a look at the <a href="https://whatwebcando.today/screen-orientation.html" target="_blank">Screen Orientation Web API</a> we can see that iOS does not implement the API (as of this writing), which means we will need to provide the implementation ourselves. As it relates to Android, we could just use the Screen Orientation Web API when our app runs on the Android platform - but we will implement screen orientation functionality natively for educational purposes.

## Defining the ScreenOrientation API

We might not be able to use the Screen Orientation Web API outright, but we can model our plugin’s API against it:

| Method Name        | Input Parameters                            | Return Value                                           |
| ------------------ | ------------------------------------------- | ------------------------------------------------------ |
| orientation        |                                             | `Promise<ScreenOrientationResult>`                   |
| lock               | `options: OrientationLockOptions`      | `Promise<void>`                                        |
| unlock             |                                             | `Promise<void>`                                        |
| addListener        | `(orientation: ScreenOrientationResult)` | `Promise<PluginListenerHandle>` |
| removeAllListeners |                                             | `Promise<void>`                                        |

There is an added advantage here; we can use the `OrientationType` type available through TypeScript’s existing DOM typings. `OrientationLockType` is no longer available since Typescript 5.2+, so we will be providing a definition for it.

Let's set up a directory to hold our plugin API. Create a new subfolder `src/plugins/screen-orientation` and add the following files within:

- `definitions.ts`
- `index.ts`

Populate `definitions.ts` with the following code:

```typescript
import type { PluginListenerHandle } from '@capacitor/core';

export interface OrientationLockOptions {
  /**
   * Note: Typescript v5.2+ users should import OrientationLockType from @capacitor/screen-orientation.
   */
  orientation: OrientationLockType;
}

export type OrientationLockType =
  | 'any'
  | 'natural'
  | 'landscape'
  | 'portrait'
  | 'portrait-primary'
  | 'portrait-secondary'
  | 'landscape-primary'
  | 'landscape-secondary';

export interface ScreenOrientationResult {
  type: OrientationType;
}

export interface ScreenOrientationPlugin {
  /**
   * Returns the screen's current orientation.
   */
  orientation(): Promise<ScreenOrientationResult>;

  /**
   * Locks the screen orientation.
   */
  lock(options: OrientationLockOptions): Promise<void>;

  /**
   * Unlocks the screen's orientation.
   */
  unlock(): Promise<void>;

  /**
   * Listens for screen orientation changes.
   */
  addListener(
    eventName: 'screenOrientationChange',
    listenerFunc: (orientation: ScreenOrientationResult) => void,
  ): Promise<PluginListenerHandle>;

  /**
   * Removes all listeners
   */
  removeAllListeners(): Promise<void>;
}
```

## Registering the ScreenOrientation plugin

In order to use the plugin in the Capacitor application, we need to register it using the `registerPlugin()` module exported from `@capacitor/core`.

Populate `index.ts` with the following code:

```typescript
import { registerPlugin } from '@capacitor/core';

import type { ScreenOrientationPlugin } from './definitions';

const ScreenOrientation = registerPlugin<ScreenOrientationPlugin>(
  'ScreenOrientation',
  {
    web: () => import('./web').then(m => new m.ScreenOrientationWeb()),
  },
);

export * from './definitions';
export { ScreenOrientation };
```

The code above creates an object linked to our plugin's implementation code.

Designing the API is complete; let’s build a user interface that will call it. In doing so, we will make testing easier as we implement each platform integration. Our next step: using the plugin API.
