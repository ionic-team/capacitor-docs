---
title: Text Zoom Capacitor 插件 API
description: Text Zoom API 提供了更改 Web View 文本大小的功能，以提升视觉可访问性。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/text-zoom/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/text-zoom/src/definitions.ts
sidebar_label: Text Zoom
---

# @capacitor/text-zoom

Text Zoom API 提供了更改 Web View 文本大小的功能，以提升视觉可访问性。

**注意：** 除非在 [Capacitor 配置文件](https://capacitorjs.com/docs/config) 中将 `preferredContentMode` 配置设置为 `mobile`，否则 text-zoom 插件在 iPad 上将无法工作。

```json
{
  "ios": {
    "preferredContentMode": "mobile"
  }
}
```

## 安装

```bash
npm install @capacitor/text-zoom
npx cap sync
```

## API

<docgen-index>

* [`get()`](#get)
* [`getPreferred()`](#getpreferred)
* [`set(...)`](#set)
* [接口](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### get()

```typescript
get() => Promise<GetResult>
```

获取当前缩放级别。

缩放级别以小数表示（例如 1.2 表示 120%）。

**返回值：** <code>Promise&lt;<a href="#getresult">GetResult</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### getPreferred()

```typescript
getPreferred() => Promise<GetPreferredResult>
```

获取首选缩放级别。

缩放级别以小数表示（例如 1.2 表示 120%）。

**返回值：** <code>Promise&lt;<a href="#getpreferredresult">GetPreferredResult</a>&gt;</code>

**自版本：** 1.0.0

--------------------


### set(...)

```typescript
set(options: SetOptions) => Promise<void>
```

设置当前缩放级别。

缩放级别以小数表示（例如 1.2 表示 120%）。

| 参数          | 类型                                                |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#setoptions">SetOptions</a></code> |

**自版本：** 1.0.0

--------------------


### 接口


#### GetResult

| 属性          | 类型                | 描述                                         | 自版本 |
| ----------- | ------------------- | -------------------------------------------------- | ----- |
| **`value`** | <code>number</code> | 当前缩放级别（以小数表示）。 | 1.0.0 |


#### GetPreferredResult

| 属性          | 类型                | 描述                                           | 自版本 |
| ----------- | ------------------- | ---------------------------------------------------- | ----- |
| **`value`** | <code>number</code> | 首选缩放级别（以小数表示）。 | 1.0.0 |


#### SetOptions

| 属性          | 类型                | 描述                                     | 自版本 |
| ----------- | ------------------- | ---------------------------------------------- | ----- |
| **`value`** | <code>number</code> | 新的缩放级别（以小数表示）。 | 1.0.0 |

</docgen-api>