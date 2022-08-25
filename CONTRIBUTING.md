# Contributing Guide

Thanks for your interest in contributing to Capacitor's documentation! :tada: Check the guidelines below for suggestions and requirements before submitting your contribution.

- [Contributing Guide](#contributing-guide)
  - [Development Workflow](#development-workflow)
  - [Using VS Code on Windows](#using-vs-code-on-windows)
  - [Project Structure](#project-structure)
    - [Directories](#directories)
  - [Authoring Content](#authoring-content)
    - [Authoring Locally](#authoring-locally)
  - [Reporting Issues](#reporting-issues)
  - [Pull Request Guidelines](#pull-request-guidelines)
  - [Deploying](#deploying)
  - [License](#license)

---

## Development Workflow

In order to run the documentation locally, install the dependencies and run the development server:

```sh
$ npm install
$ npm start
```

> **Note**: recent versions of npm (8+) and Node.js (16+) are required to run certain scripts.

---

## Using VS Code on Windows

The Capacitor docs were originally built in a Mac-based environment, so Mac-focused linting rules apply when committing changes. To contribute on Windows, do the following:

- Configure VS Code to read/save files using line breaks (LF) instead of carriage returns (CRLF). Set it globally by navigating to: Settings -> Text Editor -> Files -> Eol. Set to `\n`.
- Check that the Git setting `core.autocrlf` is set to `false`: run `git config -l | grep autocrlf`. Switch it to false using: `git config --global core.autocrlf false`.
- If you've already cloned the `capacitor-docs` repo, the files may already be cached as LF. To undo this, you need to clean the cache files of the repository. Run the following (make sure you stage or commit your changes first): `git rm --cached -r .` then `git reset --hard`.

## Project Structure

Capacitor's documentation is built using [Docusaurus](https://docusaurus.io/). The content is either written or generated as Markdown.

### Directories

- `scripts/` - build scripts used to generate markdown or json files
- `src/` - source code and content of the docs
  - `components/` - components used across the site
    - `global/` - components used globally
    - `page/` - components used on a single page or in a limited scope
  - `styles/` - global styles and variables
    - `components/` - styles split out into the components they target
- `static/` - static images
- `versioned_docs/` - versions of the docs created by the docusaurus versioning command
- `versioned_sitebars/` - versions of the docs sidebars created by the docusaurus versioning command

## Authoring Content

The content of the Capacitor docs is written as [Markdown](https://commonmark.org/) in `docs/`. Each Markdown file corresponds to a route unless explicitly changed in the frontmatter.

You can make copy edits to the site by [editing the Markdown files directly on GitHub](https://help.github.com/articles/editing-files-in-another-user-s-repository/). In your pull request, please explain what was missing from or inaccurate about the content.

### Reference Content

The Markdown in `docs/` does not only contain manually written markdown files:

- Paths matching `/docs/apis/*` are built from the [Capacitor Plugins](https://github.com/ionic-team/capacitor-plugins) source code


## Reporting Issues

Before submitting an issue to the Capacitor docs repo, please search [existing issues](https://github.com/ionic-team/capacitor-docs/issues) to avoid duplicate reports.

If the issue you're reporting is a bug, please be sure it is an issue with the Capacitor docs themselves and not the subject of the documentation. With your report, please provide:

- Steps to reproduce
- Expected behavior
- OS and browser versions
- If possible, a demo repo or CodePen/CodeSandbox

> **Note**: Some [reference content](#reference-content) is pulled from other Capacitor repos. In that case, please submit your issue on the docs repo with a link to the repo where the content lives.

---

## Pull Request Guidelines

When submitting pull requests, please keep the scope of your change contained to a single feature or bug. When in doubt, err on the side of smaller pull requests. If your pull request is a new feature, we would recommend opening an issue first to come to an agreement about the feature before putting in significant time.

---

## Deploying

The Capacitor documentation's `main` branch is deployed automatically and separately from the [Capacitor site](https://github.com/ionic-team/capacitor-site) itself. The Capacitor site then uses a proxy for paths under `/docs` to request the deployed documentation.

---

## License

This repo is licensed and managed separately from Capacitor itself.

By contributing to this repo, you agree to have your contributions licensed under the Apache 2.0 license. See [LICENSE](../LICENSE) for the full license text.
