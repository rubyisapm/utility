/**
 * Created by rubyisapm on 16/12/21.
 */
var webpack=require('webpack');
module.exports = {
  entry: {
    index: './index'
  },
  output: {
    path: './asset',
    filename: 'utility.js',
    libraryTarget:'umd',
    library:'utility'
  },
  devtool:'eval'
};