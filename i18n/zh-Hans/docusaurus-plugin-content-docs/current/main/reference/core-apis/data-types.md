---
title: Capacitor Data Types
description: Data types in Capacitor
slug: /core-apis/data-types
---

# Capacitor 数据类型

在 web 运行时和原生环境之间传输的数据必须进行序列化和反序列化，以便可以用每种语言原生存储。支持的数据类型是可以用 JSON 表示的类型，例如数字、字符串、布尔值、数组和对象（或字典或键值存储）。

## iOS

虽然 Swift 是 iOS 上的首选语言，但它与 Objective-C（系统框架构建在其上）互操作，因此该平台支持三种语言的交集。大多数数据类型将按预期转换，但在某些情况下可能需要特别注意。

---

### 空值

Objective-C 不支持在数组、字典或集合等集合中存储空值。相反，它使用特殊的占位符对象 [`NSNull`](https://developer.apple.com/documentation/foundation/nsnull?language=objc) 来表示空值。相比之下，Swift 使用 [Optionals](https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html) 来描述可能为空的值。Swift 可以操作 `NSNull` 值，但 Objective-C 无法处理 Optionals（尽管在某些情况下，运行时会自动将 optionals 映射到基础值或 `NSNull`）。无论你使用哪种语言，都可能出现这些 `NSNull` 对象。

例如，考虑传递给 Capacitor 插件调用的以下对象：

```typescript
{ 'foo': null, 'bar': [1, 2, null, 4]}
```

#### 字典

`CAPPluginCall` 将此数据存储为其 `options` 属性，但有多种方便的访问器可以对其进行操作。访问器会将值转换为预期的类型，因此 `NSNull` 值将被过滤掉。

```swift
if let value = call.getString("foo") {
    // GOOD: `value` 为 nil，所以此块不会运行
}
```

但是，直接访问存储属性可以返回 `NSNull` 对象。

```swift
if call.options["foo"] != nil {
    // BAD: 键返回了一个真值 `NSNull` 对象，所以此块将运行
}
```

> 不建议依赖键的存在来传达含义。始终检查相应的值以对其进行评估。

#### 数组

由于访问数组通常需要对整个集合进行类型转换，因此重要的是考虑它包含单一类型还是可能是异构的。

```swift
if let values = call.getArray("bar") {
    // NEUTRAL: 数组都是有效对象，所以此块将运行，但每个值都需要单独类型化
}
if let values = call.getArray("bar", Int?) {
    // BAD: 数组是 `Int` 和 `NSNull` 的混合，无法转换为 `Int?`，所以此块不会运行
}
```

为了帮助处理此行为，Capacitor 包含了一个方便的扩展，可以将带有 `NSNull` 值的数组映射为可选值数组。它适用于 `JSValue` 协议，该协议表示可以在环境之间桥接的所有有效类型，但可以转换为特定的子类型。

```swift
if let values = call.getArray("bar").capacitor.replacingNullValues() as? [Int?] {
    // GOOD: `values` 现在转换为 `Int?`，索引 2 处为 `nil`
}
```

---

### 日期

在大多数情况下，日期应该按预期工作。从 JavaScript 发送的任何 `Date` 对象或从插件返回的 `Date` 或 `NSDate` 对象都将被序列化为 [ISO 8601 字符串](https://www.iso.org/iso-8601-date-and-time-format.html)。

但是，如果需要，可以更改此行为的某些部分。从 web 运行时移动到原生 iOS 代码的数据使用与向另一个方向移动的数据不同的机制。`WKWebView` 自动将 JavaScript `Date` 对象转换为原生 `Date` 对象。为了与其他平台保持一致并符合开发人员的期望，Capacitor 将在 3.0 版本开始将这些对象在传递给插件之前进行序列化。如果你想选择退出此行为，请在你的插件上设置 `shouldStringifyDatesInCalls` 属性。

```swift
override func load() {
    shouldStringifyDatesInCalls = false
}
```

`CAPPluginCall` 便捷访问器 `getDate` 将处理这两种数据类型并返回 `Date` 对象。

从原生代码移动到 web 视图的数据将序列化为 JSON。由于 JSON 没有正式定义日期，因此在 3.0 之前，在插件结果中包含 `Date` 对象会抛出异常。但现在 Capacitor 将按照约定自动将任何 `Date` 对象序列化为字符串。如果你的插件需要以不同方式处理日期，请先将它们序列化为其他受支持的 JSON 类型。
