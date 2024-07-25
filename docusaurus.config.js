const path = require('path');
const prismic = require('@prismicio/client');
const fetch = require('node-fetch');
const { themes } = require('prism-react-renderer');

const HOSTNAME = 'capacitorjs.com';
const BASE_URL = '/docs';

module.exports = {
  title: 'Capacitor Documentation',
  tagline:
    'Capacitor is a cross-platform native runtime that makes it easy to build modern web apps that run natively on iOS, Android, and the Web.',
  url: `https://${HOSTNAME}`,
  baseUrl: `${BASE_URL}/`,
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    localeConfigs: {
      en: { label: 'English' },
    },
  },
  markdown: {
    format: 'detect'
  },
  onBrokenAnchors: 'throw',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/meta/favicon.png',
  organizationName: 'ionic-team',
  projectName: 'capacitor-docs',
  themeConfig: {
    announcementBar: {
      id: 'announcement-bar',
      content:
        '<a href="https://www.outsystems.com/?utm_source=ionic&utm_medium=referral&utm_campaign=ionic-referral&utm_term=none&utm_content=other&utm_campaignteam=digital-mktg&utm_partner=none" target="_blank" rel="noopener"><span>An <strong>OutSystems</strong> Company →</span></a>',
      isCloseable: false,
    },
    colorMode: {
      defaultMode: 'light',
    },
    logo: {
      alt: 'Site Logo',
      src: `/logos/capacitor-text-docs-light.png`,
      srcDark: `/logos/capacitor-text-docs-dark.png`,
      href: `https://${HOSTNAME}`,
      target: '_self',
      width: 130,
      height: 24,
      after: {
        html: `<a href="${BASE_URL}"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="14" fill="none"><path fill="#92A0B3" d="M4.53 13C8.69 13 11 10.52 11 6.96 11 3.42 8.7.93 4.53.93H.43V13h4.1Zm4.3-6.04c0 2.5-1.4 4.14-4.37 4.14H2.48V2.83h1.98c2.97 0 4.37 1.64 4.37 4.13Zm5.9 0c0-2.6 1.7-4.31 4.06-4.31 2.36 0 4.06 1.71 4.06 4.31 0 2.6-1.7 4.32-4.06 4.32-2.37 0-4.07-1.71-4.07-4.31Zm-2.18 0a6.06 6.06 0 0 0 6.24 6.3c3.67 0 6.24-2.7 6.24-6.3A6.06 6.06 0 0 0 18.79.67a6.06 6.06 0 0 0-6.24 6.3Zm14.01-.01c0 3.72 2.52 6.29 6.03 6.29 3 0 5.3-1.79 5.8-4.66h-2.2c-.4 1.7-1.78 2.69-3.6 2.69-2.4 0-3.85-1.72-3.85-4.32 0-2.6 1.44-4.3 3.85-4.3 1.82 0 3.2.98 3.6 2.68h2.2C37.9 2.46 35.6.67 32.6.67c-3.51 0-6.03 2.57-6.03 6.28Zm17.79 4.43c-1.63 0-2.5-.86-2.59-2.15h-2.04c.07 1.97 1.31 4 4.52 4 2.9 0 4.8-1.42 4.8-3.61 0-4.83-6.8-2.77-6.8-5.43 0-1.07.87-1.66 2.28-1.66 1.54 0 2.34.95 2.36 2.14h2.02c-.05-2.26-1.54-4-4.38-4-2.69 0-4.32 1.65-4.32 3.58 0 4.82 6.75 2.51 6.75 5.45 0 1.09-.95 1.69-2.6 1.69Z"/></svg></a>`,
      },
    },
    navbar: {
      hideOnScroll: true,
      items: [
        {
          type: 'doc',
          docId: 'index',
          label: 'Docs',
          position: 'left',
        },
        {
          type: 'doc',
          docId: 'plugins',
          label: 'Plugins',
          position: 'left',
        },
        {
          type: 'doc',
          docId: 'cli/index',
          label: 'CLI',
          position: 'left',
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          label: 'Community',
          position: 'right',
          items: [
            {
              href: 'https://ionicframework.com/community',
              label: 'Community Hub',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://forum.ionicframework.com/',
              label: 'Forum',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://ionic.io/blog/tag/capacitor',
              label: 'Blog',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://twitter.com/capacitorjs',
              label: 'Twitter',
              target: '_blank',
              rel: null,
            },
          ],
          className: 'navbar__link--community',
        },
        {
          label: 'Support',
          position: 'right',
          items: [
            {
              href: 'https://ionicframework.com/support',
              label: 'Help Center',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://ionic.zendesk.com/',
              label: 'Customer Support',
              target: '_blank',
              rel: null,
            },
            {
              href: 'https://ionicframework.com/advisory',
              label: 'Enterprise Advisory',
              target: '_blank',
              rel: null,
            },
          ],
          className: 'navbar__link--support',
        },
        {
          type: 'html',
          position: 'right',
          value: '<div class="separator" aria-hidden></div>',
        },
        {
          type: 'localeDropdown',
          position: 'right',
          dropdownItemsAfter: [
            {
              to: 'https://capacitorjs.jp/docs',
              label: '日本語',
              target: '_blank',
              rel: null,
            },
          ],
          className: 'icon-link language navbar__item',
        },
        {
          href: 'https://twitter.com/capacitorjs',
          position: 'right',
          className: 'icon-link icon-link-mask icon-link-twitter',
          'aria-label': 'Twitter',
          target: '_blank',
        },
        {
          href: 'https://ionic.link/discord',
          position: 'right',
          className: 'icon-link icon-link-mask icon-link-discord',
          'aria-label': 'Discord',
          target: '_blank',
        },
        {
          href: 'https://github.com/ionic-team/capacitor',
          position: 'right',
          className: 'icon-link icon-link-mask icon-link-github',
          'aria-label': 'GitHub repository',
          target: '_blank',
        },
      ],
    },
    sidebar: {
      versionDropdown: {},
      productDropdown: {
        title: 'Capacitor Docs',
        logo: {
          width: 20,
          height: 20,
          alt: 'Capacitor Logo',
          src: 'img/components/product-dropdown/logo-dark.png',
        },
        textLinks: [
          {
            url: {
              href: 'https://forum.ionicframework.com/c/capacitor/26',
              target: '_blank',
              rel: 'noopener nofollow',
            },
            label: 'Forum',
          },
        ],
        iconLinks: [
          {
            key: 'github',
            url: {
              href: 'https://github.com/ionic-team/capacitor',
              target: '_blank',
              rel: 'noopener nofollow',
            },
          },
          {
            key: 'twitter',
            url: {
              href: 'https://twitter.com/capacitorjs',
              target: '_blank',
              rel: 'noopener nofollow',
            },
          },
        ],
      },
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.dracula,
      // https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js
      additionalLanguages: [
        'json',
        'groovy',
        'ruby',
        'diff',
        'bash',
        'shell-session',
        'http',
        'swift',
        'java',
        'kotlin',
      ],
    },
    algolia: {
      appId: '3IVALO5OU4',
      apiKey: '5fdbbcbd186f2a1265494810dd0bf09c',
      indexName: 'capacitorjs',
      contextualSearch: true,
    },
  },
  plugins: [
    function (context, options) {
      return {
        name: 'ionic-docs-ads',
        async loadContent() {
          const repoName = 'ionicframeworkcom';
          const endpoint = prismic.getEndpoint(repoName);
          const client = prismic.createClient(endpoint, {
            fetch,
          });

          return await client.getByType('docs_ad');
        },
        async contentLoaded({ content, actions: { setGlobalData, addRoute } }) {
          return setGlobalData({ prismicAds: content.results });
        },
      };
    },
  ],
  presets: [
    [
      '@ionic-docs/preset-classic',
      /** @type {import('@ionic-docs/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: ({ versionDocsDirPath, docPath, locale }) => {
            if (locale != 'en') {
              return 'https://crowdin.com/project/capacitor-docs';
            }

            const cliRegex = /cli\/commands\/(.*)\.md/;
            const cliRegexPath = cliRegex.exec(docPath)?.[1];

            const nativeRegex = /native\/(.*)\.md/;
            const nativeRegexPath = nativeRegex.exec(docPath)?.[1];

            if (cliRegexPath) {
              return `https://github.com/ionic-team/capacitor-docs/edit/main/docs/cli/commands/${cliRegexPath.replace(
                '-',
                '/',
              )}.md`;
            }
            if (nativeRegexPath) {
              return `https://github.com/ionic-team/ionic-native/edit/master/src/@awesome-cordova-plugins/plugins/${nativeRegexPath}/index.ts`;
            }
            return `https://github.com/ionic-team/capacitor-docs/edit/main/${versionDocsDirPath}/${docPath}`;
          },
          breadcrumbs: false,
          exclude: ['README.md'],
          lastVersion: 'current',
          versions: {
            current: {
              label: 'v6',
            },
          },
        },
        googleTagManager: {
          containerId: 'GTM-TKMGCBC',
        },
        theme: {
          customCss: [require.resolve('./src/styles/custom.scss')],
        },
      }),
    ],
  ],
  customFields: {},
};
