---
title: CLI Commands
description: Capacitor CLI command reference list
contributors:
  - dotNetkow
canonicalUrl: https://capacitorjs.com/docs/cli/create
---

# Capacitor CLI - create

Create a new Capacitor project with a stock project structure if you'd rather start fresh and plan to add a UI/frontend framework separately.

```bash
npx @capacitor/cli create [options] [directory] [name] [id]
```

<strong>Inputs:</strong>

- `directory` (optional): Directory to create the new app in, such as `c:\src\myapp`
- `name` (optional): App name
- `id` (optional): App Package Id (in Java package format, no dashes), such as `com.example.app`

<strong>Options:</strong>

- `--npm-client <npmClient>`: npm client to use for dependency installation
