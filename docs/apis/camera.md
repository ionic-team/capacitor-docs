---
title: Camera Capacitor Plugin API
description: The Camera API provides the ability to take a photo with the camera or choose an existing one from the photo album.
custom_edit_url: https://github.com/ionic-team/capacitor-camera/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-camera/blob/main/src/definitions.ts
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

Read about [Configuring `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) in the [iOS Guide](https://capacitorjs.com/docs/ios) for more information on setting iOS permissions in Xcode

## Android

When picking existing images from the device gallery, the Android Photo Picker component is now used. The Photo Picker is available on devices that meet the following criteria:

- Run Android 11 (API level 30) or higher
- Receive changes to Modular System Components through Google System Updates

Older devices and Android Go devices running Android 11 or 12 that support Google Play services can install a backported version of the photo picker. To enable the automatic installation of the backported photo picker module through Google Play services, add the following entry to the `<application>` tag in your `AndroidManifest.xml` file:

```xml
<!-- Trigger Google Play services to install the backported photo picker module. -->
<!--suppress AndroidDomInspection -->
<service android:name="com.google.android.gms.metadata.ModuleDependencies"
    android:enabled="false"
    android:exported="false"
    tools:ignore="MissingClass">
    <intent-filter>
        <action android:name="com.google.android.gms.metadata.MODULE_DEPENDENCIES" />
    </intent-filter>
    <meta-data android:name="photopicker_activity:0:required" android:value="" />
</service>
```

If that entry is not added, on devices that don't support the Photo Picker, the Photo Picker component falls back to `Intent.ACTION_OPEN_DOCUMENT`.

The Camera plugin requires no permissions, unless using `saveToGallery: true`, in that case the following permissions should be added to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

You can also specify those permissions only for the Android versions where they will be requested:

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="29"/>
```

The storage permissions are for reading/saving photo files.

Read about [Setting Permissions](https://capacitorjs.com/docs/android/configuration#setting-permissions) in the [Android Guide](https://capacitorjs.com/docs/android) for more information on setting Android permissions.

Additionally, because the Camera API launches a separate Activity to handle taking the photo, you should listen for `appRestoredResult` in the `App` plugin to handle any camera data that was sent in the case your app was terminated by the operating system while the Activity was running.

### Variables

This plugin will use the following project variables (defined in your app's `variables.gradle` file):

- `androidxExifInterfaceVersion`: version of `androidx.exifinterface:exifinterface` (default: `1.4.1`)
- `androidxMaterialVersion`: version of `com.google.android.material:material` (default: `1.13.0`)

## PWA Notes

On Web, `takePhoto` can use the [PWA Elements](https://capacitorjs.com/docs/web/pwa-elements) `pwa-camera-modal` custom element to provide a native-like camera UI. If the element is not registered, the plugin falls back to an `<input type="file">` picker. `chooseFromGallery` always uses `<input type="file">` on Web, regardless of whether PWA Elements are installed.

### Installing PWA Elements programmatically

See the [PWA Elements installation guide](https://capacitorjs.com/docs/web/pwa-elements#installation) for full instructions.

### Providing a custom camera element

Instead of using `@ionic/pwa-elements`, you can register your own `pwa-camera-modal` custom element. The plugin interacts with it using the following interface:

| Member | Type | Description |
|---|---|---|
| `facingMode` | `string` property | Set to `'user'` (front camera) or `'environment'` (rear camera) before presenting |
| `componentOnReady()` | method → `Promise<void>` | Called by the plugin after creating the element; resolve when the element is ready |
| `present()` | method | Called by the plugin to display the camera UI |
| `dismiss()` | method | Called by the plugin to close the camera UI after a photo is taken or cancelled |
| `onPhoto` | event | Dispatched when the user takes a photo or cancels. `event.detail` must be a `Blob` (photo taken), `null` (user cancelled), or an `Error` (something went wrong) |

```typescript
class MyCameraModal extends HTMLElement {
  facingMode = 'environment';

  componentOnReady() {
    return Promise.resolve();
  }

  present() {
    // Show your custom camera UI, then dispatch exactly one 'onPhoto' event when done:
    //   - Blob: user took a photo
    //   - null: user cancelled
    //   - Error: something went wrong
    // Example:
    this.dispatchEvent(new CustomEvent('onPhoto', { detail: photoBlob }));
  }

  dismiss() {
    // Hide your custom camera UI (called by the plugin after receiving 'onPhoto')
  }
}

customElements.define('pwa-camera-modal', MyCameraModal);
```

## Examples

### Taking a photo

```typescript
import { Camera } from '@capacitor/camera';

const takePicture = async () => {
  try {
    const result = await Camera.takePhoto({
      quality: 90,
      includeMetadata: true,
    });

    // result.webPath can be set directly as the src of an image element
    imageElement.src = result.webPath;

    // On native: pass result.uri to the Filesystem API to get the full-resolution base64,
    // or use result.thumbnail for a lower-resolution base64 preview.
    // On Web: result.thumbnail contains the full image base64 encoded.

    console.log('Format:', result.metadata?.format);
    console.log('Resolution:', result.metadata?.resolution);
  } catch (e) {
    const error = e as any;
    // error.code contains the structured error code (e.g. 'OS-PLUG-CAMR-0003')
    // when thrown by the native layer. See the Errors section for all codes.
    const message = error.code ? `[${error.code}] ${error.message}` : error.message;
    console.error('takePhoto failed:', message);
  }
};
```

### Choosing from the gallery

```typescript
import { Camera, MediaTypeSelection } from '@capacitor/camera';

const pickMedia = async () => {
  try {
    const { results } = await Camera.chooseFromGallery({
      mediaType: MediaTypeSelection.All, // photos, videos, or both
      allowMultipleSelection: true,
      limit: 5,
      includeMetadata: true,
    });

    for (const item of results) {
      console.log('Type:', item.type);       // MediaType.Photo or MediaType.Video
      console.log('webPath:', item.webPath);
      console.log('Format:', item.metadata?.format);
      console.log('Size:', item.metadata?.size);
    }
  } catch (e) {
    const error = e as any;
    const message = error.code ? `[${error.code}] ${error.message}` : error.message;
    console.error('chooseFromGallery failed:', message);
  }
};
```

### Recording and playing a video

```typescript
import { Camera } from '@capacitor/camera';

const recordAndPlay = async () => {
  let videoUri: string | undefined;

  try {
    const result = await Camera.recordVideo({
      saveToGallery: false,
      isPersistent: true, // keep the file available across app launches
      includeMetadata: true,
    });

    videoUri = result.uri;
    console.log('Duration:', result.metadata?.duration);
    console.log('Saved to gallery:', result.saved);
  } catch (e) {
    const error = e as any;
    const message = error.code ? `[${error.code}] ${error.message}` : error.message;
    console.error('recordVideo failed:', message);
    return;
  }

  if (videoUri) {
    try {
      await Camera.playVideo({ uri: videoUri });
    } catch (e) {
      const error = e as any;
      const message = error.code ? `[${error.code}] ${error.message}` : error.message;
      console.error('playVideo failed:', message);
    }
  }
};
```

### Editing a photo from a base64 string

`editPhoto` opens an in-app editor from a base64-encoded image and returns the edited image as a base64 string in `outputImage`.

```typescript
import { Camera } from '@capacitor/camera';

const editFromBase64 = async (base64Image: string) => {
  try {
    const { outputImage } = await Camera.editPhoto({
      inputImage: base64Image, // raw base64, no data URL prefix
    });

    // outputImage is the edited image, base64 encoded
    imageElement.src = `data:image/jpeg;base64,${outputImage}`;
  } catch (e) {
    const error = e as any;
    const message = error.code ? `[${error.code}] ${error.message}` : error.message;
    console.error('editPhoto failed:', message);
  }
};
```

### Editing a photo from a URI

`editURIPhoto` opens an in-app editor from a file URI (e.g. from `takePhoto` or the Filesystem API) and returns a `MediaResult`.

```typescript
import { Camera } from '@capacitor/camera';

const editFromURI = async (uri: string) => {
  try {
    const result = await Camera.editURIPhoto({
      uri,
      saveToGallery: false,
      includeMetadata: true,
    });

    // result.webPath can be used directly as an image src
    imageElement.src = result.webPath;

    console.log('Format:', result.metadata?.format);
    console.log('Size:', result.metadata?.size);
    console.log('Saved to gallery:', result.saved);
  } catch (e) {
    const error = e as any;
    const message = error.code ? `[${error.code}] ${error.message}` : error.message;
    console.error('editURIPhoto failed:', message);
  }
};
```

## Migrating to the New API

Version 8.1.0 introduces a new improved API and deprecates `getPhoto` and `pickImages`.

### Replacing `getPhoto`

`getPhoto` handled three sources via `CameraSource`: `Camera`, `Photos`, and `Prompt`. `Camera` and `Photos` now map to different methods, while `Prompt` was removed.

#### `CameraSource.Camera` to `takePhoto`

`CameraResultType.Base64` and `CameraResultType.DataUrl` are not supported in the new API. See [Result type changes](#result-type-changes) for alternatives.

```typescript
// Before
const photo = await Camera.getPhoto({
  source: CameraSource.Camera,
  quality: 90,
  allowEditing: true,
  resultType: CameraResultType.Uri,
  direction: CameraDirection.Rear,
  width: 1280,
  height: 720,
});
const imageUrl = photo.webPath;

// After
const result = await Camera.takePhoto({
  quality: 90,
  editable: 'in-app',        // replaces allowEditing: true
  cameraDirection: CameraDirection.Rear, // replaces direction
  targetWidth: 1280,         // replaces width (1)
  targetHeight: 720,         // replaces height (1)
});
const imageUrl = result.webPath;
```

**(1)** `width`/`height` each worked independently and set a maximum dimension while preserving aspect ratio. `targetWidth`/`targetHeight` must be used together — setting only one has no effect.

#### `CameraSource.Photos` to `chooseFromGallery`

```typescript
// Before
const photo = await Camera.getPhoto({
  source: CameraSource.Photos,
  quality: 90,
  resultType: CameraResultType.Uri,
});
const imageUrl = photo.webPath;

// After
const { results } = await Camera.chooseFromGallery({
  quality: 90,
});
const imageUrl = results[0].webPath;
```

#### `CameraSource.Prompt` (or default)

`getPhoto` previously displayed a native prompt letting the user choose between the camera and the gallery. This prompt is no longer part of the plugin. You should build the prompt using your own UI (for example, with `@capacitor/action-sheet`) and then call `takePhoto` or `chooseFromGallery` based on the user's selection.

```typescript
// Before
const photo = await Camera.getPhoto({
  // source defaults to CameraSource.Prompt
  quality: 90,
  resultType: CameraResultType.Uri,
});

// After: show your own UI to determine the source, then call the appropriate method
const result = await Camera.takePhoto({ quality: 90 });
// or
const { results } = await Camera.chooseFromGallery({ quality: 90 });
```

#### Result type changes

`getPhoto` returned a `Photo` object where the fields available depended on `resultType`. The new API removes `resultType` entirely — `MediaResult` has a fixed set of fields regardless of how the photo was taken.

| `Photo` field | `MediaResult` equivalent |
|---|---|
| `path` | `uri` |
| `webPath` | `webPath` |
| `base64String` | `thumbnail` (on Web, contains the full image base64 encoded; on native, contains a thumbnail) |
| `dataUrl` | No direct equivalent — see note below |
| `saved` | `saved` |
| `format` | `metadata.format` (requires `includeMetadata: true`) |
| `exif` | `metadata.exif` (requires `includeMetadata: true`) |

**Constructing a data URL** — two options are available depending on your needs:

On all platforms, you can combine `thumbnail` and `metadata.format` (requires `includeMetadata: true`). On native, `thumbnail` is lower-resolution:

```typescript
const dataUrl = `data:image/${result.metadata.format};base64,${result.thumbnail}`;
```

On native, if you need the full-resolution base64, read `uri` via the Filesystem API and construct the data URL from there:

```typescript
import { Filesystem } from '@capacitor/filesystem';

const { data } = await Filesystem.readFile({ path: result.uri });
const dataUrl = `data:image/${result.metadata.format};base64,${data}`;
```

### Replacing `pickImages` → `chooseFromGallery`

`pickImages` allowed selecting multiple photos from the gallery. Pass `allowMultipleSelection: true` to `chooseFromGallery` to get the same behaviour.

```typescript
// Before
const { photos } = await Camera.pickImages({
  quality: 90,
  limit: 5,
  width: 1280,
  height: 720,
});
for (const photo of photos) {
  console.log(photo.webPath);
}

// After
const { results } = await Camera.chooseFromGallery({
  allowMultipleSelection: true,
  quality: 90,
  limit: 5,
  targetWidth: 1280,  // replaces width (1)
  targetHeight: 720,  // replaces height (1)
});
for (const result of results) {
  console.log(result.webPath);
}
```

**(1)** `width`/`height` each worked independently and set a maximum dimension while preserving aspect ratio. `targetWidth`/`targetHeight` must be used together — setting only one has no effect.

`chooseFromGallery` can also select videos or mixed media by setting `mediaType` to `MediaTypeSelection.Video` or `MediaTypeSelection.All`.

### Option rename summary

| Old option | New option | Applies to |
|---|---|---|
| `width` | `targetWidth` (1) | `takePhoto`, `chooseFromGallery` |
| `height` | `targetHeight` (1) | `takePhoto`, `chooseFromGallery` |
| `direction` | `cameraDirection` | `takePhoto` |
| `allowEditing` | `editable: 'in-app'` | `takePhoto`, `chooseFromGallery` |
| `resultType` | — (removed, see [Result type changes](#result-type-changes)) | — |
| `source` | — (removed, use separate methods) | — |
| `promptLabel*` | — (removed, build your own UI) | — |

**(1)** `width`/`height` each worked independently and set a maximum dimension while preserving aspect ratio. `targetWidth`/`targetHeight` must be used together — setting only one has no effect.

## API

<docgen-index>

* [`takePhoto(...)`](#takephoto)
* [`recordVideo(...)`](#recordvideo)
* [`playVideo(...)`](#playvideo)
* [`chooseFromGallery(...)`](#choosefromgallery)
* [`editPhoto(...)`](#editphoto)
* [`editURIPhoto(...)`](#edituriphoto)
* [`pickLimitedLibraryPhotos()`](#picklimitedlibraryphotos)
* [`getLimitedLibraryPhotos()`](#getlimitedlibraryphotos)
* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions(...)`](#requestpermissions)
* [`getPhoto(...)`](#getphoto)
* [`pickImages(...)`](#pickimages)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

For a list of existing error codes, see [Errors](#errors).

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### takePhoto(...)

```typescript
takePhoto(options: TakePhotoOptions) => Promise<MediaResult>
```

Open the device's camera and allow the user to take a photo.

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#takephotooptions">TakePhotoOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#mediaresult">MediaResult</a>&gt;</code>

**Since:** 8.1.0

--------------------


### recordVideo(...)

```typescript
recordVideo(options: RecordVideoOptions) => Promise<MediaResult>
```

Open the device's camera and allow the user to record a video.
Not available on Web.

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#recordvideooptions">RecordVideoOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#mediaresult">MediaResult</a>&gt;</code>

**Since:** 8.1.0

--------------------


### playVideo(...)

```typescript
playVideo(options: PlayVideoOptions) => Promise<void>
```

Open a native video player.
Not available on Web.

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#playvideooptions">PlayVideoOptions</a></code> |

**Since:** 8.1.0

--------------------


### chooseFromGallery(...)

```typescript
chooseFromGallery(options: ChooseFromGalleryOptions) => Promise<MediaResults>
```

Allow users to choose pictures, videos, or both, directly from their gallery.

| Param         | Type                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#choosefromgalleryoptions">ChooseFromGalleryOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#mediaresults">MediaResults</a>&gt;</code>

**Since:** 8.1.0

--------------------


### editPhoto(...)

```typescript
editPhoto(options: EditPhotoOptions) => Promise<EditPhotoResult>
```

Open an in-app screen to edit a given photo using the provided base64 string.
Not available on Web.

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#editphotooptions">EditPhotoOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#editphotoresult">EditPhotoResult</a>&gt;</code>

**Since:** 8.1.0

--------------------


### editURIPhoto(...)

```typescript
editURIPhoto(options: EditURIPhotoOptions) => Promise<MediaResult>
```

Open an in-app screen to edit a photo using the provided URI.
Not available on Web.

| Param         | Type                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#edituriphotooptions">EditURIPhotoOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#mediaresult">MediaResult</a>&gt;</code>

**Since:** 8.1.0

--------------------


### pickLimitedLibraryPhotos()

```typescript
pickLimitedLibraryPhotos() => Promise<GalleryPhotos>
```

Allows the user to update their limited photo library selection.
Returns all the limited photos after the picker dismissal.
If instead the user gave full access to the photos it returns an empty array.

**Returns:** <code>Promise&lt;<a href="#galleryphotos">GalleryPhotos</a>&gt;</code>

**Since:** 4.1.0

--------------------


### getLimitedLibraryPhotos()

```typescript
getLimitedLibraryPhotos() => Promise<GalleryPhotos>
```

Return an array of photos selected from the limited photo library.

**Returns:** <code>Promise&lt;<a href="#galleryphotos">GalleryPhotos</a>&gt;</code>

**Since:** 4.1.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

Check camera and photo album permissions

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(permissions?: CameraPluginPermissions | undefined) => Promise<PermissionStatus>
```

Request camera and photo album permissions

| Param             | Type                                                                        |
| ----------------- | --------------------------------------------------------------------------- |
| **`permissions`** | <code><a href="#camerapluginpermissions">CameraPluginPermissions</a></code> |

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 1.0.0

--------------------


### getPhoto(...)

```typescript
getPhoto(options: ImageOptions) => Promise<Photo>
```

Prompt the user to pick a photo from an album, or take a new photo
with the camera.

| Param         | Type                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#imageoptions">ImageOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#photo">Photo</a>&gt;</code>

**Since:** 1.0.0

--------------------


### pickImages(...)

```typescript
pickImages(options: GalleryImageOptions) => Promise<GalleryPhotos>
```

Allows the user to pick multiple pictures from the photo gallery.

| Param         | Type                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#galleryimageoptions">GalleryImageOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#galleryphotos">GalleryPhotos</a>&gt;</code>

**Since:** 1.2.0

--------------------


### Interfaces


#### MediaResult

| Prop            | Type                                                    | Description                                                                                                                                                                                                                                                                                                                | Since |
| --------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`type`**      | <code><a href="#mediatype">MediaType</a></code>         | The type of media result. Either <a href="#photo">`Photo`</a> or `Video`.                                                                                                                                                                                                                                                  | 8.1.0 |
| **`uri`**       | <code>string</code>                                     | The URI pointing to the media file. Not available on Web. Use `webPath` instead for Web.                                                                                                                                                                                                                                   | 8.1.0 |
| **`thumbnail`** | <code>string</code>                                     | Returns the thumbnail of the media, base64 encoded. On Web, for <a href="#mediatype">`MediaType.Photo`</a>, the full image is returned here, also base64 encoded. On Web, for <a href="#mediatype">`MediaType.Video`</a>, a full-resolution JPEG frame captured from the video is returned, base64 encoded at 80% quality. | 8.1.0 |
| **`saved`**     | <code>boolean</code>                                    | Whether if the media was saved to the gallery successfully or not. Only applicable if `saveToGallery` was set to `true` in input options. Otherwise, `false` is always returned for `save`. Not available on Web.                                                                                                          | 8.1.0 |
| **`webPath`**   | <code>string</code>                                     | webPath returns a path that can be used to set the src attribute of a media item for efficient loading and rendering.                                                                                                                                                                                                      | 8.1.0 |
| **`metadata`**  | <code><a href="#mediametadata">MediaMetadata</a></code> | Metadata associated to the media result. Only included if `includeMetadata` was set to `true` in input options.                                                                                                                                                                                                            | 8.1.0 |


#### MediaMetadata

| Prop               | Type                | Description                                                                                                                                                                                                                                                                                                                                                                                                      | Since |
| ------------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`size`**         | <code>number</code> | File size of the media, in bytes.                                                                                                                                                                                                                                                                                                                                                                                | 8.1.0 |
| **`duration`**     | <code>number</code> | Only applicable for <a href="#mediatype">`MediaType.Video`</a> - the duration of the media, in seconds.                                                                                                                                                                                                                                                                                                          | 8.1.0 |
| **`format`**       | <code>string</code> | The format of the image, ex: jpeg, png, mp4. Android and iOS may return 'jpg' instead of 'jpeg'. The format is the same, just with a different name. Please compare against both 'jpeg' and 'jpg' when checking if the format of the returned media is JPEG. Web supports jpeg, png and gif, but the exact availability may vary depending on the browser. gif is only supported for `chooseFromGallery` on Web. | 8.1.0 |
| **`resolution`**   | <code>string</code> | The resolution of the media, in `&lt;width&gt;x&lt;height&gt;` format. Example: '1920x1080'.                                                                                                                                                                                                                                                                                                                     | 8.1.0 |
| **`creationDate`** | <code>string</code> | The date and time the media was created, in ISO 8601 format. If creation date is not available (e.g. Android 7 and below), the last modified date is returned. For Web, the last modified date is always returned.                                                                                                                                                                                               | 8.1.0 |
| **`exif`**         | <code>string</code> | Exif data, if any, retrieved from the media item. Only available for <a href="#mediatype">`MediaType.Photo`</a>. Not available on Web.                                                                                                                                                                                                                                                                           | 8.1.0 |


#### TakePhotoOptions

| Prop                     | Type                                                        | Description                                                                                                                                                                                                                                                                                                                                                                       | Default                           | Since |
| ------------------------ | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----- |
| **`quality`**            | <code>number</code>                                         | The quality of image to return, from 0-100. Only applicable for <a href="#encodingtype">`EncodingType.JPEG`</a>. Note: This option is only supported on Android and iOS.                                                                                                                                                                                                          | <code>100</code>                  | 8.1.0 |
| **`targetWidth`**        | <code>number</code>                                         | The target width of photos to apply. Must be a positive number, and used along `targetHeight`. Note: This option is only supported on Android and iOS.                                                                                                                                                                                                                            |                                   | 8.1.0 |
| **`targetHeight`**       | <code>number</code>                                         | The target width of photos to apply. Must be a positive number, and used along `targetWidth`. Note: This option is only supported on Android and iOS.                                                                                                                                                                                                                             |                                   | 8.1.0 |
| **`correctOrientation`** | <code>boolean</code>                                        | Whether to automatically rotate the image "up" to correct for orientation in portrait mode. Note: This option is only supported on Android and iOS                                                                                                                                                                                                                                | <code>true</code>                 | 8.1.0 |
| **`encodingType`**       | <code><a href="#encodingtype">EncodingType</a></code>       | The encoding type for the captured photo - JPEG or PNG. Note: This option is only supported on Android and iOS.                                                                                                                                                                                                                                                                   | <code>EncodingType.JPEG</code>    | 8.1.0 |
| **`saveToGallery`**      | <code>boolean</code>                                        | Whether to save the photo to the gallery. Note: This option is only supported on Android and iOS.                                                                                                                                                                                                                                                                                 | <code>false</code>                | 8.1.0 |
| **`cameraDirection`**    | <code><a href="#cameradirection">CameraDirection</a></code> | iOS and Web only: The camera direction.                                                                                                                                                                                                                                                                                                                                           | <code>CameraDirection.Rear</code> | 8.1.0 |
| **`editable`**           | <code>'in-app' \| 'external' \| 'no'</code>                 | Determines if and how the user can edit the photo. - 'in-app': Use an in-app editor for photo edition. - 'external': Open a separate (platform-specific) native app to handle photo edition, falling back to the in-app editor if none is available. Note: iOS does not support external editing and will use 'in-app' instead. - 'no': No editing allowed. Not available on Web. | <code>'no'</code>                 | 8.1.0 |
| **`presentationStyle`**  | <code>'fullscreen' \| 'popover'</code>                      | iOS only: The presentation style of the Camera.                                                                                                                                                                                                                                                                                                                                   | <code>'fullscreen'</code>         | 8.1.0 |
| **`webUseInput`**        | <code>boolean</code>                                        | Web only: Whether to use the PWA Element experience or file input. The default is to use PWA Elements if installed and fall back to file input. To always use file input, set this to `true`. Learn more about PWA Elements: https://capacitorjs.com/docs/web/pwa-elements                                                                                                        |                                   | 8.1.0 |
| **`includeMetadata`**    | <code>boolean</code>                                        | Whether or not <a href="#mediaresult">MediaResult</a> should include its metadata. If an error occurs when obtaining the metadata, it will return empty.                                                                                                                                                                                                                          | <code>false</code>                | 8.1.0 |


#### RecordVideoOptions

| Prop                  | Type                 | Description                                                                                                                                                                                                          | Default            | Since |
| --------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`saveToGallery`**   | <code>boolean</code> | Whether to save the video to the gallery.                                                                                                                                                                            | <code>false</code> | 8.1.0 |
| **`includeMetadata`** | <code>boolean</code> | Whether or not <a href="#mediaresult">MediaResult</a> should include its metadata. If an error occurs when obtaining the metadata, it will return empty.                                                             | <code>false</code> | 8.1.0 |
| **`isPersistent`**    | <code>boolean</code> | Whether the to store the video in persistent app storage or in temporary cache. If you plan to use the returned `MediaResult#URI` across app launches, you may want to set to true. Otherwise, you can set to false. | <code>true</code>  | 8.1.0 |


#### PlayVideoOptions

| Prop      | Type                | Description                                                                                                                  | Since |
| --------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`uri`** | <code>string</code> | The URI of the video to play. You may use the `MediaResult#URI` returned from `recordVideo` or `chooseFromGallery` directly. | 8.1.0 |


#### MediaResults

| Prop          | Type                       | Description                | Since |
| ------------- | -------------------------- | -------------------------- | ----- |
| **`results`** | <code>MediaResult[]</code> | The list of media results. | 8.1.0 |


#### ChooseFromGalleryOptions

| Prop                         | Type                                                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Default                               | Since |
| ---------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ----- |
| **`mediaType`**              | <code><a href="#mediatypeselection">MediaTypeSelection</a></code> | The type of media to select. Can be pictures, videos, or both.                                                                                                                                                                                                                                                                                                                                                                                                                                                  | <code>MediaTypeSelection.Photo</code> | 8.1.0 |
| **`allowMultipleSelection`** | <code>boolean</code>                                              | Whether or not to allow selecting multiple media files from the gallery.                                                                                                                                                                                                                                                                                                                                                                                                                                        | <code>false</code>                    | 8.1.0 |
| **`limit`**                  | <code>number</code>                                               | The maximum number of media files that the user can choose. Only applicable if `allowMultipleSelection` is `true`. Any non-positive number will be treated as unlimited. Note: This option is only supported on Android 13+ and iOS.                                                                                                                                                                                                                                                                            | <code>0</code>                        | 8.1.0 |
| **`includeMetadata`**        | <code>boolean</code>                                              | Whether or not <a href="#mediaresult">MediaResult</a> should include its metadata. If an error occurs when obtaining the metadata, it will return empty.                                                                                                                                                                                                                                                                                                                                                        | <code>false</code>                    | 8.1.0 |
| **`editable`**               | <code>'in-app' \| 'external' \| 'no'</code>                       | Determines if and how the user can edit the photo. - 'in-app': Use an in-app editor for photo edition. - 'external': Open a separate (platform-specific) native app to handle photo edition, falling back to the in-app editor if none is available. Note: iOS does not support external editing and will use 'in-app' instead. - 'no': No editing allowed. Only applicable for <a href="#mediatypeselection">`MediaTypeSelection.Photo`</a> and `allowMultipleSelection` set to `false`. Not available on Web. | <code>'no'</code>                     | 8.1.0 |
| **`presentationStyle`**      | <code>'fullscreen' \| 'popover'</code>                            | iOS only: The presentation style of media picker.                                                                                                                                                                                                                                                                                                                                                                                                                                                               | <code>'fullscreen'</code>             | 8.1.0 |
| **`quality`**                | <code>number</code>                                               | The quality of images to return, from 0-100. Only applicable for <a href="#mediatype">`MediaType.Photo`</a> and JPEG format. Note: This option is only supported on Android and iOS.                                                                                                                                                                                                                                                                                                                            | <code>100</code>                      | 8.1.0 |
| **`targetWidth`**            | <code>number</code>                                               | The target width of photos to apply. Must be a positive number, and used along `targetHeight`. Not applicable when videos are selected. Note: This option is only supported on Android and iOS.                                                                                                                                                                                                                                                                                                                 |                                       | 1.0.0 |
| **`targetHeight`**           | <code>number</code>                                               | The target width of photos to apply. Must be a positive number, and used along `targetWidth`. Not applicable when videos are selected. Note: This option is only supported on Android and iOS.                                                                                                                                                                                                                                                                                                                  |                                       | 8.1.0 |
| **`correctOrientation`**     | <code>boolean</code>                                              | Whether to automatically rotate the image "up" to correct for orientation in portrait mode. Not applicable when videos are selected. Note: This option is only supported on Android and iOS                                                                                                                                                                                                                                                                                                                     | <code>true</code>                     | 8.1.0 |
| **`webUseInput`**            | <code>boolean</code>                                              | Web only: Whether to use the PWA Element experience or file input. The default is to use PWA Elements if installed and fall back to file input. To always use file input, set this to `true`. Learn more about PWA Elements: https://capacitorjs.com/docs/web/pwa-elements                                                                                                                                                                                                                                      |                                       | 8.1.0 |


#### EditPhotoResult

| Prop              | Type                | Description                       | Since |
| ----------------- | ------------------- | --------------------------------- | ----- |
| **`outputImage`** | <code>string</code> | The edited image, base64 encoded. | 8.1.0 |


#### EditPhotoOptions

| Prop             | Type                | Description                       | Since |
| ---------------- | ------------------- | --------------------------------- | ----- |
| **`inputImage`** | <code>string</code> | The base64 encoded image to edit. | 8.1.0 |


#### EditURIPhotoOptions

| Prop                  | Type                 | Description                                                                                                                                              | Default            | Since |
| --------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`uri`**             | <code>string</code>  | The URI that contains the photo to edit.                                                                                                                 |                    | 8.1.0 |
| **`saveToGallery`**   | <code>boolean</code> | Whether to save the edited photo to the gallery.                                                                                                         | <code>false</code> | 8.1.0 |
| **`includeMetadata`** | <code>boolean</code> | Whether or not <a href="#mediaresult">MediaResult</a> should include its metadata. If an error occurs when obtaining the metadata, it will return empty. | <code>false</code> | 8.1.0 |


#### GalleryPhotos

| Prop         | Type                        | Description                     | Since |
| ------------ | --------------------------- | ------------------------------- | ----- |
| **`photos`** | <code>GalleryPhoto[]</code> | Array of all the picked photos. | 1.2.0 |


#### GalleryPhoto

| Prop          | Type                | Description                                                                                                       | Since |
| ------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------- | ----- |
| **`path`**    | <code>string</code> | Full, platform-specific file URL that can be read later using the Filesystem API.                                 | 1.2.0 |
| **`webPath`** | <code>string</code> | webPath returns a path that can be used to set the src attribute of an image for efficient loading and rendering. | 1.2.0 |
| **`exif`**    | <code>any</code>    | Exif data, if any, retrieved from the image                                                                       | 1.2.0 |
| **`format`**  | <code>string</code> | The format of the image, ex: jpeg, png, gif. iOS and Android only support jpeg. Web supports jpeg, png and gif.   | 1.2.0 |


#### PermissionStatus

| Prop         | Type                                                                    |
| ------------ | ----------------------------------------------------------------------- |
| **`camera`** | <code><a href="#camerapermissionstate">CameraPermissionState</a></code> |
| **`photos`** | <code><a href="#camerapermissionstate">CameraPermissionState</a></code> |


#### CameraPluginPermissions

| Prop              | Type                                |
| ----------------- | ----------------------------------- |
| **`permissions`** | <code>CameraPermissionType[]</code> |


#### Photo

| Prop               | Type                 | Description                                                                                                                                                                                                                                                              | Since |
| ------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`base64String`** | <code>string</code>  | The base64 encoded string representation of the image, if using <a href="#cameraresulttype">CameraResultType.Base64</a>.                                                                                                                                                 | 1.0.0 |
| **`dataUrl`**      | <code>string</code>  | The url starting with 'data:image/jpeg;base64,' and the base64 encoded string representation of the image, if using <a href="#cameraresulttype">CameraResultType.DataUrl</a>. Note: On web, the file format could change depending on the browser.                       | 1.0.0 |
| **`path`**         | <code>string</code>  | If using <a href="#cameraresulttype">CameraResultType.Uri</a>, the path will contain a full, platform-specific file URL that can be read later using the Filesystem API.                                                                                                 | 1.0.0 |
| **`webPath`**      | <code>string</code>  | webPath returns a path that can be used to set the src attribute of an image for efficient loading and rendering.                                                                                                                                                        | 1.0.0 |
| **`exif`**         | <code>any</code>     | Exif data, if any, retrieved from the image                                                                                                                                                                                                                              | 1.0.0 |
| **`format`**       | <code>string</code>  | The format of the image, ex: jpeg, png, gif. iOS and Android only support jpeg. Web supports jpeg, png and gif, but the exact availability may vary depending on the browser. gif is only supported if `webUseInput` is set to `true` or if `source` is set to `Photos`. | 1.0.0 |
| **`saved`**        | <code>boolean</code> | Whether if the image was saved to the gallery or not. On Android and iOS, saving to the gallery can fail if the user didn't grant the required permissions. On Web there is no gallery, so always returns false.                                                         | 1.1.0 |


#### ImageOptions

| Prop                     | Type                                                          | Description                                                                                                                                                                                                                                                                     | Default                           | Since |
| ------------------------ | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----- |
| **`quality`**            | <code>number</code>                                           | The quality of image to return as JPEG, from 0-100 Note: This option is only supported on Android and iOS.                                                                                                                                                                      |                                   | 1.0.0 |
| **`allowEditing`**       | <code>boolean</code>                                          | Whether to allow the user to crop or make small edits (platform specific). Note: This option is only supported on Android and iOS. On iOS it's only supported for <a href="#camerasource">CameraSource.Camera</a>, but not for <a href="#camerasource">CameraSource.Photos</a>. |                                   | 1.0.0 |
| **`resultType`**         | <code><a href="#cameraresulttype">CameraResultType</a></code> | How the data should be returned. Currently, only 'Base64', 'DataUrl' or 'Uri' is supported                                                                                                                                                                                      |                                   | 1.0.0 |
| **`saveToGallery`**      | <code>boolean</code>                                          | Whether to save the photo to the gallery. If the photo was picked from the gallery, it will only be saved if edited. Note: This option is only supported on Android and iOS.                                                                                                    | <code>false</code>                | 1.0.0 |
| **`width`**              | <code>number</code>                                           | The desired maximum width of the saved image. The aspect ratio is respected. Note: This option is only supported on Android and iOS.                                                                                                                                            |                                   | 1.0.0 |
| **`height`**             | <code>number</code>                                           | The desired maximum height of the saved image. The aspect ratio is respected. Note: This option is only supported on Android and iOS.                                                                                                                                           |                                   | 1.0.0 |
| **`correctOrientation`** | <code>boolean</code>                                          | Whether to automatically rotate the image "up" to correct for orientation in portrait mode. Note: This option is only supported on Android and iOS.                                                                                                                             | <code>true</code>                 | 1.0.0 |
| **`source`**             | <code><a href="#camerasource">CameraSource</a></code>         | The source to get the photo from. By default this prompts the user to select either the photo album or take a photo.                                                                                                                                                            | <code>CameraSource.Prompt</code>  | 1.0.0 |
| **`direction`**          | <code><a href="#cameradirection">CameraDirection</a></code>   | iOS and Web only: The camera direction.                                                                                                                                                                                                                                         | <code>CameraDirection.Rear</code> | 1.0.0 |
| **`presentationStyle`**  | <code>'fullscreen' \| 'popover'</code>                        | iOS only: The presentation style of the Camera.                                                                                                                                                                                                                                 | <code>'fullscreen'</code>         | 1.0.0 |
| **`webUseInput`**        | <code>boolean</code>                                          | Web only: Whether to use the PWA Element experience or file input. The default is to use PWA Elements if installed and fall back to file input. To always use file input, set this to `true`. Learn more about PWA Elements: https://capacitorjs.com/docs/web/pwa-elements      |                                   | 1.0.0 |
| **`promptLabelHeader`**  | <code>string</code>                                           | Text value to use when displaying the prompt.                                                                                                                                                                                                                                   | <code>'Photo'</code>              | 1.0.0 |
| **`promptLabelCancel`**  | <code>string</code>                                           | Text value to use when displaying the prompt. iOS only: The label of the 'cancel' button.                                                                                                                                                                                       | <code>'Cancel'</code>             | 1.0.0 |
| **`promptLabelPhoto`**   | <code>string</code>                                           | Text value to use when displaying the prompt. The label of the button to select a saved image.                                                                                                                                                                                  | <code>'From Photos'</code>        | 1.0.0 |
| **`promptLabelPicture`** | <code>string</code>                                           | Text value to use when displaying the prompt. The label of the button to open the camera.                                                                                                                                                                                       | <code>'Take Picture'</code>       | 1.0.0 |


#### GalleryImageOptions

| Prop                     | Type                                   | Description                                                                                                             | Default                    | Since |
| ------------------------ | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------- | ----- |
| **`quality`**            | <code>number</code>                    | The quality of image to return as JPEG, from 0-100 Note: This option is only supported on Android and iOS.              |                            | 1.2.0 |
| **`width`**              | <code>number</code>                    | The desired maximum width of the saved image. The aspect ratio is respected.                                            |                            | 1.2.0 |
| **`height`**             | <code>number</code>                    | The desired maximum height of the saved image. The aspect ratio is respected.                                           |                            | 1.2.0 |
| **`correctOrientation`** | <code>boolean</code>                   | Whether to automatically rotate the image "up" to correct for orientation in portrait mode                              | <code>true</code>          | 1.2.0 |
| **`presentationStyle`**  | <code>'fullscreen' \| 'popover'</code> | iOS only: The presentation style of the Camera.                                                                         | <code>'fullscreen'</code>  | 1.2.0 |
| **`limit`**              | <code>number</code>                    | Maximum number of pictures the user will be able to choose. Note: This option is only supported on Android 13+ and iOS. | <code>0 (unlimited)</code> | 1.2.0 |


### Type Aliases


#### CameraPermissionState

<code><a href="#permissionstate">PermissionState</a> | 'limited'</code>


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


#### CameraPermissionType

<code>'camera' | 'photos'</code>


### Enums


#### MediaType

| Members     | Value          |
| ----------- | -------------- |
| **`Photo`** | <code>0</code> |
| **`Video`** | <code>1</code> |


#### EncodingType

| Members    | Value          |
| ---------- | -------------- |
| **`JPEG`** | <code>0</code> |
| **`PNG`**  | <code>1</code> |


#### CameraDirection

| Members     | Value                |
| ----------- | -------------------- |
| **`Rear`**  | <code>'REAR'</code>  |
| **`Front`** | <code>'FRONT'</code> |


#### MediaTypeSelection

| Members     | Value          |
| ----------- | -------------- |
| **`Photo`** | <code>0</code> |
| **`Video`** | <code>1</code> |
| **`All`**   | <code>2</code> |


#### CameraResultType

| Members       | Value                  |
| ------------- | ---------------------- |
| **`Uri`**     | <code>'uri'</code>     |
| **`Base64`**  | <code>'base64'</code>  |
| **`DataUrl`** | <code>'dataUrl'</code> |


#### CameraSource

| Members      | Value                 | Description                                                        |
| ------------ | --------------------- | ------------------------------------------------------------------ |
| **`Prompt`** | <code>'PROMPT'</code> | Prompts the user to select either the photo album or take a photo. |
| **`Camera`** | <code>'CAMERA'</code> | Take a new photo using the camera.                                 |
| **`Photos`** | <code>'PHOTOS'</code> | Pick an existing photo from the gallery or photo album.            |

</docgen-api>

### Errors

The plugin returns structured errors on Android and iOS. Each error has a `code` (e.g. `OS-PLUG-CAMR-0003`) and a `message` with a human-readable description. Note that these are only available for native platforms starting on the new APIs introduced in version `8.1.0`: `takePhoto`, `chooseFromGallery`, `editPhoto`, `editURIPhoto`, `recordVideo`, and `playVideo`.

| Error code | Platform(s) | Description |
|---|---|---|
| OS-PLUG-CAMR-0003 | Android, iOS | Couldn't access camera. Check your camera permissions and try again. |
| OS-PLUG-CAMR-0005 | Android, iOS | Couldn't access your photo gallery because access wasn't provided. |
| OS-PLUG-CAMR-0006 | Android, iOS | Couldn't take photo because the process was canceled. |
| OS-PLUG-CAMR-0007 | Android, iOS | No camera available. |
| OS-PLUG-CAMR-0008 | iOS | The selected file contains data that isn't valid. |
| OS-PLUG-CAMR-0009 | Android, iOS | Couldn't edit image. |
| OS-PLUG-CAMR-0010 | Android, iOS | Couldn't take photo. |
| OS-PLUG-CAMR-0011 | iOS | Couldn't get image from the gallery. |
| OS-PLUG-CAMR-0012 | Android, iOS | Couldn't process image. |
| OS-PLUG-CAMR-0013 | Android, iOS | Couldn't edit photo because the process was canceled. |
| OS-PLUG-CAMR-0014 | iOS | Couldn't decode the 'Take Photo' action parameters. |
| OS-PLUG-CAMR-0016 | Android, iOS | Couldn't record video. |
| OS-PLUG-CAMR-0017 | Android, iOS | Couldn't record video because the process was canceled. |
| OS-PLUG-CAMR-0018 | Android, iOS | Couldn't choose media from the gallery. |
| OS-PLUG-CAMR-0019 | iOS | Couldn't encode the media result. |
| OS-PLUG-CAMR-0020 | Android, iOS | Couldn't choose media from the gallery because the process was canceled. |
| OS-PLUG-CAMR-0021 | Android | Couldn't get media file path. |
| OS-PLUG-CAMR-0023 | Android, iOS | Couldn't play video. |
| OS-PLUG-CAMR-0024 | Android | URI parameter cannot be empty. |
| OS-PLUG-CAMR-0025 | iOS | Couldn't get video from the gallery. |
| OS-PLUG-CAMR-0026 | iOS | There's an issue with the plugin. |
| OS-PLUG-CAMR-0027 | Android, iOS | The selected file doesn't exist. |
| OS-PLUG-CAMR-0028 | Android, iOS | Couldn't retrieve image from the URI. |
| OS-PLUG-CAMR-0031 | Android | Invalid argument provided to plugin method. |
| OS-PLUG-CAMR-0033 | Android | Unable to get the context. |