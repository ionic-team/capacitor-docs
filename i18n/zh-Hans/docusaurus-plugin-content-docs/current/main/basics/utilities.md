---
title: Capacitor 的 JavaScript API
description: Capacitor 的 JavaScript API
slug: /basics/utilities
sidebar_label: JavaScript API
---

# Capacitor 的 JavaScript API

Capacitor 提供了多个 JavaScript 函数，以确保应用在多个平台上使用相同的代码库成功运行。

## 全局 Capacitor 对象

您可以使用以下代码导入全局 Capacitor 对象：

```typescript
import { Capacitor } from '@capacitor/core';
```

`Capacitor` 对象具有多个函数，可帮助您在开发 Capacitor 应用时面临的最常见的 WebView 到原生的问题。

### Capacitor.convertFileSrc

`convertFileSrc: (filePath: string) => string;`

将设备文件路径转换为 WebView 友好的路径。

Capacitor 应用使用与设备文件不同的协议提供服务。为了避免这些协议之间的困难，必须重写设备文件的路径。例如，在 Android 上，`file:///path/to/device/file` 必须在 WebView 中使用之前重写为 `http://localhost/_capacitor_file_/path/to/device/file`。

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

获取应用当前运行的平台名称。这将返回 `"web"`、`"ios"` 或 `"android"` 值，具体取决于应用运行的设备。

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

检查当前运行的平台是否为原生平台。如果应用作为原生的已安装 Capacitor 应用运行，此函数返回 `true`；如果通过浏览器提供服务或作为 PWA 安装，则返回 `false`。

```typescript
if (Capacitor.isNativePlatform()) {
  console.log("I'm a native app!");
} else {
  console.log("I'm a PWA or Web app!");
}
```

### Capacitor.isPluginAvailable

`isPluginAvailable: (name: string) => boolean;`

检查插件在当前运行的平台是否可用。插件名称在插件注册表中使用，这意味着它也适用于自定义插件。

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
