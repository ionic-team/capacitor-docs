---
title: Android 故障排除
sidebar_label: 故障排除
description: Android 故障排除
contributors:
  - mlynch
  - jcesarmobile
slug: /android/troubleshooting
---

# Android 故障排除

创建一个 100% 完美的原生管理工具几乎是不可能的，迟早您会在 Android 工作流程的某些部分遇到各种问题。

本指南试图记录常见的 Android 问题及其可能的解决方案。

## Android 工具箱

每个 Android 开发者都会学习一些调试 Android 问题的常用技术，您应该将这些技术纳入您的工作流程中：

### Google、Google、Google

每当您遇到 Android、Gradle 或模拟器的问题时，第一步都应该是将错误复制并粘贴到 Google 搜索中。

Capacitor 使用标准的 Android 工具包，因此如果您遇到问题，很可能许多 Android 开发者也遇到过，并且有解决方案。

这可能就像更新依赖项、运行 Gradle 同步或使缓存无效一样简单。

### Gradle 同步

如果您从 npm 安装了一个新插件，但无法在 Android 构建中使用或看到该插件，请尝试使用 Android Studio 右上角的"Sync Project with Gradle Files"按钮（该图标看起来像一头大象）。这将重新同步您的原生 Android 代码以包含新的插件代码，并应允许您使用新插件。有关更多信息，请参阅 [Github 上的这个问题](https://github.com/ionic-team/capacitor/issues/4012)。

它还可以帮助解决许多其他看似随机的问题，因此在遇到大多数 Android 构建问题时，运行"Sync Project with Gradle Files"始终是一个好的第一步。

### 清理/重新构建

清理和重新构建可以解决许多构建问题：

![Android 清理和构建](/img/v6/docs/android/clean-rebuild.png)

### 使缓存无效/重启

如果您确信已修复问题，但 Android Studio 或 Gradle 不认同，通常的解决方案是让 Android Studio 使其缓存无效并重新启动程序。

这可以从文件菜单中轻松完成：

![Android 使缓存无效](/img/v6/docs/android/invalidate-caches.png)

## 错误："package android.support.* does not exist"

当某个 Cordova 或 Capacitor 插件使用旧的 android 支持依赖项而不是使用新的 AndroidX 等效项时，会发生此错误。
您应该在插件存储库中报告此问题，以便维护者可以更新插件以使用 AndroidX 依赖项。

作为一种变通方法，您也可以使用 jetifier 修补插件：

```bash
npm install jetifier
npx jetify
npx cap sync android
```

## 错误："Please select Android SDK"

此错误通常是由于 Gradle 需要同步，这是您在更新依赖项和更改项目设置后定期需要做的事情。

要手动同步 Gradle，请从主菜单栏打开 File -> Sync Project with Gradle Files：

![同步 Gradle](/img/v6/docs/android/sync-gradle.png)

## 错误："APK Can't be installed"

APK 无法安装到模拟器或设备通常是由于存在具有相同包名称的现有应用。尝试运行应用时，您可能会看到如下错误：

![Android APK 失败](/img/v6/docs/android/apk-failed.png)

解决方案是删除所有旧应用，并确保您的包名称在 `AndroidManifest.xml` 中是最新的，并且不与您正在开发的其他应用冲突。

最后，以防万一，请执行清理并重新构建。

## 错误："Unable to locate a Java Runtime"

如果未设置 `JAVA_HOME` 环境变量，则在使用 `run` 命令时可能会发生此错误。

要解决此问题，请使用 Android Studio 中 Preferences > Build, Execution, Deployment, Build Tools > Gradle > Gradle JDK 下的路径将 `JAVA_HOME` 设置为环境或系统变量。

![Android Studio 中的 JDK 路径](/img/v6/docs/android/jdk-path.png)

在 Mac 上，可以在 `.zshrc` 或 `.bashrc` 文件中更新它，或在环境中导出它。

```bash
export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"
```

在 Windows 上，您可以在环境变量设置下将 `JAVA_HOME` 设置为系统变量。

## 重新创建项目

Capacitor 允许您管理自己的 Android 项目。就像任何 IDE 支持的项目一样，有时事情会如此不同步，以至于唯一的解决方案是重建项目。

为此，请按照以下步骤操作：

1. 将您创建的任何源代码（如 `app/android/src` 中的 Java 文件、manifest 文件或资源文件）复制到 `app/android` 之外的安全位置。
2. 接下来，确保您运行的是最新版本的 Capacitor CLI：`npm install @capacitor/cli@latest`
3. 删除 android 目录：`rm -rf android/`
4. 从 Capacitor 重新创建 Android 应用：`npx cap add android`
5. 将保存的源文件复制回项目中

## 插件未实现

在 Android 上，如果 Capacitor 找不到插件或无法将其代码注入到 WebView 中，就会发生这种情况。

首先，确保插件已安装并出现在 `package.json` 中。

然后，运行 `npx cap sync android`。

最后，使用 Android Studio 右上角的"Sync Project with Gradle Files"按钮（该图标看起来像一头大象）。这将重新同步您的原生 Android 代码以包含新的插件代码，并应允许您使用新插件。

另外，如果您正在从 Capacitor 1 或 2 迁移，请确保您启用了[自动插件加载](https://capacitorjs.com/docs/updating/3-0#switch-to-automatic-android-plugin-loading)。

如果仍然出现"Plugin not implemented"错误，请确保您没有使用 service workers，这会阻止 Capacitor 和插件代码注入。或者，如果您想使用它们，可以使用[此变通方法](https://github.com/ionic-team/capacitor/issues/1655#issuecomment-579229390)使注入工作。

## 使用 Proguard

ProGuard 是用于缩小、混淆和减小应用大小的工具。它通过将 `build.gradle` 中的 `minifyEnabled` 选项设置为 `true` 来启用。在使用插件或一些自定义原生代码时，此过程有时会导致 Capacitor 出现问题，这些插件或代码依赖于其代码在运行时可读，例如代码反射。ProGuard 扫描代码以尝试优化和缩小应用的大小，有时此过程可以删除对插件功能重要的类或方法。

从 Capacitor v3.2.3 开始，Capacitor 中包含了 ProGuard 规则，涵盖了 Capacitor 插件、权限和活动结果的核心功能。如果您使用的 Capacitor 版本早于 v3.2.3，请将[以下规则](https://github.com/ionic-team/capacitor/blob/main/android/capacitor/proguard-rules.pro)添加到 Android 项目的 `proguard-rules.pro` 文件中。这些规则应该可以解决任何核心 Capacitor 功能和核心插件的问题。

如果在添加这些规则后仍然遇到任何问题，请尝试识别源插件或原生代码，并添加规则以覆盖特定的插件代码，例如：

```
-keep class com.mythirdpartyplugin.** { *; }
```

如果您确定某个 Capacitor 插件导致了 ProGuard 问题，以下 ProGuard 规则将覆盖任何插件类代码，如果您不介意所有插件都免于 ProGuard 处理：

```
-keep public class * extends com.getcapacitor.Plugin
```
