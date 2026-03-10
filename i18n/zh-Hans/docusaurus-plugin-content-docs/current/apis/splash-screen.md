---
title: 启动画面 Capacitor 插件 API
description: 启动画面 API 提供了显示或隐藏启动图像的方法。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/splash-screen/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/splash-screen/src/definitions.ts
sidebar_label: 启动画面
---

# @capacitor/splash-screen

启动画面 API 提供了显示或隐藏启动图像的方法。

## 安装

```bash
npm install @capacitor/splash-screen
npx cap sync
```

### Android 12 启动画面 API

_**这仅影响启动启动画面,在使用编程式 `show()` 方法时不使用。**_

Capacitor 4 使用 **[Android 12 启动画面 API](https://developer.android.com/guide/topics/ui/splash-screen)** 和 `androidx.core:core-splashscreen` 兼容性库使其在 Android 11 及以下版本上工作。

可以通过在 `android/app/src/main/res/values/styles.xml` 中将 `AppTheme.NoActionBarLaunch` 的父级从 `Theme.SplashScreen` 更改为 `AppTheme.NoActionBar` 来禁用兼容性库。

在 Android 12+ 上无法禁用 Android 12 启动画面 API,因为它是 Android 操作系统的一部分。

```xml
<style name="AppTheme.NoActionBarLaunch" parent="AppTheme.NoActionBar">
    <item name="android:background">@drawable/splash</item>
</style>
```

**注意**：在 Android 12 和 Android 12L 设备上,从第三方启动器(例如 Nova Launcher、MIUI、Realme Launcher、OPPO Launcher 等)、设置应用中的应用信息或 IDE(例如 Android Studio)启动时,启动画面图像不显示。
**[Google 问题跟踪器](https://issuetracker.google.com/issues/205021357)**
**[Google 问题跟踪器](https://issuetracker.google.com/issues/207386164)**
Google 已在 Android 13 上修复了这些问题,但不会将修复反向移植到 Android 12 和 Android 12L。
启动器相关问题可能会通过启动器更新得到修复。
如果你在 Android 13 上仍然发现与启动画面相关的问题,请向 [Google](https://issuetracker.google.net/)报告。

## 示例

```typescript
import { SplashScreen } from '@capacitor/splash-screen';

// 隐藏启动画面(你应该在应用启动时执行此操作)
await SplashScreen.hide();

// 无限期显示启动画面：
await SplashScreen.show({
  autoHide: false,
});

// 显示启动画面两秒钟,然后自动隐藏：
await SplashScreen.show({
  showDuration: 2000,
  autoHide: true,
});
```

## 隐藏启动画面

默认情况下,启动画面设置为在 500 ms 后自动隐藏。

如果你想确保启动画面在应用准备好之前永远不会消失,请将 `launchAutoHide` 设置为 `false`；启动画面将保持可见,直到手动隐藏。为了获得最佳用户体验,你的应用应尽快调用 `hide()`。

如果你想将启动画面显示固定的时间,请在 [Capacitor 配置文件](https://capacitorjs.com/docs/config)中设置 `launchShowDuration`。

## 背景颜色

在某些情况下,特别是如果启动画面不能完全覆盖设备屏幕,可能会在角落看到应用屏幕(由于透明度)。而不是显示透明颜色,你可以设置 `backgroundColor` 来覆盖这些区域。

`backgroundColor` 的可能值为 `#RRGGBB` 或 `#RRGGBBAA`。

## 加载指示器

如果想在启动画面上显示加载指示器,请在 [Capacitor 配置文件](https://capacitorjs.com/docs/config)中将 `showSpinner` 设置为 `true`。

你可以使用以下配置自定义加载指示器的外观。

对于 Android,`androidSpinnerStyle` 具有以下选项：

- `horizontal`
- `small`
- `large` (默认)
- `inverse`
- `smallInverse`
- `largeInverse`

对于 iOS,`iosSpinnerStyle` 具有以下选项：

- `large` (默认)
- `small`

要设置加载指示器的颜色,请使用 `spinnerColor`,值为 `#RRGGBB` 或 `#RRGGBBAA`。

## 配置

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

这些配置值可用：

| Prop                            | Type                                                                                                                          | Description                                                                                                                                                                                                                                              | Default             | Since |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----- |
| **`launchShowDuration`**        | <code>number</code>                                                                                                           | 当启用 autoHide 时显示启动启动画面的时间(以 ms 为单位)                                                                                                                                                                                            | <code>500</code>    | 1.0.0 |
| **`launchAutoHide`**            | <code>boolean</code>                                                                                                          | 是否在 launchShowDuration 后自动隐藏启动画面。                                                                                                                                                                                                        | <code>true</code>   | 1.0.0 |
| **`launchFadeOutDuration`**     | <code>number</code>                                                                                                           | 启动启动画面的淡出动画持续时间(以 ms 为单位) 仅适用于 Android,使用 Android 12 启动画面 API 时。                                                                                                                                                              | <code>200</code>    | 4.2.0 |
| **`backgroundColor`**           | <code>string</code>                                                                                                           | 启动画面背景的颜色,十六进制格式,#RRGGBB 或 #RRGGBBAA。如果 `useDialog` 为 true 或使用 Android 12 API 启动时不起作用。                                                                                                                                          |                     | 1.0.0 |
| **`androidSplashResourceName`** | <code>string</code>                                                                                                           | 用作启动画面的资源名称。使用 Android 12 API 启动时不起作用。仅适用于 Android。                                                                                                                                                                               | <code>splash</code> | 1.0.0 |
| **`androidScaleType`**          | <code>'CENTER' \| 'CENTER_CROP' \| 'CENTER_INSIDE' \| 'FIT_CENTER' \| 'FIT_END' \| 'FIT_START' \| 'FIT_XY' \| 'MATRIX'</code> | 用于缩放启动画面图像的 [ImageView.ScaleType](https://developer.android.com/reference/android/widget/ImageView.ScaleType)。如果 `useDialog` 为 true 或使用 Android 12 API 启动时不起作用。仅适用于 Android。                                      | <code>FIT_XY</code> | 1.0.0 |
| **`showSpinner`**               | <code>boolean</code>                                                                                                          | 在启动画面上显示加载指示器。如果 `useDialog` 为 true 或使用 Android 12 API 启动时不起作用。                                                                                                                                                                     |                     | 1.0.0 |
| **`androidSpinnerStyle`**       | <code>'horizontal' \| 'small' \| 'large' \| 'inverse' \| 'smallInverse' \| 'largeInverse'</code>                              | Android 加载指示器的样式。如果 `useDialog` 为 true 或使用 Android 12 API 启动时不起作用。                                                                                                                                                                      | <code>large</code>  | 1.0.0 |
| **`iosSpinnerStyle`**           | <code>'small' \| 'large'</code>                                                                                               | iOS 加载指示器的样式。如果 `useDialog` 为 true 则不起作用。仅适用于 iOS。                                                                                                                                                                                   | <code>large</code>  | 1.0.0 |
| **`spinnerColor`**              | <code>string</code>                                                                                                           | 加载指示器的颜色,十六进制格式,#RRGGBB 或 #RRGGBBAA。如果 `useDialog` 为 true 或使用 Android 12 API 启动时不起作用。                                                                                                                                            |                     | 1.0.0 |
| **`splashFullScreen`**          | <code>boolean</code>                                                                                                          | 隐藏启动画面上的状态栏。使用 Android 12 API 启动时不起作用。仅适用于 Android。                                                                                                                                                                             |                     | 1.0.0 |
| **`splashImmersive`**           | <code>boolean</code>                                                                                                          | 隐藏启动画面上的状态栏和软件导航按钮。使用 Android 12 API 启动时不起作用。仅适用于 Android。                                                                                                                                                                    |                     | 1.0.0 |
| **`layoutName`**                | <code>string</code>                                                                                                           | 如果 `useDialog` 设置为 true,则配置对话框布局。如果 `useDialog` 未设置或为 false,则使用布局而不是 ImageView。使用 Android 12 API 启动时不起作用。仅适用于 Android。                                                                                                      |                     | 1.1.0 |
| **`useDialog`**                 | <code>boolean</code>                                                                                                          | 使用对话框而不是 ImageView。如果未配置 `layoutName`,它将使用将启动图像用作背景的布局。使用 Android 12 API 启动时不起作用。仅适用于 Android。                                                                                                                           |                     | 1.1.0 |

### 示例

在 `capacitor.config.json` 中：

```json
{
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 3000,
      "launchAutoHide": true,
      "launchFadeOutDuration": 3000,
      "backgroundColor": "#ffffffff",
      "androidSplashResourceName": "splash",
      "androidScaleType": "CENTER_CROP",
      "showSpinner": true,
      "androidSpinnerStyle": "large",
      "iosSpinnerStyle": "small",
      "spinnerColor": "#999999",
      "splashFullScreen": true,
      "splashImmersive": true,
      "layoutName": "launch_screen",
      "useDialog": true
    }
  }
}
```

在 `capacitor.config.ts` 中：

```ts
/// <reference types="@capacitor/splash-screen" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      launchFadeOutDuration: 3000,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,
    },
  },
};

export default config;
```

</docgen-config>

### Android

要使用名称不是 `splash.png` 的启动画面图像,请将 `androidSplashResourceName` 设置为新的资源名称。此外,在 `android/app/src/main/res/values/styles.xml` 中,更改以下块中的资源名称：

```xml
<style name="AppTheme.NoActionBarLaunch" parent="AppTheme.NoActionBar">
    <item name="android:background">@drawable/NAME</item>
</style>
```

### 变量

此插件将使用以下项目变量(在应用的 `variables.gradle` 文件中定义)：

- `coreSplashScreenVersion` `androidx.core:core-splashscreen` 的版本(默认：`1.2.0`)

## 示例指南

[添加你自己的图标和启动画面图像 ›](https://www.joshmorony.com/adding-icons-splash-screens-launch-images-to-capacitor-projects/)

[为 Capacitor 创建动态/自适应启动画面(Android) ›](https://www.joshmorony.com/creating-a-dynamic-universal-splash-screen-for-capacitor-android/)

## API

<docgen-index>

* [`show(...)`](#show)
* [`hide(...)`](#hide)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### show(...)

```typescript
show(options?: ShowOptions | undefined) => Promise<void>
```

显示启动画面

| Param         | Type                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#showoptions">ShowOptions</a></code> |

**Since:** 1.0.0

--------------------


### hide(...)

```typescript
hide(options?: HideOptions | undefined) => Promise<void>
```

隐藏启动画面

| Param         | Type                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#hideoptions">HideOptions</a></code> |

**Since:** 1.0.0

--------------------


### Interfaces


#### ShowOptions

| Prop                  | Type                 | Description                                                | Default           | Since |
| --------------------- | -------------------- | ---------------------------------------------------------- | ----------------- | ----- |
| **`autoHide`**        | <code>boolean</code> | 是否在 showDuration 后自动隐藏启动画面                            |                   | 1.0.0 |
| **`fadeInDuration`**  | <code>number</code>  | 淡入多长时间(以 ms 为单位)。                                     | <code>200</code>  | 1.0.0 |
| **`fadeOutDuration`** | <code>number</code>  | 淡出多长时间(以 ms 为单位)。                                     | <code>200</code>  | 1.0.0 |
| **`showDuration`**    | <code>number</code>  | 当启用 autoHide 时显示启动画面的时间(以 ms 为单位)                     | <code>3000</code> | 1.0.0 |


#### HideOptions

| Prop                  | Type                | Description                                                                                                                                                | Default          | Since |
| --------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----- |
| **`fadeOutDuration`** | <code>number</code> | 淡出多长时间(以 ms 为单位)。在 Android 上,如果使用 Android 12 启动画面 API,则不使用它。请改用 launchFadeOutDuration 配置选项。                                          | <code>200</code> | 1.0.0 |

</docgen-api>
