#!/usr/bin/env node

const commander = require('commander')
const chalk = require('chalk')

const packageJson = require('../package.json')
const displayNoProjectNameMessage = require('./message/noProjectName')
const makeJSLib = require('./makeJSLib')

// * The structure of this code is inspired by the create-react-app source code

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
  .parse(process.argv)


if (typeof projectName === 'undefined') {
  displayNoProjectNameMessage({ program })
  process.exit(1)
}

makeJSLib({ projectName })
