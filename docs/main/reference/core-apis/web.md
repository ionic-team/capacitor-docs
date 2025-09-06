---
title: Capacitor Web API
description: Capacitor 在 Web 端的 API 接口
slug: /core-apis/web
---

# Capacitor Web API

Capacitor 提供了多个 JavaScript 实用工具，可确保应用使用相同代码库在多个平台上成功运行。要使用这些工具，请先导入 Capacitor 然后调用所需的实用函数：

## Capacitor 对象

`Capacitor` 对象是多个实用函数的容器。可通过 `window.Capacitor` 访问，但现代 JavaScript 应用推荐使用导入方式：

```typescript
import { Capacitor } from '@capacitor/core';
```

### convertFileSrc(...)

```typescript
convertFileSrc: (filePath: string) => string;
```

将设备文件路径转换为 Web 视图友好的路径。

Capacitor 应用使用的协议与设备文件不同。为避免协议间冲突，设备文件路径必须重新编写。例如在 Android 上，`file:///path/to/device/file` 必须重写为 `http://localhost/_capacitor_file_/path/to/device/file` 才能在 Web 视图中使用。

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

### getPlatform()

```typescript
getPlatform: () => string;
```

获取应用当前运行平台的名称：`web`、`ios` 或 `android`。

```typescript
if (Capacitor.getPlatform() === 'ios') {
  // 执行 iOS 特定操作
}
```

### isNativePlatform()

```typescript
isNativePlatform: () => boolean;
```

检查当前运行平台是否为原生平台（`ios` 或 `android`）。

```typescript
if (Capacitor.isNativePlatform()) {
  // 执行原生平台特定操作
}
```

### isPluginAvailable(...)

```typescript
isPluginAvailable: (name: string) => boolean;
```

检查当前运行平台上是否可用指定插件。插件名称需使用在插件注册表中的名称，这意味着也适用于自定义插件。

```typescript
const isAvailable = Capacitor.isPluginAvailable('Camera');

if (!isAvailable) {
  // 让用户改为上传文件
} else {
  // 否则直接调用：
  const image = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
  });
}
```