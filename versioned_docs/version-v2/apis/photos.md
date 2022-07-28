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
| **`options`** | <code><a href="#photosfetchoptions">PhotosFetchOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#photosresult">PhotosResult</a>&gt;</code>

---

### getAlbums(...)

```typescript
getAlbums(options?: PhotosAlbumsFetchOptions) => Promise<PhotosAlbumsResult>
```

Get albums from the user's photo library

| Param         | Type                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#photosalbumsfetchoptions">PhotosAlbumsFetchOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#photosalbumsresult">PhotosAlbumsResult</a>&gt;</code>

---

### savePhoto(...)

```typescript
savePhoto(options?: PhotosSaveOptions) => Promise<PhotosSaveResult>
```

Save a photo the the user's photo library

| Param         | Type                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#photossaveoptions">PhotosSaveOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#photossaveresult">PhotosSaveResult</a>&gt;</code>

---

### createAlbum(...)

```typescript
createAlbum(options: PhotosCreateAlbumOptions) => Promise<void>
```

Create an album in the user's photo library

| Param         | Type                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#photoscreatealbumoptions">PhotosCreateAlbumOptions</a></code> |

---

### Interfaces

#### PhotosResult

| Prop         | Type                      | Description                                  |
| ------------ | ------------------------- | -------------------------------------------- |
| **`photos`** | <code>PhotoAsset[]</code> | The list of photos returned from the library |

#### PhotoAsset

| Prop                  | Type                                                    | Description                                                             |
| --------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------- |
| **`identifier`**      | <code>string</code>                                     | Platform-specific identifier                                            |
| **`data`**            | <code>string</code>                                     | Data for a photo asset as a base64 encoded string (JPEG only supported) |
| **`creationDate`**    | <code>string</code>                                     | ISO date string for creation date of asset                              |
| **`fullWidth`**       | <code>number</code>                                     | Full width of original asset                                            |
| **`fullHeight`**      | <code>number</code>                                     | Full height of original asset                                           |
| **`thumbnailWidth`**  | <code>number</code>                                     | Width of thumbnail preview                                              |
| **`thumbnailHeight`** | <code>number</code>                                     | Height of thumbnail preview                                             |
| **`location`**        | <code><a href="#photolocation">PhotoLocation</a></code> | Location metadata for the asset                                         |

#### PhotoLocation

| Prop            | Type                | Description                              |
| --------------- | ------------------- | ---------------------------------------- |
| **`latitude`**  | <code>number</code> | GPS latitude image was taken at          |
| **`longitude`** | <code>number</code> | GPS longitude image was taken at         |
| **`heading`**   | <code>number</code> | Heading of user at time image was taken  |
| **`altitude`**  | <code>number</code> | Altitude of user at time image was taken |
| **`speed`**     | <code>number</code> | Speed of user at time image was taken    |

#### PhotosFetchOptions

| Prop                   | Type                | Description                                                           |
| ---------------------- | ------------------- | --------------------------------------------------------------------- |
| **`quantity`**         | <code>number</code> | The number of photos to fetch, sorted by last created date descending |
| **`thumbnailWidth`**   | <code>number</code> | The width of thumbnail to return                                      |
| **`thumbnailHeight`**  | <code>number</code> | The height of thumbnail to return                                     |
| **`thumbnailQuality`** | <code>number</code> | The quality of thumbnail to return as JPEG (0-100)                    |
| **`types`**            | <code>string</code> | Which types of assets to return (currently only supports "photos")    |
| **`albumIdentifier`**  | <code>string</code> | Which album identifier to query in (get identifier with getAlbums())  |

#### PhotosAlbumsResult

| Prop         | Type                       | Description                                |
| ------------ | -------------------------- | ------------------------------------------ |
| **`albums`** | <code>PhotosAlbum[]</code> | The list of albums returned from the query |

#### PhotosAlbum

| Prop             | Type                                                        | Description                    |
| ---------------- | ----------------------------------------------------------- | ------------------------------ |
| **`identifier`** | <code>string</code>                                         | Local identifier for the album |
| **`name`**       | <code>string</code>                                         | Name of the album              |
| **`count`**      | <code>number</code>                                         | Number of items in the album   |
| **`type`**       | <code><a href="#photosalbumtype">PhotosAlbumType</a></code> | The type of album              |

#### PhotosAlbumsFetchOptions

| Prop             | Type                 | Description                         |
| ---------------- | -------------------- | ----------------------------------- |
| **`loadShared`** | <code>boolean</code> | Whether to load cloud shared albums |

#### PhotosSaveResult

| Prop          | Type                 | Description                   |
| ------------- | -------------------- | ----------------------------- |
| **`success`** | <code>boolean</code> | Whether the photo was created |

#### PhotosSaveOptions

| Prop                  | Type                | Description                                                                           |
| --------------------- | ------------------- | ------------------------------------------------------------------------------------- |
| **`data`**            | <code>string</code> | The base64-encoded JPEG data for a photo (note: do not add HTML data-uri type prefix) |
| **`albumIdentifier`** | <code>string</code> | The optional album identifier to save this photo in                                   |

#### PhotosCreateAlbumOptions

| Prop       | Type                |
| ---------- | ------------------- |
| **`name`** | <code>string</code> |

### Enums

#### PhotosAlbumType

| Members      | Value                 | Description                                                    |
| ------------ | --------------------- | -------------------------------------------------------------- |
| **`Smart`**  | <code>"smart"</code>  | Album is a "smart" album (such as Favorites or Recently Added) |
| **`Shared`** | <code>"shared"</code> | Album is a cloud-shared album                                  |
| **`User`**   | <code>"user"</code>   | Album is a user-created album                                  |
