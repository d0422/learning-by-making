const babel = require('@rollup/plugin-babel');
const resolve = require('@rollup/plugin-node-resolve');
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const path = require('path');

const fs = require('fs');

const files = fs.readdirSync('public');

const createConfigFile = (fullFileName) => {
  const [fileName] = fullFileName.split('.tsx');
  return {
    input: `./public/${fullFileName}`,
    output: {
      file: `./dist/public/${fileName}.js`,
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
                '@core': path.resolve(__dirname, 'src/core'),
                '@/utils': path.resolve(__dirname, 'src/utils'),
                '@/pages': path.resolve(__dirname, 'src/pages'),
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
  };
};

module.exports = files.map((fullFilename) => createConfigFile(fullFilename));
