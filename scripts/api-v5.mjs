import path from 'path';
import fs from 'fs';
import fetch from 'node-fetch';

const API_DIR = new URL('../versioned_docs/version-v5/apis/', import.meta.url);

const tag = 'latest';

const pluginApis = [
  'action-sheet',
  'app',
  'app-launcher',
  {
    id: 'background-runner',
    editUrl: 'https://github.com/ionic-team/capacitor-background-runner/blob/main/README.md',
    editApiUrl:
      'https://github.com/ionic-team/capacitor-background-runner/blob/main/packages/capacitor-plugin/src/definitions.ts',
  },
  'browser',
  'camera',
  'clipboard',
  'device',
  'dialog',
  'filesystem',
  'geolocation',
  'google-maps',
  'haptics',
  'keyboard',
  'local-notifications',
  'motion',
  'network',
  'preferences',
  'push-notifications',
  'screen-orientation',
  'screen-reader',
  'share',
  'splash-screen',
  'status-bar',
  'text-zoom',
  'toast',
  {
    id: 'watch',
    isExperimental: true,
    editUrl: 'https://github.com/ionic-team/CapacitorWatch/blob/main/README.md',
    editApiUrl: 'https://github.com/ionic-team/CapacitorWatch/blob/main/packages/capacitor-plugin/src/definitions.ts',
  },
];

const isString = value => typeof value === 'string' || value instanceof String;

async function buildPluginApiDocs(plugin) {
  const pluginId = isString(plugin) ? plugin : plugin.id;
  const [readme, pkgJson] = await Promise.all([getReadme(pluginId), getPkgJsonData(pluginId)]);

  const apiContent = createApiPage(plugin, readme, pkgJson);
  const fileName = `${pluginId}.md`;
  const filePath = new URL(fileName, API_DIR);
  fs.writeFileSync(filePath, apiContent);
}

function createApiPage(plugin, readme, pkgJson) {
  const pluginId = isString(plugin) ? plugin : plugin.id;
  const title = `${toTitleCase(pluginId)} Capacitor Plugin API`;
  const desc = pkgJson.description ? pkgJson.description.replace(/\n/g, ' ') : title;
  const editUrl = isString(plugin) ?
    `https://github.com/ionic-team/capacitor-plugins/blob/5.x/${pluginId}/README.md` :
    plugin.editUrl;
  const editApiUrl = isString(plugin) ?
    `https://github.com/ionic-team/capacitor-plugins/blob/5.x/${pluginId}/src/definitions.ts` :
    plugin.editApiUrl;
  const sidebarLabel = toTitleCase(pluginId);

  // removes JSDoc HTML comments as they break docusauurs
  readme = readme.replaceAll(/<!--.*-->/g, '');

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

async function getReadme(pluginId) {
  const url = `https://cdn.jsdelivr.net/npm/@capacitor/${pluginId}@${tag}/README.md`;
  const rsp = await fetch(url);
  return rsp.text();
}

async function getPkgJsonData(pluginId) {
  const url = `https://cdn.jsdelivr.net/npm/@capacitor/${pluginId}@${tag}/package.json`;
  const rsp = await fetch(url);
  return rsp.json();
}

async function main() {
  await Promise.all(pluginApis.map(buildPluginApiDocs));
  console.log(`Plugin API Files Updated 🎸`);
}

function toTitleCase(str) {
  return str.replace(/(^\w|-\w)/g, (s) => {
    return s.replace(/-/, ' ').toUpperCase();
  });
}

main();
