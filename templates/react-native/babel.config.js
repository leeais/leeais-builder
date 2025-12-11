module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    '@babel/plugin-transform-export-namespace-from',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@i18n': './src/i18n',
          '@features': './src/features',
          '@shared': './src/shared',
          '@store': './src/store',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@types': './src/types',
          '@': './src',
          tests: ['./tests/'],
        },
      },
    ],
  ],
};
