---
title: Capacitor Configuration
description: Configuring Capacitor
sidebar_label: Config
slug: /config
---

# Capacitor 配置

Capacitor 配置文件用于设置 Capacitor 工具的高级选项。

## 示例

这是一个示例 `capacitor.config.ts` 文件：

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.company.appname',
  appName: 'My Capacitor App',
  webDir: 'www',
};

export default config;
```

如果你的项目中没有使用 TypeScript，你可以以相同的方式使用 `capacitor.config.json` 文件。

## Schema {#schema}

这是 Capacitor 配置的 TypeScript 接口，包含完整的描述和默认值。

```typescript
export interface CapacitorConfig {
  /**
   * 你打包应用的唯一标识符。
   *
   * 这在 iOS 中称为 Bundle ID，在 Android 中称为 Application ID。
   * 它必须采用反向域名表示法，通常表示你或你的公司拥有的域名。
   *
   * @since 1.0.0
   */
  appId?: string;

  /**
   * 你应用的人类可读名称。
   *
   * 这应该是你在 App Store 中看到的名称，但可以在生成后的每个
   * 原生平台中更改。
   *
   * @since 1.0.0
   */
  appName?: string;

  /**
   * 编译后的 web 资源目录。
   *
   * 该目录应包含应用的最终 `index.html`。
   *
   * @since 1.0.0
   */
  webDir?: string;

  /**
   * Capacitor 将向日志系统发送语句的构建配置（由原生应用定义）。
   * 这适用于原生代码中的日志语句以及从 JavaScript 重定向的语句
   * （`console.debug`、`console.error` 等）。
   * 启用日志记录将使语句在 Xcode 和 Android Studio 窗口中呈现，
   * 但如果在发布版本中启用，可能会在设备上泄露信息。
   *
   * 'none' = 永不生成日志
   * 'debug' = 在调试版本中生成日志，但不在生产版本中生成
   * 'production' = 始终生成日志
   *
   * @since 3.0.0
   * @default debug
   */
  loggingBehavior?: 'none' | 'debug' | 'production';

  /**
   * Capacitor Web View 的用户代理。
   *
   * @since 1.4.0
   */
  overrideUserAgent?: string;

  /**
   * 附加到 Capacitor Web View 原始用户代理的字符串。
   *
   * 如果使用 `overrideUserAgent`，则此项将被忽略。
   *
   * @since 1.4.0
   */
  appendUserAgent?: string;

  /**
   * Capacitor Web View 的背景颜色。
   *
   * @since 1.1.0
   */
  backgroundColor?: string;

  /**
   * 在 Capacitor Web View 中启用缩放。
   *
   * @default false
   * @since 6.0.0
   */
  zoomEnabled?: boolean;

  /**
   * 是否为 webview 提供初始焦点。
   *
   * @since 7.0.0
   * @default true
   */
  initialFocus?: boolean;

  android?: {
    /**
     * 指定原生 Android 项目的自定义路径。
     *
     * @since 3.0.0
     * @default android
     */
    path?: string;

    /**
     * Android 上 Capacitor Web View 的用户代理。
     *
     * 覆盖全局 `overrideUserAgent` 选项。
     *
     * @since 1.4.0
     */
    overrideUserAgent?: string;

    /**
     * 附加到 Android 上 Capacitor Web View 原始用户代理的字符串。
     *
     * 覆盖全局 `appendUserAgent` 选项。
     *
     * 如果使用 `overrideUserAgent`，则此项将被忽略。
     *
     * @since 1.4.0
     */
    appendUserAgent?: string;

    /**
     * Android 上 Capacitor Web View 的背景颜色。
     *
     * 覆盖全局 `backgroundColor` 选项。
     *
     * @since 1.1.0
     */
    backgroundColor?: string;

    /**
     * 在 Android 上的 Capacitor Web View 中启用缩放。
     *
     * @default false
     * @since 6.0.0
     */
    zoomEnabled?: boolean;

    /**
     * 在 Android 上的 Capacitor Web View 中启用混合内容。
     *
     * 默认情况下，出于安全原因，[混合
     * 内容](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)
     * 被禁用。在开发期间，你可能需要启用它以允许 Web View 从不同方案加载文件。
     *
     * **这不适合在生产环境中使用。**
     *
     * @since 1.0.0
     * @default false
     */
    allowMixedContent?: boolean;

    /**
     * 这启用了一个更简单的键盘，可能有一些限制。
     *
     * 这将使用替代的
     * [`InputConnection`](https://developer.android.com/reference/android/view/inputmethod/InputConnection)
     * 捕获 JS 键。
     *
     * @since 1.0.0
     * @default false
     */
    captureInput?: boolean;

    /**
     * 始终启用可调试的 web 内容。
     *
     * 这在开发期间自动启用。
     *
     * @since 1.0.0
     * @default false
     */
    webContentsDebuggingEnabled?: boolean;

    /**
     * Capacitor 在 Android 上生成日志的构建配置。
     *
     * 覆盖全局 `loggingBehavior` 选项。
     *
     * @since 3.0.0
     * @default debug
     */
    loggingBehavior?: 'none' | 'debug' | 'production';

    /**
     * 在 Android 的 `npx cap sync` 期间要包含的插件允许列表。
     *
     * 覆盖全局 `includePlugins` 选项。
     *
     * @since 3.0.0
     */
    includePlugins?: string[];

    /**
     * 要使用的 Android flavor。
     *
     * 如果应用在 `build.gradle` 中声明了 flavor，
     * 配置你想要使用 `npx cap run` 命令运行的 flavor。
     *
     * @since 3.1.0
     */
    flavor?: string;

    /**
     * 是否为 webview 提供初始焦点。
     *
     * 覆盖全局 `initialFocus` 选项。
     *
     * @since 3.5.1
     * @default true
     */
    initialFocus?: boolean;

    /**
     * 你的应用在 Android 上支持的最低 webview 版本。
     *
     * 支持的最低版本不能低于 Capacitor 所需的版本 `55`。
     *
     * 如果设备使用较低的 WebView 版本，将在 Logcat 中显示错误消息。
     * 如果配置了 `server.errorPath`，WebView 将重定向到该文件，
     * 因此可用于显示自定义错误。
     *
     * @since 4.0.0
     * @default 60
     */
    minWebViewVersion?: number;

    /**
     * 你的应用在 Android 上支持的最低华为 webview 版本。
     *
     * 支持的最低版本不能低于 Capacitor 所需的版本 `10`。
     *
     * 如果设备使用较低的 WebView 版本，将在 Logcat 中显示错误消息。
     * 如果配置了 `server.errorPath`，WebView 将重定向到该文件，
     * 因此可用于显示自定义错误。
     *
     * @since 4.6.4
     * @default 10
     */
    minHuaweiWebViewVersion?: number;

    buildOptions?: {
      /**
       * 密钥库路径
       *
       * @since 4.4.0
       */
      keystorePath?: string;

      /**
       * 密钥库密码
       *
       * @since 4.4.0
       */
      keystorePassword?: string;

      /**
       * 要使用的密钥库中的别名
       *
       * @since 4.4.0
       */
      keystoreAlias?: string;

      /**
       * 要使用的密钥库中别名的密码
       *
       * @since 4.4.0
       */
      keystoreAliasPassword?: string;

      /**
       * 发布版本的捆绑类型
       *
       * @since 4.4.0
       * @default "AAB"
       */
      releaseType?: 'AAB' | 'APK';

      /**
       * 用于签名的程序
       *
       * @since 5.1.0
       * @default "jarsigner"
       */
      signingType?: 'apksigner' | 'jarsigner';
    };

    /**
     * 使用旧的 [addJavascriptInterface](https://developer.android.com/reference/android/webkit/WebView#addJavascriptInterface(java.lang.Object,%20java.lang.String))
     * 而不是新的更安全的 [addWebMessageListener](https://developer.android.com/reference/androidx/webkit/WebViewCompat#addWebMessageListener(android.webkit.WebView,java.lang.String,java.util.Set%3Cjava.lang.String%3E,androidx.webkit.WebViewCompat.WebMessageListener))
     *
     * @since 4.5.0
     * @default false
     */
    useLegacyBridge?: boolean;

    /**
     * 使 service worker 请求通过 Capacitor 桥接。
     * 设置为 false 以使用你自己的处理。
     *
     * @since 7.0.0
     * @default true
     */
    resolveServiceWorkerRequests?: boolean;
  };

  ios?: {
    /**
     * 指定原生 iOS 项目的自定义路径。
     *
     * @since 3.0.0
     * @default ios
     */
    path?: string;

    /**
     * 要使用的 iOS 构建方案。
     *
     * 通常这与你应用在 Xcode 中的 target 匹配。你可以使用以下
     * 命令列出方案：
     *
     * ```shell
     * xcodebuild -workspace ios/App/App.xcworkspace -list
     * ```
     *
     * @since 3.0.0
     * @default App
     */
    scheme?: string;

    /**
     * iOS 上 Capacitor Web View 的用户代理。
     *
     * 覆盖全局 `overrideUserAgent` 选项。
     *
     * @since 1.4.0
     */
    overrideUserAgent?: string;

    /**
     * 附加到 iOS 上 Capacitor Web View 原始用户代理的字符串。
     *
     * 覆盖全局 `appendUserAgent` 选项。
     *
     * 如果使用 `overrideUserAgent`，则此项将被忽略。
     *
     * @since 1.4.0
     */
    appendUserAgent?: string;

    /**
     * iOS 上 Capacitor Web View 的背景颜色。
     *
     * 覆盖全局 `backgroundColor` 选项。
     *
     * @since 1.1.0
     */
    backgroundColor?: string;

    /**
     * 在 iOS 上的 Capacitor Web View 中启用缩放。
     *
     * @default false
     * @since 6.0.0
     */
    zoomEnabled?: boolean;

    /**
     * 配置滚动视图的内容插入调整行为。
     *
     * 这将设置 Web View 的
     * [`UIScrollView`](https://developer.apple.com/documentation/uikit/uiscrollview)
     * 上的
     * [`contentInsetAdjustmentBehavior`](https://developer.apple.com/documentation/uikit/uiscrollview/2902261-contentinsetadjustmentbehavior)
     * 属性。
     *
     * @since 2.0.0
     * @default never
     */
    contentInset?: 'automatic' | 'scrollableAxes' | 'never' | 'always';

    /**
     * 配置滚动视图是否可滚动。
     *
     * 这将设置 Web View 的
     * [`UIScrollView`](https://developer.apple.com/documentation/uikit/uiscrollview)
     * 上的
     * [`isScrollEnabled`](https://developer.apple.com/documentation/uikit/uiscrollview/1619395-isscrollenabled)
     * 属性。
     *
     * @since 1.0.0
     */
    scrollEnabled?: boolean;

    /**
     * 配置用于编译 Cordova 插件的自定义链接器标志。
     *
     * @since 1.0.0
     * @default []
     */
    cordovaLinkerFlags?: string[];

    /**
     * 按下链接时允许目标预览。
     *
     * 这将在 Web View 上设置
     * [`allowsLinkPreview`](https://developer.apple.com/documentation/webkit/wkwebview/1415000-allowslinkpreview)
     * 属性，而不是使用默认值。
     *
     * @since 2.0.0
     */
    allowsLinkPreview?: boolean;

    /**
     * Capacitor 在 iOS 上生成日志的构建配置。
     *
     * 覆盖全局 `loggingBehavior` 选项。
     *
     * @since 3.0.0
     * @default debug
     */
    loggingBehavior?: 'none' | 'debug' | 'production';

    /**
     * 在 iOS 的 `npx cap sync` 期间要包含的插件允许列表。
     *
     * 覆盖全局 `includePlugins` 选项。
     *
     * @since 3.0.0
     */
    includePlugins?: string[];

    /**
     * 为 limitsNavigationsToAppBoundDomains 设置 WKWebView 配置。
     *
     * 如果 Info.plist 文件包含 `WKAppBoundDomains` 键，
     * 建议将此选项设置为 true，否则某些功能将无法工作。
     * 但作为副作用，它会阻止导航到 `WKAppBoundDomains` 列表之外的域。
     * `localhost`（或配置为 `server.hostname` 的值）也需要添加到
     * `WKAppBoundDomains` 列表中。
     *
     * @since 3.1.0
     * @default false
     */
    limitsNavigationsToAppBoundDomains?: boolean;

    /**
     * Web View 在加载和渲染 web 内容时使用的内容模式。
     *
     * - 'recommended'：适合当前设备的内容模式。
     * - 'desktop'：表示桌面体验的内容模式。
     * - 'mobile'：表示移动体验的内容模式。
     *
     * @since 4.0.0
     * @default recommended
     */
    preferredContentMode?: 'recommended' | 'desktop' | 'mobile';

    /**
     * 配置 Capacitor 是否处理本地/推送通知。
     * 如果你想使用自己的 UNUserNotificationCenter 来处理通知，请设置为 false。
     *
     * @since 4.5.0
     * @default true
     */
    handleApplicationNotifications?: boolean;

    /**
     * 使用 Xcode 14.3，在 iOS 16.4 及更高版本上，为发布版本启用可调试的 web 内容。
     *
     * 如果未设置，则对于开发版本为 `true`。
     *
     * @since 4.8.0
     * @default false
     */
    webContentsDebuggingEnabled?: boolean;

    /**
     * 是否为 webview 提供初始焦点。
     *
     * 覆盖全局 `initialFocus` 选项。
     *
     * @since 7.0.0
     * @default true
     */
    initialFocus?: boolean;

    buildOptions?: {
      /**
       * 构建应用以进行分发时要使用的签名样式。
       *
       * @since 7.1.0
       * @default 'automatic'
       */
      signingStyle?: 'automatic' | 'manual';
      /**
       * xcodebuild 用于导出归档的方法
       *
       * @since 7.1.0
       * @default 'app-store-connect'
       */
      exportMethod?: string;
      /**
       * 用于 iOS 版本签名的证书名称、SHA-1 哈希或自动选择器。
       *
       * @since 7.1.0
       */
      signingCertificate?: string;
      /**
       * iOS 版本的配置文件名称或 UUID。
       *
       * @since 7.1.0
       */
      provisioningProfile?: string;
    };
  };

  server?: {
    /**
     * 配置设备的本地主机名。
     *
     * 建议保持为 `localhost`，因为它允许使用否则需要[安全
     * 上下文](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts)
     * 的 Web API，例如
     * [`navigator.geolocation`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation)
     * 和
     * [`MediaDevices.getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)。
     *
     * @since 1.0.0
     * @default localhost
     */
    hostname?: string;

    /**
     * 配置 iOS 上的本地方案。
     *
     * [不能设置为 WKWebView 已经处理的方案，如 http 或 https](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration/2875766-seturlschemehandler)
     * 从 [`cordova-plugin-ionic-webview`](https://github.com/ionic-team/cordova-plugin-ionic-webview)
     * 迁移时很有用，其中 iOS 上的默认方案是 `ionic`。
     *
     * @since 1.2.0
     * @default capacitor
     */
    iosScheme?: string;

    /**
     * 配置 Android 上的本地方案。
     *
     * 从 Webview 117 开始，Android 上的自定义方案无法更改 URL 路径。
     * 将此值更改为 `http` 或 `https` 以外的任何值可能导致你的应用无法解析路由。
     * 如果出于某种原因必须更改此项，请考虑使用基于哈希的 url 策略，
     * 但不保证这会长期有效，因为允许非标准方案修改查询参数和 url 片段
     * 只是出于兼容性原因而被允许。
     * https://ionic.io/blog/capacitor-android-customscheme-issue-with-chrome-117
     *
     * @since 1.2.0
     * @default https
     */
    androidScheme?: string;

    /**
     * 在 Web View 中加载外部 URL。
     *
     * 这适用于 live-reload 服务器。
     *
     * **这不适合在生产环境中使用。**
     *
     * @since 1.0.0
     */
    url?: string;

    /**
     * 在 Web View 中允许明文流量。
     *
     * 在 Android 上，从 API 28 开始，默认情况下禁用所有明文流量。
     *
     * 这适用于 live-reload 服务器，通常使用未加密的 HTTP 流量。
     *
     * **这不适合在生产环境中使用。**
     *
     * @since 1.5.0
     * @default false
     */
    cleartext?: boolean;

    /**
     * 设置 Web View 可以导航到的其他 URL。
     *
     * 默认情况下，所有外部 URL 都在外部浏览器（而不是 Web View）中打开。
     *
     * **这不适合在生产环境中使用。**
     *
     * @since 1.0.0
     * @default []
     */
    allowNavigation?: string[];

    /**
     * 指定在出错情况下要显示的本地 html 页面的路径。
     * 在 Android 上，html 文件将无法访问 Capacitor 插件。
     *
     * @since 4.0.0
     * @default null
     */
    errorPath?: string;

    /**
     * 将路径附加到应用 URL。
     *
     * 允许从默认 `/index.html` 以外的路径加载。
     * @since 7.3.0
     * @default null
     */
    appStartPath?: string;
  };

  cordova?: {
    /**
     * 使用在此处输入的值填充 config.xml 中的 <access> 标签的 origin。
     * 如果未提供，将包含一个 <access origin="*" /> 标签。
     * 它只对少数尊重白名单的 Cordova 插件有效。
     *
     * @since 3.3.0
     */
    accessOrigins?: string[];

    /**
     * 配置 Cordova 偏好设置。
     *
     * @since 1.3.0
     */
    preferences?: { [key: string]: string | undefined };

    /**
     * 如果 CLI 检测到 cordova 插件有未安装的依赖项，
     * 则在 cap update/sync 时失败。
     *
     * @default false
     * @since 7.4.0
     */
    failOnUninstalledPlugins?: boolean;
  };

  /**
   * 配置插件。
   *
   * 这是一个按插件类名指定配置值的对象。
   *
   * @since 1.0.0
   */
  plugins?: PluginsConfig;

  /**
   * 在 `npx cap sync` 期间要包含的插件允许列表。
   *
   * 这应该是一个字符串数组，表示运行 `npx cap sync` 时要包含的
   * 插件的 npm 包名称。如果未设置，Capacitor 将检查 `package.json`
   * 以获取潜在插件列表。
   *
   * @since 3.0.0
   */
  includePlugins?: string[];
}

export interface PluginsConfig {
  /**
   * 按类名的插件配置。
   *
   * @since 1.0.0
   */
  [key: string]:
    | {
        [key: string]: any;
      }
    | undefined;

  /**
   * Capacitor Cookies 插件配置
   *
   * @since 4.3.0
   */
  CapacitorCookies?: {
    /**
     * 启用 CapacitorCookies 以在原生环境覆盖全局 `document.cookie`。
     *
     * @default false
     */
    enabled?: boolean;
  };

  /**
   * Capacitor Http 插件配置
   *
   * @since 4.3.0
   */
  CapacitorHttp?: {
    /**
     * 启用 CapacitorHttp 以在原生环境覆盖全局 `fetch` 和 `XMLHttpRequest`。
     *
     * @default false
     */
    enabled?: boolean;
  };

  /**
   * System Bars 插件配置
   *
   * @since 8.0.0
   */
  SystemBars?: {
    /**
     * 指定如何处理 Android 上有问题的 insets。
     *
     * 此选项仅在 Android 上受支持。
     *
     * `css` = 将包含正确安全区域 inset 值的 CSS 变量（`--safe-area-inset-*`）
     * 注入到 webview 中。
     *
     * `disable` = 禁用所有 inset 处理。
     *
     * @default "css"
     */
    insetsHandling?: 'css' | 'disable';
    /**
     * 系统栏的文本和图标样式。
     *
     * 此选项仅在 Android 上受支持。
     *
     * @default `DEFAULT`
     */
    style?: string;

    /**
     * 在启动时隐藏系统栏。
     *
     * @default false
     */
    hidden?: boolean;

    /**
     * 显示或隐藏时使用的状态栏动画类型。
     *
     * 此选项仅在 iOS 上受支持。
     *
     * @default 'FADE'
     *
     */
    animation?: 'FADE' | 'NONE';
  };
}
```

## 环境变量

Capacitor CLI 将自动在你的系统上查找依赖项。如果你需要配置这些路径，可以使用以下环境变量：

- `CAPACITOR_ANDROID_STUDIO_PATH`：系统上 Android Studio 可执行文件的路径。
- `CAPACITOR_COCOAPODS_PATH`：系统上 `pod` 二进制文件的路径。
