---
title: Camera Capacitor Plugin API
description: The Camera API provides the ability to take a photo with the camera or choose an existing one from the photo album.
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/camera/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/camera/src/definitions.ts
sidebar_label: Camera
---

# @capacitor/camera

The Camera API provides the ability to take a photo with the camera or choose an existing one from the photo album.

## Install

```bash
npm install @capacitor/camera
npx cap sync
```

## iOS

iOS requires the following usage description be added and filled out for your app in `Info.plist`:

- `NSCameraUsageDescription` (`Privacy - Camera Usage Description`)
- `NSPhotoLibraryAddUsageDescription` (`Privacy - Photo Library Additions Usage Description`)
- `NSPhotoLibraryUsageDescription` (`Privacy - Photo Library Usage Description`)

Read about [Configuring `Info.plist`](https://capacitorjs.com/docs/v3/ios/configuration#configuring-infoplist) in the [iOS Guide](https://capacitorjs.com/docs/v3/ios) for more information on setting iOS permissions in Xcode

## Android

This API requires the following permissions be added to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

The storage permissions are for reading/saving photo files.

Read about [Setting Permissions](https://capacitorjs.com/docs/v3/android/configuration#setting-permissions) in the [Android Guide](https://capacitorjs.com/docs/v3/android) for more information on setting Android permissions.

Additionally, because the Camera API launches a separate Activity to handle taking the photo, you should listen for `appRestoredResult` in the `App` plugin to handle any camera data that was sent in the case your app was terminated by the operating system while the Activity was running.

### Variables

This plugin will use the following project variables (defined in your app's `variables.gradle` file):

- `$androidxExifInterfaceVersion`: version of `androidx.exifinterface:exifinterface` (default: `1.3.2`)
- `$androidxMaterialVersion`: version of `com.google.android.material:material` (default: `1.3.0`)

## PWA Notes

[PWA Elements](https://capacitorjs.com/docs/v3/web/pwa-elements) are required for Camera plugin to work.

## Example

```typescript
import { Camera, CameraResultType } from '@capacitor/camera';

const takePicture = async () => {
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
};
```

## API

<docgen-index>

* [`getPhoto(...)`](#getphoto)
* [`pickImages(...)`](#pickimages)
* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions(...)`](#requestpermissions)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

<docgen-api>


### getPhoto(...)

```typescript
getPhoto(options: ImageOptions) => Promise<Photo>
```

Prompt the user to pick a photo from an album, or take a new photo
with the camera.

| Param         | Type                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | `<a href="#imageoptions">ImageOptions</a>` |

**Returns:** `Promise&lt;<a href="#photo">Photo</a>&gt;`

**Since:** 1.0.0

--------------------


### pickImages(...)

```typescript
pickImages(options: GalleryImageOptions) => Promise<GalleryPhotos>
```

Allows the user to pick multiple pictures from the photo gallery.
On iOS 13 and older it only allows to pick one picture.

| Param         | Type                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | `<a href="#galleryimageoptions">GalleryImageOptions</a>` |

**Returns:** `Promise&lt;<a href="#galleryphotos">GalleryPhotos</a>&gt;`

**Since:** 1.2.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

Check camera and photo album permissions

**Returns:** `Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;`

**Since:** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(permissions?: CameraPluginPermissions | undefined) => Promise<PermissionStatus>
```

Request camera and photo album permissions

| Param             | Type                                                                        |
| ----------------- | --------------------------------------------------------------------------- |
| **`permissions`** | `<a href="#camerapluginpermissions">CameraPluginPermissions</a>` |

**Returns:** `Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;`

**Since:** 1.0.0

--------------------


### Interfaces


#### Photo

| Prop               | Type                 | Description                                                                                                                                                                                                      | Since |
| ------------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`base64String`** | `string`  | The base64 encoded string representation of the image, if using <a href="#cameraresulttype">CameraResultType.Base64</a>.                                                                                         | 1.0.0 |
| **`dataUrl`**      | `string`  | The url starting with 'data:image/jpeg;base64,' and the base64 encoded string representation of the image, if using <a href="#cameraresulttype">CameraResultType.DataUrl</a>.                                    | 1.0.0 |
| **`path`**         | `string`  | If using <a href="#cameraresulttype">CameraResultType.Uri</a>, the path will contain a full, platform-specific file URL that can be read later using the Filesystem API.                                         | 1.0.0 |
| **`webPath`**      | `string`  | webPath returns a path that can be used to set the src attribute of an image for efficient loading and rendering.                                                                                                | 1.0.0 |
| **`exif`**         | `any`     | Exif data, if any, retrieved from the image                                                                                                                                                                      | 1.0.0 |
| **`format`**       | `string`  | The format of the image, ex: jpeg, png, gif. iOS and Android only support jpeg. Web supports jpeg and png. gif is only supported if using file input.                                                            | 1.0.0 |
| **`saved`**        | `boolean` | Whether if the image was saved to the gallery or not. On Android and iOS, saving to the gallery can fail if the user didn't grant the required permissions. On Web there is no gallery, so always returns false. | 1.1.0 |


#### ImageOptions

| Prop                      | Type                                                          | Description                                                                                                                                                                                                                                                            | Default                             | Since |
| ------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ----- |
| **`quality`**             | `number`                                           | The quality of image to return as JPEG, from 0-100                                                                                                                                                                                                                     |                                     | 1.0.0 |
| **`allowEditing`**        | `boolean`                                          | Whether to allow the user to crop or make small edits (platform specific). On iOS 14+ it's only supported for <a href="#camerasource">CameraSource.Camera</a>, but not for <a href="#camerasource">CameraSource.Photos</a>.                                            |                                     | 1.0.0 |
| **`resultType`**          | `<a href="#cameraresulttype">CameraResultType</a>` | How the data should be returned. Currently, only 'Base64', 'DataUrl' or 'Uri' is supported                                                                                                                                                                             |                                     | 1.0.0 |
| **`saveToGallery`**       | `boolean`                                          | Whether to save the photo to the gallery. If the photo was picked from the gallery, it will only be saved if edited.                                                                                                                                                   | `: false`                | 1.0.0 |
| **`width`**               | `number`                                           | The width of the saved image                                                                                                                                                                                                                                           |                                     | 1.0.0 |
| **`height`**              | `number`                                           | The height of the saved image                                                                                                                                                                                                                                          |                                     | 1.0.0 |
| **`preserveAspectRatio`** | `boolean`                                          | This setting has no effect. Picture resizing always preserve aspect ratio.                                                                                                                                                                                             |                                     | 1.0.0 |
| **`correctOrientation`**  | `boolean`                                          | Whether to automatically rotate the image "up" to correct for orientation in portrait mode                                                                                                                                                                             | `: true`                 | 1.0.0 |
| **`source`**              | `<a href="#camerasource">CameraSource</a>`         | The source to get the photo from. By default this prompts the user to select either the photo album or take a photo.                                                                                                                                                   | `: CameraSource.Prompt`  | 1.0.0 |
| **`direction`**           | `<a href="#cameradirection">CameraDirection</a>`   | iOS and Web only: The camera direction.                                                                                                                                                                                                                                | `: CameraDirection.Rear` | 1.0.0 |
| **`presentationStyle`**   | `'fullscreen' \| 'popover'`                        | iOS only: The presentation style of the Camera.                                                                                                                                                                                                                        | `: 'fullscreen'`         | 1.0.0 |
| **`webUseInput`**         | `boolean`                                          | Web only: Whether to use the PWA Element experience or file input. The default is to use PWA Elements if installed and fall back to file input. To always use file input, set this to `true`. Learn more about PWA Elements: https://capacitorjs.com/docs/v3/pwa-elements |                                     | 1.0.0 |
| **`promptLabelHeader`**   | `string`                                           | Text value to use when displaying the prompt.                                                                                                                                                                                                                          | `: 'Photo'`              | 1.0.0 |
| **`promptLabelCancel`**   | `string`                                           | Text value to use when displaying the prompt. iOS only: The label of the 'cancel' button.                                                                                                                                                                              | `: 'Cancel'`             | 1.0.0 |
| **`promptLabelPhoto`**    | `string`                                           | Text value to use when displaying the prompt. The label of the button to select a saved image.                                                                                                                                                                         | `: 'From Photos'`        | 1.0.0 |
| **`promptLabelPicture`**  | `string`                                           | Text value to use when displaying the prompt. The label of the button to open the camera.                                                                                                                                                                              | `: 'Take Picture'`       | 1.0.0 |


#### GalleryPhotos

| Prop         | Type                        | Description                     | Since |
| ------------ | --------------------------- | ------------------------------- | ----- |
| **`photos`** | `GalleryPhoto[]` | Array of all the picked photos. | 1.2.0 |


#### GalleryPhoto

| Prop          | Type                | Description                                                                                                       | Since |
| ------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------- | ----- |
| **`path`**    | `string` | Full, platform-specific file URL that can be read later using the Filesystem API.                                 | 1.2.0 |
| **`webPath`** | `string` | webPath returns a path that can be used to set the src attribute of an image for efficient loading and rendering. | 1.2.0 |
| **`exif`**    | `any`    | Exif data, if any, retrieved from the image                                                                       | 1.2.0 |
| **`format`**  | `string` | The format of the image, ex: jpeg, png, gif. iOS and Android only support jpeg. Web supports jpeg, png and gif.   | 1.2.0 |


#### GalleryImageOptions

| Prop                     | Type                                   | Description                                                                                | Default                     | Since |
| ------------------------ | -------------------------------------- | ------------------------------------------------------------------------------------------ | --------------------------- | ----- |
| **`quality`**            | `number`                    | The quality of image to return as JPEG, from 0-100                                         |                             | 1.2.0 |
| **`width`**              | `number`                    | The width of the saved image                                                               |                             | 1.2.0 |
| **`height`**             | `number`                    | The height of the saved image                                                              |                             | 1.2.0 |
| **`correctOrientation`** | `boolean`                   | Whether to automatically rotate the image "up" to correct for orientation in portrait mode | `: true`         | 1.2.0 |
| **`presentationStyle`**  | `'fullscreen' \| 'popover'` | iOS only: The presentation style of the Camera.                                            | `: 'fullscreen'` | 1.2.0 |
| **`limit`**              | `number`                    | iOS only: Maximum number of pictures the user will be able to choose.                      | `0 (unlimited)`  | 1.2.0 |


#### PermissionStatus

| Prop         | Type                                                                    |
| ------------ | ----------------------------------------------------------------------- |
| **`camera`** | `<a href="#camerapermissionstate">CameraPermissionState</a>` |
| **`photos`** | `<a href="#camerapermissionstate">CameraPermissionState</a>` |


#### CameraPluginPermissions

| Prop              | Type                                |
| ----------------- | ----------------------------------- |
| **`permissions`** | `CameraPermissionType[]` |


### Type Aliases


#### CameraPermissionState

`<a href="#permissionstate">PermissionState</a> | 'limited'`


#### PermissionState

`'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'`


#### CameraPermissionType

`'camera' | 'photos'`


### Enums


#### CameraResultType

| Members       | Value                  |
| ------------- | ---------------------- |
| **`Uri`**     | `'uri'`     |
| **`Base64`**  | `'base64'`  |
| **`DataUrl`** | `'dataUrl'` |


#### CameraSource

| Members      | Value                 | Description                                                        |
| ------------ | --------------------- | ------------------------------------------------------------------ |
| **`Prompt`** | `'PROMPT'` | Prompts the user to select either the photo album or take a photo. |
| **`Camera`** | `'CAMERA'` | Take a new photo using the camera.                                 |
| **`Photos`** | `'PHOTOS'` | Pick an existing photo fron the gallery or photo album.            |


#### CameraDirection

| Members     | Value                |
| ----------- | -------------------- |
| **`Rear`**  | `'REAR'`  |
| **`Front`** | `'FRONT'` |

</docgen-api>
