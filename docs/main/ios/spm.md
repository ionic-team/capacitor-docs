---
title: Swift Package Manager
description: SPM Basics
contributors:
  - giralte-ionic
slug: /ios/spm
---

<em>6.0 Beta Documentation</em>

# Swift Package Manager

Swift Packages are Apple's new first-party tool for software dependacies. Traditionally Capacitor has used Cocoapods for managing depenacies internally and for plugins, however now is the time to move to a supported solution. 

In Capcacitor 6, you can now choose between using Cocoapods or Swift Package Manager (SPM). Almost all current capacitor-team supported plugins support SPM, namely the plugins in <a href="https://github.com/ionic-team/capacitor-plugins">capacitor-plugins</a>.

We've tried our best to make sure you don't have to change much about how you work with Capacitor to use SPM, but there are a few things to understand.

### How it works

When a Capcacitor project is using SPM we use a 'Base SPM' package that will serve as the place that references all of your projects dependancies:

![Base SPM Picture](../../../static/img/v6/docs/ios/spm/base-spm.png)

The Capcacitor CLI will modify the CapAPP-SPM package when you sync new plugins. It is important you do not touch the contents here because the CLI can and will change things.

### Using SPM in a new Capacitor project

First we'll start with our normal `npm init @capacitor/app`:

![Demo Step 1](../../../static/img/v6/docs/ios/spm/demo-step1.png)

Then we're going to edit the project's package.json to use the latest 6.0 betas, by replacing every instance of 'latest' with 'next'. It should read like this when it's ready:

```
{
  "name": "capacitor-app",
  "version": "1.0.0",
  "description": "An Amazing Capacitor App",
  "main": "index.js",
  "keywords": [
    "capacitor",
    "mobile"
  ],
  "scripts": {
    "start": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@capacitor/core": "next",
    "@capacitor/camera": "next",
    "@capacitor/splash-screen": "next"
  },
  "devDependencies": {
    "@capacitor/cli": "next",
    "vite": "^2.9.13"
  },
  "author": "",
  "license": "ISC"
}
```

Once you're done editing the package.json file, use this to have NPM upgrade this Capacitor installation to the latest 6.0 beta:

`npm install`

Now we want to add the iOS platform to our project:

`npm install @capacitor/ios@next`

Next let's build the web project:

`npm run build`

After that is complete we can add the iOS project. We need to add the option `--packagemanager SPM` to the normal add command:

`npx cap add ios --packagemanager SPM`

Now you can use `npx cap open ios` to open the iOS project and run your app from there.

---

### Add and use a Capactior Plugin with SPM

So let's add a plugin to this project and do something with that plugin. 

Start with installing the Capacitor App plugin:

`npm install @capacitor/app@next`

Then let's sync the web app. This will add the App plugin SPM to the iOS project:

`npx cap sync`

You can now use the App plugin normally.

<em>More details coming soon</em>

### Converting existing plugins to SPM

More details soon, but check this repository out: https://github.com/ionic-team/capacitor-plugin-converter


### Troubleshooting

After adding plugins try to 'reset package caches' in Xcode:

![Demo Step 1](../../../static/img/v6/docs/ios/spm/reset-package.png)