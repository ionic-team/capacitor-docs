---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 设计插件 API
contributors:
  - eric-horodyski
sidebar_label: 设计插件 API
slug: /plugins/tutorial/designing-the-plugin-api
---

# 设计插件 API

构建 Capacitor 插件的第一步 - 可以说也是最重要的一步 - 是设计 API。API 是我们在编写每个平台的特定实现时将遵守的契约。

我们可以使用 TypeScript 定义插件 API;它将作为我们实现时的契约,并提供 TypeScript 附带的好处,例如代码完成和类型检查。

## 等等,你真的需要一个插件吗?

信不信由你,现代 Web 浏览器可以做许多我们认为"原生功能"的事情,例如检查电池状态、语音识别,是的,还有屏幕方向。在构建 Web Native 应用程序时,曾经需要插件才能访问的功能现在作为 Web API 可用并不少见。

> 在为特定功能构建插件之前,我们建议查看 <a href="https://whatwebcando.today/" target="_blank">What Web Can Do Today</a> 等网站,看看你正在寻找的功能是否已作为 Web API 提供。

如果屏幕方向已经有 Web API,为什么我们要费心构建一个呢?看看 <a href="https://whatwebcando.today/screen-orientation.html" target="_blank">屏幕方向 Web API</a>,我们可以看到 iOS 没有实现该 API(在撰写本文时),这意味着我们需要自己提供实现。至于 Android,我们可以在应用在 Android 平台上运行时仅使用屏幕方向 Web API - 但出于教育目的,我们将以原生方式实现屏幕方向功能。

## 定义 ScreenOrientation API

我们可能无法直接使用屏幕方向 Web API,但我们可以根据它对插件的 API 进行建模:

| 方法名称        | 输入参数                            | 返回值                                           |
| ------------------ | ------------------------------------------- | ------------------------------------------------------ |
| orientation        |                                             | `Promise<ScreenOrientationResult>`                   |
| lock               | `options: OrientationLockOptions`      | `Promise<void>`                                        |
| unlock             |                                             | `Promise<void>`                                        |
| addListener        | `(orientation: ScreenOrientationResult)` | `Promise<PluginListenerHandle>` |
| removeAllListeners |                                             | `Promise<void>`                                        |

这里有一个额外的好处;我们可以通过 TypeScript 现有的 DOM 类型使用可用的 `OrientationType` 类型。自 Typescript 5.2+ 以来,`OrientationLockType` 不再可用,因此我们将为其提供定义。

让我们设置一个目录来保存我们的插件 API。创建一个新的子文件夹 `src/plugins/screen-orientation` 并在其中添加以下文件:

- `definitions.ts`
- `index.ts`

使用以下代码填充 `definitions.ts`:

```typescript
import type { PluginListenerHandle } from '@capacitor/core';

export interface OrientationLockOptions {
  /**
   * 注意:Typescript v5.2+ 用户应该从 @capacitor/screen-orientation 导入 OrientationLockType。
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
   * 返回屏幕的当前方向。
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
   * 监听屏幕方向更改。
   */
  addListener(
    eventName: 'screenOrientationChange',
    listenerFunc: (orientation: ScreenOrientationResult) => void,
  ): Promise<PluginListenerHandle>;

  /**
   * 删除所有监听器
   */
  removeAllListeners(): Promise<void>;
}
```

## 注册 ScreenOrientation 插件

为了在 Capacitor 应用中使用插件,我们需要使用从 `@capacitor/core` 导出的 `registerPlugin()` 模块注册它。

使用以下代码填充 `index.ts`:

```typescript
import { registerPlugin } from '@capacitor/core';

import type { ScreenOrientationPlugin } from './definitions';

const ScreenOrientation = registerPlugin<ScreenOrientationPlugin>('ScreenOrientation');

export * from './definitions';
export { ScreenOrientation };
```

上面的代码创建了一个链接到插件实现代码的对象。

设计 API 已完成;让我们构建一个用户界面来调用它。这样做,我们将使测试更容易,因为我们实现每个平台集成。我们的下一步:使用插件 API。
