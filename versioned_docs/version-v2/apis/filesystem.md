---
title: Filesystem
description: Filesystem API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/filesystem
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

The Filesystem API provides a NodeJS-like API for working with files on the device.

- [`readFile(...)`](#readfile)
- [`writeFile(...)`](#writefile)
- [`appendFile(...)`](#appendfile)
- [`deleteFile(...)`](#deletefile)
- [`mkdir(...)`](#mkdir)
- [`rmdir(...)`](#rmdir)
- [`readdir(...)`](#readdir)
- [`getUri(...)`](#geturi)
- [`stat(...)`](#stat)
- [`rename(...)`](#rename)
- [`copy(...)`](#copy)
- [Interfaces](#interfaces)
- [Enums](#enums)

## Understanding Directories and Files

iOS and Android have additional layers of separation between files, such as special directories that are backed up to the Cloud, or ones for storing Documents. The Filesystem API offers a simple way to scope each operation to a specific special directory on the device.

Additionally, the Filesystem API supports using full `file://` paths, or reading `content://` files on Android. Simply
leave out the `directory` param to use a full file path.

## Example

```typescript
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

const { Filesystem } = Plugins;

async fileWrite() {
  try {
    const result = await Filesystem.writeFile({
      path: 'secrets/text.txt',
      data: "This is a test",
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8
    })
    console.log('Wrote file', result);
  } catch(e) {
    console.error('Unable to write file', e);
  }
}

async fileRead() {
  let contents = await Filesystem.readFile({
    path: 'secrets/text.txt',
    directory: FilesystemDirectory.Documents,
    encoding: FilesystemEncoding.UTF8
  });
  console.log(contents);
}

async fileAppend() {
  await Filesystem.appendFile({
    path: 'secrets/text.txt',
    data: "MORE TESTS",
    directory: FilesystemDirectory.Documents,
    encoding: FilesystemEncoding.UTF8
  });
}

async fileDelete() {
  await Filesystem.deleteFile({
    path: 'secrets/text.txt',
    directory: FilesystemDirectory.Documents
  });
}

async mkdir() {
  try {
    let ret = await Filesystem.mkdir({
      path: 'secrets',
      directory: FilesystemDirectory.Documents,
      recursive: false // like mkdir -p
    });
  } catch(e) {
    console.error('Unable to make directory', e);
  }
}

async rmdir() {
  try {
    let ret = await Filesystem.rmdir({
      path: 'secrets',
      directory: FilesystemDirectory.Documents,
      recursive: false,
    });
  } catch(e) {
    console.error('Unable to remove directory', e);
  }
}

async readdir() {
  try {
    let ret = await Filesystem.readdir({
      path: 'secrets',
      directory: FilesystemDirectory.Documents
    });
  } catch(e) {
    console.error('Unable to read dir', e);
  }
}

async stat() {
  try {
    let ret = await Filesystem.stat({
      path: 'secrets/text.txt',
      directory: FilesystemDirectory.Documents
    });
  } catch(e) {
    console.error('Unable to stat file', e);
  }
}

async readFilePath() {
  // Here's an example of reading a file with a full file path. Use this to
  // read binary data (base64 encoded) from plugins that return File URIs, such as
  // the Camera.
  try {
    let data = await Filesystem.readFile({
      path: 'file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt'
    })
  }
}

async rename() {
  try {
    // This example moves the file within the same 'directory'
    let ret = await Filesystem.rename({
      from: 'text.txt',
      to: 'text2.txt',
      directory: FilesystemDirectory.Documents
    });
  } catch(e) {
    console.error('Unable to rename file', e);
  }
}

async copy() {
  try {
    // This example copies a file within the documents directory
    let ret = await Filesystem.copy({
      from: 'text.txt',
      to: 'text2.txt',
      directory: FilesystemDirectory.Documents
    });
  } catch(e) {
    console.error('Unable to copy file', e);
  }
}
```

## API

### readFile(...)

```typescript
readFile(options: FileReadOptions) => Promise<FileReadResult>
```

Read a file from disk

| Param         | Type                                                        | Description               |
| ------------- | ----------------------------------------------------------- | ------------------------- |
| **`options`** | `<a href="#filereadoptions">FileReadOptions</a>` | options for the file read |

**Returns:** `Promise&lt;<a href="#filereadresult">FileReadResult</a>&gt;`

---

### writeFile(...)

```typescript
writeFile(options: FileWriteOptions) => Promise<FileWriteResult>
```

Write a file to disk in the specified location on device

| Param         | Type                                                          | Description                |
| ------------- | ------------------------------------------------------------- | -------------------------- |
| **`options`** | `<a href="#filewriteoptions">FileWriteOptions</a>` | options for the file write |

**Returns:** `Promise&lt;<a href="#filewriteresult">FileWriteResult</a>&gt;`

---

### appendFile(...)

```typescript
appendFile(options: FileAppendOptions) => Promise<FileAppendResult>
```

Append to a file on disk in the specified location on device

| Param         | Type                                                            | Description                 |
| ------------- | --------------------------------------------------------------- | --------------------------- |
| **`options`** | `<a href="#fileappendoptions">FileAppendOptions</a>` | options for the file append |

**Returns:** `Promise&lt;<a href="#fileappendresult">FileAppendResult</a>&gt;`

---

### deleteFile(...)

```typescript
deleteFile(options: FileDeleteOptions) => Promise<FileDeleteResult>
```

Delete a file from disk

| Param         | Type                                                            | Description                 |
| ------------- | --------------------------------------------------------------- | --------------------------- |
| **`options`** | `<a href="#filedeleteoptions">FileDeleteOptions</a>` | options for the file delete |

**Returns:** `Promise&lt;<a href="#filedeleteresult">FileDeleteResult</a>&gt;`

---

### mkdir(...)

```typescript
mkdir(options: MkdirOptions) => Promise<MkdirResult>
```

Create a directory.

| Param         | Type                                                  | Description           |
| ------------- | ----------------------------------------------------- | --------------------- |
| **`options`** | `<a href="#mkdiroptions">MkdirOptions</a>` | options for the mkdir |

**Returns:** `Promise&lt;<a href="#mkdirresult">MkdirResult</a>&gt;`

---

### rmdir(...)

```typescript
rmdir(options: RmdirOptions) => Promise<RmdirResult>
```

Remove a directory

| Param         | Type                                                  | Description                          |
| ------------- | ----------------------------------------------------- | ------------------------------------ |
| **`options`** | `<a href="#rmdiroptions">RmdirOptions</a>` | the options for the directory remove |

**Returns:** `Promise&lt;<a href="#rmdirresult">RmdirResult</a>&gt;`

---

### readdir(...)

```typescript
readdir(options: ReaddirOptions) => Promise<ReaddirResult>
```

Return a list of files from the directory (not recursive)

| Param         | Type                                                      | Description                           |
| ------------- | --------------------------------------------------------- | ------------------------------------- |
| **`options`** | `<a href="#readdiroptions">ReaddirOptions</a>` | the options for the readdir operation |

**Returns:** `Promise&lt;<a href="#readdirresult">ReaddirResult</a>&gt;`

---

### getUri(...)

```typescript
getUri(options: GetUriOptions) => Promise<GetUriResult>
```

Return full File URI for a path and directory

| Param         | Type                                                    | Description                        |
| ------------- | ------------------------------------------------------- | ---------------------------------- |
| **`options`** | `<a href="#geturioptions">GetUriOptions</a>` | the options for the stat operation |

**Returns:** `Promise&lt;<a href="#geturiresult">GetUriResult</a>&gt;`

---

### stat(...)

```typescript
stat(options: StatOptions) => Promise<StatResult>
```

Return data about a file

| Param         | Type                                                | Description                        |
| ------------- | --------------------------------------------------- | ---------------------------------- |
| **`options`** | `<a href="#statoptions">StatOptions</a>` | the options for the stat operation |

**Returns:** `Promise&lt;<a href="#statresult">StatResult</a>&gt;`

---

### rename(...)

```typescript
rename(options: RenameOptions) => Promise<RenameResult>
```

Rename a file or directory

| Param         | Type                                                    | Description                          |
| ------------- | ------------------------------------------------------- | ------------------------------------ |
| **`options`** | `<a href="#renameoptions">RenameOptions</a>` | the options for the rename operation |

**Returns:** `Promise&lt;<a href="#renameresult">RenameResult</a>&gt;`

---

### copy(...)

```typescript
copy(options: CopyOptions) => Promise<CopyResult>
```

Copy a file or directory

| Param         | Type                                                | Description                        |
| ------------- | --------------------------------------------------- | ---------------------------------- |
| **`options`** | `<a href="#copyoptions">CopyOptions</a>` | the options for the copy operation |

**Returns:** `Promise&lt;<a href="#copyresult">CopyResult</a>&gt;`

---

### Interfaces

#### FileReadResult

| Prop       | Type                |
| ---------- | ------------------- |
| **`data`** | `string` |

#### FileReadOptions

| Prop            | Type                                                                | Description                                                                                                                                                                                          |
| --------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`path`**      | `string`                                                 | The filename to read                                                                                                                                                                                 |
| **`directory`** | `<a href="#filesystemdirectory">FilesystemDirectory</a>` | The <a href="#filesystemdirectory">FilesystemDirectory</a> to read the file from                                                                                                                     |
| **`encoding`**  | `<a href="#filesystemencoding">FilesystemEncoding</a>`   | The encoding to read the file in, if not provided, data is read as binary and returned as base64 encoded data. Pass <a href="#filesystemencoding">FilesystemEncoding.UTF8</a> to read data as string |

#### FileWriteResult

| Prop      | Type                |
| --------- | ------------------- |
| **`uri`** | `string` |

#### FileWriteOptions

| Prop            | Type                                                                | Description                                                                                                                                                                        |
| --------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`path`**      | `string`                                                 | The filename to write                                                                                                                                                              |
| **`data`**      | `string`                                                 | The data to write                                                                                                                                                                  |
| **`directory`** | `<a href="#filesystemdirectory">FilesystemDirectory</a>` | The <a href="#filesystemdirectory">FilesystemDirectory</a> to store the file in                                                                                                    |
| **`encoding`**  | `<a href="#filesystemencoding">FilesystemEncoding</a>`   | The encoding to write the file in. If not provided, data is written as base64 encoded data. Pass <a href="#filesystemencoding">FilesystemEncoding.UTF8</a> to write data as string |
| **`recursive`** | `boolean`                                                | Whether to create any missing parent directories. Defaults to false                                                                                                                |

#### FileAppendResult

#### FileAppendOptions

| Prop            | Type                                                                | Description                                                                                                                                                                        |
| --------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`path`**      | `string`                                                 | The filename to write                                                                                                                                                              |
| **`data`**      | `string`                                                 | The data to write                                                                                                                                                                  |
| **`directory`** | `<a href="#filesystemdirectory">FilesystemDirectory</a>` | The <a href="#filesystemdirectory">FilesystemDirectory</a> to store the file in                                                                                                    |
| **`encoding`**  | `<a href="#filesystemencoding">FilesystemEncoding</a>`   | The encoding to write the file in. If not provided, data is written as base64 encoded data. Pass <a href="#filesystemencoding">FilesystemEncoding.UTF8</a> to write data as string |

#### FileDeleteResult

#### FileDeleteOptions

| Prop            | Type                                                                | Description                                                                        |
| --------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **`path`**      | `string`                                                 | The filename to delete                                                             |
| **`directory`** | `<a href="#filesystemdirectory">FilesystemDirectory</a>` | The <a href="#filesystemdirectory">FilesystemDirectory</a> to delete the file from |

#### MkdirResult

#### MkdirOptions

| Prop            | Type                                                                | Description                                                                             |
| --------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **`path`**      | `string`                                                 | The path of the new directory                                                           |
| **`directory`** | `<a href="#filesystemdirectory">FilesystemDirectory</a>` | The <a href="#filesystemdirectory">FilesystemDirectory</a> to make the new directory in |
| **`recursive`** | `boolean`                                                | Whether to create any missing parent directories as well. Defaults to false             |

#### RmdirResult

#### RmdirOptions

| Prop            | Type                                                                | Description                                                                             |
| --------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **`path`**      | `string`                                                 | The path of the directory to remove                                                     |
| **`directory`** | `<a href="#filesystemdirectory">FilesystemDirectory</a>` | The <a href="#filesystemdirectory">FilesystemDirectory</a> to remove the directory from |
| **`recursive`** | `boolean`                                                | Whether to recursively remove the contents of the directory Defaults to false           |

#### ReaddirResult

| Prop        | Type                  |
| ----------- | --------------------- |
| **`files`** | `string[]` |

#### ReaddirOptions

| Prop            | Type                                                                | Description                                                                   |
| --------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **`path`**      | `string`                                                 | The path of the directory to read                                             |
| **`directory`** | `<a href="#filesystemdirectory">FilesystemDirectory</a>` | The <a href="#filesystemdirectory">FilesystemDirectory</a> to list files from |

#### GetUriResult

| Prop      | Type                |
| --------- | ------------------- |
| **`uri`** | `string` |

#### GetUriOptions

| Prop            | Type                                                                | Description                                                                      |
| --------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **`path`**      | `string`                                                 | The path of the file to get the URI for                                          |
| **`directory`** | `<a href="#filesystemdirectory">FilesystemDirectory</a>` | The <a href="#filesystemdirectory">FilesystemDirectory</a> to get the file under |

#### StatResult

| Prop        | Type                |
| ----------- | ------------------- |
| **`type`**  | `string` |
| **`size`**  | `number` |
| **`ctime`** | `number` |
| **`mtime`** | `number` |
| **`uri`**   | `string` |

#### StatOptions

| Prop            | Type                                                                | Description                                                                      |
| --------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **`path`**      | `string`                                                 | The path of the file to get data about                                           |
| **`directory`** | `<a href="#filesystemdirectory">FilesystemDirectory</a>` | The <a href="#filesystemdirectory">FilesystemDirectory</a> to get the file under |

#### RenameResult

#### RenameOptions

#### CopyResult

#### CopyOptions

| Prop              | Type                                                                | Description                                                                                                                                                                    |
| ----------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`from`**        | `string`                                                 | The existing file or directory                                                                                                                                                 |
| **`to`**          | `string`                                                 | The destination file or directory                                                                                                                                              |
| **`directory`**   | `<a href="#filesystemdirectory">FilesystemDirectory</a>` | The <a href="#filesystemdirectory">FilesystemDirectory</a> containing the existing file or directory                                                                           |
| **`toDirectory`** | `<a href="#filesystemdirectory">FilesystemDirectory</a>` | The <a href="#filesystemdirectory">FilesystemDirectory</a> containing the destination file or directory. If not supplied will use the 'directory' parameter as the destination |

### Enums

#### FilesystemDirectory

| Members               | Value                           | Description                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`Documents`**       | `"DOCUMENTS"`        | The Documents directory On iOS it's the app's documents directory. Use this directory to store user-generated content. On Android it's the Public Documents folder, so it's accessible from other apps. It's not accesible on Android 10 unless the app enables legacy External Storage by adding `android:requestLegacyExternalStorage="true"` in the `application` tag in the `AndroidManifest.xml` |
| **`Data`**            | `"DATA"`             | The Data directory On iOS it will use the Documents directory On Android it's the directory holding application files. Files will be deleted when the application is uninstalled.                                                                                                                                                                                                                     |
| **`Cache`**           | `"CACHE"`            | The Cache directory Can be deleted in cases of low memory, so use this directory to write app-specific files that your app can re-create easily.                                                                                                                                                                                                                                                      |
| **`External`**        | `"EXTERNAL"`         | The external directory On iOS it will use the Documents directory On Android it's the directory on the primary shared/external storage device where the application can place persistent files it owns. These files are internal to the applications, and not typically visible to the user as media. Files will be deleted when the application is uninstalled.                                      |
| **`ExternalStorage`** | `"EXTERNAL_STORAGE"` | The external storage directory On iOS it will use the Documents directory On Android it's the primary shared/external storage directory. It's not accesible on Android 10 unless the app enables legacy External Storage by adding `android:requestLegacyExternalStorage="true"` in the `application` tag in the `AndroidManifest.xml`                                                                |

#### FilesystemEncoding

| Members     | Value                |
| ----------- | -------------------- |
| **`UTF8`**  | `"utf8"`  |
| **`ASCII`** | `"ascii"` |
| **`UTF16`** | `"utf16"` |
