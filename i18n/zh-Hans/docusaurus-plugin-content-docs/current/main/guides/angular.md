---
title: Angular
description: 在 Angular 中使用 Capacitor
slug: /guides/angular
---

# 在 Angular 中使用 Capacitor

## NgZone

Capacitor 插件事件监听器在 Angular 的 `NgZone` 执行上下文之外运行。将处理程序逻辑包含在 `NgZone.run` 块中，以确保触发 Angular 的变更检测：

```typescript
constructor(private ngZone: NgZone) { }

async ngOnInit() {
  Network.addListener("networkStatusChange", (status) => {
    this.ngZone.run(() => {
      // 这段代码将在 Angular 的执行上下文中运行
      this.networkStatus = status.connected ? "Online" : "Offline";
    });
  });
}
```
