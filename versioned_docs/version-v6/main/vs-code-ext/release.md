---
title: Release to the Store
description: Visual Studio Code Extension for Capacitor
contributors:
  - dtarnawsky
slug: /vscode/release
---

Preparing your application to release to the App Store or Play Store involves first producing a binary file that can be submitted.

[Appflow](https://ionic.io/appflow) is the easiest way to automate building and deploying apps to the store. If your process is manual then follow this guide.

## App Store

For iOS you need your app built into an `IPA` file:
- Click `Project` > `Prepare Release`
- Choose `IOS Release Build (.ipa)`
- The IPA file will be saved in the folder `ios/App/output`
- Use [Apple Transporter](https://apps.apple.com/us/app/transporter/id1450874784?mt=12) to upload your IPA to the App Store

:::note
The first time you generate an IPA you need to specify the development team of your app. Click `Open in XCode`, click `App`, choose `Signing & Capabilities` and select a Team from the drop down. After this `Prepare Release` will generate a IPA file signed by this user/team.
:::

## Play Store

For Android you need your app built into an `AAB` file:
- Click `Project` > `Prepare Release`
- Choose `Android Release Build (.aab)`
- Enter the `keystore password`
- Enter the `key password`
- The AAB file will be saved in the folder `android/app/build/outputs/bundle/release`
- Use the [Play Store Console](https://developer.android.com/distribute/console) to upload the AAB to the Play Store

Your keystore file and alias are stored for you in `capacitor.config.ts` but for security purposes the passwords are not stored.


:::note
The first time you generate an AAB file you will need a Keystore file. You can create one in Android Studio (`Build` > `Generate Signed Bundle`). Be sure to note the `alias` and passwords you use.
:::
