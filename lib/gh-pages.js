const fs = require('fs');
const shell = require('shelljs/global');
const ghpages = require('gh-pages');
const resolve = require('./util').resolve;
let includes;

function updateGhPages(list = []) {
  includes = list;
  includes.forEach(item => replaceForGhPages(resolve(item.filePath), item.target, item.content));

  Promise.all([getGhPages(), getRepo()]).then(pullGhPages);
}

function getGhPages() {
  return new Promise(function(resolve, reject) {
    console.log('Building... Please wait a moment.');

    exec('yarn run build', (code, stdout, stderr) => {
      console.log('build success', stdout);
      console.log('build success');
      resolve('build success');
    });
  });
}

function getRepo() {
  return new Promise(function(resolve, reject) {

    exec('git config --get remote.origin.url', (code, stdout, stderr) => {
      resolve(stdout);
    });
  });
}

function pullGhPages([page, repo]) {
  console.log(page, repo); // repo 包含`\n`需要去除 repo.trim()
  console.log('Pushing gh-pages... Please wait a moment.');
  const repoRegex = /([^:\/]*)\/([^\/]*)\.git$/.exec(repo.trim());
  const repoAuthor = repoRegex[1];
  const repoName = repoRegex[2];

  console.log('gh-pages cleaning');
  ghpages.clean();

  ghpages.publish('dist', () => {

    console.log('gh-pages success');

    includes.forEach(item => replaceForGhPages(resolve(item.filePath), item.content, item.target));

    console.log(`Tip: revert success, Opening https://${repoAuthor}.github.io/${repoName}`);
  });
}

/**
 * 替换文件中的字符为指定内容, 以便build为gh-pages所需要的路径格式
 * @param file 文件路径
 * @param target 需要被替换的目标
 * @param content 替换后的内容
 */
function replaceForGhPages(file, target, content) {
  // 同步读写文件方便顺序输出打印日志,异常错误直接抛出
  let data = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });

  fs.writeFileSync(file, data.replace(target, content));

  console.log(`replace success ${file}: ${target} => ${content}`);
}

exports.updateGhPages = updateGhPages;
