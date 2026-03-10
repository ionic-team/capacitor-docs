---
title: Google 地图 Capacitor 插件 API
description: Capacitor 上的 Google 地图
custom_edit_url: https://github.com/ionic-team/capacitor-google-maps/blob/main/plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-google-maps/blob/main/plugin/src/definitions.ts
sidebar_label: Google 地图
---

# @capacitor/google-maps

Capacitor 上的 Google 地图

## 安装

```bash
npm install @capacitor/google-maps
npx cap sync
```

## API 密钥

要在任何平台上使用 Google Maps SDK，需要与_启用计费_的帐户关联的 API 密钥。这些可以从 [Google Cloud Console](https://console.cloud.google.com) 获取。这对于所有三个平台 Android、iOS 和 Javascript 都是必需的。有关获取这些 API 密钥的更多信息，请参阅每个平台的 [Google Maps 文档](https://developers.google.com/maps/documentation/android-sdk/overview)。

## iOS

Google Maps SDK 支持通过 `enableCurrentLocation(bool)` 显示用户当前位置。要使用此功能，Apple 要求在 `Info.plist` 中指定隐私描述：

- `NSLocationWhenInUseUsageDescription` (`Privacy - Location When In Use Usage Description`)

阅读 [iOS 指南](https://capacitorjs.com/docs/ios)中的[配置 `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist)以获取有关在 Xcode 中设置 iOS 权限的更多信息。

### Typescript 配置

您的项目还需要在 `tsconfig.json` 中将 `skipLibCheck` 设置为 `true`。

### 从旧版本迁移

如果您是从旧版本迁移的，请查看迁移指南以了解重大更改。

## Android

要使用 Google Maps SDK for Android，您需要添加 API 密钥。

### 添加 API 密钥

将 API 密钥添加到 `android/app/src/main/AndroidManifest.xml`：

```xml
<application>
  <meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="YOUR_API_KEY_HERE"/>
</application>
```

## Web

### 获取 API 密钥

1. 转到 [Google Cloud Console](https://console.cloud.google.com)
2. 创建一个新项目或选择现有项目
3. 启用 Maps JavaScript API
4. 创建 API 密钥
5. 限制 API 密钥以仅用于 Maps JavaScript API

### 配置

在 `index.html` 中添加 Google Maps 脚本：

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE"></script>
```

## 示例

### 创建地图

```typescript
import { GoogleMap } from '@capacitor/google-maps';

const createMap = async () => {
  const mapRef = document.getElementById('map');

  const map = await GoogleMap.create({
    id: 'my-map',
    element: mapRef,
    apiKey: 'YOUR_API_KEY_HERE',
    config: {
      center: {
        lat: 33.6,
        lng: -117.9,
      },
      zoom: 8,
    },
  });
};
```

### 添加标记

```typescript
const addMarker = async () => {
  const map = await GoogleMap.create({ ... });

  await map.addMarker({
    coordinate: {
      lat: 33.6,
      lng: -117.9,
    },
    title: 'My Marker',
  });
};
```

### 添加圆

```typescript
const addCircle = async () => {
  const map = await GoogleMap.create({ ... });

  await map.addCircle({
    center: {
      lat: 33.6,
      lng: -117.9,
    },
    radius: 1000,
    strokeColor: '#FF0000',
    strokeWidth: 2,
    fillColor: '#00FF00',
  });
};
```

### 添加多边形

```typescript
const addPolygon = async () => {
  const map = await GoogleMap.create({ ... });

  await map.addPolygon({
    paths: [
      { lat: 33.6, lng: -117.9 },
      { lat: 33.7, lng: -117.9 },
      { lat: 33.7, lng: -117.8 },
    ],
    strokeColor: '#FF0000',
    strokeWidth: 2,
    fillColor: '#00FF00',
  });
};
```

### 添加折线

```typescript
const addPolyline = async () => {
  const map = await GoogleMap.create({ ... });

  await map.addPolyline({
    path: [
      { lat: 33.6, lng: -117.9 },
      { lat: 33.7, lng: -117.9 },
      { lat: 33.7, lng: -117.8 },
    ],
    strokeColor: '#FF0000',
    strokeWidth: 2,
  });
};
```

## API

<docgen-index>

* [`create(...)`](#create)
* [`getMap(...)`](#getmap)
* [`close(...)`](#close)
* [Interfaces](#interfaces)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### create(...)

```typescript
create(config: CreateMapArgs) => Promise<GoogleMap>
```

创建地图实例

| Param        | Type                                                        |
| ------------ | ----------------------------------------------------------- |
| **`config`** | <code><a href="#createmapargs">CreateMapArgs</a></code>     |

**Returns:** <code>Promise&lt;<a href="#googlemap">GoogleMap</a>&gt;</code>

**Since:** 1.0.0

--------------------


### getMap(...)

```typescript
getMap(id: string) => Promise<GoogleMap>
```

获取现有地图实例

| Param  | Type                |
| ------ | ------------------- |
| **`id`** | <code>string</code> |

**Returns:** <code>Promise&lt;<a href="#googlemap">GoogleMap</a>&gt;</code>

**Since:** 1.0.0

--------------------


### close(...)

```typescript
close(id: string) => Promise<void>
```

关闭并销毁地图实例

| Param  | Type                |
| ------ | ------------------- |
| **`id`** | <code>string</code> |

**Since:** 1.0.0

--------------------


### Interfaces


#### GoogleMap

GoogleMap 类是创建地图和与地图交互的主要接口。

| 方法                                                | 返回类型                                                                                                                 | Since |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`destroy()`**                                    | <code>Promise&lt;void&gt;</code>                                                                                         | 1.0.0 |
| **`enableCurrentLocation(enabled)`**               | <code>Promise&lt;void&gt;</code>                                                                                         | 1.0.0 |
| **`setCamera(config)`**                            | <code>Promise&lt;void&gt;</code>                                                                                         | 1.0.0 |
| **`setMapType(mapType)`**                          | <code>Promise&lt;void&gt;</code>                                                                                         | 1.0.0 |
| **`addMarker(config)`**                            | <code>Promise&lt;<a href="#marker">Marker</a>&gt;</code>                                                                 | 1.0.0 |
| **`addMarkers(config)`**                           | <code>Promise&lt;<a href="#marker">Marker</a>[]&gt;</code>                                                               | 1.0.0 |
| **`removeMarker(marker)`**                         | <code>Promise&lt;void&gt;</code>                                                                                         | 1.0.0 |
| **`addCircle(config)`**                            | <code>Promise&lt;<a href="#circle">Circle</a>&gt;</code>                                                                 | 1.0.0 |
| **`removeCircle(circle)`**                         | <code>Promise&lt;void&gt;</code>                                                                                         | 1.0.0 |
| **`addPolygon(config)`**                           | <code>Promise&lt;<a href="#polygon">Polygon</a>&gt;</code>                                                               | 1.0.0 |
| **`removePolygon(polygon)`**                       | <code>Promise&lt;void&gt;</code>                                                                                         | 1.0.0 |
| **`addPolyline(config)`**                          | <code>Promise&lt;<a href="#polyline">Polyline</a>&gt;</code>                                                             | 1.0.0 |
| **`removePolyline(polyline)`**                     | <code>Promise&lt;void&gt;</code>                                                                                         | 1.0.0 |
| **`setCamera(config)`**                            | <code>Promise&lt;void&gt;</code>                                                                                         | 1.0.0 |
| **`setMapType(mapType)`**                          | <code>Promise&lt;void&gt;</code>                                                                                         | 1.0.0 |
| **`on(event, callback)`**                          | <code>Promise&lt;<a href="#listenerhandle">ListenerHandle</a>&gt;</code>                                                 | 1.0.0 |


#### CreateMapArgs

| Prop          | Type                                                       | Description        | Default  | Since |
| ------------- | ---------------------------------------------------------- | ------------------ | -------- | ----- |
| **`id`**      | <code>string</code>                                        | 地图的唯一 ID      |          | 1.0.0 |
| **`element`** | <code>HTMLElement</code>                                   | 要渲染地图的元素   |          | 1.0.0 |
| **`apiKey`**  | <code>string</code>                                        | Google Maps API 密钥 |          | 1.0.0 |
| **`config`**  | <code><a href="#mapconfig">MapConfig</a></code>            | 地图配置           |          | 1.0.0 |
| **`width`**   | <code>number \| string</code>                             | 地图宽度           |          | 1.0.0 |
| **`height`**  | <code>number \| string</code>                             | 地图高度           |          | 1.0.0 |
| **`x`**       | <code>number</code>                                        | 地图 X 位置        | <code>0</code> | 1.0.0 |
| **`y`**       | <code>number</code>                                        | 地图 Y 位置        | <code>0</code> | 1.0.0 |


#### MapConfig

| Prop                   | Type                                                       | Description        | Default               | Since |
| ---------------------- | ---------------------------------------------------------- | ------------------ | --------------------- | ----- |
| **`center`**           | <code><a href="#latlng">LatLng</a></code>                  | 地图中心           |                       | 1.0.0 |
| **`zoom`**             | <code>number</code>                                        | 地图缩放级别       |                       | 1.0.0 |
| **`mapType`**          | <code><a href="#maptype">MapType</a></code>                | 地图类型           | <code>MapType.Normal</code> | 1.0.0 |
| **`disableDefaultUI`** | <code>boolean</code>                                       | 禁用默认 UI        | <code>false</code>    | 1.0.0 |
| **`styles`**           | <code>any[]</code>                                         | 地图样式           |                       | 1.0.0 |
| **`backgroundColor`**  | <code>string</code>                                        | 背景颜色           |                       | 1.0.0 |


#### LatLng

| Prop       | Type                | Description | Since |
| ---------- | ------------------- | ----------- | ----- |
| **`lat`**  | <code>number</code> | 纬度        | 1.0.0 |
| **`lng`**  | <code>number</code> | 经度        | 1.0.0 |


#### Marker

| Prop         | Type                                                     | Description          | Since |
| ------------ | -------------------------------------------------------- | -------------------- | ----- |
| **`remove()`** | <code>() => Promise&lt;void&gt;</code>                   | 移除标记             | 1.0.0 |


#### Circle

| Prop         | Type                                                     | Description          | Since |
| ------------ | -------------------------------------------------------- | -------------------- | ----- |
| **`remove()`** | <code>() => Promise&lt;void&gt;</code>                   | 移除圆               | 1.0.0 |


#### Polygon

| Prop         | Type                                                     | Description          | Since |
| ------------ | -------------------------------------------------------- | -------------------- | ----- |
| **`remove()`** | <code>() => Promise&lt;void&gt;</code>                   | 移除多边形           | 1.0.0 |


#### Polyline

| Prop         | Type                                                     | Description          | Since |
| ------------ | -------------------------------------------------------- | -------------------- | ----- |
| **`remove()`** | <code>() => Promise&lt;void&gt;</code>                   | 移除折线             | 1.0.0 |


#### ListenerHandle

| Prop         | Type                                                     | Description          | Since |
| ------------ | -------------------------------------------------------- | -------------------- | ----- |
| **`remove()`** | <code>() => Promise&lt;void&gt;</code>                   | 移除监听器           | 1.0.0 |


### Enums


#### MapType

| Members      | Value                   | Description   | Since |
| ------------ | ----------------------- | ------------- | ----- |
| **`Normal`**  | <code>'normal'</code>    | 标准地图      | 1.0.0 |
| **`Satellite`** | <code>'satellite'</code> | 卫星地图      | 1.0.0 |
| **`Hybrid`**  | <code>'hybrid'</code>    | 混合地图      | 1.0.0 |
| **`Terrain`** | <code>'terrain'</code>   | 地形地图      | 1.0.0 |

</docgen-api>
