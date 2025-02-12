---
title: Building a Capacitor Plugin
description: Building a Capacitor Plugin - Implementing for iOS
contributors:
  - eric-horodyski
sidebar_label: Implementing for iOS
slug: /plugins/tutorial/ios-implementation
---

# Implementing for iOS

The decision to implement iOS before Android is arbitrary - in all honesty, you could have written the Android implementation first, then iOS, then web. Or any combination of the three. It just so happens that this tutorial implements iOS before Android.

You may want to implement the web first because it sits closer to the plugin’s API definition. If any tweaks need to be made to the API, it’s far easier to uncover them while working in the web layer.

## Register the plugin with Capacitor

> **Prerequisite:** Familiarize yourself with the <a href="https://capacitorjs.com/docs/ios/custom-code" target="_blank">Capacitor Custom Native iOS Code documentation</a> before continuing.

Open up the Capacitor application’s iOS project in Xcode by running `npx cap open ios`. Right-click the **App** group (under the **App** target) and select **New Group** from the context menu. Name this new group **plugins**. Add a new group to **plugins** and name it **ScreenOrientation**.

Once complete, you'll have a path `/App/App/plugins/ScreenOrientation/`. Add the following files by right-clicking the **ScreenOrientation** group and selecting **New File…** from the context menu:

`ScreenOrientation.swift`
`ScreenOrientationPlugin.swift`

Copy the following code into `ScreenOrientationPlugin.swift`:

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

Note the use of `@objc` decorators; these are required to make sure Capacitor can see the class and its methods at runtime.

## Getting the current screen orientation

Let’s tackle the task of getting the current screen orientation first. Open up `ScreenOrientation.swift` to set up the class and write a method to get the current orientation:

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

Next, wire up the `orientation` method in `ScreenOrientationPlugin.swift` to call the implementation class’s method:

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

  /* Remaining code omitted for brevity */
}
```

Go ahead and run the app from Xcode, either on an actual device or an iOS simulator. Once it finishes loading, you should see the following logs printed to the console:

```bash
⚡️  To Native ->  ScreenOrientation orientation 115962915
⚡️  TO JS {"type":"portrait-primary"}
```

> **Note:** The exact value of the logs will be different for you. In this example, `115962915` is an arbitrary ID assigned to the method call made from the plugin.

You’ve successfully bridged native iOS code to the web application! 🎉

## Listening for screen orientation changes

iOS will let us know when a user rotates their device through the <a href="https://developer.apple.com/documentation/foundation/notificationcenter" target="_blank">NotificationCenter</a>, when UIDevice fires the `orientationDidChangeNotification` event.

The `load()` method is the proper place to register an observer for this event. Likewise, the `deinit()` method is the appropriate place to remove the observer.

Within the observer registration, we need to provide a method to return the changed orientation to our plugin’s listeners listening for the `screenOrientationChange` event we defined as part of our plugin’s API. We can reuse the `getCurrentOrientationType()` method to obtain the changed screen orientation.

Add the following methods to the `ScreenOrientationPlugin` class:

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

deinit {
  NotificationCenter.default.removeObserver(self)
}

@objc private func orientationDidChange() {
  // Ignore changes in orientation if unknown, face up, or face down
  if UIDevice.current.orientation.isValidInterfaceOrientation {
    let orientation = implementation.getCurrentOrientationType()
    notifyListeners("screenOrientationChange", data: ["type": orientation])
  }
}
```

iOS will detect changes in orientation in three dimensions. As the code comment mentions, we’ll ignore notifying listeners when orientation changes don’t reference landscape or portrait orientations.

## Locking and unlocking the screen orientation

Locking the Screen Orientation only works for the Capacitor View Controller only, but not other View Controllers being presented (such as the one presented by Browser plugin).
For also lock presented View Controllers, this code can be added to the app's `AppDelegate.swift` file:

```swift
func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {
  return UIInterfaceOrientationMask(rawValue: (self.window!.rootViewController as! CAPBridgeViewController).supportedInterfaceOrientations.rawValue)
}
```

Notice that the function returns `ScreenOrientationPlugin.supportedOrientations`. This property doesn’t exist yet, so let’s add it to the `ScreenOrientationPlugin` class as a private static class member:

```swift
public static var supportedOrientations = UIInterfaceOrientationMask.all
```

By setting up the code above, we tell iOS that we only want to support orientations defined by the value of `ScreenOrientationPlugin.supportedOrientations`. As you might imagine, the `UIInterfaceOrientationMask.all` enumeration value supports all orientations. We will pick a more restrictive enumeration value when we write code to lock the screen orientation.

We’ll need a function that maps an OrientationType to its corresponding UIInterfaceOrientationMask enumeration value. Add the following method to the `ScreenOrientation` class:

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

Forecasting into the future, we will also need a method that maps an OrientationType to an `Int`, so we’ll add it now into the `ScreenOrientation` class:

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

Now that all the setup is out of the way, we can implement the `lock()` method. Add the following method to the `ScreenOrientation` class:

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

This is a complicated method; let’s walk through essential parts of it:

1. `completion: @escaping (Error?) -> Void` tells callers of this method that they must provide a function that will be called when the method finishes execution, and we will pass an error back if the lock failed`.
2. On iOS 16 and newer, first we try to get the window scene with `UIApplication.shared.connectedScenes.first`. Then call `setNeedsUpdateOfSupportedInterfaceOrientations` on the root view controller. Finally we call `requestGeometryUpdate` for the desired orientation.
3. On iOS 15 and older, `UIDevice.current.setValue(orientation, forKey: "orientation")` sets a screen orientation for the device, but does not rotate the screen to it. Then `UINavigationController.attemptRotationToDeviceOrientation()` will attempt to rotate the application to the screen orientation set in the previous line of code.
4. We wrap the code in `DispatchQueue.main.async` to prevent blocking the UI thread.

This method needs to get called from the `ScreenOrientationPlugin` class:

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

The `lock()` method also introduces a guard to prevent anyone from calling it without an `orientation` input parameter. It’s best practice to reject any calls to plugin methods that are missing any required input parameters.

To unlock the screen orientation, we walk back the steps we took the lock it. Add the following method to the `ScreenOrientation` class:

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

In the `ScreenOrientationPlugin` class, we’ll call the implementation's `unlock` method and resolve, or reject if unlock had some problem:

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

## Give it a test drive!

In Xcode, run the app on either a device or a simulator. The plugin functions as intended! Pressing the “Rotate My Device” button will rotate the screen orientation into landscape mode, and if you rotate further, you will see that the screen orientation is locked. Pressing “Confirm Signature“ will unlock the screen orientation.

The penultimate step to this tutorial is: the Android implementation.
