---
title: 启动画面和图标
description: 使用 @capacitor/assets 为原生项目生成资源图像
contributors:
  - dotNetkow
slug: /guides/splash-screens-and-icons
---

您可以使用 [@capacitor/assets](https://github.com/ionic-team/capacitor-assets) 工具为 iOS、Android 或渐进式 Web 应用生成启动画面和图标。

首先，安装 `@capacitor/assets`：

```bash
npm install @capacitor/assets --save-dev
```

使用此文件夹/文件名结构提供图标和启动画面源图像：
```
assets/
├── icon-only.png
├── icon-foreground.png
├── icon-background.png
├── splash.png
└── splash-dark.png
```
- 图标文件应至少为 `1024px` x `1024px`。
- 启动画面文件应至少为 `2732px` x `2732px`。
- 格式可以是 `jpg` 或 `png`。

然后生成（适用于您的原生项目或生成 PWA 清单文件）：
```shell
npx capacitor-assets generate
```

或者，您可以使用 `--ios`、`--android` 或 `--pwa` 为特定平台生成。

:::note
社区维护的 [VS Code 扩展](/main/getting-started/vscode-extension.mdx)也可以生成启动画面和图标资源。
:::

## Android 12+
在 Android 12 及更高版本中，Google 更改了启动画面的显示方式，使用带有彩色背景的较小图标，而不是 Android 11 及更低版本可能的全屏图像。有关此更改的其他文档可以在 [developer.android.com](https://developer.android.com/develop/ui/views/launch/splash-screen) 找到。
