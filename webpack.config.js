module.exports = {
    entry: './app/main.jsx', // assumes your entry point is the index.js in the root of your project folder
    output: {
      path: __dirname,
      filename: './public/bundle.js' // assumes your bundle.js will also be in the root of your project folder
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          options: {
            presets: ['react']
          }
        }
      ]
    }
  };