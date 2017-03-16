const fs = require('fs');
const path = require('path');
const util = require('util');
const program = require('commander');
const ora = require('ora');
const chalk = require('chalk');
const download = require('download-git-repo');
const shell = require('shelljs/global');

program
    .usage('<command> [options]')
    .version(require('../package.json').version)

program
    .command('init')
    .usage('<project-type> [project-name]')
    .description('initialize project, you can choose the framework with AngularJS or Vue2')
    .action(function () {

        /**
         * download argv
         */

        let projectType = program.args[0];
        let projectName = program.args[1];
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
    });

program
    .command('install')
    .alias('i')
    .description('Install Package')
    .action(function () {
        const spinner = ora('Installing Package...');
        spinner.start();
        exec('npm install', {async: true}, function (code, stdout, stderr) {
            spinner.stop();
            console.log('Exit code:', code);
            console.log('Program output:', stdout);
            console.log('Program stderr:', stderr);
        });
    });

program
    .command('dev')
    .description('dev build')
    .action(function () {
        exec('npm run dev');
    });

program
    .command('build')
    .description('production build')
    .action(function () {
        exec('npm run build');
    });

/**
 * help
 */

function help() {
    program.parse(process.argv)
    if (program.args.length < 1) {
        return program.help()
    }
}

help();