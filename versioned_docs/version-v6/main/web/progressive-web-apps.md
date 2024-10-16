---
title: Building Progressive Web Apps
description: How to build Progressive Web Apps with Capacitor
contributors:
  - jcesarmobile
  - dotNetkow
slug: /web/progressive-web-apps
---

# Building Progressive Web Apps

Capacitor has first-class support for Progressive Web Apps, making it easy to build an app that runs natively on iOS and Android, but also on the web as a mobile web app or "Progressive Web App."

## What is a Progressive Web App?

Put simply, a Progressive Web App (PWA) is a web app that uses modern web capabilities to deliver an app-like experience to users. These apps are deployed to traditional web servers, are accessible through URLs, and can be indexed by search engines.

A Progressive Web App is, for all practical purposes, just another term for a website that has been optimized for mobile performance and that utilizes newly available Web APIs to deliver features that are similar to a traditional native app, such as push notifications and offline storage.

## Capacitor and Progressive Web Apps

Capacitor has first-class support for Progressive Web Apps _and_ native apps. That means that Capacitor's bridge supports running in either a native context or in the web, with many plugins available _in both contexts_ with the exact same API and calling conventions.

This means you use `@capacitor/core` and Capacitor plugins as dependencies for both your native app _and_ your Progressive Web App, and Capacitor seamlessly calls web code when required and native code when available.

Additionally, Capacitor offers a number of utilities for querying the current platform to provide customized experiences when running natively or on the web.

## Adding Progressive Web App Support to your app

Progressive Web Apps should have an App Manifest and a Service Worker.

### App Manifest

First, you'll need an [App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) file ([manifest.json](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json)) that sits alongside your `index.html` file and provides metadata about your app, such as its name, theme colors, and icons. This information will be used when your app is installed on the home screen, for example.

### Service Worker

Next, in order to send push notifications and store data offline, a [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) will enable your web app to proxy network requests and perform background tasks needed to process and sync data.

Service Workers are powerful, but complicated. Generally, writing them from scratch is not recommended. Instead, take a look at tools like [Workbox](https://developers.google.com/web/tools/workbox/) that provide common Service Worker recipes that you can easily incorporate into your app.

Read more about using Service Workers, including how to register them, on the [Using Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) page on MDN.

## Progressive Web App Performance

Progressive Web Apps are judged by several performance standards, including [Time to Interactive](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive) and [First Meaningful Paint](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint).

Follow the [Progressive Web App Checklist](https://developers.google.com/web/progressive-web-apps/checklist) before going live, and use [Lighthouse](https://developers.google.com/web/tools/lighthouse/) to audit and test your app.

If you're struggling to meet Progressive Web App performance standards with your existing frontend stack, take a look at [Ionic Framework](http://ionicframework.com/) as an option for getting fast PWA support with nearly zero configuration.
