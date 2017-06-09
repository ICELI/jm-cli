const path = require('path');
const cwd = process.cwd();

module.exports = {
    resolve: file => path.resolve(cwd, file),
    capitalize: str => str.charAt(0).toUpperCase() + str.substr(1)
}