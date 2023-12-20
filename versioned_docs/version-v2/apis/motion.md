---
title: Motion
description: Motion API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/motion
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

The Motion API tracks accelerometer and device orientation (compass heading, etc.)

- [`addListener(...)`](#addlistener)
- [`addListener(...)`](#addlistener)
- [`removeAllListeners()`](#removealllisteners)
- [Interfaces](#interfaces)

## Permissions

This plugin is currently implemented using Web APIs. Most browsers require permission before using this API. To request permission, prompt the user for permission on any user-initiated action (such as a button click):

```typescript
myButton.addEventListener('click', async () => {
  try {
    await DeviceMotionEvent.requestPermission();
  } catch (e) {
    // Handle error
    return;
  }

  // Once the user approves, can start listening:
  const { Motion } = Capacitor.Plugins;
  Capacitor.Plugins.Motion.addListener('accel', (event) => {});
});
```

### Example

```typescript
const { Motion } = Capacitor.Plugins;
Motion.addListener('accel', (event) => {});
```

See the [DeviceMotionEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent) API to understand the data supplied in `event`.

## API

### addListener(...)

```typescript
addListener(eventName: 'accel', listenerFunc: (event: MotionEventResult) => void) => PluginListenerHandle
```

Listen for accelerometer data

| Param              | Type                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`**    | <code>"accel"</code>                                                                |
| **`listenerFunc`** | <code>(event: <a href="#motioneventresult">MotionEventResult</a>) =&gt; void</code> |

**Returns:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### addListener(...)

```typescript
addListener(eventName: 'orientation', listenerFunc: (event: MotionOrientationEventResult) => void) => PluginListenerHandle
```

Listen for device orientation change (compass heading, etc.)

| Param              | Type                                                                                                      |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>"orientation"</code>                                                                                |
| **`listenerFunc`** | <code>(event: <a href="#motionorientationeventresult">MotionOrientationEventResult</a>) =&gt; void</code> |

**Returns:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### removeAllListeners()

```typescript
removeAllListeners() => void
```

Remove all native listeners for this plugin

---

### Interfaces

#### PluginListenerHandle

| Prop         | Type                       |
| ------------ | -------------------------- |
| **`remove`** | <code>() =&gt; void</code> |

#### MotionEventResult

| Prop                               | Type                                                         |
| ---------------------------------- | ------------------------------------------------------------ |
| **`acceleration`**                 | `{ x: number; y: number; z: number; }`            |
| **`accelerationIncludingGravity`** | `{ x: number; y: number; z: number; }`            |
| **`rotationRate`**                 | `{ alpha: number; beta: number; gamma: number; }` |
| **`interval`**                     | <code>number</code>                                          |

#### MotionOrientationEventResult

| Prop        | Type                |
| ----------- | ------------------- |
| **`alpha`** | <code>number</code> |
| **`beta`**  | <code>number</code> |
| **`gamma`** | <code>number</code> |
