---
title: 动作表 Capacitor 插件 API
description: 动作表 API 提供对原生动作表的访问,动作表从屏幕底部弹出并显示用户可以执行的操作。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/action-sheet/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/action-sheet/src/definitions.ts
sidebar_label: 动作表
---

# @capacitor/action-sheet

动作表 API 提供对原生动作表的访问,动作表从屏幕底部弹出并显示用户可以执行的操作。

## 安装

```bash
npm install @capacitor/action-sheet
npx cap sync
```

### 变量

此插件将使用以下项目变量(在应用程序的 `variables.gradle` 文件中定义):

- `androidxMaterialVersion`:`com.google.android.material:material` 的版本(默认:`1.13.0`)

## PWA 说明

动作表插件需要 [PWA Elements](https://capacitorjs.com/docs/web/pwa-elements) 才能工作。

## 示例

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
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### showActions(...)

```typescript
showActions(options: ShowActionsOptions) => Promise<ShowActionsResult>
```

显示一个动作表样式的模态框,其中包含用户可以选择的各种选项。

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#showactionsoptions">ShowActionsOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#showactionsresult">ShowActionsResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### Interfaces


#### ShowActionsResult

| Prop           | Type                 | Description                                                                                                                                                                                                                                                         | Since |
| -------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`index`**    | <code>number</code>  | 点击的选项的索引(从零开始),如果动作表被取消则为 -1。在 iOS 上,如果有一个带有 <a href="#actionsheetbuttonstyle">ActionSheetButtonStyle.Cancel</a> 样式的按钮,并且用户点击动作表外部,则返回取消选项的索引 | 1.0.0 |
| **`canceled`** | <code>boolean</code> | 如果动作表被用户取消则为 true;否则为 false。在 Web 上,需要 @ionic/pwa-elements 版本 3.4.0 或更高。                                                                                                                                            | 8.1.0 |


#### ShowActionsOptions

| Prop             | Type                             | Description                                                                                                                                                                                                                               | Since |
| ---------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`title`**      | <code>string</code>              | 动作表的标题。                                                                                                                                                                                                            | 1.0.0 |
| **`message`**    | <code>string</code>              | 在标题下显示的消息。此选项仅在 iOS 上受支持。                                                                                                                                                                  | 1.0.0 |
| **`options`**    | <code>ActionSheetButton[]</code> | 用户可以选择的选项。                                                                                                                                                                                                         | 1.0.0 |
| **`cancelable`** | <code>boolean</code>             | 如果为 true,则在点击外部时取消动作表;如果为 false,则不会。默认为 false。在 iOS 上不可用,动作表始终可以通过点击外部来取消。在 Web 上,需要 @ionic/pwa-elements 版本 3.4.0 或更高。 | 8.1.0 |


#### ActionSheetButton

| Prop        | Type                                                                      | Description                                                                           | Since |
| ----------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----- |
| **`title`** | <code>string</code>                                                       | 选项的标题                                                               | 1.0.0 |
| **`style`** | <code><a href="#actionsheetbuttonstyle">ActionSheetButtonStyle</a></code> | 选项的样式。此选项仅在 iOS 上受支持。                         | 1.0.0 |
| **`icon`**  | <code>string</code>                                                       | 选项的图标(ionicon 命名约定)。此选项仅在 Web 上受支持。 | 1.0.0 |


### Enums


#### ActionSheetButtonStyle

| Members           | Value                      | Description                                                                                                 | Since |
| ----------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------- | ----- |
| **`Default`**     | <code>'DEFAULT'</code>     | 选项的默认样式。                                                                                | 1.0.0 |
| **`Destructive`** | <code>'DESTRUCTIVE'</code> | 用于破坏性选项的样式。                                                                        | 1.0.0 |
| **`Cancel`**      | <code>'CANCEL'</code>      | 用于取消动作表的选项的样式。如果使用,应该放在最后一个可用选项上。 | 1.0.0 |

</docgen-api>
