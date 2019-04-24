const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');

const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"development"'
        }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin({
        template: path.join(__dirname, 'template.html')
    })
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
    hot: true
};

let config;

config = merge(baseConfig, {
    entry: path.join(__dirname, '../practice/index.js'),
    module: {
        rules: [
            {
                test: /\.styl/,
                use: [
                    'vue-style-loader',
                    'css-loader',
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
    // import Vue from 'vue'
    // 正式环境默认使用的是 vue.runtime.xxx.js
    // 开发环境默认使用的是 vue.runtime.esm.js
    // runtime和没有runtime区别：
    // 无runtime， 可以这么写 template: "<div>test</div>"， 有runtime这么报错
    // 所以要配置成无runtime的
    resolve: {
        alias: {
            // 指定vue的位置
            'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
        }
    },
    plugins: defaultPlugins.concat([
        new webpack.HotModuleReplacementPlugin()
    ])
});

module.exports = config;
