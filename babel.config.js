module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@application': './src/application',
        '@domain': './src/domain',
        '@infrastructure': './src/infrastructure',
        '@shared': './src/shared',
        '@test': './test',
      },
    }],
  ],
  ignore: [
    'test',
    'node_modules',
    '.editorconfig',
  ],
};
