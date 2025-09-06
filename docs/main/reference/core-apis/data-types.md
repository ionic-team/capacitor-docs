---
title: Capacitor 数据类型
description: Capacitor 中的数据类型
slug: /core-apis/data-types
---

# Capacitor 数据类型

Capacitor 中在 Web 运行时和原生环境之间传输的数据必须进行序列化和反序列化，以便它们能以各语言原生方式存储。支持的数据类型包括可用 JSON 表示的类型，例如数字、字符串、布尔值、数组和对象（或字典或键值存储）。

## iOS

虽然 Swift 是 iOS 上的首选语言，但它与 Objective-C（系统框架基于此构建）互操作，因此该平台支持这三种语言的交集。大多数数据类型会按预期转换，但某些情况下可能需要特别注意。

---

### 空值

Objective-C 不支持在数组、字典或集合等集合中存储空值。相反，它使用一个特殊的占位符对象 [`NSNull`](https://developer.apple.com/documentation/foundation/nsnull?language=objc) 来表示空值。相比之下，Swift 使用[可选类型（Optionals）](https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html)来描述可能为空的数值。Swift 可以操作 `NSNull` 值，但 Objective-C 无法处理可选类型（尽管在某些上下文中，运行时会自动将可选类型映射到基础值或 `NSNull`）。无论您使用哪种语言，这些 `NSNull` 对象都可能出现。

例如，考虑以下传递给 Capacitor 插件调用的对象：

```typescript
{ 'foo': null, 'bar': [1, 2, null, 4]}
```

#### 字典

`CAPPluginCall` 将这些数据存储为其 `options` 属性，但提供了多种便捷访问器对其进行操作。访问器会将值转换为预期类型，因此 `NSNull` 值会被过滤掉。

```swift
if let value = call.getString("foo") {
    // 良好：`value` 为 nil，因此此代码块不会运行
}
```

然而，直接访问存储属性可能会返回 `NSNull` 对象。

```swift
if call.options["foo"] != nil {
    // 不佳：键返回了非空的 `NSNull` 对象，因此此代码块会运行
}
```

> 不建议依赖键的存在来传递含义。始终对相应值进行类型检查以进行评估。

#### 数组

由于访问数组通常需要类型化整个集合，因此考虑它是否包含单一类型或可能是异类数组非常重要。

```swift
if let values = call.getArray("bar") {
    // 中性：数组全是有效对象，因此此代码块会运行，但每个值都需要单独进行类型化
}
if let values = call.getArray("bar", Int?) {
    // 不佳：数组是 `Int` 和 `NSNull` 的混合，无法转换为 `Int?`，因此此代码块不会运行
}
```

为帮助处理此行为，Capacitor 包含一个便捷扩展，可将带有 `NSNull` 值的数组映射为可选类型数组。它作用于 `JSValue` 协议，该协议表示可在环境之间桥接的所有有效类型，但可以转换为特定子类型。

```swift
if let values = call.getArray("bar").capacitor.replacingNullValues() as? [Int?] {
    // 良好：`values` 现在被转换为 `Int?`，索引 2 处为 `nil`
}
```

---

### 日期

在大多数情况下，日期应能按预期工作。任何从 JavaScript 发送的 `Date` 对象或从插件返回的 `Date` 或 `NSDate` 对象都将被序列化为 [ISO 8601 字符串](https://www.iso.org/iso-8601-date-and-time-format.html)。

但是，如果需要，可以更改此行为的某些部分。从 Web 运行时到原生 iOS 代码的数据传输使用与反向传输不同的机制。`WKWebView` 会自动将 JavaScript `Date` 对象转换为原生 `Date` 对象。为与其他平台保持一致并符合开发者预期，Capacitor 从 3.0 版本开始会在将这些对象传递给插件之前对其进行序列化。如果您想选择退出此行为，请在插件上设置 `shouldStringifyDatesInCalls` 属性。

```swift
override func load() {
    shouldStringifyDatesInCalls = false
}
```

`CAPPluginCall` 的便捷访问器 `getDate` 将处理这两种数据类型并返回一个 `Date` 对象。

从原生代码到 Web 视图的数据传输将作为 JSON 进行序列化。由于 JSON 未正式定义日期，在 3.0 版本之前，在插件结果中包含 `Date` 对象会引发异常。但 Capacitor 现在将按照惯例自动将任何 `Date` 对象序列化为字符串。如果您的插件需要以不同方式处理日期，请首先将它们序列化为其他支持的 JSON 类型。