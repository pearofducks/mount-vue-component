import { readPackageJSON } from 'pkg-types'

const pkg = await readPackageJSON()

export default {
  input: 'index.js',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'esm' }
  ],
  external: ['vue']
}
