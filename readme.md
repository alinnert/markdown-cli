# Markdown CLI
A CLI to convert md to html, optionally using a stylesheet file.

## Solved problem
You have a .md file and quickly want to create a .html file? Maybe also using your own CSS? Here you go.

## Install
~~~bash
$ npm i -g mdcli
~~~

## Usage
~~~bash
$ mdown --help

  Usage: index [options] <files...>

  Options:

    -h, --help                   output usage information
    -V, --version                output the version number
    -s, --stylesheet [css-path]  Define path to the css file that should be used
    -b, --breaks                 Add <br> on single line breaks
    -l, --linkify                Auto-convert links
    -t, --typographer            Enable typographer
    -a, --all-options            Enable -b, -l, and -t
~~~

### No stylesheets
~~~bash
$ mdown readme.md
~~~

### Using a custom *.css file
~~~bash
$ mdown --stylesheet readme.css readme.md
$ mdown -s readme.css readme.md
~~~

### Multiple files
~~~bash
$ mdown readme-1.md readme-2.md readme-3.md
~~~

This will generate the following files: `readme-1.html`, `readme-2.html` and `readme-3.html`

If you use a stylesheet here it will be applied to all files.

## Changelog
### 2.0.1 (2016-12-12)
- **[CHG]** Updated description of some options to be more clear

### 2.0.0 (2016-12-12)
- **[NEW]** Rebuild using [`commander`](https://github.com/tj/commander.js)
- **[NEW]** Added support for processing multiple .md files at once
- **[NEW]** Added options `--breaks`, `--linkify`, `--typographer`, and `--all-options`
- **[CHG]** CSS is now being minified before included in the output file

### 1.0.0
- Initial release
