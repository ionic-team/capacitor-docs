---
title: Motion Capacitor Plugin API
description: The Motion API tracks accelerometer and device orientation (compass heading, etc.)
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/motion/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/motion/src/definitions.ts
sidebar_label: Motion
---

# @capacitor/motion

The Motion API tracks accelerometer and device orientation (compass heading, etc.)

## Install

```bash
npm install @capacitor/motion
npx cap sync
```

## Permissions

This plugin is currently implemented using Web APIs. Most browsers require
permission before using this API. To request permission, prompt the user for
permission on any user-initiated action (such as a button click):

```typescript
import { PluginListenerHandle } from '@capacitor/core';
import { Motion } from '@capacitor/motion';


let accelHandler: PluginListenerHandle;

myButton.addEventListener('click', async () => {
  try {
    await DeviceMotionEvent.requestPermission();
  } catch (e) {
    // Handle error
    return;
  }

  // Once the user approves, can start listening:
  accelHandler = await Motion.addListener('accel', event => {
    console.log('Device motion event:', event);
  });
});

// Stop the acceleration listener
const stopAcceleration = () => {
  if (accelHandler) {
    accelHandler.remove();
  }
};

// Remove all listeners
const removeListeners = () => {
  Motion.removeAllListeners();
};
```

See the
[`DeviceMotionEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent)
API to understand the data supplied in the 'accel' event.

## API

<docgen-index>

* [`addListener('accel', ...)`](#addlisteneraccel)
* [`addListener('orientation', ...)`](#addlistenerorientation)
* [`removeAllListeners()`](#removealllisteners)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>


### addListener('accel', ...)

```typescript
addListener(eventName: 'accel', listenerFunc: AccelListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Add a listener for accelerometer data

| Param              | Type                                                    |
| ------------------ | ------------------------------------------------------- |
| **`eventName`**    | `'accel'`                                    |
| **`listenerFunc`** | `<a href="#accellistener">AccelListener</a>` |

**Returns:** `Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a>`

**Since:** 1.0.0

--------------------


### addListener('orientation', ...)

```typescript
addListener(eventName: 'orientation', listenerFunc: OrientationListener) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Add a listener for device orientation change (compass heading, etc.)

| Param              | Type                                                                |
| ------------------ | ------------------------------------------------------------------- |
| **`eventName`**    | `'orientation'`                                          |
| **`listenerFunc`** | `<a href="#orientationlistener">OrientationListener</a>` |

**Returns:** `Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a>`

**Since:** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Remove all the listeners that are attached to this plugin.

**Since:** 1.0.0

--------------------


### Interfaces


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | `() =&gt; Promise&lt;void&gt;` |


#### AccelListenerEvent

| Prop                               | Type                                                  | Description                                                                                                                                                             | Since |
| ---------------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`acceleration`**                 | `<a href="#acceleration">Acceleration</a>` | An object giving the acceleration of the device on the three axis X, Y and Z. <a href="#acceleration">Acceleration</a> is expressed in m/s                              | 1.0.0 |
| **`accelerationIncludingGravity`** | `<a href="#acceleration">Acceleration</a>` | An object giving the acceleration of the device on the three axis X, Y and Z with the effect of gravity. <a href="#acceleration">Acceleration</a> is expressed in m/s   | 1.0.0 |
| **`rotationRate`**                 | `<a href="#rotationrate">RotationRate</a>` | An object giving the rate of change of the device's orientation on the three orientation axis alpha, beta and gamma. Rotation rate is expressed in degrees per seconds. | 1.0.0 |
| **`interval`**                     | `number`                                   | A number representing the interval of time, in milliseconds, at which data is obtained from the device.                                                                 | 1.0.0 |


#### Acceleration

| Prop    | Type                | Description                                  | Since |
| ------- | ------------------- | -------------------------------------------- | ----- |
| **`x`** | `number` | The amount of acceleration along the X axis. | 1.0.0 |
| **`y`** | `number` | The amount of acceleration along the Y axis. | 1.0.0 |
| **`z`** | `number` | The amount of acceleration along the Z axis. | 1.0.0 |


#### RotationRate

| Prop        | Type                | Description                                                      | Since |
| ----------- | ------------------- | ---------------------------------------------------------------- | ----- |
| **`alpha`** | `number` | The amount of rotation around the Z axis, in degrees per second. | 1.0.0 |
| **`beta`**  | `number` | The amount of rotation around the X axis, in degrees per second. | 1.0.0 |
| **`gamma`** | `number` | The amount of rotation around the Y axis, in degrees per second. | 1.0.0 |


### Type Aliases


#### AccelListener

`(event: <a href="#accellistenerevent">AccelListenerEvent</a>): void`


#### OrientationListener

`(event: <a href="#rotationrate">RotationRate</a>): void`


#### OrientationListenerEvent

`<a href="#rotationrate">RotationRate</a>`

</docgen-api>