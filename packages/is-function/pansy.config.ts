import { Config } from '@walrus/pansy'

const config: Config = {
  input: 'src/index.ts',
  banner: true,
  output: {
    format: ['cjs', 'es', 'umd', 'umd-min'],
    moduleName: 'isFunction',
    sourceMap: true,
  }
}

export default config
