---
title: Accessibility
description: Accessibility API
pluginapi: AccessibilityPlugin
contributors:
  - mlynch
  - jcesarmobile
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

The Accessibility API makes it easy to know when a user has a screen reader enabled, as well as programmatically speaking
labels through the connected screen reader.

- [`isScreenReaderEnabled()`](#isscreenreaderenabled)
- [`speak(...)`](#speak)
- [`addListener(...)`](#addlistener)
- [`removeAllListeners()`](#removealllisteners)
- [Interfaces](#interfaces)

## Example

```typescript
import { Plugins } from '@capacitor/core';

const { Accessibility, Modals } = Plugins;

Accessibility.addListener('accessibilityScreenReaderStateChange', (state) => {
  console.log(state.value);
});

async isVoiceOverEnabled() {
  var vo = await Accessibility.isScreenReaderEnabled();
  alert('Voice over enabled? ' + vo.value);
}

async speak() {
  var value = await Modals.prompt({
    title: "Value to speak",
    message: "Enter the value to speak"
  });

  Accessibility.speak({value: value.value});
}
```

## API>

### isScreenReaderEnabled()

```typescript
isScreenReaderEnabled() => Promise<ScreenReaderEnabledResult>
```

Check if a screen reader is enabled on the device

**Returns:** <code>Promise&lt;<a href="#screenreaderenabledresult">ScreenReaderEnabledResult</a>&gt;</code>

---

### speak(...)

```typescript
speak(options: AccessibilitySpeakOptions) => Promise<void>
```

Speak a string with a connected screen reader.

| Param         | Type                                                                            |
| ------------- | ------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#accessibilityspeakoptions">AccessibilitySpeakOptions</a></code> |

---

### addListener(...)

```typescript
addListener(eventName: 'accessibilityScreenReaderStateChange', listenerFunc: ScreenReaderStateChangeCallback) => PluginListenerHandle
```

Listen for screen reader state change (on/off)

| Param              | Type                                                                                                |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>"accessibilityScreenReaderStateChange"</code>                                                 |
| **`listenerFunc`** | <code>(state: <a href="#screenreaderenabledresult">ScreenReaderEnabledResult</a>) =&gt; void</code> |

**Returns:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### removeAllListeners()

```typescript
removeAllListeners() => void
```

Remove all native listeners for this plugin

---

### Interfaces

#### ScreenReaderEnabledResult

| Prop        | Type                 |
| ----------- | -------------------- |
| **`value`** | <code>boolean</code> |

#### AccessibilitySpeakOptions

| Prop           | Type                | Description                                                                                                                                                             |
| -------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`value`**    | <code>string</code> | The string to speak                                                                                                                                                     |
| **`language`** | <code>string</code> | The language to speak the string in, as its [ISO 639-1 Code](https://www.loc.gov/standards/iso639-2/php/code_list.php) (ex: "en"). Currently only supported on Android. |

#### PluginListenerHandle

| Prop         | Type                       |
| ------------ | -------------------------- |
| **`remove`** | <code>() =&gt; void</code> |
