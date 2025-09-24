---
title: Persisting Plugin Calls
description: How to save plugin calls in Capacitor
slug: /core-apis/saving-calls
---

# Saving Plugin Calls

In most cases, a plugin method will get invoked to perform a task and can finish immediately. But there are situations where you will need to keep the plugin call available so it can be accessed later.

## Overview

Two reasons you might need a plugin call (`CAPPluginCall` on iOS or `PluginCall` on Android) to persist outside of the method in your plugin are:

1. To perform an asynchronous action, such as a network request.
2. To provide repeated updates back to the JavaScript environment, such as streaming live geolocation data.

These two reasons can overlap but there is an important distinction. Specifically, whether or not a call will need to return data more than once. The Capacitor bridge records each call that is made from JavaScript to native so that it can match the result to the correct code when the plugin returns it, and the default behavior is to erase this bookkeeping after `resolve()` or `reject()` is called once. But if your method is a callback that will `resolve()` multiple times, then there is an extra step involved. More information about how to declare callbacks [can be found here.](/plugins/creating-plugins/method-types.md)

---

### Saving a call for a single completion

If you need to save a call to be completed once in the future, you have two options. One option is to simply save it locally in an instance variable. The second is to use the bridge's set of methods to save it and then retrieve it later via the `callbackId`. After calling `resolve()` or `reject()`, you can dispose of the call object as it will no longer be relevant (don't forget to call `releaseCall()` if you used `saveCall()`).

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

### Saving a call for multiple completions

Saving a call to be completed multiple times in the future means two things: saving the native call object itself (as above) and telling the bridge to preserve its bookkeeping so `resolve()` or `reject()` can be invoked repeatedly.

To mark a call this way, set its `keepAlive` property (this was called `isSaved` prior to version 3 but has been renamed to make the behavior clearer).

**iOS**

```swift
call.keepAlive = true
```

**Android**

```java
call.setKeepAlive(true);
```

If `keepAlive` is true, then `resolve()` can be called as many times as necessary and the result will be returned as expected. Setting this flag to true also means that the bridge will automatically call `saveCall()` for you after your method returns.
