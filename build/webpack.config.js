const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const devConfig = require('./webpack.dev.config')
const proConfig = require('./webpack.pro.config')

// 以下获取环境变量是有问题的，
// let config = process.env.NODE_ENV === 'development' ? devConfig : proConfig;
// module.exports = merge(baseConfig, config);

// 应该通过这样的方式
module.exports = (env, argv) => {
    let config = argv.mode === 'development' ? devConfig : proConfig;
    return merge(baseConfig, config);
};


