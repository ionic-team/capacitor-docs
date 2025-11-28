---
title: Capacitor Plugins
description: Capacitor Plugins
sidebar_label: Official Plugins
contributors:
  - mlynch
  - jcesarmobile
  - ehorodyski-ionic
slug: /apis
---

# Official Plugins

The Official Plugins are a set of Capacitor plugins maintained by the Capacitor team that provide access to commonly used native APIs.

The API documentation for these plugins can be found below.

## Versioning

### npm Tags (`latest` and `latest-X`)

Capacitor provides special npm distribution tags to make installing compatible plugin versions easier.

- The `latest` tag installs the most recent plugin version available.
- Use `latest-X` (for example, `latest-7`) to install the most recent version of official Capacitor plugins compatible with Capacitor X.
- These tags express Capacitor version compatibility, not the plugin's own version number. A plugin may be at v2 or v3 and still be the correct release for `latest-7`.
- These tags are intended for use in `npm install` commands and will resolve to the appropriate range in your `package.json`.
- This tagging convention applies to official Capacitor plugins and may not be consistently supported by community plugins.

**Example:**
```bash
npm install @capacitor/camera@latest
# example: v8.0.1
npm install @capacitor/device@latest-7
# example: v7.0.2
```

## List of Official Plugins

- [Action Sheet](/apis/action-sheet.md)
- [App Launcher](/apis/app-launcher.md)
- [App](/apis/app.md)
- [Background Runner](/apis/background-runner.md)
- [Barcode Scanner](/apis/barcode-scanner.md)
- [Browser](/apis/browser.md)
- [Camera](/apis/camera.md)
- [Clipboard](/apis/clipboard.md)
- [Cookies](/apis/cookies.md)
- [Device](/apis/device.md)
- [Dialog](/apis/dialog.md)
- [Filesystem](/apis/filesystem.md)
- [File Transfer](/apis/file-transfer.md)
- [File Viewer](/apis/file-viewer.md)
- [Geolocation](/apis/geolocation.md)
- [Google Maps](/apis/google-maps.md)
- [Haptics](/apis/haptics.md)
- [Http](/apis/http.md)
- [InAppBrowser](/apis/inappbrowser.md)
- [Keyboard](/apis/keyboard.md)
- [Local Notifications](/apis/local-notifications.md)
- [Motion](/apis/motion.md)
- [Network](/apis/network.md)
- [Preferences](/apis/preferences.md)
- [Privacy Screen](/apis/privacy-screen.md)
- [Push Notifications](/apis/push-notifications.md)
- [Screen Orientation](/apis/screen-orientation.md)
- [Screen Reader](/apis/screen-reader.md)
- [Share](/apis/share.md)
- [Splash Screen](/apis/splash-screen.md)
- [Status Bar](/apis/status-bar.md)
- [System Bars](/apis/system-bars.md)
- [Text Zoom](/apis/text-zoom.md)
- [Toast](/apis/toast.md)
- [Watch 🧪](/apis/watch.md)

## GitHub

You can find the source for these plugins [on GitHub](https://github.com/ionic-team/capacitor-plugins).
