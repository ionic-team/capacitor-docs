---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 设计插件 API
contributors:
  - eric-horodyski
sidebar_label: 设计插件 API
slug: /plugins/tutorial/designing-the-plugin-api
---

# 设计插件 API

构建 Capacitor 插件的第一步——也可以说是最重要的一步——就是设计 API。这份 API 将作为我们在编写各平台具体实现时需要遵循的契约。

我们可以使用 TypeScript 来定义插件 API；它既是我们实现时的契约规范，又能提供 TypeScript 带来的便利，比如代码补全和类型检查。

## 等等，你真的需要为此开发插件吗？

信不信由你，现代 Web 浏览器已经能实现许多我们认为是「原生功能」的操作，比如检查电池状态、语音识别，没错，甚至包括屏幕方向。在构建 Web 原生应用时，经常会发现一些曾经需要插件才能实现的功能，如今已经作为 Web API 提供。

> 在为特定功能开发插件之前，我们建议先查看 <a href="https://whatwebcando.today/" target="_blank">What Web Can Do Today</a> 这类网站，确认你需要的功能是否已经作为 Web API 提供。

既然屏幕方向已经有 Web API，为什么我们还要专门开发一个呢？查看 <a href="https://whatwebcando.today/screen-orientation.html" target="_blank">Screen Orientation Web API</a> 可以发现，iOS 目前（截至本文撰写时）尚未实现该 API，这意味着我们需要自行提供实现。至于 Android 平台，我们本可以直接使用 Web API——但为了教学目的，我们将通过原生方式实现屏幕方向功能。

## 定义 ScreenOrientation API

虽然无法直接使用 Screen Orientation Web API，但我们可以参照它来设计插件 API：

| 方法名             | 输入参数                               | 返回值                                               |
| ------------------ | -------------------------------------- | ---------------------------------------------------- |
| orientation        |                                        | `Promise<ScreenOrientationResult>`                 |
| lock               | `options: OrientationLockOptions` | `Promise<void>`                                      |
| unlock             |                                        | `Promise<void>`                                      |
| addListener        | `(orientation: ScreenOrientationResult)` | `Promise<PluginListenerHandle>` |
| removeAllListeners |                                        | `Promise<void>`                                      |

这里还有一个额外优势：我们可以使用 TypeScript 现有 DOM 类型定义中的 `OrientationType`。由于 TypeScript 5.2+ 不再提供 `OrientationLockType`，我们需要自行定义它。

现在让我们创建一个目录来存放插件 API。新建子文件夹 `src/plugins/screen-orientation` 并在其中添加以下文件：

- `definitions.ts`
- `index.ts`

在 `definitions.ts` 中填入以下代码：

```typescript
import type { PluginListenerHandle } from '@capacitor/core';

export interface OrientationLockOptions {
  /**
   * 注意：TypeScript v5.2+ 用户应从 @capacitor/screen-orientation 导入 OrientationLockType。
   */
  orientation: OrientationLockType;
}

export type OrientationLockType =
  | 'any'
  | 'natural'
  | 'landscape'
  | 'portrait'
  | 'portrait-primary'
  | 'portrait-secondary'
  | 'landscape-primary'
  | 'landscape-secondary';

export interface ScreenOrientationResult {
  type: OrientationType;
}

export interface ScreenOrientationPlugin {
  /**
   * 返回屏幕当前方向。
   */
  orientation(): Promise<ScreenOrientationResult>;

  /**
   * 锁定屏幕方向。
   */
  lock(options: OrientationLockOptions): Promise<void>;

  /**
   * 解锁屏幕方向。
   */
  unlock(): Promise<void>;

  /**
   * 监听屏幕方向变化。
   */
  addListener(
    eventName: 'screenOrientationChange',
    listenerFunc: (orientation: ScreenOrientationResult) => void,
  ): Promise<PluginListenerHandle>;

  /**
   * 移除所有监听器。
   */
  removeAllListeners(): Promise<void>;
}
```

## 注册 ScreenOrientation 插件

为了在 Capacitor 应用中使用该插件，我们需要使用从 `@capacitor/core` 导出的 `registerPlugin()` 模块进行注册。

在 `index.ts` 中填入以下代码：

```typescript
import { registerPlugin } from '@capacitor/core';

import type { ScreenOrientationPlugin } from './definitions';

const ScreenOrientation = registerPlugin<ScreenOrientationPlugin>('ScreenOrientation');

export * from './definitions';
export { ScreenOrientation };
```

以上代码创建了一个与插件实现代码相关联的对象。

API 设计已完成，接下来我们将构建一个调用该 API 的用户界面。这样在实现各平台集成时，测试将会更加方便。下一步：使用插件 API。