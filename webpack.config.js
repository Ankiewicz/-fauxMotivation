
var path = require('path');
 
module.exports = {
  entry: './src/app.js',
  
  output: {path: __dirname + "/public/js", filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};