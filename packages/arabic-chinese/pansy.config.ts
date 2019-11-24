import { Config } from '@walrus/pansy'

const config: Config = {
  input: 'src/index.ts',
  output: {
    format: ['cjs', 'es', 'umd', 'umd-min'],
    moduleName: 'isArray',
    sourceMap: true,
  }
}

export default config
