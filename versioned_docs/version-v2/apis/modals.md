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
| **`options`** | <code><a href="#alertoptions">AlertOptions</a></code> |

---

### prompt(...)

```typescript
prompt(options: PromptOptions) => Promise<PromptResult>
```

Show a prompt modal

| Param         | Type                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#promptoptions">PromptOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#promptresult">PromptResult</a>&gt;</code>

---

### confirm(...)

```typescript
confirm(options: ConfirmOptions) => Promise<ConfirmResult>
```

Show a confirmation modal

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#confirmoptions">ConfirmOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#confirmresult">ConfirmResult</a>&gt;</code>

---

### showActions(...)

```typescript
showActions(options: ActionSheetOptions) => Promise<ActionSheetResult>
```

Show an Action Sheet style modal with various options for the user
to select.

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#actionsheetoptions">ActionSheetOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#actionsheetresult">ActionSheetResult</a>&gt;</code>

---

### Interfaces

#### AlertOptions

| Prop              | Type                |
| ----------------- | ------------------- |
| **`title`**       | <code>string</code> |
| **`message`**     | <code>string</code> |
| **`buttonTitle`** | <code>string</code> |

#### PromptResult

| Prop            | Type                 |
| --------------- | -------------------- |
| **`value`**     | <code>string</code>  |
| **`cancelled`** | <code>boolean</code> |

#### PromptOptions

| Prop                    | Type                |
| ----------------------- | ------------------- |
| **`title`**             | <code>string</code> |
| **`message`**           | <code>string</code> |
| **`okButtonTitle`**     | <code>string</code> |
| **`cancelButtonTitle`** | <code>string</code> |
| **`inputPlaceholder`**  | <code>string</code> |
| **`inputText`**         | <code>string</code> |

#### ConfirmResult

| Prop        | Type                 |
| ----------- | -------------------- |
| **`value`** | <code>boolean</code> |

#### ConfirmOptions

| Prop                    | Type                |
| ----------------------- | ------------------- |
| **`title`**             | <code>string</code> |
| **`message`**           | <code>string</code> |
| **`okButtonTitle`**     | <code>string</code> |
| **`cancelButtonTitle`** | <code>string</code> |

#### ActionSheetResult

| Prop        | Type                |
| ----------- | ------------------- |
| **`index`** | <code>number</code> |

#### ActionSheetOptions

| Prop          | Type                             | Description |
| ------------- | -------------------------------- | ----------- |
| **`title`**   | <code>string</code>              |             |
| **`message`** | <code>string</code>              | iOS only    |
| **`options`** | <code>ActionSheetOption[]</code> |             |

#### ActionSheetOption

| Prop        | Type                                                                      | Description                              |
| ----------- | ------------------------------------------------------------------------- | ---------------------------------------- |
| **`title`** | <code>string</code>                                                       |                                          |
| **`style`** | <code><a href="#actionsheetoptionstyle">ActionSheetOptionStyle</a></code> |                                          |
| **`icon`**  | <code>string</code>                                                       | Icon for web (ionicon naming convention) |

### Enums

#### ActionSheetOptionStyle

| Members           | Value                      |
| ----------------- | -------------------------- |
| **`Default`**     | <code>"DEFAULT"</code>     |
| **`Destructive`** | <code>"DESTRUCTIVE"</code> |
| **`Cancel`**      | <code>"CANCEL"</code>      |
