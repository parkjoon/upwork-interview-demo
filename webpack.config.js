module.exports = {
	entry: './public/app/index.js',
	output: {
		filename: './public/build/bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.json']
	}
};
