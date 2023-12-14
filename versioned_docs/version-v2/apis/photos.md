---
title: Photos
description: Photos API
contributors:
  - mlynch
  - jcesarmobile
---

<plugin-platforms platforms="ios,android"></plugin-platforms>

The Photos API provides methods to load photos and albums from the user's photo library, along with saving photos.

## API

### getPhotos(...)

```typescript
getPhotos(options?: PhotosFetchOptions) => Promise<PhotosResult>
```

Get photos from the user's photo library

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | `<a href="#photosfetchoptions">PhotosFetchOptions</a>` |

**Returns:** `Promise&lt;<a href="#photosresult">PhotosResult</a>&gt;`

---

### getAlbums(...)

```typescript
getAlbums(options?: PhotosAlbumsFetchOptions) => Promise<PhotosAlbumsResult>
```

Get albums from the user's photo library

| Param         | Type                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | `<a href="#photosalbumsfetchoptions">PhotosAlbumsFetchOptions</a>` |

**Returns:** `Promise&lt;<a href="#photosalbumsresult">PhotosAlbumsResult</a>&gt;`

---

### savePhoto(...)

```typescript
savePhoto(options?: PhotosSaveOptions) => Promise<PhotosSaveResult>
```

Save a photo the the user's photo library

| Param         | Type                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | `<a href="#photossaveoptions">PhotosSaveOptions</a>` |

**Returns:** `Promise&lt;<a href="#photossaveresult">PhotosSaveResult</a>&gt;`

---

### createAlbum(...)

```typescript
createAlbum(options: PhotosCreateAlbumOptions) => Promise<void>
```

Create an album in the user's photo library

| Param         | Type                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | `<a href="#photoscreatealbumoptions">PhotosCreateAlbumOptions</a>` |

---

### Interfaces

#### PhotosResult

| Prop         | Type                      | Description                                  |
| ------------ | ------------------------- | -------------------------------------------- |
| **`photos`** | `PhotoAsset[]` | The list of photos returned from the library |

#### PhotoAsset

| Prop                  | Type                                                    | Description                                                             |
| --------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------- |
| **`identifier`**      | `string`                                     | Platform-specific identifier                                            |
| **`data`**            | `string`                                     | Data for a photo asset as a base64 encoded string (JPEG only supported) |
| **`creationDate`**    | `string`                                     | ISO date string for creation date of asset                              |
| **`fullWidth`**       | `number`                                     | Full width of original asset                                            |
| **`fullHeight`**      | `number`                                     | Full height of original asset                                           |
| **`thumbnailWidth`**  | `number`                                     | Width of thumbnail preview                                              |
| **`thumbnailHeight`** | `number`                                     | Height of thumbnail preview                                             |
| **`location`**        | `<a href="#photolocation">PhotoLocation</a>` | Location metadata for the asset                                         |

#### PhotoLocation

| Prop            | Type                | Description                              |
| --------------- | ------------------- | ---------------------------------------- |
| **`latitude`**  | `number` | GPS latitude image was taken at          |
| **`longitude`** | `number` | GPS longitude image was taken at         |
| **`heading`**   | `number` | Heading of user at time image was taken  |
| **`altitude`**  | `number` | Altitude of user at time image was taken |
| **`speed`**     | `number` | Speed of user at time image was taken    |

#### PhotosFetchOptions

| Prop                   | Type                | Description                                                           |
| ---------------------- | ------------------- | --------------------------------------------------------------------- |
| **`quantity`**         | `number` | The number of photos to fetch, sorted by last created date descending |
| **`thumbnailWidth`**   | `number` | The width of thumbnail to return                                      |
| **`thumbnailHeight`**  | `number` | The height of thumbnail to return                                     |
| **`thumbnailQuality`** | `number` | The quality of thumbnail to return as JPEG (0-100)                    |
| **`types`**            | `string` | Which types of assets to return (currently only supports "photos")    |
| **`albumIdentifier`**  | `string` | Which album identifier to query in (get identifier with getAlbums())  |

#### PhotosAlbumsResult

| Prop         | Type                       | Description                                |
| ------------ | -------------------------- | ------------------------------------------ |
| **`albums`** | `PhotosAlbum[]` | The list of albums returned from the query |

#### PhotosAlbum

| Prop             | Type                                                        | Description                    |
| ---------------- | ----------------------------------------------------------- | ------------------------------ |
| **`identifier`** | `string`                                         | Local identifier for the album |
| **`name`**       | `string`                                         | Name of the album              |
| **`count`**      | `number`                                         | Number of items in the album   |
| **`type`**       | `<a href="#photosalbumtype">PhotosAlbumType</a>` | The type of album              |

#### PhotosAlbumsFetchOptions

| Prop             | Type                 | Description                         |
| ---------------- | -------------------- | ----------------------------------- |
| **`loadShared`** | `boolean` | Whether to load cloud shared albums |

#### PhotosSaveResult

| Prop          | Type                 | Description                   |
| ------------- | -------------------- | ----------------------------- |
| **`success`** | `boolean` | Whether the photo was created |

#### PhotosSaveOptions

| Prop                  | Type                | Description                                                                           |
| --------------------- | ------------------- | ------------------------------------------------------------------------------------- |
| **`data`**            | `string` | The base64-encoded JPEG data for a photo (note: do not add HTML data-uri type prefix) |
| **`albumIdentifier`** | `string` | The optional album identifier to save this photo in                                   |

#### PhotosCreateAlbumOptions

| Prop       | Type                |
| ---------- | ------------------- |
| **`name`** | `string` |

### Enums

#### PhotosAlbumType

| Members      | Value                 | Description                                                    |
| ------------ | --------------------- | -------------------------------------------------------------- |
| **`Smart`**  | `"smart"`  | Album is a "smart" album (such as Favorites or Recently Added) |
| **`Shared`** | `"shared"` | Album is a cloud-shared album                                  |
| **`User`**   | `"user"`   | Album is a user-created album                                  |
