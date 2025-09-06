---
title: Screen Reader Capacitor Plugin API
description: Screen Reader API 提供对 TalkBack/VoiceOver 等功能的访问，并为视觉无障碍提供简单的文本转语音功能。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/screen-reader/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/screen-reader/src/definitions.ts
sidebar_label: Screen Reader
---

# @capacitor/screen-reader

Screen Reader API 提供对 TalkBack/VoiceOver 等功能的访问，并为视觉无障碍提供简单的文本转语音功能。

## 安装

```bash
npm install @capacitor/screen-reader
npx cap sync
```

## 示例

```typescript
import { ScreenReader } from '@capacitor/screen-reader';

ScreenReader.addListener('stateChange', ({ value }) => {
  console.log(`屏幕阅读器当前${value ? '开启' : '关闭'}`);
});

const checkScreenReaderEnabled = async () => {
  const { value } = await ScreenReader.isEnabled();

  console.log('语音朗读已启用？' + value);
};

const sayHello = async () => {
  await ScreenReader.speak({ value: '你好，世界！' });
};
```

## API

<docgen-index>

* [`isEnabled()`](#isenabled)
* [`speak(...)`](#speak)
* [`addListener('stateChange', ...)`](#addlistenerstatechange-)
* [`removeAllListeners()`](#removealllisteners)
* [接口](#interfaces)
* [类型别名](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### isEnabled()

```typescript
isEnabled() => Promise<{ value: boolean; }>
```

检测屏幕阅读器当前是否处于活动状态。

此方法在 Web 平台上不受支持（无法检测屏幕阅读器）。

**返回值：** <code>Promise&lt;{ value: boolean; }&gt;</code>

**自版本：** 1.0.0

--------------------


### speak(...)

```typescript
speak(options: SpeakOptions) => Promise<void>
```

文本转语音功能。

此功能仅在屏幕阅读器处于活动状态时有效。

在 Web 平台上，浏览器必须支持 [SpeechSynthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)，否则此方法将抛出错误。

如需更多文本转语音功能，请参阅 [Capacitor Community Text-to-Speech 插件](https://github.com/capacitor-community/text-to-speech)。

| 参数          | 类型                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#speakoptions">SpeakOptions</a></code> |

**自版本：** 1.0.0

--------------------


### addListener('stateChange', ...)

```typescript
addListener(eventName: 'stateChange', listener: StateChangeListener) => Promise<PluginListenerHandle>
```

添加屏幕阅读器开关状态变化的监听器。

此事件曾用名为 `'accessibilityScreenReaderStateChange'`。

此方法在 Web 平台上不受支持（无法检测屏幕阅读器）。

| 参数            | 类型                                                                |
| --------------- | ------------------------------------------------------------------- |
| **`eventName`** | <code>'stateChange'</code>                                          |
| **`listener`**  | <code><a href="#statechangelistener">StateChangeListener</a></code> |

**返回值：** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

移除附加到此插件的所有监听器。

**自版本：** 1.0.0

--------------------


### 接口


#### SpeakOptions

| 属性            | 类型                | 说明                                                                                                                                                               | 自版本 |
| -------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`value`**    | <code>string</code> | 要朗读的文本。                                                                                                                                                        | 1.0.0 |
| **`language`** | <code>string</code> | 文本朗读的语言，使用其 [ISO 639-1 代码](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)（例如："en"）。此选项仅在 Android 上受支持。 | 1.0.0 |


#### PluginListenerHandle

| 属性         | 类型                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### ScreenReaderState

| 属性        | 类型                 | 说明                                  | 自版本 |
| ----------- | -------------------- | -------------------------------------------- | ----- |
| **`value`** | <code>boolean</code> | 屏幕阅读器当前是否处于活动状态。 | 1.0.0 |


### 类型别名


#### StateChangeListener

<code>(state: <a href="#screenreaderstate">ScreenReaderState</a>): void</code>

</docgen-api>