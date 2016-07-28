# Markdown CLI

A CLI to convert md to html optionally using a stylesheet file.

## Solved problem

You have a .md file and quickly want to create a .html file? Maybe also using your own CSS? Here you go.

## Setup

Currently:

- clone repo
- use the following commands in the project directory:
- `npm i` (installs dependencies)
- `npm i -g` (installs this module globally and registers the `mdown` command)

## Usage

~~~
mdown input-md-file [ stylesheet-file ]
~~~

**Example:**

~~~
mdown inputfile.md style.css
~~~