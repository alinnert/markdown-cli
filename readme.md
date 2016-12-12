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
    -s, --stylesheet [css-path]  Define path to the css file that should be used.
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

This will generate the files `readme-1.html`, `readme-2.html` and `readme-3.html`.

## Changelog
### 2.0.0
- **[NEW]** Rebuild with [`commander`](https://github.com/tj/commander.js).
- **[NEW]** Added support for processing multiple files at once.

### 1.0.0
Initial release