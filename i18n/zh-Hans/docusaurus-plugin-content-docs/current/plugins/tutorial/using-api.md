---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 使用插件 API
contributors:
  - eric-horodyski
sidebar_label: 使用插件 API
slug: /plugins/tutorial/using-the-plugin-api
---

# 使用插件 API

在实现屏幕方向功能之前,构建一个使用插件 API 的用户界面是有意义的。本质上,我们想要构建一个测试工具,允许我们快速跨平台测试功能奇偶校验。

本演练的重点是如何构建 Capacitor 插件,而不是如何构建 Ionic Framework 应用,因此你可以只获取所需文件的完成版本并将其内容复制并粘贴到你的项目中:

- <a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial/blob/main/src/pages/Home.tsx" target="_blank">src/pages/Home.tsx</a>
- <a href="https://github.com/ionic-enterprise/capacitor-plugin-tutorial/blob/main/src/pages/Home.css" target="_blank">src/pages/Home.css</a>

复制后,使用 `ionic serve` 命令为 Capacitor 应用提供服务。打开浏览器的开发工具,你应该会看到以下错误:

```bash
Uncaught (in promise) ScreenOrientation does not have web implementation.
```

该错误检查通过;我们还没有为任何平台实现代码。保持浏览器打开。我们将首先实现 Web 平台。在此之前,让我们回顾 `Home.tsx` 中的相关代码。

## 如何使用插件?

**跟踪屏幕方向:**

```typescript
const [orientation, setOrientation] = useState<string>('');
```

`orientation` 状态变量用于保存屏幕方向的值。它可以通过调用 `setOrientation` 来更新。由于我们在代码开始执行时不知道当前屏幕方向,因此它默认为空字符串。使用字符串类型可以更容易地告诉 UI 显示哪个设计。

建立一个事件监听器,在触发 `screenOrientationChange` 时更新 `orientation`。

```typescript
ScreenOrientation.addListener('screenOrientationChange', res =>
  setOrientation(res.type),
);
```

当 UI 加载时获取当前屏幕方向,并且在从 DOM 中删除 UI 时删除任何创建的监听器(如上面的监听器)。

```typescript
useEffect(() => {
  ScreenOrientation.orientation().then(res => setOrientation(res.type));

  return () => {
    ScreenOrientation.removeAllListeners();
  };
}, []);
```

请不要过多地阅读 `useEffect` 和返回函数;这些是 React 特定的语法规则。

**显示正确的设计:**

`OrientationType` 有两个纵向方向的值:`portrait-primary` 和 `portrait-secondary`。横向方向也是如此。我们的 UI 不关心它们之间的区别,只关心它是横向还是纵向。

```jsx
{
  orientation.includes('portrait') &&
    {
      /* 提供一个按钮,将旋转并将屏幕方向锁定为横向模式。 */
    };
}
{
  orientation.includes('landscape') &&
    {
      /* 让用户"签名"并通过确认按钮解锁屏幕方向。 */
    };
}
```

**锁定和解锁屏幕方向:**

纵向设计包含一个按钮,按下时将更改屏幕方向并将其锁定。

```typescript
onClick={() => ScreenOrientation.lock({ orientation: "landscape-primary" })}
```

相反,横向设计包含一个按钮,按下时将解锁屏幕方向。

```typescript
onClick={() => ScreenOrientation.unlock()}
```

`Home.tsx` 和 `Home.css` 中的其余代码纯粹是装饰性的;我们不需要深入研究它。运行 `npm run build`,以便我们在 iOS 或 Android 上运行应用时使用新 UI。

我们现在有一个使用插件 API 的用户界面,所以让我们开始实现功能!我们将在下一步中首先针对 Web:Web 实现。
