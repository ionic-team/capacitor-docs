---
title: Keyboard
description: Keyboard API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/keyboard
---

<plugin-platforms platforms="ios,android"></plugin-platforms>

The Keyboard API provides keyboard display and visibility control, along with event tracking when the keyboard shows and hides.

- [`show()`](#show)
- [`hide()`](#hide)
- [`setAccessoryBarVisible(...)`](#setaccessorybarvisible)
- [`setScroll(...)`](#setscroll)
- [`setStyle(...)`](#setstyle)
- [`setResizeMode(...)`](#setresizemode)
- [`addListener(...)`](#addlistener)
- [`addListener(...)`](#addlistener)
- [`addListener(...)`](#addlistener)
- [`addListener(...)`](#addlistener)
- [`removeAllListeners()`](#removealllisteners)
- [Interfaces](#interfaces)
- [Enums](#enums)

## Window Events for cordova-plugin-ionic-keyboard compatibility

- keyboardWillShow
- keyboardDidShow
- keyboardWillHide
- keyboardDidHide

## Example

```typescript
import { Plugins, KeyboardInfo } from '@capacitor/core';

const { Keyboard } = Plugins;

// Keyboard Plugin Events

Keyboard.addListener('keyboardWillShow', (info: KeyboardInfo) => {
  console.log('keyboard will show with height', info.keyboardHeight);
});

Keyboard.addListener('keyboardDidShow', (info: KeyboardInfo) => {
  console.log('keyboard did show with height', info.keyboardHeight);
});

Keyboard.addListener('keyboardWillHide', () => {
  console.log('keyboard will hide');
});

Keyboard.addListener('keyboardDidHide', () => {
  console.log('keyboard did hide');
});

// window events

window.addEventListener('keyboardWillShow', (e) => {
  console.log('keyboard will show with height', (<any>e).keyboardHeight);
});

window.addEventListener('keyboardDidShow', (e) => {
  console.log('keyboard did show with height', (<any>e).keyboardHeight);
});

window.addEventListener('keyboardWillHide', () => {
  console.log('keyboard will hide');
});

window.addEventListener('keyboardDidHide', () => {
  console.log('keyboard did hide');
});

// API

Keyboard.setAccessoryBarVisible({ isVisible: false });

Keyboard.show();

Keyboard.hide();
```

## Keyboard configuration (iOS only)

The keyboard plugin allows the following configuration values to be added in `capacitor.config.json` for the iOS platform:

- `resize`: It configures the way the app is resized when the Keyboard appears.
  Allowed values are

  - `none`: Not the app, nor the webview are resized
  - `native`: (default) The whole native webview will be resized when the keyboard shows/hides, it will affect the `vh` relative unit.
  - `body`: Only the html `<body>` element will be resized. Relative units are not affected, because the viewport does not change.
  - `ionic`: Only the html ion-app element will be resized. Use it only for ionic apps.

- `style`: If set to `dark` it will use Dark style keyboard instead of the regular one.

```json
{
  "plugins": {
    "Keyboard": {
      "resize": "body",
      "style": "dark"
    }
  }
}
```

## API

### show()

```typescript
show() => Promise<void>
```

Show the keyboard. This method is alpha and may have issues

---

### hide()

```typescript
hide() => Promise<void>
```

Hide the keyboard.

---

### setAccessoryBarVisible(...)

```typescript
setAccessoryBarVisible(options: { isVisible: boolean; }) => Promise<void>
```

Set whether the accessory bar should be visible on the keyboard. We recommend disabling
the accessory bar for short forms (login, signup, etc.) to provide a cleaner UI

| Param         | Type                                 |
| ------------- | ------------------------------------ |
| **`options`** | `{ isVisible: boolean; }` |

---

### setScroll(...)

```typescript
setScroll(options: { isDisabled: boolean; }) => Promise<void>
```

Programmatically enable or disable the WebView scroll

| Param         | Type                                  |
| ------------- | ------------------------------------- |
| **`options`** | `{ isDisabled: boolean; }` |

---

### setStyle(...)

```typescript
setStyle(options: KeyboardStyleOptions) => Promise<void>
```

Programmatically set the keyboard style

| Param         | Type                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#keyboardstyleoptions">KeyboardStyleOptions</a></code> |

---

### setResizeMode(...)

```typescript
setResizeMode(options: KeyboardResizeOptions) => Promise<void>
```

Programmatically set the resize mode

| Param         | Type                                                                    |
| ------------- | ----------------------------------------------------------------------- |
| **`options`** | <code><a href="#keyboardresizeoptions">KeyboardResizeOptions</a></code> |

---

### addListener(...)

```typescript
addListener(eventName: 'keyboardWillShow', listenerFunc: (info: KeyboardInfo) => void) => PluginListenerHandle
```

| Param              | Type                                                                     |
| ------------------ | ------------------------------------------------------------------------ |
| **`eventName`**    | <code>"keyboardWillShow"</code>                                          |
| **`listenerFunc`** | <code>(info: <a href="#keyboardinfo">KeyboardInfo</a>) =&gt; void</code> |

**Returns:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'keyboardDidShow', listenerFunc: (info: KeyboardInfo) => void) => PluginListenerHandle
```

| Param              | Type                                                                     |
| ------------------ | ------------------------------------------------------------------------ |
| **`eventName`**    | <code>"keyboardDidShow"</code>                                           |
| **`listenerFunc`** | <code>(info: <a href="#keyboardinfo">KeyboardInfo</a>) =&gt; void</code> |

**Returns:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'keyboardWillHide', listenerFunc: () => void) => PluginListenerHandle
```

| Param              | Type                            |
| ------------------ | ------------------------------- |
| **`eventName`**    | <code>"keyboardWillHide"</code> |
| **`listenerFunc`** | <code>() =&gt; void</code>      |

**Returns:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'keyboardDidHide', listenerFunc: () => void) => PluginListenerHandle
```

| Param              | Type                           |
| ------------------ | ------------------------------ |
| **`eventName`**    | <code>"keyboardDidHide"</code> |
| **`listenerFunc`** | <code>() =&gt; void</code>     |

**Returns:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### removeAllListeners()

```typescript
removeAllListeners() => void
```

Remove all native listeners for this plugin

---

### Interfaces

#### KeyboardStyleOptions

| Prop        | Type                                                    |
| ----------- | ------------------------------------------------------- |
| **`style`** | <code><a href="#keyboardstyle">KeyboardStyle</a></code> |

#### KeyboardResizeOptions

| Prop       | Type                                                      |
| ---------- | --------------------------------------------------------- |
| **`mode`** | <code><a href="#keyboardresize">KeyboardResize</a></code> |

#### PluginListenerHandle

| Prop         | Type                       |
| ------------ | -------------------------- |
| **`remove`** | <code>() =&gt; void</code> |

#### KeyboardInfo

| Prop                 | Type                |
| -------------------- | ------------------- |
| **`keyboardHeight`** | <code>number</code> |

### Enums

#### KeyboardStyle

| Members     | Value                |
| ----------- | -------------------- |
| **`Dark`**  | <code>"DARK"</code>  |
| **`Light`** | <code>"LIGHT"</code> |

#### KeyboardResize

| Members      | Value                 |
| ------------ | --------------------- |
| **`Body`**   | <code>"body"</code>   |
| **`Ionic`**  | <code>"ionic"</code>  |
| **`Native`** | <code>"native"</code> |
| **`None`**   | <code>"none"</code>   |
