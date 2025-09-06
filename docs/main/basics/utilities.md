---
title: Capacitor's JavaScript API
description: Capacitor的JavaScript API
slug: /basics/utilities
sidebar_label: JavaScript API
---

# Capacitor的JavaScript API

Capacitor提供多个JavaScript功能，确保应用能够在多个平台上使用相同的代码库成功运行。

## 全局Capacitor对象

您可以通过以下代码导入全局Capacitor对象：

```typescript
import { Capacitor } from '@capacitor/core';
```

`Capacitor`对象具有多个功能，可帮助解决开发Capacitor应用时可能遇到的最常见的WebView与原生交互问题。

### Capacitor.convertFileSrc

`convertFileSrc: (filePath: string) => string;`

将设备文件路径转换为Web View友好的路径。

Capacitor应用使用与设备文件不同的协议提供服务。为避免这些协议之间的冲突，设备文件的路径必须重新编写。例如，在Android上，`file:///path/to/device/file`必须在使用前重写为`http://localhost/_capacitor_file_/path/to/device/file`。

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

获取应用当前运行平台的名称。根据应用运行的设备，此函数将返回`"web"`、`"ios"`或`"android"`。

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

检查当前运行平台是否为原生平台。如果应用作为原生安装的Capacitor应用运行，此函数返回`true`；如果通过浏览器提供服务或作为PWA安装，则返回`false`。

```typescript
if (Capacitor.isNativePlatform()) {
  console.log("我是原生应用！");
} else {
  console.log("我是PWA或Web应用！");
}
```

### Capacitor.isPluginAvailable

`isPluginAvailable: (name: string) => boolean;`

检查当前运行平台上是否可用某个插件。插件名称在插件注册表中使用，这意味着它也适用于自定义插件。

```typescript
const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // 让用户上传文件代替
} else {
  // 否则，调用：
  const image = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
  });
}
```