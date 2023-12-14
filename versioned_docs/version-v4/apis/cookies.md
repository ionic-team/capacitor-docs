---
title: Capacitor Cookies Plugin API
description: The Capacitor Cookies API provides native cookie support via patching `document.cookie` to use native libraries.
sidebar_label: Cookies
---

# CapacitorCookies

The Capacitor Cookies API provides native cookie support via patching `document.cookie` to use native libraries. It also provides methods for modifying cookies at a specific url. This plugin is bundled with `@capacitor/core`.

## Configuration

By default, the patching of `document.cookie` to use native libraries is disabled.
If you would like to enable this feature, modify the configuration below in the `capacitor.config` file.

| Prop          | Type                 | Description                                                               | Default            |
| ------------- | -------------------- | ------------------------------------------------------------------------- | ------------------ |
| **`enabled`** | `boolean` | Enable the patching of `document.cookie` to use native libraries instead. | `false` |

### Example Configuration

In `capacitor.config.json`:

```json
{
  "plugins": {
    "CapacitorCookies": {
      "enabled": true
    }
  }
}
```

In `capacitor.config.ts`:

```ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
  },
};

export default config;
```

## Example

```typescript
import { CapacitorCookies } from '@capacitor/core';

const getCookies = () => {
  return document.cookie;
};

const setCookie = () => {
  document.cookie = key + '=' + value;
};

const setCapacitorCookie = async () => {
  await CapacitorCookies.setCookie({
    url: 'http://example.com',
    key: 'language',
    value: 'en',
  });
};

const deleteCookie = async () => {
  await CapacitorCookies.deleteCookie({
    url: 'https://example.com',
    key: 'language',
  });
};

const clearCookiesOnUrl = async () => {
  await CapacitorCookies.clearCookies({
    url: 'https://example.com',
  });
};

const clearAllCookies = async () => {
  await CapacitorCookies.clearAllCookies();
};
```

## Third Party Cookies on iOS

As of iOS 14, you cannot use 3rd party cookies by default. Add the following lines to your Info.plist file to get better support for cookies on iOS. You can add up to 10 domains.

```xml
<key>WKAppBoundDomains</key>
<array>
  <string>www.mydomain.com</string>
  <string>api.mydomain.com</string>
  <string>www.myothercooldomain.com</string>
</array>
```

## API

<docgen-index>

- [`setCookie(...)`](#setCookie)
- [`deleteCookie(...)`](#deleteCookie)
- [`clearCookies(...)`](#clearCookies)
- [`clearAllCookies()`](#clearAllCookies)

</docgen-index>

<docgen-api>

### setCookie(...)

```typescript
setCookie(options: SetCookieOptions) => Promise<void>
```

Write a cookie to the device.

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | `<a href="#setcookieoptions">SetCookieOptions</a>` |

---

### deleteCookie(...)

```typescript
deleteCookie(options: DeleteCookieOptions) => Promise<void>
```

Delete a cookie from the device.

| Param         | Type                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | `<a href="#deletecookieoptions">DeleteCookieOptions</a>` |

---

### clearCookies(...)

```typescript
clearCookies(options: ClearCookieOptions) => Promise<void>
```

Clear cookies from the device at a given URL.

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | `<a href="#clearcookieoptions">ClearCookieOptions</a>` |

---

### clearAllCookies()

```typescript
clearAllCookies() => Promise<void>
```

Clear all cookies on the device.

---

### Interfaces

#### SetCookieOptions

| Prop           | Type                | Description                      |
| -------------- | ------------------- | -------------------------------- |
| **`url?`**     | `string` | The URL to write the cookie to.  |
| **`key`**      | `string` | The key to give the cookie.      |
| **`value`**    | `string` | The value to give the cookie.    |
| **`path?`**    | `string` | The path to write the cookie to. |
| **`expires?`** | `string` | The date to expire the cookie.   |

#### DeleteCookieOptions

| Prop       | Type                | Description                        |
| ---------- | ------------------- | ---------------------------------- |
| **`url?`** | `string` | The URL to delete the cookie from. |
| **`key`**  | `string` | The key of the cookie to delete.   |

#### ClearCookieOptions

| Prop       | Type                | Description                    |
| ---------- | ------------------- | ------------------------------ |
| **`url?`** | `string` | The URL to clear cookies from. |

</docgen-api>
