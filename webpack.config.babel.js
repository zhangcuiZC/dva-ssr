import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { join } from 'path';

export default {

  devtool: '#source-map',

  entry: {
    index: './client/index.js',
  },

  output: {
    filename: '[name].js',
    path: join(__dirname, './dist'),
    publicPath: '/static/',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          "plugins": [
            ["import", { "libraryName": "antd", "style": true }]
          ]
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'css-loader?sourceMap&modules&localIdentName=[local]___[hash:base64:5]'
        ),
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'css-loader?sourceMap'
        ),
      },
      {
        test: /\.(less)$/,
        loader: ExtractTextPlugin.extract('style?sourceMap', 'css?sourceMap!less?sourceMap!!less?sourceMap'),
        include: /node_modules/
      },
      {
        test: /\.(less)$/,
        loader: ExtractTextPlugin.extract('style?sourceMap', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less?sourceMap'),
        exclude: /node_modules/
      },
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name].css', {
      disable: false,
      allChunks: true,
    }),
  ],
};
