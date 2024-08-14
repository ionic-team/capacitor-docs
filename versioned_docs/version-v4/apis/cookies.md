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
| **`enabled`** | <code>boolean</code> | Enable the patching of `document.cookie` to use native libraries instead. | <code>false</code> |

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

- [`setCookie(...)`](#setcookie)
- [`deleteCookie(...)`](#deletecookie)
- [`clearCookies(...)`](#clearcookies)
- [`clearAllCookies()`](#clearallcookies)

</docgen-index>

<docgen-api>

### setCookie(...)

```typescript
setCookie(options: SetCookieOptions) => Promise<void>
```

Write a cookie to the device.

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#setcookieoptions">SetCookieOptions</a></code> |

---

### deleteCookie(...)

```typescript
deleteCookie(options: DeleteCookieOptions) => Promise<void>
```

Delete a cookie from the device.

| Param         | Type                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#deletecookieoptions">DeleteCookieOptions</a></code> |

---

### clearCookies(...)

```typescript
clearCookies(options: ClearCookieOptions) => Promise<void>
```

Clear cookies from the device at a given URL.

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#clearcookieoptions">ClearCookieOptions</a></code> |

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
| **`url?`**     | <code>string</code> | The URL to write the cookie to.  |
| **`key`**      | <code>string</code> | The key to give the cookie.      |
| **`value`**    | <code>string</code> | The value to give the cookie.    |
| **`path?`**    | <code>string</code> | The path to write the cookie to. |
| **`expires?`** | <code>string</code> | The date to expire the cookie.   |

#### DeleteCookieOptions

| Prop       | Type                | Description                        |
| ---------- | ------------------- | ---------------------------------- |
| **`url?`** | <code>string</code> | The URL to delete the cookie from. |
| **`key`**  | <code>string</code> | The key of the cookie to delete.   |

#### ClearCookieOptions

| Prop       | Type                | Description                    |
| ---------- | ------------------- | ------------------------------ |
| **`url?`** | <code>string</code> | The URL to clear cookies from. |

</docgen-api>
