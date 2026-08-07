// @ts-check
import fs from 'fs';
import fetch from 'node-fetch';

// @ts-ignore
const API_DIR = new URL('../docs/apis/', import.meta.url);

const tag = 'next';

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
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/action-sheet/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/action-sheet/src/definitions.ts',
  },
  {
    id: 'app',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/app/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/app/src/definitions.ts',
  },
  {
    id: 'app-launcher',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/app-launcher/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/app-launcher/src/definitions.ts',
  },
  {
    id: 'background-runner',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-background-runner/blob/main/packages/capacitor-plugin/README.md',
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
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/browser/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/browser/src/definitions.ts',
  },
  {
    id: 'calendar',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-calendar/blob/main/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-calendar/blob/main/src/definitions.ts',
    tag: 'latest',
  },
  {
    id: 'camera',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-camera/blob/next/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-camera/blob/next/src/definitions.ts',
  },
  {
    id: 'clipboard',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/clipboard/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/clipboard/src/definitions.ts',
  },
  {
    id: 'contacts',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-contacts/blob/main/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-contacts/blob/main/src/definitions.ts',
    tag: 'latest',
  },
  {
    id: 'cookies',
    isCore: true,
    isExperimental: false,
    npmScope: '@capacitor',
    description: 'The Capacitor Cookies API provides native cookie support via patching `document.cookie` to use native libraries.',
    editUrl: 'https://github.com/ionic-team/capacitor/blob/next/core/cookies.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor/blob/next/core/src/core-plugins.ts',
  },
  {
    id: 'device',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/device/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/device/src/definitions.ts',
  },
  {
    id: 'dialog',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/dialog/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/dialog/src/definitions.ts',
  },
  {
    id: 'filesystem',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-filesystem/blob/next/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-filesystem/blob/next/src/definitions.ts',
  },
  {
    id: 'file-transfer',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-file-transfer/blob/main/packages/capacitor-plugin/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-file-transfer/blob/main/packages/capacitor-plugin/src/definitions.ts',
    tag: 'latest',
  },
  {
    id: 'file-viewer',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-file-viewer/blob/next/packages/capacitor-plugin/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-file-viewer/blob/next/packages/capacitor-plugin/src/definitions.ts',
  },
  {
    id: 'geolocation',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    description: 'The Geolocation API provides simple methods for getting and tracking the current position of the device using GPS, along with altitude, heading, and speed information if available.',
    editUrl: 'https://github.com/ionic-team/capacitor-geolocation/blob/next/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-geolocation/blob/next/src/definitions.ts',
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
    editUrl: 'https://github.com/ionic-team/capacitor-haptics/blob/next/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-haptics/blob/next/src/definitions.ts',
  },
  {
    id: 'http',
    isCore: true,
    isExperimental: false,
    npmScope: '@capacitor',
    description: 'The Capacitor Http API provides native http support via patching `fetch` and `XMLHttpRequest` to use native libraries.',
    editUrl: 'https://github.com/ionic-team/capacitor/blob/next/core/http.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor/blob/next/core/src/core-plugins.ts',
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
    editUrl: 'https://github.com/ionic-team/capacitor-keyboard/blob/next/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-keyboard/blob/next/src/definitions.ts',
  },
  {
    id: 'local-notifications',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/local-notifications/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/local-notifications/src/definitions.ts',
  },
  {
    id: 'motion',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/motion/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/motion/src/definitions.ts',
  },
  {
    id: 'network',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/network/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/network/src/definitions.ts',
  },
  {
    id: 'preferences',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/preferences/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/preferences/src/definitions.ts',
  },
  {
    id: 'privacy-screen',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-privacy-screen/blob/main/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-privacy-screen/blob/main/src/definitions.ts',
    tag: 'latest',
  },
  {
    id: 'push-notifications',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/push-notifications/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/push-notifications/src/definitions.ts',
  },
  {
    id: 'screen-orientation',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/screen-orientation/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/screen-orientation/src/definitions.ts',
  },
  {
    id: 'screen-reader',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/screen-reader/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/screen-reader/src/definitions.ts',
  },
  {
    id: 'share',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/share/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/share/src/definitions.ts',
  },
  {
    id: 'splash-screen',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/splash-screen/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/splash-screen/src/definitions.ts',
  },
  {
    id: 'status-bar',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/status-bar/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/status-bar/src/definitions.ts',
  },
    {
    id: 'system-bars',
    isCore: true,
    isExperimental: false,
    npmScope: '@capacitor',
    description: 'The System Bars API provides methods for configuring the style and visibility of the device System Bars / Status Bar.',
    editUrl: 'https://github.com/ionic-team/capacitor/blob/next/core/system-bars.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor/blob/next/core/src/core-plugins.ts',
  },
  {
    id: 'text-zoom',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/text-zoom/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/text-zoom/src/definitions.ts',
  },
  {
    id: 'toast',
    isCore: false,
    isExperimental: false,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/toast/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-plugins/blob/next/toast/src/definitions.ts',
  },
  {
    id: 'local-llm',
    title: "Local LLM",
    isCore: false,
    isExperimental: true,
    npmScope: '@capacitor',
    editUrl: 'https://github.com/ionic-team/capacitor-local-llm/blob/main/README.md',
    editApiUrl: 'https://github.com/ionic-team/capacitor-local-llm/blob/main/src/definitions.ts',
    tag: 'latest',
  }
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
