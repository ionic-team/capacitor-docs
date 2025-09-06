---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 使用插件 API
contributors:
  - eric-horodyski
sidebar_label: 使用插件 API
slug: /plugins/tutorial/using-the-plugin-api
---

# 使用插件 API

在实现屏幕方向功能之前，先构建一个调用插件 API 的用户界面是合理的做法。本质上，我们需要搭建一个测试框架，以便快速验证跨平台功能的兼容性。

本教程的重点是介绍如何构建 Capacitor 插件，而非如何构建 Ionic Framework 应用，因此您可以直接获取所需文件的最终版本，并将其内容复制粘贴到您的项目中：

- <a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial/blob/main/src/pages/Home.tsx" target="_blank">src/pages/Home.tsx</a>
- <a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial/blob/main/src/pages/Home.css" target="_blank">src/pages/Home.css</a>

复制完成后，使用 `ionic serve` 命令启动 Capacitor 应用。打开浏览器的开发者工具，您应该会看到以下错误：

```bash
Uncaught (in promise) ScreenOrientation does not have web implementation.
```

这个错误符合预期，因为我们尚未为任何平台实现代码。请保持浏览器打开状态，我们将首先实现 Web 平台的支持。在此之前，让我们先回顾一下 `Home.tsx` 中的相关代码。

## 插件是如何被使用的？

**追踪屏幕方向：**

```typescript
const [orientation, setOrientation] = useState<string>('');
```

`orientation` 状态变量用于存储屏幕方向的值，可通过调用 `setOrientation` 进行更新。由于代码开始执行时无法获知当前屏幕方向，因此默认设置为空字符串。使用字符串类型是为了更方便地告知 UI 应显示哪种设计。

当触发 `screenOrientationChange` 事件时，已设置的事件监听器会更新 `orientation` 的值。

```typescript
ScreenOrientation.addListener('screenOrientationChange', res =>
  setOrientation(res.type),
);
```

UI 加载时会获取当前屏幕方向，并在 UI 从 DOM 中移除时清除所有已创建的监听器（如上述监听器）。

```typescript
useEffect(() => {
  ScreenOrientation.orientation().then(res => setOrientation(res.type));

  return () => {
    ScreenOrientation.removeAllListeners();
  };
}, []);
```

请不必过分深究 `useEffect` 和返回函数，这些是 React 特定的语法规则。

**显示正确的设计：**

`OrientationType` 为竖屏方向提供了两个值：`portrait-primary` 和 `portrait-secondary`。横屏方向也是如此。我们的 UI 不关心它们之间的差异，只关注是横屏还是竖屏。

```jsx
{
  orientation.includes('portrait') &&
    {
      /* 提供一个按钮，用于旋转并将屏幕方向锁定为横屏模式 */
    };
}
{
  orientation.includes('landscape') &&
    {
      /* 让用户通过确认按钮“签名”并解锁屏幕方向 */
    };
}
**锁定和解锁屏幕方向：**

竖屏设计包含一个按钮，按下后将改变屏幕方向并将其锁定。

```typescript
onClick={() => ScreenOrientation.lock({ orientation: "landscape-primary" })}
```

相反，横屏设计包含一个按钮，按下后将解锁屏幕方向。

```typescript
onClick={() => ScreenOrientation.unlock()}
```

`Home.tsx` 和 `Home.css` 中的其余代码纯粹是装饰性的，我们无需深入探讨。运行 `npm run build`，以便在 iOS 或 Android 上运行应用时使用新的 UI。

现在我们有了一个调用插件 API 的用户界面，让我们开始实现功能吧！下一步我们将首先针对 Web 平台：Web 实现。