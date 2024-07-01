---
title: Status Bar
description: Status Bar API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/status-bar
---

<plugin-platforms platforms="ios,android"></plugin-platforms>

# Status Bar

The StatusBar API Provides methods for configuring the style of the Status Bar, along with showing or hiding it.



- [`setStyle(...)`](#setstyle)
- [`setBackgroundColor(...)`](#setbackgroundcolor)
- [`show(...)`](#show)
- [`hide(...)`](#hide)
- [`getInfo()`](#getinfo)
- [`setOverlaysWebView(...)`](#setoverlayswebview)
- [Interfaces](#interfaces)
- [Enums](#enums)



## iOS Note

This plugin requires "View controller-based status bar appearance" (`UIViewControllerBasedStatusBarAppearance`) set to `YES` in `Info.plist`. Read about [Configuring iOS](/ios/configuration.md) for help.

The status bar visibility defaults to visible and the style defaults to `StatusBarStyle.Light`. You can change these defaults by adding `UIStatusBarHidden` and or `UIStatusBarStyle` in the `Info.plist`.

`setBackgroundColor` and `setOverlaysWebView` are currently not supported on iOS devices.

## Events

- statusTap

## Example

```typescript
// Events (iOS only)
window.addEventListener('statusTap', function () {
  console.log('statusbar tapped');
});

//API
import { Plugins, StatusBarStyle } from '@capacitor/core';

const { StatusBar } = Plugins;

export class StatusBarExample {
  isStatusBarLight = true;

  changeStatusBar() {
    StatusBar.setStyle({
      style: this.isStatusBarLight ? StatusBarStyle.Dark : StatusBarStyle.Light,
    });
    this.isStatusBarLight = !this.isStatusBarLight;

    // Display content under transparent status bar (Android only)
    StatusBar.setOverlaysWebView({
      overlay: true,
    });
  }

  hideStatusBar() {
    StatusBar.hide();
  }

  showStatusBar() {
    StatusBar.show();
  }
}
```

## API




### setStyle(...)

```typescript
setStyle(options: StatusBarStyleOptions) => Promise<void>
```

Set the current style of the status bar

| Param         | Type                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#statusbarstyleoptions">StatusBarStyleOptions</a></code> |

---

### setBackgroundColor(...)

```typescript
setBackgroundColor(options: StatusBarBackgroundColorOptions) => Promise<void>
```

Set the background color of the status bar

| Param         | Type                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#statusbarbackgroundcoloroptions">StatusBarBackgroundColorOptions</a></code> |

---

### show(...)

```typescript
show(options?: StatusBarAnimationOptions) => Promise<void>
```

Show the status bar

| Param         | Type                                                                            |
| ------------- | ------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#statusbaranimationoptions">StatusBarAnimationOptions</a></code> |

---

### hide(...)

```typescript
hide(options?: StatusBarAnimationOptions) => Promise<void>
```

Hide the status bar

| Param         | Type                                                                            |
| ------------- | ------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#statusbaranimationoptions">StatusBarAnimationOptions</a></code> |

---

### getInfo()

```typescript
getInfo() => Promise<StatusBarInfoResult>
```

Get info about the current state of the status bar

**Returns:** <code>Promise&lt;<a href="#statusbarinforesult">StatusBarInfoResult</a>&gt;</code>

---

### setOverlaysWebView(...)

```typescript
setOverlaysWebView(options: StatusBarOverlaysWebviewOptions) => Promise<void>
```

Set whether or not the status bar should overlay the webview to allow usage of the space
around a device "notch"

| Param         | Type                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#statusbaroverlayswebviewoptions">StatusBarOverlaysWebviewOptions</a></code> |

---

### Interfaces

#### StatusBarStyleOptions

| Prop        | Type                                                      |
| ----------- | --------------------------------------------------------- |
| **`style`** | <code><a href="#statusbarstyle">StatusBarStyle</a></code> |

#### StatusBarBackgroundColorOptions

| Prop        | Type                |
| ----------- | ------------------- |
| **`color`** | <code>string</code> |

#### StatusBarAnimationOptions

| Prop            | Type                                                              | Description                                                             |
| --------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **`animation`** | <code><a href="#statusbaranimation">StatusBarAnimation</a></code> | iOS only. The type of status bar animation used when showing or hiding. |

#### StatusBarInfoResult

| Prop           | Type                                                      |
| -------------- | --------------------------------------------------------- |
| **`visible`**  | <code>boolean</code>                                      |
| **`style`**    | <code><a href="#statusbarstyle">StatusBarStyle</a></code> |
| **`color`**    | <code>string</code>                                       |
| **`overlays`** | <code>boolean</code>                                      |

#### StatusBarOverlaysWebviewOptions

| Prop          | Type                 |
| ------------- | -------------------- |
| **`overlay`** | <code>boolean</code> |

### Enums

#### StatusBarStyle

| Members     | Value                | Description                      |
| ----------- | -------------------- | -------------------------------- |
| **`Dark`**  | <code>"DARK"</code>  | Light text for dark backgrounds. |
| **`Light`** | <code>"LIGHT"</code> | Dark text for light backgrounds. |

#### StatusBarAnimation

| Members     | Value                | Description                       |
| ----------- | -------------------- | --------------------------------- |
| **`None`**  | <code>"NONE"</code>  | No animation during show/hide.    |
| **`Slide`** | <code>"SLIDE"</code> | Slide animation during show/hide. |
| **`Fade`**  | <code>"FADE"</code>  | Fade animation during show/hide.  |


