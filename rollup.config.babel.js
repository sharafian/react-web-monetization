import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM'
}

const outputTo = process.env.OUTPUT_BUNDLE_TO || `${__dirname}/build`

const config = {
  input: './src/index.js',

  output: [
    {
      file: `${outputTo}/react-web-monetization.js`,
      name: 'ReactWebMonetization',
      sourcemap: true,
      format: 'cjs',
      globals
    }
  ],

  external: ['react', 'react-dom'],

  plugins: [
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    resolve(),
    commonjs()
  ]
}

if (!process.env.NO_MODULE) {
  config.output.push({
    file: `${outputTo}/react-web-monetization.module.js`,
    name: 'ReactWebMonetization',
    sourcemap: true,
    format: 'es',
    globals
  })
}

export default config
