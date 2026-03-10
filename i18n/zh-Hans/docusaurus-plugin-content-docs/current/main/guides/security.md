---
title: 安全性
description: Capacitor 应用的安全最佳实践
contributors:
  - mlynch
slug: /guides/security
---

# Capacitor 的安全最佳实践

每个 Capacitor 开发者都有责任确保其应用遵循安全最佳实践。如果没有适当的注意，可能会出现重大的安全问题，这可能会造成极大的损害和昂贵的代价。

安全是一个广泛的话题，但 Capacitor 开发者应该审计许多领域以确保安全合规，包括数据、身份验证/深度链接、网络和 Web View 安全性。

> Ionic 为 Capacitor 应用提供开箱即用的安全套件，包括身份验证、生物识别和加密。[了解更多](https://ionic.io/secure)。

## 数据安全

数据安全涉及本地存储的数据以及应用代码中的数据的安全性。

### 避免在代码中嵌入密钥

对于 Capacitor 应用以及任何前端应用来说，最重要的安全提示之一是_永远不要在应用代码中嵌入密钥_。这意味着确保您的代码永远不包含秘密 API 密钥、加密密钥或任何其他敏感数据，这些数据可能会使用基本的应用分析技术轻易被盗。请注意环境变量插件，这些插件可能会在构建时将敏感值注入到您的应用代码中。

相反，将大多数需要秘密密钥或令牌的操作移到服务器端，在那里它们可以得到保护，并且任何请求都可以从服务器转发。这可能是无服务器函数或传统的服务器端应用进程。

对于必须与客户端上持久化的敏感密钥或令牌一起工作的应用，例如身份验证令牌或加密密钥，建议的选项是仅在内存中处理该值（即，永远不要将其持久化到磁盘），或者使用下面详述的安全密钥链/密钥库技术。

### 存储加密密钥、会话令牌等

现代移动设备和操作系统提供强大的安全 API 和专用的安全硬件，用于在设备上存储敏感值。应用就是这样提供生物识别或安全密码身份验证，同时管理高度敏感的值（如加密密钥或会话令牌）的。

提供此功能的 API 在 [iOS Keychain Services](https://developer.apple.com/documentation/security/keychain_services) 和 [Android Keystore](https://developer.android.com/training/articles/keystore) API 中可用。这些 API 复杂且底层，因此您可能希望找到使用它们的插件（例如 [cordova-plugin-ios-keychain](https://github.com/ionic-team/cordova-plugin-ios-keychain) 社区插件）。

对于企业用例，Capacitor 团队提供 [Identity Vault](https://ionicframework.com/enterprise/identity-vault)，它在这些原生安全 API 之上提供易于使用的 API 和经常更新的体验。Identity Vault 可以与其他 Capacitor 企业产品（如 [离线存储](https://ionicframework.com/enterprise/offline-storage)和 [Auth Connect](https://ionicframework.com/enterprise/auth-connect)）一起使用，以分别提供每种体验的加密密钥或身份验证令牌管理组件。

## 身份验证和深度链接

原生应用中的身份验证流程需要特别小心，因为身份验证通常通过使用自定义 URL 方案进行。自定义 URL 方案（如 `instagram://`）不像 Web 域那样受到全局控制，因此恶意应用可以通过定义和覆盖自定义 URL 方案来拦截针对一个应用的请求。想象一下将安全令牌发送到错误的应用！

通常，应用绝不应通过自定义 URL 方案深度链接发送敏感数据（较新的技术（如通用链接）更安全，因为它们依赖于实际的 Web 域所有权，有关详细信息，请参阅 [深度链接](./deep-links) 指南）。

这对于 oAuth2 流程尤其重要，其中身份验证体验的最后一步依赖于返回应用的深度链接。为了减轻恶意应用接收令牌的可能性，必须在 Capacitor 应用中使用 [PKCE](https://oauth.net/2/pkce/) 进行 oAuth2。

要确保您的 oAuth2 流程安全，请确保您的插件支持 PKCE。对于企业用例，官方的 [Auth Connect](https://ionicframework.com/enterprise/auth-connect) Capacitor 解决方案完全支持 oAuth2 身份验证流程的 PKCE。

请参阅这个很棒的 [原生应用 oAuth2 最佳实践](https://auth0.com/blog/oauth-2-best-practices-for-native-apps/) 指南以获取更多信息。

## 网络安全

网络安全涉及确保网络请求到受信任的端点并进行加密，以避免以纯文本形式发送敏感数据（如密码）。

### SSL

应用应该只向启用 SSL 的端点发出请求。这意味着永远不要向带有 `http://` 的端点发出请求，而应该始终使用 `https://`。这确保数据永远不会以纯文本形式发送。

## Web View 安全性

### 内容安全策略

[内容安全策略 (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 是浏览器中可用的一组安全功能（因此，您的 Capacitor Web View 也是如此）。CSP 可用于限制用户代理允许在 Web View 中加载的资源（例如图像、XHR、视频、Web 套接字等）。

可以通过将 `meta` 标签添加到 `<head>` 并使用可接受的 CSP 格式来在 Capacitor 应用中配置 CSP（可以使用相同的格式在服务器端和客户端配置 CSP）。例如，此配置将允许对当前源和 `foo.com` 的所有请求：

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self' foo.com"
/>
```

CSP 支持各种配置，[CSP 参考](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 是必读的。另一个有用的资源是 [content-security-policy.com](https://content-security-policy.com/)。

### JavaScript 安全技术

由于 Capacitor 应用的大部分是使用 JavaScript 的 Web 应用，因此典型的 JS 安全技术适用。

JS 安全性超出了本文档的范围，并且有许多现有资源可用于正确的 JS 和 Web 应用安全技术。[这是一个很好的资源](https://wpengine.com/resources/javascript-security/)可以帮助您入门。
