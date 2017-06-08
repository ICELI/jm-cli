const fs = require('fs');
const program = require('commander');
const ora = require('ora');
const chalk = require('chalk');
const download = require('download-git-repo');

/**
 * download argv
 */
exports.init = function () {
    let projectType = program.args[0];
    let projectName = program.args[1]; // TODO: 判断是否输入projectName
    let projectPath = process.cwd() + '/' + projectName;
    let owner = 'jm-team'; // github
    let repo;

    if (!fs.existsSync(projectPath)) {

        if (projectType == 'ng' || projectType == 'vue') {
            repo = owner + '/' + projectType + '-seed';
        } else {
            repo = projectType;
        }
        console.log(chalk.green(">> 准备创建项目: " + projectName));
        const spinner = ora('downloading template from repo: ' + repo);
        spinner.start();
        download(repo, projectName, function (err) {
            spinner.stop();
            if (err) {
                console.error(chalk.red('Failed to download repo ' + repo + ': ' + err.message.trim()))
                process.exit(1)
            } else {
                console.log();
                console.log(chalk.green('-- 项目创建成功'));
                console.log('==============================');
                console.log('$ cd ' + projectName + ' ，进入目录!');
                console.log('$ jm i，安裝依赖包！');
                console.log('$ jm dev，启动项目！');
                console.log('$ jm build，打包项目！');
                console.log('==============================');
            }
        })
    } else {
        console.error(chalk.red(projectName + '项目已经存在，请使用其他名称！'));
    }
}
