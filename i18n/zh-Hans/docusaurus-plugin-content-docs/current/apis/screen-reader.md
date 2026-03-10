---
title: 屏幕阅读器 Capacitor 插件 API
description: 屏幕阅读器 API 提供对 TalkBack/VoiceOver/等的访问,并为视觉辅助功能提供简单的文本转语音功能。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/screen-reader/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/screen-reader/src/definitions.ts
sidebar_label: 屏幕阅读器
---

# @capacitor/screen-reader

屏幕阅读器 API 提供对 TalkBack/VoiceOver/等的访问,并为视觉辅助功能提供简单的文本转语音功能。

## 安装

```bash
npm install @capacitor/screen-reader
npx cap sync
```

## 示例

```typescript
import { ScreenReader } from '@capacitor/screen-reader';

ScreenReader.addListener('stateChange', ({ value }) => {
  console.log(`屏幕阅读器现在${value ? '开启' : '关闭'}`);
});

const checkScreenReaderEnabled = async () => {
  const { value } = await ScreenReader.isEnabled();

  console.log('语音已启用? ' + value);
};

const sayHello = async () => {
  await ScreenReader.speak({ value: '你好世界!' });
};
```

## API

<docgen-index>

* [`isEnabled()`](#isenabled)
* [`speak(...)`](#speak)
* [`addListener('stateChange', ...)`](#addlistenerstatechange-)
* [`removeAllListeners()`](#removealllisteners)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### isEnabled()

```typescript
isEnabled() => Promise<{ value: boolean; }>
```

屏幕阅读器当前是否活动。

此方法在 Web 上不受支持(无法检测屏幕阅读器)。

**Returns:** <code>Promise&lt;{ value: boolean; }&gt;</code>

**Since:** 1.0.0

--------------------


### speak(...)

```typescript
speak(options: SpeakOptions) => Promise<void>
```

文本转语音功能。

此功能仅在屏幕阅读器当前活动时才有效。

在 Web 上,浏览器必须支持 [SpeechSynthesis
API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis),否则此方法将抛出错误。

有关更多文本转语音功能,请参阅 [Capacitor Community
Text-to-Speech
plugin](https://github.com/capacitor-community/text-to-speech)。

| Param         | Type                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#speakoptions">SpeakOptions</a></code> |

**Since:** 1.0.0

--------------------


### addListener('stateChange', ...)

```typescript
addListener(eventName: 'stateChange', listener: StateChangeListener) => Promise<PluginListenerHandle>
```

添加屏幕阅读器开启或关闭时的监听器。

此事件以前名为 `'accessibilityScreenReaderStateChange'`。

此方法在 Web 上不受支持(无法检测屏幕阅读器)。

| Param           | Type                                                                |
| --------------- | ------------------------------------------------------------------- |
| **`eventName`** | <code>'stateChange'</code>                                          |
| **`listener`**  | <code><a href="#statechangelistener">StateChangeListener</a></code> |

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


#### SpeakOptions

| Prop           | Type                | Description                                                                                                                                            | Since |
| -------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`value`**    | <code>string</code> | 要朗读的文本。                                                                                                                                             | 1.0.0 |
| **`language`** | <code>string</code> | 朗读文本的语言,使用其 [ISO 639-1 代码](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)(例如："en")。此选项仅在 Android 上支持。                          | 1.0.0 |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### ScreenReaderState

| Prop        | Type                 | Description                  | Since |
| ----------- | -------------------- | ---------------------------- | ----- |
| **`value`** | <code>boolean</code> | 屏幕阅读器当前是否活动。              | 1.0.0 |


### Type Aliases


#### StateChangeListener

<code>(state: <a href="#screenreaderstate">ScreenReaderState</a>): void</code>

</docgen-api>
