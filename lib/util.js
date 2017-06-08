const path = require('path');
const cwd = process.cwd();

module.exports = {
    resolve: file => path.resolve(cwd, file)
}