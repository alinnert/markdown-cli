#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const md = require('markdown-it')({
    breaks: true,
    linkify: true,
    typographer: true,
    quotes: '„“‚‘'
});

if (process.argv.length <= 2) {
    console.log(`Usage: ${chalk.blue('mdown filename [cssFile]')}`);
    process.exit(0);
}

const [nodePath, scriptPath, mdFile, cssFile] = process.argv;

const encoding = 'UTF-8';
let mdFileContent, cssFileContent;

try { mdFileContent = fs.readFileSync(mdFile, {encoding}); }
catch (e) {
    console.error(e);
    process.exit(0);
}

try { cssFileContent = cssFile ? fs.readFileSync(cssFile, {encoding}) : ''; }
catch (e) { cssFileContent = ''; }

const renderedHtml = md.render(mdFileContent);

const html = `
<html>
<head>
<meta charset="utf-8">
<title>${mdFile}</title>
<style>${cssFileContent}</style>
</head>
<body>
    <div id="wrapper">
        ${renderedHtml}
    </div>
</body>
</html>
`;

const outputFile = mdFile.replace(/\.md$/, '.html');

console.log(chalk.green('DONE!'));
console.log(`output file: ${chalk.blue(outputFile)}`);

try {fs.writeFileSync(outputFile, html, {encoding});}
catch (e) { console.error(e); }