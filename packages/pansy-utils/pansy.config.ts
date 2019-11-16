import { Config } from '@walrus/pansy'

const config: Config = {
  input: 'src/index.ts',
  banner: true,
  output: {
    format: ['cjs', 'es', 'umd', 'umd-min'],
    moduleName: 'pansy',
    sourceMap: true,
  }
}

console.log(config);

export default config
