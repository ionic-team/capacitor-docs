---
title: Capacitor Android API
description: The API for Capacitor on Android
slug: /core-apis/android
---

# Capacitor Android API

Capacitor Android is the native runtime that powers Capacitor apps on Android.

## Bridge

The Android bridge is the heart of the Capacitor Android library. There are several methods available on the bridge which provide information or change behavior.

When registered with Capacitor, plugins have access to the bridge:

```java
this.bridge
```

---

### getConfig()

```java
public CapConfig getConfig()
```

This property contains the configuration object known to the Capacitor runtime.

---

### triggerJSEvent(...)

```java
public void triggerJSEvent(final String eventName, final String target)
public void triggerJSEvent(final String eventName, final String target, final String data)
```

Fire an event on a JavaScript [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) such as `window` or `document`. If possible, it is preferred to use [Plugin Events](/plugins/creating-plugins/android-guide.md#plugin-events) instead.

Examples:

```java
bridge.triggerJSEvent("myCustomEvent", "window");
bridge.triggerJSEvent("myCustomEvent", "document", "{ 'dataKey': 'dataValue' }");
```

Note: `data` must be a serialized JSON string value.

---

## Passing data

Notes on how to work with data that is passed between environments can be [found here](/main/reference/core-apis/data-types.md).

---

## Saving CAPPluginCall

Notes on persisting plugin calls for asynchronous or repeated operations can be [found here](/main/reference/core-apis/saving-calls.md).
