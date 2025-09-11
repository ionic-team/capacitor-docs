---
title: Building a Capacitor Plugin
description: Building a Capacitor Plugin - Using the Plugin API
contributors:
  - eric-horodyski
sidebar_label: Using the Plugin API
slug: /plugins/tutorial/using-the-plugin-api
---

# Using the Plugin API

It makes sense to build out a user interface that exercises the plugin’s API before implementing screen orientation functionality. Essentially, we want to rig up a testing harness that allows us to test feature parity across platforms quickly.

The focus of this walkthrough is how to build a Capacitor plugin, not how to build an Ionic Framework application, so you can just take the finished versions of the files needed and copy and paste their contents into your project:

- <a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial/blob/main/src/pages/Home.tsx" target="_blank">src/pages/Home.tsx</a>
- <a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial/blob/main/src/pages/Home.css" target="_blank">src/pages/Home.css</a>

Once copied over, serve the Capacitor app using the `ionic serve` command. Open up the browser’s Developer Tools, and you should see the following error:

```bash
Uncaught (in promise) ScreenOrientation does not have web implementation.
```

That error checks out; we haven’t implemented code for any of the platforms yet. Keep the browser open. We will implement the web platform first. Before we do, let’s review relevant code from `Home.tsx`.

## How is the plugin being used?

**Tracking the screen orientation:**

```typescript
const [orientation, setOrientation] = useState<string>('');
```

The `orientation` state variable is used to hold the value of the screen’s orientation. It can be updated by calling `setOrientation`. Since we don’t know the current screen orientation when the code starts executing, it’s defaulted to an empty string. A string type is used to make it easier to tell the UI which design to display.

An event listener is established that updates `orientation` when `screenOrientationChange` is fired.

```typescript
ScreenOrientation.addListener('screenOrientationChange', res =>
  setOrientation(res.type),
);
```

The current screen orientation is obtained when the UI loads, and any listeners created (like the one above) are removed when the UI is removed from the DOM.

```typescript
useEffect(() => {
  ScreenOrientation.orientation().then(res => setOrientation(res.type));

  return () => {
    ScreenOrientation.removeAllListeners();
  };
}, []);
```

Please don’t read too much into `useEffect` and the return function; those are React-specific syntax rules.

**Showing the correct design:**

The `OrientationType` has two values for portrait orientation: `portrait-primary` and `portrait-secondary`. The same goes for landscape orientation. Our UI doesn’t care about the difference between them, only if it is landscape or portrait.

```jsx
{
  orientation.includes('portrait') &&
    {
      /* Provide a button that will rotate and lock the screen orientation to landscape mode. */
    };
}
{
  orientation.includes('landscape') &&
    {
      /* Let the user "sign" and unlock screen orientation through a confirmation button. */
    };
}
```

**Locking and unlocking screen orientation:**

The portrait design contains a button that will change the screen orientation and lock it when pressed.

```typescript
onClick={() => ScreenOrientation.lock({ orientation: "landscape-primary" })}
```

Conversely, the landscape design contains a button that will unlock the screen orientation when pressed.

```typescript
onClick={() => ScreenOrientation.unlock()}
```

The rest of the code in `Home.tsx` and `Home.css` is purely cosmetic; we do not need to dig into that. Run `npm run build` so the new UI is used when we run the app on iOS or Android.

We now have a user interface that exercises our plugin’s API, so let’s start implementing functionality! We will target the web first in our next step: the web implementation.
