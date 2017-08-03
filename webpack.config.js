const path = require('path');

module.exports = {
devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 8080,
  },
entry: "./script/app.js",
 output: {
   filename: "./public/bundle.js"
 },
 module: {

   loaders: [
     {
       test: [/\.js$/, /\.es6$/, /\.jsx$/],
       exclude: /node_modules/,
       loader: 'babel-loader',
       query: {
         presets: ['react', 'es2015']
       }
     }
   ]
 },
 resolve: {
   extensions: ['.js', '.es6',]
 }
}
