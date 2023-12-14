---
title: Modals
description: Modals API
contributors:
  - mlynch
  - jcesarmobile
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

The Modals API provides methods for triggering native modal windows for alerts, confirmations, and input prompts, as
well as Action Sheets.

- [`alert(...)`](#alert)
- [`prompt(...)`](#prompt)
- [`confirm(...)`](#confirm)
- [`showActions(...)`](#showactions)
- [Interfaces](#interfaces)
- [Enums](#enums)

## Example

```typescript
import { Plugins, ActionSheetOptionStyle } from '@capacitor/core';

const { Modals } = Plugins;

async showAlert() {
  let alertRet = await Modals.alert({
    title: 'Stop',
    message: 'this is an error'
  });
}

async showConfirm() {
  let confirmRet = await Modals.confirm({
    title: 'Confirm',
    message: 'Are you sure you\'d like to press the red button?'
  });
  console.log('Confirm ret', confirmRet);
}

async showPrompt() {
  let promptRet = await Modals.prompt({
    title: 'Hello',
    message: 'What\'s your name?'
  });
  console.log('Prompt ret', promptRet);
}

async showActions() {
  let promptRet = await Modals.showActions({
    title: 'Photo Options',
    message: 'Select an option to perform',
    options: [
      {
        title: 'Upload'
      },
      {
        title: 'Share'
      },
      {
        title: 'Remove',
        style: ActionSheetOptionStyle.Destructive
      }
    ]
  })
  console.log('You selected', promptRet);
}
```

## API

### alert(...)

```typescript
alert(options: AlertOptions) => Promise<void>
```

Show an alert modal

| Param         | Type                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | `<a href="#alertoptions">AlertOptions</a>` |

---

### prompt(...)

```typescript
prompt(options: PromptOptions) => Promise<PromptResult>
```

Show a prompt modal

| Param         | Type                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | `<a href="#promptoptions">PromptOptions</a>` |

**Returns:** `Promise&lt;<a href="#promptresult">PromptResult</a>&gt;`

---

### confirm(...)

```typescript
confirm(options: ConfirmOptions) => Promise<ConfirmResult>
```

Show a confirmation modal

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | `<a href="#confirmoptions">ConfirmOptions</a>` |

**Returns:** `Promise&lt;<a href="#confirmresult">ConfirmResult</a>&gt;`

---

### showActions(...)

```typescript
showActions(options: ActionSheetOptions) => Promise<ActionSheetResult>
```

Show an Action Sheet style modal with various options for the user
to select.

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | `<a href="#actionsheetoptions">ActionSheetOptions</a>` |

**Returns:** `Promise&lt;<a href="#actionsheetresult">ActionSheetResult</a>&gt;`

---

### Interfaces

#### AlertOptions

| Prop              | Type                |
| ----------------- | ------------------- |
| **`title`**       | `string` |
| **`message`**     | `string` |
| **`buttonTitle`** | `string` |

#### PromptResult

| Prop            | Type                 |
| --------------- | -------------------- |
| **`value`**     | `string`  |
| **`cancelled`** | `boolean` |

#### PromptOptions

| Prop                    | Type                |
| ----------------------- | ------------------- |
| **`title`**             | `string` |
| **`message`**           | `string` |
| **`okButtonTitle`**     | `string` |
| **`cancelButtonTitle`** | `string` |
| **`inputPlaceholder`**  | `string` |
| **`inputText`**         | `string` |

#### ConfirmResult

| Prop        | Type                 |
| ----------- | -------------------- |
| **`value`** | `boolean` |

#### ConfirmOptions

| Prop                    | Type                |
| ----------------------- | ------------------- |
| **`title`**             | `string` |
| **`message`**           | `string` |
| **`okButtonTitle`**     | `string` |
| **`cancelButtonTitle`** | `string` |

#### ActionSheetResult

| Prop        | Type                |
| ----------- | ------------------- |
| **`index`** | `number` |

#### ActionSheetOptions

| Prop          | Type                             | Description |
| ------------- | -------------------------------- | ----------- |
| **`title`**   | `string`              |             |
| **`message`** | `string`              | iOS only    |
| **`options`** | `ActionSheetOption[]` |             |

#### ActionSheetOption

| Prop        | Type                                                                      | Description                              |
| ----------- | ------------------------------------------------------------------------- | ---------------------------------------- |
| **`title`** | `string`                                                       |                                          |
| **`style`** | `<a href="#actionsheetoptionstyle">ActionSheetOptionStyle</a>` |                                          |
| **`icon`**  | `string`                                                       | Icon for web (ionicon naming convention) |

### Enums

#### ActionSheetOptionStyle

| Members           | Value                      |
| ----------------- | -------------------------- |
| **`Default`**     | `"DEFAULT"`     |
| **`Destructive`** | `"DESTRUCTIVE"` |
| **`Cancel`**      | `"CANCEL"`      |
