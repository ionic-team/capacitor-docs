---
title: Capacitor Web/PWA 插件指南
description: Capacitor Web/PWA 插件指南
contributors:
  - mlynch
  - jcesarmobile
  - dotNetkow
sidebar_label: Web/PWA 指南
slug: /plugins/web
---

# Capacitor Web/PWA 插件指南

Capacitor 利用 Web/原生兼容层,使得构建在本地运行以及在 Web 上的 PWA 中运行时都有功能的插件变得容易。

## 快速开始

首先,按照插件指南中的[快速开始](/plugins/creating-plugins/overview.md#plugin-generator)部分生成一个插件。

接下来,在你选择的编辑器中打开 `echo/src/web.ts`。

## 示例

Capacitor Web 插件的基本结构如下所示:

```typescript
import { WebPlugin } from '@capacitor/core';

import type { EchoPlugin } from './definitions';

export class EchoWeb extends WebPlugin implements EchoPlugin {
  async echo(options: { value: string }) {
    console.log('ECHO', options);
    return options;
  }
}
```

`EchoPlugin` 接口定义插件的方法签名。在 TypeScript 中,我们可以确保 Web 实现(`EchoWeb` 类)正确实现接口。

## 权限 {#permissions}

如果你的插件在 Web 上具有需要最终用户许可的功能,则需要实现权限模式。

### 别名

你需要开发一个或多个别名来抽象和分组插件所需的权限。这些别名用于传达权限状态。默认情况下,别名可以处于以下状态之一:

- `granted`: 此别名中的每个权限都已由最终用户授予(或不需要提示)。
- `denied`: 此别名中的一个或多个权限已被最终用户拒绝。
- `prompt`: 应提示最终用户授予权限,因为它既未授予也未拒绝。
- `prompt-with-rationale`: 最终用户之前已拒绝权限,但尚未阻止提示。

这些由从 `@capacitor/core` 导出的 `PermissionState` 类型表示。

如果需要,也可以为别名定义自定义状态。例如,官方 [Camera 插件](/apis/camera.md)还为 `camera` 和 `photos` 别名定义了 `limited` 状态。

别名是跨平台的,因此在确定插件的别名时,请确保考虑 iOS、Android 和 Web 权限。

### 权限状态定义 {#permission-status-definitions}

在 `src/definitions.ts` 中,从 Capacitor 导入 `PermissionState` 并定义一个 `PermissionStatus` 接口,它表示插件中权限的状态,以你想出的别名为键。

在下面的示例中,权限状态可以完全由 `location` 别名表示,它可以是 `granted`、`denied` 等。

```typescript
import type { PermissionState } from '@capacitor/core';

export interface PermissionStatus {
  // TODO: 将 'location' 更改为别名的实际名称!
  location: PermissionState;
}
```

然后,在插件接口中添加 `checkPermissions()` 和 `requestPermissions()` 的定义。这两个方法都将按照 `PermissionStatus` 的定义返回插件中权限的当前状态。

```diff
 export interface EchoPlugin {
   echo(options: { value: string }): Promise<{ value: string }>;
+  checkPermissions(): Promise<PermissionStatus>;
+  requestPermissions(): Promise<PermissionStatus>;
 }
```

由于这些方法添加到插件接口,因此必须在插件支持的所有平台上实现它们。

### 实现权限

在 `src/web.ts` 中,将 `checkPermissions()` 和 `requestPermissions()` 方法添加到 Web 实现。

```diff
+import { PermissionStatus } from './definitions';

 export class EchoWeb extends WebPlugin implements EchoPlugin {
   async echo(options: { value: string }) {
     ...
   }

+  async checkPermissions(): Promise<PermissionStatus> {
+    // TODO
+  }

+  async requestPermissions(): Promise<PermissionStatus> {
+    // TODO
+  }
 }
```

#### `checkPermissions()`

此方法应返回插件中权限的当前状态。此信息可能直接在特定的 Web API 上可用,或从 [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API) 获得。

请记住,在使用浏览器采用不稳定的 Web API(例如 Permissions API)时,你应该实现功能检测并在最终用户的浏览器不受支持时抛出适当的错误。

```diff
 async checkPermissions(): Promise<PermissionStatus> {
+  if (typeof navigator === 'undefined' || !navigator.permissions) {
+    throw this.unavailable('Permissions API not available in this browser.');
+  }

   const permission = await navigator.permissions.query( ... );

   // TODO
 }
```

#### `requestPermissions()`

此方法应提示最终用户授予权限以使用插件所需的平台 API。然后,它应该在提示后返回插件中权限的新状态(就像使用 `checkPermissions()` 方法一样)。

在 Web 上,有时无法将权限请求与实际调用分开。例如,Geolocation API 仅在请求位置时请求权限。对于这种情况,我们建议抛出未实现的异常。

```typescript
async requestPermissions(): Promise<PermissionStatus> {
  // TODO: Web 支持为我的插件请求权限吗?
  throw this.unimplemented('Not implemented on web.');
}
```

## 错误处理 {#error-handling}

Capacitor 的 Web 插件经常使用尚未在某些浏览器中采用甚至远程标准化的 API。尽管如此,通常会对插件的 Web 实现采取尽力而为的方法,并在 API 不可用时优雅地失败。这就是为什么错误处理在 Web 上尤其重要!

### 不可用

应抛出此错误以指示当前无法使用该功能。

原因包括:

- 它目前缺少先决条件,例如网络连接。
- 它需要已实现底层 API 的浏览器。

在下面的示例中,我们首先检查 `navigator` 上是否定义了 `geolocation`。如果没有,这意味着浏览器不支持 Geolocation,我们应该抛出"不可用"错误。否则,我们可以继续实现。

```typescript
async getLocation(): Promise<Location> {
  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    throw this.unavailable('Geolocation API not available in this browser.');
  }

  // TODO: 实际的 Web 实现
}

```

### 未实现

可以抛出此错误以指示未实现该功能。你可以使用它在 Web 上存根你的方法以便以后实现,或者用它来指示无法在某个平台上实现该功能。

```typescript
async getLocation(): Promise<Location> {
  throw this.unimplemented('Not implemented on web.');
}
```
