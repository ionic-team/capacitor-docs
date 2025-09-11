---
title: File Transfer Capacitor Plugin API
description: The FileTransfer API provides mechanisms for downloading and uploading files.
custom_edit_url: https://github.com/ionic-team/capacitor-file-transfer/blob/main/packages/capacitor-plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-file-transfer/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: File Transfer
---

# @capacitor/file-transfer

The FileTransfer API provides mechanisms for downloading and uploading files.

## Install

```bash
npm install @capacitor/file-transfer
npx cap sync
```

## API

<docgen-index>

* [`downloadFile(...)`](#downloadfile)
* [`uploadFile(...)`](#uploadfile)
* [`addListener('progress', ...)`](#addlistenerprogress-)
* [`removeAllListeners()`](#removealllisteners)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### downloadFile(...)

```typescript
downloadFile(options: DownloadFileOptions) => Promise<DownloadFileResult>
```

Perform an HTTP request to a server and download the file to the specified destination.

| Param         | Type                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#downloadfileoptions">DownloadFileOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#downloadfileresult">DownloadFileResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### uploadFile(...)

```typescript
uploadFile(options: UploadFileOptions) => Promise<UploadFileResult>
```

Perform an HTTP request to upload a file to a server

| Param         | Type                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#uploadfileoptions">UploadFileOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#uploadfileresult">UploadFileResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('progress', ...)

```typescript
addListener(eventName: "progress", listenerFunc: (progress: ProgressStatus) => void) => Promise<PluginListenerHandle>
```

Add a listener to file transfer (download or upload) progress events.

| Param              | Type                                                                             |
| ------------------ | -------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'progress'</code>                                                          |
| **`listenerFunc`** | <code>(progress: <a href="#progressstatus">ProgressStatus</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Remove all listeners for this plugin.

**Since:** 1.0.0

--------------------


### Interfaces


#### DownloadFileResult

| Prop       | Type                | Description                                                          | Since |
| ---------- | ------------------- | -------------------------------------------------------------------- | ----- |
| **`path`** | <code>string</code> | The path the file was downloaded to.                                 | 1.0.0 |
| **`blob`** | <code>Blob</code>   | The blob data of the downloaded file. This is only available on web. | 1.0.0 |


#### DownloadFileOptions

| Prop           | Type                 | Description                                                                                                                                                                        | Since |
| -------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`path`**     | <code>string</code>  | The full file path the downloaded file should be moved to.                                                                                                                         | 1.0.0 |
| **`progress`** | <code>boolean</code> | If true, progress event will be dispatched on every chunk received. See addListener() for more information. Chunks are throttled to every 100ms on Android/iOS to avoid slowdowns. | 1.0.0 |


#### UploadFileResult

| Prop               | Type                                    | Description                                            | Since |
| ------------------ | --------------------------------------- | ------------------------------------------------------ | ----- |
| **`bytesSent`**    | <code>number</code>                     | Total number of bytes uploaded                         | 1.0.0 |
| **`responseCode`** | <code>string</code>                     | HTTP response code for the upload                      | 1.0.0 |
| **`response`**     | <code>string</code>                     | HTTP response body from the upload (when available)    | 1.0.0 |
| **`headers`**      | <code>{ [key: string]: string; }</code> | HTTP headers from the upload response (when available) | 1.0.0 |


#### UploadFileOptions

| Prop              | Type                 | Description                                                                                                                                                                        | Since |
| ----------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`path`**        | <code>string</code>  | Full file path of the file to upload.                                                                                                                                              | 1.0.0 |
| **`blob`**        | <code>Blob</code>    | Blob data to upload. Will use this instead of path if provided. This is only available on web.                                                                                     | 1.0.0 |
| **`chunkedMode`** | <code>boolean</code> | Whether to upload data in a chunked streaming mode. Not supported on web.                                                                                                          | 1.0.0 |
| **`mimeType`**    | <code>string</code>  | Mime type of the data to upload. Only used if "Content-Type" header was not provided.                                                                                              | 1.0.0 |
| **`fileKey`**     | <code>string</code>  | Type of form element. The default is set to "file". Only used if "Content-Type" header was not provided.                                                                           | 1.0.0 |
| **`progress`**    | <code>boolean</code> | If true, progress event will be dispatched on every chunk received. See addListener() for more information. Chunks are throttled to every 100ms on Android/iOS to avoid slowdowns. | 1.0.0 |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### ProgressStatus

| Prop                   | Type                                | Description                                                                                                                         | Since |
| ---------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`type`**             | <code>'download' \| 'upload'</code> | The type of transfer operation (download or upload).                                                                                | 1.0.0 |
| **`url`**              | <code>string</code>                 | The url of the file associated with the transfer (download or upload).                                                              | 1.0.0 |
| **`bytes`**            | <code>number</code>                 | The number of bytes transferred so far.                                                                                             | 1.0.0 |
| **`contentLength`**    | <code>number</code>                 | The total number of bytes associated with the file transfer.                                                                        | 1.0.0 |
| **`lengthComputable`** | <code>boolean</code>                | Whether or not the contentLength value is relevant. In some situations, the total number of bytes may not be possible to determine. | 1.0.0 |

</docgen-api>

### Errors
The plugin returns the following errors with specific codes on iOS, Android, and Web:

| Error code        | Platform(s)       | Description                      |
|-------------------|-------------------|----------------------------------|
| OS-PLUG-FLTR-0004 | Android, iOS      | The method's input parameters aren't valid. |
| OS-PLUG-FLTR-0005 | Android, iOS      | Invalid server URL was provided or URL is empty. |
| OS-PLUG-FLTR-0006 | Android, iOS      | Unable to perform operation, user denied permission request. |
| OS-PLUG-FLTR-0007 | Android, iOS      | Operation failed because file does not exist. |
| OS-PLUG-FLTR-0008 | Android, iOS, Web | Failed to connect to server. |
| OS-PLUG-FLTR-0009 | Android, iOS      | The server responded with HTTP 304 – Not Modified. If you want to avoid this, check your headers related to HTTP caching. |
| OS-PLUG-FLTR-0010 | Android, iOS      | The server responded with an HTTP error status code. |
| OS-PLUG-FLTR-0011 | Android, iOS, Web | The operation failed with an error (generic error). |

When handling errors in your application, you can check the error code to determine the specific issue. The error object typically contains additional information such as:

- `code`: The error code (as shown in the table above)
- `message`: A human-readable description of the error
- `source`: The source of the transfer (file path or URL)
- `target`: The target of the transfer (file path or URL)
- `httpStatus`: The HTTP status code (for HTTP errors)
- `body`: The response body (for HTTP errors)
- `headers`: The response headers (for HTTP errors)