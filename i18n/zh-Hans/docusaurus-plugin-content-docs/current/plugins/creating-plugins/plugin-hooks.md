---
title: 插件 Hooks
description: Capacitor 插件 Hooks
sidebar_label: 插件 Hooks
slug: /plugins/plugin-hooks
---

# Capacitor 插件 Hooks

从 Capacitor 6.1 开始,可以在插件中使用以下事件来挂钩到 Capacitor 命令:

- `capacitor:copy:before`
- `capacitor:copy:after`
- `capacitor:update:before`
- `capacitor:update:after`
- `capacitor:sync:before`
- `capacitor:sync:after`

要使用它们,请在插件的 `package.json` 的 scripts 部分添加事件名称和你要运行的代码。

仅回显命令和运行平台的示例:

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

:::note
Capacitor 插件 Hooks 如果添加到 Cordova 插件中也可以工作
:::
