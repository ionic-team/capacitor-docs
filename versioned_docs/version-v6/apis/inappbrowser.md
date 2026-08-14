---
title: InAppBrowser Capacitor Plugin API
description: The InAppBrowser Plugin provides a web browser view that allows you to load any web page externally. It behaves as a standard web browser and is useful to load untrusted content without risking your application's security. It offers three different ways to open URLs; in a WebView, in an in-app system browser (Custom Tabs for Android and SFSafariViewController for iOS), and in the device's default browser.
custom_edit_url: https://github.com/ionic-team/capacitor-os-inappbrowser/blob/main/README.md
editApiUrl: https://github.com/ionic-team/capacitor-os-inappbrowser/blob/main/src/definitions.ts
sidebar_label: InAppBrowser
---

# @capacitor/inappbrowser

The InAppBrowser Plugin provides a web browser view that allows you to load any web page externally. It behaves as a standard web browser and is useful to load untrusted content without risking your application's security. It offers three different ways to open URLs; in a WebView, in an in-app system browser (Custom Tabs for Android and SFSafariViewController for iOS), and in the device's default browser.

## Install

```bash
npm install @capacitor/inappbrowser
npx cap sync
```

## Supported Platforms

- iOS
- Android

#### Android

The InAppBrowser plugin requires a minimum Android SDK target of 26. This is higher than the default that comes with your Capacitor application. You can update this value in your `android/variables.gradle` file.

```gradle
ext {
    minSdkVersion = 26
}
```

## Usage Example
#### Open In External Browser
```typescript
import { InAppBrowser } from '@capacitor/inappbrowser';
await InAppBrowser.openInExternalBrowser({
    url: "https://www.google.com"
});
```

#### Open In System Browser (Custom Tabs for Android, SFSafariViewController for iOS)
```typescript
import { InAppBrowser, DefaultSystemBrowserOptions } from '@capacitor/inappbrowser';
await InAppBrowser.openInSystemBrowser({
    url: "https://www.google.com",
    options: DefaultSystemBrowserOptions
});
```

#### Open In Web View
```typescript
import { InAppBrowser, DefaultWebViewOptions } from '@capacitor/inappbrowser';
await InAppBrowser.openInWebView({
    url: "https://www.google.com",
    options: DefaultWebViewOptions
});
```

#### Close (Web View or System Browser)
```typescript
import { InAppBrowser } from '@capacitor/inappbrowser';
await InAppBrowser.close();
```

#### Add Listeners
```typescript
import { InAppBrowser } from '@capacitor/inappbrowser';
await InAppBrowser.addListener('browserClosed', () => {
    console.log("browser was closed.");
});

await InAppBrowser.addListener('browserPageLoaded', () => {
    console.log("browser was loaded.");
});
```

#### Remove All Listeners
```typescript
import { InAppBrowser } from '@capacitor/inappbrowser';
InAppBrowser.removeAllListeners();
```

## API

<docgen-index>

* [`openInWebView(...)`](#openinwebview)
* [`openInSystemBrowser(...)`](#openinsystembrowser)
* [`openInExternalBrowser(...)`](#openinexternalbrowser)
* [`close()`](#close)
* [`addListener('browserClosed' | 'browserPageLoaded', ...)`](#addlistenerbrowserclosed--browserpageloaded-)
* [`removeAllListeners()`](#removealllisteners)
* [Interfaces](#interfaces)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### openInWebView(...)

```typescript
openInWebView(model: OpenInWebViewParameterModel) => Promise<void>
```

Opens the web content of the given URL in your mobile app using a custom web view within your application.

| Param       | Type                                                                                | Description                                    |
| ----------- | ----------------------------------------------------------------------------------- | ---------------------------------------------- |
| **`model`** | <code><a href="#openinwebviewparametermodel">OpenInWebViewParameterModel</a></code> | The parameters to open the URL in the web view |

--------------------


### openInSystemBrowser(...)

```typescript
openInSystemBrowser(model: OpenInSystemBrowserParameterModel) => Promise<void>
```

Opens the web content of the given URL in your mobile app, using SafariViewController for iOS and Custom Tabs for Android.

| Param       | Type                                                                                            | Description                                          |
| ----------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **`model`** | <code><a href="#openinsystembrowserparametermodel">OpenInSystemBrowserParameterModel</a></code> | The parameters to open the URL in the system browser |

--------------------


### openInExternalBrowser(...)

```typescript
openInExternalBrowser(model: OpenInDefaultParameterModel) => Promise<void>
```

Opens the web content of the given URL in a separate browser, outside of your mobile application.

| Param       | Type                                                                                | Description                                            |
| ----------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------ |
| **`model`** | <code><a href="#openindefaultparametermodel">OpenInDefaultParameterModel</a></code> | The parameters to open the URL in the external browser |

--------------------


### close()

```typescript
close() => Promise<void>
```

Closes the currently active browser. It can be used to close browsers launched through the openInSystemBrowser or openInWebView actions.

--------------------


### addListener('browserClosed' | 'browserPageLoaded', ...)

```typescript
addListener(eventName: 'browserClosed' | 'browserPageLoaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Adds a listener for the specified browser event.

| Param              | Type                                                | Description                                                                          |
| ------------------ | --------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **`eventName`**    | <code>'browserClosed' \| 'browserPageLoaded'</code> | The name of the browser event to listen for: 'browserClosed' or 'browserPageLoaded'. |
| **`listenerFunc`** | <code>() =&gt; void</code>                          | The function to be called when the event occurs.                                     |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => void
```

Removes all listeners for the browser events.

--------------------


### Interfaces


#### OpenInWebViewParameterModel

Defines the options for opening a URL in the web view.

| Prop          | Type                                                      | Description                                                          |
| ------------- | --------------------------------------------------------- | -------------------------------------------------------------------- |
| **`options`** | <code><a href="#webviewoptions">WebViewOptions</a></code> | A structure containing some configurations to apply to the Web View. |


#### WebViewOptions

| Prop                                  | Type                                                                    | Description                                                                                             |
| ------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **`showURL`**                         | <code>boolean</code>                                                    | Displays the URL on the Web View.                                                                       |
| **`showToolbar`**                     | <code>boolean</code>                                                    | Displays the toolbar on the Web View.                                                                   |
| **`clearCache`**                      | <code>boolean</code>                                                    | Clears the Web View's cookie cache before a new window is opened.                                       |
| **`clearSessionCache`**               | <code>boolean</code>                                                    | Clears the session cookie cache before a new window is opened.                                          |
| **`mediaPlaybackRequiresUserAction`** | <code>boolean</code>                                                    | Prevents HTML5 audio or video from auto-playing.                                                        |
| **`closeButtonText`**                 | <code>string</code>                                                     | Sets the text to display on the Close button on the Web View.                                           |
| **`toolbarPosition`**                 | <code><a href="#toolbarposition">ToolbarPosition</a></code>             | Sets the position to display the Toolbar on the Web View.                                               |
| **`showNavigationButtons`**           | <code>boolean</code>                                                    | Displays the navigation buttons.                                                                        |
| **`leftToRight`**                     | <code>boolean</code>                                                    | Swaps the positions of the navigation buttons and the close button.                                     |
| **`customWebViewUserAgent`**          | <code>string \| null</code>                                             | Sets a custom user agent to open the Web View with. If empty or not set, the parameter will be ignored. |
| **`android`**                         | <code><a href="#androidwebviewoptions">AndroidWebViewOptions</a></code> | Android-specific Web View options.                                                                      |
| **`iOS`**                             | <code><a href="#ioswebviewoptions">iOSWebViewOptions</a></code>         | iOS-specific Web View options.                                                                          |


#### AndroidWebViewOptions

| Prop               | Type                 | Description                                                                                                                                |
| ------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **`allowZoom`**    | <code>boolean</code> | Shows the Android browser's zoom controls.                                                                                                 |
| **`hardwareBack`** | <code>boolean</code> | Uses the hardware back button to navigate backwards through the Web View's history. If there is no previous page, the Web View will close. |
| **`pauseMedia`**   | <code>boolean</code> | Makes the Web View pause/resume with the app to stop background audio.                                                                     |


#### iOSWebViewOptions

| Prop                               | Type                                                  | Description                                                                                                                                                                                                    |
| ---------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`allowOverScroll`**              | <code>boolean</code>                                  | Turns on the Web View bounce property.                                                                                                                                                                         |
| **`enableViewportScale`**          | <code>boolean</code>                                  | Prevents viewport scaling through a meta tag.                                                                                                                                                                  |
| **`allowInLineMediaPlayback`**     | <code>boolean</code>                                  | Allows in-line HTML5 media playback, displaying within the browser window rather than a device-specific playback interface. Note: The HTML's video element must also include the webkit-playsinline attribute. |
| **`surpressIncrementalRendering`** | <code>boolean</code>                                  | Waits until all new view content is received before being rendered.                                                                                                                                            |
| **`viewStyle`**                    | <code><a href="#iosviewstyle">iOSViewStyle</a></code> | Sets the presentation style of the Web View.                                                                                                                                                                   |
| **`animationEffect`**              | <code><a href="#iosanimation">iOSAnimation</a></code> | Sets the transition style of the Web View.                                                                                                                                                                     |


#### OpenInSystemBrowserParameterModel

Defines the options for opening a URL in the system browser.

| Prop          | Type                                                                  | Description                                                                |
| ------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **`options`** | <code><a href="#systembrowseroptions">SystemBrowserOptions</a></code> | A structure containing some configurations to apply to the System Browser. |


#### SystemBrowserOptions

| Prop          | Type                                                                                | Description                              |
| ------------- | ----------------------------------------------------------------------------------- | ---------------------------------------- |
| **`android`** | <code><a href="#androidsystembrowseroptions">AndroidSystemBrowserOptions</a></code> | Android-specific System Browser options. |
| **`iOS`**     | <code><a href="#iossystembrowseroptions">iOSSystemBrowserOptions</a></code>         | iOS-specific System Browser options.     |


#### AndroidSystemBrowserOptions

| Prop                      | Type                                                              | Description                                                                                                                      |
| ------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **`showTitle`**           | <code>boolean</code>                                              | Enables the title display.                                                                                                       |
| **`hideToolbarOnScroll`** | <code>boolean</code>                                              | Hides the toolbar when scrolling.                                                                                                |
| **`viewStyle`**           | <code><a href="#androidviewstyle">AndroidViewStyle</a></code>     | Sets the presentation style of CustomTabs.                                                                                       |
| **`bottomSheetOptions`**  | <code><a href="#androidbottomsheet">AndroidBottomSheet</a></code> | Sets the options for the bottom sheet when this is selected as the viewStyle. If viewStyle is FULL_SCREEN, this will be ignored. |
| **`startAnimation`**      | <code><a href="#androidanimation">AndroidAnimation</a></code>     | Sets the start animation for when the browser appears.                                                                           |
| **`exitAnimation`**       | <code><a href="#androidanimation">AndroidAnimation</a></code>     | Sets the exit animation for when the browser disappears.                                                                         |


#### AndroidBottomSheet

| Prop          | Type                 | Description                                                                                                                                             |
| ------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`height`**  | <code>number</code>  | Sets the height of the bottom sheet. This will be a minimum of 50% of the screen's height. If no value is passed, we will default to the minimum value. |
| **`isFixed`** | <code>boolean</code> | Sets whether the bottom sheet is fixed.                                                                                                                 |


#### iOSSystemBrowserOptions

| Prop                       | Type                                                  | Description                                          |
| -------------------------- | ----------------------------------------------------- | ---------------------------------------------------- |
| **`closeButtonText`**      | <code><a href="#dismissstyle">DismissStyle</a></code> | Sets a text to use as the close button's caption.    |
| **`viewStyle`**            | <code><a href="#iosviewstyle">iOSViewStyle</a></code> | Sets the presentation style of SafariViewController. |
| **`animationEffect`**      | <code><a href="#iosanimation">iOSAnimation</a></code> | Sets the transition style of SafariViewController.   |
| **`enableBarsCollapsing`** | <code>boolean</code>                                  | Enables bars to collapse on scrolling down.          |
| **`enableReadersMode`**    | <code>boolean</code>                                  | Enables readers mode.                                |


#### OpenInDefaultParameterModel

Defines the options for opening a URL in the external browser and used by the others.

| Prop      | Type                | Description                                                                            |
| --------- | ------------------- | -------------------------------------------------------------------------------------- |
| **`url`** | <code>string</code> | The URL to be opened. It must contain either 'http' or 'https' as the protocol prefix. |


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