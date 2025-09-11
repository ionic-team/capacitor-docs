---
title: Capacitor's JavaScript API
description: Capacitor's JavaScript API
slug: /basics/utilities
sidebar_label: JavaScript API
---

# Capacitor's JavaScript API

Capacitor has several JavaScript functions available to ensure apps run successfully across multiple platforms with the same codebase.

## The Global Capacitor object

You can import the global Capacitor object with the following code:

```typescript
import { Capacitor } from '@capacitor/core';
```

The `Capacitor` object has several functions that help with the most common WebView to Native problems you may face when developing a Capacitor app.

### Capacitor.convertFileSrc

`convertFileSrc: (filePath: string) => string;`

Converts a device filepath into a Web View-friendly path.

Capacitor apps are served on a different protocol than device files. To avoid difficulties between these protocols, paths to device files must be rewritten. For example, on Android, `file:///path/to/device/file` must be rewritten as `http://localhost/_capacitor_file_/path/to/device/file` before being used in the Web View.

```typescript
// file:///path/to/device/photo.jpg
const rawPhotoUri = await Filesystem.writeFile({
  path: "myFile.jpg",
  data: base64Data,
  directory: FilesystemDirectory.Data
});

// http://localhost/path/to/device/photo.jpg
const fixedPhotoUri = Capacitor.convertFileSrc(rawPhotoUri.uri),
```

### Capacitor.getPlatform

`getPlatform: () => 'web' | 'ios' | 'android';`

Get the name of the Platform the app is currently running on. This will return a value of `"web"`, `"ios"`, or `"android"` depending on the device the app is running on.

```typescript
if (Capacitor.getPlatform() === 'ios') {
  console.log('iOS!');
} else if (Capacitor.getPlatform() === 'android') {
  console.log('Android!');
} else {
  console.log('Web!');
}
```

### Capacitor.isNativePlatform

`isNativePlatform: () => boolean;`

Check whether the currently running platform is native. This function returns a value of `true` if the app is running as a native, installed Capacitor app, or `false` if it is served via a browser or installed as a PWA.

```typescript
if (Capacitor.isNativePlatform()) {
  console.log("I'm a native app!");
} else {
  console.log("I'm a PWA or Web app!");
}
```

### Capacitor.isPluginAvailable

`isPluginAvailable: (name: string) => boolean;`

Check if a plugin is available on the currently running platform. The plugin name is used in the plugin registry, which means it also works with custom plugins.

```typescript
const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // Have the user upload a file instead
} else {
  // Otherwise, make the call:
  const image = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
  });
}
```
