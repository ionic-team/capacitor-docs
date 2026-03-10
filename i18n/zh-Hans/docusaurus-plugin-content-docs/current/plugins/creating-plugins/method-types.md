---
title: 方法类型
description: Capacitor 插件方法类型
contributors:
  - ikeith
sidebar_label: 方法类型
slug: /plugins/method-types
---

# 方法类型

在开发插件时,可以使用三种不同的方法签名类型。所有方法都是异步的且基于 Promise。

让我们考虑一个包含所有三种类型的插件定义:

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

## Void 返回

`method1()` 是最简单的情况,预计不返回数据。你可以检查 promise 是否有错误,但当它解析时结果将被忽略。

对于 Android,你可以这样注释方法:

```java
@PluginMethod(returnType = PluginMethod.RETURN_NONE)
public void method1(PluginCall call) {
}
```

对于 iOS,你可以在插件的 `.m` 文件中这样声明方法:

```objc
CAP_PLUGIN(MyPlugin, "MyPlugin",
           CAP_PLUGIN_METHOD(method1, CAPPluginReturnNone);
)
```

## 值返回

`method2()` 是最常见的情况:一个解析为某个值的 promise。

对于 Android,此方法类型是默认的,指定返回类型是可选的:

```java
@PluginMethod()
public void method2(PluginCall call) {
}
```

对于 iOS,你可以在插件的 `.m` 文件中这样声明方法:

```objc
CAP_PLUGIN(MyPlugin, "MyPlugin",
           CAP_PLUGIN_METHOD(method2, CAPPluginReturnPromise);
)
```

## 回调

`method3()` 是最复杂的类型,但在实践中也是最不常见的。当你的插件需要重复返回数据时使用它,例如通过地理位置 API 监视设备位置时。

对于 Android,你可以这样注释方法:

```java
@PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
public void method3(PluginCall call) {
}
```

对于 iOS,你可以在插件的 `.m` 文件中这样声明方法:

```objc
CAP_PLUGIN(MyPlugin, "MyPlugin",
           CAP_PLUGIN_METHOD(method3, CAPPluginReturnCallback);
)
```

回调方法接受一个将从原生代码调用(可能多次)的函数,并返回一个将用标识符解析的 promise。

在原生端,实现回调意味着你需要保存调用以便以后调用它。有关如何处理该操作的详细信息[在此处讨论。](/main/reference/core-apis/saving-calls.md)
