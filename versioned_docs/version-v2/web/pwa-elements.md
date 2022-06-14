---
title: PWA Elements
description: Using PWA Elements
contributors:
  - dotNetkow
  - mlynch
canonicalUrl: https://capacitorjs.com/docs/web/pwa-elements
---

# PWA Elements

Some Capacitor plugins, such as `Camera` or `Toast`, have web-based UI available when not running natively. For example, calling `Camera.getPhoto()` will load a responsive photo-taking experience when running on the web:

<img src="/assets/img/docs/pwa-elements.png" style="height: 200px" />

This UI is implemented using web components. Due the elements being encapsulated by the [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM), these components should not conflict
with your own UI.

## Installation

To enable these controls, you must add `@ionic/pwa-elements` to your app.

A typical installation involves importing the package and registering the elements, or adding a script tag to the `<head>` of the `index.html` for your app:

#### Importing PWA Elements

```bash
npm install @ionic/pwa-elements
```

Then, depending on your framework of choice, import the element loader and call it at the correct time:

##### React

`index.tsx` or `index.js`:

```tsx
import { defineCustomElements } from '@ionic/pwa-elements/loader';

ReactDOM.render(<App />, document.getElementById('root'));

// Call the element loader after the app has been rendered the first time
defineCustomElements(window);
```

##### Vue

`main.ts`

```typescript
import Vue from 'vue';
import App from './App.vue';
import router from './router';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);
```

##### Angular

`main.ts`:

```typescript
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);
```

#### Including through script tag

PWA Elements can be included through a script tag in your `index.html`. However, keep in mind this will not work for offline scenarios:

```html
<script
  type="module"
  src="https://unpkg.com/@ionic/pwa-elements@2/dist/ionicpwaelements/ionicpwaelements.esm.js"
></script>
<script
  nomodule
  src="https://unpkg.com/@ionic/pwa-elements@2/dist/ionicpwaelements/ionicpwaelements.js"
></script>
```
