module.exports = {
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
          '@core': './dist/core',
        },
      },
    ],
  ],
};
