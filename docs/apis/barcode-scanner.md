---
title: Barcode Scanner Capacitor Plugin API
description: Capacitor plugin using Outsystems Barcode libs
custom_edit_url: https://github.com/ionic-team/capacitor-barcode-scanner/blob/main/plugin/README.md
editApiUrl: https://github.com/ionic-team/capacitor-barcode-scanner/blob/main/plugin/src/definitions.ts
sidebar_label: Barcode Scanner
---

# @capacitor/barcode-scanner

Capacitor plugin using Outsystems Barcode libs

## Install

```bash
npm install @capacitor/barcode-scanner
npx cap sync
```

#### Android

The barcode scanner plugin requires a minimum Android SDK target of 26. This is higher than the default that comes with your Capacitor application. You can update this value in your `android/variables.gradle` file.

```gradle
ext {
    minSdkVersion = 26
}
```

You will need to modify the `allprojects > repositories` section in your `android/build.gradle` file to include the Outsystems repository. Your `android/build.gradle` file should look similar to this after adding the repository.

```gradle
allprojects {
    repositories {
        google()
        mavenCentral()
        maven {
            url 'https://pkgs.dev.azure.com/OutSystemsRD/9e79bc5b-69b2-4476-9ca5-d67594972a52/_packaging/PublicArtifactRepository/maven/v1'
            name 'Azure'
            credentials {
                username = "optional"
                password = ""
            }
            content {
                includeGroup "com.github.outsystems"
            }
        }
    }
}
```

#### iOS

The barcode scanner uses the camera on the device. Ensure you configure the Privacy - Camera Usage Description in your Info.plist file so that your application can access the device's camera.

---

## API

<docgen-index>

* [`scanBarcode(...)`](#scanbarcode)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

Interface defining the contract for a plugin capable of scanning barcodes.
Requires implementation of the scanBarcode method, which initiates a barcode scan with given options.

### scanBarcode(...)

```typescript
scanBarcode(options: CapacitorBarcodeScannerOptions) => Promise<CapacitorBarcodeScannerScanResult>
```

| Param         | Type                                                                                      |
| ------------- | ----------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#capacitorbarcodescanneroptions">CapacitorBarcodeScannerOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#capacitorbarcodescannerscanresult">CapacitorBarcodeScannerScanResult</a>&gt;</code>

--------------------


### Type Aliases


#### CapacitorBarcodeScannerScanResult

Defines the structure of the result returned from a barcode scan.

<code>{ ScanResult: string }</code>


#### CapacitorBarcodeScannerOptions

Defines the options for configuring a barcode scan.

<code>{ hint: <a href="#capacitorbarcodescannertypehint">CapacitorBarcodeScannerTypeHint</a>; scanInstructions?: string; scanButton?: boolean; scanText?: string; cameraDirection?: <a href="#capacitorbarcodescannercameradirection">CapacitorBarcodeScannerCameraDirection</a>; scanOrientation?: <a href="#capacitorbarcodescannerscanorientation">CapacitorBarcodeScannerScanOrientation</a>; android?: { scanningLibrary?: <a href="#capacitorbarcodescannerandroidscanninglibrary">CapacitorBarcodeScannerAndroidScanningLibrary</a>; }; web?: { showCameraSelection?: boolean; scannerFPS?: number; }; }</code>


#### CapacitorBarcodeScannerTypeHint

Extends supported formats from Html5Qrcode with a special 'ALL' option,
indicating support for all barcode types.
Type definition combining <a href="#html5qrcodesupportedformats">Html5QrcodeSupportedFormats</a> and OSBarcodeTypeHintALLOption
to represent the hint for the type of barcode to be scanned.

<code><a href="#html5qrcodesupportedformats">Html5QrcodeSupportedFormats</a> | <a href="#capacitorbarcodescannertypehintalloption">CapacitorBarcodeScannerTypeHintALLOption</a></code>


### Enums


#### Html5QrcodeSupportedFormats

| Members                 | Value           |
| ----------------------- | --------------- |
| **`QR_CODE`**           | <code>0</code>  |
| **`AZTEC`**             | <code>1</code>  |
| **`CODABAR`**           | <code>2</code>  |
| **`CODE_39`**           | <code>3</code>  |
| **`CODE_93`**           | <code>4</code>  |
| **`CODE_128`**          | <code>5</code>  |
| **`DATA_MATRIX`**       | <code>6</code>  |
| **`MAXICODE`**          | <code>7</code>  |
| **`ITF`**               | <code>8</code>  |
| **`EAN_13`**            | <code>9</code>  |
| **`EAN_8`**             | <code>10</code> |
| **`PDF_417`**           | <code>11</code> |
| **`RSS_14`**            | <code>12</code> |
| **`RSS_EXPANDED`**      | <code>13</code> |
| **`UPC_A`**             | <code>14</code> |
| **`UPC_E`**             | <code>15</code> |
| **`UPC_EAN_EXTENSION`** | <code>16</code> |


#### CapacitorBarcodeScannerTypeHintALLOption

| Members   | Value           |
| --------- | --------------- |
| **`ALL`** | <code>17</code> |


#### CapacitorBarcodeScannerCameraDirection

| Members     | Value          |
| ----------- | -------------- |
| **`BACK`**  | <code>1</code> |
| **`FRONT`** | <code>2</code> |


#### CapacitorBarcodeScannerScanOrientation

| Members         | Value          |
| --------------- | -------------- |
| **`PORTRAIT`**  | <code>1</code> |
| **`LANDSCAPE`** | <code>2</code> |
| **`ADAPTIVE`**  | <code>3</code> |


#### CapacitorBarcodeScannerAndroidScanningLibrary

| Members     | Value                |
| ----------- | -------------------- |
| **`ZXING`** | <code>'zxing'</code> |
| **`MLKIT`** | <code>'mlkit'</code> |

</docgen-api>