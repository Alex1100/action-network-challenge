const webpack = require('webpack');
const path = require('path');
require('dotenv').load();

const SRC_DIR = path.resolve(__dirname, 'public/src');
const BUILD_DIR = path.resolve(__dirname, 'public/compiled');


module.exports = {
  context: __dirname,
  entry: {

    app: [
      'react-hot-loader/patch',
      "webpack-dev-server/client?http://localhost:8080",
      'webpack/hot/dev-server',
      'babel-polyfill',
      `${SRC_DIR}/index.js`,
    ],

  },

  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
    publicPath: 'public/compiled',
  },

  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'public'),
    compress: true,
  },

  watch: true,

  watchOptions: {
    aggregateTimeout: 1000,
    poll: true,
    poll: 500,
  },

  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader?cacheDirectory',
        include: SRC_DIR,
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', "stage-1"],
          plugins: [
            'transform-object-rest-spread',
            'transform-regenerator',
            'react-hot-loader/babel',
          ]
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'font-loader?format[]=truetype&format[]=woff&format[]=embedded-opentype'],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false',
          'url-loader?limit=8192',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=public/fonts/[name].[ext]',
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css'],
    modules: ['node_modules']
  },

  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },

  cache: true,

  devtool: 'source-map',

  target: "web",

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.NamedModulesPlugin(),
  ]
};
