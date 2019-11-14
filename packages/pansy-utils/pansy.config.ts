import { Config } from '@walrus/pansy'

const config: Config = {
  input: 'src/index.ts',
  banner: true,
  output: {
    format: ['cjs', 'es', 'umd', 'umd-min'],
    moduleName: 'pansy',
    sourceMap: true,
  },
  externals: [
    ...Object.keys(require('./package').dependencies)
  ]
}

export default config
