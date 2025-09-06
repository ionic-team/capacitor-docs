---
title: Method Types
description: Capacitor 插件方法类型
contributors:
  - ikeith
sidebar_label: 方法类型
slug: /plugins/method-types
---

# 方法类型

开发插件时，可以使用三种不同类型的方法签名。所有方法都是基于 Promise 的异步方法。

考虑一个包含所有三种类型的插件定义：

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

## 无返回值方法

`method1()` 是最简单的情况，预期不返回任何数据。你可以检查 Promise 是否有错误，但当它解析时，结果会被忽略。

对于 Android，你可以这样注解该方法：

```java
@PluginMethod(returnType = PluginMethod.RETURN_NONE)
public void method1(PluginCall call) {
}
```

对于 iOS，你需要在插件的 `.m` 文件中这样声明方法：

```objc
CAP_PLUGIN(MyPlugin, "MyPlugin",
           CAP_PLUGIN_METHOD(method1, CAPPluginReturnNone);
)
```

## 返回值方法

`method2()` 是最常见的情况：一个解析后返回某些值的 Promise。

对于 Android，此方法类型是默认的，指定返回类型是可选的：

```java
@PluginMethod()
public void method2(PluginCall call) {
}
```

对于 iOS，你需要在插件的 `.m` 文件中这样声明方法：

```objc
CAP_PLUGIN(MyPlugin, "MyPlugin",
           CAP_PLUGIN_METHOD(method2, CAPPluginReturnPromise);
)
```

## 回调方法

`method3()` 是最复杂的类型，但在实践中也是最不常见的。当你的插件需要重复返回数据时使用，例如通过地理定位 API 监控设备位置时。

对于 Android，你可以这样注解该方法：

```java
@PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
public void method3(PluginCall call) {
}
```

对于 iOS，你需要在插件的 `.m` 文件中这样声明方法：

```objc
CAP_PLUGIN(MyPlugin, "MyPlugin",
           CAP_PLUGIN_METHOD(method3, CAPPluginReturnCallback);
)
```

回调方法接收一个函数，该函数将从原生代码中（可能多次）被调用，并返回一个解析为标识符的 Promise。

在原生端，实现回调意味着你需要保存调用，以便稍后可以调用。具体如何处理[在此处讨论](/main/reference/core-apis/saving-calls.md)。