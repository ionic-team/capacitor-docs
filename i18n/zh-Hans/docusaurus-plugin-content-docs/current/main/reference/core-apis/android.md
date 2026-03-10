---
title: Capacitor Android API
description: The API for Capacitor on Android
slug: /core-apis/android
---

# Capacitor Android API

Capacitor Android 是为 Android 上的 Capacitor 应用提供支持的原生运行时。

## 桥接

Android 桥接是 Capacitor Android 库的核心。桥接上有几个方法可用，可以提供信息或更改行为。

向 Capacitor 注册后，插件可以访问桥接：

```java
this.bridge
```

---

### getConfig()

```java
public CapConfig getConfig()
```

此属性包含 Capacitor 运行时已知的配置对象。

---

### triggerJSEvent(...)

```java
public void triggerJSEvent(final String eventName, final String target)
public void triggerJSEvent(final String eventName, final String target, final String data)
```

在 JavaScript [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)（例如 `window` 或 `document`）上触发事件。如果可能，最好使用 [Plugin Events](/plugins/creating-plugins/android-guide.md#plugin-events)。

示例：

```java
bridge.triggerJSEvent("myCustomEvent", "window");
bridge.triggerJSEvent("myCustomEvent", "document", "{ 'dataKey': 'dataValue' }");
```

注意：`data` 必须是序列化的 JSON 字符串值。

---

## 传递数据

有关如何在环境之间处理传递的数据的说明可以在[此处](/main/reference/core-apis/data-types.md)找到。

---

## 保存 CAPPluginCall

有关为异步或重复操作持久化插件调用的说明可以在[此处](/main/reference/core-apis/saving-calls.md)找到。
