'use strict';

const  fs                   = require('fs');
const  path                 = require('path');
const  util                 = require('util');
const  os                   = require('os');
const  program              = require('commander');

require('shelljs/global');

program
    .version(require('../package.json').version)
    .command('init')
    .description('initialize project')
    .action(function () {
        const dir = process.cwd();
        const templateDir = path.resolve(__dirname, '../tpl/webapp/*');
        // rm('-rf', dir + '/webapp');  // todo: check webapp is not empty
        cp('-rf', templateDir, dir);

        console.log('=================================');
        console.log('Init Success');
        console.log('=================================');
    });

program
    .command('install')
    .alias ('i')
    .description('Install Package')
    .action(function () {
        console.log('Install Package...');
        exec('npm install', {async:true}, function(code, stdout, stderr) {
                console.log('Exit code:', code);
                console.log('Program output:', stdout);
                console.log('Program stderr:', stderr);
        });
    });

program
    .command('dev')
    .description('dev build')
    .action(function () {
        if(os.platform() === 'win32') {
            exec('npm run dev');
        } else {
            exec('npm run macDev');
        }
    });

program
    .command('build')
    .description('production build')
    .action(function () {
        if(os.platform() === 'win32') {
            exec('npm run build');
        } else {
            exec('npm run macBuild');
        }
    });

program.parse(process.argv);