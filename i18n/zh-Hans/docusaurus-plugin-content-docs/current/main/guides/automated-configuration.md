---
title: 自动化配置
description: 自动化 Capacitor 项目的配置和管理，用于插件、白标、CI/CD 等。
contributors:
  - mlynch
slug: /guides/automated-configuration
---

# Capacitor 项目自动化配置

许多大规模应用需要自动化其 Capacitor 项目的配置。这可能意味着增加 iOS 和 Android 构建号、配置清单和 plist 文件、在 Gradle 文件中添加构建依赖项、修改资源等。

Capacitor 附带了两个有用的包，可用于管理项目：`@trapezedev/project` 和 `@trapezedev/configure`。`@trapezedev/project` 是一个较低级的项目管理库，`@trapezedev/configure` 是一个自动化工具，它在底层使用该库，但对于某些用例，它提供了更方便的配置选项。

这两个项目及其文档都可以在 [Trapeze repo](https://github.com/ionic-team/trapeze) 中找到。

## Project API

`@trapezedev/project` 库为 Capacitor 项目及其包含的本机 iOS 和 Android 项目提供了一个类型化的 JavaScript 接口。

```typescript
import { MobileProject, MobileProjectConfig } from '@trapezedev/project';

// 这需要一个 MobileProjectConfig
// 来知道 ios 和 android 项目在哪里
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

加载项目后，可以对其执行操作。例如，以下是管理版本和构建号的方法：

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

该 API 在虚拟文件系统上工作，以缓冲更改而不修改文件系统上的文件。完成后，要确保更改反映在您的文件中，请运行：

```typescript
await project.commit();
```

这个库可以执行许多其他操作。要查看完整列表，请参阅[项目文档](https://github.com/ionic-team/trapeze)。

## 配置工具

除了 Project API，`@trapezedev/configure` 还提供了一个自动化的、配置驱动的体验，用于应用 `@trapezedev/project` 中的底层操作，但是从方便的 yaml 配置文件格式。还有一些其他功能，例如能够需要和提供变量来填充最终配置中的值，以及一种在对项目源文件应用更改之前测试和查看更改的方法。

该工具对于 Capacitor 插件作者可能最有用，他们希望发布其插件所需的一组配置更改，以避免用户必须手动配置其项目。

该工具旨在用作 npm 脚本，然后提供遵循[示例配置](https://github.com/ionic-team/trapeze/blob/main/examples/basic.yml)的 yaml 格式：

```json
"scripts": {
  "cap-config": "trapeze run config.yaml"
}
```

```bash
npm run cap-config
```

有关使用此工具的更多信息，请参阅[项目文档](https://github.com/ionic-team/trapeze)。
