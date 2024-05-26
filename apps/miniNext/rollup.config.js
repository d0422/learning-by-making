const babel = require('@rollup/plugin-babel');
const resolve = require('@rollup/plugin-node-resolve');
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const path = require('path');
console.log('path확인:', path.resolve('jsx-runtime.js'));
module.exports = [
  {
    input: './public/index.tsx',
    output: {
      file: './dist/public/index.js',
      format: 'es',
    },
    plugins: [
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env', '@babel/preset-typescript'],
        plugins: [
          [
            '@babel/plugin-transform-react-jsx',
            { importSource: '@core', runtime: 'automatic' },
          ],
          [
            'module-resolver',
            {
              alias: {
                '@core/jsx-runtime': path.resolve(
                  __dirname,
                  'src/core/jsx-runtime'
                ),
              },
            },
          ],
        ],
        extensions,
      }),
      resolve({
        extensions,
      }),
    ],
  },
];
