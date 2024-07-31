---
title: Inappbrowser Capacitor Plugin API
description: in app browser
custom_edit_url: https://github.com/ionic-team/capacitor-os-inappbrowser/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-os-inappbrowser/blob/main/src/definitions.ts
sidebar_label: Inappbrowser
---

# @capacitor/os-inappbrowser

in app browser

## Install

```bash
npm install @capacitor/os-inappbrowser
npx cap sync
```

## API

<docgen-index>

* [`openInWebView(...)`](#openinwebview)
* [`openInSystemBrowser(...)`](#openinsystembrowser)
* [`openInExternalBrowser(...)`](#openinexternalbrowser)
* [`close()`](#close)
* [`removeAllListeners()`](#removealllisteners)
* [`addListener('browserClosed' | 'browserPageLoaded', ...)`](#addlistenerbrowserclosed--browserpageloaded-)
* [Interfaces](#interfaces)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### openInWebView(...)

```typescript
openInWebView(model: OpenInWebViewParameterModel) => Promise<void>
```

| Param       | Type                                                                                |
| ----------- | ----------------------------------------------------------------------------------- |
| **`model`** | <code><a href="#openinwebviewparametermodel">OpenInWebViewParameterModel</a></code> |

--------------------


### openInSystemBrowser(...)

```typescript
openInSystemBrowser(model: OpenInSystemBrowserParameterModel) => Promise<void>
```

| Param       | Type                                                                                            |
| ----------- | ----------------------------------------------------------------------------------------------- |
| **`model`** | <code><a href="#openinsystembrowserparametermodel">OpenInSystemBrowserParameterModel</a></code> |

--------------------


### openInExternalBrowser(...)

```typescript
openInExternalBrowser(model: OpenInDefaultParameterModel) => Promise<void>
```

| Param       | Type                                                                                |
| ----------- | ----------------------------------------------------------------------------------- |
| **`model`** | <code><a href="#openindefaultparametermodel">OpenInDefaultParameterModel</a></code> |

--------------------


### close()

```typescript
close() => Promise<void>
```

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => void
```

--------------------


### addListener('browserClosed' | 'browserPageLoaded', ...)

```typescript
addListener(eventName: 'browserClosed' | 'browserPageLoaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

| Param              | Type                                                |
| ------------------ | --------------------------------------------------- |
| **`eventName`**    | <code>'browserClosed' \| 'browserPageLoaded'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code>                          |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### Interfaces


#### OpenInWebViewParameterModel

Defines the options for opening a URL in the web view.

| Prop          | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code><a href="#webviewoptions">WebViewOptions</a></code> |


#### WebViewOptions

| Prop                                  | Type                                                                    |
| ------------------------------------- | ----------------------------------------------------------------------- |
| **`showURL`**                         | <code>boolean</code>                                                    |
| **`showToolbar`**                     | <code>boolean</code>                                                    |
| **`clearCache`**                      | <code>boolean</code>                                                    |
| **`clearSessionCache`**               | <code>boolean</code>                                                    |
| **`mediaPlaybackRequiresUserAction`** | <code>boolean</code>                                                    |
| **`closeButtonText`**                 | <code>string</code>                                                     |
| **`toolbarPosition`**                 | <code><a href="#toolbarposition">ToolbarPosition</a></code>             |
| **`showNavigationButtons`**           | <code>boolean</code>                                                    |
| **`leftToRight`**                     | <code>boolean</code>                                                    |
| **`customWebViewUserAgent`**          | <code>string \| null</code>                                             |
| **`android`**                         | <code><a href="#androidwebviewoptions">AndroidWebViewOptions</a></code> |
| **`iOS`**                             | <code><a href="#ioswebviewoptions">iOSWebViewOptions</a></code>         |


#### AndroidWebViewOptions

| Prop               | Type                 |
| ------------------ | -------------------- |
| **`allowZoom`**    | <code>boolean</code> |
| **`hardwareBack`** | <code>boolean</code> |
| **`pauseMedia`**   | <code>boolean</code> |


#### iOSWebViewOptions

| Prop                               | Type                                                  |
| ---------------------------------- | ----------------------------------------------------- |
| **`allowOverScroll`**              | <code>boolean</code>                                  |
| **`enableViewportScale`**          | <code>boolean</code>                                  |
| **`allowInLineMediaPlayback`**     | <code>boolean</code>                                  |
| **`surpressIncrementalRendering`** | <code>boolean</code>                                  |
| **`viewStyle`**                    | <code><a href="#iosviewstyle">iOSViewStyle</a></code> |
| **`animationEffect`**              | <code><a href="#iosanimation">iOSAnimation</a></code> |


#### OpenInSystemBrowserParameterModel

Defines the options for opening a URL in the system browser.

| Prop          | Type                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#systembrowseroptions">SystemBrowserOptions</a></code> |


#### SystemBrowserOptions

| Prop          | Type                                                                                |
| ------------- | ----------------------------------------------------------------------------------- |
| **`android`** | <code><a href="#androidsystembrowseroptions">AndroidSystemBrowserOptions</a></code> |
| **`iOS`**     | <code><a href="#iossystembrowseroptions">iOSSystemBrowserOptions</a></code>         |


#### AndroidSystemBrowserOptions

| Prop                      | Type                                                              |
| ------------------------- | ----------------------------------------------------------------- |
| **`showTitle`**           | <code>boolean</code>                                              |
| **`hideToolbarOnScroll`** | <code>boolean</code>                                              |
| **`viewStyle`**           | <code><a href="#androidviewstyle">AndroidViewStyle</a></code>     |
| **`bottomSheetOptions`**  | <code><a href="#androidbottomsheet">AndroidBottomSheet</a></code> |
| **`startAnimation`**      | <code><a href="#androidanimation">AndroidAnimation</a></code>     |
| **`exitAnimation`**       | <code><a href="#androidanimation">AndroidAnimation</a></code>     |


#### AndroidBottomSheet

| Prop          | Type                 |
| ------------- | -------------------- |
| **`height`**  | <code>number</code>  |
| **`isFixed`** | <code>boolean</code> |


#### iOSSystemBrowserOptions

| Prop                       | Type                                                  |
| -------------------------- | ----------------------------------------------------- |
| **`closeButtonText`**      | <code><a href="#dismissstyle">DismissStyle</a></code> |
| **`viewStyle`**            | <code><a href="#iosviewstyle">iOSViewStyle</a></code> |
| **`animationEffect`**      | <code><a href="#iosanimation">iOSAnimation</a></code> |
| **`enableBarsCollapsing`** | <code>boolean</code>                                  |
| **`enableReadersMode`**    | <code>boolean</code>                                  |


#### OpenInDefaultParameterModel

Defines the options for opening a URL in the external browser and used by the others.

| Prop      | Type                |
| --------- | ------------------- |
| **`url`** | <code>string</code> |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### Enums


#### ToolbarPosition

| Members      |
| ------------ |
| **`TOP`**    |
| **`BOTTOM`** |


#### iOSViewStyle

| Members           |
| ----------------- |
| **`PAGE_SHEET`**  |
| **`FORM_SHEET`**  |
| **`FULL_SCREEN`** |


#### iOSAnimation

| Members               |
| --------------------- |
| **`FLIP_HORIZONTAL`** |
| **`CROSS_DISSOLVE`**  |
| **`COVER_VERTICAL`**  |


#### AndroidViewStyle

| Members            |
| ------------------ |
| **`BOTTOM_SHEET`** |
| **`FULL_SCREEN`**  |


#### AndroidAnimation

| Members               |
| --------------------- |
| **`FADE_IN`**         |
| **`FADE_OUT`**        |
| **`SLIDE_IN_LEFT`**   |
| **`SLIDE_OUT_RIGHT`** |


#### DismissStyle

| Members      |
| ------------ |
| **`CLOSE`**  |
| **`CANCEL`** |
| **`DONE`**   |

</docgen-api>