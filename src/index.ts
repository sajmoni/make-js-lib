#!/usr/bin/env node

import commander from 'commander'
import chalk from 'chalk'
import CFonts from 'cfonts'

// @ts-expect-error
import packageJson from '../package.json'
import displayNoLibraryNameMessage from './message/noLibraryName'
import makeJSLib from './makeJSLib'

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
    console.log(`   Only ${chalk.green('<library-name>')} is required.`)
    console.log()
  })
  .parse(process.argv)

if (typeof libraryName === 'undefined') {
  displayNoLibraryNameMessage({ program })
  process.exit(1)
}

console.log()
CFonts.say(`${packageJson.name}`, {
  font: 'tiny',
  colors: ['#d43722'],
  space: false,
})
console.log(` v${packageJson.version}`)
console.log()

makeJSLib({ libraryName })
