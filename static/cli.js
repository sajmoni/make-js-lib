import yargs from 'yargs'
import packageJson from '../package.json'

yargs
  .command(`${packageJson.name}`)
  .version(`${packageJson.version}`)
  .option('greet', {
    alias: 'v',
    type: 'boolean',
  }).argv
