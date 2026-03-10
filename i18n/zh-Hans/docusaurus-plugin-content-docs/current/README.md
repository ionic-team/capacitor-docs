# 文档文件夹

`/docs` 文件夹包含所有 Markdown 文件。页面结构大致映射到站点上的路由，因为路径可以在 frontmatter 中更改。

## 版本控制

此文件夹还可以包含组件、资产以及在运行 docusaurus 版本控制脚本时需要版本控制的其他任何内容。例如，如果有一个页面组件仅与当前版本的 Ionic 的 `layout` 部分相关，它可以添加到 `docs/layout/` 中的 `_components/` 文件夹中。当运行版本控制脚本时，该组件将被复制到 `versioned_docs/version-{X}/layout/_components/`，并且现在在 `docs/layout/_components/` 中有一个单独的组件，可以删除或更新到最新版本。同样的概念适用于图像和其他文件。

如果组件要在版本之间共享，可以放在 `src/components/` 中。如果图像和其他服务文件要在版本之间共享，可以放在 `static/` 中。

## 自动生成的文件

这些目录中的所有 Markdown 文件都是从 [脚本](/scripts) 生成的：

- `docs/api/`
- `docs/cli/commands/`
- `docs/native/`
