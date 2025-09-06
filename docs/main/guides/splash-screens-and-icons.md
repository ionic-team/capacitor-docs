---
title: Splash Screens and Icons
description: 使用 @capacitor/assets 为原生项目生成资源图片
contributors:
  - dotNetkow
slug: /guides/splash-screens-and-icons
---

您可以使用 [@capacitor/assets](https://github.com/ionic-team/capacitor-assets) 工具为您的 iOS、Android 或渐进式 Web 应用生成启动画面（Splash Screens）和应用图标（Icons）。

首先，安装 `@capacitor/assets`：

```bash
npm install @capacitor/assets --save-dev
```

按照以下文件夹/文件名结构提供图标和启动画面的源图片：
```
assets/
├── icon-only.png
├── icon-foreground.png
├── icon-background.png
├── splash.png
└── splash-dark.png
```
- 图标文件尺寸至少为 `1024px` x `1024px`
- 启动画面文件尺寸至少为 `2732px` x `2732px`
- 格式支持 `jpg` 或 `png`

然后执行生成命令（该命令会应用到您的原生项目或生成 PWA 清单文件）：
```shell
npx capacitor-assets generate
```

您也可以使用 `--ios`、`--android` 或 `--pwa` 参数为特定平台生成资源。

:::note
社区维护的 [VS Code 扩展](../getting-started/vscode-extension.mdx) 同样可以生成启动画面和应用图标资源。
:::

## Android 12+
在 Android 12 及以上版本中，Google 改变了启动画面的显示方式，使用带有彩色背景的小图标替代了 Android 11 及以下版本支持的全屏图片。关于此变更的详细说明可在 [developer.android.com](https://developer.android.com/develop/ui/views/launch/splash-screen) 查看。