const fs = require('fs');
const chalk = require('chalk');
const program = require('commander');
const capitalize = require('./util').capitalize;
const getOptions = require('./options').options;
const resolve = require('./util').resolve; // fs接口已不需要resolve

let pagePath; // 命令行输入的页面 可以有多级路径： path/pageA
let pageNames; // 路径转化的path数组 [path, pageA]
let pageNameId; // 文件名 pageA
let options = {
    tplPath: './scripts/.tpl/', // 模板地址
    outPath: './src/page/' // 页面地址
};

exports.page = function () {
    pagePath = program.args[0]
    pageNames = pagePath.split('/')
    pageNameId = pageNames.length > 1 ? pageNames.pop() : pagePath;

    options = Object.assign(options, getOptions().page)
    options.outPath += pagePath;

    if (fs.existsSync(options.outPath)) {
        console.error(chalk.red(options.outPath + ' 该文件目录已存在！'))
    } else {
        fs.mkdirSync(options.outPath)
        console.log(chalk.green(options.outPath + ' 文件目录创建成功！'))
        let files = fs.readdirSync(options.tplPath);

        files.forEach(item => copyTpl(item))
    }
};

function copyTpl(fileName) {
    fs.readFile(options.tplPath + fileName, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        let filePath = options.outPath + '/' + fileName.replace('tpl', pageNameId);
        let result = data.replace(/{{tpl}}/g, pageNameId).replace(/__Tpl__/g, capitalize(pageNameId));

        fs.writeFile(filePath, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
}