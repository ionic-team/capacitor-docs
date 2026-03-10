---
title: 存储
description: 在 Capacitor 中存储从小到大量的数据
contributors:
  - mlynch
slug: /guides/storage
---

# Capacitor 中的数据存储

大多数应用需要持久化和读取本地数据。根据具体用例，可以采用几种方法。

> 需要加密本地数据吗？Ionic 为 Capacitor 应用提供开箱即用的安全套件，包括身份验证、生物识别和安全存储。[了解更多](https://ionic.io/secure)。

## 为什么我不能只使用 LocalStorage 或 IndexedDB？

由于 Capacitor 应用主要在 Web 视图或浏览器中运行，因此存储的 Web API 可供 Capacitor 开发者使用。但是，使用这些 API 时需要注意一些重大注意事项。

Local Storage 可用于少量临时数据，例如用户 ID，但_必须被视为瞬态的_，这意味着您的应用需要预期数据最终会丢失。这是因为如果设备空间不足，操作系统将从 Web 视图回收本地存储。对于 IndexedDB 至少在 iOS 上也是如此（在 Android 上，[持久化存储 API](https://web.dev/persistent-storage/) 可用于将 IndexedDB 标记为持久化）。在浏览器中阅读有关[数据存储逐出策略](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria)的更多信息。

## Capacitor Preferences API

Capacitor 附带了一个原生的 [Preferences API](/apis/preferences.md)，可以避免上述逐出问题，但仅适用于少量数据。

Preferences API 提供简单的键/值 API，没有高级查询支持：

```typescript
import { Preferences } from '@capacitor/preferences';

// JSON "set" 示例
async setObject() {
  await Preferences.set({
    key: 'user',
    value: JSON.stringify({
      id: 1,
      name: 'Max'
    })
  });
}

// JSON "get" 示例
async getObject() {
  const ret = await Preferences.get({ key: 'user' });
  const user = JSON.parse(ret.value);
}
```

## 大数据或高性能存储选项

为了存储大量数据并以高性能方式访问它，有几个选项。

最广泛支持的选项是 SQLite。有许多社区维护的 SQLite 插件应该可以在 Capacitor 中工作，包括 [capacitor-sqlite](https://github.com/jepiqueau/capacitor-sqlite) 和 [cordova-plugin-sqlite](https://github.com/xpbrew/cordova-sqlite-storage)。

Capacitor 团队还提供[企业 SQLite 存储解决方案](https://ionicframework.com/enterprise/offline-storage)，支持加密并与设备上的[安全密钥管理 API](https://ionicframework.com/enterprise/identity-vault) 集成。
