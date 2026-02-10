---
title: File Viewer Capacitor Plugin API
description: The FileViewer API provides mechanisms for opening files and previewing media. Not available on web.
custom_edit_url: https://github.com/ionic-team/capacitor-file-viewer/blob/main/packages/capacitor-plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-file-viewer/blob/main/packages/capacitor-plugin/src/definitions.ts
sidebar_label: File Viewer
---

# @capacitor/file-viewer

The FileViewer API provides mechanisms for opening files and previewing media. Not available on web.

The media preview methods are currently only supported on iOS. It uses a built-in player.

## Install

```bash
npm install @capacitor/file-viewer
npx cap sync
```

## Example

```typescript
import { FileViewer } from "@capacitor/file-viewer";

// can use a plugin like @capacitor/filesystem to get the full path to the file
const openDocument = async () => {
  await FileViewer.openDocumentFromLocalPath({
    path: "path/to/file.pdf"
  });
};

// ios-specific
const previewMedia = async () => {
  await FileViewer.previewMediaContentFromUrl({
    path: "https://url_hosting_media/file.mp4"
  });
}
```

## API

<docgen-index>

* [`openDocumentFromLocalPath(...)`](#opendocumentfromlocalpath)
* [`openDocumentFromResources(...)`](#opendocumentfromresources)
* [`openDocumentFromUrl(...)`](#opendocumentfromurl)
* [`previewMediaContentFromLocalPath(...)`](#previewmediacontentfromlocalpath)
* [`previewMediaContentFromResources(...)`](#previewmediacontentfromresources)
* [`previewMediaContentFromUrl(...)`](#previewmediacontentfromurl)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

For list of existing error codes, see [Errors](#errors).

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

File Viewer API

Only available in Native Android and iOS; not available for Web / PWAs.

### openDocumentFromLocalPath(...)

```typescript
openDocumentFromLocalPath(options: OpenFromLocalPathOptions) => Promise<void>
```

Open a file stored in the local file system

| Param         | Type                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#openfromlocalpathoptions">OpenFromLocalPathOptions</a></code> |

**Since:** 1.0.0

--------------------


### openDocumentFromResources(...)

```typescript
openDocumentFromResources(options: OpenFromResourcesOptions) => Promise<void>
```

Open an app resource file

| Param         | Type                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#openfromresourcesoptions">OpenFromResourcesOptions</a></code> |

**Since:** 1.0.0

--------------------


### openDocumentFromUrl(...)

```typescript
openDocumentFromUrl(options: OpenFromUrlOptions) => Promise<void>
```

Open a file from a remote url

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#openfromurloptions">OpenFromUrlOptions</a></code> |

**Since:** 1.0.0

--------------------


### previewMediaContentFromLocalPath(...)

```typescript
previewMediaContentFromLocalPath(options: PreviewMediaFromLocalPathOptions) => Promise<void>
```

Preview a media file (namely, video) stored in the local file system.
Only implemented in iOS. Android defaults to `openDocumentFromLocalPath`.

| Param         | Type                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#openfromlocalpathoptions">OpenFromLocalPathOptions</a></code> |

**Since:** 1.0.0

--------------------


### previewMediaContentFromResources(...)

```typescript
previewMediaContentFromResources(options: PreviewMediaFromResourcesOptions) => Promise<void>
```

Preview a media file (namely, video) from the app's resources.
Only implemented in iOS. Android defaults to `openDocumentFromResources`.

| Param         | Type                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#openfromresourcesoptions">OpenFromResourcesOptions</a></code> |

**Since:** 1.0.0

--------------------


### previewMediaContentFromUrl(...)

```typescript
previewMediaContentFromUrl(options: PreviewMediaFromUrlOptions) => Promise<void>
```

Preview a media file (namely, video) from a remote url.
Only implemented in iOS. Android defaults to `openDocumentFromUrl`.

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#openfromurloptions">OpenFromUrlOptions</a></code> |

**Since:** 1.0.0

--------------------


### Interfaces


#### OpenFromLocalPathOptions

| Prop       | Type                | Description                                | Since |
| ---------- | ------------------- | ------------------------------------------ | ----- |
| **`path`** | <code>string</code> | The full absolute path to the file to open | 1.0.0 |


#### OpenFromResourcesOptions

| Prop       | Type                | Description                                    | Since |
| ---------- | ------------------- | ---------------------------------------------- | ----- |
| **`path`** | <code>string</code> | The relative path to the resource file to open | 1.0.0 |


#### OpenFromUrlOptions

| Prop      | Type                | Description                                 | Since |
| --------- | ------------------- | ------------------------------------------- | ----- |
| **`url`** | <code>string</code> | The remote url pointing to the file to open | 1.0.0 |


### Type Aliases


#### PreviewMediaFromLocalPathOptions

<code><a href="#openfromlocalpathoptions">OpenFromLocalPathOptions</a></code>


#### PreviewMediaFromResourcesOptions

<code><a href="#openfromresourcesoptions">OpenFromResourcesOptions</a></code>


#### PreviewMediaFromUrlOptions

<code><a href="#openfromurloptions">OpenFromUrlOptions</a></code>

</docgen-api>

### Errors

The plugin returns the following errors with specific codes on native Android and iOS:

| Error code        | Platform(s)      | Message                      |
|-------------------|------------------|------------------------------|
| OS-PLUG-FLVW-0004 | Android, iOS     | The file you are trying to open does not exist. |
| OS-PLUG-FLVW-0005 | Android, iOS     | The URL you are trying to open is malformed. |
| OS-PLUG-FLVW-0006 | Android, iOS     | Path of the file to open is either null or empty. |
| OS-PLUG-FLVW-0007 | Android, iOS     | URL to open is either null or empty. |
| OS-PLUG-FLVW-0008 | Android, iOS     | Could not open the file. |
| OS-PLUG-FLVW-0009 | Android, iOS     | Invalid parameters. |
| OS-PLUG-FLVW-0010 | Android          | There is no app to open this file. |
| OS-PLUG-FLVW-0011 | iOS              | Cordova / Capacitor bridge isn’t initialized. |
| OS-PLUG-FLVW-0012 | iOS              | The download failed. |
| OS-PLUG-FLVW-0013 | iOS              | The file has no extension. |