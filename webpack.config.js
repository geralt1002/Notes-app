const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, options) => {
  // Check is production
  const isProd = options.mode === 'production';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js'
    },

    devtool: isProd ? false : 'source-map',

    module: {
      rules: [
        {
          test: /\.(scss|sass|css)$/,
          //  exclude: /node_modules/,
          use: [
            {
              loader: 'style-loader'
              //   options: { sourceMap: !isProd },
            },
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { sourceMap: !isProd }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: loader => [
                  require('autoprefixer')(),
                  require('cssnano')()
                ],
                sourceMap: !isProd
              }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: !isProd }
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/,
          exclude: /fonts?/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'img/'
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                disable: !isProd
              }
            }
          ]
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          exclude: /(images?|img)/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        },
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
              //  minimize: true
            }
          }
        }
      ]
    },

    devServer: {
      contentBase: path.join(__dirname, 'src'),
      // contentBase: './dist',
      compress: true,
      port: 8000
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      })
    ]
  };
};
