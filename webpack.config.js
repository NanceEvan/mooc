// 使用绝对路径
const path = require('path');
const webpack = require('webpack');
// html-webpack-plugin 插件是用于编译webpack项目中html类型的文件，
// 如果直接将html文件置于./src目录中，用webpack打包时是不会编译到生产环境中的。
// 因为webpack编译任何文件都需要先基于配置文件先行配置
const HTMLPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin'); // 引入插件

// 在package.json的script的build和dev两个脚本中设置的NODE_ENV都是存在process.env中的
const isDev = process.env.NODE_ENV === 'development';


const config = {
    // webpack可以为js的各种不同的宿主环境提供编译功能， 为了能正确的进行编译， 需要在配置里进行正确的编译
    // 默认情况下，target的值是web， 也就是为浏览器的环境提供编译
    target: "web",
    mode: 'development',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    // style-loader: style-loader能够在需要载入的html中创建一个<style></style>标签，标签里的内容就是CSS内容
                    'style-loader',
                    // css-loader: css-loader是允许在js中import一个css文件，会将css文件当成一个模块引入到js文件中
                    'css-loader'
                ]
            },
            {
                // css 预处理器
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'  // 只用来处理stylus文件， 处理完成之后是css文件， css文件怎么处理对stylis-loader来说就无关紧要了， 直接扔给上一级css-loader上层透明
                    // webpack的loader就是这么一层一层往上扔的，每一层loader只处理其关心的那部分工作
                ]

            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        // 将图片转化成base64代码，直接写在js内容里面，而不用生成新的文件，对于小图片有用，可以减少http请求
                        loader: 'url-loader', // url-loader是封装的file-loader
                        options: {
                            limit: 1024, // 如果文件大小小于1024bit进行转换, 如果文件大小大于这个值，会被放到dist目录之下，以name规定好的命名格式命名
                            name: '[name]-aaa.[ext]' // [name]是原文件的名字， [ext]是文件拓展名
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // make sure to include the plugin for the magic
        new webpack.DefinePlugin({
            'process.env': {// 使用vue、rect框架时，必须要用这个插件
                // 在这里定义的process.env.NODE_ENV是可以在js代码中引用的
                NODE_ENV: isDev ? '"development"' : '"production"', // 注意单引号内的双引号
            }
        }),// webpack 环境区分打包，选择不同的源代码打包， 开发版本中包括很多的错误提示 -但是会加大文件大小，其次，降低代码运行效率
        new VueLoaderPlugin(),
        new HTMLPlugin()
    ]
};

// cross-env 可以为不同的系统平台提供相同的编译命令
if (isDev) {
    config.devtool = '#cheap-module-eval-source-map';
    // 在dev环境下的webpack-dev-server的配置
    config.devServer = {
        port: 8000,
        host: '0.0.0.0', // 可以通过localhost\127.0.0.0\本机内网地址IP访问
        overlay: {
            errors: true, // 在dev模式下，调试代码时出现的任何错误都显示到页面上
        },
        // open: true, // 如果值为true，每次启动webpack-dev-server都会启动浏览器
        hot: true // 开发单页页面时， 会有很多数据，但是刷新时会有很多数据需要重新操作才能恢复，hot为true时，只会重新渲染进行修改的组件
    };
    // 当hot选项为true时，需要用得到的插件
    config.plugins.push(
        // HMR 无刷新实现代码更新，只更新变更内容，避免了大量的网络请求、浏览器重新渲染、app解析编译显示
        // webpack 的热重载有两种方式，一种是iframe的内部刷新，一种是全局组件替换， HotModuleReplacementPlugin可以实现组件差异性更换
        new webpack.HotModuleReplacementPlugin(),
        // 跳过编译时出错的代码，使编译后运行时的包不会发生错误
        new webpack.NoEmitOnErrorsPlugin()
    )

}

module.exports = config;
