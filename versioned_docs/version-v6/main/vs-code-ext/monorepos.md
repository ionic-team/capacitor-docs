---
title: Monorepos
description: Visual Studio Code Extension for Capacitor
contributors:
  - dtarnawsky
slug: /vscode/monorepos
---

The extension supports many flavors of mono-repos and when detecting a monorepo will show a project selection list at the bottom of its panel as shown below:

![Monorepo projects](/img/monorepo.png)

## Supported Types
The list of supported Monorepo types include:
- **[NX](https://nx.dev/)** - which is often combined with [nxtend](https://nxtend.dev/docs/capacitor/overview) for Capacitor support
- **[NPM Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)** - Simple multi project support built into npm.
- **[Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/)** - Multi project support for [Yarn](https://yarnpkg.com/) (an alternative to npm).
- **[Pnpm Workspaces](https://pnpm.io/workspaces)** - Multi project support for [pnpm](https://pnpm.io/) (an alternative to npm).
- **[Lerna](https://lerna.js.org/)** - A tool for managing and publishing packages from the same repository.
- **Multiple Folder** - If you keep your projects in sub folders.
- **[VSCode Workspaces](https://code.visualstudio.com/docs/editor/workspaces#_multiroot-workspaces)** - If you use VSCodes multi-root workspace file