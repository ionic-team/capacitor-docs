---
title: Privacy Screen Capacitor Plugin API
description: The Privacy Screen plugin provides functionality to prevent sensitive information from being visible in app switchers and when leaving an app.
custom_edit_url: https://github.com/ionic-team/capacitor-privacy-screen/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-privacy-screen/blob/main/src/definitions.ts
sidebar_label: Privacy Screen
---

# @capacitor/privacy-screen

The Privacy Screen plugin provides functionality to prevent sensitive information from being visible in app switchers and when leaving an app.

> **Note:** This plugin is supported on Android and iOS platforms only. It is not available for web platforms.

## Install

```bash
npm install @capacitor/privacy-screen
npx cap sync
```

### Platform Notes

#### Android
The privacy screen behavior on Android varies depending on the navigation method used:
- When using gesture navigation or the recent apps button, the privacy screen will display as configured
- When using the home button to exit the app, the system must fall back to using [`FLAG_SECURE`](https://developer.android.com/reference/android/view/WindowManager.LayoutParams#FLAG_SECURE) as it's the only way to prevent content visibility in this scenario

## API

<docgen-index>

* [`enable(...)`](#enable)
* [`disable()`](#disable)
* [`isEnabled()`](#isenabled)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### enable(...)

```typescript
enable(config?: PrivacyScreenConfig | undefined) => Promise<{ success: boolean; }>
```

Enable privacy screen protection

| Param        | Type                                                                | Description                                           |
| ------------ | ------------------------------------------------------------------- | ----------------------------------------------------- |
| **`config`** | <code><a href="#privacyscreenconfig">PrivacyScreenConfig</a></code> | Optional configuration for platform-specific behavior |

**Returns:** <code>Promise&lt;{ success: boolean; }&gt;</code>

--------------------


### disable()

```typescript
disable() => Promise<{ success: boolean; }>
```

Disable privacy screen protection

**Returns:** <code>Promise&lt;{ success: boolean; }&gt;</code>

--------------------


### isEnabled()

```typescript
isEnabled() => Promise<{ enabled: boolean; }>
```

Check if privacy screen is currently enabled

**Returns:** <code>Promise&lt;{ enabled: boolean; }&gt;</code>

--------------------


### Interfaces


#### PrivacyScreenConfig

| Prop          | Type                                                                                                                               |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **`android`** | <code>{ dimBackground?: boolean; preventScreenshots?: boolean; privacyModeOnActivityHidden?: 'none' \| 'dim' \| 'splash'; }</code> |
| **`ios`**     | <code>{ blurEffect?: 'none' \| 'light' \| 'dark'; }</code>                                                                         |

</docgen-api>