---
title: Privacy Screen Capacitor 插件 API
description: Privacy Screen 插件提供功能，防止敏感信息在应用切换器中和离开应用时可见。
custom_edit_url: https://github.com/ionic-team/capacitor-privacy-screen/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-privacy-screen/blob/main/src/definitions.ts
sidebar_label: Privacy Screen
---

# @capacitor/privacy-screen

Privacy Screen 插件提供功能，防止敏感信息在应用切换器中和离开应用时可见。

> **注意：** 此插件仅支持 Android 和 iOS 平台，不适用于 Web 平台。

## 安装

```bash
npm install @capacitor/privacy-screen
npx cap sync
```

### 平台说明

#### Android
Android 上的隐私屏幕行为因使用的导航方法而异：
- 使用手势导航或最近应用按钮时，隐私屏幕将按配置显示
- 使用主页按钮退出应用时，系统必须回退到使用 [`FLAG_SECURE`](https://developer.android.com/reference/android/view/WindowManager.LayoutParams#FLAG_SECURE)，因为这是在此场景下防止内容可见的唯一方法

## API

<docgen-index>

* [`enable(...)`](#enable)
* [`disable()`](#disable)
* [`isEnabled()`](#isenabled)
* [接口](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### enable(...)

```typescript
enable(config?: PrivacyScreenConfig | undefined) => Promise<{ success: boolean; }>
```

启用隐私屏幕保护

| 参数          | 类型                                                                  | 描述                                           |
| ------------ | ------------------------------------------------------------------- | ----------------------------------------------------- |
| **`config`** | <code><a href="#privacyscreenconfig">PrivacyScreenConfig</a></code> | 可选配置，用于平台特定行为 |

**返回值：** <code>Promise&lt;{ success: boolean; }&gt;</code>

--------------------


### disable()

```typescript
disable() => Promise<{ success: boolean; }>
```

禁用隐私屏幕保护

**返回值：** <code>Promise&lt;{ success: boolean; }&gt;</code>

--------------------


### isEnabled()

```typescript
isEnabled() => Promise<{ enabled: boolean; }>
```

检查隐私屏幕当前是否启用

**返回值：** <code>Promise&lt;{ enabled: boolean; }&gt;</code>

--------------------


### 接口


#### PrivacyScreenConfig

| 属性          | 类型                                                                                                                               |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **`android`** | <code>{ dimBackground?: boolean; preventScreenshots?: boolean; privacyModeOnActivityHidden?: 'none' \| 'dim' \| 'splash'; }</code> |
| **`ios`**     | <code>{ blurEffect?: 'none' \| 'light' \| 'dark'; }</code>                                                                         |

</docgen-api>