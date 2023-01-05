---
title: Splash Screens and Icons
description: Use Capacitor Assets to generate resource images for native projects
contributors:
  - dotNetkow
  - indiebloom
slug: /guides/splash-screens-and-icons
---

# Creating Splash Screens and Icons

Initial support for splash screen and icon generation is now available. For complete details, see [Capacitor Assets]([https://github.com/ionic-team/cordova-res](https://github.com/ionic-team/capacitor-assets)).

First, install `@capacitor/assets`:

```bash
npm install @capacitor/assets
```

`@capacitor/assets` expects a Cordova-like structure: place one icon and one splash screen file in a top-level `assets` or `resources` folder within your project, like so:

```
resources/
├── icon.png
└── splash.png
```

Next, run the following to generate all images then copy them into the native projects:

```bash
npx capacitor-assets generate
```
