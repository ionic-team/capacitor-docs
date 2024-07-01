---
title: Creating Capacitor Plugins
description: Creating Capacitor Plugins
contributors:
  - mlynch
  - jcesarmobile
  - dotNetkow
sidebar_label: Overview
slug: /plugins/creating-plugins
---

# Creating Capacitor Plugins

Plugins in Capacitor enable JavaScript to interface directly with Native APIs.

This guide will help you get started creating a shareable Capacitor plugin which will be published on npm. You can also create Capacitor plugins local to your app. See the custom native code guides for [iOS](/main/ios/custom-code.md) and [Android](/main/android/custom-code.md).

## Philosophies

If your plugin is intended for the public, we have a few philosophies about Capacitor plugins to share before you get started.

### Working Together

We believe cooperation is going to yield higher quality plugins than competition. This is one of the reasons we created the [Capacitor Community GitHub organization](https://github.com/capacitor-community), which facilitates easier cooperation among the community than if plugins were hosted in personal repositories.

If a plugin exists for a particular topic within the [Capacitor Community](https://github.com/capacitor-community), please consider contributing to it! If a plugin is missing a primary maintainer, the Capacitor team would be happy to consider adding you to the GitHub organization.

### Small in Scope

We believe Capacitor plugins should be reasonably small in scope. Capacitor plugins add native code to apps that may or may not be used. By keeping the scope of plugins small, we can ensure apps have a minimal amount of native code that they need. This avoids unnecessary app bloat and warnings/rejections from the App Store due to APIs without usage descriptions, etc.

Of course, having a small scope yields other benefits such as quicker deployment, easier cooperation, maintainability, etc.

### Unified and Idiomatic

Capacitor plugins should strive to provide a unified experience across platforms that is familiar to JavaScript developers. This means values from native platforms may need to be coerced.

Here are a few guidelines with examples to demonstrate how to create a unified and idiomatic experience:

- **Prefer `undefined` over `null` and other nonvalues.** Example: If an Android API returns `0.0` to denote "no value", then the value should be coerced to `undefined` for the JavaScript layer.
- **Prefer identical units.** Example: If an iOS API uses Celsius and an Android API uses Fahrenheit, then the value should be coerced to one or the other before it reaches the JavaScript consumer.
- **Prefer ISO 8601 datetimes with timezones over other formats.** Example: It is easy to get an accurate JavaScript `Date` from a string like `"2020-12-13T20:21:58.415Z"`, but confusing if given a Unix timestamp (JavaScript timestamps are in milliseconds). Always include the timezone, otherwise datetimes may be interpreted inaccurately from different locales.

## Plugin Generator

Ready to begin? Capacitor has [a plugin generator](https://github.com/ionic-team/create-capacitor-plugin) that you can use to begin working on your plugin.

> Before continuing, you may want to make sure you're using the latest Node LTS version and npm 6+.

In a new terminal, run the following:

```bash
npm init @capacitor/plugin@latest
```

The generator will prompt you for input. You can also supply command-line options (see the [GitHub repo](https://github.com/ionic-team/create-capacitor-plugin/)).

## Next Steps

[Learn about the Capacitor plugin development workflow &#8250;](/plugins/creating-plugins/development-workflow.md)

[Learn about building Android plugins for Capacitor &#8250;](/plugins/creating-plugins/android-guide.md)

[Learn about building iOS plugins for Capacitor &#8250;](/plugins/creating-plugins/ios-guide.md)

[Learn about building Web/PWA plugins for Capacitor &#8250;](/plugins/creating-plugins/web-guide.md)
