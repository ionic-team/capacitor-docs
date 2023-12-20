---
title: Camera
description: Camera API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/camera
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

The Camera API allows a user to pick a photo from their photo album or take a picture. On iOS, this uses `UIImagePickerController`, and on Android this
API sends an intent which will be handled by the core Camera app by default.

- [`getPhoto(...)`](#getphoto)
- [Interfaces](#interfaces)
- [Enums](#enums)

## iOS Notes

iOS requires the following usage description be added and filled out for your app in `Info.plist`:

Name: `Privacy - Camera Usage Description`
Key: `NSCameraUsageDescription`

Name: `Privacy - Photo Library Additions Usage Description`
Key: `NSPhotoLibraryAddUsageDescription`

Name: `Privacy - Photo Library Usage Description`
Key: `NSPhotoLibraryUsageDescription`

Read about [Setting iOS Permissions](/docs/ios/configuration/) in the [iOS Guide](/docs/ios/) for more information on setting iOS permissions in Xcode

## Android Notes

This API requires the following permissions be added to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

The storage permissions are for reading/saving photo files.

Read about [Setting Android Permissions](/docs/android/configuration/) in the [Android Guide](/docs/android/) for more information on setting Android permissions.

Additionally, because the Camera API launches a separate Activity to handle taking the photo, you should listen for `appRestoredResult` in the `App` plugin
to handle any camera data that was sent in the case your app was terminated by the operating system while the Activity was running.

## PWA Notes

[PWA Elements](/docs/web/pwa-elements) are required for Camera plugin to work.

## Example

```typescript
import { Plugins, CameraResultType } from '@capacitor/core';

const { Camera } = Plugins;

async takePicture() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });
  // image.webPath will contain a path that can be set as an image src.
  // You can access the original file using image.path, which can be
  // passed to the Filesystem API to read the raw data of the image,
  // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  var imageUrl = image.webPath;
  // Can be set to the src of an image now
  imageElement.src = imageUrl;
}
```

## Example Guides

[Building an Ionic Framework Camera App](/docs/guides/ionic-framework-app)

## API

### getPhoto(...)

```typescript
getPhoto(options: CameraOptions) => Promise<CameraPhoto>
```

Prompt the user to pick a photo from an album, or take a new photo
with the camera.

| Param         | Type                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#cameraoptions">CameraOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#cameraphoto">CameraPhoto</a>&gt;</code>

---

### Interfaces

#### CameraPhoto

| Prop               | Type                | Description                                                                                                                                                                   |
| ------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`base64String`** | <code>string</code> | The base64 encoded string representation of the image, if using <a href="#cameraresulttype">CameraResultType.Base64</a>.                                                      |
| **`dataUrl`**      | <code>string</code> | The url starting with 'data:image/jpeg;base64,' and the base64 encoded string representation of the image, if using <a href="#cameraresulttype">CameraResultType.DataUrl</a>. |
| **`path`**         | <code>string</code> | If using <a href="#cameraresulttype">CameraResultType.Uri</a>, the path will contain a full, platform-specific file URL that can be read later using the Filesystem API.      |
| **`webPath`**      | <code>string</code> | webPath returns a path that can be used to set the src attribute of an image for efficient loading and rendering.                                                             |
| **`exif`**         | <code>any</code>    | Exif data, if any, retrieved from the image                                                                                                                                   |
| **`format`**       | <code>string</code> | The format of the image, ex: jpeg, png, gif. iOS and Android only support jpeg. Web supports jpeg and png. gif is only supported if using file input.                         |

#### CameraOptions

| Prop                      | Type                                                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`quality`**             | <code>number</code>                                           | The quality of image to return as JPEG, from 0-100                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **`allowEditing`**        | <code>boolean</code>                                          | Whether to allow the user to crop or make small edits (platform specific)                                                                                                                                                                                                                                                                                                                                                                                           |
| **`resultType`**          | <code><a href="#cameraresulttype">CameraResultType</a></code> | How the data should be returned. Currently, only 'Base64', 'DataUrl' or 'Uri' is supported                                                                                                                                                                                                                                                                                                                                                                          |
| **`saveToGallery`**       | <code>boolean</code>                                          | Whether to save the photo to the gallery. If the photo was picked from the gallery, it will only be saved if edited. Default: false                                                                                                                                                                                                                                                                                                                                 |
| **`width`**               | <code>number</code>                                           | The width of the saved image                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **`height`**              | <code>number</code>                                           | The height of the saved image                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **`preserveAspectRatio`** | <code>boolean</code>                                          | Whether to preserve the aspect ratio of the image. If this flag is true, the width and height will be used as max values and the aspect ratio will be preserved. This is only relevant when both a width and height are passed. When only width or height is provided the aspect ratio is always preserved (and this option is a no-op). A future major version will change this behavior to be default, and may also remove this option altogether. Default: false |
| **`correctOrientation`**  | <code>boolean</code>                                          | Whether to automatically rotate the image "up" to correct for orientation in portrait mode Default: true                                                                                                                                                                                                                                                                                                                                                            |
| **`source`**              | <code><a href="#camerasource">CameraSource</a></code>         | The source to get the photo from. By default this prompts the user to select either the photo album or take a photo. Default: <a href="#camerasource">CameraSource.Prompt</a>                                                                                                                                                                                                                                                                                       |
| **`direction`**           | <code><a href="#cameradirection">CameraDirection</a></code>   | iOS and Web only: The camera direction. Default: <a href="#cameradirection">CameraDirection.Rear</a>                                                                                                                                                                                                                                                                                                                                                                |
| **`presentationStyle`**   | <code>"fullscreen" \| "popover"</code>                        | iOS only: The presentation style of the Camera. Defaults to fullscreen.                                                                                                                                                                                                                                                                                                                                                                                             |
| **`webUseInput`**         | <code>boolean</code>                                          | Web only: Whether to use the PWA Element experience or file input. The default is to use PWA Elements if installed and fall back to file input. To always use file input, set this to `true`. Learn more about PWA Elements: https://capacitorjs.com/docs/pwa-elements                                                                                                                                                                                              |
| **`promptLabelHeader`**   | <code>string</code>                                           | If use <a href="#camerasource">CameraSource.Prompt</a> only, can change Prompt label. default: promptLabelHeader : 'Photo' // iOS only promptLabelCancel : 'Cancel' // iOS only promptLabelPhoto : 'From Photos' promptLabelPicture : 'Take Picture'                                                                                                                                                                                                                |
| **`promptLabelCancel`**   | <code>string</code>                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **`promptLabelPhoto`**    | <code>string</code>                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **`promptLabelPicture`**  | <code>string</code>                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

### Enums

#### CameraResultType

| Members       | Value                  |
| ------------- | ---------------------- |
| **`Uri`**     | <code>"uri"</code>     |
| **`Base64`**  | <code>"base64"</code>  |
| **`DataUrl`** | <code>"dataUrl"</code> |

#### CameraSource

| Members      | Value                 |
| ------------ | --------------------- |
| **`Prompt`** | <code>"PROMPT"</code> |
| **`Camera`** | <code>"CAMERA"</code> |
| **`Photos`** | <code>"PHOTOS"</code> |

#### CameraDirection

| Members     | Value                |
| ----------- | -------------------- |
| **`Rear`**  | <code>"REAR"</code>  |
| **`Front`** | <code>"FRONT"</code> |
