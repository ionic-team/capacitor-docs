---
title: Automated Configuration
description: Automating the configuration and management of Capacitor projects for plugins, whitelabling, CI/CD, and more.
contributors:
  - mlynch
slug: /guides/automated-configuration
---

# Automated Capacitor Project Configuration

Many large-scale apps need to automate the configuration of their Capacitor project. This could mean incrementing iOS and Android build numbers, configuring manifest and plist files, adding build dependencies in Gradle files, modifying resources, and more.

Capacitor comes with a two useful packages that can be used for managing projects: `@trapezedev/project` and `@trapezedev/configure`. `@trapezedev/project` is a lower-level project management library and `@trapezedev/configure` is an automated tool that uses the library under the hood but presents a more convenient configuration option for certain use cases.

Both projects and their documentation are available in the [Trapeze repo](https://github.com/ionic-team/trapeze).

## Project API

The `@trapezedev/project` library provides a typed JavaScript interface for Capacitor projects and the native iOS and Android projects that they contain.

```typescript
import { MobileProject, MobileProjectConfig } from '@trapezedev/project';

// This takes a MobileProjectConfig
// to know where the ios and android projects are
const config: MobileProjectConfig = {
  ios: {
    path: 'ios/App',
  },
  android: {
    path: 'android',
  },
};

const project = new MobileProject(process.cwd(), config);
await project.load();
```

Once the project is loaded, operations can be performed against it. For example, here is how versions and build numbers can be managed:

```typescript
await project.ios?.setVersion('App', 'Debug', '1.4.5');
await project.ios?.incrementBuild('App');
await project.ios?.getBuild('App', 'Debug');
await project.ios?.getBuild('App', 'Release');
await project.android?.setVersionName('1.0.2');
await project.android?.getVersionName();
await project.android?.setVersionCode(11);
await project.android?.getVersionCode();
await project.android?.incrementVersionCode();
```

The API works on a virtual filesystem to buffer changes without modifying files on the filesystem. When finished, to make sure changes are reflected in your files, run:

```typescript
await project.commit();
```

There are many other options this library can perform. To see the full list, consult the [project documentation](https://github.com/ionic-team/trapeze).

## Configuration Tool

Along with the project API, `@trapezedev/configure` provides an automated, configuration-driven experience for applying the underlying operations in `@trapezedev/project`, but from a convenient yaml configuration file format. There are some additional features as well, such as the ability to require and supply variables to populate values in the final configuration, and a way to test and see changes before they are applied against your project source files.

This tool is likely going to be most useful for Capacitor plugin authors that wish to publish a set of configuration changes their plugin requires, to avoid users having to manually configure their projects.

This tool is meant to be used as an npm script that is then supplied with a yaml format that follows the [example configuration](https://github.com/ionic-team/trapeze/blob/main/examples/basic.yml):

```json
"scripts": {
  "cap-config": "trapeze run config.yaml"
}
```

```bash
npm run cap-config
```

Consult the [project documentation](https://github.com/ionic-team/trapeze) for more information on using this tool.
