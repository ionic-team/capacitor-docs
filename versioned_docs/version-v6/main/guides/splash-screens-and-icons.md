---
title: Splash Screens and Icons
description: Use @capacitor/assets to generate resource images for native projects
contributors:
  - dotNetkow
slug: /guides/splash-screens-and-icons
---

You can generate Splash Screens and Icons for your iOS, Android or Progressive Web Application using the [@capacitor/assets](https://github.com/ionic-team/capacitor-assets) tool.

First, install `@capacitor/assets`:

```bash
npm install @capacitor/assets --save-dev
```

Provide icon and splash screen source images using this folder/filename structure:
```
assets/
├── icon-only.png
├── icon-foreground.png
├── icon-background.png
├── splash.png
└── splash-dark.png
```
- Icon files should be at least `1024px` x `1024px`. 
- Splash screen files should be at least `2732px` x `2732px`. 
- The format can be `jpg` or `png`.

Then generate (which applies to your native projects or generates a PWA manifest file):
```shell
npx capacitor-assets generate
```

Alternatively you can generate for a specific platform with `--ios`, `--android` or `--pwa`.

:::note
The [VS Code Extension](../vs-code-ext/0-getting-started.mdx) can also generate Splash Screen and Icon assets.
:::

## Android 12+
In Android 12 and above Google changed the way Splash Screens are displayed, using a smaller icon with colored background instead of a full screen image that was possible with Android 11 and below. Additional documentation about this change can be found at [developer.android.com](https://developer.android.com/develop/ui/views/launch/splash-screen).
