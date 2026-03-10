---
title: HTTP Capacitor 插件 API
description: Capacitor Http API 通过修补 `fetch` 和 `XMLHttpRequest` 以使用原生库来提供原生 http 支持。
custom_edit_url: https://github.com/ionic-team/capacitor/blob/main/core/http.md
editApiUrl: https://github.com/ionic-team/capacitor/blob/main/core/src/core-plugins.ts
sidebar_label: HTTP
---

# CapacitorHttp

Capacitor Http API 通过修补 `fetch` 和 `XMLHttpRequest` 以使用原生库来提供原生 http 支持。它还提供了不使用 `fetch` 和 `XMLHttpRequest` 的原生 http 请求辅助方法。此插件与 `@capacitor/core` 捆绑在一起。

## 配置

默认情况下，`window.fetch` 和 `XMLHttpRequest` 的修补以使用原生库的功能是禁用的。
如果要启用此功能，请在 `capacitor.config` 文件中修改以下配置。

| Prop          | Type                 | Description                                                                          | Default            |
| ------------- | -------------------- | ------------------------------------------------------------------------------------ | ------------------ |
| **`enabled`** | <code>boolean</code> | 启用 `fetch` 和 `XMLHttpRequest` 的修补以使用原生库。 | <code>false</code> |

### 配置示例

在 `capacitor.config.json` 中：

```json
{
  "plugins": {
    "CapacitorHttp": {
      "enabled": true
    }
  }
}
```

在 `capacitor.config.ts` 中：

```ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
```

## 示例

### 使用修补的 fetch

```typescript
const response = await fetch('https://example.com/data');
const data = await response.json();
```

### 使用辅助方法

```typescript
import { CapacitorHttp } from '@capacitor/core';

const response = await CapacitorHttp.get({
  url: 'https://example.com/data',
});

console.log(response.data);
```

### POST 请求

```typescript
import { CapacitorHttp } from '@capacitor/core';

const response = await CapacitorHttp.post({
  url: 'https://example.com/data',
  headers: {
    'Content-Type': 'application/json',
  },
  data: {
    key: 'value',
  },
});

console.log(response.data);
```

## API

<docgen-index>

* [`get(...)`](#get)
* [`post(...)`](#post)
* [`put(...)`](#put)
* [`patch(...)`](#patch)
* [`delete(...)`](#delete)
* [`request(...)`](#request)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### get(...)

```typescript
get(options: HttpOptions) => Promise<HttpResponse>
```

执行 GET 请求

| Param         | Type                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code>          |

**Returns:** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

**Since:** 1.0.0

--------------------


### post(...)

```typescript
post(options: HttpOptions) => Promise<HttpResponse>
```

执行 POST 请求

| Param         | Type                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code>          |

**Returns:** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

**Since:** 1.0.0

--------------------


### put(...)

```typescript
put(options: HttpOptions) => Promise<HttpResponse>
```

执行 PUT 请求

| Param         | Type                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code>          |

**Returns:** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

**Since:** 1.0.0

--------------------


### patch(...)

```typescript
patch(options: HttpOptions) => Promise<HttpResponse>
```

执行 PATCH 请求

| Param         | Type                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code>          |

**Returns:** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

**Since:** 1.0.0

--------------------


### delete(...)

```typescript
delete(options: HttpOptions) => Promise<HttpResponse>
```

执行 DELETE 请求

| Param         | Type                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code>          |

**Returns:** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

**Since:** 1.0.0

--------------------


### request(...)

```typescript
request(options: HttpOptions) => Promise<HttpResponse>
```

执行带有自定义方法或选项的请求

| Param         | Type                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code>          |

**Returns:** <code>Promise&lt;<a href="#httpresponse">HttpResponse</a>&gt;</code>

**Since:** 1.0.0

--------------------


### Interfaces


#### HttpOptions

| Prop         | Type                                  | Description        | Default  | Since |
| ------------ | ------------------------------------- | ------------------ | -------- | ----- |
| **`url`**    | <code>string</code>                   | 请求的 URL         |          | 1.0.0 |
| **`method`** | <code>string</code>                   | HTTP 方法          |          | 1.0.0 |
| **`data`**   | <code>any \| FormData</code>          | 请求体数据         |          | 1.0.0 |
| **`headers`** | <code>HttpHeaders</code>              | 请求头             |          | 1.0.0 |
| **`params`** | <code>Record&lt;string, string&gt;</code> | URL 查询参数       |          | 1.0.0 |
| **`connectTimeout`** | <code>number</code>             | 连接超时（毫秒）    |          | 1.0.0 |
| **`readTimeout`** | <code>number</code>                | 读取超时（毫秒）    |          | 1.0.0 |
| **`disableRedirects`** | <code>boolean</code>           | 禁用自动重定向      |          | 1.0.0 |
| **`shouldEncode`** | <code>boolean</code>              | 应该编码参数        |          | 1.0.0 |
| **`responseType`** | <code>ResponseType</code>         | 响应类型            |          | 1.0.0 |
| **`webSecurityEnabled`** | <code>boolean</code>        | 启用 Web 安全       |          | 1.0.0 |


#### HttpResponse

| Prop          | Type                | Description         | Since |
| ------------- | ------------------- | ------------------- | ----- |
| **`data`**    | <code>any</code>    | 响应数据            | 1.0.0 |
| **`status`**  | <code>number</code> | HTTP 状态码         | 1.0.0 |
| **`headers`** | <code>HttpHeaders</code> | 响应头         | 1.0.0 |
| **`url`**     | <code>string</code> | 最终 URL（重定向后） | 1.0.0 |


#### HttpHeaders

<code>Record&lt;string, string&gt;</code>


### Type Aliases


#### ResponseType

<code>'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'</code>

</docgen-api>
