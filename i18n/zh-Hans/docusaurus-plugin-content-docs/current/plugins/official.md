---
title: Capacitor 插件
description: Capacitor 插件
sidebar_label: 官方插件
contributors:
  - mlynch
  - jcesarmobile
  - ehorodyski-ionic
slug: /apis
---

# 官方插件

官方插件是一组由 Capacitor 团队维护的 Capacitor 插件，提供对常用原生 API 的访问。

这些插件的 API 文档可以在下面找到。

## 版本控制

### npm 标签 (`latest` 和 `latest-X`)

Capacitor 提供特殊的 npm 分发标签，以使安装兼容的插件版本更容易。

- `latest` 标签安装可用的最新插件版本。
- 使用 `latest-X`(例如 `latest-7`)安装与 Capacitor X 兼容的最新官方 Capacitor 插件版本。
- 这些标签表示 Capacitor 版本兼容性，而不是插件自己的版本号。插件可能处于 v2 或 v3，但仍然是 `latest-7` 的正确版本。
- 这些标签旨在用于 `npm install` 命令，并将解析为 `package.json` 中的适当范围。
- 此标签约定适用于官方 Capacitor 插件，可能不会在社区插件中一致支持。

**示例:**
```bash
npm install @capacitor/camera@latest
# 示例: v8.0.1
npm install @capacitor/device@latest-7
# 示例: v7.0.2
```

## 官方插件列表

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

您可以在 [GitHub](https://github.com/ionic-team/capacitor-plugins) 上找到这些插件的源代码。
