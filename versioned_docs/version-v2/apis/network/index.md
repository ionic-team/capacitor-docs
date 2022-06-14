---
title: Network
description: Network API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/network
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

# Network

The Network API provides events for monitoring network status changes, along with querying the current state of the network.



- [`getStatus()`](#getstatus)
- [`addListener(...)`](#addlistener)
- [`removeAllListeners()`](#removealllisteners)
- [Interfaces](#interfaces)



## Example

```typescript
import { Plugins } from '@capacitor/core';

const { Network } = Plugins;

let handler = Network.addListener('networkStatusChange', (status) => {
  console.log("Network status changed", status);
});
// To stop listening:
// handler.remove();

// Get the current network status
let status = await Network.getStatus();

// Example output:
{
  "connected": true,
  "connectionType": "wifi"
}
```

## Android Note

The Network API requires the following permission be added to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

This permission allows the app to access information about the current network, such as whether it is connected to wifi or cellular.

## API




### getStatus()

```typescript
getStatus() => Promise<NetworkStatus>
```

Query the current network status

**Returns:** <code>Promise&lt;<a href="#networkstatus">NetworkStatus</a>&gt;</code>

---

### addListener(...)

```typescript
addListener(eventName: 'networkStatusChange', listenerFunc: (status: NetworkStatus) => void) => PluginListenerHandle
```

Listen for network status change events

| Param              | Type                                                                         |
| ------------------ | ---------------------------------------------------------------------------- |
| **`eventName`**    | <code>"networkStatusChange"</code>                                           |
| **`listenerFunc`** | <code>(status: <a href="#networkstatus">NetworkStatus</a>) =&gt; void</code> |

**Returns:** <code><a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

---

### removeAllListeners()

```typescript
removeAllListeners() => void
```

Remove all native listeners for this plugin

---

### Interfaces

#### NetworkStatus

| Prop                 | Type                                                     |
| -------------------- | -------------------------------------------------------- |
| **`connected`**      | <code>boolean</code>                                     |
| **`connectionType`** | <code>"none" \| "unknown" \| "wifi" \| "cellular"</code> |

#### PluginListenerHandle

| Prop         | Type                       |
| ------------ | -------------------------- |
| **`remove`** | <code>() =&gt; void</code> |


