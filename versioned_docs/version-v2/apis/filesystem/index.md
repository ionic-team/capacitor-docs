---
title: Filesystem
description: Filesystem API
contributors:
  - mlynch
  - jcesarmobile
canonicalUrl: https://capacitorjs.com/docs/apis/filesystem
---

<plugin-platforms platforms="pwa,ios,android"></plugin-platforms>

# Filesystem

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
| **`options`** | <code><a href="#filereadoptions">FileReadOptions</a></code> | options for the file read |

**Returns:** <code>Promise&lt;<a href="#filereadresult">FileReadResult</a>&gt;</code>

---

### writeFile(...)

```typescript
writeFile(options: FileWriteOptions) => Promise<FileWriteResult>
```

Write a file to disk in the specified location on device

| Param         | Type                                                          | Description                |
| ------------- | ------------------------------------------------------------- | -------------------------- |
| **`options`** | <code><a href="#filewriteoptions">FileWriteOptions</a></code> | options for the file write |

**Returns:** <code>Promise&lt;<a href="#filewriteresult">FileWriteResult</a>&gt;</code>

---

### appendFile(...)

```typescript
appendFile(options: FileAppendOptions) => Promise<FileAppendResult>
```

Append to a file on disk in the specified location on device

| Param         | Type                                                            | Description                 |
| ------------- | --------------------------------------------------------------- | --------------------------- |
| **`options`** | <code><a href="#fileappendoptions">FileAppendOptions</a></code> | options for the file append |

**Returns:** <code>Promise&lt;<a href="#fileappendresult">FileAppendResult</a>&gt;</code>

---

### deleteFile(...)

```typescript
deleteFile(options: FileDeleteOptions) => Promise<FileDeleteResult>
```

Delete a file from disk

| Param         | Type                                                            | Description                 |
| ------------- | --------------------------------------------------------------- | --------------------------- |
| **`options`** | <code><a href="#filedeleteoptions">FileDeleteOptions</a></code> | options for the file delete |

**Returns:** <code>Promise&lt;<a href="#filedeleteresult">FileDeleteResult</a>&gt;</code>

---

### mkdir(...)

```typescript
mkdir(options: MkdirOptions) => Promise<MkdirResult>
```

Create a directory.

| Param         | Type                                                  | Description           |
| ------------- | ----------------------------------------------------- | --------------------- |
| **`options`** | <code><a href="#mkdiroptions">MkdirOptions</a></code> | options for the mkdir |

**Returns:** <code>Promise&lt;<a href="#mkdirresult">MkdirResult</a>&gt;</code>

---

### rmdir(...)

```typescript
rmdir(options: RmdirOptions) => Promise<RmdirResult>
```

Remove a directory

| Param         | Type                                                  | Description                          |
| ------------- | ----------------------------------------------------- | ------------------------------------ |
| **`options`** | <code><a href="#rmdiroptions">RmdirOptions</a></code> | the options for the directory remove |

**Returns:** <code>Promise&lt;<a href="#rmdirresult">RmdirResult</a>&gt;</code>

---

### readdir(...)

```typescript
readdir(options: ReaddirOptions) => Promise<ReaddirResult>
```

Return a list of files from the directory (not recursive)

| Param         | Type                                                      | Description                           |
| ------------- | --------------------------------------------------------- | ------------------------------------- |
| **`options`** | <code><a href="#readdiroptions">ReaddirOptions</a></code> | the options for the readdir operation |

**Returns:** <code>Promise&lt;<a href="#readdirresult">ReaddirResult</a>&gt;</code>

---

### getUri(...)

```typescript
getUri(options: GetUriOptions) => Promise<GetUriResult>
```

Return full File URI for a path and directory

| Param         | Type                                                    | Description                        |
| ------------- | ------------------------------------------------------- | ---------------------------------- |
| **`options`** | <code><a href="#geturioptions">GetUriOptions</a></code> | the options for the stat operation |

**Returns:** <code>Promise&lt;<a href="#geturiresult">GetUriResult</a>&gt;</code>

---

### stat(...)

```typescript
stat(options: StatOptions) => Promise<StatResult>
```

Return data about a file

| Param         | Type                                                | Description                        |
| ------------- | --------------------------------------------------- | ---------------------------------- |
| **`options`** | <code><a href="#statoptions">StatOptions</a></code> | the options for the stat operation |

**Returns:** <code>Promise&lt;<a href="#statresult">StatResult</a>&gt;</code>

---

### rename(...)

```typescript
rename(options: RenameOptions) => Promise<RenameResult>
```

Rename a file or directory

| Param         | Type                                                    | Description                          |
| ------------- | ------------------------------------------------------- | ------------------------------------ |
| **`options`** | <code><a href="#renameoptions">RenameOptions</a></code> | the options for the rename operation |

**Returns:** <code>Promise&lt;<a href="#renameresult">RenameResult</a>&gt;</code>

---

### copy(...)

```typescript
copy(options: CopyOptions) => Promise<CopyResult>
```

Copy a file or directory

| Param         | Type                                                | Description                        |
| ------------- | --------------------------------------------------- | ---------------------------------- |
| **`options`** | <code><a href="#copyoptions">CopyOptions</a></code> | the options for the copy operation |

**Returns:** <code>Promise&lt;<a href="#copyresult">CopyResult</a>&gt;</code>

---

### Interfaces

#### FileReadResult

| Prop       | Type                |
| ---------- | ------------------- |
| **`data`** | <code>string</code> |

#### FileReadOptions

| Prop            | Type                                                                | Description                                                                                                                                                                                          |
| --------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`path`**      | <code>string</code>                                                 | The filename to read                                                                                                                                                                                 |
| **`directory`** | <code><a href="#filesystemdirectory">FilesystemDirectory</a></code> | The <a href="#filesystemdirectory">FilesystemDirectory</a> to read the file from                                                                                                                     |
| **`encoding`**  | <code><a href="#filesystemencoding">FilesystemEncoding</a></code>   | The encoding to read the file in, if not provided, data is read as binary and returned as base64 encoded data. Pass <a href="#filesystemencoding">FilesystemEncoding.UTF8</a> to read data as string |

#### FileWriteResult

| Prop      | Type                |
| --------- | ------------------- |
| **`uri`** | <code>string</code> |

#### FileWriteOptions

| Prop            | Type                                                                | Description                                                                                                                                                                        |
| --------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`path`**      | <code>string</code>                                                 | The filename to write                                                                                                                                                              |
| **`data`**      | <code>string</code>                                                 | The data to write                                                                                                                                                                  |
| **`directory`** | <code><a href="#filesystemdirectory">FilesystemDirectory</a></code> | The <a href="#filesystemdirectory">FilesystemDirectory</a> to store the file in                                                                                                    |
| **`encoding`**  | <code><a href="#filesystemencoding">FilesystemEncoding</a></code>   | The encoding to write the file in. If not provided, data is written as base64 encoded data. Pass <a href="#filesystemencoding">FilesystemEncoding.UTF8</a> to write data as string |
| **`recursive`** | <code>boolean</code>                                                | Whether to create any missing parent directories. Defaults to false                                                                                                                |

#### FileAppendResult

#### FileAppendOptions

| Prop            | Type                                                                | Description                                                                                                                                                                        |
| --------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`path`**      | <code>string</code>                                                 | The filename to write                                                                                                                                                              |
| **`data`**      | <code>string</code>                                                 | The data to write                                                                                                                                                                  |
| **`directory`** | <code><a href="#filesystemdirectory">FilesystemDirectory</a></code> | The <a href="#filesystemdirectory">FilesystemDirectory</a> to store the file in                                                                                                    |
| **`encoding`**  | <code><a href="#filesystemencoding">FilesystemEncoding</a></code>   | The encoding to write the file in. If not provided, data is written as base64 encoded data. Pass <a href="#filesystemencoding">FilesystemEncoding.UTF8</a> to write data as string |

#### FileDeleteResult

#### FileDeleteOptions

| Prop            | Type                                                                | Description                                                                        |
| --------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **`path`**      | <code>string</code>                                                 | The filename to delete                                                             |
| **`directory`** | <code><a href="#filesystemdirectory">FilesystemDirectory</a></code> | The <a href="#filesystemdirectory">FilesystemDirectory</a> to delete the file from |

#### MkdirResult

#### MkdirOptions

| Prop            | Type                                                                | Description                                                                             |
| --------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **`path`**      | <code>string</code>                                                 | The path of the new directory                                                           |
| **`directory`** | <code><a href="#filesystemdirectory">FilesystemDirectory</a></code> | The <a href="#filesystemdirectory">FilesystemDirectory</a> to make the new directory in |
| **`recursive`** | <code>boolean</code>                                                | Whether to create any missing parent directories as well. Defaults to false             |

#### RmdirResult

#### RmdirOptions

| Prop            | Type                                                                | Description                                                                             |
| --------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **`path`**      | <code>string</code>                                                 | The path of the directory to remove                                                     |
| **`directory`** | <code><a href="#filesystemdirectory">FilesystemDirectory</a></code> | The <a href="#filesystemdirectory">FilesystemDirectory</a> to remove the directory from |
| **`recursive`** | <code>boolean</code>                                                | Whether to recursively remove the contents of the directory Defaults to false           |

#### ReaddirResult

| Prop        | Type                  |
| ----------- | --------------------- |
| **`files`** | <code>string[]</code> |

#### ReaddirOptions

| Prop            | Type                                                                | Description                                                                   |
| --------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **`path`**      | <code>string</code>                                                 | The path of the directory to read                                             |
| **`directory`** | <code><a href="#filesystemdirectory">FilesystemDirectory</a></code> | The <a href="#filesystemdirectory">FilesystemDirectory</a> to list files from |

#### GetUriResult

| Prop      | Type                |
| --------- | ------------------- |
| **`uri`** | <code>string</code> |

#### GetUriOptions

| Prop            | Type                                                                | Description                                                                      |
| --------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **`path`**      | <code>string</code>                                                 | The path of the file to get the URI for                                          |
| **`directory`** | <code><a href="#filesystemdirectory">FilesystemDirectory</a></code> | The <a href="#filesystemdirectory">FilesystemDirectory</a> to get the file under |

#### StatResult

| Prop        | Type                |
| ----------- | ------------------- |
| **`type`**  | <code>string</code> |
| **`size`**  | <code>number</code> |
| **`ctime`** | <code>number</code> |
| **`mtime`** | <code>number</code> |
| **`uri`**   | <code>string</code> |

#### StatOptions

| Prop            | Type                                                                | Description                                                                      |
| --------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **`path`**      | <code>string</code>                                                 | The path of the file to get data about                                           |
| **`directory`** | <code><a href="#filesystemdirectory">FilesystemDirectory</a></code> | The <a href="#filesystemdirectory">FilesystemDirectory</a> to get the file under |

#### RenameResult

#### RenameOptions

#### CopyResult

#### CopyOptions

| Prop              | Type                                                                | Description                                                                                                                                                                    |
| ----------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`from`**        | <code>string</code>                                                 | The existing file or directory                                                                                                                                                 |
| **`to`**          | <code>string</code>                                                 | The destination file or directory                                                                                                                                              |
| **`directory`**   | <code><a href="#filesystemdirectory">FilesystemDirectory</a></code> | The <a href="#filesystemdirectory">FilesystemDirectory</a> containing the existing file or directory                                                                           |
| **`toDirectory`** | <code><a href="#filesystemdirectory">FilesystemDirectory</a></code> | The <a href="#filesystemdirectory">FilesystemDirectory</a> containing the destination file or directory. If not supplied will use the 'directory' parameter as the destination |

### Enums

#### FilesystemDirectory

| Members               | Value                           | Description                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`Documents`**       | <code>"DOCUMENTS"</code>        | The Documents directory On iOS it's the app's documents directory. Use this directory to store user-generated content. On Android it's the Public Documents folder, so it's accessible from other apps. It's not accesible on Android 10 unless the app enables legacy External Storage by adding `android:requestLegacyExternalStorage="true"` in the `application` tag in the `AndroidManifest.xml` |
| **`Data`**            | <code>"DATA"</code>             | The Data directory On iOS it will use the Documents directory On Android it's the directory holding application files. Files will be deleted when the application is uninstalled.                                                                                                                                                                                                                     |
| **`Cache`**           | <code>"CACHE"</code>            | The Cache directory Can be deleted in cases of low memory, so use this directory to write app-specific files that your app can re-create easily.                                                                                                                                                                                                                                                      |
| **`External`**        | <code>"EXTERNAL"</code>         | The external directory On iOS it will use the Documents directory On Android it's the directory on the primary shared/external storage device where the application can place persistent files it owns. These files are internal to the applications, and not typically visible to the user as media. Files will be deleted when the application is uninstalled.                                      |
| **`ExternalStorage`** | <code>"EXTERNAL_STORAGE"</code> | The external storage directory On iOS it will use the Documents directory On Android it's the primary shared/external storage directory. It's not accesible on Android 10 unless the app enables legacy External Storage by adding `android:requestLegacyExternalStorage="true"` in the `application` tag in the `AndroidManifest.xml`                                                                |

#### FilesystemEncoding

| Members     | Value                |
| ----------- | -------------------- |
| **`UTF8`**  | <code>"utf8"</code>  |
| **`ASCII`** | <code>"ascii"</code> |
| **`UTF16`** | <code>"utf16"</code> |


