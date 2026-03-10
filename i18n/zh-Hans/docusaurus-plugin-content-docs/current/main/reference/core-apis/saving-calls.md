---
title: Persisting Plugin Calls
description: How to save plugin calls in Capacitor
slug: /core-apis/saving-calls
---

# 保存插件调用

在大多数情况下，插件方法将被调用以执行任务并可以立即完成。但在某些情况下，你需要保持插件调用可用，以便以后访问。

## 概述

你可能需要插件调用（iOS 上的 `CAPPluginCall` 或 Android 上的 `PluginCall`）在插件的方法之外持续存在的两个原因是：

1. 执行异步操作，例如网络请求。
2. 向 JavaScript 环境提供重复更新，例如流式传输实时地理位置数据。

这两个原因可能会重叠，但有一个重要的区别。具体来说，调用是否需要多次返回数据。Capacitor 桥接记录从 JavaScript 到原生的每次调用，以便在插件返回结果时将结果匹配到正确的代码，默认行为是在调用一次 `resolve()` 或 `reject()` 后删除此簿记。但是如果你的方法是一个将多次 `resolve()` 的回调，则涉及一个额外的步骤。有关如何声明回调的更多信息可以在[此处找到。](/plugins/creating-plugins/method-types.md)

---

### 为单次完成保存调用

如果你需要保存一次调用以在未来完成，你有两个选择。一个选择是简单地将它保存在实例变量中。第二个是使用桥接的一组方法来保存它，然后通过 `callbackId` 稍后检索它。调用 `resolve()` 或 `reject()` 后，你可以释放调用对象，因为它将不再相关（如果你使用了 `saveCall()`，不要忘记调用 `releaseCall()`）。

**iOS**

```swift
func saveCall(_ call: CAPPluginCall)
func savedCall(withID: String) -> CAPPluginCall?
func releaseCall(_ call: CAPPluginCall)
func releaseCall(withID: String)
```

**Android**

```java
void saveCall(PluginCall call)
PluginCall getSavedCall(String callbackId)
void releaseCall(PluginCall call)
void releaseCall(String callbackId)
```

---

### 为多次完成保存调用

保存调用以在未来多次完成意味着两件事：保存原生调用对象本身（如上所述）并告诉桥接保留其簿记，以便可以重复调用 `resolve()` 或 `reject()``。

要以这种方式标记调用，请设置其 `keepAlive` 属性（这在 3 版本之前称为 `isSaved`，但已重命名以使行为更清晰）。

**iOS**

```swift
call.keepAlive = true
```

**Android**

```java
call.setKeepAlive(true);
```

如果 `keepAlive` 为 true，则可以根据需要多次调用 `resolve()`，并将按预期返回结果。将此标志设置为 true 也意味着桥接将在你的方法返回后自动为你调用 `saveCall()`。
