---
title: iOS Troubleshooting Guide
sidebar_label: Troubleshooting
description: iOS Troubleshooting Guide
contributors:
  - dotNetkow
  - mlynch
  - ryanccn
slug: /ios/troubleshooting
---

# iOS Troubleshooting Guide

Creating a 100% perfect native management tool is nearly impossible, and sooner or later you'll run into various issues with some part of the iOS workflow.

This guide attempts to document common iOS/Xcode issues with possible solutions.

## iOS Toolbox

Every iOS developer learns a few common techniques for debugging iOS issues, and you should incorporate these into your workflow:

### Google, Google, Google

Any time you encounter an issue with iOS, or Xcode, your first step should be to copy and paste the error into a Google search.

Capacitor uses the standard iOS toolchain, so chances are if you run into something, many iOS developers have as well, and there's a solution out there.

It could be as simple as updating a dependency, running clean, or removing Derived Data.

### Clean/Rebuild

Cleaning and rebuilding can fix a number of build issues. Navigate to Product -> Clean Build Folder in the Xcode menu to clean your current build.

### Removing Derived Data

Sometimes, Xcode clings to old, outdated build artifacts. To start fresh, you'll need to delete any Derived Data on disk.

To do this, open Xcode Preferences, choose the Locations tab, and click the small arrow next to your Derived Data path:

![Locations](/img/v6/docs/ios/location-prefs.png)

This opens a Finder window to the location of Xcode's temporary Derived Data.

Next, select all items in that directory and delete:

![Deleting Derived Data](/img/v6/docs/ios/deleting-derived-data.png)

Finally, do a rebuild in Xcode.

## Error: Sandbox not in sync with the Podfile.lock

This error can happen if CocoaPods hasn't been able to run to install your dependencies.

Run this to update your pods:

```bash
npx cap update ios
```

Perform a new build after running this command.

## Indexing FOREVER

Xcode sometimes gets stuck indexing forever. This unfortunate situation looks like this:

![Xcode indexing](/img/v6/docs/ios/indexing.png)

The only solution is to Force Close Xcode (using Activity Monitor) and start it up again.

## CocoaPods: Failed to connect to GitHub

This error can happen on Macs with an old version of openssl and ruby installed, since GitHub
restricted the allowed cryptographic protocols when accessing repos.

The solution is to update openssl and update Ruby:

```bash
brew install openssl
brew upgrade openssl
brew install ruby
brew link --overwrite ruby
```

Finally, make sure your `PATH` environment variable does not put `/usr/local/bin` after `$PATH`, but rather _before_ it.

See [this StackOverflow issue](https://stackoverflow.com/questions/38993527/cocoapods-failed-to-connect-to-github-to-update-the-cocoapods-specs-specs-repo/48996424#48996424) for other possible solutions to this problem.

## Plugin Not Implemented

On iOS, this can happen if Capacitor doesn't find the plugins or can't inject its code into the WebView.

First of all, make sure the plugin is installed and appears in the `package.json`.

Then, run `npx cap sync ios`.

Finally, check that the plugin is in `ios/App/Podfile`. If the plugin is not listed, make sure your Podfile looks like [this one](https://github.com/ionic-team/capacitor/blob/main/ios-pods-template/App/Podfile) and run `npx cap sync` again.

If still getting the "Plugin not implemented" error, make sure you don't have `WKAppBoundDomains` key in `ios/App/App/Info.plist`, that prevents Capacitor's and Plugins code from injecting. Remove the key if not needed, or if it can't be removed, add `limitsNavigationsToAppBoundDomains` to your capacitor config file with `true` value inside the `ios` object.
