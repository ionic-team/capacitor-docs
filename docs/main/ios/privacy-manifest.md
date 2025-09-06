---
title: 隐私清单
description: 为 iOS 应用添加隐私清单
slug: /ios/privacy-manifest
---

Apple 在 WWDC23 上宣布了新的[第三方 SDK 隐私协议](https://developer.apple.com/news/?id=3d8a9yyh)，要求 SDK 作者在其 SDK 中声明 API 使用的批准原因，以增强透明度和用户隐私。

自 2024 年 3 月 13 日起，当上传没有批准原因的新应用或更新应用访问某些 API 时，App Store Connect 将通知用户。

**自 2024 年 5 月 1 日起，向 App Store Connect 提交新应用或更新应用时，必须包含批准原因。**

## 满足要求的步骤

并非所有应用都会被标记，但某些插件（如 `@capacitor/filesystem` 和 `@capacitor/preferences`）可能需要隐私清单文件。如果您收到了通知：

1. 更新 Capacitor 至：
a. `>= 7.0.0`（适用于 Capacitor 7）
b. `>= 6.0.0`（适用于 Capacitor 6）
c. `>= 5.7.4`（适用于 Capacitor 5）
d. `>= 4.8.2`（适用于 Capacitor 4）
e. 不支持 Capacitor <= 3
2. 使用 VS Code 扩展为您的应用创建隐私清单文件，或手动创建。

### VS Code 扩展

确保已安装 [Ionic VS Code 扩展](https://ionic.link/vscode)并打开您的项目。

在推荐项下，如果您的应用使用了某些 API 的插件，您会看到*添加隐私清单*。

![无清单](/img/v6/docs/ios/no-manifest.png)

选择“是”以创建最基本的隐私清单文件。

扩展将列出所有需要的更改，作为名为*缺少隐私清单类别*的推荐项。例如：

![隐私更改](/img/v6/docs/ios/privacy-change.png)

您必须选择一个原因代码来解释您如何使用该插件。如果不确定，请点击*文档*查看 Apple 对每个原因代码的说明文档。

请注意，VS Code 扩展有一组已知插件的规则来帮助您。如果 Apple 仍因缺少隐私清单原因而拒绝您的应用，可能是您使用的插件扩展未知。您可以在 [VS Code 扩展问题跟踪器](https://github.com/ionic-team/vscode-ionic/issues)上提出问题。

### 手动步骤

如果您希望手动创建隐私清单文件，请打开 Xcode，然后：

选择*文件 > 新建文件*。

向下滚动到*资源*部分，选择*应用隐私文件*类型。

点击*下一步*。

在*目标*列表中勾选您的应用。

点击*创建*。

将创建一个名为 `PrivacyInfo.xcprivacy` 的文件。在 Xcode UI 中交互式创建此文件可能具有挑战性，因此右键单击它并选择*使用外部编辑器打开*来手动编辑可能更容易。

作为一个示例文件，这里是一个 `PrivacyInfo.xcprivacy` 文件，它通过使用 `@capacitor/preferences` 插件来使用 UserDefaults API。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>NSPrivacyTracking</key>
    <false/>
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
      <dict>
        <key>NSPrivacyAccessedAPIType</key>
        <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
        <key>NSPrivacyAccessedAPITypeReasons</key>
        <array>
          <string>CA92.1</string>
        </array>
      </dict>
    </array>
    <key>NSPrivacyTrackingDomains</key>
    <array/>
  </dict>
</plist>
```

要查找可能需要隐私清单更改的代码和插件，您可以运行 `sh required_reason_api_text_scanner.sh node_modules` 来使用类似[此脚本](https://github.com/Wooder/ios_17_required_reason_api_scanner)的工具。

要选择正确的原因代码（如上述示例中的 `CA92.1`），您需要阅读 [Apple 的文档](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api)。

## 提交到商店之前

在提交到 App Store 之前，您可能需要披露用户跟踪、跟踪域或收集您应用特有的其他数据类型。有关更多信息，请参阅 [Apple 的文档](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files)。