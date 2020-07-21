const path = require('path');

const libs = path.resolve(__dirname, '../../libs');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '^@scope/(.+)': libs + '/\\1/src'
        }
      }
    ]
  ]
};
