---
title: Capacitor iOS Plugin Guide
description: Capacitor iOS Plugin Guide
contributors:
  - mlynch
  - jcesarmobile
sidebar_label: iOS Guide
slug: /plugins/ios
---

# Capacitor iOS Plugin Guide

Building Capacitor plugins for iOS involves writing Swift (or Objective-C) to interface with Apple's iOS SDKs.

## Getting Started

To get started, first generate a plugin as shown in the [Getting Started](/plugins/creating-plugins/overview.md) section of the Plugin guide.

Next, open `Package.swift` in Xcode. You then want to navigate to the .swift files for your plugin.

For example, for a plugin with the Plugin Class Name `EchoPlugin`, you should open `ios/Sources/EchoPlugin/EchoPlugin.swift` and `ios/Sources/EchoPlugin/Echo.swift`.

## Plugin Basics

A Capacitor plugin for iOS has two simple Swift classes, one is implementation class that extends `NSObject`, where you should put the plugin logic and another that extends `CAPPlugin` and `CAPBridgedPlugin` and has some exported methods that will be callable from JavaScript and wraps the implementation methods.

### Simple Example

In the generated example, there is a simple echo plugin with an `echo` function that simply returns a value that it was given.

This example demonstrates a few core components of Capacitor plugins: receiving data from a Plugin Call, and returning
data back to the caller:

`Echo.swift`

```swift
import Foundation

@objc public class Echo: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
```

`EchoPlugin.swift`

```swift
import Foundation
import Capacitor

@objc(EchoPlugin)
public class EchoPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "EchoPlugin"
    public let jsName = "Echo"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "echo", returnType: CAPPluginReturnPromise)
    ]
    private let implementation = Echo()

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": implementation.echo(value)
        ])
    }
}
```

### Accessing Call Data

Each plugin method receives an instance of `CAPPluginCall` containing all the information of the plugin method invocation from the client.

A client can send any data that can be JSON serialized, such as numbers, text, booleans, objects, and arrays. This data
is accessible on the `options` field of the call instance, or by using convenience methods such as `getString` or `getObject`. Passing and accessing some of these values has some peculiarities to be aware of, as discussed [separately](/main/reference/core-apis/data-types.md#ios).

For example, here is how you'd get data passed to your method:

```swift
@objc func storeContact(_ call: CAPPluginCall) {
  let name = call.getString("yourName") ?? "default name"
  let address = call.getObject("address") ?? [:]
  let isAwesome = call.getBool("isAwesome") ?? false

  guard let id = call.options["id"] as? String else {
    call.reject("Must provide an id")
    return
  }

  // ...

  call.resolve()
}
```

Notice the various ways data can be accessed on the `CAPPluginCall` instance, including how to require
options using `guard`.

### Returning Data Back

A plugin call can either succeed or fail. Plugin calls borrow method names from JavaScript promises: call `resolve()` to indicate success (optionally returning data) and use `reject()` to indicate failure with an error message.

The `resolve()` method of `CAPPluginCall` takes a dictionary and supports JSON-serializable data types. Here's an example of returning data back to the client:

```swift
call.resolve([
  "added": true,
  "info": [
    "id": id
  ]
])
```

To fail, or reject a call, call `reject()`, passing an error string and optionally an error code and `Error` instance:

```swift
call.reject(error.localizedDescription, nil, error)
```

### Running Code on Plugin Load

Occasionally, plugins may need to run some code when the plugin is first loaded. For example, this would be a good place to set up any Notification Center event handlers.

To do this, provide an implementation for the `load()` method:

```swift
override public func load() {
}
```

### Export to Capacitor

To make sure Capacitor can see your plugin, the plugin generator do two things: export your Swift class to Objective-C, and registers the plugin methods.

To export your Swift class to Objective-C, the plugin generator adds `@objc(EchoPlugin)` above your Swift class, and add `@objc` before the `echo` method.

To register the plugin methods, the plugin generator creates a `pluginMethods` array of `CAPPluginMethod` and registers the `echo` method.

```swift
public let pluginMethods: [CAPPluginMethod] = [
    CAPPluginMethod(name: "echo", returnType: CAPPluginReturnPromise)
]
```

This makes the `echo` method available to the Capacitor web runtime, indicating to Capacitor that the echo method will return a Promise.

To add more methods to your plugin, create them in the `.swift` plugin class with the `@objc` before the `func` keyword and add a new `CAPPluginMethod` entry in the `pluginMethods` array.

## Permissions

If your plugin has functionality on iOS that requires permissions from the end user, then you will need to implement the permissions pattern.

Before following this section, make sure you've set up your permission aliases and status interfaces. If you haven't, see the [Permissions section in the Web guide](/plugins/creating-plugins/web-guide.md#permissions).

### Implementing Permissions

Add the `checkPermissions()` and `requestPermissions()` methods to your Swift plugin class.

```diff
 import Capacitor

 @objc(EchoPlugin)
 public class EchoPlugin: CAPPlugin {
     ...

+    @objc override public func checkPermissions(_ call: CAPPluginCall) {
+        // TODO
+    }

+    @objc override public func requestPermissions(_ call: CAPPluginCall) {
+        // TODO
+    }
 }
```

#### `checkPermissions()`

This method should return the current status of permissions in your plugin, which should be a dictionary that matches the structure of the [permission status definition](/plugins/creating-plugins/web-guide.md#permission-status-definitions) you defined. Typically, this information is available directly on the frameworks you're using.

In the example below, we map the current authorization status from location services into a permission state and associate the `location` alias with that state.

```swift
@objc override func checkPermissions(_ call: CAPPluginCall) {
    let locationState: String

    switch CLLocationManager.authorizationStatus() {
    case .notDetermined:
        locationState = "prompt"
    case .restricted, .denied:
        locationState = "denied"
    case .authorizedAlways, .authorizedWhenInUse:
        locationState = "granted"
    @unknown default:
        locationState = "prompt"
    }

    call.resolve(["location": locationState])
}
```

#### `requestPermissions()`

**Block-based APIs**

If the framework supports a block-based API for requesting permission, it's possible to complete the operation within the single method.

In the example below, we request video access from `AVCaptureDevice` and then use our own `checkPermissions` method to check the current status of permissions and then fulfill the call.

```swift
@objc override func requestPermissions(_ call: CAPPluginCall) {
    AVCaptureDevice.requestAccess(for: .video) { [weak self] _ in
        self?.checkPermissions(call)
    }
}
```

**Delegate-based APIs**

If the framework uses a delegate (or callback) API, completing the operation means that the original call will need to be saved and then retrieved once the callback has been invoked.

```swift
var permissionCallID: String?
var locationManager: CLLocationManager?

@objc override func requestPermissions(_ call: CAPPluginCall) {
    if let manager = locationManager, CLLocationManager.locationServicesEnabled() {
        if CLLocationManager.authorizationStatus() == .notDetermined {
            bridge?.saveCall(call)
            permissionCallID = call.callbackId
            manager.requestWhenInUseAuthorization()
        } else {
            checkPermissions(call)
        }
    } else {
        call.reject("Location services are disabled")
    }
}

public func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
    if let callID = permissionCallID, let call = bridge?.getSavedCall(callID) {
        checkPermissions(call)
        bridge?.releaseCall(call)
    }
}
```

**Multiple Permissions**

When several types of permissions are required, a [DispatchGroup](https://developer.apple.com/documentation/dispatch/dispatchgroup) is a convenient way to synchronize the multiple calls.

```swift
let store = CNContactStore()

@objc override func requestPermissions(_ call: CAPPluginCall) {
    // get the permissions to check or default to all of them
    var permissions = call.getArray("types", String.self) ?? []
    if permissions.isEmpty {
        permissions = ["contacts", "camera"]
    }

    let group = DispatchGroup()
    if permissions.contains("contacts") {
        group.enter()
        store.requestAccess(for: .contacts) { (_, _) in
            group.leave()
        }
    }
    if permissions.contains("camera") {
        group.enter()
        AVCaptureDevice.requestAccess(for: .video) { _ in
            group.leave()
        }
    }
    group.notify(queue: DispatchQueue.main) {
        self.checkPermissions(call)
    }
}
```

### Persisting a Plugin Call

In most cases, a plugin method will get invoked to perform a task and can finish immediately. But there are situations where you will need to keep the plugin call available so it can be accessed later. You might want to do this to periodically return data such as streaming live geolocation data, or to perform an asynchronous task.

See [this guide on saving plugin calls](/main/reference/core-apis/saving-calls.md) for more details on how to persist plugin calls.

## Error Handling

### Unavailable

This error can be thrown to indicate that the functionality can't be used right now, usually because it requires a newer iOS version.

```swift
@objc override func methodThatUsesNewIOSFramework(_ call: CAPPluginCall) {
    if #available(iOS 14, *) {
        // TODO implementation
    } else {
        call.unavailable("Not available in iOS 13 or earlier.")
    }
}
```

> It is recommended to gracefully degrade the experience with older APIs as much as possible. Use `unavailable` sparingly.

### Unimplemented

Use this error to indicate that a method can't be implemented for iOS.

```swift
@objc override func methodThatRequiresAndroid(_ call: CAPPluginCall) {
    call.unimplemented("Not implemented on iOS.")
}
```

## Plugin Events

Plugins can emit their own events that you can listen by attaching a listener to the plugin object like this:

```typescript
import { MyPlugin } from 'my-plugin';

MyPlugin.addListener('myPluginEvent', (info: any) => {
  console.log('myPluginEvent was fired');
});
```

To emit the event from the Swift plugin class:

```swift
self.notifyListeners("myPluginEvent", data: [:])
```

To remove a listener from the plugin object:

```typescript
import { MyPlugin } from 'my-plugin';

const myPluginEventListener = await MyPlugin.addListener(
  'myPluginEvent',
  (info: any) => {
    console.log('myPluginEvent was fired');
  },
);

myPluginEventListener.remove();
```

> It is also possible to trigger global events on `window`. See the docs for [`triggerJSEvent`](/main/reference/core-apis/ios.md#triggerjsevent).

## Presenting Native Screens

You can present native screens over the app by using [Capacitor's `UIViewController`](/main/reference/core-apis/ios.md#viewcontroller).

## Override navigation

Capacitor plugins can override the webview navigation. For that the plugin can override `- (NSNumber *)shouldOverrideLoad:(WKNavigationAction *)navigationAction` method.
Returning `true` causes the WebView to abort loading the URL.
Returning `false` causes the WebView to continue loading the URL.
Returning `nil` will defer to the default Capacitor policy.

## Advanced configuration

Capacitor iOS plugins are both CocoaPods and Swift Package Manager libraries, so to add dependencies, required frameworks or any other advanced configurations you have to edit the `.podspec` for CocoaPods and the `Package.swift` for SPM. Those files were created by the plugin generator.
Check the [podspec reference](https://guides.cocoapods.org/syntax/podspec.html) to see all possible options for CocoaPods.
Check the [Package Description](https://docs.swift.org/package-manager/PackageDescription/PackageDescription.html) to see all possible options for SPM.

Example `.podspec` dependency to add `FirebaseFirestore` version `11.8.0` or newer but lower than `12.0.0`.

```
  s.dependency 'Capacitor'
  s.dependency 'FirebaseFirestore', '~> 11.8'
```

Example `Package.swift` dependency to add `FirebaseFirestore` version `11.8.0` or newer but lower than `12.0.0`.

```swift
...
let package = Package(
...
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "6.0.0"),
        .package(url: "https://github.com/firebase/firebase-ios-sdk.git",  from: "11.8.0")
    ],
    targets: [
        .target(
            name: "FirebaseFirestorePlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm"),
                .product(name: "FirebaseCore", package: "firebase-ios-sdk"),
                .product(name: "FirebaseFirestore", package: "firebase-ios-sdk")
            ],
            path: "ios/Plugin")
    ]
...
)
```
