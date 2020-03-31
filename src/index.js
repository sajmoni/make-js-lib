#!/usr/bin/env node

const commander = require('commander')
const chalk = require('chalk')

const packageJson = require('../package.json')
const displayNoLibraryNameMessage = require('./message/noLibraryName')
const makeJSLib = require('./makeJSLib')

let libraryName

const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<library-name>')
  .usage(`${chalk.green('<library-name>')} [options]`)
  .action((name) => {
    libraryName = name
  })
  .on('--help', () => {
    console.log()
    console.log(`    Only ${chalk.green('<library-name>')} is required.`)
    console.log()
  })
  .option('--cli', 'create CLI tool')
  .parse(process.argv)

if (typeof libraryName === 'undefined') {
  displayNoLibraryNameMessage({ program })
  process.exit(1)
}

// TODO: Make this output look nicer
console.log()
console.log(`  ${packageJson.name}`)
console.log()
console.log(`  version: ${packageJson.version}`)

makeJSLib({ libraryName, cli: program.cli })
