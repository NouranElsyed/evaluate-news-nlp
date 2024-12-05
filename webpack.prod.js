import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin'; 
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WorkboxPlugin from 'workbox-webpack-plugin';

const __dirname = path.resolve(); 

export default {
    entry: './src/client/index.js', 
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/",
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",  
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'], 
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/views/index.html', 
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),  
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),  
    ],
    devServer: {
        port: 3000,
        allowedHosts: 'all',
    },
};
