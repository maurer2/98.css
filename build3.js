#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const postcss = require("postcss");
const postcssExtractStyles = require("postcss-extract-styles");

async function build() {
  const fileIn = path.join(__dirname, 'style.css')
  const fileOut = path.join(__dirname, 'dist/variables.css')

  fs.readFile(path.join(__dirname, 'style.css'), (_, css) => {
    postcss([postcssExtractStyles({
      pattern: /^--/g
    })])
      .process(css, { from: fileIn, to: fileOut })
      .then(result => {
        fs.writeFile(fileOut, result.extracted.trim(), () => {
          console.log(`"${fileOut}" file written`)
        })
      })
      .catch((error) => console.err(error))
  })
}

module.exports = build;

build();
