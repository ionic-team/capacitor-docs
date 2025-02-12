// @ts-check
import fs from 'fs';
import fetch from 'node-fetch';

// @ts-ignore
const API_DIR = new URL('../docs/apis/', import.meta.url);

const tag = 'latest';

/**
 * @typedef {Object} PluginApi
 * @property {string} id
 * @property {string} [title]
 * @property {boolean} isCore
 * @property {boolean} isExperimental
 * @property {string} npmScope
 * @property {string} [description]
 * @property {string} editUrl
 * @property {string} editApiUrl
 * @property {string} [tag]
 */
const pluginApis = [
  {
    id: 'action-sheet',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/action-sheet/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/action-sheet/src/definitions.ts',
  },
  {
    id: 'app',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/app/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/app/src/definitions.ts',
  },
  {
    id: 'app-launcher',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/app-launcher/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/app-launcher/src/definitions.ts',
  },
  {
    id: 'background-runner',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-background-runner/blob/main/README.md',
    editApiUrl:
      'https://github.com/ionic-team/capacitor-background-runner/blob/main/packages/capacitor-plugin/src/definitions.ts',
    tag: 'latest',
  },
  {
    id: 'barcode-scanner',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-barcode-scanner/blob/main/plugin/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-barcode-scanner/blob/main/plugin/src/definitions.ts',
    tag: 'latest',
  },
  {
    id: 'browser',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/browser/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/browser/src/definitions.ts',
  },
  {
    id: 'camera',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/camera/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/camera/src/definitions.ts',
  },
  {
    id: 'clipboard',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/clipboard/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/clipboard/src/definitions.ts',
  },
  {
    id: 'cookies',
    isCore: true,
    isExperimental: false,
    npmScope: '@capacitor',
    description: 'The Capacitor Cookies API provides native cookie support via patching `document.cookie` to use native libraries.',
    editUrl: 'https://github.com/ionic-team/capacitor/blob/main/core/cookies.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor/blob/main/core/src/core-plugins.ts',
  },
  {
    id: 'device',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/device/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/device/src/definitions.ts',
  },
  {
    id: 'dialog',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/dialog/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/dialog/src/definitions.ts',
  },
  {
    id: 'filesystem',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/filesystem/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/filesystem/src/definitions.ts',
  },
  {
    id: 'geolocation',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    description: 'The Geolocation API provides simple methods for getting and tracking the current position of the device using GPS, along with altitude, heading, and speed information if available.',
    editUrl: 'https://github.com/ionic-team/capacitor-geolocation/blob/main/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-geolocation/blob/main/packages/capacitor-plugin/src/definitions.ts',
    tag: 'latest'
  },
  {
    id: 'google-maps',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-google-maps/blob/main/plugin/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-google-maps/blob/main/plugin/src/definitions.ts',
    tag: 'latest',
  },
  {
    id: 'haptics',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/haptics/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/haptics/src/definitions.ts',
  },
  {
    id: 'http',
    isCore: true,
    isExperimental: false,
    npmScope: '@capacitor',
    description: 'The Capacitor Http API provides native http support via patching `fetch` and `XMLHttpRequest` to use native libraries.',
    editUrl: 'https://github.com/ionic-team/capacitor/blob/main/core/http.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor/blob/main/core/src/core-plugins.ts',
  },
  {
    id: 'inappbrowser',
    title: 'InAppBrowser',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-os-inappbrowser/blob/main/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-os-inappbrowser/blob/main/src/definitions.ts',
    tag: 'latest',
  },
  {
    id: 'keyboard',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/keyboard/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/keyboard/src/definitions.ts',
  },
  {
    id: 'local-notifications',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/local-notifications/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/local-notifications/src/definitions.ts',
  },
  {
    id: 'motion',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/motion/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/motion/src/definitions.ts',
  },
  {
    id: 'network',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/network/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/network/src/definitions.ts',
  },
  {
    id: 'preferences',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/preferences/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/preferences/src/definitions.ts',
  },
  {
    id: 'privacy-screen',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-privacy-screen/blob/main/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-privacy-screen/blob/main/src/definitions.ts',
  },
  {
    id: 'push-notifications',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/push-notifications/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/push-notifications/src/definitions.ts',
  },
  {
    id: 'screen-orientation',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/screen-orientation/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/screen-orientation/src/definitions.ts',
  },
  {
    id: 'screen-reader',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/screen-reader/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/screen-reader/src/definitions.ts',
  },
  {
    id: 'share',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/share/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/share/src/definitions.ts',
  },
  {
    id: 'splash-screen',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/splash-screen/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/splash-screen/src/definitions.ts',
  },
  {
    id: 'status-bar',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/status-bar/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/status-bar/src/definitions.ts',
  },
  {
    id: 'text-zoom',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/text-zoom/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/text-zoom/src/definitions.ts',
  },
  {
    id: 'toast',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/toast/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/main/toast/src/definitions.ts',
  },
  {
    id: 'watch',
    isCore: false,
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
  const title = `${plugin.title ?? toTitleCase(plugin.id)} Capacitor Plugin API`;
  const desc = plugin.description ? plugin.description : pkgJson.description ? pkgJson.description.replace(/\n/g, ' ') : title;
  const editUrl = plugin.editUrl;
  const editApiUrl = plugin.editApiUrl;
  const sidebarLabel = plugin.title ?? toTitleCase(plugin.id);
  return `
---
title: ${title}
description: ${desc}
custom_edit_url: ${editUrl}
editApiUrl: ${editApiUrl}
sidebar_label: ${sidebarLabel}${plugin.isExperimental ? ' 🧪' : ''}
---

${readme}`.trim();
}

async function invalidateJSDELIVRCache(url) {
  const rsp = await fetch(url.replace('cdn', 'purge'), { method: 'GET' });
  let err = null;
  let rspData = null;
  try {
    rspData = await rsp.json();
  } catch (e) {
    err = e;
  }
  // @ts-ignore
  if (err !== null || rspData.status !== 'finished') {
    console.error(err);
    throw new Error("Failed to invalidate JSDELIVR cache for " + url);
  }
}

/**
 * @param {PluginApi} plugin
 * @returns {Promise<string>}
 */
async function getReadme(plugin) {
  const url = `https://cdn.jsdelivr.net/npm/${plugin.npmScope}/${!plugin.isCore ? plugin.id : 'core'}@${plugin.tag ?? tag}/${plugin.isCore ? `${plugin.id}.md` : 'README.md'}`;
  await invalidateJSDELIVRCache(url);
  const rsp = await fetch(url);
  return rsp.text();
}

/**
 * @param {PluginApi} plugin
 * @returns {Promise<any>}
 */
async function getPkgJsonData(plugin) {
  const url = `https://cdn.jsdelivr.net/npm/${plugin.npmScope}/${!plugin.isCore ? plugin.id : 'core'}@${plugin.tag ?? tag}/package.json`;
  await invalidateJSDELIVRCache(url);
  const rsp = await fetch(url);
  return rsp.json();
}

async function main() {
  console.log("Updating Plugin API Files...");
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
