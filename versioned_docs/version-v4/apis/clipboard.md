---
title: Clipboard Capacitor Plugin API
description: The Clipboard API enables copy and pasting to/from the system clipboard.
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/clipboard/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/clipboard/src/definitions.ts
sidebar_label: Clipboard
---

# @capacitor/clipboard

The Clipboard API enables copy and pasting to/from the system clipboard.

## Install

```bash
npm install @capacitor/clipboard
npx cap sync
```

## Example

```typescript
import { Clipboard } from '@capacitor/clipboard';

const writeToClipboard = async () => {
  await Clipboard.write({
    string: "Hello World!"
  });
};

const checkClipboard = async () => {
  const { type, value } = await Clipboard.read();

  console.log(`Got ${type} from clipboard: ${value}`);
};
```

## API

<docgen-index>

* [`write(...)`](#write)
* [`read()`](#read)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>


### write(...)

```typescript
write(options: WriteOptions) => Promise<void>
```

Write a value to the clipboard (the "copy" action)

| Param         | Type                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | `<a href="#writeoptions">WriteOptions</a>` |

**Since:** 1.0.0

--------------------


### read()

```typescript
read() => Promise<ReadResult>
```

Read a value from the clipboard (the "paste" action)

**Returns:** `Promise&lt;<a href="#readresult">ReadResult</a>&gt;`

**Since:** 1.0.0

--------------------


### Interfaces


#### WriteOptions

Represents the data to be written to the clipboard.

| Prop         | Type                | Description                                                                                                     | Since |
| ------------ | ------------------- | --------------------------------------------------------------------------------------------------------------- | ----- |
| **`string`** | `string` | Text value to copy.                                                                                             | 1.0.0 |
| **`image`**  | `string` | Image in [Data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) format to copy. | 1.0.0 |
| **`url`**    | `string` | URL string to copy.                                                                                             | 1.0.0 |
| **`label`**  | `string` | User visible label to accompany the copied data (Android Only).                                                 | 1.0.0 |


#### ReadResult

Represents the data read from the clipboard.

| Prop        | Type                | Description                    | Since |
| ----------- | ------------------- | ------------------------------ | ----- |
| **`value`** | `string` | Data read from the clipboard.  | 1.0.0 |
| **`type`**  | `string` | Type of data in the clipboard. | 1.0.0 |

</docgen-api>