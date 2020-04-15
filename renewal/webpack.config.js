const path = require('path');

module.exports = {
  mode: 'production',
  entry: './js/mainManager.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'htmlbuilder.js',
    library: ['Htmlbuilder']
  },
  optimization: {
    minimize: true
  },
  module: {
    noParse: /\.test\.js$/,
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        exclude: /componentUtil.css/,
        use: [
          'style-loader',
          'to-string-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false
            }
          } // 추후 local로 사용
        ]
      },
      {
        test: /componentUtil.css/,
        use: [
          'to-string-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false
            }
          } // 추후 local로 사용
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  }
};
