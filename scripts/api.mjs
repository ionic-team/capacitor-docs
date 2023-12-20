// @ts-check
import path from 'path';
import fs from 'fs';
import fetch from 'node-fetch';

// @ts-ignore
const API_DIR = new URL('../docs/apis/', import.meta.url);

const tag = 'next';

/**
 * @typedef {Object} PluginApi
 * @property {string} id
 * @property {boolean} isExperimental
 * @property {string} npmScope
 * @property {string} editUrl
 * @property {string} editApiUrl
 * @property {string} [tag]
 */
const pluginApis = [
  {
    id: 'action-sheet',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/action-sheet/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/action-sheet/src/definitions.ts',
  },
  {
    id: 'app',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/app/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/app/src/definitions.ts',
  },
  {
    id: 'app-launcher',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/app-launcher/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/app-launcher/src/definitions.ts',
  },
  {
    id: 'background-runner',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-background-runner/blob/main/README.md',
    editApiUrl:
      'https://github.com/ionic-team/capacitor-background-runner/blob/main/packages/capacitor-plugin/src/definitions.ts',
    tag: 'latest',
  },
  {
    id: 'browser',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/browser/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/browser/src/definitions.ts',
  },
  {
    id: 'camera',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/camera/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/camera/src/definitions.ts',
  },
  {
    id: 'clipboard',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/clipboard/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/clipboard/src/definitions.ts',
  },
  {
    id: 'device',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/device/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/device/src/definitions.ts',
  },
  {
    id: 'dialog',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/dialog/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/dialog/src/definitions.ts',
  },
  {
    id: 'filesystem',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/filesystem/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/filesystem/src/definitions.ts',
  },
  {
    id: 'geolocation',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/geolocation/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/geolocation/src/definitions.ts',
  },
  {
    id: 'google-maps',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/google-maps/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/google-maps/src/definitions.ts',
  },
  {
    id: 'haptics',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/haptics/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/haptics/src/definitions.ts',
  },
  {
    id: 'keyboard',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/keyboard/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/keyboard/src/definitions.ts',
  },
  {
    id: 'local-notifications',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/local-notifications/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/local-notifications/src/definitions.ts',
  },
  {
    id: 'motion',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/motion/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/motion/src/definitions.ts',
  },
  {
    id: 'network',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/network/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/network/src/definitions.ts',
  },
  {
    id: 'preferences',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/preferences/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/preferences/src/definitions.ts',
  },
  {
    id: 'push-notifications',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/push-notifications/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/push-notifications/src/definitions.ts',
  },
  {
    id: 'screen-orientation',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/screen-orientation/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/screen-orientation/src/definitions.ts',
  },
  {
    id: 'screen-reader',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/screen-reader/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/screen-reader/src/definitions.ts',
  },
  {
    id: 'share',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/share/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/share/src/definitions.ts',
  },
  {
    id: 'splash-screen',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/splash-screen/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/splash-screen/src/definitions.ts',
  },
  {
    id: 'status-bar',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/status-bar/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/status-bar/src/definitions.ts',
  },
  {
    id: 'text-zoom',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/text-zoom/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/text-zoom/src/definitions.ts',
  },
  {
    id: 'toast',
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/toast/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/toast/src/definitions.ts',
  },
  {
    id: 'watch',
    isExperimental: true,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/CapacitorWatch/blob/main/README.md',
    editApiUrl: 'https://github.com/ionic-team/CapacitorWatch/blob/main/packages/capacitor-plugin/src/definitions.ts',
    tag: 'latest',
  },
];

/**
 * @param {PluginApi} plugin
 */
async function buildPluginApiDocs(plugin) {
  const [readme, pkgJson] = await Promise.all([getReadme(plugin), getPkgJsonData(plugin)]);

  const apiContent = createApiPage(plugin, readme, pkgJson);
  const fileName = `${plugin.id}.md`;
  const filePath = new URL(fileName, API_DIR);
  fs.writeFileSync(filePath, apiContent);
}

/**
 * @param {PluginApi} plugin
 * @param {string} readme
 * @param {any} pkgJson
 * @returns {string}
 */
function createApiPage(plugin, readme, pkgJson) {
  const title = `${toTitleCase(plugin.id)} Capacitor Plugin API`;
  const desc = pkgJson.description ? pkgJson.description.replace(/\n/g, ' ') : title;
  const editUrl = plugin.editUrl;
  const editApiUrl = plugin.editApiUrl;
  const sidebarLabel = toTitleCase(plugin.id);

  // escape right curly brace in inline code blocks for MDX v3 compatability
  const regexp = /[<|(&lt;)]code>(.*)[<|(&lt;)]\/code>/g;

  readme = readme.replace(regexp, (result) => {
    return result.replace(/\{/g, '&#123;');
  });

  // @ts-ignore
  readme = readme
    .replaceAll(/<!--.*-->/g, '') // removes JSDoc HTML comments as they break docusauurs
    .replaceAll('<->', '&lt;->'); // escape arrow for MDX v3. note: can't escape all arrows due to component tags

  return `
---
title: ${title}
description: ${desc}
editUrl: ${editUrl}
editApiUrl: ${editApiUrl}
sidebar_label: ${sidebarLabel}${plugin.isExperimental ? ' 🧪' : ''}
---

${readme}`.trim();
}

/**
 * @param {PluginApi} plugin
 * @returns {Promise<string>}
 */
async function getReadme(plugin) {
  const url = `https://cdn.jsdelivr.net/npm/${plugin.npmScope}/${plugin.id}@${plugin.tag ?? tag}/README.md`;
  const rsp = await fetch(url);
  return rsp.text();
}

/**
 * @param {PluginApi} plugin
 * @returns {Promise<any>}
 */
async function getPkgJsonData(plugin) {
  const url = `https://cdn.jsdelivr.net/npm/${plugin.npmScope}/${plugin.id}@${plugin.tag ?? tag}/package.json`;
  const rsp = await fetch(url);
  return rsp.json();
}

async function main() {
  await Promise.all(pluginApis.map(buildPluginApiDocs));
  console.log(`Plugin API Files Updated 🎸`);
}

/**
 * @param {string} str
 * @returns {string}
 */
function toTitleCase(str) {
  return str.replace(/(^\w|-\w)/g, (s) => {
    return s.replace(/-/, ' ').toUpperCase();
  });
}

main();
