---
title: Local LLM Plugin API
description: Run large language models entirely on-device using Apple Intelligence (Foundation Models) on iOS and Gemini Nano on Android
custom_edit_url: https://github.com/ionic-team/capacitor-local-llm/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-local-llm/blob/main/src/definitions.ts
sidebar_label: Local LLM 🧪
---

# @capacitor/local-llm

_CapacitorLABS_ - This project is experimental. Support is not provided. Please open issues when needed.

Run large language models entirely on-device using Apple Intelligence (Foundation Models) on iOS and Gemini Nano on Android. No network requests, no API keys, no data leaving the device.

> **Note:** On-device LLMs require physical hardware. Android emulators are not supported.  iOS simulators are supported so long as the host device is capable of running Apple Intelligence and has it enabled.

## Install

```bash
npm install @capacitor/local-llm
npx cap sync
```

## Platform Requirements

| Platform | Minimum OS | Notes |
|----------|------------|-------|
| iOS | **15** | Image generation requires iOS 18.4+. Text LLM (Foundation Models / Apple Intelligence) requires iOS 26+. |
| Android | **9 (API 28)** | Gemini Nano via ML Kit requires a device that supports on-device AI (e.g. Pixel 9+). |

## iOS Setup

No additional configuration is required. Foundation Models and Image Playground are system frameworks available automatically on supported devices with Apple Intelligence enabled.

Call [`systemAvailability()`](#systemavailability) at runtime to check whether the model is ready before sending prompts.

On iOS 18 and below, `systemAvailability()` returns `'unavailable'` for the text LLM. If `prompt()` or `warmup()` are called anyway, the promise will reject with an error. Image generation via `generateImage()` is fully functional on iOS 18.4+.

## Android Setup

The plugin's minimum android SDK is 28, higher than Capacitor's current minimum (24). You'll need to change the `android/variables.gradle` file in your application:

```gradle
ext {
    minSdkVersion = 28
}
```

Gemini Nano is distributed via Google Play Services and must be downloaded to the device before use. The model is not bundled with your app.

### Check availability and download

Call [`systemAvailability()`](#systemavailability) to inspect the current state. If the status is `downloadable`, trigger the download with [`download()`](#download) and poll `systemAvailability()` until the status becomes `available`.

```typescript
import { LocalLLM } from '@capacitor/local-llm';

const { status } = await LocalLLM.systemAvailability();

if (status === 'downloadable') {
  await LocalLLM.download();
  // Poll systemAvailability() until status === 'available'
  // Alternatively, use addListener('systemAvailabilityChange', {}) to get notified of status updates
}
```

## Platform Limitations

### iOS

- **Text LLM requires iOS 26 and Apple Intelligence.** On iOS 18 and below, `systemAvailability()` returns `'unavailable'` for the text LLM and `prompt()` / `warmup()` will reject. Only select iPhones (iPhone 15 Pro or later) and iPads are compatible with Apple Inteligence. [More information here](https://www.apple.com/apple-intelligence/).
- **`download()` is not available on iOS.** The model is managed by the OS; use `systemAvailability()` to check readiness.
- **Context limit is 4096 tokens.** This applies to the combined length of system instructions, conversation history, and the current prompt.

### Android

- **`maximumOutputTokens` is clamped to 1–256** by the ML Kit API. Values outside this range will be coerced.
- **Multi-turn session context is managed in-memory** by manually assembling conversation history into each prompt. It is not a native session API and does not persist across app restarts.
- **`warmup()` ignores `sessionId` and `promptPrefix`** on Android — it warms up the model globally.
- **Not all Android 9+ devices support Gemini Nano.** The device must have a compatible on-device AI chip (e.g. Pixel 9 and later). [More information here](https://developers.google.com/ml-kit/genai#device-support).
- **On-device models cannot be used while the app is in the background.** Inference requests made while the app is backgrounded will fail.
- **AICore enforces an inference quota per app.** Making too many requests in a short period will result in an `BUSY` error response — consider exponential backoff when retrying. An `PER_APP_BATTERY_USE_QUOTA_EXCEEDED` error can be returned if an app exceeds a longer-duration quota (e.g. a daily limit).

## Usage

### Basic prompt

```typescript
import { LocalLLM } from '@capacitor/local-llm';

const { text } = await LocalLLM.prompt({
  prompt: 'Summarize the theory of relativity in one paragraph.',
});

console.log(text);
```

### Multi-turn conversation

Use a `sessionId` to maintain context across multiple prompts.

```typescript
import { LocalLLM } from '@capacitor/local-llm';

const sessionId = 'my-chat-session';

await LocalLLM.prompt({
  sessionId,
  instructions: 'You are a helpful assistant.',
  prompt: 'What is the capital of France?',
});

const { text } = await LocalLLM.prompt({
  sessionId,
  prompt: 'What is the population of that city?',
});

// Clean up when done
await LocalLLM.endSession({ sessionId });
```

### Reduce first-response latency with warmup

```typescript
import { LocalLLM } from '@capacitor/local-llm';

// Pre-initialize the model before the user starts typing
await LocalLLM.warmup({
  sessionId: 'my-session',
  promptPrefix: 'You are a customer support agent for Acme Corp.',
});
```

### Image generation (iOS only)

```typescript
import { LocalLLM } from '@capacitor/local-llm';

const { pngBase64Images } = await LocalLLM.generateImage({
  prompt: 'A serene mountain lake at sunrise, photorealistic',
  count: 2,
});

// Use directly in an <img> tag
const src = `data:image/png;base64,${pngBase64Images[0]}`;
```

## Error Handling

All plugin methods throw a `LocalLLMException` on failure. It extends `Error` and adds a machine-readable `code` property of type `LocalLLMErrorCode`.

```typescript
import { LocalLLM, LocalLLMException } from '@capacitor/local-llm';

try {
  await LocalLLM.prompt({ prompt: 'Hello' });
} catch (err) {
  if (err instanceof LocalLLMException) {
    console.log(err.code);    // e.g. 'LOCAL_LLM_NOT_ENABLED'
    console.log(err.message); // human-readable description
  }
}
```

### `LocalLLMErrorCode`

| Code | Description |
|------|-------------|
| `LOCAL_LLM_UNSUPPORTED_PLATFORM` | The current OS version or device hardware does not support on-device LLMs. |
| `LOCAL_LLM_NOT_ENABLED` | The on-device AI feature is supported but has not been enabled by the user (e.g. Apple Intelligence). |
| `LOCAL_LLM_NOT_READY` | The model exists on the device but is still downloading or initializing. |
| `LOCAL_LLM_UNAVAILABLE` | The model is unavailable for an unclassified reason. |
| `LOCAL_LLM_RESPONSE_IN_PROGRESS` | A prompt was sent to a session that is already generating a response. |
| `LOCAL_LLM_NOT_INITIALIZED` | The plugin implementation was not initialized. This should not occur under normal conditions. |
| `LOCAL_LLM_MISSING_PARAMETER` | A required call parameter was missing (e.g. `sessionId`, `prompt`). |
| `LOCAL_LLM_WEB_NOT_SUPPORTED` | The method was called on the web platform, which is not supported. |
| `LOCAL_LLM_IMAGE_GENERATION_FAILED` | Image generation failed (e.g. no available generation style). |
| `LOCAL_LLM_UNKNOWN_ERROR` | An unexpected error was thrown by the underlying platform SDK. Check `err.message` for details. |

## API

<docgen-index>

* [`systemAvailability()`](#systemavailability)
* [`download()`](#download)
* [`prompt(...)`](#prompt)
* [`endSession(...)`](#endsession)
* [`generateImage(...)`](#generateimage)
* [`warmup(...)`](#warmup)
* [`addListener('systemAvailabilityChange', ...)`](#addlistenersystemavailabilitychange-)
* [`removeAllListeners()`](#removealllisteners)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

The main plugin interface for interacting with on-device LLMs.

### systemAvailability()

```typescript
systemAvailability() => Promise<SystemAvailabilityResponse>
```

Checks the availability status of the on-device LLM.

Use this method to determine if the LLM is ready to use, needs to be downloaded,
or is unavailable on the device.

**Returns:** <code>Promise&lt;<a href="#systemavailabilityresponse">SystemAvailabilityResponse</a>&gt;</code>

**Since:** 1.0.0

--------------------


### download()

```typescript
download() => Promise<void>
```

Downloads the on-device LLM model.

This method initiates the download of the LLM model when it's not already
present on the device. Only available on Android.

**Since:** 1.0.0

--------------------


### prompt(...)

```typescript
prompt(options: PromptOptions) => Promise<PromptResponse>
```

Sends a prompt to the on-device LLM and receives a response.

Use this method to interact with the LLM. You can optionally provide a sessionId
to maintain conversation context across multiple prompts.

| Param         | Type                                                    | Description                                                               |
| ------------- | ------------------------------------------------------- | ------------------------------------------------------------------------- |
| **`options`** | <code><a href="#promptoptions">PromptOptions</a></code> | - The prompt options including the text prompt and optional configuration |

**Returns:** <code>Promise&lt;<a href="#promptresponse">PromptResponse</a>&gt;</code>

**Since:** 1.0.0

--------------------


### endSession(...)

```typescript
endSession(options: EndSessionOptions) => Promise<void>
```

Ends an active LLM session.

Use this method to clean up resources when you're done with a conversation session.
This is important for managing memory and preventing resource leaks.

| Param         | Type                                                            | Description                                   |
| ------------- | --------------------------------------------------------------- | --------------------------------------------- |
| **`options`** | <code><a href="#endsessionoptions">EndSessionOptions</a></code> | - The options containing the sessionId to end |

**Since:** 1.0.0

--------------------


### generateImage(...)

```typescript
generateImage(options: GenerateImageOptions) => Promise<GenerateImageResponse>
```

Generates images from a text prompt using the on-device LLM.

Use this method to create images based on text descriptions. Optionally provide
reference images to influence the generation. The generated images are returned
as base64-encoded PNG strings in an array.

| Param         | Type                                                                  | Description                                                                               |
| ------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#generateimageoptions">GenerateImageOptions</a></code> | - The image generation options including the prompt, optional reference images, and count |

**Returns:** <code>Promise&lt;<a href="#generateimageresponse">GenerateImageResponse</a>&gt;</code>

**Since:** 1.0.0

--------------------


### warmup(...)

```typescript
warmup(options: WarmupOptions) => Promise<void>
```

Warms up the on-device LLM for faster initial responses.

Use this method to pre-initialize the LLM with a prompt prefix, reducing latency
for the first actual prompt. This is useful when you know in advance the type of
prompts you'll be sending.

| Param         | Type                                                    | Description                                      |
| ------------- | ------------------------------------------------------- | ------------------------------------------------ |
| **`options`** | <code><a href="#warmupoptions">WarmupOptions</a></code> | - The warmup options including the prompt prefix |

**Since:** 1.0.0

--------------------


### addListener('systemAvailabilityChange', ...)

```typescript
addListener(eventName: 'systemAvailabilityChange', listenerFunc: SystemAvailabilityChangeListener) => Promise<PluginListenerHandle>
```

Registers a listener that is called whenever the on-device LLM availability status changes.

The listener is invoked with the new availability status each time it changes. Polling
begins when the first listener is added and stops when all listeners are removed via
`removeAllListeners()`.

| Param              | Type                                                                                          | Description                                                            |
| ------------------ | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **`eventName`**    | <code>'systemAvailabilityChange'</code>                                                       | - The event name to listen for                                         |
| **`listenerFunc`** | <code><a href="#systemavailabilitychangelistener">SystemAvailabilityChangeListener</a></code> | - The callback invoked with the new availability status on each change |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

--------------------


### Interfaces


#### SystemAvailabilityResponse

Response containing the system availability status of the on-device LLM.

| Prop         | Type                                                        | Description                                 | Since |
| ------------ | ----------------------------------------------------------- | ------------------------------------------- | ----- |
| **`status`** | <code><a href="#llmavailability">LLMAvailability</a></code> | The current availability status of the LLM. | 1.0.0 |


#### PromptResponse

Response from the LLM after processing a prompt.

| Prop       | Type                | Description                             | Since |
| ---------- | ------------------- | --------------------------------------- | ----- |
| **`text`** | <code>string</code> | The text response generated by the LLM. | 1.0.0 |


#### PromptOptions

Options for sending a prompt to the LLM.

| Prop               | Type                                              | Description                                                                                                                                                                                       | Since |
| ------------------ | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`sessionId`**    | <code>string</code>                               | Optional session identifier for maintaining conversation context. Provide the same sessionId across multiple prompts to maintain context. If not provided, each prompt is treated as independent. | 1.0.0 |
| **`instructions`** | <code>string</code>                               | System-level instructions to guide the LLM's behavior. Use this to set the role, tone, or constraints for the LLM's responses.                                                                    | 1.0.0 |
| **`options`**      | <code><a href="#llmoptions">LLMOptions</a></code> | Configuration options for controlling LLM inference behavior.                                                                                                                                     | 1.0.0 |
| **`prompt`**       | <code>string</code>                               | The text prompt to send to the LLM.                                                                                                                                                               | 1.0.0 |


#### LLMOptions

Configuration options for LLM inference behavior.

| Prop                      | Type                | Description                                                                                                                                                          | Since |
| ------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`temperature`**         | <code>number</code> | Controls randomness in the model's output. Higher values (e.g., 0.8) make output more random, while lower values (e.g., 0.2) make it more focused and deterministic. | 1.0.0 |
| **`maximumOutputTokens`** | <code>number</code> | The maximum number of tokens to generate in the response. On Android, this must be between 1 and 256.                                                                | 1.0.0 |


#### EndSessionOptions

Options for ending an active LLM session.

| Prop            | Type                | Description                                                                                            | Since |
| --------------- | ------------------- | ------------------------------------------------------------------------------------------------------ | ----- |
| **`sessionId`** | <code>string</code> | The identifier of the session to end. This should match the sessionId used in previous prompt() calls. | 1.0.0 |


#### GenerateImageResponse

Response containing the generated image data.

| Prop                  | Type                  | Description                                                                                                                                                                          | Since |
| --------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`pngBase64Images`** | <code>string[]</code> | Array of generated images as base64-encoded PNG strings. Each string contains raw base64 data (without data URI prefix). To use in an img tag, prefix with 'data:image/png;base64,'. | 1.0.0 |


#### GenerateImageOptions

Options for generating an image from a text prompt.

| Prop               | Type                  | Description                                                                                                                                                                                                                                                                                              | Default        | Since |
| ------------------ | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ----- |
| **`prompt`**       | <code>string</code>   | The text prompt describing the image to generate.                                                                                                                                                                                                                                                        |                | 1.0.0 |
| **`promptImages`** | <code>string[]</code> | Optional array of reference images to influence the generated output. Provide base64-encoded image strings (with or without data URI prefix) that will be used as visual context or inspiration for the image generation. This allows you to combine text and image concepts for more controlled output. |                | 1.0.0 |
| **`count`**        | <code>number</code>   | The number of image variations to generate. Defaults to 1 if not specified.                                                                                                                                                                                                                              | <code>1</code> | 1.0.0 |


#### WarmupOptions

Options for warming up the on-device LLM.

| Prop               | Type                | Description                                                                                                                                                         | Since |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`sessionId`**    | <code>string</code> | The session identifier for the warmup. This identifier will be associated with the warmed-up session, allowing you to use the same session for subsequent prompts.  | 1.0.0 |
| **`promptPrefix`** | <code>string</code> | The prompt prefix to use for warming up the LLM. This text will be used to pre-initialize the model, reducing latency for subsequent prompts with similar prefixes. | 1.0.0 |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### Type Aliases


#### LLMAvailability

Availability status of the on-device LLM.

<code>'available' | 'unavailable' | 'notready' | 'downloadable'</code>


#### SystemAvailabilityChangeListener

Callback invoked when the on-device LLM availability status changes.

<code>(response: <a href="#systemavailabilityresponse">SystemAvailabilityResponse</a>): void</code>

</docgen-api>
