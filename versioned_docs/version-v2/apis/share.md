---
title: Share
description: Share API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/share
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

The Share API provides methods for sharing content in any sharing-enabled apps the user may have installed.

The Share API works on iOS, Android, and the Web (using the new [Web Share API](https://developers.google.com/web/updates/2016/09/navigator-share)), though web support is currently spotty.

- [`share(...)`](#share)
- [Interfaces](#interfaces)

## Example

```typescript
import { Plugins } from '@capacitor/core';
const { Share } = Plugins;

let shareRet = await Share.share({
  title: 'See cool stuff',
  text: 'Really awesome thing you need to see right meow',
  url: 'http://ionicframework.com/',
  dialogTitle: 'Share with buddies',
});
```

Each platform uses a different set of fields, but you should supply them all.

## API

### share(...)

```typescript
share(options: ShareOptions) => Promise<any>
```

Show a Share modal for sharing content in your app with other apps

| Param         | Type                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | `<a href="#shareoptions">ShareOptions</a>` |

**Returns:** `Promise&lt;any&gt;`

---

### Interfaces

#### ShareOptions

| Prop              | Type                | Description                                                               |
| ----------------- | ------------------- | ------------------------------------------------------------------------- |
| **`title`**       | `string` | Set a title for any message. This will be the subject if sharing to email |
| **`text`**        | `string` | Set some text to share                                                    |
| **`url`**         | `string` | Set a URL to share, can be http, https or file URL                        |
| **`dialogTitle`** | `string` | Set a title for the share modal. Android only                             |
