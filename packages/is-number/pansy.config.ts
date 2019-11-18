import { Config } from '@walrus/pansy'

const config: Config = {
  output: {
    format: ['cjs', 'es', 'umd', 'umd-min'],
    moduleName: 'isNumber',
    sourceMap: true
  }
}

export default config;
