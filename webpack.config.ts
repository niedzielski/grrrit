import * as path from 'path'
import * as CleanPlugin from 'clean-webpack-plugin'
import * as CopyPlugin from 'copy-webpack-plugin'
import * as webpack from 'webpack'

const STATS = {
  all: false,
  errors: true,
  errorDetails: true,
  moduleTrace: true,
  warnings: true
}

const config: webpack.Configuration = {
  entry: {
    content: './src/content',
    background: './src/background'
  },
  resolve: {extensions: ['.ts']},

  output: {path: path.resolve('build'), filename: '[name].js'},

  module: {
    rules: [{test: /\.ts$/, use: 'ts-loader'}]
  },

  stats: STATS,

  plugins: [
    new CleanPlugin('build/*', {verbose: false}),
    new CopyPlugin([{context: 'static', from: '**'}])
  ]
}

export default config
