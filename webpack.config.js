const path = require('path');

module.exports = {
    // 入口文件
    entry: './src/index.js',

    // 輸出配置
    output: {
        path: path.resolve(__dirname, 'dist'), // 將 'op' 改為更常見的 'dist'
        filename: 'bundle.js', // 打包後的檔案名稱
        publicPath: '/', // 確保開發伺服器的路徑正確
    },

    // 模組處理規則
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // 處理 .js 和 .jsx 文件
                exclude: /node_modules/, // 排除 node_modules 目錄
                use: {
                    loader: 'babel-loader', // 使用 Babel 轉譯
                },
            },
            {
                test: /\.css$/, // 處理 .css 文件
                use: ['style-loader', 'css-loader'], // 使用 style-loader 和 css-loader
            },
            // 可以根據需要添加更多 loader，例如處理圖片或字體
            // {
            //     test: /\.(png|svg|jpg|jpeg|gif)$/i,
            //     type: 'asset/resource',
            // },
        ],
    },

    // 解析配置
    resolve: {
        extensions: ['.js', '.jsx'], // 自動解析這些副檔名
    },

    // 模式設定
    mode: 'development', // 開發模式

    // 開發工具配置
    devtool: 'source-map', // 生成 source map 方便調試

    // 開發伺服器配置
    devServer: {
        static: {
            directory: path.join(__dirname, 'op'), // 靜態文件目錄
        },
        compress: true, // 啟用 gzip 壓縮
        port: 9000, // 伺服器端口
        hot: true, // 啟用熱模組替換 (HMR)
        open: true, // 自動打開瀏覽器
        historyApiFallback: true, // 支持 HTML5 History API
    },
};