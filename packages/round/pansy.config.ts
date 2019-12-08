import { Config } from '@walrus/pansy';

const config: Config = {
  output: {
    format: ['cjs', 'es', 'umd', 'umd-min'],
    moduleName: 'round'
  }
};

export default config;
