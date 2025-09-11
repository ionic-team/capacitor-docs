---
title: CI/CD
description: Adding Mobile CI/CD to your Capacitor App development process
contributors:
  - mlynch
slug: /guides/ci-cd
---

# CI/CD for Capacitor Apps

Every serious app will utilize a CI/CD process for continuous testing, integration, and delivery.

Unfortunately, Mobile presents unique CI/CD challenges, and the same techniques that web developers use for frontend CI/CD won't apply for mobile, since build and deployment processes are radically different.

## Basic CI/CD for your frontend

The first step for CI/CD for a Capacitor app is using a process for building and testing your _frontend_ JS app.

This is commonly done today using a generic CI/CD service like GitHub Actions, CircleCI, Jenkins, etc.

In this process, an app is set to build on each commit and often run a local test suite. This is the typical JS CI/CD process and your team is likely already familiar with it.

But this is just the tip of the iceberg, as teams will need to figure out how to build, test, and deploy the actual native mobile side of their app.

## Adding Mobile CI/CD

Just building and running JS app tests is not nearly enough for a mobile app, given that a big portion of your app needs to build and run as a native iOS and Android app.

Additionally, the way a mobile app is deployed and updated is very different from a web app. Whereas a web app will be hosted on a server that can be quickly updated, mobile apps are "hosted" in app stores and distributed as cryptographically-signed binaries. The update process is very different.

This means we need a service that can do native mobile builds and tests, and also offer a way to deploy and update our apps in a native mobile appropriate way.

## Appflow: Mobile CI/CD for Capacitor apps

One such service that provides end-to-end Mobile CI/CD is [Appflow](https://ionic.io/appflow), the official Mobile CI/CD and Mobile DevOps platform for Capacitor apps.

Appflow provides frequently updated, managed iOS and Android build environments. Appflow integrates with popular git services like Azure DevOps, GitLab, GitHub, and Bitbucket, to support triggering JS and native mobile builds on each commit. Appflow also supports separating builds into different channels for stakeholders, beta testers, and production users. Additionally, Appflow can automatically submit your app to app stores as part of an automated workflow, and removes the need for your team to manage complicated native iOS and Android build stacks.

For Capacitor developers, Appflow also offers the ability to push real-time updates to apps without app store submission, as long as those updates are at the JS/HTML/CSS layer of an app.

For more details, see the [Appflow Documentation](https://ionicframework.com/docs/appflow).

## Using a traditional CI/CD service with Appflow

Appflow can replace a traditional CI/CD service since it performs web/JS builds and native mobile builds. However, it works great with a traditional CI/CD service.

To use it in this way, use webhooks to send built assets to Appflow on each commit.

## Other Mobile CI/CD Options

There are other services for Mobile CI/CD, though none focused on Capacitor. Whichever CI/CD service you prefer, Capacitor can integrate with it as Capacitor apps are just native apps. However, for remote live updates of Capacitor apps, [Appflow](https://ionic.io/appflow) is the only service with this feature.
