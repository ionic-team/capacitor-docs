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

To get started, first generate a plugin as shown in the [Getting Started](/docs/plugins/creating-plugins) section of the Plugin guide.

Next, open `echo/ios/Plugin.xcworkspace` in Xcode. You then want to navigate to the .swift file for your plugin.

For example, for a plugin with the Plugin Class Name `Echo`, you should open `EchoPlugin.swift`.

## Plugin Basics

A Capacitor plugin for iOS is a simple Swift class that extends `CAPPlugin` and
has some exported methods that will be callable from JavaScript.

### Simple Example

In the generated example, there is a simple echo plugin with an `echo` function that simply returns a value that it was given.

This example demonstrates a few core components of Capacitor plugins: receiving data from a Plugin Call, and returning
data back to the caller:

`EchoPlugin.swift`

```swift
import Capacitor

@objc(EchoPlugin)
public class EchoPlugin: CAPPlugin {
  @objc func echo(_ call: CAPPluginCall) {
    let value = call.getString("value") ?? ""
    call.resolve([
        "value": value
    ])
  }
}
```

### Accessing Call Data

Each plugin method receives an instance of `CAPPluginCall` containing all the information of the plugin method invocation from the client.

A client can send any data that can be JSON serialized, such as numbers, text, booleans, objects, and arrays. This data
is accessible on the `options` field of the call instance, or by using convenience methods such as `getString` or `getObject`. Passing and accessing some of these values has some peculiarities to be aware of, as discussed [separately](/docs/core-apis/data-types#ios).

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

To make sure Capacitor can see your plugin, the plugin generator do two things: export your Swift class to Objective-C, and register it using the provided Capacitor Objective-C Macros.

To export your Swift class to Objective-C, the plugin generator adds `@objc(EchoPlugin)` above your Swift class, and add `@objc` before the `echo` method.

To register the plugin, the plugin generator creates a file with a `.m` extension corresponding to your plugin (such as `EchoPlugin.m`) and use the `CAP_PLUGIN` to register the plugin and the `CAP_PLUGIN_METHOD` macro to register the `echo` method.

```objectivec
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(EchoPlugin, "Echo",
  CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
)
```

This makes `Echo` plugin, and the `echo` method available to the Capacitor web runtime, indicating to Capacitor that the echo method will return a Promise.

To add more methods to your plugin, create them in the `.swift` plugin class with the `@objc` before the `func` keyword and add a new `CAP_PLUGIN_METHOD` entry in the `.m` file.

## Permissions

If your plugin has functionality on iOS that requires permissions from the end user, then you will need to implement the permissions pattern.

Before following this section, make sure you've set up your permission aliases and status interfaces. If you haven't, see the [Permissions section in the Web guide](/docs/plugins/web#permissions).

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

This method should return the current status of permissions in your plugin, which should be a dictionary that matches the structure of the [permission status definition](/docs/plugins/web#permission-status-definitions) you defined. Typically, this information is available directly on the frameworks you're using.

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

See [this guide on saving plugin calls](/docs/v3/core-apis/saving-calls) for more details on how to persist plugin calls.

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

> It is also possible to trigger global events on `window`. See the docs for [`triggerJSEvent`](/docs/core-apis/ios#triggerjsevent).

## Presenting Native Screens

You can present native screens over the app by using [Capacitor's `UIViewController`](/docs/core-apis/ios#viewcontroller).

## Override navigation

Capacitor plugins can override the webview navigation. For that the plugin can override `- (NSNumber *)shouldOverrideLoad:(WKNavigationAction *)navigationAction` method.
Returning `true` causes the WebView to abort loading the URL.
Returning `false` causes the WebView to continue loading the URL.
Returning `nil` will defer to the default Capacitor policy.

## Advanced configuration

Capacitor iOS plugins are CocoaPods libraries, so to add dependencies, required frameworks or any other advanced configurations you have to edit the `.podspec` file created by the plugin generator, check the [podspec reference](https://guides.cocoapods.org/syntax/podspec.html) to see all possible options.
