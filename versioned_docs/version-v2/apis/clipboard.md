---
title: Clipboard
description: Clipboard API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/clipboard
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

The Clipboard API enables copy and pasting to/from the clipboard. On iOS this API also allows
copying images and URLs.

- [`write(...)`](#write)
- [`read()`](#read)
- [Interfaces](#interfaces)

## Example

```typescript
import { Plugins } from '@capacitor/core';

const { Clipboard } = Plugins;

Clipboard.write({
  string: 'Hello, Moto',
});

let result = await Clipboard.read();
console.log('Got', result.type, 'from clipboard:', result.value);
```

## API

### write(...)

```typescript
write(options: ClipboardWrite) => Promise<void>
```

Write a value to the clipboard (the "copy" action)

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#clipboardwrite">ClipboardWrite</a></code> |

---

### read()

```typescript
read() => Promise<ClipboardReadResult>
```

Read a value from the clipboard (the "paste" action)

**Returns:** <code>Promise&lt;<a href="#clipboardreadresult">ClipboardReadResult</a>&gt;</code>

---

### Interfaces

#### ClipboardWrite

| Prop         | Type                |
| ------------ | ------------------- |
| **`string`** | <code>string</code> |
| **`image`**  | <code>string</code> |
| **`url`**    | <code>string</code> |
| **`label`**  | <code>string</code> |

#### ClipboardReadResult

| Prop        | Type                |
| ----------- | ------------------- |
| **`value`** | <code>string</code> |
| **`type`**  | <code>string</code> |
