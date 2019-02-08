import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM'
}

export default {
  input: './src/index.js',

  output: [
    {
      file: './build/react-web-monetization.js',
      name: 'ReactWebMonetization',
      sourcemap: true,
      format: 'cjs',
      globals
    },
    {
      file: './build/react-web-monetization.module.js',
      name: 'ReactWebMonetization',
      sourcemap: true,
      format: 'es',
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
