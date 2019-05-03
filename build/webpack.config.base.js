const path = require('path');
const createVueLoaderOptions = require('./vue-loader.config');

const isDev = process.env.NODE_ENV === 'development';

const config = {
    target: 'web',
    mode: 'development',
    entry: path.join(__dirname, '../client/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, '../dist'), // 所有输出文件的目标路径
        // publicPath: "/public/", // 输出解析文件的目录， url 相对于 HTML页面
        // path是webpack所有文件的输出路径， 必须是绝对路径 比如： output输出的js，js-loader解析的图片，HtmlWebpackPlugin生成的html文件， 都会存放在以path为基础的目录下
        // publicPath并不会对生成的文件的路径造成影响， 主要是对页面里引入的资源的路径做对应的不全
    },
    module: {
        rules: [
            // vue 文件
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: createVueLoaderOptions(isDev)
            },
            // 普通 js 文件 以及 vue文件中的script模块
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: __dirname + 'node_modules',
            },
            // jsx 文件
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            // 普通 css 文件， 以及 vue文件中的style模块
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            // 图片
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024, // 如果图片小于1024，则把图片转为base64写到代码里面去
                            name: 'resources/[path][name].[hash:8].[ext]' // 指定输出的文件的名字
                        }
                    }
                ]
            }

        ]
    }
};

module.exports = config;
