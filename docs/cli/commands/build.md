---
title: CLI Command - cap build
description: Capacitor CLI - cap build
sidebar_label: build
---

# Capacitor CLI - cap build

This command will build the native project to create a signed AAB, APK or IPA file. Build options can be specified on the command line or in your Capacitor Configuration File.

```bash
npx cap build [options] <platform>
```

<strong>Inputs:</strong>

- `platform` (required): `android`, `ios`

<strong>Options:</strong>

- `--scheme <scheme-to-build>`: iOS Scheme to build (default is `App`)
- `--flavor <flavor-to-build>`: Android Flavor to build
- `--keystorepath <path>`: Path to the keystore file
- `--keystorepass <keystore-password>`: Password to the keystore
- `--keystorealias <alias>`: Key alias in the keystore
- `--keystorealiaspass <alias-password>`: Password for the keystore alias
- `--androidreleasetype <release-type>`: Can be either `AAB` or `APK`
- `--xcode-team-id <xcodeTeamID>`: The Developer team to use for building and exporting the archive
- `--xcode-export-method <xcodeExportMethod>`:  Describes how xcodebuild should export the archive (default is `app-store-connect`). Can be `app-store-connect`, `release-testing`, `enterprise`, `debugging`, `developer-id`, `mac-application`, or `validation`
- `--xcode-signing-style <xcodeSigningStyle>`:  The iOS signing style to use when building the app for distribution (default is `automatic`).  Can be `automatic` or `manual`
- `--xcode-signing-certificate <xcodeSigningCertificate>`: A certificate name, SHA-1 hash, or automatic selector to use for signing for iOS builds
- `--xcode-provisioning-profile <xcodeProvisioningProfile>`: A provisioning profile name or UUID for iOS builds
