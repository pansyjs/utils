import { Config } from '@walrus/pansy'

const config: Config = {
  output: {
    format: ['cjs', 'es', 'umd', 'umd-min'],
    moduleName: 'isDate',
    sourceMap: true,
  }
}

export default config
