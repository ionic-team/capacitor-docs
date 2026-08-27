---
title: React Hooks
description: Use these React hooks to simplify native mobile API access with Capacitor
contributors:
  - mlynch
  - robingenz
slug: /guides/react-hooks
---

# React Hooks for Capacitor

Developers using React in their Capacitor app have access to a set of React Hooks that wrap the plugin APIs for use in function components.

To install the hooks:

```shell
npm install @capawesome/capacitor-react-hooks
```

Every plugin is an optional peer dependency, so install the ones you want hooks for:

```shell
npm install @capacitor/network
```

To use a hook, import it from the subpath of the plugin it belongs to:

```tsx
import { useNetworkStatus } from '@capawesome/capacitor-react-hooks/capacitor/network';

const ConnectionBadge = () => {
  const status = useNetworkStatus();

  if (!status) {
    return null;
  }

  return <span>{status.connected ? 'Online' : 'Offline'}</span>;
};
```

Plugins that ask for permissions expose them as a hook as well:

```tsx
import { useGeolocationPermissions, useWatchPosition } from '@capawesome/capacitor-react-hooks/capacitor/geolocation';

const Tracker = () => {
  const { status, request } = useGeolocationPermissions();
  const { position, error } = useWatchPosition({ enableHighAccuracy: true });
  // ...
};
```

Besides saving the boilerplate, the hooks take care of a few things that are easy to get wrong:

- **Shared listeners**: however many components subscribe to an event, only one native listener is registered for it.
- **Reliable cleanup**: the promise returned by `addListener` is awaited before the handle is removed, so the double render in StrictMode does not leave listeners behind.
- **Launch events**: events that fire before React mounts, such as a tap on the push notification that opened the app, can be captured and replayed to the first hook that subscribes.
- **SSR support**: no module touches a browser API at import time, which keeps imports safe in server rendered setups.
- **Small bundles**: each plugin sits behind its own subpath, so only the ones you import end up in the build.

Hooks are available for the official Capacitor plugins as well as for the Capawesome, Capacitor Firebase and Capacitor ML Kit plugins.

## More Reading

See the [@capawesome/capacitor-react-hooks](https://github.com/capawesome-team/capacitor-react-hooks) repo for the full list of hooks and the plugins they cover.
