---
title: 运动 Capacitor 插件 API
description: 运动 API 跟踪加速度计和设备方向（指南针标题等）
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/motion/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/motion/src/definitions.ts
sidebar_label: 运动传感器
---

# @capacitor/motion

运动 API 跟踪加速度计和设备方向（指南针标题等）

## 安装

```bash
npm install @capacitor/motion
npx cap sync
```

## 权限

此插件目前使用 Web API 实现。大多数浏览器在使用此 API 之前需要权限。要请求权限，请在任何用户发起的操作（例如按钮点击）上提示用户授予权限：

```typescript
import { PluginListenerHandle } from '@capacitor/core';
import { Motion } from '@capacitor/motion';


let accelHandler: PluginListenerHandle;

myButton.addEventListener('click', async () => {
  try {
    await DeviceMotionEvent.requestPermission();
  } catch (e) {
    // 处理错误
    return;
  }

  // 用户批准后，可以开始监听：
  accelHandler = await Motion.addListener('accel', event => {
    console.log('Device motion event:', event);
  });
});

// 停止加速度监听器
const stopAcceleration = () => {
  if (accelHandler) {
    accelHandler.remove();
  }
};

// 删除所有监听器
const removeListeners = () => {
  Motion.removeAllListeners();
};
```

请参阅
[`DeviceMotionEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent)
API 以了解 'accel' 事件中提供的数据。

## API

<docgen-index>

* [`addListener('accel', ...)`](#addlisteneraccel-)
* [`addListener('orientation', ...)`](#addlistenerorientation-)
* [`removeAllListeners()`](#removealllisteners)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### addListener('accel', ...)

```typescript
addListener(eventName: 'accel', listenerFunc: AccelListener) => Promise<PluginListenerHandle>
```

添加加速度计数据的监听器

| Param              | Type                                                    |
| ------------------ | ------------------------------------------------------- |
| **`eventName`**    | <code>'accel'</code>                                    |
| **`listenerFunc`** | <code><a href="#accellistener">AccelListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('orientation', ...)

```typescript
addListener(eventName: 'orientation', listenerFunc: OrientationListener) => Promise<PluginListenerHandle>
```

添加设备方向更改的监听器（指南针标题等）

| Param              | Type                                                                |
| ------------------ | ------------------------------------------------------------------- |
| **`eventName`**    | <code>'orientation'</code>                                          |
| **`listenerFunc`** | <code><a href="#orientationlistener">OrientationListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

删除附加到此插件的所有监听器。

**Since:** 1.0.0

--------------------


### Interfaces


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### AccelListenerEvent

| Prop                               | Type                                                  | Description                                                                                                                                                             | Since |
| ---------------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`acceleration`**                 | <code><a href="#acceleration">Acceleration</a></code> | 一个对象，给出设备在三个轴 X、Y 和 Z 上的加速度。<a href="#acceleration">Acceleration</a> 以 m/s 为单位表示                                                       | 1.0.0 |
| **`accelerationIncludingGravity`** | <code><a href="#acceleration">Acceleration</a></code> | 一个对象，给出设备在三个轴 X、Y 和 Z 上的加速度，包括重力的效果。<a href="#acceleration">Acceleration</a> 以 m/s 为单位表示                                             | 1.0.0 |
| **`rotationRate`**                 | <code><a href="#rotationrate">RotationRate</a></code> | 一个对象，给出设备在三个方向轴 alpha、beta 和 gamma 上的方向变化率。旋转速率以度/秒表示。                                                                          | 1.0.0 |
| **`interval`**                     | <code>number</code>                                   | 一个数字，表示从设备获取数据的时间间隔（以毫秒为单位）。                                                                                                                  | 1.0.0 |


#### Acceleration

| Prop    | Type                | Description                          | Since |
| ------- | ------------------- | ------------------------------------ | ----- |
| **`x`** | <code>number</code> | 沿 X 轴的加速度量。                    | 1.0.0 |
| **`y`** | <code>number</code> | 沿 Y 轴的加速度量。                    | 1.0.0 |
| **`z`** | <code>number</code> | 沿 Z 轴的加速度量。                    | 1.0.0 |


#### RotationRate

| Prop        | Type                | Description                                       | Since |
| ----------- | ------------------- | ------------------------------------------------- | ----- |
| **`alpha`** | <code>number</code> | 绕 Z 轴的旋转量，以度/秒为单位。                    | 1.0.0 |
| **`beta`**  | <code>number</code> | 绕 X 轴的旋转量，以度/秒为单位。                    | 1.0.0 |
| **`gamma`** | <code>number</code> | 绕 Y 轴的旋转量，以度/秒为单位。                    | 1.0.0 |


### Type Aliases


#### AccelListener

<code>(event: <a href="#accellistenerevent">AccelListenerEvent</a>): void</code>


#### OrientationListener

<code>(event: <a href="#rotationrate">RotationRate</a>): void</code>


#### OrientationListenerEvent

<code><a href="#rotationrate">RotationRate</a></code>

</docgen-api>
