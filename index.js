#!/usr/bin/env node
const commander = require('commander');
const fs = require('fs');
const chalk = require('chalk');
const markdownIt = require('markdown-it');
const CleanCSS = require('clean-css');
const cleanCSS = new CleanCSS();
const packageFile = require('./package.json');
let mdFileContents, cssFileContent;

commander
  .version(packageFile.version)
  .usage('[options] <files...>')
  .option('-s, --stylesheet [css-path]', 'Define path to the css file that should be used')
  .option('-b, --breaks', 'Add <br> on single line breaks')
  .option('-l, --linkify', 'Auto-convert links')
  .option('-t, --typographer', 'Enable typographer')
  .option('-a, --all-options', 'Enable -b, -l, and -t')
  .parse(process.argv);

const markdownItOptions = {
  breaks: commander.breaks || commander.allOptions,
  linkify: commander.linkify || commander.allOptions,
  typographer: commander.typographer || commander.allOptions,
  quotes: '„“‚‘'
};
const md = markdownIt(markdownItOptions);
const files = commander.args;
const encoding = 'UTF-8';

console.log('');

try {
  mdFileContents = files.map(file => fs.readFileSync(file, {encoding}));
  cssFileContent = commander.stylesheet
    ? cleanCSS.minify(fs.readFileSync(commander.stylesheet, {encoding})).styles
    : '';
}
catch (error) {
  switch (error.code) {
    case 'ENOENT': {
      console.log(`${chalk.red('  Error:\n  The file')} ${error.path} ${chalk.red(' does not exist.')}`);
      process.exit(1);
      break;
    }
    default: {
      console.error(`${chalk.red('  Unknown error:')}\n  ${error.Error || error}`);
    }
  }
}

mdFileContents.forEach((content, index) => {
  const renderedHtml = md.render(content);
  const mdFile = files[index];
  const html = `<html><head><meta charset="utf-8"><title>${mdFile}</title><style>${cssFileContent}</style></head><body class="markdown-body"><div id="wrapper">${renderedHtml}</div></body></html>`;
  const targetFileName = mdFile.replace(/\.md$/, '.html');

  console.log(`${chalk.blue('  Output file:')} ${targetFileName}`);

  try {
    fs.writeFileSync(targetFileName, html, {encoding});
  }
  catch (error) {
    console.error(error);
  }
});
