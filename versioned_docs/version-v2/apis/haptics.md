---
title: Haptics
description: Haptics API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/haptics
---

<plugin-platforms platforms="ios,android"></plugin-platforms>

The Haptics API provides physical feedback to the user through touch or vibration.

- [`impact(...)`](#impact)
- [`notification(...)`](#notification)
- [`vibrate()`](#vibrate)
- [`selectionStart()`](#selectionstart)
- [`selectionChanged()`](#selectionchanged)
- [`selectionEnd()`](#selectionend)
- [Interfaces](#interfaces)
- [Enums](#enums)

## Android Notes

To use vibration, you must add this permission to your `AndroidManifest.xml` file:

```xml
<uses-permission android:name="android.permission.VIBRATE" />
```

## Example

```typescript
import { Plugins, HapticsImpactStyle } from '@capacitor/core';

const { Haptics } = Plugins;

export class HapticsExample {
  hapticsImpact(style = HapticsImpactStyle.Heavy) {
    Haptics.impact({
      style: style,
    });
  }

  hapticsImpactMedium(style) {
    this.hapticsImpact(HapticsImpactStyle.Medium);
  }

  hapticsImpactLight(style) {
    this.hapticsImpact(HapticsImpactStyle.Light);
  }

  hapticsVibrate() {
    Haptics.vibrate();
  }

  hapticsSelectionStart() {
    Haptics.selectionStart();
  }

  hapticsSelectionChanged() {
    Haptics.selectionChanged();
  }

  hapticsSelectionEnd() {
    Haptics.selectionEnd();
  }
}
```

## API

### impact(...)

```typescript
impact(options: HapticsImpactOptions) => void
```

Trigger a haptics "impact" feedback

| Param         | Type                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | `<a href="#hapticsimpactoptions">HapticsImpactOptions</a>` |

---

### notification(...)

```typescript
notification(options: HapticsNotificationOptions) => void
```

Trigger a haptics "notification" feedback

| Param         | Type                                                                              |
| ------------- | --------------------------------------------------------------------------------- |
| **`options`** | `<a href="#hapticsnotificationoptions">HapticsNotificationOptions</a>` |

---

### vibrate()

```typescript
vibrate() => void
```

Vibrate the device

---

### selectionStart()

```typescript
selectionStart() => void
```

Trigger a selection started haptic hint

---

### selectionChanged()

```typescript
selectionChanged() => void
```

Trigger a selection changed haptic hint. If a selection was
started already, this will cause the device to provide haptic
feedback

---

### selectionEnd()

```typescript
selectionEnd() => void
```

If selectionStart() was called, selectionEnd() ends the selection.
For example, call this when a user has lifted their finger from a control

---

### Interfaces

#### HapticsImpactOptions

| Prop        | Type                                                              |
| ----------- | ----------------------------------------------------------------- |
| **`style`** | `<a href="#hapticsimpactstyle">HapticsImpactStyle</a>` |

#### HapticsNotificationOptions

| Prop       | Type                                                                        |
| ---------- | --------------------------------------------------------------------------- |
| **`type`** | `<a href="#hapticsnotificationtype">HapticsNotificationType</a>` |

### Enums

#### HapticsImpactStyle

| Members      | Value                 |
| ------------ | --------------------- |
| **`Heavy`**  | `"HEAVY"`  |
| **`Medium`** | `"MEDIUM"` |
| **`Light`**  | `"LIGHT"`  |

#### HapticsNotificationType

| Members       | Value                  |
| ------------- | ---------------------- |
| **`SUCCESS`** | `"SUCCESS"` |
| **`WARNING`** | `"WARNING"` |
| **`ERROR`**   | `"ERROR"`   |
