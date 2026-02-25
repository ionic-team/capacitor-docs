---
title: CLI Command - cap init
description: Capacitor CLI command - cap init
contributors:
  - thomasvidas
sidebar_label: init
---

# Capacitor CLI - cap init

Initialize Capacitor configuration by providing an app name, app ID, and an optional web directory for the existing web app.

```bash
npx cap init <appName> <appID>
```

<strong>Inputs:</strong>

- `appName` (required): The application's name
- `appID` (required): The application's App ID; something like `com.example.appname`

<strong>Options:</strong>

- `--web-dir <value>`: The existing web application to use with initialization
