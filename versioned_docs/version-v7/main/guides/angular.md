---
title: Angular
description: Using Angular with Capacitor
slug: /guides/angular
---

# Using Angular with Capacitor

## NgZone

Capacitor plugin event listeners run outside of Angular's `NgZone` execution context. Contain handler logic within an `NgZone.run` block to ensure Angular's change detection is triggered:

```typescript
constructor(private ngZone: NgZone) { }

async ngOnInit() {
  Network.addListener("networkStatusChange", (status) => {
    this.ngZone.run(() => {
      // This code will run in Angular's execution context
      this.networkStatus = status.connected ? "Online" : "Offline";
    });
  });
}
```
