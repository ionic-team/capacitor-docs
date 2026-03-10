---
title: Capacitor iOS 插件指南
description: Capacitor iOS 插件指南
contributors:
  - mlynch
  - jcesarmobile
sidebar_label: iOS 指南
slug: /plugins/ios
---

# Capacitor iOS 插件指南

为 iOS 构建 Capacitor 插件需要编写 Swift(或 Objective-C)来与 Apple 的 iOS SDK 交互。

## 快速开始

首先,按照插件指南中的[快速开始](/plugins/creating-plugins/overview.md)部分生成一个插件。

接下来,在 Xcode 中打开 `Package.swift`。然后导航到插件的 `.swift` 文件。

例如,对于插件类名为 `EchoPlugin` 的插件,你应该打开 `ios/Sources/EchoPlugin/EchoPlugin.swift` 和 `ios/Sources/EchoPlugin/Echo.swift`。

## 插件基础

iOS 的 Capacitor 插件有两个简单的 Swift 类,一个是实现类,继承 `NSObject`,你应该在其中放置插件逻辑,另一个继承 `CAPPlugin` 和 `CAPBridgedPlugin`,有一些可从 JavaScript 调用的导出方法,并包装实现方法。

### 简单示例

在生成的示例中,有一个简单的 echo 插件,它有一个 `echo` 函数,可以简单地返回给它的值。

这个示例演示了 Capacitor 插件的几个核心组件:从插件调用接收数据,以及将数据返回给调用者:

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

### 访问调用数据

每个插件方法都接收一个 `CAPPluginCall` 实例,其中包含客户端插件方法调用的所有信息。

客户端可以发送任何可以 JSON 序列化的数据,例如数字、文本、布尔值、对象和数组。这些数据可以在调用实例的 `options` 字段上访问,或者使用 `getString` 或 `getObject` 等便捷方法访问。传递和访问其中一些值有一些特殊性,需要了解,如[单独讨论](/main/reference/core-apis/data-types.md#ios)。

例如,这是获取传递给方法的数据的方式:

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

注意在 `CAPPluginCall` 实例上访问数据的各种方式,包括如何使用 `guard` 要求选项。

### 返回数据

插件调用可以成功或失败。插件调用借鉴了 JavaScript promises 的方法名称:调用 `resolve()` 表示成功(可选返回数据),使用 `reject()` 表示失败并传递错误消息。

`CAPPluginCall` 的 `resolve()` 方法接受一个字典并支持 JSON 可序列化的数据类型。这是一个向客户端返回数据的示例:

```swift
call.resolve([
  "added": true,
  "info": [
    "id": id
  ]
])
```

要失败或拒绝调用,请调用 `reject()`,传递错误字符串,可选的错误代码和 `Error` 实例:

```swift
call.reject(error.localizedDescription, nil, error)
```

### 在插件加载时运行代码

偶尔,插件可能需要在首次加载插件时运行一些代码。例如,这是设置任何通知中心事件处理程序的好地方。

为此,为 `load()` 方法提供实现:

```swift
override public func load() {
}
```

### 导出到 Capacitor {#export-to-capacitor}

要确保 Capacitor 可以看到你的插件,插件生成器会做两件事:将 Swift 类导出到 Objective-C,并注册插件方法。

要将 Swift 类导出到 Objective-C,插件生成器在 Swift 类上方添加 `@objc(EchoPlugin)`,并在 `echo` 方法之前添加 `@objc`。

要注册插件方法,插件生成器创建 `CAPPluginMethod` 的 `pluginMethods` 数组并注册 `echo` 方法。

```swift
public let pluginMethods: [CAPPluginMethod] = [
    CAPPluginMethod(name: "echo", returnType: CAPPluginReturnPromise)
]
```

这使得 `echo` 方法可用于 Capacitor Web 运行时,向 Capacitor 指示 echo 方法将返回 Promise。

要向插件添加更多方法,请在 `.swift` 插件类中使用 `@objc` 在 `func` 关键字之前创建它们,并在 `pluginMethods` 数组中添加新的 `CAPPluginMethod` 条目。

## 权限 {#permissions}

如果你的插件在 iOS 上具有需要最终用户许可的功能,则需要实现权限模式。

在继续本节之前,请确保你已设置权限别名和状态接口。如果没有,请参阅 [Web 指南中的权限部分](/plugins/creating-plugins/web-guide.md#permissions)。

### 实现权限

将 `checkPermissions()` 和 `requestPermissions()` 方法添加到 Swift 插件类。

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

此方法应返回插件中权限的当前状态,它应该是一个与[权限状态定义](/plugins/creating-plugins/web-guide.md#permission-status-definitions)结构匹配的字典。通常,此信息直接在你使用的框架上可用。

在下面的示例中,我们将位置服务的当前授权状态映射到权限状态,并将 `location` 别名与该状态关联。

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

**基于 Block 的 API**

如果框架支持基于 block 的 API 来请求权限,则可以在单个方法内完成操作。

在下面的示例中,我们从 `AVCaptureDevice` 请求视频访问,然后使用我们自己的 `checkPermissions` 方法检查权限的当前状态,然后完成调用。

```swift
@objc override func requestPermissions(_ call: CAPPluginCall) {
    AVCaptureDevice.requestAccess(for: .video) { [weak self] _ in
        self?.checkPermissions(call)
    }
}
```

**基于 Delegate 的 API**

如果框架使用 delegate(或回调)API,完成操作意味着需要保存原始调用,然后在调用回调后检索它。

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

**多个权限**

当需要多种类型的权限时,[DispatchGroup](https://developer.apple.com/documentation/dispatch/dispatchgroup)是同步多个调用的便捷方式。

```swift
let store = CNContactStore()

@objc override func requestPermissions(_ call: CAPPluginCall) {
    // 获取要检查的权限或默认为所有权限
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

### 持久化插件调用

在大多数情况下,插件方法会被调用来执行任务并可以立即完成。但在某些情况下,你需要保持插件调用可用,以便以后访问。你可能希望这样做以定期返回数据,例如流式传输实时地理位置数据,或执行异步任务。

有关如何持久化插件调用的更多详细信息,请参阅[此保存插件调用指南](/main/reference/core-apis/saving-calls.md)。

## 错误处理 {#error-handling}

### 不可用

可以抛出此错误以指示当前无法使用该功能,通常是因为它需要较新的 iOS 版本。

```swift
@objc override func methodThatUsesNewIOSFramework(_ call: CAPPluginCall) {
    if #available(iOS 14, *) {
        // TODO implementation
    } else {
        call.unavailable("Not available in iOS 13 or earlier.")
    }
}
```

> 建议尽可能对较旧的 API 优雅地降级体验。谨慎使用 `unavailable`。

### 未实现

使用此错误表示无法为 iOS 实现该方法。

```swift
@objc override func methodThatRequiresAndroid(_ call: CAPPluginCall) {
    call.unimplemented("Not implemented on iOS.")
}
```

## 插件事件 {#plugin-events}

插件可以发出自己的事件,你可以通过在插件对象上附加监听器来监听这些事件:

```typescript
import { MyPlugin } from 'my-plugin';

MyPlugin.addListener('myPluginEvent', (info: any) => {
  console.log('myPluginEvent was fired');
});
```

要从 Swift 插件类发出事件:

```swift
self.notifyListeners("myPluginEvent", data: [:])
```

要从插件对象中删除监听器:

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

> 也可以在 `window` 上触发全局事件。请参阅 [`triggerJSEvent`](/main/reference/core-apis/ios.md#triggerjsevent) 的文档。

## 展示原生屏幕

你可以使用 [Capacitor 的 `UIViewController`](/main/reference/core-apis/ios.md#viewcontroller)在应用上展示原生屏幕。

## 覆盖导航

Capacitor 插件可以覆盖 webview 导航。为此,插件可以覆盖 `- (NSNumber *)shouldOverrideLoad:(WKNavigationAction *)navigationAction` 方法。返回 `true` 会导致 WebView 中止加载 URL。返回 `false` 会导致 WebView 继续加载 URL。返回 `nil` 将延迟到默认的 Capacitor 策略。

## 高级配置

Capacitor iOS 插件既是 CocoaPods 又是 Swift Package Manager 库,因此要添加依赖项、所需的框架或任何其他高级配置,你需要编辑 CocoaPods 的 `.podspec` 和 SPM 的 `Package.swift`。这些文件是由插件生成器创建的。查看 [podspec 参考](https://guides.cocoapods.org/syntax/podspec.html)以查看 CocoaPods 的所有可能选项。查看 [Package Description](https://docs.swift.org/package-manager/PackageDescription/PackageDescription.html)以查看 SPM 的所有可能选项。

示例 `.podspec` 依赖项以添加版本为 `11.8.0` 或更新但低于 `12.0.0` 的 `FirebaseFirestore`。

```
  s.dependency 'Capacitor'
  s.dependency 'FirebaseFirestore', '~> 11.8'
```

示例 `Package.swift` 依赖项以添加版本为 `11.8.0` 或更新但低于 `12.0.0` 的 `FirebaseFirestore`。

```swift
...
let package = Package(
...
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0"),
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
