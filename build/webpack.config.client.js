const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');

const isDev = process.env.NODE_ENV === 'development';

const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin()
];

const devServer = {
    port: 8000,
    host: '0.0.0.0',
    // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。默认禁用。
    overlay: {
        errors: true
    },
    // 注意，必须有 webpack.HotModuleReplacementPlugin 才能完全启用 HMR
    // 如果 webpack 或 webpack-dev-server 是通过 --hot 选项启动的，那么这个插件会被自动添加，所以你可能不需要把它添加到 webpack.config.js 中
    hot: true,
    // history模式下的url会请求到服务器端，但是服务器端并没有这一个资源文件，就会返回404，所以需要配置这一项
    historyApiFallback: {
        // index: '/public/index.html',
        index: '/index.html' //与output的publicPath有关(HTMLplugin生成的html默认为index.html)
    },
};

let config;

if (isDev) {
    config = merge(baseConfig, {
        devtool: '#cheap-module-eval-source-map',
        mode: 'development',
        module: {
            rules: [
            //     {
            //         test: /\.styl$/,
            //         use: [
            //             'vue-style-loader',
            //             'css-loader',
            //             {
            //                 loader: 'postcss-loader',
            //                 options: {
            //                     sourceMap: true
            //                 }
            //             },
            //             'stylus-loader'
            //         ]
            //     },
                {
                    test: /\.styl/,
                    use: [
                        'vue-style-loader',
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            // options: {
                            //     // 开启css modules
                            //     modules: true,
                            //     localIdentName: '[path]-[name]-[hash:base64:5]',
                            //     camelCase: true
                            // }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        'stylus-loader'
                    ]
                }

            ]
        },
        devServer,
        plugins: defaultPlugins.concat([
            new MiniCssExtractPlugin({
                filename: 'styles.[contentHash:8].css'
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    })
} else {
    config = merge(baseConfig, {
        mode: 'production',
        entry: {
            app: path.join(__dirname, '../client/index.js'),
            vendor: ['vue']
        },
        output: {
            filename: '[name].[chunkhash:8].js'
        },
        module: {
            rules: [
                {
                    test: /\.styl/,
                    use: [
                        'vue-style-loader',
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            // options: {
                            //     // 开启css modules
                            //     modules: true,
                            //     localIdentName: '[path]-[name]-[hash:base64:5]',
                            //     camelCase: true
                            // }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        'stylus-loader'
                    ]
                }
            ]
        },
        plugins: defaultPlugins.concat([
            new MiniCssExtractPlugin({
                filename: 'styles.[contentHash:8].css'
            })
        ]),
        // 第三方类库单独打包 vendors~app.xxxxxxxx.js
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: 'initial',
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0
                    },
                    vendor: {
                        test: /node_modules/,
                        chunks: 'initial',
                        name: 'vendor',
                        priority: 10,
                        enforce: true
                    }
                }
            },
            // 运行代码单独打包 runtime~app.xxxxxxxx.js
            runtimeChunk: true
        }
    })
}

module.exports = config;
