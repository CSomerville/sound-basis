const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const production = process.env.NODE_ENV === 'production';
const pathToReact = path.resolve(__dirname + '/node_modules/react/dist/react.min.js');
const pathToReactDOM = path.resolve(__dirname + '/node_modules/react-dom/dist/react-dom.min.js');

const plugins = [
  new ExtractTextPlugin("[name].css")
];

const prodPlugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin()
]

module.exports = {
  entry: {
    admin: "./admin/index.jsx",
    public: "./public/index.jsx"
  },
  context: __dirname + '/src/app',
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: (production) ? {
      'react': pathToReact,
      'react-dom': pathToReactDOM
    } : {},
  },
  devtool: (production) ? null : 'source-map',
  output: {
    path: "./bundle",
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: __dirname + '/src/app',
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    },  {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract("style", "css!sass")
    }],
  },
  plugins: (production) ? plugins.concat(prodPlugins) : plugins
}
