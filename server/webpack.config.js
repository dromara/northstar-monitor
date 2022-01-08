const path = require('path');

module.exports = {
  entry: './bin/server.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,  '../', 'dist')
  },
  target: 'node' // 这是最关键的
};