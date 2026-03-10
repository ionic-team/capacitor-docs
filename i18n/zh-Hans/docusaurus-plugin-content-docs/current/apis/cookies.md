---
title: Cookies Capacitor 插件 API
description: Capacitor Cookies API 通过修补 `document.cookie` 以使用原生库来提供原生 Cookie 支持。
custom_edit_url: https://github.com/ionic-team/capacitor/blob/main/core/cookies.md
editApiUrl: https://github.com/ionic-team/capacitor/blob/main/core/src/core-plugins.ts
sidebar_label: Cookies
---

# CapacitorCookies

Capacitor Cookies API 通过修补 `document.cookie` 以使用原生库来提供原生 Cookie 支持。它还提供了在特定 URL 上修改 Cookie 的方法。此插件与 `@capacitor/core` 捆绑在一起。

## 配置

默认情况下,修补 `document.cookie` 以使用原生库的功能是禁用的。
如果您想启用此功能,请在 `capacitor.config` 文件中修改以下配置。

| 属性          | 类型                 | 描述                                                               | 默认值            |
| ------------- | -------------------- | ------------------------------------------------------------------------- | ------------------ |
| **`enabled`** | <code>boolean</code> | 启用修补 `document.cookie` 以使用原生库。 | <code>false</code> |

### 示例配置

在 `capacitor.config.json` 中:

```json
{
  "plugins": {
    "CapacitorCookies": {
      "enabled": true
    }
  }
}
```

在 `capacitor.config.ts` 中:

```ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
  },
};

export default config;
```

## 示例

```typescript
import { CapacitorCookies } from '@capacitor/core';

const getCookies = () => {
  return document.cookie;
};

const setCookie = () => {
  document.cookie = key + '=' + value;
};

const setCapacitorCookie = async () => {
  await CapacitorCookies.setCookie({
    url: 'http://example.com',
    key: 'language',
    value: 'en',
  });
};

const deleteCookie = async () => {
  await CapacitorCookies.deleteCookie({
    url: 'https://example.com',
    key: 'language',
  });
};

const clearCookiesOnUrl = async () => {
  await CapacitorCookies.clearCookies({
    url: 'https://example.com',
  });
};

const clearAllCookies = async () => {
  await CapacitorCookies.clearAllCookies();
};
```

## iOS 上的第三方 Cookie

从 iOS 14 开始,默认情况下您无法使用第三方 Cookie。将以下行添加到您的 Info.plist 文件以在 iOS 上获得更好的 Cookie 支持。您可以添加最多 10 个域。

```xml
<key>WKAppBoundDomains</key>
<array>
  <string>www.mydomain.com</string>
  <string>api.mydomain.com</string>
  <string>www.myothercooldomain.com</string>
</array>
```

## API

<docgen-index>

* [`getCookies(...)`](#getcookies)
* [`setCookie(...)`](#setcookie)
* [`deleteCookie(...)`](#deletecookie)
* [`clearCookies(...)`](#clearcookies)
* [`clearAllCookies()`](#clearallcookies)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--更新源文件 JSDoc 注释并重新运行 docgen 以更新下面的文档-->

### getCookies(...)

```typescript
getCookies(options?: GetCookieOptions) => Promise<HttpCookieMap>
```

| 参数         | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#getcookieoptions">GetCookieOptions</a></code> |

**返回:** <code>Promise&lt;<a href="#httpcookiemap">HttpCookieMap</a>&gt;</code>

--------------------


### setCookie(...)

```typescript
setCookie(options: SetCookieOptions) => Promise<void>
```

将 Cookie 写入设备。

| 参数         | 类型                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#setcookieoptions">SetCookieOptions</a></code> |


--------------------


### deleteCookie(...)

```typescript
deleteCookie(options: DeleteCookieOptions) => Promise<void>
```

从设备中删除 Cookie。

| 参数         | 类型                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#deletecookieoptions">DeleteCookieOptions</a></code> |


--------------------


### clearCookies(...)

```typescript
clearCookies(options: ClearCookieOptions) => Promise<void>
```

从给定 URL 的设备中清除 Cookie。

| 参数         | 类型                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#clearcookieoptions">ClearCookieOptions</a></code> |


--------------------


### clearAllCookies()

```typescript
clearAllCookies() => Promise<void>
```

清除设备上的所有 Cookie。

--------------------


### Interfaces


#### HttpCookieMap


#### HttpCookie

| 属性        | 类型                | 描述              |
| ----------- | ------------------- | ------------------------ |
| **`url`**   | <code>string</code> | Cookie 的 URL。   |
| **`key`**   | <code>string</code> | Cookie 的键。   |
| **`value`** | <code>string</code> | Cookie 的值。 |


#### HttpCookieExtras

| 属性          | 类型                | 描述                      |
| ------------- | ------------------- | -------------------------------- |
| **`path`**    | <code>string</code> | 写入 Cookie 的路径。 |
| **`expires`** | <code>string</code> | Cookie 的过期日期。   |


### Type Aliases


#### GetCookieOptions

<code><a href="#omit">Omit</a>&lt;<a href="#httpcookie">HttpCookie</a>, 'key' | 'value'&gt;</code>


#### Omit

构造一个类型,该类型包含 T 的属性,但不包含 K 类型的属性。

<code><a href="#pick">Pick</a>&lt;T, <a href="#exclude">Exclude</a>&lt;keyof T, K&gt;&gt;</code>


#### Pick

从 T 中选择一组键在联合 K 中的属性

<code>{ [P in K]: T[P]; }</code>


#### Exclude

从 T 中排除可分配给 U 的类型

<code>T extends U ? never : T</code>


#### SetCookieOptions

<code><a href="#httpcookie">HttpCookie</a> & <a href="#httpcookieextras">HttpCookieExtras</a></code>


#### DeleteCookieOptions

<code><a href="#omit">Omit</a>&lt;<a href="#httpcookie">HttpCookie</a>, 'value'&gt;</code>


#### ClearCookieOptions

<code><a href="#omit">Omit</a>&lt;<a href="#httpcookie">HttpCookie</a>, 'key' | 'value'&gt;</code>

</docgen-api>
