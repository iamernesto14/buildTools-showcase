import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    static: [
      path.join(__dirname, 'dist'),
      {
        directory: path.join(__dirname, 'src/data'),
        publicPath: '/data',
      },
      {
        directory: path.join(__dirname, 'src'),
        publicPath: '/',
      },
    ],
    compress: true,
    port: 3000,
    open: true,
    hot: true,
    liveReload: true,
    watchFiles: ['src/**/*.{ts,tsx,scss,html,json}'],
  },
  devtool: 'source-map',
};