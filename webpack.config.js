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
            },
            {
                test: /\.pug$/,
                loader: 'pug'
            }
        ]
    },
    vue: {
        loaders: {
            html: 'pug',
            css: 'style!css!stylus',
        },
    },
    // example: if you wish to apply custom babel options
    // instead of using vue-loader's default:
    babel: {
        presets: ['es2015', 'stage-2'],
        plugins: ['transform-runtime']
    }
}
