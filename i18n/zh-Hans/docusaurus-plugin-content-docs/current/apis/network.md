---
title: 网络 Capacitor 插件 API
description: 网络 API 提供网络和连接信息。
custom_edit_url: https://github.com/ionic-team/capacitor-plugins/blob/main/network/README.md
editApiUrl: https://github.com/ionic-team/capacitor-plugins/blob/main/network/src/definitions.ts
sidebar_label: 网络
---

# @capacitor/network

网络 API 提供网络和连接信息。

## 安装

```bash
npm install @capacitor/network
npx cap sync
```

## 示例

```typescript
import { Network } from '@capacitor/network';

Network.addListener('networkStatusChange', status => {
  console.log('Network status changed', status);
});

const logCurrentNetworkStatus = async () => {
  const status = await Network.getStatus();

  console.log('Network status:', status);
};
```

## API

<docgen-index>

* [`getStatus()`](#getstatus)
* [`addListener('networkStatusChange', ...)`](#addlistenernetworkstatuschange-)
* [`removeAllListeners()`](#removealllisteners)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getStatus()

```typescript
getStatus() => Promise<ConnectionStatus>
```

查询网络连接的当前状态。

**Returns:** <code>Promise&lt;<a href="#connectionstatus">ConnectionStatus</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('networkStatusChange', ...)

```typescript
addListener(eventName: 'networkStatusChange', listenerFunc: ConnectionStatusChangeListener) => Promise<PluginListenerHandle>
```

监听网络连接的更改。

| Param              | Type                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'networkStatusChange'</code>                                                        |
| **`listenerFunc`** | <code><a href="#connectionstatuschangelistener">ConnectionStatusChangeListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

删除此插件的所有监听器（包括网络状态更改）。

**Since:** 1.0.0

--------------------


### Interfaces


#### ConnectionStatus

表示网络连接的状态和类型。

| Prop                 | Type                                                      | Description                                                                                                                   | Since |
| -------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`connected`**      | <code>boolean</code>                                      | 是否有活动连接。                                                                                                                   | 1.0.0 |
| **`connectionType`** | <code><a href="#connectiontype">ConnectionType</a></code> | 当前使用的网络连接类型。如果没有活动网络连接，`connectionType` 将为 `'none'`。                                                                | 1.0.0 |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### Type Aliases


#### ConnectionType

设备可能具有的网络连接类型。

<code>'wifi' | 'cellular' | 'none' | 'unknown'</code>


#### ConnectionStatusChangeListener

接收状态更改通知的回调。

<code>(status: <a href="#connectionstatus">ConnectionStatus</a>): void</code>

</docgen-api>
