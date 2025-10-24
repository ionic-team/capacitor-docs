---
title: Building Your UI
description: Popular UI options for building great Capacitor mobile apps
slug: /getting-started/ui
---

# Building Your UI

Capacitor apps are web apps at the core. But it takes a lot more than just wrapping a website to deliver a great native-quality mobile app. 

Today, teams have a variety of options for their app UI. Let's explore some of the most popular options.

## Ionic Framework

[Ionic Framework](https://ionicframework.com/) is a mobile-focused UI kit and set of utilities that enable web developers using Capacitor to get a native-quality app experience that follows platform conventions. Ionic Framework is created by the same company that makes Capacitor and is designed specifically with Capacitor in mind.

Today, Ionic Framework is our recommended UI framework for Capacitor, because we believe it will help teams achieve the highest quality native app experience. However, it is _not_ required to use it in your Capacitor apps.

Ionic Framework comes with native-quality transitions and routing for [Angular](https://ionicframework.com/docs/angular/navigation), [React](https://ionicframework.com/docs/react/navigation), and [Vue](https://ionicframework.com/docs/vue/navigation) with deep integration into the most popular routing solution in each framework. Additionally, Ionic comes with powerful components like [Modals](https://ionicframework.com/docs/api/modal), [Menus](https://ionicframework.com/docs/api/menu), [Lists](https://ionicframework.com/docs/api/list) along with powerful item features like [Sliding Items](https://ionicframework.com/docs/api/item-sliding), [Form inputs](https://ionicframework.com/docs/api/input), [Datetime pickers](https://ionicframework.com/docs/api/datetime), [Cards](https://ionicframework.com/docs/api/card), [Tabs](https://ionicframework.com/docs/api/tabs), [iOS-style condensed headers](https://ionicframework.com/docs/api/header#condensed-header), and [so much more](https://ionicframework.com/docs/components).

Ionic Framework requires Angular, React, or Vue, so will only be a fit for teams using those technologies. 

To get started, view the [using Capacitor with Ionic](./with-ionic) docs to learn more.

## Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/) is a popular CSS framework with companion UI template library that many Capacitor developers use to build great app experiences. Some of our favorite examples include [Reflect](https://reflect.app/) and [LogSnag](https://twitter.com/ImSh4yy/status/1615080429417103366?s=20&t=bmVrAb9PNFY6AQPNXwMFYA).

There are also some interesting Tailwind-focused Mobile UI frameworks, such as [Konsta UI](https://konstaui.com/).

When using Tailwind, it's important to keep in mind that Tailwind does not provide mobile-style navigation and routing primitives, so teams will need to take care to build a UX that fits platform conventions. One way to do this is to mix Tailwind with Ionic Framework, as shown in this [Next.js + Tailwind + Ionic Framework + Capacitor template](https://github.com/mlynch/nextjs-tailwind-ionic-capacitor-starter). Another would be to design a UX that avoids traditional forward/back navigation and instead uses tabs or modals. Finally, teams are free to build a custom navigation and routing experience if desired.

## Framework7

[Framework7](https://framework7.io/) is a popular mobile-focused UI library created by the developer of [Swiper](https://swiperjs.com/), a powerful mobile touch slider library.

## Quasar

[Quasar](https://quasar.dev/) is a Vue.js framework with mobile-focused components and [official support for Capacitor](https://quasar.dev/quasar-cli-vite/developing-capacitor-apps/introduction#introduction).

## Material UI

[Material UI](https://mui.com/) is a popular React-focused library implementing the Material Design guidelines.

## Roll your own

If you already have an existing UI kit or would like to implement your own, we recommend reviewing Ionic Framework and the other options presented here for inspiration. Capacitor provides a blank slate to build your dream, but if you choose to roll your own UI you are responsible for building a great experience that users expect. This can be challenging to do on top of building your app, so we generally recommend this only for very advanced teams or for web apps that are already mobile-optimized.
