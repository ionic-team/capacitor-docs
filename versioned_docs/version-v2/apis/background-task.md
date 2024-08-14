---
title: Background Tasks
description: Background Task API
contributors:
  - mlynch
  - jcesarmobile
---

<plugin-platforms platforms="ios,android"></plugin-platforms>

# Background Tasks

The Background Task API makes it easy to run background tasks. Currently, this plugin
supports running a task when the app is backgrounded, and soon will support periodic background
fetch operations.



- [`beforeExit(...)`](#beforeexit)
- [`finish(...)`](#finish)
- [Interfaces](#interfaces)



## Background Task Guidelines

Mobile operating systems have strict, constantly changing guidelines for background tasks. Running
indefinitely in the background is limited to apps that need to play audio, maintain VoIP connections,
track geolocation for navigation purposes, and a limited set of other tasks. All other apps should
expect to perform periodic, short background tasks, such as finishing an upload when the app goes to the
background, and periodically syncing data.

Plugins that claim to offer infinite background operation outside of those core use cases _will cause App Store rejections_! This limitation is the same for developers using any mobile app technology, not just Capacitor.

Generally, Android is less strict about background tasks, but your app should code to the lowest common denominator
in order to be a good actor on all platforms.

NOTE: On iOS `setTimeout` and `setInterval` won't work once your app is in background, so don't use them inside `beforeExit`.

## Example

```typescript
import { Plugins } from '@capacitor/core';

const { App, BackgroundTask } = Plugins;

App.addListener('appStateChange', state => {
  if (!state.isActive) {
    // The app has become inactive. We should check if we have some work left to do, and, if so,
    // execute a background task that will allow us to finish that work before the OS
    // suspends or terminates our app:

    let taskId = BackgroundTask.beforeExit(async () => {
      // In this function We might finish an upload, let a network request
      // finish, persist some data, or perform some other task

      // Example of long task
      var start = new Date().getTime();
      for (var i = 0; i < 1e18; i++) {
        if (new Date().getTime() - start > 20000) {
          break;
        }
      }
      // Must call in order to end our task otherwise
      // we risk our app being terminated, and possibly
      // being labeled as impacting battery life
      BackgroundTask.finish({
        taskId,
      });
    });
  }
});
```

## API




### beforeExit(...)

```typescript
beforeExit(cb: Function) => CallbackID
```

When the app is backgrounded, this method allows you to run a short-lived
background task that will ensure that you
can finish any work your app needs to do (such as finishing an upload
or network request). This is especially important on iOS as any operations
would normally be suspended without initiating a background task.

This method should finish in less than 3 minutes or your app risks
being terminated by the OS.

When you are finished, this callback _must_ call `BackgroundTask.finish({ taskId })`
where `taskId` is the value returned from `BackgroundTask.beforeExit()`

| Param    | Type                                          | Description                                                              |
| -------- | --------------------------------------------- | ------------------------------------------------------------------------ |
| **`cb`** | <code><a href="#function">Function</a></code> | the task to run when the app is backgrounded but before it is terminated |

**Returns:** <code>string</code>

---

### finish(...)

```typescript
finish(options: { taskId: CallbackID; }) => void
```

Notify the OS that the given task is finished and the OS can continue
backgrounding the app.

| Param         | Type                             |
| ------------- | -------------------------------- |
| **`options`** | `{ taskId: string; }` |

---

### Interfaces

#### Function

Creates a new function.

| Prop            | Type                                          |
| --------------- | --------------------------------------------- |
| **`prototype`** | <code>any</code>                              |
| **`length`**    | <code>number</code>                           |
| **`arguments`** | <code>any</code>                              |
| **`caller`**    | <code><a href="#function">Function</a></code> |

| Method       | Signature                                                                            | Description                                                                                                                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **apply**    | (this: <a href="#function">Function</a>, thisArg: any, argArray?: any) =&gt; any     | Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.                                                                     |
| **call**     | (this: <a href="#function">Function</a>, thisArg: any, ...argArray: any[]) =&gt; any | Calls a method of an object, substituting another object for the current object.                                                                                                                                         |
| **bind**     | (this: <a href="#function">Function</a>, thisArg: any, ...argArray: any[]) =&gt; any | For a given function, creates a bound function that has the same body as the original function. The this object of the bound function is associated with the specified object, and has the specified initial parameters. |
| **toString** | () =&gt; string                                                                      | Returns a string representation of a function.                                                                                                                                                                           |


