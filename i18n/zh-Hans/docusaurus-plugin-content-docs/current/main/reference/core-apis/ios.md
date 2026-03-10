---
title: Capacitor iOS API
description: The API for Capacitor on iOS
slug: /core-apis/ios
---

# Capacitor iOS API

Capacitor iOS 是为 iOS 上的 Capacitor 应用提供支持的原生运行时。

## 桥接

iOS 桥接是 Capacitor iOS 库的核心。桥接上有几个属性和方法可用，可以提供信息或更改行为。

向 Capacitor 注册后，插件对桥接有弱引用：

```swift
self.bridge?
```

> 如果你的方法需要桥接，你可以使用 guard 来解包它并提前退出：
>
> ```swift
> guard let bridge = self.bridge else { return }
> ```

---

### viewController

```swift
var viewController: UIViewController? { get }
```

此属性包含 Capacitor 的主视图控制器，可用于在应用上呈现原生视图。

示例：

```swift
DispatchQueue.main.async {
  self.bridge?.viewController.present(ourCustomViewController, animated: true, completion: nil)
}
```

在 iPad 设备上可以呈现弹出框：

```swift
self.setCenteredPopover(ourCustomViewController)
self.bridge.viewController.present(ourCustomViewController, animated: true, completion: nil)
```

---

### config

```swift
var config: InstanceConfiguration { get }
```

此属性包含 Capacitor 运行时已知的配置对象。

---

### triggerJSEvent(...)

```swift
func triggerJSEvent(eventName: String, target: String)
func triggerJSEvent(eventName: String, target: String, data: String)
```

在 JavaScript [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)（例如 `window` 或 `document`）上触发事件。如果可能，最好使用 [Plugin Events](/plugins/creating-plugins/ios-guide.md#plugin-events)。

示例：

```swift
bridge.triggerJSEvent(eventName: "myCustomEvent", target: "window")
bridge.triggerJSEvent(eventName: "myCustomEvent", target: "document", data: "{ 'dataKey': 'dataValue' }")
```

注意：`data` 必须是序列化的 JSON 字符串值。

---

### localURL(...)

```swift
func localURL(fromWebURL webURL: URL?) -> URL?
```

将 web 视图中的 URL 转换为原生 iOS 的文件 URL。

Web 视图可能处理几种不同类型的 URL：

- `res://`（web 资源的快捷方案）
- `file://`（本地设备上文件的完全限定 URL）

---

### portablePath(...)

```swift
func portablePath(fromLocalURL localURL: URL?) -> URL?
```

将原生 iOS 的文件 URL 转换为要在 web 视图中加载的 URL。

---

## 传递数据

有关如何在环境之间处理传递的数据的说明可以在[此处](/main/reference/core-apis/data-types.md#ios)找到。

---

## 保存 CAPPluginCall

有关为异步或重复操作持久化插件调用的说明可以在[此处](/main/reference/core-apis/saving-calls.md)找到。
