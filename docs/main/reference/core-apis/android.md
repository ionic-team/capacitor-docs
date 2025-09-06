---
title: Capacitor Android API
description: Capacitor 在 Android 平台上的 API 接口
slug: /core-apis/android
---

# Capacitor Android API

Capacitor Android 是为 Capacitor 应用提供支持的 Android 原生运行时环境。

## 桥接机制（Bridge）

Android 桥接器是 Capacitor Android 库的核心组件。桥接器提供了多个方法，用于获取信息或改变运行行为。

当插件在 Capacitor 中注册后，即可访问桥接器：

```java
this.bridge
```

---

### getConfig()

```java
public CapConfig getConfig()
```

该属性包含 Capacitor 运行时已知的配置对象。

---

### triggerJSEvent(...)

```java
public void triggerJSEvent(final String eventName, final String target)
public void triggerJSEvent(final String eventName, final String target, final String data)
```

在 JavaScript 的 [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)（如 `window` 或 `document`）上触发事件。如果可能，建议优先使用[插件事件](/plugins/creating-plugins/android-guide.md#plugin-events)。

示例：

```java
bridge.triggerJSEvent("myCustomEvent", "window");
bridge.triggerJSEvent("myCustomEvent", "document", "{ 'dataKey': 'dataValue' }");
```

注意：`data` 必须是序列化的 JSON 字符串值。

---

## 数据传递

关于如何处理在不同环境间传递数据的说明，可[在此查看](/main/reference/core-apis/data-types.md)。

---

## 保存 CAPPluginCall

关于为异步或重复操作持久化插件调用的说明，可[在此查看](/main/reference/core-apis/saving-calls.md)。