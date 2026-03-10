---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - Android 实现
contributors:
  - eric-horodyski
sidebar_label: Android 实现
slug: /plugins/tutorial/android-implementation
---

# Android 实现

插件的开发几乎完成。剩下的就是 Android 实现!

## 向 Capacitor 注册插件

> **先决条件:** 在继续之前,请熟悉 <a href="https://capacitorjs.com/docs/android/custom-code" target="_blank">Capacitor 自定义原生 Android 代码文档</a>。

通过运行 `npx cap open android` 在 Android Studio 中打开 Capacitor 应用的 Android 项目。展开 **app** 模块和 **java** 文件夹,然后右键单击应用的 Java 包(`io.ionic.cap.plugin` 包)。从上下文菜单中选择 **New -> Package** 并创建一个名为 **plugins** 的子包。右键单击 **plugins** 包并重复前面的过程以创建一个名为 **ScreenOrientation** 的子包。

接下来,右键单击 **ScreenOrientation** 包并通过从上下文菜单中选择 **New -> Java File** 来添加一个新的 Java 文件。将此文件命名为 `ScreenOrientationPlugin.java`。重复该过程以创建一个名为 `ScreenOrientation.java` 的新文件。

将以下代码复制到 `ScreenOrientationPlugin.java`:

```java
package io.ionic.cap.plugin.plugins.ScreenOrientation;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "ScreenOrientation")
public class ScreenOrientationPlugin extends Plugin {

   @PluginMethod()
   public void orientation(PluginCall call) {
       call.resolve();
   }

   @PluginMethod()
   public void lock(PluginCall call) {
       call.resolve();
   }

   @PluginMethod()
   public void unlock(PluginCall call) {
       call.resolve();
   }
}
```

在项目的 MainActivity 中注册插件类,以便在 Java 和 JavaScript 之间建立桥梁。打开 `MainActivity.java` 并添加一个 `onCreate()` 方法,我们可以在此注册插件:

```java
package io.ionic.cap.plugin;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import io.ionic.cap.plugin.plugins.ScreenOrientation.ScreenOrientationPlugin;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(ScreenOrientationPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
```

## 获取当前屏幕方向

与 iOS 一样,我们将首先处理获取当前屏幕方向。打开 `ScreenOrientation.java` 以设置类并编写获取当前方向的方法:

```java
package io.ionic.cap.plugin.plugins.ScreenOrientation;

import android.view.Surface;
import androidx.appcompat.app.AppCompatActivity;

public class ScreenOrientation {
   private AppCompatActivity activity;

   public ScreenOrientation(AppCompatActivity activity) {
       this.activity = activity;
   }

   public String getCurrentOrientationType() {
       int rotation = activity.getWindowManager().getDefaultDisplay().getRotation();
       return fromRotationToOrientationType(rotation);
   }

   private String fromRotationToOrientationType(int rotation) {
       switch (rotation) {
           case Surface.ROTATION_90:
               return "landscape-primary";
           case Surface.ROTATION_180:
               return "portrait-secondary";
           case Surface.ROTATION_270:
               return "landscape-secondary";
           default:
               return "portrait-primary";
       }
   }
}
```

接下来,在 `ScreenOrientationPlugin.java` 中连接 `orientation` 方法以调用实现类的方法:

```java
package io.ionic.cap.plugins.ScreenOrientation;

import com.getcapacitor.JSObject;
/* 为简洁起见,省略了其余的导入 */

@CapacitorPlugin(name = "ScreenOrientation")
public class ScreenOrientationPlugin extends Plugin {

   private ScreenOrientation implementation;

   @Override
   public void load() {
       implementation = new ScreenOrientation(getActivity());
   }

   @PluginMethod()
   public void orientation(PluginCall call) {
       JSObject ret = new JSObject();
       String type = implementation.getCurrentOrientationType();
       ret.put("type", type);
       call.resolve(ret);
   }

   /* 为简洁起见,省略了其余代码 */
}
```

`load()` 方法是使用 Capacitor 桥接对象初始化 `ScreenOrientation` 类实例的适当位置。

在 Android Studio 中从实际设备或 Android 模拟器运行应用。打开 **Logcat**,你应该看到调用已记录:

```bash
V/Capacitor/Plugin: To native (Capacitor plugin): callbackId: 89582874, pluginId: ScreenOrientation, methodName: orientation
```

> **注意:** 日志的确切值对你来说会有所不同。在此示例中,`89582874` 是分配给从插件进行的方法调用的任意 ID。

## 监听屏幕方向更改

Android 将设备的旋转视为运行时配置更改,因此我们需要一种方法让插件 <a href="https://developer.android.com/guide/topics/resources/runtime-changes" target="_blank">处理配置更改</a>。

Capacitor 提供了一个可覆盖的方法 `handleOnConfigurationChanged()`,可用于响应运行时配置更改。

首先将以下导入添加到 `ScreenOrientationPlugin` 类:

```java
import android.content.res.Configuration;
```

然后将以下方法添加到 `ScreenOrientationPlugin` 类:

```java
@Override
public void handleOnConfigurationChanged(Configuration newConfig) {
   super.handleOnConfigurationChanged(newConfig);
   this.onOrientationChanged();
}

private void onOrientationChanged() {
   JSObject ret = new JSObject();
   String type = implementation.getCurrentOrientationType();
   ret.put("type", type);
   notifyListeners("screenOrientationChange", ret);
}
```

当 Android 通知应用配置更改时,它会返回整个新的配置对象,提出了两个挑战:

1. 我们如何确保仅在方向更改时通知监听器?
2. 我们如何知道配置更改是由于方向更改?

我们需要插件跟踪先前的 `newConfig.orientation` 值,以便与其他配置更改进行比较,以解决这些挑战。

对 `ScreenOrientation` 类进行以下添加:

```java
@Nullable private int configOrientation;

public boolean hasOrientationChanged(int orientation) {
    if (orientation == configOrientation) {
        return false;
    } else {
        this.configOrientation = orientation;
        return true;
    }
}
```

不要忘记将 `androidx.annotation.Nullable` 导入到 `ScreenOrientation.java`。

然后更新 `ScreenOrientationPlugin.java` 中的 `handleOnConfigurationChanged()` 方法:

```java
@Override
public void handleOnConfigurationChanged(Configuration newConfig) {
   super.handleOnConfigurationChanged(newConfig);
   if(implementation.hasOrientationChanged(newConfig.orientation)) {
       this.onOrientationChanged();
   }
}
```

现在,插件将仅在且仅当运行时配置更改与方向更改有关时才通知监听器。

## 锁定和解锁屏幕方向

正如我们在 iOS 实现中看到的,我们需要一个辅助方法将 JavaScript OrientationType 映射到相应的原生枚举值。对于 Android,我们将 OrientationType 映射到 ActivityInfo 枚举值。将以下方法添加到 `ScreenOrientation` 类:

```java
private int fromOrientationTypeToEnum(String orientationType) {
   switch (orientationType) {
       case "landscape-primary":
           return ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE;
       case "landscape-secondary":
           return ActivityInfo.SCREEN_ORIENTATION_REVERSE_LANDSCAPE;
       case "portrait-secondary":
           return ActivityInfo.SCREEN_ORIENTATION_REVERSE_PORTRAIT;
       default:
           // Case: portrait-primary
           return ActivityInfo.SCREEN_ORIENTATION_PORTRAIT;
   }
}
```

确保将 `android.content.pm.ActivityInfo` 导入到 `ScreenOrientation.java`。

接下来,向 `ScreenOrientation` 类添加一个 `lock()` 方法:

```java
public void lock(String orientationType) {
   int orientationEnum = fromOrientationTypeToEnum(orientationType);
   activity.setRequestedOrientation(orientationEnum);
}
```

此方法需要从 `ScreenOrientationPlugin` 类调用:

```java
@PluginMethod()
public void lock(PluginCall call) {
   String orientationType = call.getString("orientation");
   if(orientationType == null) {
       call.reject("Input option 'orientation' must be provided.");
       return;
   }
   implementation.lock(orientationType);
   call.resolve();
}
```

注意,我们防止对不提供 `orientation` 输入参数的 `lock()` 方法进行调用。

要解锁屏幕方向,我们将活动的方向类型设置为未指定的枚举值。将以下方法添加到 `ScreenOrientation` 类:

```java
public void unlock() {
   activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
}
```

然后从 `ScreenOrientationPlugin` 类调用实现方法:

```java
@PluginMethod()
public void unlock(PluginCall call) {
   implementation.unlock();
   call.resolve();
}
```

## 试一试!

在 Android Studio 中,在设备或模拟器上运行应用。按"Rotate My Device"按钮将屏幕方向旋转到横向模式,如果你进一步旋转,你将看到屏幕方向已锁定。按"Confirm Signature"将解锁屏幕方向。

> **注意:** 在测试插件之前,请确保你已将 **Auto-rotate** 设备设置设置为 **on**;否则,它将无法正常工作。

恭喜,你构建了一个适用于 Web、iOS 和 Android 的 Capacitor 插件! 👏 👏 👏

目前,`ScreenOrientation` 插件是一个本地插件;只有此应用可以使用它。没关系!很多时候,你只想在特定应用中使用插件。但是,如果你想在多个应用中重用插件,我们将在最后一步中看到如何做到这一点:打包插件。
