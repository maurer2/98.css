#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const postcss = require("postcss");
const postcssCustomProperties = require('postcss-custom-properties');

async function build() {
  const source = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');

  const vars = postcssCustomProperties.process(source, {
    preserve: true,
  });

  vars.then((data) => {
    const rootNodes = data.root.nodes[1].nodes
    console.log(data.css)  //.filter((node) => true))
    fs.writeFileSync(path.join(__dirname, './dist/variables.css'), data.css);
  })
}

module.exports = build;

build();
