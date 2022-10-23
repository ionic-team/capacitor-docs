---
title: Splash Screens and Icons
description: Use @capacitor/assets to generate resource images for native projects
contributors:
  - dotNetkow
  - bechtold
slug: /guides/splash-screens-and-icons
---

# Creating Splash Screens and Icons

This tool will crop and resize JPEG and PNG source images to generate icons and splash screens for iOS, Android, and Progressive Web Apps. For complete details, see the [capacitor assets docs](https://github.com/ionic-team/capacitor-assets).

First, install `capacitor-assets`:

```bash
npm install @capacitor/assets
```

## [Easy Mode](https://github.com/ionic-team/capacitor-assets#usage---easy-mode)

The tool expects a `assets` or `resources` folder to exist in the root of the project.

```
assets/
├── logo.png
└── logo-dark.png
```

Then, generate the assets and provide the background colors that will be used to generate background layers for icons:

```shell
npx capacitor-assets generate --iconBackgroundColor '#eeeeee' --iconBackgroundColorDark '#222222' --splashBackgroundColor '#eeeeee' --splashBackgroundColorDark '#111111'
```

## [Custom Mode](https://github.com/ionic-team/capacitor-assets#usage---custom-mode)

Please provide custom icons and splash screen source images as shown below:
```
assets/
├── icon-only.png
├── icon-foreground.png
├── icon-background.png
├── splash.png
└── splash-dark.png
```

Then generate:
```shell
npx capacitor-assets generate
```
