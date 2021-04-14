#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const postcss = require("postcss");
const postcssExtractStyles = require('postcss-extract-styles');

async function build() {
  const source = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');

  const options = {
    pattern: /^--/g
  };

  const fileName1 = path.join(__dirname, 'style.css')
  const fileName2 = path.join(__dirname, 'dest/variables2.css')

  fs.readFile(path.join(__dirname, 'style.css'), (error, css) => {
    postcss([postcssExtractStyles(options)])
      .process(css, { from: fileName1, to: fileName2 })
      .then(result => {
        console.log(result.extracted)
      })
  })
}

module.exports = build;

build();
