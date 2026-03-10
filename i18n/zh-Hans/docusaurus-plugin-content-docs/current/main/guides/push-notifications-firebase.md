---
title: 推送通知 - Firebase
description: 了解如何在 Ionic 应用中使 Firebase Cloud Messaging 在 iOS 和 Android 上工作
contributors:
  - bryplano
  - javebratt
  - markemer
slug: /guides/push-notifications-firebase
---

# 在 Ionic + Angular 应用中使用 Firebase 的推送通知

**Web 框架**：Angular
**平台**：iOS、Android

应用开发者为其用户提供的最常见功能之一是推送通知。在本教程中，我们将逐步介绍使 [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) 在 iOS 和 Android 上工作所需的所有步骤。

为了注册和监视来自 Firebase 的推送通知，我们将在 Ionic + Angular 应用中使用 [Capacitor 推送通知 API](https://capacitorjs.com/docs/apis/push-notifications)。

## 必需的依赖项

使用 Capacitor 构建和部署 iOS 和 Android 应用需要一些设置。在继续之前，请[按照此处的说明安装必要的 Capacitor 依赖项](/main/getting-started/environment-setup.md)。

要在 iOS 上测试推送通知，Apple 要求您拥有[付费的 Apple 开发者帐户](https://developer.apple.com/)。

此外，我们使用 Firebase 进行推送通知，因此如果您使用其他使用 Firebase SDK 的 Cordova 插件，请确保它们使用最新版本。

## 准备 Ionic Capacitor 应用

如果您有现有的 Ionic 应用，请跳过此部分。否则，让我们先创建一个 Ionic 应用。

在您首选的终端中，安装最新版本的 Ionic CLI：

```bash
npm install -g @ionic/cli
```

接下来，让我们使用 CLI 创建一个新的基于 **blank** 入门项目的 Ionic Angular 应用，并将其命名为 **capApp**：

```bash
ionic start capApp blank --type=angular
```

成功创建应用后，切换到新创建的项目目录：

```bash
cd capApp/
```

最后，编辑 `capacitor.config.ts` 中的 `appId`。

```diff
const config: CapacitorConfig = {
- appId: 'io.ionic.starter',
+ appId: 'com.mydomain.myappnam',
  appName: 'capApp',
  webDir: 'www'
};
```

## 构建应用和添加平台

在为此项目添加任何原生平台之前，必须至少构建一次应用。Web 构建会创建 Capacitor 需要的 Web 资源目录（Ionic Angular 项目中的 `www` 文件夹）。

```bash
ionic build
```

接下来，让我们向应用添加 iOS 和 Android 平台。

```bash
ionic cap add ios
ionic cap add android
```

运行这些命令后，会在项目根目录创建 `android` 和 `ios` 文件夹。这些是完全独立的原生项目工件，应被视为 Ionic 应用的一部分（即，将它们签入源代码管理）。

## 使用 Capacitor 推送通知 API

首先，我们需要安装 Capacitor 推送通知插件

```bash
npm install @capacitor/push-notifications
npx cap sync
```

然后，在进入 Firebase 之前，我们需要确保我们的应用可以通过使用 Capacitor 推送通知 API 注册推送通知。我们还将添加一个 `alert`（您可以使用 `console.log` 语句代替），以在通知到达并且应用在我们的设备上打开时向我们显示通知的有效负载。

在您的应用中，转到 `home.page.ts` 文件并添加 `import` 语句和 `const` 以使用 Capacitor Push API：

```typescript
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
```

然后，添加 `ngOnInit()` 方法，其中包含一些 API 方法来注册和监视推送通知。我们还将为几个事件添加一个 `alert()` 来监视正在发生的事情：

```typescript
export class HomePage implements OnInit {
  ngOnInit() {
    console.log('Initializing HomePage');

    // 请求使用推送通知的权限
    // iOS 将提示用户并返回是否授予权限
    // Android 将只授予权限而不提示
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // 向 Apple / Google 注册以通过 APNS/FCM 接收推送
        PushNotifications.register();
      } else {
        // 显示一些错误
      }
    });

    // 成功时，我们应该能够接收通知
    PushNotifications.addListener('registration',
      (token: Token) => {
        alert('Push registration success, token: ' + token.value);
      }
    );

    // 我们的设置出现问题，推送将无法工作
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // 如果应用在我们的设备上打开，向我们显示通知有效负载
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // 点击通知时调用的方法
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }
}
```

这是 `home.page.ts` 的完整实现：

```typescript
import { Component, OnInit } from '@angular/core';

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  ngOnInit() {
    console.log('Initializing HomePage');

    // 请求使用推送通知的权限
    // iOS 将提示用户并返回是否授予权限
    // Android 将只授予权限而不提示
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // 向 Apple / Google 注册以通过 APNS/FCM 接收推送
        PushNotifications.register();
      } else {
        // 显示一些错误
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      alert('Push registration success, token: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      },
    );
  }
}
```

在此之后，您需要生成一个新的构建并让 Capacitor 知道这些更改。您可以使用以下命令执行此操作：

```bash
ionic build
npx cap copy
```

## 在 Firebase 上为您的应用创建项目

在我们可以将 Firebase Cloud Messaging 连接到您的应用并发送推送通知之前，您需要在 Firebase 中启动一个项目。

转到 [Firebase 控制台](https://console.firebase.google.com/)并点击 **添加项目** 按钮。

命名项目，接受 Firebase ToS 并点击 **创建项目** 继续。应该会自动为您生成一个项目 ID。

## Android

### 将 Firebase 与 Android 应用集成

本部分几乎镜像了[使用 Firebase 控制台文档设置 Firebase](https://firebase.google.com/docs/android-setup?authuser=0)。有关特定于 Capacitor 的说明，请参见下文。

转到 Firebase 项目的项目概述页面，在顶部点击 **Android** 图标以添加新的 android 应用。

![在 Firebase 控制台中添加新的 Android 应用](/img/v6/docs/guides/firebase-push-notifications/add-android-app.png)

下一个屏幕将要求您提供有关应用的一些信息。

- 您的 **Android 包名称**应与 `capacitor.config.ts` 文件中的 **appId** 匹配
- 我们在此 Capacitor 应用 ID 中使用了 `com.mydomain.myappname`，因此我们将在此条目中使用它。
- 昵称和调试签名证书是可选的

然后点击 **注册应用** 按钮。

### 下载和使用 `google-services.json` 文件

下一个提示将要求您下载 `google-services.json` 文件。此文件包含您的 Capacitor 应用从 Android 连接到 Firebase 所需的信息。

将 `google-services.json` 文件下载到本地计算机。然后将文件移动到您的 Capacitor Android 项目目录中，具体在 `android/app/` 下。

![Android 的 Google Services JSON 位置](/img/v6/docs/guides/firebase-push-notifications/google-services-location-android.png)

我们不需要向项目_添加_任何依赖项，因为 `@capacitor/push-notifications` 自动在其 `build.gradle` 文件中包含 `firebase-messaging` 版本。

## iOS

### 先决条件

iOS 推送通知的设置比 Android 复杂得多。您必须拥有[付费的 Apple 开发者帐户](https://developer.apple.com/)_并且_在能够使用 iOS 应用测试推送通知之前处理以下项目：

1. [为您的 iOS 应用设置适当的开发或生产证书和配置文件](https://help.apple.com/xcode/mac/current/#/dev60b6fbbc7)在 Apple 开发者门户中
2. [创建 APNS 证书或密钥](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/establishing_a_certificate-based_connection_to_apns)用于 Apple 开发者门户中的开发或生产
3. [确保在 Xcode 中的应用中启用了推送通知功能](https://help.apple.com/xcode/mac/current/#/dev88ff319e7)

### 将 Firebase 与我们的原生 iOS 应用集成

这部分与上面的 Android 部分非常相似，但有一些关键区别。

首先，转到 Firebase 项目的 **项目概述** 页面。如果您遵循了本指南，您将在页面顶部看到列出的 Android 应用。

要将 iOS 添加到您的 Firebase 项目，请点击 **添加应用** 按钮并选择 **iOS** 平台。

下一个屏幕将要求您提供有关应用的一些信息。

- 您的 **iOS bundle ID** 应与 `capacitor.config.ts` 文件中的 **appId** 匹配
- 我们在此 Capacitor 应用 ID 中使用了 `com.mydomain.myappname`，因此我们将在此条目中使用它。
- 应用昵称和应用商店 ID 是可选的

然后点击 **注册应用** 按钮。

### 将 `GoogleService-Info.plist` 文件添加到您的 iOS 应用

_注意：这与 Android 应用使用的文件不同。_

将提供的 `GoogleService-Info.plist` 下载到本地计算机。

然后您需要打开 Xcode...

```bash
npx cap open ios
```

...并按照 Firebase 的说明将 `.plist` 文件移动到您的 Xcode 项目中，确保将其添加到所有目标。

![iOS 的 Google Service Info Plist 位置](/img/v6/docs/guides/firebase-push-notifications/google-plist-location-ios.png)


### 添加 Firebase SDK

iOS 上的推送通知 API 使用 Swift Package Manager 或 CocoaPods 进行依赖管理。我们需要告诉它们使用 Firebase。

#### 使用 Swift Package Manager (SPM)

要使用 SPM 添加 SDK，您需要修改 `ios/App/App.xcodeproj`

首先，通过运行 `npx cap open ios` 或双击 finder 中的文件在 Xcode 中打开 `ios/App/App.xcodeproj`。

在左侧选择您的应用，在右侧选择包依赖项，如下所示。

![SPM-FB-Step1](/img/spm/firebase/firebase-spm-step1.png)

然后，选择加号图标添加新包，应该显示类似以下的内容。

![SPM-FB-Step2a](/img/spm/firebase/firebase-spm-step2a.png)

在搜索框中，输入 `https://github.com/firebase/firebase-ios-sdk`，然后选择"添加包"。

![SPM-FB-Step2b](/img/spm/firebase/firebase-spm-step2b.png)

现在滚动并将 Firebase Messaging 添加到应用目标。

![SPM-FB-Step3](/img/spm/firebase/firebase-spm-step3.png)

点击"添加包"，等待处理完成。完成后，您应该看到类似于此图像的内容。

![SPM-FB-Step4](/img/spm/firebase/firebase-spm-step4.png)

#### 使用 CocoaPods

为此，我们需要修改 `Podfile`，可以在 Xcode 中的 `Pods` 下找到：

![iOS Podfile 位置](/img/v6/docs/guides/firebase-push-notifications/podfile-location-ios.png)

我们需要将 Firebase 添加到为应用目标提供的 CocoaPods。为此，将 `pod FirebaseMessaging` 添加到您的 `target 'App'` 部分，如下所示：

```ruby
target 'App' do
  capacitor_pods
  # 在此处添加您的 Pods
  pod 'FirebaseMessaging' # 添加此行
end
```

您的 `Podfile` 应该看起来像这样：

```ruby
require_relative '/main/node_modules/@capacitor/ios/scripts/pods_helpers'

platform :ios, '14.0'
use_frameworks!

# 避免缓存 Pods 的变通方法，需要在安装新的 Cordova 插件后执行
# Product -> Clean Build Folder
# 需要 CocoaPods 1.6 或更新版本
install! 'cocoapods', :disable_input_output_paths => true

def capacitor_pods
  pod 'Capacitor', :path => '/main/node_modules/@capacitor/ios'
  pod 'CapacitorCordova', :path => '/main/node_modules/@capacitor/ios'
  pod 'CapacitorApp', :path => '/main/node_modules/@capacitor/app'
  pod 'CapacitorHaptics', :path => '/main/node_modules/@capacitor/haptics'
  pod 'CapacitorKeyboard', :path => '/main/node_modules/@capacitor/keyboard'
  pod 'CapacitorPushNotifications', :path => '/main/node_modules/@capacitor/push-notifications'
  pod 'CapacitorStatusBar', :path => '/main/node_modules/@capacitor/status-bar'
end

target 'App' do
  capacitor_pods
  # 在此处添加您的 Pods
  pod 'FirebaseMessaging'
end

post_install do |installer|
  assertDeploymentTarget(installer)
end
```

### 更新项目

现在我们需要确保 iOS 项目已更新并安装了正确的 Firebase CocoaPod。

_注意：这部分可能需要一段时间，因为 CocoaPods 需要下载所有相应的文件/依赖项。_

```bash
npx cap update ios
```

### 添加初始化代码

要在 iOS 应用启动时连接到 Firebase，您需要在 `AppDelegate.swift` 文件中添加以下内容。

首先，在文件顶部添加一个 `import`：

```swift
import FirebaseCore
import FirebaseMessaging
```

...然后将 Firebase 的配置方法添加到 `AppDelegate.swift` 文件的初始化代码中，在 `application(didFinishLaunchingWithOptions)` 方法中。

```swift
FirebaseApp.configure()
```

然后您需要添加以下两个方法来正确处理推送注册事件：

```swift
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
  Messaging.messaging().apnsToken = deviceToken
  Messaging.messaging().token(completion: { (token, error) in
    if let error = error {
        NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
    } else if let token = token {
        NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: token)
    }
  })
}

func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
  NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
}
```

完成后的 `AppDelegate.swift` 文件应该看起来像这样：

```swift
import UIKit
import Capacitor
import FirebaseCore
import FirebaseMessaging

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?


  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // 应用启动后的自定义点。
    FirebaseApp.configure()
    return true
  }

  func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
    Messaging.messaging().apnsToken = deviceToken
    Messaging.messaging().token(completion: { (token, error) in
      if let error = error {
          NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
      } else if let token = token {
          NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: token)
      }
    })
  }

  func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
    NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
  }
```

### 将 APNS 证书或密钥上传到 Firebase

如果您从一开始就遵循了说明，您将在 Apple 开发者门户中创建了一个 Apple APNS 证书或 APNS Auth 密钥。您需要将其中之一上传到 Firebase，然后 Firebase 才能与 APNS 通信并向您的应用发送推送通知。

要上传您的证书或身份验证密钥，从 **项目概述** 页面：

1. 点击您的 iOS 应用，然后点击 **设置** 齿轮图标。
2. 在设置页面上，点击 **Cloud Messaging** 选项卡。
3. 在 **iOS 应用配置** 标题下，使用提供的 **上传** 按钮上传您的身份验证密钥或证书。

## 发送测试通知

现在是有趣的部分 - 让我们验证来自 Firebase 的推送通知在 Android 和 iOS 上是否工作！

我们需要在 Android 或 iOS 上启动我们的应用，以便我们的 `home.page.ts` 页面可以注册和接收通知。

要在 Android Studio 中打开 Android 项目：

```bash
npx cap open android
```

要在 Xcode 中打开 iOS 项目：

```bash
npx cap open ios
```

打开项目后，使用 Android Studio 或 Xcode 的运行功能在设备上侧载应用。应用应该在主页上启动。

_注意：在 iOS 上，您将看到一个弹出窗口，要求您允许应用的通知 - 请确保选择 **允许通知**！_

如果您的应用成功注册并且您遵循了上面的代码，您应该会看到带有成功消息的警报！

现在让我们测试通知是否被我们的设备接收。要发送通知，请在 Firebase 中转到项目窗格中 Grow 标题下的 **Cloud Messaging** 部分。

接下来，选择 **新通知** 按钮。

创建通知时，您只需要指定以下信息：

1. 通知的文本
2. 标题（仅限 Android，iOS 可选）
3. 目标（用户细分或主题；我建议仅针对 iOS 或 Android 应用本身，见下文）

![更改推送目标 Firebase](/img/v6/docs/guides/firebase-push-notifications/change-push-target-firebase.png)

4. 计划（将此保留为"现在"）

此时，您可以 **审阅** 您组合的通知并选择 **发布** 来发送通知。

如果您正确设置了应用，您将在主屏幕上看到弹出警报，其中包含您在 Firebase 中组合的推送通知。然后您可以点击通知，根据我们上面的代码，您应该会收到 `pushActionPerformed` 事件的 `alert`。

![Android 推送测试](/img/v6/docs/guides/firebase-push-notifications/push-test-android.png)

![iOS 推送测试](/img/v6/docs/guides/firebase-push-notifications/push-test-ios.png)

## 推送通知中的图像

您可以选择通过遵循以下指南将图像作为推送通知的一部分包含在内。

:::tip
Firebase Messaging SDK 可以在其有效负载中包含 `ImageUrl` 属性并将其显示。URL 必须是 `https://` 并且大小小于 300kb。
:::

### Android 中的图像

使用 `@capacitor/push-notifications` 时，Android 将自动显示图像。如果您在 [Firebase 控制台](https://console.firebase.google.com/)中通过设置 `通知图像` 进行测试，推送通知将在 Android 设备上显示，类似于下面的屏幕截图：

![带有图像的 Android 推送通知](/img/v6/docs/guides/firebase-push-notifications/android-push-image.jpeg)

### iOS 中的图像

iOS 需要将 [通知服务扩展](https://developer.apple.com/documentation/usernotifications/unnotificationserviceextension)添加到您的项目中，以便在推送通知中显示图像。

在 XCode 中：
- 点击 `File` > `New` > `Target`
- 选择 `Notification Service Extension` 并点击 `Next`
- 输入 `Product Name`（例如 `pushextension`）
- 选择您的团队
- 点击 `Finish`
- 被询问时点击 `Activate`

从目标列表中选择 `pushextension`，然后：
- 点击 `Signing & Capabilities`
- 点击 `+ Capability`
- 选择 `Push Notifications`
- 将部署目标从 `iOS 16.4`（或 Xcode 选择的任何版本）更改为 `iOS 15.0`

:::note
如果您不更改扩展的部署目标，那么图像将不会出现在旧版本 iOS 的设备上。
:::

要将 Firebase Messaging 添加到扩展：

使用 SPM：
- 选择 `pushextension` 目标
- 在 `General`、`Frameworks and Libraries` 下，点击"添加项目"按钮
- 添加 `FirebaseMessaging`

使用 CocoaPods：
打开您的 `Podfile` 并添加：
```ruby
target 'pushextension' do
  pod 'FirebaseMessaging'
end
```

然后通过运行更新 Cocoapods：
```bash
npx cap update ios
```

现在打开 `NotificationService.swift`（它将在名为 `pushextension` 的文件夹中）并将其内容替换为以下内容：

```swift
import UserNotifications
import FirebaseMessaging

class NotificationService: UNNotificationServiceExtension {
    var contentHandler: ((UNNotificationContent) -> Void)?
    var bestAttemptContent: UNMutableNotificationContent?

    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
        guard let content = request.content.mutableCopy() as? UNMutableNotificationContent else { return }
        self.contentHandler = contentHandler
        self.bestAttemptContent = content

        FIRMessagingExtensionHelper().populateNotificationContent(content, withContentHandler: contentHandler)
    }

    override func serviceExtensionTimeWillExpire() {
        guard let contentHandler = contentHandler,
              let bestAttemptContent =  bestAttemptContent else { return }

        contentHandler(bestAttemptContent)
    }
}
```

您现在应该从 [Firebase 控制台](https://console.firebase.google.com/)测试推送通知，记住要设置 `通知图像` 并选择您的 iOS 应用。当它到达 iOS 设备时，它将显示在右侧，如下所示：

![带有图像的 iOS 推送通知](/img/v6/docs/guides/firebase-push-notifications/ios-push-image.jpeg)
