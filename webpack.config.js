var webpack = require('webpack')
module.exports = {
    entry: './lib/index.js',
    output: {
        path: './dist',
        publicPath: '/dist/',
        filename: 'index.js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                // edit this for additional asset file types
                test: /\.(png|jpg|gif)$/,
                loader: 'file?name=[name].[ext]?[hash]'
            }
        ]
    },
    // example: if you wish to apply custom babel options
    // instead of using vue-loader's default:
    babel: {
        presets: ['es2015', 'stage-2'],
        plugins: ['transform-runtime']
    }
}
