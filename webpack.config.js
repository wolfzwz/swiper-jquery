 const path = require('path');
 var webpack = require('webpack');
 
module.exports = {
	entry: './src/swiper.js',
	output: {
	    filename: 'swiper.js',
	    path: path.resolve(__dirname, 'dist')
  	},
    module: {
	    rules: [
	      { 
	      	test: /\.js$/,
	      	use: [{
                    loader: "babel-loader",
                    options: { presets: ["es2015"] }
                },]
	      }
	    ]
  	},
  	plugins:[
        new webpack.optimize.UglifyJsPlugin({
          compress:{
              warnings: false,
          }
        }),

    ]
}
