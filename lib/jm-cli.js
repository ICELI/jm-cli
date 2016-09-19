#!/usr/bin/env node

'use strict';

const  fs                   = require('fs');
const  path                 = require('path');
const  util                 = require('util');
const  exec                 = require('child_process').exec;
require('shelljs/global');

const  program              = require('commander');

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

program.parse(process.argv);