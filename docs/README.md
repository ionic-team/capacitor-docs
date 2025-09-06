# Docs 文件夹

`/docs` 文件夹存放所有 Markdown 文件。页面结构与网站上的路由大致对应，因为路径可以通过 frontmatter 进行修改。

## 版本控制

该文件夹还可以包含组件、资源以及其他在运行 docusaurus 版本控制脚本时需要版本化的内容。例如，如果某个页面组件仅适用于当前 Ionic 版本的 `layout` 部分，可以将其添加到 `docs/layout/` 下的 `_components/` 文件夹中。当版本控制脚本运行时，该组件将被复制到 `versioned_docs/verion-{X}/layout/_components/`，并且在 `docs/layout/_components/` 中可以删除或更新为最新版本的独立组件。同样的概念适用于图片和其他文件。

如果组件需要跨版本共享，可以将其放在 `src/components/` 中。如果图片和其他服务文件需要跨版本共享，可以将其放在 `static/` 中。

## 自动生成的文件

以下目录中的所有 Markdown 文件均由[脚本](/scripts)自动生成：

- `docs/api/`
- `docs/cli/commands/`
- `docs/native/`