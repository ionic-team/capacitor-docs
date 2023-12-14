---
title: Google Maps Capacitor Plugin API
description: Google maps on Capacitor
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/google-maps/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/5.x/google-maps/src/definitions.ts
sidebar_label: Google Maps
---

# @capacitor/google-maps

Google maps on Capacitor

## Install

```bash
npm install @capacitor/google-maps
npx cap sync
```

## API Keys

To use the Google Maps SDK on any platform, API keys associated with an account _with billing enabled_ are required. These can be obtained from the [Google Cloud Console](https://console.cloud.google.com). This is required for all three platforms, Android, iOS, and Javascript. Additional information about obtaining these API keys can be found in the [Google Maps documentation](https://developers.google.com/maps/documentation/android-sdk/overview) for each platform.

## iOS

The Google Maps SDK supports the use of showing the users current location via `enableCurrentLocation(bool)`. To use this, Apple requires privacy descriptions to be specified in `Info.plist`:

- `NSLocationAlwaysUsageDescription` (`Privacy - Location Always Usage Description`)
- `NSLocationWhenInUseUsageDescription` (`Privacy - Location When In Use Usage Description`)

Read about [Configuring `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) in the [iOS Guide](https://capacitorjs.com/docs/ios) for more information on setting iOS permissions in Xcode.

> The main Google Maps SDK now supports running on simulators on Apple Silicon Macs, but make sure you have the latest version of [Google-Maps-iOS-Utils](https://github.com/googlemaps/google-maps-ios-utils) installed.

If you added the previous workaround for getting the unreleased version, you can delete it now by removing this line from `ios/App/Podfile`:

```
pod 'Google-Maps-iOS-Utils', :git => 'https://github.com/googlemaps/google-maps-ios-utils.git', :commit => '637954e5bcb2a879c11a6f2cead153a6bad5339f'
```

Then run `pod update Google-Maps-iOS-Utils` from the `ios/App/` folder:

```
cd ios/App
pod update Google-Maps-iOS-Utils
```

## Android

The Google Maps SDK for Android requires you to add your API key to the AndroidManifest.xml file in your project.

```xml
<meta-data android:name="com.google.android.geo.API_KEY" android:value="YOUR_API_KEY_HERE"/>
```

To use certain location features, the SDK requires the following permissions to also be added to your AndroidManifest.xml:

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### Variables

This plugin will use the following project variables (defined in your app's `variables.gradle` file):

- `googleMapsPlayServicesVersion`: version of `com.google.android.gms:play-services-maps` (default: `18.1.0`)
- `googleMapsUtilsVersion`: version of `com.google.maps.android:android-maps-utils` (default: `3.4.0`)
- `googleMapsKtxVersion`: version of `com.google.maps.android:maps-ktx` (default: `3.4.0`)
- `googleMapsUtilsKtxVersion`: version of `com.google.maps.android:maps-utils-ktx` (default: `3.4.0`)
- `kotlinxCoroutinesVersion`: version of `org.jetbrains.kotlinx:kotlinx-coroutines-android` and `org.jetbrains.kotlinx:kotlinx-coroutines-core` (default: `1.6.4`)
- `androidxCoreKTXVersion`: version of `androidx.core:core-ktx` (default: `1.10.0`)
- `kotlin_version`: version of `org.jetbrains.kotlin:kotlin-stdlib` (default: `1.8.20`)


## Usage

The Google Maps Capacitor plugin ships with a web component that must be used to render the map in your application as it enables us to embed the native view more effectively on iOS. The plugin will automatically register this web component for use in your application.

> For Angular users, you will get an error warning that this web component is unknown to the Angular compiler. This is resolved by modifying the module that declares your component to allow for custom web components.
>
> ```typescript
> import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
>
> @NgModule({
>   schemas: [CUSTOM_ELEMENTS_SCHEMA]
> })
> ```

Include this component in your HTML and assign it an ID so that you can easily query for that element reference later.

```html
<capacitor-google-map id="map"></capacitor-google-map>
```

> On Android, the map is rendered beneath the entire webview, and uses this component to manage its positioning during scrolling events. This means that as the developer, you _must_ ensure that the webview is transparent all the way through the layers to the very bottom. In a typically Ionic application, that means setting transparency on elements such as IonContent and the root HTML tag to ensure that it can be seen. If you can't see your map on Android, this should be the first thing you check.
>
> On iOS, we render the map directly into the webview and so the same transparency effects are not required. We are investigating alternate methods for Android still and hope to resolve this better in a future update.

The Google Map element itself comes unstyled, so you should style it to fit within the layout of your page structure. Because we're rendering a view into this slot, by itself the element has no width or height, so be sure to set those explicitly.

```css
capacitor-google-map {
  display: inline-block;
  width: 275px;
  height: 400px;
}
```

Next, we should create the map reference. This is done by importing the GoogleMap class from the Capacitor plugin and calling the create method, and passing in the required parameters.

```typescript
import { GoogleMap } from '@capacitor/google-maps';

const apiKey = 'YOUR_API_KEY_HERE';

const mapRef = document.getElementById('map');

const newMap = await GoogleMap.create({
  id: 'my-map', // Unique identifier for this map instance
  element: mapRef, // reference to the capacitor-google-map element
  apiKey: apiKey, // Your Google Maps API Key
  config: {
    center: {
      // The initial position to be rendered by the map
      lat: 33.6,
      lng: -117.9,
    },
    zoom: 8, // The initial zoom level to be rendered by the map
  },
});
```

At this point, your map should be created within your application. Using the returned reference to the map, you can easily interact with your map in a number of way, a few of which are shown here.

```typescript
const newMap = await GoogleMap.create({...});

// Add a marker to the map
const markerId = await newMap.addMarker({
  coordinate: {
    lat: 33.6,
    lng: -117.9
  }
});

// Move the map programmatically
await newMap.setCamera({
  coordinate: {
    lat: 33.6,
    lng: -117.9
  }
});

// Enable marker clustering
await newMap.enableClustering();

// Handle marker click
await newMap.setOnMarkerClickListener((event) => {...});

// Clean up map reference
await newMap.destroy();
```

## Full Examples

### Angular

```typescript
import { GoogleMap } from '@capacitor/google-maps';

@Component({
  template: `
    <capacitor-google-map #map></capacitor-google-map>
    <button (click)="createMap()">Create Map</button>
  `,
  styles: [
    `
      capacitor-google-map {
        display: inline-block;
        width: 275px;
        height: 400px;
      }
    `,
  ],
})
export class MyMap {
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.apiKey,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });
  }
}
```

### React

```jsx
import { GoogleMap } from '@capacitor/google-maps';
import { useRef } from 'react';

const MyMap: React.FC = () => {
  const mapRef = useRef<HTMLElement>();
  let newMap: GoogleMap;

  async function createMap() {
    if (!mapRef.current) return;

    newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: mapRef.current,
      apiKey: process.env.REACT_APP_YOUR_API_KEY_HERE,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9
        },
        zoom: 8
      }
    })
  }

  return (
    <div className="component-wrapper">
      <capacitor-google-map ref={mapRef} style={{
        display: 'inline-block',
        width: 275,
        height: 400
      }}></capacitor-google-map>

      <button onClick={createMap}>Create Map</button>
    </div>
  )
}

export default MyMap;
```

### Javascript

```html
<capacitor-google-map id="map"></capacitor-google-map>
<button onclick="createMap()">Create Map</button>

<style>
  capacitor-google-map {
    display: inline-block;
    width: 275px;
    height: 400px;
  }
</style>

<script>
  import { GoogleMap } from '@capacitor/google-maps';

  const createMap = async () => {
    const mapRef = document.getElementById('map');

    const newMap = await GoogleMap.create({
      id: 'my-map', // Unique identifier for this map instance
      element: mapRef, // reference to the capacitor-google-map element
      apiKey: 'YOUR_API_KEY_HERE', // Your Google Maps API Key
      config: {
        center: {
          // The initial position to be rendered by the map
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8, // The initial zoom level to be rendered by the map
      },
    });
  };
</script>
```

## API

<docgen-index>

* [`create(...)`](#create)
* [`enableTouch()`](#enabletouch)
* [`disableTouch()`](#disabletouch)
* [`enableClustering(...)`](#enableclustering)
* [`disableClustering()`](#disableclustering)
* [`addMarker(...)`](#addmarker)
* [`addMarkers(...)`](#addmarkers)
* [`removeMarker(...)`](#removemarker)
* [`removeMarkers(...)`](#removemarkers)
* [`addPolygons(...)`](#addpolygons)
* [`removePolygons(...)`](#removepolygons)
* [`addCircles(...)`](#addcircles)
* [`removeCircles(...)`](#removecircles)
* [`addPolylines(...)`](#addpolylines)
* [`removePolylines(...)`](#removepolylines)
* [`destroy()`](#destroy)
* [`setCamera(...)`](#setcamera)
* [`getMapType()`](#getmaptype)
* [`setMapType(...)`](#setmaptype)
* [`enableIndoorMaps(...)`](#enableindoormaps)
* [`enableTrafficLayer(...)`](#enabletrafficlayer)
* [`enableAccessibilityElements(...)`](#enableaccessibilityelements)
* [`enableCurrentLocation(...)`](#enablecurrentlocation)
* [`setPadding(...)`](#setpadding)
* [`fitBounds(...)`](#fitbounds)
* [`setOnBoundsChangedListener(...)`](#setonboundschangedlistener)
* [`setOnCameraIdleListener(...)`](#setoncameraidlelistener)
* [`setOnCameraMoveStartedListener(...)`](#setoncameramovestartedlistener)
* [`setOnClusterClickListener(...)`](#setonclusterclicklistener)
* [`setOnClusterInfoWindowClickListener(...)`](#setonclusterinfowindowclicklistener)
* [`setOnInfoWindowClickListener(...)`](#setoninfowindowclicklistener)
* [`setOnMapClickListener(...)`](#setonmapclicklistener)
* [`setOnMarkerClickListener(...)`](#setonmarkerclicklistener)
* [`setOnPolygonClickListener(...)`](#setonpolygonclicklistener)
* [`setOnCircleClickListener(...)`](#setoncircleclicklistener)
* [`setOnPolylineClickListener(...)`](#setonpolylineclicklistener)
* [`setOnMarkerDragStartListener(...)`](#setonmarkerdragstartlistener)
* [`setOnMarkerDragListener(...)`](#setonmarkerdraglistener)
* [`setOnMarkerDragEndListener(...)`](#setonmarkerdragendlistener)
* [`setOnMyLocationButtonClickListener(...)`](#setonmylocationbuttonclicklistener)
* [`setOnMyLocationClickListener(...)`](#setonmylocationclicklistener)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

<docgen-api>


### create(...)

```typescript
create(options: CreateMapArgs, callback?: MapListenerCallback<MapReadyCallbackData> | undefined) => Promise<GoogleMap>
```

| Param          | Type                                                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`options`**  | `<a href="#createmapargs">CreateMapArgs</a>`                                                                             |
| **`callback`** | `<a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapreadycallbackdata">MapReadyCallbackData</a>&gt;` |

**Returns:** `Promise&lt;GoogleMap&gt;`

--------------------


### enableTouch()

```typescript
enableTouch() => Promise<void>
```

--------------------


### disableTouch()

```typescript
disableTouch() => Promise<void>
```

--------------------


### enableClustering(...)

```typescript
enableClustering(minClusterSize?: number | undefined) => Promise<void>
```

| Param                | Type                | Description                                                                             |
| -------------------- | ------------------- | --------------------------------------------------------------------------------------- |
| **`minClusterSize`** | `number` | The minimum number of markers that can be clustered together. The default is 4 markers. |

--------------------


### disableClustering()

```typescript
disableClustering() => Promise<void>
```

--------------------


### addMarker(...)

```typescript
addMarker(marker: Marker) => Promise<string>
```

| Param        | Type                                      |
| ------------ | ----------------------------------------- |
| **`marker`** | `<a href="#marker">Marker</a>` |

**Returns:** `Promise&lt;string&gt;`

--------------------


### addMarkers(...)

```typescript
addMarkers(markers: Marker[]) => Promise<string[]>
```

| Param         | Type                  |
| ------------- | --------------------- |
| **`markers`** | `Marker[]` |

**Returns:** `Promise&lt;string[]&gt;`

--------------------


### removeMarker(...)

```typescript
removeMarker(id: string) => Promise<void>
```

| Param    | Type                |
| -------- | ------------------- |
| **`id`** | `string` |

--------------------


### removeMarkers(...)

```typescript
removeMarkers(ids: string[]) => Promise<void>
```

| Param     | Type                  |
| --------- | --------------------- |
| **`ids`** | `string[]` |

--------------------


### addPolygons(...)

```typescript
addPolygons(polygons: Polygon[]) => Promise<string[]>
```

| Param          | Type                   |
| -------------- | ---------------------- |
| **`polygons`** | `Polygon[]` |

**Returns:** `Promise&lt;string[]&gt;`

--------------------


### removePolygons(...)

```typescript
removePolygons(ids: string[]) => Promise<void>
```

| Param     | Type                  |
| --------- | --------------------- |
| **`ids`** | `string[]` |

--------------------


### addCircles(...)

```typescript
addCircles(circles: Circle[]) => Promise<string[]>
```

| Param         | Type                  |
| ------------- | --------------------- |
| **`circles`** | `Circle[]` |

**Returns:** `Promise&lt;string[]&gt;`

--------------------


### removeCircles(...)

```typescript
removeCircles(ids: string[]) => Promise<void>
```

| Param     | Type                  |
| --------- | --------------------- |
| **`ids`** | `string[]` |

--------------------


### addPolylines(...)

```typescript
addPolylines(polylines: Polyline[]) => Promise<string[]>
```

| Param           | Type                    |
| --------------- | ----------------------- |
| **`polylines`** | `Polyline[]` |

**Returns:** `Promise&lt;string[]&gt;`

--------------------


### removePolylines(...)

```typescript
removePolylines(ids: string[]) => Promise<void>
```

| Param     | Type                  |
| --------- | --------------------- |
| **`ids`** | `string[]` |

--------------------


### destroy()

```typescript
destroy() => Promise<void>
```

--------------------


### setCamera(...)

```typescript
setCamera(config: CameraConfig) => Promise<void>
```

| Param        | Type                                                  |
| ------------ | ----------------------------------------------------- |
| **`config`** | `<a href="#cameraconfig">CameraConfig</a>` |

--------------------


### getMapType()

```typescript
getMapType() => Promise<MapType>
```

Get current map type

**Returns:** `Promise&lt;<a href="#maptype">MapType</a>&gt;`

--------------------


### setMapType(...)

```typescript
setMapType(mapType: MapType) => Promise<void>
```

| Param         | Type                                        |
| ------------- | ------------------------------------------- |
| **`mapType`** | `<a href="#maptype">MapType</a>` |

--------------------


### enableIndoorMaps(...)

```typescript
enableIndoorMaps(enabled: boolean) => Promise<void>
```

| Param         | Type                 |
| ------------- | -------------------- |
| **`enabled`** | `boolean` |

--------------------


### enableTrafficLayer(...)

```typescript
enableTrafficLayer(enabled: boolean) => Promise<void>
```

| Param         | Type                 |
| ------------- | -------------------- |
| **`enabled`** | `boolean` |

--------------------


### enableAccessibilityElements(...)

```typescript
enableAccessibilityElements(enabled: boolean) => Promise<void>
```

| Param         | Type                 |
| ------------- | -------------------- |
| **`enabled`** | `boolean` |

--------------------


### enableCurrentLocation(...)

```typescript
enableCurrentLocation(enabled: boolean) => Promise<void>
```

| Param         | Type                 |
| ------------- | -------------------- |
| **`enabled`** | `boolean` |

--------------------


### setPadding(...)

```typescript
setPadding(padding: MapPadding) => Promise<void>
```

| Param         | Type                                              |
| ------------- | ------------------------------------------------- |
| **`padding`** | `<a href="#mappadding">MapPadding</a>` |

--------------------


### fitBounds(...)

```typescript
fitBounds(bounds: LatLngBounds, padding?: number | undefined) => Promise<void>
```

Sets the map viewport to contain the given bounds.

| Param         | Type                      | Description                                                                                                               |
| ------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **`bounds`**  | `LatLngBounds` | The bounds to fit in the viewport.                                                                                        |
| **`padding`** | `number`       | Optional padding to apply in pixels. The bounds will be fit in the part of the map that remains after padding is removed. |

--------------------


### setOnBoundsChangedListener(...)

```typescript
setOnBoundsChangedListener(callback?: MapListenerCallback<CameraIdleCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                    |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | `<a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameraidlecallbackdata">CameraIdleCallbackData</a>&gt;` |

--------------------


### setOnCameraIdleListener(...)

```typescript
setOnCameraIdleListener(callback?: MapListenerCallback<CameraIdleCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                    |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | `<a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameraidlecallbackdata">CameraIdleCallbackData</a>&gt;` |

--------------------


### setOnCameraMoveStartedListener(...)

```typescript
setOnCameraMoveStartedListener(callback?: MapListenerCallback<CameraMoveStartedCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                                  |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | `<a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#cameramovestartedcallbackdata">CameraMoveStartedCallbackData</a>&gt;` |

--------------------


### setOnClusterClickListener(...)

```typescript
setOnClusterClickListener(callback?: MapListenerCallback<ClusterClickCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | `<a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#clusterclickcallbackdata">ClusterClickCallbackData</a>&gt;` |

--------------------


### setOnClusterInfoWindowClickListener(...)

```typescript
setOnClusterInfoWindowClickListener(callback?: MapListenerCallback<ClusterClickCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | `<a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#clusterclickcallbackdata">ClusterClickCallbackData</a>&gt;` |

--------------------


### setOnInfoWindowClickListener(...)

```typescript
setOnInfoWindowClickListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | `<a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;` |

--------------------


### setOnMapClickListener(...)

```typescript
setOnMapClickListener(callback?: MapListenerCallback<MapClickCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | `<a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapclickcallbackdata">MapClickCallbackData</a>&gt;` |

--------------------


### setOnMarkerClickListener(...)

```typescript
setOnMarkerClickListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | `<a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;` |

--------------------


### setOnPolygonClickListener(...)

```typescript
setOnPolygonClickListener(callback?: MapListenerCallback<PolygonClickCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | `<a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#polygonclickcallbackdata">PolygonClickCallbackData</a>&gt;` |

--------------------


### setOnCircleClickListener(...)

```typescript
setOnCircleClickListener(callback?: MapListenerCallback<CircleClickCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | `<a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#circleclickcallbackdata">CircleClickCallbackData</a>&gt;` |

--------------------


### setOnPolylineClickListener(...)

```typescript
setOnPolylineClickListener(callback?: MapListenerCallback<PolylineCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | `<a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#polylinecallbackdata">PolylineCallbackData</a>&gt;` |

--------------------


### setOnMarkerDragStartListener(...)

```typescript
setOnMarkerDragStartListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | `<a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;` |

--------------------


### setOnMarkerDragListener(...)

```typescript
setOnMarkerDragListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | `<a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;` |

--------------------


### setOnMarkerDragEndListener(...)

```typescript
setOnMarkerDragEndListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | `<a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#markerclickcallbackdata">MarkerClickCallbackData</a>&gt;` |

--------------------


### setOnMyLocationButtonClickListener(...)

```typescript
setOnMyLocationButtonClickListener(callback?: MapListenerCallback<MyLocationButtonClickCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | `<a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mylocationbuttonclickcallbackdata">MyLocationButtonClickCallbackData</a>&gt;` |

--------------------


### setOnMyLocationClickListener(...)

```typescript
setOnMyLocationClickListener(callback?: MapListenerCallback<MapClickCallbackData> | undefined) => Promise<void>
```

| Param          | Type                                                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`callback`** | `<a href="#maplistenercallback">MapListenerCallback</a>&lt;<a href="#mapclickcallbackdata">MapClickCallbackData</a>&gt;` |

--------------------


### Interfaces


#### CreateMapArgs

An interface containing the options used when creating a map.

| Prop              | Type                                                        | Description                                                                                                                                                                            | Default            |
| ----------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **`id`**          | `string`                                         | A unique identifier for the map instance.                                                                                                                                              |                    |
| **`apiKey`**      | `string`                                         | The Google Maps SDK API Key.                                                                                                                                                           |                    |
| **`config`**      | `<a href="#googlemapconfig">GoogleMapConfig</a>` | The initial configuration settings for the map.                                                                                                                                        |                    |
| **`element`**     | `HTMLElement`                                    | The DOM element that the Google Map View will be mounted on which determines size and positioning.                                                                                     |                    |
| **`forceCreate`** | `boolean`                                        | Destroy and re-create the map instance if a map with the supplied id already exists                                                                                                    | `false` |
| **`region`**      | `string`                                         | The region parameter alters your application to serve different map tiles or bias the application (such as biasing geocoding results towards the region). Only available for web.      |                    |
| **`language`**    | `string`                                         | The language parameter affects the names of controls, copyright notices, driving directions, and control labels, as well as the responses to service requests. Only available for web. |                    |


#### GoogleMapConfig

For web, all the javascript Google Maps options are available as
GoogleMapConfig extends google.maps.MapOptions.
For iOS and Android only the config options declared on <a href="#googlemapconfig">GoogleMapConfig</a> are available.

| Prop                   | Type                                      | Description                                                                                                                                               | Default            | Since |
| ---------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`width`**            | `number`                       | Override width for native map.                                                                                                                            |                    |       |
| **`height`**           | `number`                       | Override height for native map.                                                                                                                           |                    |       |
| **`x`**                | `number`                       | Override absolute x coordinate position for native map.                                                                                                   |                    |       |
| **`y`**                | `number`                       | Override absolute y coordinate position for native map.                                                                                                   |                    |       |
| **`center`**           | `<a href="#latlng">LatLng</a>` | Default location on the Earth towards which the camera points.                                                                                            |                    |       |
| **`zoom`**             | `number`                       | Sets the zoom of the map.                                                                                                                                 |                    |       |
| **`androidLiteMode`**  | `boolean`                      | Enables image-based lite mode on Android.                                                                                                                 | `false` |       |
| **`devicePixelRatio`** | `number`                       | Override pixel ratio for native map.                                                                                                                      |                    |       |
| **`styles`**           | `MapTypeStyle[] \| null`       | Styles to apply to each of the default map types. Note that for satellite, hybrid and terrain modes, these styles will only apply to labels and geometry. |                    | 4.3.0 |


#### LatLng

An interface representing a pair of latitude and longitude coordinates.

| Prop      | Type                | Description                                                               |
| --------- | ------------------- | ------------------------------------------------------------------------- |
| **`lat`** | `number` | Coordinate latitude, in degrees. This value is in the range [-90, 90].    |
| **`lng`** | `number` | Coordinate longitude, in degrees. This value is in the range [-180, 180]. |


#### MapReadyCallbackData

| Prop        | Type                |
| ----------- | ------------------- |
| **`mapId`** | `string` |


#### Marker

A marker is an icon placed at a particular point on the map's surface.

| Prop             | Type                                                         | Description                                                                                                                                                                               | Default            | Since |
| ---------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| **`coordinate`** | `<a href="#latlng">LatLng</a>`                    | <a href="#marker">Marker</a> position                                                                                                                                                     |                    |       |
| **`opacity`**    | `number`                                          | Sets the opacity of the marker, between 0 (completely transparent) and 1 inclusive.                                                                                                       | `1`     |       |
| **`title`**      | `string`                                          | Title, a short description of the overlay.                                                                                                                                                |                    |       |
| **`snippet`**    | `string`                                          | Snippet text, shown beneath the title in the info window when selected.                                                                                                                   |                    |       |
| **`isFlat`**     | `boolean`                                         | Controls whether this marker should be flat against the Earth's surface or a billboard facing the camera.                                                                                 | `false` |       |
| **`iconUrl`**    | `string`                                          | Path to a marker icon to render. It can be relative to the web app public directory, or a https url of a remote marker icon. **SVGs are not supported on native platforms.**              |                    | 4.2.0 |
| **`iconSize`**   | `<a href="#size">Size</a>`                        | Controls the scaled size of the marker image set in `iconUrl`.                                                                                                                            |                    | 4.2.0 |
| **`iconOrigin`** | `<a href="#point">Point</a>`                      | The position of the image within a sprite, if any. By default, the origin is located at the top left corner of the image .                                                                |                    | 4.2.0 |
| **`iconAnchor`** | `<a href="#point">Point</a>`                      | The position at which to anchor an image in correspondence to the location of the marker on the map. By default, the anchor is located along the center point of the bottom of the image. |                    | 4.2.0 |
| **`tintColor`**  | `{ r: number; g: number; b: number; a: number; }` | Customizes the color of the default marker image. Each value must be between 0 and 255. Only for iOS and Android.                                                                         |                    | 4.2.0 |
| **`draggable`**  | `boolean`                                         | Controls whether this marker can be dragged interactively                                                                                                                                 | `false` |       |
| **`zIndex`**     | `number`                                          | Specifies the stack order of this marker, relative to other markers on the map. A marker with a high z-index is drawn on top of markers with lower z-indexes                              | `0`     |       |


#### Size

| Prop         | Type                |
| ------------ | ------------------- |
| **`width`**  | `number` |
| **`height`** | `number` |


#### Point

<a href="#point">Point</a> geometry object.
https://tools.ietf.org/html/rfc7946#section-3.1.2

| Prop              | Type                                          | Description                           |
| ----------------- | --------------------------------------------- | ------------------------------------- |
| **`type`**        | `'<a href="#point">Point</a>'`     | Specifies the type of GeoJSON object. |
| **`coordinates`** | `<a href="#position">Position</a>` |                                       |


#### Polygon

<a href="#polygon">Polygon</a> geometry object.
https://tools.ietf.org/html/rfc7946#section-3.1.6

| Prop              | Type                                          | Description                           |
| ----------------- | --------------------------------------------- | ------------------------------------- |
| **`type`**        | `'<a href="#polygon">Polygon</a>'` | Specifies the type of GeoJSON object. |
| **`coordinates`** | `Position[][]`                     |                                       |


#### Circle

For web, all the javascript <a href="#circle">Circle</a> options are available as
Polygon extends google.maps.CircleOptions.
For iOS and Android only the config options declared on <a href="#circle">Circle</a> are available.

| Prop               | Type                 | Description                                                                                                                                                                            |
| ------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`fillColor`**    | `string`  | The fill color. All CSS3 colors are supported except for extended named colors.                                                                                                        |
| **`fillOpacity`**  | `number`  | The fill opacity between 0.0 and 1.0.                                                                                                                                                  |
| **`strokeColor`**  | `string`  | The stroke color. All CSS3 colors are supported except for extended named colors.                                                                                                      |
| **`strokeWeight`** | `number`  | The stroke width in pixels.                                                                                                                                                            |
| **`geodesic`**     | `boolean` |                                                                                                                                                                                        |
| **`clickable`**    | `boolean` | Indicates whether this &lt;code&gt;<a href="#circle">Circle</a>&lt;/code&gt; handles mouse events.                                                                                     |
| **`title`**        | `string`  | Title, a short description of the overlay. Some overlays, such as markers, will display the title on the map. The title is also the default accessibility text. Only available on iOS. |
| **`tag`**          | `string`  |                                                                                                                                                                                        |


#### Polyline

For web, all the javascript <a href="#polyline">Polyline</a> options are available as
Polyline extends google.maps.PolylineOptions.
For iOS and Android only the config options declared on <a href="#polyline">Polyline</a> are available.

| Prop                | Type                     | Description                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`strokeColor`**   | `string`      | The stroke color. All CSS3 colors are supported except for extended named colors.                                                                                                                                                                                                                                                                                                              |
| **`strokeOpacity`** | `number`      | The stroke opacity between 0.0 and 1.0.                                                                                                                                                                                                                                                                                                                                                        |
| **`strokeWeight`**  | `number`      | The stroke width in pixels.                                                                                                                                                                                                                                                                                                                                                                    |
| **`geodesic`**      | `boolean`     | When &lt;code&gt;true&lt;/code&gt;, edges of the polygon are interpreted as geodesic and will follow the curvature of the Earth. When &lt;code&gt;false&lt;/code&gt;, edges of the polygon are rendered as straight lines in screen space. Note that the shape of a geodesic polygon may appear to change when dragged, as the dimensions are maintained relative to the surface of the earth. |
| **`clickable`**     | `boolean`     | Indicates whether this &lt;code&gt;<a href="#polyline">Polyline</a>&lt;/code&gt; handles mouse events.                                                                                                                                                                                                                                                                                         |
| **`tag`**           | `string`      |                                                                                                                                                                                                                                                                                                                                                                                                |
| **`styleSpans`**    | `StyleSpan[]` | Used to specify the color of one or more segments of a polyline. The styleSpans property is an array of <a href="#stylespan">StyleSpan</a> objects. Setting the spans property is the preferred way to change the color of a polyline. Only on iOS and Android.                                                                                                                                |


#### StyleSpan

Describes the style for some region of a polyline.

| Prop           | Type                | Description                                                                       |
| -------------- | ------------------- | --------------------------------------------------------------------------------- |
| **`color`**    | `string` | The stroke color. All CSS3 colors are supported except for extended named colors. |
| **`segments`** | `number` | The length of this span in number of segments.                                    |


#### CameraConfig

Configuration properties for a Google Map Camera

| Prop                    | Type                                      | Description                                                                                                            | Default            |
| ----------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **`coordinate`**        | `<a href="#latlng">LatLng</a>` | Location on the Earth towards which the camera points.                                                                 |                    |
| **`zoom`**              | `number`                       | Sets the zoom of the map.                                                                                              |                    |
| **`bearing`**           | `number`                       | Bearing of the camera, in degrees clockwise from true north.                                                           | `0`     |
| **`angle`**             | `number`                       | The angle, in degrees, of the camera from the nadir (directly facing the Earth). The only allowed values are 0 and 45. | `0`     |
| **`animate`**           | `boolean`                      | Animate the transition to the new Camera properties.                                                                   | `false` |
| **`animationDuration`** | `number`                       | This configuration option is not being used.                                                                           |                    |


#### MapPadding

Controls for setting padding on the 'visible' region of the view.

| Prop         | Type                |
| ------------ | ------------------- |
| **`top`**    | `number` |
| **`left`**   | `number` |
| **`right`**  | `number` |
| **`bottom`** | `number` |


#### CameraIdleCallbackData

| Prop            | Type                      |
| --------------- | ------------------------- |
| **`mapId`**     | `string`       |
| **`bounds`**    | `LatLngBounds` |
| **`bearing`**   | `number`       |
| **`latitude`**  | `number`       |
| **`longitude`** | `number`       |
| **`tilt`**      | `number`       |
| **`zoom`**      | `number`       |


#### CameraMoveStartedCallbackData

| Prop            | Type                 |
| --------------- | -------------------- |
| **`mapId`**     | `string`  |
| **`isGesture`** | `boolean` |


#### ClusterClickCallbackData

| Prop            | Type                              |
| --------------- | --------------------------------- |
| **`mapId`**     | `string`               |
| **`latitude`**  | `number`               |
| **`longitude`** | `number`               |
| **`size`**      | `number`               |
| **`items`**     | `MarkerCallbackData[]` |


#### MarkerCallbackData

| Prop            | Type                |
| --------------- | ------------------- |
| **`markerId`**  | `string` |
| **`latitude`**  | `number` |
| **`longitude`** | `number` |
| **`title`**     | `string` |
| **`snippet`**   | `string` |


#### MarkerClickCallbackData

| Prop        | Type                |
| ----------- | ------------------- |
| **`mapId`** | `string` |


#### MapClickCallbackData

| Prop            | Type                |
| --------------- | ------------------- |
| **`mapId`**     | `string` |
| **`latitude`**  | `number` |
| **`longitude`** | `number` |


#### PolygonClickCallbackData

| Prop            | Type                |
| --------------- | ------------------- |
| **`mapId`**     | `string` |
| **`polygonId`** | `string` |
| **`tag`**       | `string` |


#### CircleClickCallbackData

| Prop           | Type                |
| -------------- | ------------------- |
| **`mapId`**    | `string` |
| **`circleId`** | `string` |
| **`tag`**      | `string` |


#### PolylineCallbackData

| Prop             | Type                |
| ---------------- | ------------------- |
| **`polylineId`** | `string` |
| **`tag`**        | `string` |


#### MyLocationButtonClickCallbackData

| Prop        | Type                |
| ----------- | ------------------- |
| **`mapId`** | `string` |


### Type Aliases


#### MapListenerCallback

The callback function to be called when map events are emitted.

`(data: T): void`


#### Position

A <a href="#position">Position</a> is an array of coordinates.
https://tools.ietf.org/html/rfc7946#section-3.1.1
Array should contain between two and three elements.
The previous GeoJSON specification allowed more elements (e.g., which could be used to represent M values),
but the current specification only allows X, Y, and (optionally) Z to be defined.

`number[]`


### Enums


#### MapType

| Members         | Value                    | Description                              |
| --------------- | ------------------------ | ---------------------------------------- |
| **`Normal`**    | `'Normal'`    | Basic map.                               |
| **`Hybrid`**    | `'Hybrid'`    | Satellite imagery with roads and labels. |
| **`Satellite`** | `'Satellite'` | Satellite imagery with no labels.        |
| **`Terrain`**   | `'Terrain'`   | Topographic data.                        |
| **`None`**      | `'None'`      | No base map tiles.                       |

</docgen-api>