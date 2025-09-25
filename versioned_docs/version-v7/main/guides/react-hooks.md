---
title: React Hooks
description: Use these React hooks to simplify native mobile API access with Capacitor
contributors:
  - mlynch
slug: /guides/react-hooks
---

# React Hooks for Capacitor

Developers using React in their Capacitor app have access to a set of useful, community-maintained React Hooks to access Capacitor APIs in their React function components.

To install the hooks:

```shell
npm install @capacitor-community/react-hooks
```

To use the hooks, import and use in a function component:

```typescript
import { useFilesystem, base64FromPath, availableFeatures } from '@capacitor-community/react-hooks/filesystem';

const MyComponent = () => (
  const { readFile } = useFilesystem();

  useEffect(() => {
    const readMyFile = async () => {
      const file = await readFile({
        path: filepath,
        directory: FilesystemDirectory.Data
      });
      // ...
    }

    readMyFile();
  }, [ readFile ]);
```

## More Reading

See the [@capacitor-community/react-hooks](https://github.com/capacitor-community/react-hooks) repo for documentation on all the available hooks.
