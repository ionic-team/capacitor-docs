---
title: Custom Native iOS Code
description: Custom Native iOS Code
contributors:
  - dotNetkow
  - mlynch
slug: /ios/custom-code
---

# Custom Native iOS Code

With Capacitor, you are encouraged to write Swift or Objective-C code to implement the native features your app needs.

There may not be [a Capacitor plugin](/plugins.mdx) for everything--and that's okay! It is possible to write WebView-accessible native code right in your app.

## WebView-Accessible Native Code

The easiest way to communicate between JavaScript and native code is to build a custom Capacitor plugin that is local to your app.

### `EchoPlugin.swift`

First, create a `EchoPlugin.swift` file by [opening Xcode](/main/ios/index.md#opening-the-ios-project), right-clicking on the **App** group (under the **App** target), selecting **New File...** from the context menu, choosing **Swift File** in the window, and creating the file.

![New Swift File in Xcode](/img/v6/docs/ios/xcode-new-swift-file.png)

Copy the following Swift code into `EchoPlugin.swift`:

```swift
import Capacitor

@objc(EchoPlugin)
public class EchoPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "EchoPlugin"
    public let jsName = "Echo"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "echo", returnType: CAPPluginReturnPromise)
    ]

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve(["value": value])
    }
}
```

> The `@objc` decorators are required to make sure Capacitor's runtime (which must use Objective-C for dynamic plugin support) can see it.

### Register the Plugin

We must register custom plugins on both iOS and web so that Capacitor can bridge between Swift and JavaScript.

#### `MyViewController.swift`

[Create a custom `MyViewController.swift`](../ios/viewcontroller.md).

Then add a `capacitorDidLoad()` method override and register the plugin:

```swift
override open func capacitorDidLoad() {
    bridge?.registerPluginInstance(EchoPlugin())
}
```

#### JavaScript

In JS, we use `registerPlugin()` from `@capacitor/core` to create an object which is linked to our Swift plugin.

```typescript
import { registerPlugin } from '@capacitor/core';

const Echo = registerPlugin('Echo');

export default Echo;
```

> The first parameter to `registerPlugin()` is the plugin name, which must match the second parameter to the `CAP_PLUGIN` macro in `EchoPlugin.m`.

**TypeScript**

We can define types on our linked object by defining an interface and using it in the call to `registerPlugin()`.

```diff
 import { registerPlugin } from '@capacitor/core';

+export interface EchoPlugin {
+  echo(options: { value: string }): Promise<{ value: string }>;
+}

-const Echo = registerPlugin('Echo');
+const Echo = registerPlugin<EchoPlugin>('Echo');

 export default Echo;
```

The generic parameter of `registerPlugin()` is what defines the structure of the linked object. You can use `registerPlugin<any>('Echo')` to ignore types if you need to. No judgment. ❤️

### Use the Plugin

Use the exported `Echo` object to call your plugin methods. The following snippet will call into Swift on iOS and print the result:

```typescript
import Echo from '../path/to/echo-plugin';

const { value } = await Echo.echo({ value: 'Hello World!' });
console.log('Response from native:', value);
```

### Next Steps

[Read the iOS Plugin Guide &#8250;](/plugins/creating-plugins/ios-guide.md)
