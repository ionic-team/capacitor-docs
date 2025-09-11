---
title: Capacitor Data Types
description: Data types in Capacitor
slug: /core-apis/data-types
---

# Capacitor Data Types

Data moving between the web runtime and native environments in Capacitor have to be serialized and deserialized so that they can be stored natively in each language. The supported data types are those that can be represented in JSON such as numbers, strings, booleans, arrays, and objects (or dictionaries or key-value stores).

## iOS

While Swift is the preferred language on iOS, it interoperates with Objective-C (upon which the system frameworks are built) and so the platform supports the intersection of three languages. Most data types will be translated as expected but there are some cases that may require special attention.

---

### Null Values

Objective-C does not support storing null values in collections such as arrays, dictionaries, or sets. Instead it uses a special placeholder object, [`NSNull`](https://developer.apple.com/documentation/foundation/nsnull?language=objc), to represent a null value. In contrast, Swift uses [Optionals](https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html) to describe a value that might be null. Swift can manipulate `NSNull` values but Objective-C cannot handle Optionals (although, in some contexts, the runtime will automatically map optionals into the underlying value or `NSNull`). These `NSNull` objects can appear regardless of which language you are using.

As an example, consider the following object being passed to a Capacitor plugin call:

```typescript
{ 'foo': null, 'bar': [1, 2, null, 4]}
```

#### Dictionaries

`CAPPluginCall` stores this data as its `options` property but has a variety of convenience accessors that operate on it. The accessors will cast the value to the expected type(s) so `NSNull` values will get filtered out.

```swift
if let value = call.getString("foo") {
    // GOOD: `value` is nil, so this block won't run
}
```

However, accessing the storage property directly can return an `NSNull` object.

```swift
if call.options["foo"] != nil {
    // BAD: the key returned a truthy `NSNull` object, so this block will run
}
```

> It is not recommended to rely on the presence of a key to convey meaning. Always type-check the corresponding value to evaluate it.

#### Arrays

Since accessing an array typically requires typing the whole collection, it is important to consider if it contains a single type or might be heterogeneous.

```swift
if let values = call.getArray("bar") {
    // NEUTRAL: the array is all valid objects, so this block will run, but each value will need to be typed individually
}
if let values = call.getArray("bar", Int?) {
    // BAD: the array is a mix of `Int` and `NSNull` and can't be cast to `Int?`, so this block won't run
}
```

To help with this behavior, Capacitor includes a convenience extension that can map an array with `NSNull` values into an array of optionals. It works on the `JSValue` protocol, which represents all of the valid types that can be bridged between environments, but can be cast to a specific subtype.

```swift
if let values = call.getArray("bar").capacitor.replacingNullValues() as? [Int?] {
    // GOOD: `values` is now cast to `Int?` with `nil` at index 2
}
```

---

### Dates

In most situations, dates should work as expected. Any `Date` object sent from JavaScript or `Date` or `NSDate` object returned from a plugin will be serialized into an [ISO 8601 string](https://www.iso.org/iso-8601-date-and-time-format.html).

However, part of this behavior can be changed if needed. Data moving from the web runtime to native iOS code uses a different mechanism than data going in the other direction. `WKWebView` automatically transforms JavaScript `Date` objects into native `Date` objects. For consistency with other platforms and to match developer expectations, Capacitor will serialize these objects before passing them to the plugin starting in 3.0. If you want to opt-out of this behavior, set the `shouldStringifyDatesInCalls` property on your plugin.

```swift
override func load() {
    shouldStringifyDatesInCalls = false
}
```

The `CAPPluginCall` convenience accessor `getDate` will handle both data types and return a `Date` object.

Data moving from native code to the web view will be serialized as JSON. Since JSON does not officially define dates, including a `Date` object in a plugin's results would throw an exception prior to 3.0. But Capacitor will now automatically serialize any `Date` objects into strings as per convention. If your plugin needs to handle dates differently, serialize them into some other supported JSON type first.
