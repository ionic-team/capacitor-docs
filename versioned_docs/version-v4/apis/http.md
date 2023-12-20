---
title: Capacitor Http Plugin API
description: The Capacitor Http API provides native http support via patching `fetch` and `XMLHttpRequest` to use native libraries.
sidebar_label: Http
---

# CapacitorHttp

The Capacitor Http API provides native http support via patching `fetch` and `XMLHttpRequest` to use native libraries. It also provides helper methods for native http requests without the use of `fetch` and `XMLHttpRequest`. This plugin is bundled with `@capacitor/core`.

## Configuration

By default, the patching of `window.fetch` and `XMLHttpRequest` to use native libraries is disabled.
If you would like to enable this feature, modify the configuration below in the `capacitor.config` file.

| Prop          | Type                 | Description                                                                          | Default            |
| ------------- | -------------------- | ------------------------------------------------------------------------------------ | ------------------ |
| **`enabled`** | <code>boolean</code> | Enable the patching of `fetch` and `XMLHttpRequest` to use native libraries instead. | <code>false</code> |

### Example Configuration

In `capacitor.config.json`:

```json
{
  "plugins": {
    "CapacitorHttp": {
      "enabled": true
    }
  }
}
```

In `capacitor.config.ts`:

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

## Example

```typescript
import { CapacitorHttp } from '@capacitor/core';

// Example of a GET request
const doGet = () => {
  const options = {
    url: 'https://example.com/my/api',
    headers: { 'X-Fake-Header': 'Fake-Value' },
    params: { size: 'XL' },
  };

  const response: HttpResponse = await CapacitorHttp.get(options);

  // or...
  // const response = await CapacitorHttp.request({ ...options, method: 'GET' })
};

// Example of a POST request. Note: data
// can be passed as a raw JS Object (must be JSON serializable)
const doPost = () => {
  const options = {
    url: 'https://example.com/my/api',
    headers: { 'X-Fake-Header': 'Fake-Value' },
    data: { foo: 'bar' },
  };

  const response: HttpResponse = await CapacitorHttp.post(options);

  // or...
  // const response = await CapacitorHttp.request({ ...options, method: 'POST' })
};
```

## Large File Support

Due to the nature of the bridge, parsing and transferring large amount of data from native to the web can cause issues. Support for downloading and uploading files to the native device is planned to be added to the `@capacitor/filesystem` plugin in the near future. One way to potentially circumvent the issue of running out of memory in the meantime (specifically on Android) is to edit the `AndroidManifest.xml` and add `android:largeHeap="true"` to the `application` element. Most apps should not need this and should instead focus on reducing their overall memory usage for improved performance. Enabling this also does not guarantee a fixed increase in available memory, because some devices are constrained by their total available memory.

## API

<docgen-index>

- [`request(...)`](#request)
- [`get(...)`](#get)
- [`post(...)`](#post)
- [`put(...)`](#put)
- [`patch(...)`](#patch)
- [`delete(...)`](#delete)

</docgen-index>

<docgen-api>

### request(...)

```typescript
request(options: HttpOptions) => Promise<HttpResponse>
```

Make a Http Request to a server using native libraries.

| Param         | Type                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### get(...)

```typescript
get(options: HttpOptions) => Promise<HttpResponse>
```

Make a Http GET Request to a server using native libraries.

| Param         | Type                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### post(...)

```typescript
post(options: HttpOptions) => Promise<HttpResponse>
```

Make a Http POST Request to a server using native libraries.

| Param         | Type                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### put(...)

```typescript
put(options: HttpOptions) => Promise<HttpResponse>
```

Make a Http PUT Request to a server using native libraries.

| Param         | Type                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### patch(...)

```typescript
patch(options: HttpOptions) => Promise<HttpResponse>
```

Make a Http PATCH Request to a server using native libraries.

| Param         | Type                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### delete(...)

```typescript
delete(options: HttpOptions) => Promise<HttpResponse>
```

Make a Http DELETE Request to a server using native libraries.

| Param         | Type                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#httpoptions">HttpOptions</a></code> |

---

### Interfaces

#### HttpOptions

| Prop                         | Type                                                          | Description                                                                                                                        |
| ---------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **`url`**                    | <code>string</code>                                           | The URL to send the request to.                                                                                                    |
| **`method?`**                | <code>string</code>                                           | The Http Request method to run. (Default is `GET`)                                                                                 |
| **`params?`**                | <code><a href="#httpparams">HttpParams</a></code>             | URL parameters to append to the request.                                                                                           |
| **`data?`**                  | <code>any</code>                                              | JSON data to send with the request.                                                                                                |
| **`headers?`**               | <code><a href="#httpheaders">HttpHeaders</a></code>           | Http Request headers to send with the request.                                                                                     |
| **`readTimeout?`**           | <code>number</code>                                           | How long to wait to read additional data. Resets each time new data is received.                                                   |
| **`connectTimeout?`**        | <code>number</code>                                           | How long to wait for the initial connection.                                                                                       |
| **`disableRedirects?`**      | <code>boolean</code>                                          | Sets whether automatic Http redirects should be disabled.                                                                          |
| **`webFetchExtra?`**         | <code>RequestInit</code>                                      | Extra arguments for fetch when running on the web.                                                                                 |
| **`responseType?`**          | <code><a href="#httpresponsetype">HttpResponseType</a></code> | Parse the response appropriately before returning it to the client. If the response content-type is `json`, this value is ignored. |
| **`shouldEncodeUrlParams?`** | <code>boolean</code>                                          | A option to keep the URL unencoded if necessary (already encoded, azure/firebase testing, etc.). (Default is `true`)               |

#### HttpParams

| Type                                    | Description                                      |
| --------------------------------------- | ------------------------------------------------ |
| **`[key: string]: string or string[]`** | A key/value dictionary of URL parameters to set. |

#### HttpHeaders

| Type                        | Description                             |
| --------------------------- | --------------------------------------- |
| **`[key: string]: string`** | A key/value dictionary of Http headers. |

#### HttpResponseType

| Type                                                            | Description                                                       |
| --------------------------------------------------------------- | ----------------------------------------------------------------- |
| **`'arraybuffer' or 'blob' or 'json' or 'text' or 'document'`** | How to parse the Http response before returning it to the client. |

#### HttpResponse

| Prop          | Type                                                | Description                                       |
| ------------- | --------------------------------------------------- | ------------------------------------------------- |
| **`url`**     | <code>string</code>                                 | The response URL recieved from the Http response. |
| **`status`**  | <code>number</code>                                 | The status code received from the Http response.  |
| **`data`**    | <code>any</code>                                    | Additional data received with the Http response.  |
| **`headers`** | <code><a href="#httpheaders">HttpHeaders</a></code> | The headers received from the Http response.      |

</docgen-api>
