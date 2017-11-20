const path=require("path"),
    HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports={
    entry:"./src/index.js",
    output: {
        filename: 'bundle.js',
        path: path.resolve('build')
    },
    devServer: {
        historyApiFallback: true,
    },
    module:{
        rules:[
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/\.(jpg|png|gif|svg)$/,use:'url-loader'}
        ]
    },
    devtool:'cheap-module-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template:'index.html'
        })
    ]
};