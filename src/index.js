const commander = require('commander')
const chalk = require('chalk')
const CFonts = require('cfonts')

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
