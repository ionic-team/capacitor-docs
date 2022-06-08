---
title: JavaScript Utilities
description: Capacitor's JavaScript Utilities
contributors:
  - dotNetkow
---

# JavaScript Utilities

Capacitor has several JavaScript utilities useful for ensuring apps run successfully across multiple platforms with the same codebase. To use them, import Capacitor then call the desired utility function:

```typescript
import { Capacitor } from '@capacitor/core';
const isAvailable = Capacitor.isPluginAvailable('Camera');
```

## convertFileSrc

`convertFileSrc: (filePath: string) => string;`

Convert a device filepath into a Web View-friendly path.

Capacitor apps are served on a different protocol than device files. To avoid difficulties between these protocols, paths to device files must be rewritten. For example, on Android, `file:///path/to/device/file` must be rewritten as `http://localhost/_capacitor_file_/path/to/device/file` before being used in the Web View.

```typescript
// file:///path/to/device/photo.jpg
const savedPhotoFile = await Filesystem.writeFile({
  path: "myFile.jpg",
  data: base64Data,
  directory: FilesystemDirectory.Data
});

// http://localhost/path/to/device/photo.jpg
const savedPhoto = Capacitor.convertFileSrc(savedPhotoFile.uri),
document.getElementById("savedPhoto").src = savedPhoto;
```

```html
<img id="savedPhoto" />
```

## getPlatform

`getPlatform: () => string;`

Get the name of the platform the app is currently running on: `web`, `ios`, `android`.

```typescript
if (Capacitor.getPlatform() === 'ios') {
  // do something
}
```

## isNativePlatform

`isNativePlatform: () => boolean;`

Check whether the currently running platform is native (`ios`, `android`).

```typescript
if (Capacitor.isNativePlatform()) {
  // do something
}
```

## isPluginAvailable

`isPluginAvailable: (name: string) => boolean;`

Check if a plugin is available on the currently running platform. The plugin name is used in the plugin registry (e.g. `const { Name } = Plugins;`), which means it also works with custom plugins.

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
