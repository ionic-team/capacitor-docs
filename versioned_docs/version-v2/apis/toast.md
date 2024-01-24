---
title: Toast
description: Toast API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/toast
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

The Toast API provides a notification pop up for displaying important information to a user. Just like real toast!

- [`show(...)`](#show)
- [Interfaces](#interfaces)

## PWA Notes

[PWA Elements](/web/pwa-elements.md) are required for Toast plugin to work.

## Example

```typescript
import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;

async show() {
  await Toast.show({
    text: 'Hello!'
  });
}
```

## API

### show(...)

```typescript
show(options: ToastShowOptions) => Promise<void>
```

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#toastshowoptions">ToastShowOptions</a></code> |

---

### Interfaces

#### ToastShowOptions

| Prop           | Type                                       | Description                                                                |
| -------------- | ------------------------------------------ | -------------------------------------------------------------------------- |
| **`text`**     | <code>string</code>                        |                                                                            |
| **`duration`** | <code>"short" \| "long"</code>             | Duration of the toast, either 'short' (2000ms, default) or 'long' (3500ms) |
| **`position`** | <code>"center" \| "bottom" \| "top"</code> |                                                                            |
