const path = require('path')
const extract = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: extract.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new extract({
            filename: 'bundle.css',
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3001,
        '/api': 'http://localhost:3000',
    },
    mode: 'development',
}

if (process.env.NODE_ENV === 'production') {
    config.mode = 'production'
    config.plugins.push(
        new CopyPlugin({
            patterns: [{ from: './public/favicon.ico', to: 'favicon.ico' }],
        })
    )
}

module.exports = config
