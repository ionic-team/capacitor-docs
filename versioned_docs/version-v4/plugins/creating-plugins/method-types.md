---
title: Method Types
description: Capacitor Plugin Method Types
contributors:
  - ikeith
sidebar_label: Method Types
slug: /plugins/method-types
---

# Method Types

When developing plugins, there are three different types of method signatures that can be used. All are asynchronous and promise-based.

Let's consider a plugin definition that includes all three types:

```typescript
export type CallbackID = string;

export interface MyData {
  data: string;
}

export type MyPluginCallback = (message: MyData | null, err?: any) => void;

export interface MyPlugin {
  method1(): Promise<void>;
  method2(): Promise<MyData>;
  method3(callback: MyPluginCallback): Promise<CallbackID>;
}
```

## Void Return

`method1()` is the simplest case that is expected to return no data. You can check the promise for an error but when it resolves the result is ignored.

For android, you would annotate the method like this:

```java
@PluginMethod(returnType = PluginMethod.RETURN_NONE)
public void method1(PluginCall call) {
}
```

For iOS, you would declare the method this way in your plugin's `.m` file:

```objc
CAP_PLUGIN(MyPlugin, "MyPlugin",
           CAP_PLUGIN_METHOD(method1, CAPPluginReturnNone);
)
```

## Value Return

`method2()` is the most common case: A promise that resolves with some value.

For Android, this method type is the default and specifying the return type is optional:

```java
@PluginMethod()
public void method2(PluginCall call) {
}
```

For iOS, you would declare the method this way in your plugin's `.m` file:

```objc
CAP_PLUGIN(MyPlugin, "MyPlugin",
           CAP_PLUGIN_METHOD(method2, CAPPluginReturnPromise);
)
```

## Callback

`method3()` is the most complex type but also the least common in practice. It is used when your plugin needs to return data repeatedly, such as when monitoring the device's location via the geolocation API.

For android, you would annotate the method like this:

```java
@PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
public void method3(PluginCall call) {
}
```

For iOS, you would declare the method this way in your plugin's `.m` file:

```objc
CAP_PLUGIN(MyPlugin, "MyPlugin",
           CAP_PLUGIN_METHOD(method3, CAPPluginReturnCallback);
)
```

Callback methods take a function that will be invoked (potentially many times) from the native code and return a promise that will resolve with an identifier.

On the native side, implementing a callback means you need to save the call so it can be invoked at a later time. The specifics of how to handle that [are discussed here.](/main/reference/core-apis/saving-calls.md)
