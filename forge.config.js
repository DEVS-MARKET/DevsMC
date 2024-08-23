const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
    name: 'DevsMC',
    productName: 'DevsMC',
    icon: __dirname + '/icons/icon',
    appCategoryType: 'public.app-category.games',
  },
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'DEVS-MARKET',
          name: 'DevsMC',
        },
        prerelease: true,
      },
    }
  ],
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        authors: 'Krzysztof Haller & DevsMarket',
        description: 'DevsMC - A free and open-source Minecraft launcher.',
        iconUrl: 'https://cdn.khaller.com/devsmarket/devsmc/icon.ico',
        setupIcon: __dirname + '/icons/icon.ico',
        loadingGif: __dirname + '/icons/loading.gif',
        copyright: 'DevsMarket',
        name: 'DevsMC',
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['linux'],
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        icon: __dirname + '/icons/icon.icns',
        name: 'DevsMC',
      },
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: 'Krzysztof Haller & DevsMarket',
          homepage: 'https://devsmarket.eu/devsmc',
          icon: __dirname + '/icons/icon.png',
        }
      },
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-vite',
      config: {
        // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
        // If you are familiar with Vite configuration, it will look really familiar.
        build: [
          {
            // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
            entry: 'src/main.js',
            config: 'vite.main.config.mjs',
          },
          {
            entry: 'src/preload.js',
            config: 'vite.preload.config.mjs',
          },
        ],
        renderer: [
          {
            name: 'main_window',
            config: 'vite.renderer.config.mjs',
          },
        ],
      },
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
