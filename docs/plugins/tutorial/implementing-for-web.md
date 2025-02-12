---
title: Building a Capacitor Plugin
description: Building a Capacitor Plugin - Implementing for Web/PWA
contributors:
  - eric-horodyski
sidebar_label: Implementing for Web/PWA
slug: /plugins/tutorial/web
---

# Implementing for Web/PWAs

While designing the plugin’s API, we found out that the web already supports screen orientation functionality (except on mobile devices, of course). You might be asking why what would be the purpose for our plugin to have a web implementation...couldn’t you programmatically detect if the user is on the web and use the <a href="https://whatwebcando.today/screen-orientation.html" target="_blank">Screen Orientation Web API</a>, otherwise, use the plugin?

The mantra behind Web Native applications is "write once, run anywhere." This applies to plugins as well; developers using Capacitor plugins ought to be able to use the same plugin class and methods and have them implemented for all platforms.

Therefore, we will be good developer-citizens and wrap the Screen Orientation Web API inside the web implementation of the `ScreenOrientation` plugin.

## Extending Capacitor’s WebPlugin class

Open a new file `src/plugins/screen-orientation/web.ts`. This file is where we will write the web implementation of the `ScreenOrientation` plugin.

Start by declaring the `ScreenOrientationWeb` class, and have it extend `WebPlugin`:

```typescript
import { WebPlugin } from '@capacitor/core';
import type { ScreenOrientationPlugin } from './definitions';

export class ScreenOrientationWeb extends WebPlugin {
  constructor() {
    super();
  }
}
```

Capacitor’s `WebPlugin` class contains logic to notify any plugin listeners, which we’ll use to tell them when the screen orientation has changed. Let’s notify any listeners when the Screen Orientation Web API’s change event fires. Update the constructor like so:

```typescript
constructor() {
   super();
   window.screen.orientation.addEventListener("change", () => {
     const type = window.screen.orientation.type;
     this.notifyListeners("screenOrientationChange", { type });
   });
 }
```

The `WebPlugin` class contains an implementation for the `addListener()` and `removeAllListeners()` methods defined in the `ScreenOrientationPlugin` interface. No additional work is needed to use those methods.

## Implement the remaining methods

Let’s finish implementing the `ScreenOrientationPlugin` interface. Start by adjusting the class definition so that it _actually_ implements the interface:

```typescript
export class ScreenOrientationWeb
  extends WebPlugin
  implements ScreenOrientationPlugin
{
```

Then implement the remaining methods as part of the `ScreenOrientationWeb` class:

```typescript
 async orientation(): Promise<ScreenOrientationResult> {
    if (typeof screen === 'undefined' || !screen.orientation) {
      throw this.unavailable(
        'ScreenOrientation API not available in this browser',
      );
    }
    return { type: screen.orientation.type };
  }

 async lock(options: OrientationLockOptions): Promise<void> {
    if (
      typeof screen === 'undefined' ||
      !screen.orientation ||
      !screen.orientation.lock
    ) {
      throw this.unavailable(
        'ScreenOrientation API not available in this browser',
      );
    }
    try {
      await screen.orientation.lock(options.orientation);
    } catch {
      throw this.unavailable(
        'ScreenOrientation API not available in this browser',
      );
    }
  }

 async unlock(): Promise<void> {
    if (
      typeof screen === 'undefined' ||
      !screen.orientation ||
      !screen.orientation.unlock
    ) {
      throw this.unavailable(
        'ScreenOrientation API not available in this browser',
      );
    }
    try {
      screen.orientation.unlock();
    } catch {
      throw this.unavailable(
        'ScreenOrientation API not available in this browser',
      );
    }
  }
```

## Registering the web implementation

To register `ScreenOrientationWeb` as our plugin’s web implementation, we need to use the second input parameter of `registerPlugin()`. Open `src/plugins/screen-orientation/index.ts` and update the declaration of the `ScreenOrientation` variable like so:

```typescript
const ScreenOrientation = registerPlugin<ScreenOrientationPlugin>(
  'ScreenOrientation',
  {
    web: () => import('./web').then(m => new m.ScreenOrientationWeb()),
  },
);
```

## Give it a test drive!

Test out the web implementation. Serve your application using `ionic serve`, and you can use your browser’s Development Tools to emulate a mobile device in both portrait and landscape screen orientations. The “Rotate my Device” button doesn’t function as there is poor web support for `window.screen.orientation.lock()`, but you should be able to see the different designs if you manually rotate the orientation using the developer tooling.

One platform implemented, two to go! Before diving into iOS and Android code, we should consider how to pattern and abstract it. Let’s review some patterns in the next step: code abstraction patterns.
