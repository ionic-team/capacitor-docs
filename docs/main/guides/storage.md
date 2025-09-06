---
title: Storage
description: 在 Capacitor 中存储小到大的数据量
contributors:
  - mlynch
slug: /guides/storage
---

# Capacitor 数据存储

大多数应用都需要持久化和读取本地数据。根据具体使用场景，可以采用以下几种方法。

> 需要本地数据加密？Ionic 为 Capacitor 应用提供了一套开箱即用的安全解决方案，包括身份验证、生物识别和安全存储。[了解更多](https://ionic.io/secure)。

## 为什么不能直接使用 LocalStorage 或 IndexedDB？

由于 Capacitor 应用主要在 Web 视图或浏览器中运行，因此 Capacitor 开发者可以使用 Web API 进行存储。然而，这些 API 存在一些主要的注意事项需要牢记。

Local Storage 可用于存储少量临时数据，例如用户 ID，但_必须将其视为临时存储_，这意味着您的应用需要预期数据最终可能会丢失。这是因为如果设备存储空间不足，操作系统会回收 Web 视图中的本地存储。至少在 iOS 上，IndexedDB 也是如此（在 Android 上，可以使用[持久存储 API](https://web.dev/persistent-storage/) 将 IndexedDB 标记为持久存储）。在浏览器中了解更多关于[数据存储驱逐策略](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria)的信息。

## Capacitor Preferences API

Capacitor 自带一个原生的 [Preferences API](/apis/preferences.md)，可以避免上述的驱逐问题，但仅适用于少量数据。

Preferences API 提供了一个简单的键/值 API，不支持高级查询：

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

## 大数据量或高性能存储选项

对于存储大量数据并以高性能方式访问，有几种选择。

最广泛支持的选项是 SQLite。有许多社区维护的 SQLite 插件可以在 Capacitor 中使用，包括 [capacitor-sqlite](https://github.com/jepiqueau/capacitor-sqlite) 和 [cordova-plugin-sqlite](https://github.com/xpbrew/cordova-sqlite-storage)。

Capacitor 团队还提供了一个[企业级 SQLite 存储解决方案](https://ionicframework.com/enterprise/offline-storage)，支持加密并与设备上的[安全密钥管理 API](https://ionicframework.com/enterprise/identity-vault) 集成。