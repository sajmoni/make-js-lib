#!/usr/bin/env node

import commander from 'commander'
import chalk from 'chalk'
// @ts-expect-error
import CFonts from 'cfonts'

import displayNoLibraryNameMessage from './message/noLibraryName'
// @ts-ignore
import { name, version } from '../package.json'
import makeJSLib from './makeJSLib'

let libraryName

const program = new commander.Command(name)
  .version(version)
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
CFonts.say(`${name}`, {
  font: 'tiny',
  colors: ['#d43722'],
  space: false,
})
console.log(` v${version}`)
console.log()

makeJSLib({ libraryName })
