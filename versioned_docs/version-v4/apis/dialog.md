---
title: Dialog Capacitor Plugin API
description: The Dialog API provides methods for triggering native dialog windows for alerts, confirmations, and input prompts
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/dialog/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/dialog/src/definitions.ts
sidebar_label: Dialog
---

# @capacitor/dialog

The Dialog API provides methods for triggering native dialog windows for alerts, confirmations, and input prompts

## Install

```bash
npm install @capacitor/dialog
npx cap sync
```

## Example

```typescript
import { Dialog } from '@capacitor/dialog';

const showAlert = async () => {
  await Dialog.alert({
    title: 'Stop',
    message: 'this is an error',
  });
};

const showConfirm = async () => {
  const { value } = await Dialog.confirm({
    title: 'Confirm',
    message: `Are you sure you'd like to press the red button?`,
  });

  console.log('Confirmed:', value);
};

const showPrompt = async () => {
  const { value, cancelled } = await Dialog.prompt({
    title: 'Hello',
    message: `What's your name?`,
  });

  console.log('Name:', value);
  console.log('Cancelled:', cancelled);
};
```

## API

<docgen-index>

* [`alert(...)`](#alert)
* [`prompt(...)`](#prompt)
* [`confirm(...)`](#confirm)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>


### alert(...)

```typescript
alert(options: AlertOptions) => Promise<void>
```

Show an alert dialog

| Param         | Type                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | `<a href="#alertoptions">AlertOptions</a>` |

**Since:** 1.0.0

--------------------


### prompt(...)

```typescript
prompt(options: PromptOptions) => Promise<PromptResult>
```

Show a prompt dialog

| Param         | Type                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | `<a href="#promptoptions">PromptOptions</a>` |

**Returns:** `Promise&lt;<a href="#promptresult">PromptResult</a>&gt;`

**Since:** 1.0.0

--------------------


### confirm(...)

```typescript
confirm(options: ConfirmOptions) => Promise<ConfirmResult>
```

Show a confirmation dialog

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | `<a href="#confirmoptions">ConfirmOptions</a>` |

**Returns:** `Promise&lt;<a href="#confirmresult">ConfirmResult</a>&gt;`

**Since:** 1.0.0

--------------------


### Interfaces


#### AlertOptions

| Prop              | Type                | Description                       | Default           | Since |
| ----------------- | ------------------- | --------------------------------- | ----------------- | ----- |
| **`title`**       | `string` | Title of the dialog.              |                   | 1.0.0 |
| **`message`**     | `string` | Message to show on the dialog.    |                   | 1.0.0 |
| **`buttonTitle`** | `string` | Text to use on the action button. | `"OK"` | 1.0.0 |


#### PromptResult

| Prop            | Type                 | Description                                     | Since |
| --------------- | -------------------- | ----------------------------------------------- | ----- |
| **`value`**     | `string`  | Text entered on the prompt.                     | 1.0.0 |
| **`cancelled`** | `boolean` | Whether if the prompt was canceled or accepted. | 1.0.0 |


#### PromptOptions

| Prop                    | Type                | Description                                | Default               | Since |
| ----------------------- | ------------------- | ------------------------------------------ | --------------------- | ----- |
| **`title`**             | `string` | Title of the dialog.                       |                       | 1.0.0 |
| **`message`**           | `string` | Message to show on the dialog.             |                       | 1.0.0 |
| **`okButtonTitle`**     | `string` | Text to use on the positive action button. | `"OK"`     | 1.0.0 |
| **`cancelButtonTitle`** | `string` | Text to use on the negative action button. | `"Cancel"` | 1.0.0 |
| **`inputPlaceholder`**  | `string` | Placeholder text for hints.                |                       | 1.0.0 |
| **`inputText`**         | `string` | Prepopulated text.                         |                       | 1.0.0 |


#### ConfirmResult

| Prop        | Type                 | Description                                               | Since |
| ----------- | -------------------- | --------------------------------------------------------- | ----- |
| **`value`** | `boolean` | true if the positive button was clicked, false otherwise. | 1.0.0 |


#### ConfirmOptions

| Prop                    | Type                | Description                                | Default               | Since |
| ----------------------- | ------------------- | ------------------------------------------ | --------------------- | ----- |
| **`title`**             | `string` | Title of the dialog.                       |                       | 1.0.0 |
| **`message`**           | `string` | Message to show on the dialog.             |                       | 1.0.0 |
| **`okButtonTitle`**     | `string` | Text to use on the positive action button. | `"OK"`     | 1.0.0 |
| **`cancelButtonTitle`** | `string` | Text to use on the negative action button. | `"Cancel"` | 1.0.0 |

</docgen-api>