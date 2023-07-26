const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    stats: { colors: true },
    entry: './src/index.js',
    externals: [nodeExternals()],
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'lib'),
      library: {
        type: 'commonjs'
      }
    },
    plugins: [new CleanWebpackPlugin()],
    module: {
      rules: [
      {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    devtool: 'source-map'
}