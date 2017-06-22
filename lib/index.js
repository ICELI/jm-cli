const initProject = require('./init').init;
const updateGhPages = require('./gh-pages').updateGhPages;
const genAuthor = require('./author').author;
const genPage = require('./page').page;
const getOptions = require('./options').options;

module.exports = {
  initProject,
  updateGhPages,
  genAuthor,
  genPage,
  getOptions
};