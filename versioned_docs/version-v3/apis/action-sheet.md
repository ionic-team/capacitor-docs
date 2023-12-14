---
title: Action Sheet Capacitor Plugin API
description: The Action Sheet API provides access to native Action Sheets, which come up from the bottom of the screen and display actions a user can take.
editUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/action-sheet/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/action-sheet/src/definitions.ts
sidebar_label: Action Sheet
---

# @capacitor/action-sheet

The Action Sheet API provides access to native Action Sheets, which come up from the bottom of the screen and display actions a user can take.

## Install

```bash
npm install @capacitor/action-sheet
npx cap sync
```

### Variables

This plugin will use the following project variables (defined in your app's `variables.gradle` file):

- `$androidxMaterialVersion`: version of `com.google.android.material:material` (default: `1.3.0`)

## PWA Notes

[PWA Elements](https://capacitorjs.com/docs/v3/web/pwa-elements) are required for Action Sheet plugin to work.

## Example

```typescript
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';

const showActions = async () => {
  const result = await ActionSheet.showActions({
    title: 'Photo Options',
    message: 'Select an option to perform',
    options: [
      {
        title: 'Upload',
      },
      {
        title: 'Share',
      },
      {
        title: 'Remove',
        style: ActionSheetButtonStyle.Destructive,
      },
    ],
  });

  console.log('Action Sheet result:', result);
};
```

## API

<docgen-index>

* [`showActions(...)`](#showactions)
* [Interfaces](#interfaces)
* [Enums](#enums)

</docgen-index>

<docgen-api>


### showActions(...)

```typescript
showActions(options: ShowActionsOptions) => Promise<ShowActionsResult>
```

Show an Action Sheet style modal with various options for the user
to select.

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | `<a href="#showactionsoptions">ShowActionsOptions</a>` |

**Returns:** `Promise&lt;<a href="#showactionsresult">ShowActionsResult</a>&gt;`

**Since:** 1.0.0

--------------------


### Interfaces


#### ShowActionsResult

| Prop        | Type                | Description                                  | Since |
| ----------- | ------------------- | -------------------------------------------- | ----- |
| **`index`** | `number` | The index of the clicked option (Zero-based) | 1.0.0 |


#### ShowActionsOptions

| Prop          | Type                             | Description                                                              | Since |
| ------------- | -------------------------------- | ------------------------------------------------------------------------ | ----- |
| **`title`**   | `string`              | The title of the Action Sheet.                                           | 1.0.0 |
| **`message`** | `string`              | A message to show under the title. This option is only supported on iOS. | 1.0.0 |
| **`options`** | `ActionSheetButton[]` | Options the user can choose from.                                        | 1.0.0 |


#### ActionSheetButton

| Prop        | Type                                                                      | Description                                                                           | Since |
| ----------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----- |
| **`title`** | `string`                                                       | The title of the option                                                               | 1.0.0 |
| **`style`** | `<a href="#actionsheetbuttonstyle">ActionSheetButtonStyle</a>` | The style of the option This option is only supported on iOS.                         | 1.0.0 |
| **`icon`**  | `string`                                                       | Icon for the option (ionicon naming convention) This option is only supported on Web. | 1.0.0 |


### Enums


#### ActionSheetButtonStyle

| Members           | Value                      | Description                                                                                                 | Since |
| ----------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------- | ----- |
| **`Default`**     | `'DEFAULT'`     | Default style of the option.                                                                                | 1.0.0 |
| **`Destructive`** | `'DESTRUCTIVE'` | Style to use on destructive options.                                                                        | 1.0.0 |
| **`Cancel`**      | `'CANCEL'`      | Style to use on the option that cancels the Action Sheet. If used, should be on the latest availabe option. | 1.0.0 |

</docgen-api>
