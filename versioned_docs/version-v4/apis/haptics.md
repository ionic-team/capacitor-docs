---
title: Haptics Capacitor Plugin API
description: The Haptics API provides physical feedback to the user through touch or vibration.
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/haptics/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/haptics/src/definitions.ts
sidebar_label: Haptics
---

# @capacitor/haptics

The Haptics API provides physical feedback to the user through touch or vibration.

On devices that don't have Taptic Engine or Vibrator, the API calls will resolve without performing any action.

## Install

```bash
npm install @capacitor/haptics
npx cap sync
```

## Example

```typescript
import { Haptics, ImpactStyle } from '@capacitor/haptics';

const hapticsImpactMedium = async () => {
  await Haptics.impact({ style: ImpactStyle.Medium });
};

const hapticsImpactLight = async () => {
  await Haptics.impact({ style: ImpactStyle.Light });
};

const hapticsVibrate = async () => {
  await Haptics.vibrate();
};

const hapticsSelectionStart = async () => {
  await Haptics.selectionStart();
};

const hapticsSelectionChanged = async () => {
  await Haptics.selectionChanged();
};

const hapticsSelectionEnd = async () => {
  await Haptics.selectionEnd();
};
```

## API

<docgen-index>

* [`impact(...)`](#impact)
* [`notification(...)`](#notification)
* [`vibrate(...)`](#vibrate)
* [`selectionStart()`](#selectionstart)
* [`selectionChanged()`](#selectionchanged)
* [`selectionEnd()`](#selectionend)
* [Interfaces](#interfaces)
* [Enums](#enums)

</docgen-index>

<docgen-api>


### impact(...)

```typescript
impact(options?: ImpactOptions | undefined) => Promise<void>
```

Trigger a haptics "impact" feedback

| Param         | Type                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | `<a href="#impactoptions">ImpactOptions</a>` |

**Since:** 1.0.0

--------------------


### notification(...)

```typescript
notification(options?: NotificationOptions | undefined) => Promise<void>
```

Trigger a haptics "notification" feedback

| Param         | Type                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | `<a href="#notificationoptions">NotificationOptions</a>` |

**Since:** 1.0.0

--------------------


### vibrate(...)

```typescript
vibrate(options?: VibrateOptions | undefined) => Promise<void>
```

Vibrate the device

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | `<a href="#vibrateoptions">VibrateOptions</a>` |

**Since:** 1.0.0

--------------------


### selectionStart()

```typescript
selectionStart() => Promise<void>
```

Trigger a selection started haptic hint

**Since:** 1.0.0

--------------------


### selectionChanged()

```typescript
selectionChanged() => Promise<void>
```

Trigger a selection changed haptic hint. If a selection was
started already, this will cause the device to provide haptic
feedback

**Since:** 1.0.0

--------------------


### selectionEnd()

```typescript
selectionEnd() => Promise<void>
```

If selectionStart() was called, selectionEnd() ends the selection.
For example, call this when a user has lifted their finger from a control

**Since:** 1.0.0

--------------------


### Interfaces


#### ImpactOptions

| Prop        | Type                                                | Description                                                                                                                                                                              | Default                        | Since |
| ----------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ----- |
| **`style`** | `<a href="#impactstyle">ImpactStyle</a>` | Impact Feedback Style The mass of the objects in the collision simulated by a [UIImpactFeedbackGenerator](https://developer.apple.com/documentation/uikit/uiimpactfeedbackstyle) object. | `ImpactStyle.Heavy` | 1.0.0 |


#### NotificationOptions

| Prop       | Type                                                          | Description                                                                                                                                                                                       | Default                               | Since |
| ---------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ----- |
| **`type`** | `<a href="#notificationtype">NotificationType</a>` | Notification Feedback Type The type of notification feedback generated by a [UINotificationFeedbackGenerator](https://developer.apple.com/documentation/uikit/uinotificationfeedbacktype) object. | `NotificationType.SUCCESS` | 1.0.0 |


#### VibrateOptions

| Prop           | Type                | Description                                | Default          | Since |
| -------------- | ------------------- | ------------------------------------------ | ---------------- | ----- |
| **`duration`** | `number` | Duration of the vibration in milliseconds. | `300` | 1.0.0 |


### Enums


#### ImpactStyle

| Members      | Value                 | Description                                                  | Since |
| ------------ | --------------------- | ------------------------------------------------------------ | ----- |
| **`Heavy`**  | `'HEAVY'`  | A collision between large, heavy user interface elements     | 1.0.0 |
| **`Medium`** | `'MEDIUM'` | A collision between moderately sized user interface elements | 1.0.0 |
| **`Light`**  | `'LIGHT'`  | A collision between small, light user interface elements     | 1.0.0 |


#### NotificationType

| Members       | Value                  | Description                                                                    | Since |
| ------------- | ---------------------- | ------------------------------------------------------------------------------ | ----- |
| **`Success`** | `'SUCCESS'` | A notification feedback type indicating that a task has completed successfully | 1.0.0 |
| **`Warning`** | `'WARNING'` | A notification feedback type indicating that a task has produced a warning     | 1.0.0 |
| **`Error`**   | `'ERROR'`   | A notification feedback type indicating that a task has failed                 | 1.0.0 |

</docgen-api>