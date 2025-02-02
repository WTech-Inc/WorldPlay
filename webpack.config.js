const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'op'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        static: path.join(__dirname, 'op'), // 提供靜態文件
        port: 5000,
        historyApiFallback: true, // 支持 HTML5 的 history API
        proxy: {
            '/': 'http://0.0.0.0:5000',
        },
    },
};