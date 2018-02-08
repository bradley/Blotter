# Blotter Documentation Site

This branch houses Blotter's documentation site for GitHub Pages.

# Build

To build the site, clone the repo and run the following (do not edit the `dist/blotter-site.js` or `dist/blotter-site.min.js` files directly):

```
$ cd path/to/blotter/
$ git checkout gh-pages
$ npm install
$ npm run build
```

To keep styles up to date as you edit them, run the following:

```
$ cd path/to/blotter/styles
$ scss --sourcemap=none --watch .:.
```
