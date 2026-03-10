---
title: Capacitor Android 插件指南
description: Capacitor Android 插件指南
contributors:
  - mlynch
  - jcesarmobile
sidebar_label: Android 指南
slug: /plugins/android
---

# Capacitor Android 插件指南

为 Android 构建 Capacitor 插件需要编写 Java 或 [Kotlin](https://developer.android.com/kotlin/overview) 来与 Android SDK 交互。

## 快速开始

首先,按照插件指南中的[快速开始](/plugins/tutorial/getting-started.md)部分生成一个插件。

接下来,在 Android Studio 中打开 `echo/android/`。然后导航到插件的 `.java` 文件,该文件会根据你创建插件时使用的插件 ID 和插件类名而有所不同。

例如,对于插件 ID 为 `com.domain.echo` 且插件类名为 `Echo` 的插件,你可以在 `android/src/main/java/com/domain/echo/EchoPlugin.java` 找到 `.java` 文件。

## 使用 Kotlin

Capacitor 默认使用 Java,但如果你愿意,可以使用 Kotlin 代替。

生成插件后,在 Android Studio 中右键单击 Java 插件类,然后从菜单中选择"Convert Java file to Kotlin file"选项。Android Studio 将引导你完成为 Kotlin 支持配置项目的过程。完成后,再次右键单击 Java 类并重新选择转换选项以将其转换为 Kotlin 类。

## 插件基础

Android 的 Capacitor 插件是一个简单的 Java 类,它继承 `com.getcapacitor.Plugin` 并具有 `@CapacitorPlugin()` 注解。它有一些带有 `@PluginMethod()` 注解的方法,可以从 JavaScript 调用。

生成插件后,你可以通过打开生成器中选择的插件类名的文件来开始编辑它。

### 简单示例

在生成的示例中,有一个简单的 echo 插件,它有一个 `echo` 函数,可以简单地返回给它的值。

这个示例演示了 Capacitor 插件的几个核心组件:从插件调用接收数据,以及将数据返回给调用者。

`EchoPlugin.java`

```java
package android.plugin.test;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "Echo")
public class EchoPlugin extends Plugin {

    @PluginMethod()
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", value);
        call.resolve(ret);
    }
}
```

### 访问调用数据

每个插件方法都接收一个 `com.getcapacitor.PluginCall` 实例,其中包含客户端插件方法调用的所有信息。

客户端可以发送任何可以 JSON 序列化的数据,例如数字、文本、布尔值、对象和数组。这些数据可以在调用实例的 `getData` 字段上访问,或者使用 `getString` 或 `getObject` 等便捷方法访问。

例如,这是获取传递给方法的数据的方式:

```java
@PluginMethod()
public void storeContact(PluginCall call) {
  String name = call.getString("yourName", "default name");
  JSObject address = call.getObject("address", new JSObject());
  boolean isAwesome = call.getBoolean("isAwesome", false);

  if (!call.getData().has("id")) {
    call.reject("Must provide an id");
    return;
  }
  // ...

  call.resolve();
}
```

注意在 `PluginCall` 实例上访问数据的各种方式,包括如何使用 `getData` 的 `has` 方法检查键。

### 返回数据

插件调用可以成功或失败。插件调用借鉴了 JavaScript promises 的方法名称:调用 `resolve()` 表示成功(可选返回数据),使用 `reject()` 表示失败并传递错误消息。

`PluginCall` 的 `resolve()` 方法接受一个 `JSObject` 并支持 JSON 可序列化的数据类型。这是一个向客户端返回数据的示例:

```java
JSObject ret = new JSObject();
ret.put("added", true);
JSObject info = new JSObject();
info.put("id", "unique-id-1234");
ret.put("info", info);
call.resolve(ret);
```

要失败或拒绝调用,请使用 `call.reject`,传递错误字符串,可选的错误代码和 `Exception` 实例

```java
call.reject(exception.getLocalizedMessage(), null, exception);
```

#### 持久化插件调用

在大多数情况下,插件方法会被调用来执行任务并可以立即完成。但在某些情况下,你需要保持插件调用可用,以便以后访问。你可能希望这样做以定期返回数据,例如流式传输实时地理位置数据,或执行异步任务。

有关如何持久化插件调用的更多详细信息,请参阅[此保存插件调用指南](/main/reference/core-apis/saving-calls.md)。

### 在插件加载时运行代码

偶尔,插件可能需要在首次加载插件时运行一些代码。

为此,为 `load()` 方法提供实现:

```java
@Override
public void load() {
}
```

## 权限 {#permissions}

如果你的插件在 Android 上具有需要最终用户许可的功能,则需要实现权限模式。

在继续本节之前,请确保你已设置权限别名和状态接口。如果没有,请参阅 [Web 指南中的权限部分](/plugins/creating-plugins/web-guide.md#permissions)。

### 注解更改

> 仍在使用 `@NativePlugin`? 请参阅[升级指南](/main/updating/plugins/3-0.md#使用新的-@capacitorplugin-注解)切换到 `@CapacitorPlugin`。

```diff
 @CapacitorPlugin(
     name = "FooBar",
+    permissions = {
+        @Permission(
+            alias = "camera",
+            strings = { Manifest.permission.CAMERA }
+        ),
+        @Permission(
+            alias = "storage",
+            strings = {
+                Manifest.permission.READ_EXTERNAL_STORAGE,
+                Manifest.permission.WRITE_EXTERNAL_STORAGE
+            }
+        )
+    }
 )
 public class FooBarPlugin extends Plugin {
     ...
```

在 `@CapacitorPlugin` 注解中添加 `permissions` 属性,它是一个或多个 `@Permission` 注解的数组。每个 `@Permission` 注解包含零个或多个 Android 权限 `strings` 和一个描述用途的简短 `alias`。

按插件的不同功能对每个 `@Permission` 中的权限字符串进行分组。如果你的插件在其他平台上需要权限但在 Android 上不需要,则使用相同的别名定义权限,但对于 `strings` 使用空数组。这将导致权限请求的结果自动为该权限别名返回"granted"。

```java
@Permission(
    alias = "notifications",
    strings = {}
)
```

### 实现权限请求

通过在 `@CapacitorPlugin` 注解中定义权限,`checkPermissions()` 和 `requestPermissions()` 方法应该完全可用。应用开发者将能够根据需要手动请求权限。但是,建议将插件功能与自动权限请求包装在一起也是最佳实践。

#### 权限 {#permissions}回调

创建一个带有单个 `PluginCall` 参数的 void 方法,并使用 `@PermissionCallback` 注解它,然后在权限请求调用中将方法名称作为字符串传递。回调将在权限请求完成后运行。

```java
@PluginMethod()
public void takePhoto(PluginCall call) {
  if (getPermissionState("camera") != PermissionState.GRANTED) {
    requestPermissionForAlias("camera", call, "cameraPermsCallback");
  } else {
    loadCamera(call);
  }
}

@PermissionCallback
private void cameraPermsCallback(PluginCall call) {
  if (getPermissionState("camera") == PermissionState.GRANTED) {
    loadCamera(call);
  } else {
    call.reject("Permission is required to take a picture");
  }
}
```

#### 启动权限请求

权限请求通过调用请求辅助方法之一来启动。

对于单个别名,可以使用 `requestPermissionForAlias`。可以向 `requestPermissionForAliases` 提供多个别名。使用 `requestAllPermissions` 请求插件注解中定义的所有权限。

```diff
 @PluginMethod()
 public void takePhoto(PluginCall call) {
   if (!hasRequiredPermissions()) {
+    requestAllPermissions(call, "cameraPermsCallback");
   } else {
     loadCamera(call);
   }
 }

 @PermissionCallback
 private void cameraPermsCallback(PluginCall call) {
   ...
 }
```

### Manifest

将任何所需的[安装时](https://developer.android.com/guide/topics/permissions/overview#install-time)权限放在插件的 `AndroidManifest.xml` 中。不要添加运行时权限(提示用户接受的权限)。这些应由应用开发者添加到 Capacitor 应用的清单中。确保你的插件记录了应在应用中添加的任何所需的运行时权限。

```diff
  <manifest xmlns:android="http://schemas.android.com/apk/res/android"
      package="com.mycompany.plugins.network">
+     <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
  </manifest>
```

## 错误处理 {#error-handling}

### 不可用

可以抛出此错误以指示当前无法使用该功能,通常是因为它需要较新的 Android API 版本。

```java
@PluginMethod
public void methodThatUsesNewAndroidAPI(PluginCall call) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        // TODO implementation
    } else {
        call.unavailable("Not available on Android API 25 or earlier.");
    }
}
```

> 建议尽可能对较旧的 API 优雅地降级体验。谨慎使用 `unavailable`。

### 未实现

使用此错误表示无法为 Android 实现该方法。

```java
@PluginMethod
public void methodThatRequiresIOS(PluginCall call) {
    call.unimplemented("Not implemented on Android.");
}
```

## 展示原生屏幕

要在 Capacitor 屏幕上展示原生屏幕,我们将使用 [Android 的 Intents](https://developer.android.com/guide/components/intents-filters)。Intents 允许你从应用或其他应用启动 activity。[参见常用 Intents](https://developer.android.com/guide/components/intents-common)

### 无结果的 Intents

大多数情况下,你只想展示原生 Activity,在这种情况下,你可以直接触发[相关操作](https://developer.android.com/guide/components/intents-common)。

```java
Intent intent = new Intent(Intent.ACTION_VIEW);
getActivity().startActivity(intent);
```

### 有结果的 Intents

有时,当你启动 Intent 时,你期望得到一些结果。在这种情况下,你希望使用 `startActivityForResult`。

创建一个回调方法来处理启动的 activity 的结果,使用 `PluginCall` 和 `ActivityResult` 参数,并使用 `@ActivityCallback` 注解它。将此方法的名称传递给 `startActivityForResult`,它将在启动的 activity 完成时运行。

```java
@CapacitorPlugin()
class ImagePicker extends Plugin {

  @PluginMethod()
  public void pickImage(PluginCall call) {
    Intent intent = new Intent(Intent.ACTION_PICK);
    intent.setType("image/*");

    // 使用回调方法的名称启动 Activity 以获取结果
    startActivityForResult(call, intent, "pickImageResult");
  }

  @ActivityCallback
  private void pickImageResult(PluginCall call, ActivityResult result) {
    if (call == null) {
      return;
    }

    // 对结果数据执行某些操作
  }
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

要从 Java 插件类发出事件:

```java
JSObject ret = new JSObject();
ret.put("value", "some value");
notifyListeners("myPluginEvent", ret);
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

> 也可以在 `window` 上触发全局事件。请参阅 [`triggerJSEvent`](/main/reference/core-apis/android.md#triggerjsevent) 的文档。

## 覆盖导航

Capacitor 插件可以覆盖 webview 导航。为此,插件可以覆盖 `public Boolean shouldOverrideLoad(Uri url)` 方法。返回 `true` 会导致 WebView 中止加载 URL。返回 `false` 会导致 WebView 继续加载 URL。返回 `null` 将延迟到默认的 Capacitor 策略。
