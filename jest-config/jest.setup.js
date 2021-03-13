import { Nuxt, Builder } from 'nuxt';
import nuxtConfig from '../nuxt.config.js';

const resetConfig = {
  loading: false,
  loadingIndicator: false,
  fetch: {
    client: false,
    server: false,
  },
  features: {
    store: true,
    layouts: false,
    meta: false,
    middleware: false,
    transitions: false,
    deprecations: false,
    validate: false,
    asyncData: false,
    fetch: false,
    clientOnline: false,
    clientPrefetch: false,
    clientUseUrl: false,
    componentAliases: false,
    componentClientOnly: false,
  },
  build: {
    indicator: false,
    terser: false,
  },
};

const config = Object.assign({}, nuxtConfig, resetConfig, {
  ssr: false,
  srcDir: nuxtConfig.srcDir,
  ignore: ['**/components/**/*', '**/layouts/**/*', '**/pages/**/*'],
});

const buildNuxt = async () => {
  const nuxt = new Nuxt(config);
  await new Builder(nuxt).build();

  console.info(
    '\x1b[32m%s\x1b[0m',
    '\n \n==============================================\n' +
      ' Nuxtjs Store initialized!' +
      '\n==============================================\n',
  );

  return nuxt;
};

module.exports = async () => {
  const nuxt = await buildNuxt();
  process.env.buildDir = nuxt.options.buildDir;
};
