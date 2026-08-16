---
title: Telemetry
description: Capacitor CLI Telemetry
contributors:
  - eric-horodyski
---

Capacitor collects anonymous telemetry data about general usage. This is an opt-out program that provides insight to the Capacitor team to help improve the product. By providing usage data, you help provide valuable insights that could shape the future of the product.

You will be automatically enrolled after the Capacitor CLI successfully finishes its first command. You may opt-out at any time, wherein telemetry data will not be collected unless you opt back in. 

> **Note:** Telemetry does not run in non-interactive environments, such as CI servers, ensuring no data is collected in those scenarios. 

## Why?

Anonymous usage data allows the team to gain insight into how Capacitor is being used. With this information, we can better prioritize fixes and features. It also provides the team with a better understanding of the developer experience.

## What is Collected?

Usage data is entirely anonymous and will only include the following:

* Timestamp
* Command name, arguments, and selected flags
* Command duration
* Error message (if the command failed, no stacktrace included)
* Capacitor machine ID (anonymous, generated ID)
* Project ID (anonymous, generated ID)
* Your operating system (Mac, Linux, Windows)
* Versions of: NodeJS, Capacitor CLI, core, and official platforms and plugins

## How to opt in or out

You may opt out at any time from the program by running `npx cap telemetry off` in the root of your project:

```bash
npx cap telemetry off
```

You can check the status by running the following command in the root of your project:

```bash
npx cap telemetry
```

If you would like to rejoin the program and provide telemetry on your project then run the following command:

```bash
npx cap telemetry on
```
