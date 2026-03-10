---
title: 状态栏 Capacitor 插件 API
description: 状态栏 API 提供了配置状态栏样式以及显示或隐藏它的方法。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/status-bar/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/status-bar/src/definitions.ts
sidebar_label: 状态栏
---

# @capacitor/status-bar

状态栏 API 提供了配置状态栏样式以及显示或隐藏它的方法。

## 安装

```bash
npm install @capacitor/status-bar
npx cap sync
```

## Android 16+ 行为更改

对于使用 **Capacitor 8** 面向 **Android 16(API 级别 36)** 及更高版本的应用,以下状态栏配置选项**不再起作用**：

- `overlaysWebView`
- `backgroundColor`

这些选项依赖于能够选择退出 Android 的**边到边**系统 UI 行为,该行为允许应用控制状态栏覆盖方式及其背景颜色。

在 **Android 15(API 级别 35)** 中,仍可能通过在应用布局文件中设置 `windowOptOutEdgeToEdgeEnforcement` 属性来选择退出此强制行为。如果没有该属性,应用将假定 `overlaysWebView` 始终为 `true`。
在 Android 文档中查看更多详细信息：[https://developer.android.com/reference/android/R.attr#windowOptOutEdgeToEdgeEnforcement](https://developer.android.com.reference/android/R.attr#windowOptOutEdgeToEdgeEnforcement)

从 **Android 16** 开始,此选择退出**不再可用**,并且该行为由系统强制执行。
因此,`overlaysWebView` 和 `backgroundColor` 配置选项不再起任何作用。

## iOS 注意事项

此插件需要在 `Info.plist` 中将"基于视图控制器的状态栏外观"(`UIViewControllerBasedStatusBarAppearance`)设置为 `YES`。阅读关于[配置 iOS](https://capacitorjs.com/docs/ios/configuration)以获取帮助。

状态栏可见性默认为可见,样式默认为 `Style.Default`。你可以通过在 `Info.plist` 中添加 `UIStatusBarHidden` 和/或 `UIStatusBarStyle` 来更改这些默认值。

## 示例

```typescript
import { StatusBar, Style } from '@capacitor/status-bar';

// 仅 iOS
window.addEventListener('statusTap', function () {
  console.log('状态栏被点击');
});

// 在透明状态栏下显示内容
StatusBar.setOverlaysWebView({ overlay: true });

const setStatusBarStyleDark = async () => {
  await StatusBar.setStyle({ style: Style.Dark });
};

const setStatusBarStyleLight = async () => {
  await StatusBar.setStyle({ style: Style.Light });
};

const hideStatusBar = async () => {
  await StatusBar.hide();
};

const showStatusBar = async () => {
  await StatusBar.show();
};
```

## 配置

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

这些配置值可用：

| Prop                  | Type                 | Description                                                                                                                  | Default              | Since |
| --------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------- | ----- |
| **`overlaysWebView`** | <code>boolean</code> | 状态栏是否覆盖。在 Android 15+ 上不可用。                                                                                             | <code>true</code>    | 1.0.0 |
| **`style`**           | <code>string</code>  | 状态栏文本的<a href="#style">样式</a>。                                                                                           | <code>default</code> | 1.0.0 |
| **`backgroundColor`** | <code>string</code>  | 状态栏背景的颜色,十六进制格式,#RRGGBB。如果 `overlaysWebView` 为 true 则不起作用。在 Android 15+ 上不可用。                                            | <code>#000000</code> | 1.0.0 |

### 示例

在 `capacitor.config.json` 中：

```json
{
  "plugins": {
    "StatusBar": {
      "overlaysWebView": false,
      "style": "DARK",
      "backgroundColor": "#ffffffff"
    }
  }
}
```

在 `capacitor.config.ts` 中：

```ts
/// <reference types="@capacitor/status-bar" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    StatusBar: {
      overlaysWebView: false,
      style: "DARK",
      backgroundColor: "#ffffffff",
    },
  },
};

export default config;
```

</docgen-config>

## API

<docgen-index>

* [`setStyle(...)`](#setstyle)
* [`setBackgroundColor(...)`](#setbackgroundcolor)
* [`show(...)`](#show)
* [`hide(...)`](#hide)
* [`getInfo()`](#getinfo)
* [`setOverlaysWebView(...)`](#setoverlayswebview)
* [Interfaces](#interfaces)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### setStyle(...)

```typescript
setStyle(options: StyleOptions) => Promise<void>
```

设置状态栏的当前样式。

| Param         | Type                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#styleoptions">StyleOptions</a></code> |

**Since:** 1.0.0

--------------------


### setBackgroundColor(...)

```typescript
setBackgroundColor(options: BackgroundColorOptions) => Promise<void>
```

设置状态栏的背景颜色。
如果样式设置为默认值,则调用此函数会更新状态栏的前景色,但在 iOS 17 以下的版本中除外。
在 Android 15+ 上不可用。

| Param         | Type                                                                      |
| ------------- | ------------------------------------------------------------------------- |
| **`options`** | <code><a href="#backgroundcoloroptions">BackgroundColorOptions</a></code> |

**Since:** 1.0.0

--------------------


### show(...)

```typescript
show(options?: AnimationOptions | undefined) => Promise<void>
```

显示状态栏。
在 iOS 上,如果状态栏最初隐藏且初始样式设置为 `UIStatusBarStyleLightContent`,首次显示调用可能会在动画上显示故障,将文本显示为深色然后过渡到浅色。建议在第一次调用时使用 <a href="#animation">`Animation.None`</a> 作为动画。

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#animationoptions">AnimationOptions</a></code> |

**Since:** 1.0.0

--------------------


### hide(...)

```typescript
hide(options?: AnimationOptions | undefined) => Promise<void>
```

隐藏状态栏。

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#animationoptions">AnimationOptions</a></code> |

**Since:** 1.0.0

--------------------


### getInfo()

```typescript
getInfo() => Promise<StatusBarInfo>
```

获取有关状态栏当前状态的信息。

**Returns:** <code>Promise&lt;<a href="#statusbarinfo">StatusBarInfo</a>&gt;</code>

**Since:** 1.0.0

--------------------


### setOverlaysWebView(...)

```typescript
setOverlaysWebView(options: SetOverlaysWebViewOptions) => Promise<void>
```

设置状态栏是否应覆盖 webview 以允许使用其下方的空间。
在 Android 15+ 上不可用。

| Param         | Type                                                                            |
| ------------- | ------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setoverlayswebviewoptions">SetOverlaysWebViewOptions</a></code> |

**Since:** 1.0.0

--------------------


### Interfaces


#### StyleOptions

| Prop        | Type                                    | Description                     | Since |
| ----------- | --------------------------------------- | ------------------------------- | ----- |
| **`style`** | <code><a href="#style">Style</a></code> | 状态栏文本的<a href="#style">样式</a>。 | 1.0.0 |


#### BackgroundColorOptions

| Prop        | Type                | Description                           | Since |
| ----------- | ------------------- | ------------------------------------- | ----- |
| **`color`** | <code>string</code> | 状态栏颜色设置的十六进制颜色。              | 1.0.0 |


#### AnimationOptions

| Prop            | Type                                            | Description                                                              | Default                     | Since |
| --------------- | ----------------------------------------------- | ------------------------------------------------------------------------ | --------------------------- | ----- |
| **`animation`** | <code><a href="#animation">Animation</a></code> | 显示或隐藏时使用的状态栏动画类型。此选项仅在 iOS 上支持。                              | <code>Animation.Fade</code> | 1.0.0 |


#### StatusBarInfo

| Prop           | Type                                    | Description                 | Since |
| -------------- | --------------------------------------- | --------------------------- | ----- |
| **`visible`**  | <code>boolean</code>                    | 状态栏是否可见。                 | 1.0.0 |
| **`style`**    | <code><a href="#style">Style</a></code> | 当前状态栏样式。                  | 1.0.0 |
| **`color`**    | <code>string</code>                     | 当前状态栏颜色。                  | 1.0.0 |
| **`overlays`** | <code>boolean</code>                    | 状态栏是否覆盖。                   | 1.0.0 |


#### SetOverlaysWebViewOptions

| Prop          | Type                 | Description                     | Since |
| ------------- | -------------------- | ------------------------------- | ----- |
| **`overlay`** | <code>boolean</code> | 是否覆盖状态栏。                      | 1.0.0 |


### Enums


#### Style

| Members       | Value                  | Description                                                                                                       | Since |
| ------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------- | ----- |
| **`Dark`**    | <code>'DARK'</code>    | 深色背景的浅色文本。                                                                                                  | 1.0.0 |
| **`Light`**   | <code>'LIGHT'</code>   | 浅色背景的深色文本。                                                                                                  | 1.0.0 |
| **`Default`** | <code>'DEFAULT'</code> | 样式基于设备外观。如果设备使用深色模式,状态栏文本将为浅色。如果设备使用浅色模式,状态栏文本将为深色。                                          | 1.0.0 |


#### Animation

| Members     | Value                | Description                                       | Since |
| ----------- | -------------------- | ------------------------------------------------- | ----- |
| **`None`**  | <code>'NONE'</code>  | 显示/隐藏期间没有动画。                                  | 1.0.0 |
| **`Slide`** | <code>'SLIDE'</code> | 显示/隐藏期间的滑动动画。在 iOS 15+ 上不起作用。                    | 1.0.0 |
| **`Fade`**  | <code>'FADE'</code>  | 显示/隐藏期间的淡入淡出动画。                                 | 1.0.0 |

</docgen-api>
