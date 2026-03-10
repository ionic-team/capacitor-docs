---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - iOS 实现
contributors:
  - eric-horodyski
sidebar_label: iOS 实现
slug: /plugins/tutorial/ios-implementation
---

# iOS 实现

在 Android 之前实现 iOS 的决定是随意的 - 老实说,你可以先编写 Android 实现,然后是 iOS,然后是 Web。或者三者的任何组合。恰好本教程在 Android 之前实现 iOS。

你可能希望首先实现 Web,因为它更接近插件的 API 定义。如果需要对 API 进行任何调整,在 Web 层工作时发现它们要容易得多。

## 向 Capacitor 注册插件

> **先决条件:** 在继续之前,请熟悉 <a href="https://capacitorjs.com/docs/ios/custom-code" target="_blank">Capacitor 自定义原生 iOS 代码文档</a>。

通过运行 `npx cap open ios` 在 Xcode 中打开 Capacitor 应用的 iOS 项目。右键单击 **App** 组(在 **App** 目标下)并从上下文菜单中选择 **New Group**。将此新组命名为 **plugins**。向 **plugins** 添加一个新组并将其命名为 **ScreenOrientation**。

完成后,你将拥有路径 `/App/App/plugins/ScreenOrientation/`。通过右键单击 **ScreenOrientation** 组并从上下文菜单中选择 **New File…** 添加以下文件:

`ScreenOrientation.swift`
`ScreenOrientationPlugin.swift`

将以下代码复制到 `ScreenOrientationPlugin.swift`:

```swift
import Foundation
import Capacitor

@objc(ScreenOrientationPlugin)
public class ScreenOrientationPlugin: CAPPlugin, CAPBridgedPlugin {
  public let identifier = "ScreenOrientationPlugin"
  public let jsName = "ScreenOrientation"
  public let pluginMethods: [CAPPluginMethod] = [
      CAPPluginMethod(name: "orientation", returnType: CAPPluginReturnPromise),
      CAPPluginMethod(name: "lock", returnType: CAPPluginReturnPromise),
      CAPPluginMethod(name: "unlock", returnType: CAPPluginReturnPromise)
  ]

  @objc public func orientation(_ call: CAPPluginCall) {
    call.resolve()
  }

  @objc public func lock(_ call: CAPPluginCall) {
    call.resolve()
  }

  @objc public func unlock(_ call: CAPPluginCall) {
    call.resolve();
  }
}
```

注意使用 `@objc` 装饰器;这些是必需的,以确保 Capacitor 在运行时可以看到类及其方法。

## 获取当前屏幕方向

让我们首先处理获取当前屏幕方向的任务。打开 `ScreenOrientation.swift` 以设置类并编写获取当前方向的方法:

```swift
import Foundation
import UIKit
import Capacitor

public class ScreenOrientation: NSObject {

  public func getCurrentOrientationType() -> String {
    let currentOrientation: UIDeviceOrientation = UIDevice.current.orientation
    return fromDeviceOrientationToOrientationType(currentOrientation)
  }

  private func fromDeviceOrientationToOrientationType(_ orientation: UIDeviceOrientation) -> String {
    switch orientation {
    case .landscapeLeft:
      return "landscape-primary"
    case .landscapeRight:
      return "landscape-secondary"
    case .portraitUpsideDown:
      return "portrait-secondary"
    default:
      // Case: portrait
      return "portrait-primary"
    }
  }

}
```

接下来,在 `ScreenOrientationPlugin.swift` 中连接 `orientation` 方法以调用实现类的方法:

```Swift
@objc(ScreenOrientationPlugin)
public class ScreenOrientationPlugin: CAPPlugin, CAPBridgedPlugin {
  public let identifier = "ScreenOrientationPlugin"
  public let jsName = "ScreenOrientation"
  public let pluginMethods: [CAPPluginMethod] = [
      CAPPluginMethod(name: "orientation", returnType: CAPPluginReturnPromise),
      CAPPluginMethod(name: "lock", returnType: CAPPluginReturnPromise),
      CAPPluginMethod(name: "unlock", returnType: CAPPluginReturnPromise)
  ]

  private let implementation = ScreenOrientation()

  @objc public func orientation(_ call: CAPPluginCall) {
    let orientationType = implementation.getCurrentOrientationType()
    call.resolve(["type": orientationType])
  }

  /* 为简洁起见,省略了其余代码 */
}
```

最后,按照<a href="https://capacitorjs.com/docs/ios/custom-code#register-the-plugin" _target="blank">这些说明</a>:

- 创建自定义视图控制器。
- 注册插件实例。

继续在 Xcode 中从实际设备或 iOS 模拟器运行应用。一旦完成加载,你应该会看到以下日志打印到控制台:

```bash
⚡️  To Native ->  ScreenOrientation orientation 115962915
⚡️  TO JS {"type":"portrait-primary"}
```

> **注意:** 日志的确切值对你来说会有所不同。在此示例中,`115962915` 是分配给从插件进行的方法调用的任意 ID。

你已成功将原生 iOS 代码桥接到 Web 应用! 🎉

## 监听屏幕方向更改

iOS 将通过 <a href="https://developer.apple.com/documentation/foundation/notificationcenter" target="_blank">NotificationCenter</a> 让我们知道用户何时旋转其设备,当 UIDevice 触发 `orientationDidChangeNotification` 事件时。

`load()` 方法是为此事件注册观察者的适当位置。同样,`deinit()` 方法是删除观察者的适当位置。

在观察者注册内,我们需要提供一个方法来将更改的方向返回给我们插件的监听器,这些监听器正在侦听我们作为插件 API 的一部分定义的 `screenOrientationChange` 事件。我们可以重用 `getCurrentOrientationType()` 方法来获取更改的屏幕方向。

将以下方法添加到 `ScreenOrientationPlugin` 类:

```swift
override public func load() {
  NotificationCenter.default.addObserver(
    self,
    selector: #selector(self.orientationDidChange),
    name: UIDevice.orientationDidChangeNotification,
    object: nil)
}

deinit {
  NotificationCenter.default.removeObserver(self)
}

@objc private func orientationDidChange() {
  // 如果未知、正面朝上或正面朝下,则忽略方向更改
  if UIDevice.current.orientation.isValidInterfaceOrientation {
    let orientation = implementation.getCurrentOrientationType()
    notifyListeners("screenOrientationChange", data: ["type": orientation])
  }
}
```

iOS 将在三个维度中检测方向的变化。正如代码注释所提到的,我们将忽略当方向更改不引用横向或纵向方向时通知监听器。

## 锁定和解锁屏幕方向

锁定屏幕方向时,我们将限制视图控制器的 `supportedOrientations` 为请求的方向。解锁屏幕方向时,我们需要恢复最初设置的 `supportOrientations`。修改代码以保存当前视图控制器及其当前 `supportedOrientations`。将以下代码添加到 `ScreenOrientation` 类。

```swift
    private var supportedOrientations: [Int] = []
    private var capViewController: CAPBridgeViewController?

    public func setCapacitorViewController(_ viewController: CAPBridgeViewController) {
        self.capViewController = viewController
        self.supportedOrientations =  viewController.supportedOrientations
    }
```

更新我们刚刚添加到 `ScreenOrientationPlugin` 类的 `load()` 函数以调用 `setCapacitorViewController()`。

```swift
override public func load() {
  NotificationCenter.default.addObserver(
    self,
    selector: #selector(self.orientationDidChange),
    name: UIDevice.orientationDidChangeNotification,
    object: nil)
  if let viewController = (self.bridge?.viewController as? CAPBridgeViewController) {
    implementation.setCapacitorViewController(viewController)
  }
}
```

锁定屏幕方向仅适用于 Capacitor 视图控制器,而不适用于其他正在呈现的视图控制器(例如由浏览器插件呈现的视图控制器)。
要 also 锁定呈现的视图控制器,可以将此代码添加到应用的 `AppDelegate.swift` 文件:

```swift
func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
  return UIInterfaceOrientationMask(rawValue: (self.window!.rootViewController as! CAPBridgeViewController).supportedInterfaceOrientations.rawValue)
}
```

通过设置上面的代码,我们告诉 iOS 我们只想支持视图控制器定义的方向。

我们需要一个函数将 OrientationType 映射到其相应的 UIInterfaceOrientationMask 枚举值。将以下方法添加到 `ScreenOrientation` 类:

```swift
private func fromOrientationTypeToMask(_ orientationType: String) -> UIInterfaceOrientationMask {
  switch orientationType {
  case "landscape-primary":
    return UIInterfaceOrientationMask.landscapeLeft
  case "landscape-secondary":
    return UIInterfaceOrientationMask.landscapeRight
  case "portrait-secondary":
    return UIInterfaceOrientationMask.portraitUpsideDown
  default:
    // Case: portrait-primary
    return UIInterfaceOrientationMask.portrait
  }
}
```

预测未来,我们还需要一个方法将 OrientationType 映射到 `Int`,所以现在我们将它添加到 `ScreenOrientation` 类:

```swift
private func fromOrientationTypeToInt(_ orientationType: String) -> Int {
  switch orientationType {
  case "landscape-primary":
    return UIInterfaceOrientation.landscapeLeft.rawValue
  case "landscape-secondary":
    return UIInterfaceOrientation.landscapeRight.rawValue
  case "portrait-secondary":
    return UIInterfaceOrientation.portraitUpsideDown.rawValue
  default:
    // Case: portrait-primary
    return UIInterfaceOrientation.portrait.rawValue
  }
}
```

当我们实现 `lock()` 和 `unlock()` 方法时,我们可能会遇到无法获取窗口场景的情况。在 `ScreenOrientation` 类中创建一个错误枚举来表示这种情况。

```swift
    enum ScreenOrientationError: Error {
        case noWindowScene
    }
```

现在所有设置都已完成,我们可以实现 `lock()` 方法。将以下方法添加到 `ScreenOrientation` 类:

```swift
public func lock(_ orientationType: String, completion: @escaping (Error?) -> Void) {
  DispatchQueue.main.async {
    let orientation = self.fromOrientationTypeToInt(orientationType)
    self.capViewController?.supportedOrientations = [orientation]
    let mask = self.fromOrientationTypeToMask(orientationType)
    if #available(iOS 16.0, *) {
      if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene {
        windowScene.keyWindow?.rootViewController?.setNeedsUpdateOfSupportedInterfaceOrientations()
        windowScene.requestGeometryUpdate(.iOS(interfaceOrientations: mask)) { error in
          completion(error)
        }
      } else {
        completion(ScreenOrientationError.noWindowScene)
      }
    } else {
      UIDevice.current.setValue(orientation, forKey: "orientation")
      UINavigationController.attemptRotationToDeviceOrientation()
    }
    completion(nil)
  }
}
```

这是一个复杂的方法;让我们逐步介绍它的关键部分:

1. `completion: @escaping (Error?) -> Void` 告诉此方法的调用者他们必须提供一个函数,该函数将在方法完成执行时被调用,如果锁定失败,我们将传回错误。
2. 在 iOS 16 和更新版本上,我们首先尝试使用 `UIApplication.shared.connectedScenes.first` 获取窗口场景。然后在根视图控制器上调用 `setNeedsUpdateOfSupportedInterfaceOrientations`。最后,我们为所需的方向调用 `requestGeometryUpdate`。
3. 在 iOS 15 和更早版本上,`UIDevice.current.setValue(orientation, forKey: "orientation")` 为设备设置屏幕方向,但不会将屏幕旋转到它。然后 `UINavigationController.attemptRotationToDeviceOrientation()` 将尝试将应用旋转到前一行代码中设置的屏幕方向。
4. 我们将代码包装在 `DispatchQueue.main.async` 中以防止阻塞 UI 线程。

此方法需要从 `ScreenOrientationPlugin` 类调用:

```swift
@objc public func lock(_ call: CAPPluginCall) {
  guard let lockToOrientation = call.getString("orientation") else {
    call.reject("Input option 'orientation' must be provided.")
    return
  }
  implementation.lock(lockToOrientation) { error in
    if let error = error {
      call.reject(error.localizedDescription)
    }
    call.resolve()
  }
}
```

`lock()` 方法还引入了一个保护措施,以防止任何人没有 `orientation` 输入参数而调用它。最佳实践是拒绝缺少任何必需输入参数的插件方法调用。

要解锁屏幕方向,我们走回锁定它的步骤。将以下方法添加到 `ScreenOrientation` 类:

```swift
public func unlock(completion: @escaping (Error?) -> Void) {
  DispatchQueue.main.async {
    self.capViewController?.supportedOrientations = self.supportedOrientations
    if #available(iOS 16.0, *) {
      if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene {
        windowScene.keyWindow?.rootViewController?.setNeedsUpdateOfSupportedInterfaceOrientations()
        windowScene.requestGeometryUpdate(.iOS(interfaceOrientations: .all)) { error in
          completion(error)
        }
      } else {
        completion(ScreenOrientationError.noWindowScene)
      }
    } else {
      UINavigationController.attemptRotationToDeviceOrientation()
    }
    completion(nil)
  }
}
```

在 `ScreenOrientationPlugin` 类中,我们将调用的实现的 `unlock` 方法并解决,如果解锁有问题则拒绝:

```swift
@objc public func unlock(_ call: CAPPluginCall) {
  implementation.unlock { error in
    if let error = error {
      call.reject(error.localizedDescription)
    }
    call.resolve()
  }
}
```

## 试一试!

在 Xcode 中,在设备或模拟器上运行应用。插件按预期工作!按"Rotate My Device"按钮将屏幕方向旋转到横向模式,如果你进一步旋转,你将看到屏幕方向已锁定。按"Confirm Signature"将解锁屏幕方向。

本教程的倒数第二步是:Android 实现。
