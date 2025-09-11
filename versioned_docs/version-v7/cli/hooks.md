---
title: CLI Hooks
description: Capacitor CLI Hooks
contributors:
  - jcesarmobile
---

# Capacitor CLI Hooks

Starting in Capacitor 3.1, the following events can be used to hook into Capacitor commands:

- `capacitor:copy:before`
- `capacitor:copy:after`
- `capacitor:update:before`
- `capacitor:update:after`
- `capacitor:sync:before`
- `capacitor:sync:after`

To use them add the event name and the code you want to run in the scripts section of your app's `package.json`.

Example that just echo the command and the platform where it ran:

```json
"scripts": {
  "capacitor:copy:before": "echo copy before $CAPACITOR_PLATFORM_NAME",
  "capacitor:copy:after": "echo copy after $CAPACITOR_PLATFORM_NAME",
  "capacitor:update:before": "echo update before $CAPACITOR_PLATFORM_NAME",
  "capacitor:update:after": "echo update after $CAPACITOR_PLATFORM_NAME",
  "capacitor:sync:before": "echo sync before $CAPACITOR_PLATFORM_NAME",
  "capacitor:sync:after": "echo sync after $CAPACITOR_PLATFORM_NAME"
}
```
