---
title: Capacitor iOS API
description: The API for Capacitor on iOS
slug: /core-apis/ios
---

# Capacitor iOS API

Capacitor iOS is the native runtime that powers Capacitor apps on iOS.

## Bridge

The iOS bridge is the heart of the Capacitor iOS library. There are several properties and methods available on the bridge which provide information or change behavior.

When registered with Capacitor, plugins have a weak reference to the bridge:

```swift
self.bridge?
```

> If your method requires the bridge, you can use a guard to unwrap it and perform an early exit:
>
> ```swift
> guard let bridge = self.bridge else { return }
> ```

---

### viewController

```swift
var viewController: UIViewController? { get }
```

This property contains the main view controller for Capacitor, which can be used to present native views over the app.

Examples:

```swift
DispatchQueue.main.async {
  self.bridge?.viewController.present(ourCustomViewController, animated: true, completion: nil)
}
```

On iPad devices it is possible to present popovers:

```swift
self.setCenteredPopover(ourCustomViewController)
self.bridge.viewController.present(ourCustomViewController, animated: true, completion: nil)
```

---

### config

```swift
var config: InstanceConfiguration { get }
```

This property contains the configuration object known to the Capacitor runtime.

---

### triggerJSEvent(...)

```swift
func triggerJSEvent(eventName: String, target: String)
func triggerJSEvent(eventName: String, target: String, data: String)
```

Fire an event on a JavaScript [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) such as `window` or `document`. If possible, it is preferred to use [Plugin Events](/plugins/creating-plugins/ios-guide.md#plugin-events) instead.

Examples:

```swift
bridge.triggerJSEvent(eventName: "myCustomEvent", target: "window")
bridge.triggerJSEvent(eventName: "myCustomEvent", target: "document", data: "{ 'dataKey': 'dataValue' }")
```

Note: `data` must be a serialized JSON string value.

---

### localURL(...)

```swift
func localURL(fromWebURL webURL: URL?) -> URL?
```

Translate a URL from the web view into a file URL for native iOS.

The web view may be handling several different types of URLs:

- `res://` (shortcut scheme to web assets)
- `file://` (fully qualified URL to file on the local device)

---

### portablePath(...)

```swift
func portablePath(fromLocalURL localURL: URL?) -> URL?
```

Translate a file URL for native iOS into a URL to load in the web view.

---

## Passing data

Notes on how to work with data that is passed between environments can be [found here](/main/reference/core-apis/data-types.md#ios).

---

## Saving CAPPluginCall

Notes on persisting plugin calls for asynchronous or repeated operations can be [found here](/main/reference/core-apis/saving-calls.md).
