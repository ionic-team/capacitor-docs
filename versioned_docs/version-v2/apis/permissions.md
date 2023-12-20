---
title: Permissions
description: Permissions API
contributors:
  - mlynch
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

The Permissions API provides methods to check if certain permissions have been granted before requesting them.

This can be useful, for example, to avoid a user denying a permission request due to lack of context behind why the app is requesting the permission. Instead, checking the permission
first and optionally displaying a custom UI to prepare the user for the permission check could increase permission allow rates and improve user experience.

## API

### query(...)

```typescript
query(options: PermissionsOptions) => Promise<PermissionResult>
```

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#permissionsoptions">PermissionsOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#permissionresult">PermissionResult</a>&gt;</code>

---

### Interfaces

#### PermissionResult

| Prop        | Type                                           |
| ----------- | ---------------------------------------------- |
| **`state`** | <code>"denied" \| "granted" \| "prompt"</code> |

#### PermissionsOptions

| Prop       | Type                                                      |
| ---------- | --------------------------------------------------------- |
| **`name`** | <code><a href="#permissiontype">PermissionType</a></code> |

### Enums

#### PermissionType

| Members              | Value                          |
| -------------------- | ------------------------------ |
| **`Camera`**         | <code>"camera"</code>          |
| **`Photos`**         | <code>"photos"</code>          |
| **`Geolocation`**    | <code>"geolocation"</code>     |
| **`Notifications`**  | <code>"notifications"</code>   |
| **`ClipboardRead`**  | <code>"clipboard-read"</code>  |
| **`ClipboardWrite`** | <code>"clipboard-write"</code> |
| **`Microphone`**     | <code>"microphone"</code>      |
