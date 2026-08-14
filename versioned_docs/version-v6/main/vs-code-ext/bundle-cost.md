---
title: Bundle Analysis
description: Visual Studio Code Extension for Capacitor
contributors:
  - dtarnawsky
slug: /vscode/bundle
---

Keeping the amount of Javascript and Assets in your application to a minimum will help improve startup and runtime performance.

You can use the extension to analyze what Javascript bundles and Assets contribute to the _bloat_ of your application to help decide if current or new dependencies should be used or removed.

## Bundle Cost

Click `Configuration` > `Statistics` to see a page breaking down the the size of each Javascript Bundle.

- You can click a bundle to `expand` or `collapse` it showing what bundles are inside.
- Clicking a bundle will visit the compiled javascript file
- The process of bundle analysis will build your application in production with source maps turned on.

:::note
The process shows all built bundles. This does not mean that all bundles will be loaded at runtime. For example the `Ionic Core` bundle shows **all** Ionic components, whereas your app will only load components it **uses** at runtime.
:::

## Asset Cost

Click `Configuration` > `Statistics` to see a page (you will need to scroll down) breaking down the the size of all assets in your app. 

This includes fonts, icons, style sheets, images and other files.

Use this tool to identify:
- Fonts that are too large, or have formats that you do not need (eg `ttf` when you already have `woff2` or `woff` versions)
- Images that are too large, perhaps using inappropriate image formats (eg using a `png`, `gif` for a photographic image)

:::note
All assets are shown. Not all assets are loaded at runtime. For example [Ionicons](https://ionic.io/ionicons/) may show hundreds of icons but only the icons you use in your app will be loaded).
:::