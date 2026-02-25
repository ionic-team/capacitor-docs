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

##### FLAG_SECURE Behavior
When the privacy screen is enabled, the plugin automatically applies Android's [`FLAG_SECURE`](https://developer.android.com/reference/android/view/WindowManager.LayoutParams#FLAG_SECURE) flag to the window. This provides comprehensive content protection:

- **Screenshot Prevention**: Prevents users from taking screenshots or screen recordings of your app
- **App Switcher/Recent Apps**: When the app appears in the recent apps view, FLAG_SECURE causes the system to show either a black screen or the last frame captured before FLAG_SECURE was applied (typically blank)
- **Non-Secure Display Protection**: Prevents the window content from appearing on non-secure displays such as TVs, projectors, or screen mirroring to untrusted devices
- **Live View Protection**: In cases where FLAG_SECURE doesn't fully protect content (such as with gesture navigation or live view fragments that can persist for minutes), the plugin displays a temporary privacy screen overlay. This overlay can be configured via `dimBackground` (shows a dim overlay) or shows the splash screen by default.

##### Navigation Method Differences
The privacy screen behavior varies depending on how the user navigates away from the app:
- **Recent Apps Button/Gesture**: The privacy dialog displays as configured when viewing the app switcher
- **Home Button**: FLAG_SECURE ensures content protection in the app switcher snapshot
- **Activity Background Events**: Controlled separately via `privacyModeOnActivityHidden` for scenarios like biometric prompts

## Usage

### Basic Usage

```typescript
import { PrivacyScreen } from '@capacitor/privacy-screen';

// Enable privacy screen with default settings
await PrivacyScreen.enable();

// Enable with platform-specific configuration
await PrivacyScreen.enable({
  android: {
    dimBackground: true,
    privacyModeOnActivityHidden: 'splash'
  },
  ios: {
    blurEffect: 'dark'
  }
});

// Disable privacy screen
await PrivacyScreen.disable();

// Check if privacy screen is enabled
const { enabled } = await PrivacyScreen.isEnabled();
```

### Per-Screen Protection

You can enable and disable the privacy screen on specific screens by calling `enable()` when entering a screen and `disable()` when leaving. Note: Make sure to call the appropriate method whenever navigating between screens, including when using back navigation.

```typescript
import { PrivacyScreen } from '@capacitor/privacy-screen';

// Enable privacy screen when navigating to a secure screen
async function navigateToSecureScreen() {
  await PrivacyScreen.enable({
    android: { dimBackground: true },
    ios: { blurEffect: 'dark' }
  });
  // Navigate to your secure screen
}

// Disable when navigating to a non-secure screen
async function navigateToPublicScreen() {
  await PrivacyScreen.disable();
  // Navigate to your public screen
}
```

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