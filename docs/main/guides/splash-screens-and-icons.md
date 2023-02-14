---
title: Splash Screens and Icons
description: Use capacitor-assets to generate resource images for native projects
contributors:
  - dotNetkow
  - dereklowlind
slug: /guides/splash-screens-and-icons
---

# Creating Splash Screens and Icons

Initial support for splash screen and icon generation is now available. For complete details, see the [capacitor-assets docs]([https://github.com/ionic-team/cordova-res](https://github.com/ionic-team/capacitor-assets)).

First, install `capacitor-assets`:

```bash
npm install @capacitor/assets
```

To use `capacitor-assets` in the recommended easy mode, place one icon and optionally one dark mode icon file in a top-level folder named `assets` or `resouces` within your project, like so:

```
assets/
├── logo.png
└── logo-dark.png (optional)
```

Next, run the following to generate all images then copy them into the native projects:

```bash
npx capacitor-assets generate
```
