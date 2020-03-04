#!/usr/bin/env node

const commander = require('commander')
const chalk = require('chalk')

const packageJson = require('../package.json')
const displayNoProjectNameMessage = require('./message/noProjectName')
const makeJSLib = require('./makeJSLib')

let projectName

const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action((name) => {
    projectName = name
  })
  .on('--help', () => {
    console.log()
    console.log(`    Only ${chalk.green('<project-directory>')} is required.`)
    console.log()
  })
  .option('--cli', 'create CLI tool')
  .parse(process.argv)


if (typeof projectName === 'undefined') {
  displayNoProjectNameMessage({ program })
  process.exit(1)
}

// TODO: Make this output look nicer
console.log()
console.log(`  ${packageJson.name}`)
console.log()
console.log(`  version: ${packageJson.version}`)

makeJSLib({ projectName, cli: program.cli })
