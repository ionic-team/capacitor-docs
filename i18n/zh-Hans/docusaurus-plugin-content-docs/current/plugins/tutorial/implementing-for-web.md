---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - Web/PWA 实现
contributors:
  - eric-horodyski
sidebar_label: Web/PWA 实现
slug: /plugins/tutorial/web
---

# Web/PWA 实现

在设计插件的 API 时,我们发现 Web 已经支持屏幕方向功能(当然,在移动设备上除外)。你可能会问:"我们的插件有 Web 实现的目的是什么?我们不能以编程方式检测用户是否在 Web 上并使用 <a href="https://whatwebcando.today/screen-orientation.html" target="_blank">屏幕方向 Web API</a>,否则使用插件吗?"

Web Native 应用背后的座右铭是"编写一次,随处运行"。这也适用于插件;使用 Capacitor 插件的开发者应该能够使用相同的插件类和方法,并且它们在所有平台上都已实现。

因此,我们将成为优秀的开发者公民,并将屏幕方向 Web API 包装在 `ScreenOrientation` 插件的 Web 实现中。

## 扩展 Capacitor 的 WebPlugin 类

打开一个新文件 `src/plugins/screen-orientation/web.ts`。这是我们将编写 `ScreenOrientation` 插件的 Web 实现的地方。

首先声明 `ScreenOrientationWeb` 类,并让它扩展 `WebPlugin`:

```typescript
import { WebPlugin } from '@capacitor/core';
import type { ScreenOrientationPlugin } from './definitions';

export class ScreenOrientationWeb extends WebPlugin {
  constructor() {
    super();
  }
}
```

Capacitor 的 `WebPlugin` 类包含通知任何插件监听器的逻辑,我们将用它来告诉他们屏幕方向何时更改。让我们在屏幕方向 Web API 的更改事件触发时通知任何监听器。像这样更新构造函数:

```typescript
constructor() {
   super();
   window.screen.orientation.addEventListener("change", () => {
     const type = window.screen.orientation.type;
     this.notifyListeners("screenOrientationChange", { type });
   });
 }
```

`WebPlugin` 类包含为 `ScreenOrientationPlugin` 接口中定义的 `addListener()` 和 `removeAllListeners()` 方法的实现。无需额外工作即可使用这些方法。

## 实现其余方法

让我们完成实现 `ScreenOrientationPlugin` 接口。首先调整类定义,使其_真正_实现接口:

```typescript
export class ScreenOrientationWeb
  extends WebPlugin
  implements ScreenOrientationPlugin
{
```

然后作为 `ScreenOrientationWeb` 类的一部分实现其余方法:

```typescript
 async orientation(): Promise<ScreenOrientationResult> {
    if (typeof screen === 'undefined' || !screen.orientation) {
      throw this.unavailable(
        'ScreenOrientation API not available in this browser',
      );
    }
    return { type: screen.orientation.type };
  }

 async lock(options: OrientationLockOptions): Promise<void> {
    // See https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1615
    if (
      typeof screen === 'undefined' ||
      !screen.orientation ||
      !(screen.orientation as any).lock
    ) {
      throw this.unavailable(
        'ScreenOrientation API not available in this browser',
      );
    }
    try {
      await (screen.orientation as any).lock(options.orientation);
    } catch {
      throw this.unavailable(
        'ScreenOrientation API not available in this browser',
      );
    }
  }

 async unlock(): Promise<void> {
    if (
      typeof screen === 'undefined' ||
      !screen.orientation ||
      !screen.orientation.unlock
    ) {
      throw this.unavailable(
        'ScreenOrientation API not available in this browser',
      );
    }
    try {
      screen.orientation.unlock();
    } catch {
      throw this.unavailable(
        'ScreenOrientation API not available in this browser',
      );
    }
  }
```

## 注册 Web 实现

要将 `ScreenOrientationWeb` 注册为插件的 Web 实现,我们需要使用 `registerPlugin()` 的第二个输入参数。打开 `src/plugins/screen-orientation/index.ts` 并更新 `ScreenOrientation` 变量的声明,如下所示:

```typescript
const ScreenOrientation = registerPlugin<ScreenOrientationPlugin>(
  'ScreenOrientation',
  {
    web: () => import('./web').then(m => new m.ScreenOrientationWeb()),
  },
);
```

## 试一试!

测试 Web 实现。使用 `ionic serve` 为你的应用提供服务,你可以使用浏览器的开发工具在纵向和横向屏幕方向中模拟移动设备。"Rotate my Device"按钮不起作用,因为对 `window.screen.orientation.lock()` 的 Web 支持很差,但如果你使用开发工具手动旋转方向,你应该能够看到不同的设计。

实现了一个平台,还有两个要完成!在深入研究 iOS 和 Android 代码之前,我们应该考虑如何对其进行模式和抽象。让我们在下一步中回顾一些模式:代码抽象模式。
