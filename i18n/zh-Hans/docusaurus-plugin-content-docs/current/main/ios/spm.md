---
title: Swift Package Manager
description: SPM 基础
contributors:
  - giralte-ionic
  - markemer
slug: /ios/spm
---

# Swift Package Manager

Swift Packages 是 Apple 用于软件依赖的新的一等工具。传统上，Capacitor 使用 CocoaPods 来管理内部和插件的依赖关系，但是现在是时候转向受支持的解决方案了。

从 Capacitor 6 开始，您可以选择使用 CocoaPods 或 Swift Package Manager (SPM)。几乎所有当前由 capacitor-team 支持的插件都支持 SPM，即 <a href="https://github.com/ionic-team/capacitor-plugins">capacitor-plugins</a> 中的插件。

我们已经尽力确保您不需要改变太多使用 Capacitor 的方式来使用 SPM，但有一些事情需要了解。

## 工作原理

当 Capacitor 项目使用 SPM 时，我们使用一个"基础 SPM"包，它将作为引用所有项目依赖项的地方：

![基础 SPM 图片](/img/v6/docs/ios/spm/base-spm.png)

当您同步新插件时，Capacitor CLI 将修改 CapApp-SPM 包。重要的是您不要在这里修改内容，因为 CLI 可以而且将会更改内容。

## 在新的 Capacitor 项目中使用 SPM

首先，我们从正常的 `npm init @capacitor/app@latest` 开始：

![演示步骤 1](/img/v6/docs/ios/spm/demo-step1.png)

现在我们要向我们的项目添加 iOS 平台：

`npm install @capacitor/ios`

接下来让我们构建 web 项目：

`npm run build`

完成后，我们可以添加 iOS 项目。我们需要在正常的 add 命令中添加选项 `--packagemanager SPM`：

`npx cap add ios --packagemanager SPM`

现在您可以使用 `npx cap open ios` 打开 iOS 项目并从那里运行您的应用。

---

### 使用 SPM 添加和使用 Capacitor 插件

因此，让我们向这个项目添加一个插件并使用该插件做一些事情。

首先安装 Capacitor App 插件：

`npm install @capacitor/app`

然后让我们同步 web 应用。这会将 App 插件 SPM 添加到 iOS 项目：

`npx cap sync`

您现在可以正常使用 App 插件。

## 在现有的 Capacitor 项目中使用 SPM

首先，确保您有当前项目状态的备份，无论是在源代码控制还是其他地方。

### 删除您的 iOS 目录

如果您**根本没有手动更改 Xcode 项目**，迁移的一个选项是删除 `ios` 目录，然后运行 `npx cap add ios --packagemanager SPM`。这将删除 CocoaPods 模板项目并替换为 SPM 模板项目。

### 使用我们的迁移工具

Capacitor CLI 有一个命令可以帮助从 CocoaPods 迁移到 Swift Package Manager。但是，仍然需要两个手动步骤。需要注意的是：使用 Cordova 插件的项目应该可以工作，但某些插件可能无法正常工作，因为我们必须为它们生成 `Package.swift` 文件。此外，使用没有可用 SPM 版本的 capacitor 插件的项目将无法正常工作，并且会在迁移期间和运行 `npx cap sync` 时显示有关不兼容插件的警告。

首先，在项目根目录中运行 `npx cap spm-migration-assistant`。

此工具将：
  - 运行 `pod deintegrate` 删除 CocoaPods
  - 删除 `Podfile`、`App.xcworkspace` 和 `Podfile.lock`
  - 创建一个包含所需文件的 `CapApp-SPM` 目录
  - 从您的插件生成 `Package.swift`，如果无法包含任何插件，则会警告您
  - 向您的 ios 项目目录添加 `debug.xcconfig`

然后运行 `npx cap open ios`，您应该会看到类似以下内容：

![迁移步骤 1](/img/spm/xcode-step-1.png)

突出显示 App，并选择 Package Dependencies 标签，然后在此页面上按 + 符号添加依赖项：

![迁移步骤 2](/img/spm/xcode-step-2.png)

您应该会看到类似以下内容 - 从对话框中选择 Add Local...：

![迁移步骤 3](/img/spm/xcode-step-3.png)

在此对话框中选择 CapApp-SPM 并点击 Add Package：

![迁移步骤 4](/img/spm/xcode-step-4.png)

当显示此屏幕时，再次点击 Add Package：

![迁移步骤 5](/img/spm/xcode-step-5.png)

完成后，您应该会看到这样的屏幕。现在，转到下一节关于添加 `debug.xcconfig` 的部分

![迁移步骤 6](/img/spm/xcode-step-6.png)

#### 将 debug.xcconfig 添加到项目

从应用信息标签中，选择 Add Configuration file...

![XCConfig 步骤 1](/img/spm/xcconfig-step1.png)

然后选择名为 `debug.xcconfig` 的文件

![XCConfig 步骤 2](/img/spm/xcconfig-step2.png)

最后选择 xcconfig 作为您的选择

![XCConfig 步骤 3](/img/spm/xcconfig-step3.png)

此时您已完成，可以正常构建和工作。

### 将现有插件转换为 SPM {#converting-existing-plugins-to-spm}

如果您的插件除了必需的 `[Name]Plugin.m` 和 `[Name]Plugin.h` 之外只包含 Swift，您可以使用 [capacitor-plugin-converter](https://github.com/ionic-team/capacitor-plugin-converter)。

此工具将进行以下更改：

- 将以下必需的内容添加到您的主 swift 插件文件 `[Name]Plugin.swift` 中：
  - 向您的类添加对 `CAPBridgedPlugin` 协议的符合性。
  - 向您的类添加 3 个变量。`identifier`、`jsName` 和 `pluginMethods`：
    - `identifier` 将对应于 `CAP_PLUGIN` 宏的第一个参数。
    - `jsName` 将对应于 `CAP_PLUGIN` 宏的第二个参数。
    - `pluginMethods` 将是传递给 `CAP_PLUGIN` 宏的方法数组。
- 将在插件文件夹的根目录创建 `Package.swift` 文件。
- 将删除以下文件，因为不再需要它们：
  - `Plugin.xcodeproj`
  - `Plugin.xcworkspace`
  - `Plugin/Info.plist`
  - `PluginTests/Info.plist`
  - `Podfile`
- 为了符合 SPM 最佳实践，项目文件将被移动到 `Sources` 和 `Tests` 目录。
- 插件的 `package.json` 将进行以下更改：
  - 文件数组将添加这些文件或目录：
    - `ios/Sources`
    - `ios/Tests`
    - `Package.swift`
  - `verify:ios` 将更改为 `xcodebuild -scheme YourPluginName -destination generic/platform=iOS`，以使其继续按预期工作。
- 您的插件 podspec 将被更改，使 `s.source_files` 现在指向 `Sources` 目录而不是 `Plugin` 目录。


有关更多信息，请参阅存储库中的文档 [capacitor-plugin-converter](https://github.com/ionic-team/capacitor-plugin-converter)。

### 故障排除

添加插件后，尝试在 Xcode 中"重置包缓存"：

![演示步骤 1](/img/v6/docs/ios/spm/reset-package.png)
