---
title: 构建 Capacitor 插件
description: 构建 Capacitor 插件 - 打包插件
contributors:
  - eric-horodyski
sidebar_label: 打包插件
slug: /plugins/tutorial/packaging-the-plugin
---

# 打包插件

`ScreenOrientation` 插件在功能上已完成,并作为本地插件集成到 Capacitor 应用中。但是,`ScreenOrientation` 插件无法被其他 Capacitor 应用使用其当前状态。

让我们继续打包插件以进行发布,使 `ScreenOrientation` 插件在全球范围内可用。

> **注意:** 本部分引用了 <a href="https://capacitorjs.com/docs/plugins/creating-plugins" target="_blank">创建 Capacitor 插件</a>部分中的步骤和过程。有关本教程范围之外的详细信息,请参阅文档。

## 生成新的插件项目

Capacitor 有一个<a href="https://github.com/ionic-team/create-capacitor-plugin" target="_blank">插件生成器</a>,我们可以用它来为发布全局插件搭建适合格式的项目。

在新终端中,运行以下命令:

```bash
npx @capacitor/create-plugin \
  --name @capacitor-community/screen-orientation \
  --package-id io.ionic.plugins.screenorientation \
  --class-name ScreenOrientation \
  --repo "https://ionic.io" \
  --license "MIT" \
  --description "Work with the screen orientation in a common way for iOS, Android, and web"
```

当被要求提供目录时,按 Enter 使用默认值。当被要求提供作者姓名时,使用你自己的名字!

## 迁移插件代码

查看生成的项目的结构;它看起来与为 Capacitor 应用构建的结构非常相似,不是吗? 🤔

显然,这是有意为之,以便轻松将插件代码从 Capacitor 应用的代码库移植到生成的插件项目中。

将 `src/plugins/screen-orientation` 中文件的内容复制到插件项目中等效的 `web.ts`、`index.ts` 和 `definitions.ts` 文件中。

接下来,将 `ScreenOrientation.swift`、`ScreenOrientationPlugin.m` 和 `ScreenOrientationPlugin.swift` 的内容从一个代码库复制到另一个。

然后,对 `ScreenOrientation.java` 和 `ScreenOrientationPlugin.java` 执行相同的操作。之后,更新插件项目中这些文件的包:

```java
package io.ionic.plugins.screenorientation
```

上面的包名是在生成插件项目时提供的,项目中的任何 Android 文件都应该使用这个包名。

最后,让我们通过运行以下命令来验证迁移代码时没有发生任何问题:

```bash
npm run verify
```

> **注意:** 你可以通过将插件文件夹链接到 Capacitor 项目来在发布前测试插件。有关详细信息,请参阅<a href="https://capacitorjs.com/docs/plugins/workflow#local-testing" target="_blank">插件开发工作流程</a>。

## 更新插件文档

查看插件项目的 `README.md` 文件;它已更新以记录插件的 API。当我们运行 `npm run verify` 时发生了此更新。对源文件 JSDoc 注释所做的任何更改都可以通过运行 `npm run docgen` 在 readme 文件的 API 部分中反映。

插件要求开发者修改其 Capacitor 应用的 `AppDelegate.swift` 文件,因此应如何在插件的文档中包含这样做的说明。

> **注意:** 始终记录开发者在安装或配置你构建的插件时需要进行的任何修改。

使用以下 markdown 替换 `README.md` 的"安装"部分:

## 安装

```bash
npm install @capacitor-community/screen-orientation
npx cap sync
```

### iOS

对于 iOS,你必须对 `AppDelegate.swift` 文件进行以下调整:

```diff
import UIKit
+ import CapacitorCommunityScreenOrientation

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
+   func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -\> UIInterfaceOrientationMask {
+     return ScreenOrientationPlugin.supportedOrientations
+  }
}
```

## 发布插件

插件处于可以发布到 npm 注册表的状态。我们不会在本教程中这样做,但请注意,发布 Capacitor 插件项目的命令与发布任何其他 npm 包的命令相同:`npm publish`。

你可以将全局 Capacitor 插件发布到公共 npm 注册表、私有注册表,或者只是在你的机器上本地链接到一堆项目。无论适合你的用例。

更重要的是,有一个<a href="https://github.com/capacitor-community/welcome" target="_blank">Capacitor Community GitHub 组织</a>,你可以在其中托管插件,并在你继续开发和维护插件时与社区和 Capacitor 团队紧密合作。

## 结论

Capacitor 的插件 API是一个灵活而强大的解决方案,用于为 Capacitor 应用补充 Web 无法使用的原生功能,无论是需要为特定应用添加自定义原生代码还是在应用舰队之间重用原生代码。

期待你开发的下一个插件! 🎉
