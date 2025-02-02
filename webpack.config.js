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
                exclude: /node_modules/,
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
        static: path.join(__dirname, 'op'),
        port: 5000,
        historyApiFallback: true,
        proxy: {
            '/api': 'http://localhost:3000', // 將請求代理到您的 API
        },
        open: true,
    },
};