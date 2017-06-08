const fs = require('fs');
const shell = require('shelljs/global');
const resolve = require('./util').resolve;
let includes;

exports.updateGhPages = updateGhPages;

function updateGhPages(list = []) {
    includes = list
    includes.forEach(item => replaceForGhPages(resolve(item.filePath), item.target, item.content))

    getGhPages().then(pullGhPages)

}

function getGhPages() {
    return new Promise(function (resolve, reject) {

        console.log('Building... Please wait a moment.')

        exec('yarn run build', (code, stdout, stderr) => {
            console.log('build success', stdout)
            console.log('build success')
            // pullGhPages()
            resolve();
        })
    });
}

function pullGhPages() {

    console.log('Pushing gh-pages... Please wait a moment.')

    exec('gh-pages -d dist', (code, stdout, stderr) => {

        console.log('gh-pages success', stdout)

        includes.forEach(item => replaceForGhPages(resolve(item.filePath), item.content, item.target))

        console.log('Tip: revert success, Opening https://jm-team.github.io/ng-seed')
    })
}

/**
 * 替换文件中的字符为指定内容, 以便build为gh-pages所需要的路径格式
 * @param file 文件路径
 * @param target 需要被替换的目标
 * @param content 替换后的内容
 */
function replaceForGhPages(file, target, content) {
    // 同步读写文件方便顺序输出打印日志,异常错误直接抛出
    let data = fs.readFileSync(file, {encoding: 'utf8', flag: 'r'})

    fs.writeFileSync(file, data.replace(target, content))

    console.log(`replace success ${file}: ${target} => ${content}`)
}