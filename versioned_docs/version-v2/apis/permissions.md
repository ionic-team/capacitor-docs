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
| **`options`** | `<a href="#permissionsoptions">PermissionsOptions</a>` |

**Returns:** `Promise&lt;<a href="#permissionresult">PermissionResult</a>&gt;`

---

### Interfaces

#### PermissionResult

| Prop        | Type                                           |
| ----------- | ---------------------------------------------- |
| **`state`** | `"denied" \| "granted" \| "prompt"` |

#### PermissionsOptions

| Prop       | Type                                                      |
| ---------- | --------------------------------------------------------- |
| **`name`** | `<a href="#permissiontype">PermissionType</a>` |

### Enums

#### PermissionType

| Members              | Value                          |
| -------------------- | ------------------------------ |
| **`Camera`**         | `"camera"`          |
| **`Photos`**         | `"photos"`          |
| **`Geolocation`**    | `"geolocation"`     |
| **`Notifications`**  | `"notifications"`   |
| **`ClipboardRead`**  | `"clipboard-read"`  |
| **`ClipboardWrite`** | `"clipboard-write"` |
| **`Microphone`**     | `"microphone"`      |
