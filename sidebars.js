module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'index',
        'main/getting-started/environment-setup',
        'main/getting-started/installation',
        'main/getting-started/with-ionic',
        'main/getting-started/vscode-extension',
        'main/getting-started/templates'
      ],
    },
    {
      type: 'category',
      label: 'Basics',
      collapsed: false,
      items: [
        'main/basics/workflow',
        'main/basics/using-plugins',
        'main/basics/configuring-your-app',
        'main/basics/utilities',
      ],
    },
    {
      type: 'category',
      label: 'Upgrade Guides',
      collapsed: false,
      items: [
        'main/updating/3-0',
        'main/updating/2-0',
        'main/updating/1-1',
        'main/updating/plugins/3-0'
      ],
    },
    {
      type: 'category',
      label: 'Cordova/PhoneGap',
      collapsed: false,
      items: [
        'main/cordova/index',
        'main/cordova/migration-strategy',
        'main/cordova/migrating-from-cordova-to-capacitor',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      collapsed: false,
      items: [
        'main/guides/ads',
        'main/guides/angular',
        'main/guides/automated-configuration',
        'main/guides/ci-cd',
        'main/guides/deep-links',
        'main/guides/deploying-updates',
        'main/guides/environment-specific-configurations',
        'main/guides/in-app-purchases',
        'main/guides/live-reload',
        'main/guides/mocking-plugins',
        'main/guides/push-notifications-firebase',
        'main/guides/react-hooks',
        'main/guides/screen-orientation',
        'main/guides/security',
        'main/guides/splash-screens-and-icons',
        'main/guides/storage',
        'main/guides/community',
      ],
    },
    {
      type: 'category',
      label: 'iOS',
      collapsed: false,
      items: [
        'main/ios/index',
        'main/ios/configuration',
        'main/ios/custom-code',
        'main/ios/deploying-to-app-store',
        'main/ios/viewcontroller',
        'main/ios/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Android',
      collapsed: false,
      items: [
        'main/android/index',
        'main/android/configuration',
        'main/android/custom-code',
        'main/android/deploying-to-google-play',
        'main/android/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Web/PWA',
      collapsed: false,
      items: [
        'main/web/index',
        'main/web/progressive-web-apps',
        'main/web/pwa-elements'
      ],
    },
    {
      type: 'category',
      label: 'Deployment',
      collapsed: false,
      items: [
        'main/deployment/app-store',
        'main/deployment/play-store',
        'main/deployment/progressive-web-app',
        'main/deployment/desktop-app',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items: [
        'main/reference/config',
        'main/reference/core-apis/ios',
        'main/reference/core-apis/android',
        'main/reference/core-apis/web',
        {
          type: 'link',
          label: 'Plugin APIs',
          href: '/docs/apis',
        },
        {
          type: 'link',
          label: 'CLI',
          href: '/docs/cli',
        },
      ],
    },
  ],

  api: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'plugins',
        'plugins/overview/official',
        'plugins/overview/community',
        'plugins/overview/cordova',
        'plugins/overview/enterprise'
      ],
    },
    {
      type: 'category',
      label: 'APIs - TODO. AUTOGENERATE THESE',
      collapsed: false,
      items: ['plugins',],
    },
    {
      type: 'category',
      label: 'Creating Plugins',
      collapsed: false,
      items: [
        'plugins/creating-plugins/overview',
        'plugins/creating-plugins/development-workflow',
        'plugins/creating-plugins/ios-guide',
        'plugins/creating-plugins/android-guide',
        'plugins/creating-plugins/web-guide',
        'plugins/creating-plugins/method-types',
        'plugins/creating-plugins/configuration-values',
      ],
    },
    {
      type: 'category',
      label: 'Plugin Tutorial',
      collapsed: false,
      items: [
        'plugins/tutorial/getting-started',
        'plugins/tutorial/designing-api',
        'plugins/tutorial/using-api',
        'plugins/tutorial/code-abstraction',
        'plugins/tutorial/implementing-for-web',
        'plugins/tutorial/implementing-for-ios',
        'plugins/tutorial/implementing-for-android',
        'plugins/tutorial/packaging',
      ],
    }
  ],

  cli: [
    {
      type: 'category',
      label: 'CLI Documentation',
      collapsed: false,
      items: [
        'cli',
        'cli/configuration',
        'cli/livereload',
        'cli/using-a-proxy',
        {
          type: 'link',
          label: 'Changelog',
          href: 'https://github.com/ionic-team/ionic-cli/blob/develop/packages/@ionic/cli/CHANGELOG.md',
        },
      ],
    },
    {
      type: 'category',
      label: 'Command Reference',
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'cli/commands', // Generate section automatically based on files
        },
      ],
    },
  ],

  native: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'native',
        'native-community',
        'native-faq',
        {
          type: 'link',
          label: 'Community vs. Enterprise',
          href: 'https://ionic.io/docs/premier-plugins',
        },
      ],
    },
    {
      type: 'category',
      label: 'Plugins',
      collapsed: false,
      items: [
        {
          type: 'autogenerated',
          dirName: 'native', // Generate section automatically based on files
        },
      ],
    },
  ],
};
