---
title: Running Scripts
description: Visual Studio Code Extension for Capacitor
contributors:
  - dtarnawsky
slug: /vscode/run-scripts
---

Your `package.json` contains scripts to run tests, linting, building etc. Run these with the extension to get support for error assistance which will show where in code the error occurred.

## Running Scripts

- Click `Scripts` to expand which scripts can be run.
- Click one of the scripts

Output from the script will be displayed in the `OUTPUT` window (you may need to select `Ionic` from the drop down menu).

If there is an error in your unit test, E2E test, a lint error or a syntax error the extension will display the error and open the file that caused the error at the particular line number.

:::note
Scripts are just commands you have defined in `package.json` that can be run at the command line via `npm run [name]`. It is useful to learn this technique to simplify building and testing your application.
:::