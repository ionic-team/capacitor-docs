---
title: 自动化配置
description: 自动化配置和管理 Capacitor 项目，包括插件、白标化、CI/CD 等。
contributors:
  - mlynch
slug: /guides/automated-configuration
---

# Capacitor 项目自动化配置

许多大型应用需要对 Capacitor 项目进行自动化配置。这可能包括递增 iOS 和 Android 的构建版本号、配置清单文件和 plist 文件、在 Gradle 文件中添加构建依赖、修改资源等操作。

Capacitor 提供了两个实用的包来管理项目：`@trapezedev/project` 和 `@trapezedev/configure`。`@trapezedev/project` 是一个底层项目管理库，而 `@trapezedev/configure` 则是一个自动化工具，它在底层使用了该库，但为特定用例提供了更便捷的配置选项。

这两个项目及其文档都可以在 [Trapeze 仓库](https://github.com/ionic-team/trapeze) 中找到。

## 项目 API

`@trapezedev/project` 库为 Capacitor 项目及其包含的原生 iOS 和 Android 项目提供了一个类型化的 JavaScript 接口。

```typescript
import { MobileProject, MobileProjectConfig } from '@trapezedev/project';

// 这需要一个 MobileProjectConfig
// 来了解 iOS 和 Android 项目的位置
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

项目加载完成后，可以对其执行操作。例如，以下是如何管理版本和构建版本号：

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

该 API 在虚拟文件系统上工作，可以在不修改文件系统上的文件的情况下缓冲更改。完成后，为确保更改反映在文件中，请运行：

```typescript
await project.commit();
```

该库还可以执行许多其他操作。要查看完整列表，请参阅 [项目文档](https://github.com/ionic-team/trapeze)。

## 配置工具

除了项目 API，`@trapezedev/configure` 还提供了一种自动化的、基于配置的体验，用于应用 `@trapezedev/project` 中的底层操作，但使用方便的 yaml 配置文件格式。还有一些额外的功能，例如需要并提供变量以填充最终配置中的值，以及一种在将更改应用于项目源文件之前测试和查看更改的方法。

对于希望发布其插件所需的一组配置更改以避免用户手动配置其项目的 Capacitor 插件作者来说，此工具可能最有用。

此工具旨在用作 npm 脚本，然后提供一个遵循 [示例配置](https://github.com/ionic-team/trapeze/blob/main/examples/basic.yml) 的 yaml 格式：

```json
"scripts": {
  "cap-config": "trapeze run config.yaml"
}
```

```bash
npm run cap-config
```

有关使用此工具的更多信息，请参阅 [项目文档](https://github.com/ionic-team/trapeze)。