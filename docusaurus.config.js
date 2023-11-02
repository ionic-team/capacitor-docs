const path = require('path');
const prismic = require('@prismicio/client');
const fetch = require('node-fetch');

const BASE_URL = '/docs';

module.exports = {
  title: 'Capacitor Documentation',
  tagline:
    'Capacitor is a cross-platform native runtime that makes it easy to build modern web apps that run natively on iOS, Android, and the Web.',
  url: 'https://capacitorjs.com',
  baseUrl: `${BASE_URL}/`,
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    localeConfigs: {
      en: { label: 'English' },
    },
  },
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/meta/favicon.png',
  organizationName: 'ionic-team',
  projectName: 'capacitor-docs',
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
    },
    navbar: {
      hideOnScroll: true,
      logo: {
        alt: 'Site Logo',
        src: `/logos/capacitor-text-docs-light.svg`,
        srcDark: `/logos/capacitor-text-docs-dark.svg`,
        href: 'https://capacitorjs.com',
        target: '_self',
        width: 200,
        height: 24,
      },
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
          type: 'docsVersionDropdown',
          position: 'right',
          // dropdownItemsAfter: [{to: '/versions', label: 'All versions'}],
          dropdownActiveClassDisabled: true,
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
              to: 'https://capacitorjs.jp/',
              label: 'Translate',
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
    tagManager: {
      trackingID: 'GTM-TKMGCBC',
    },
    prism: {
      theme: { plain: {}, styles: [] },
      // https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js
      additionalLanguages: ['shell-session', 'http', 'swift', 'java', 'kotlin'],
    },
    algolia: {
      appId: '3IVALO5OU4',
      apiKey: '5fdbbcbd186f2a1265494810dd0bf09c',
      indexName: 'capacitorjs',
      contextualSearch: true,
    },
  },
  plugins: [
    [
      'docusaurus-plugin-module-alias',
      {
        alias: {
          'styled-components': path.resolve(__dirname, './node_modules/styled-components'),
          react: path.resolve(__dirname, './node_modules/react'),
          'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
          '@components': path.resolve(__dirname, './src/components'),
        },
      },
    ],
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
    function (_, { id, ...options }) {
      return {
        name: 'docusaurus-plugin-sass-builtin',
        configureWebpack(_, isServer, utils) {
          const { getStyleLoaders } = utils;
          const isProd = process.env.NODE_ENV === 'production';
          return {
            module: {
              rules: [
                {
                  test: /\.s[ca]ss$/,
                  oneOf: [
                    {
                      test: /\.module\.s[ca]ss$/,
                      use: [
                        ...getStyleLoaders(isServer, {
                          modules: {
                            localIdentName: isProd ? `[local]_[hash:base64:4]` : `[local]_[path][name]`,
                            exportOnlyLocals: isServer,
                          },
                          importLoaders: 2,
                          sourceMap: !isProd,
                        }),
                        {
                          loader: 'sass-loader',
                          options: options || {},
                        },
                      ],
                    },
                    {
                      use: [
                        ...getStyleLoaders(isServer),
                        {
                          loader: 'sass-loader',
                          options: options || {},
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          };
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
            if ((match = docPath.match(/apis\/(.*)\.md/)) != null) {
              if (match[1] === 'cookies' || match[1] === 'http') {
                return `https://github.com/ionic-team/capacitor-docs/edit/main/docs/apis/${match[1]}.md`;
              }
              return `https://github.com/ionic-team/capacitor-plugins/edit/main/${match[1]}/README.md`;
            }
            if ((match = docPath.match(/cli\/commands\/(.*)\.md/)) != null) {
              return `https://github.com/ionic-team/capacitor-docs/edit/main/docs/cli/commands/${match[1].replace(
                '-',
                '/',
              )}.md`;
            }
            if ((match = docPath.match(/native\/(.*)\.md/)) != null) {
              return `https://github.com/ionic-team/ionic-native/edit/master/src/@awesome-cordova-plugins/plugins/${match[1]}/index.ts`;
            }
            return `https://github.com/ionic-team/capacitor-docs/edit/main/${versionDocsDirPath}/${docPath}`;
          },
          exclude: ['README.md'],
          lastVersion: 'v5',
          versions: {
            current: {
              label: 'v6',
              banner: 'unreleased',
            },
          },
        },
        theme: {
          customCss: [require.resolve('./src/styles/custom.scss')],
        },
      }),
    ],
  ],
  customFields: {},
};
