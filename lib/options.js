const fs = require('fs');
const resolve = require('./util').resolve;
const program = require('commander');

exports.options = function () {
    let confPath = program.config || './config/jm.config.json'; // TODO: -c 配置文件路径
    let conf = {};

    if (fs.existsSync(resolve(confPath))) {
        conf = require(resolve(confPath));
    } else {
        console.error(`Can not find config file ${confPath}`)
    }

    return conf
}