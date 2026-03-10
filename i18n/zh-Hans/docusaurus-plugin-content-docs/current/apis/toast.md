---
title: 提示 Capacitor 插件 API
description: 提示 API 提供了一个通知弹出窗口,用于向用户显示重要信息。就像真正的吐司一样!
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/toast/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/toast/src/definitions.ts
sidebar_label: 提示
---

# @capacitor/toast

提示 API 提供了一个通知弹出窗口,用于向用户显示重要信息。就像真正的吐司一样!

## 安装

```bash
npm install @capacitor/toast
npx cap sync
```

## PWA 注意事项

提示插件需要 [PWA Elements](https://capacitorjs.com/docs/web/pwa-elements) 才能工作。

## 示例

```typescript
import { Toast } from '@capacitor/toast';

const showHelloToast = async () => {
  await Toast.show({
    text: '你好!',
  });
};
```

## API

<docgen-index>

* [`show(...)`](#show)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### show(...)

```typescript
show(options: ShowOptions) => Promise<void>
```

在屏幕上显示提示

| Param         | Type                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#showoptions">ShowOptions</a></code> |

**Since:** 1.0.0

--------------------


### Interfaces


#### ShowOptions

| Prop           | Type                                       | Description                                                            | Default               | Since |
| -------------- | ------------------------------------------ | ---------------------------------------------------------------------- | --------------------- | ----- |
| **`text`**     | <code>string</code>                        | 在提示上显示的文本                                                         |                       | 1.0.0 |
| **`duration`** | <code>'short' \| 'long'</code>             | 提示的持续时间,可以是 'short'(2000ms) 或 'long'(3500ms)                     | <code>'short'</code>  | 1.0.0 |
| **`position`** | <code>'top' \| 'center' \| 'bottom'</code> | 提示的位置。在 Android 12 及更高版本上,所有提示都在底部显示。                              | <code>'bottom'</code> | 1.0.0 |

</docgen-api>
