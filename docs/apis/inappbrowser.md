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

### Android

#### LocalStorage Isolation
The `openInWebView` option provides isolation for `localStorage` and `cookies` to ensure that content loaded in the InAppBrowser does not interfere with the main application's storage.

- **iOS**: Storage is isolated by default.
- **Android (API 28+)**: Storage is **isolated by default since version 4.0.0** by running the InAppBrowser in a separate process (`:OSInAppBrowser`) with a dedicated data directory suffix.
- **Android (API < 28)**: Storage is **shared** with the main application due to platform limitations.

### Opting-out of Isolation (Android)
If your use case requires sharing `localStorage` or `cookies` between the main app and the InAppBrowser on Android, you can opt-out of isolation by setting `isIsolated: false` in the `android` options.

:::caution

Disabling isolation reduces the security of your app by allowing potentially untrusted web content to access your application's private storage (Cookies, LocalStorage, etc.). Use this only if absolutely necessary.

:::

:::warning

**Breaking Change (Android)**: Apps upgrading to version 4.0.0 or higher will lose any existing `localStorage` or cookies previously stored by the InAppBrowser on the first run. This is because the WebView now runs in a separate process with its own data directory. Users may need to re-authenticate with websites that relied on persisted session data.

:::

#### Permissions (Android)
The plugin declares the following permissions in its own Android manifest, so they are merged into your app automatically: `INTERNET`, `CAMERA`, `RECORD_AUDIO` and `MODIFY_AUDIO_SETTINGS`.

:::warning

**Breaking Change (Android)**: As of version 5.0.0, the plugin no longer declares `ACCESS_COARSE_LOCATION` and `ACCESS_FINE_LOCATION`. These are sensitive permissions that are not part of the plugin's core functionality, so they should not be added to your app unless you need them.

If your app doesn't declare them, geolocation requests from pages loaded in the Web View are denied. If you rely on location access in the Web View, add the permissions to your app's `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

You can declare only one of them (e.g. coarse location only) if that is enough for your use case. The plugin requests only the location permissions that your app has declared.

Location is a sensitive permission for Google Play. If you add these permissions yourself, you may need to submit a declaration in the Play Console justifying why your app needs them. See Google's article on [permissions and APIs that access sensitive information](https://support.google.com/googleplay/android-developer/answer/9799150) for the requirements.

:::

---

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

await InAppBrowser.addListener('browserPageNavigationCompleted', (data) => {
    console.log("browser page navigation was completed. " + data.url);
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
* [`addListener('browserPageNavigationCompleted', ...)`](#addlistenerbrowserpagenavigationcompleted-)
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
addListener(eventName: "browserClosed" | "browserPageLoaded", listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Adds a listener for the specified browser events, with no data being returned.

| Param              | Type                                                | Description                                                                          |
| ------------------ | --------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **`eventName`**    | <code>'browserClosed' \| 'browserPageLoaded'</code> | The name of the browser event to listen for: 'browserClosed' or 'browserPageLoaded'. |
| **`listenerFunc`** | <code>() =&gt; void</code>                          | The function to be called when the event occurs.                                     |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('browserPageNavigationCompleted', ...)

```typescript
addListener(eventName: "browserPageNavigationCompleted", listenerFunc: (data: BrowserPageNavigationCompletedEventData) => void) => Promise<PluginListenerHandle>
```

Adds a listener for the specified browser event, which receives data.

| Param              | Type                                                                                                                           | Description                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'browserPageNavigationCompleted'</code>                                                                                  | The name of the browser event to listen for: 'browserPageNavigationCompleted'. Applies only to openInWebView. |
| **`listenerFunc`** | <code>(data: <a href="#browserpagenavigationcompletedeventdata">BrowserPageNavigationCompletedEventData</a>) =&gt; void</code> | The function to be called when the event occurs.                                                              |

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

| Prop                | Type                                                      | Description                                                          |
| ------------------- | --------------------------------------------------------- | -------------------------------------------------------------------- |
| **`options`**       | <code><a href="#webviewoptions">WebViewOptions</a></code> | A structure containing some configurations to apply to the Web View. |
| **`customHeaders`** | <code>{ [key: string]: string; }</code>                   | A map of custom headers to be sent with the request.                 |


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

| Prop                     | Type                  | Description                                                                                                                                                                                                                                                                                                  |
| ------------------------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`allowZoom`**          | <code>boolean</code>  | Shows the Android browser's zoom controls.                                                                                                                                                                                                                                                                   |
| **`hardwareBack`**       | <code>boolean</code>  | Uses the hardware back button to navigate backwards through the Web View's history. If there is no previous page, the Web View will close.                                                                                                                                                                   |
| **`pauseMedia`**         | <code>boolean</code>  | Makes the Web View pause/resume with the app to stop background audio.                                                                                                                                                                                                                                       |
| **`isIsolated`**         | <code>boolean</code>  | Whether to run the InAppBrowser in an isolated process. Android only. Defaults to true.                                                                                                                                                                                                                      |
| **`successUrlPatterns`** | <code>string[]</code> | Regex patterns checked against each finished page load; matching one closes the Web View natively, independent of whether the host app's JS is able to react. Android only. Useful for redirect-based flows with a known "done" URL where you want the Web View to close reliably as soon as that URL loads. |


#### iOSWebViewOptions

| Prop                                      | Type                                                  | Description                                                                                                                                                                                                    |
| ----------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`allowOverScroll`**                     | <code>boolean</code>                                  | Turns on the Web View bounce property.                                                                                                                                                                         |
| **`enableViewportScale`**                 | <code>boolean</code>                                  | Prevents viewport scaling through a meta tag.                                                                                                                                                                  |
| **`allowInLineMediaPlayback`**            | <code>boolean</code>                                  | Allows in-line HTML5 media playback, displaying within the browser window rather than a device-specific playback interface. Note: The HTML's video element must also include the webkit-playsinline attribute. |
| **`surpressIncrementalRendering`**        | <code>boolean</code>                                  | Waits until all new view content is received before being rendered.                                                                                                                                            |
| **`viewStyle`**                           | <code><a href="#iosviewstyle">iOSViewStyle</a></code> | Sets the presentation style of the Web View.                                                                                                                                                                   |
| **`animationEffect`**                     | <code><a href="#iosanimation">iOSAnimation</a></code> | Sets the transition style of the Web View.                                                                                                                                                                     |
| **`allowsBackForwardNavigationGestures`** | <code>boolean</code>                                  | Enables back and forward swipe gestures in the Web View.                                                                                                                                                       |


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

| Prop          | Type                 | Description                                                                                                                                                                        |
| ------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`height`**  | <code>number</code>  | Sets the height of the bottom sheet, in pixels. Custom tabs will set the bottom height to at least 50% of the screen. If no value is passed, it will default to the minimum value. |
| **`isFixed`** | <code>boolean</code> | Sets whether the bottom sheet is fixed.                                                                                                                                            |


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


#### BrowserPageNavigationCompletedEventData

Defines the data for the 'browserPageNavigationCompleted' event.

| Prop      | Type                | Description                          |
| --------- | ------------------- | ------------------------------------ |
| **`url`** | <code>string</code> | The URL of the page that was loaded. |


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