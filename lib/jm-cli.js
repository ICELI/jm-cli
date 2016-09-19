#!/usr/bin/env node

'use strict';

var CLI                  = module.exports = {};
var program              = require('commander');
var fs                   = require('fs');
var path                 = require('path');
var util                 = require('util');
var exec                 = require('child_process').exec;
var p                    = path;

program
    .version(require('../package.json').version)
    .command('init')
    .description('initialize project')
    .action(function () {
        console.log('init');
    });

program.parse(process.argv);