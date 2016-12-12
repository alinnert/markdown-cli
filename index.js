#!/usr/bin/env node
const commander = require('commander');
const fs = require('fs');
const chalk = require('chalk');
const md = require('markdown-it')({
  breaks: true,
  linkify: true,
  typographer: true,
  quotes: '„“‚‘'
});

commander.version('2.0.0');
commander.usage('[options] <files...>');
commander.option('-s, --stylesheet [css-path]', 'Define path to the css file that should be used.');
commander.parse(process.argv);

const files = commander.args;
const encoding = 'UTF-8';
let mdFileContents, cssFileContent;

console.log('');

try {
  mdFileContents = files.map(file => fs.readFileSync(file, {encoding}));
  cssFileContent = commander.stylesheet ? fs.readFileSync(commander.stylesheet, {encoding}) : '';
}
catch (error) {
  switch (error.code) {
    case 'ENOENT': {
      console.log(`${chalk.red('  Error:\n  The file')} ${error.path} ${chalk.red(' does not exist.')}`);
      process.exit(1);
      break;
    }
    default: {
      console.error(`${chalk.red('  Unknown error:')}\n${error.Error}`);
    }
  }
}

mdFileContents.forEach((content, index) => {
  const renderedHtml = md.render(content);
  const mdFile = files[index];
  const html = `<html><head><meta charset="utf-8"><title>${mdFile}</title><style>${cssFileContent}</style></head><body><div id="wrapper">${renderedHtml}</div></body></html>`;
  const targetFileName = mdFile.replace(/\.md$/, '.html');

  console.log(`${chalk.blue('  Output file:')} ${targetFileName}`);

  try {
    fs.writeFileSync(targetFileName, html, {encoding});
  }
  catch (error) {
    console.error(error);
  }
});