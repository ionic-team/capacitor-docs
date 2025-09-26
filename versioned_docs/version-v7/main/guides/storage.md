---
title: Storage
description: Storing small to large amounts of data in Capacitor
contributors:
  - mlynch
slug: /guides/storage
---

# Data Storage in Capacitor

Most apps need to persist and read local data. Depending on the specific use case, there are a few approaches one can take.

> Need your local data encrypted? Ionic provides an out of the box security suite for Capacitor apps that includes Authentication, Biometrics, and Secure Storage. [Learn more](https://ionic.io/secure).

## Why can't I just use LocalStorage or IndexedDB?

Since Capacitor apps run primarily in a web view or browser, Web APIs for storage are available to Capacitor developers. However, there are some major caveats to keep in mind with these APIs.

Local Storage can be used for small amounts of temporary data, such as a user id, but _must be considered transient_, meaning your app needs to expect that the data will be lost eventually. This is because the OS will reclaim local storage from Web Views if a device is running low on space. The same can be said for IndexedDB at least on iOS (on Android, the [persisted storage API](https://web.dev/persistent-storage/) is available to mark IndexedDB as persisted). Read more on [data storage eviction policies](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria) in the browser.

## Capacitor Preferences API

Capacitor comes with a native [Preferences API](/apis/preferences.md) that avoids the eviction issues above, but is meant for small amounts of data.

The Preferences API provides a simple key/value API with no advanced query support:

```typescript
import { Preferences } from '@capacitor/preferences';

// JSON "set" example
async setObject() {
  await Preferences.set({
    key: 'user',
    value: JSON.stringify({
      id: 1,
      name: 'Max'
    })
  });
}

// JSON "get" example
async getObject() {
  const ret = await Preferences.get({ key: 'user' });
  const user = JSON.parse(ret.value);
}
```

## Large data or high performance storage options

For storing large amounts of data and accessing it in a high performance way, there are a few options.

The most widely supported option is SQLite. There are a number of community-maintained SQLite plugins that should work in Capacitor, including [capacitor-sqlite](https://github.com/jepiqueau/capacitor-sqlite) and [cordova-plugin-sqlite](https://github.com/xpbrew/cordova-sqlite-storage).

The Capacitor team also offers an [enterprise SQLite storage solution](https://ionicframework.com/enterprise/offline-storage) with encryption support and integration with [secure key management APIs](https://ionicframework.com/enterprise/identity-vault) on device.
