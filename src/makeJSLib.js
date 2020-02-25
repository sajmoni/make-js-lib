
const fs = require('fs-extra')
const chalk = require('chalk')
const path = require('path')
const os = require('os')

const spawnCommand = require('./spawnCommand')
const getPackageJsonTemplate = require('./getPackageJsonTemplate.js')
const displayDoneMessage = require('./message/done')
const tryGitInit = require('./git/init')
const tryGitCommit = require('./git/commit')

// TODO: Strictly set version numbers
// TODO: Output dependencies installed
const devDependencies = [
  // * Code quality
  'eslint@6.8.0',
  'eslint-config-airbnb-base@14.0.0',
  'eslint-plugin-import@2.20.1',
  'typescript@3.8.2',
  'husky@4.2.3',
  'lint-staged@10.0.7',
  // * --
  // * Testing
  '@ava/babel@1.0.1',
  'ava@3.4.0',
  'eslint-plugin-ava@10.2.0',
  // * --
  // * Other
  'parcel@2.0.0-alpha.3.2',
  'np@6.1.0',
  'plop@2.5.4',
  // * --
]

module.exports = ({ projectName }) => {
  const rootPath = path.resolve(projectName)
  const appName = path.basename(rootPath)

  if (fs.existsSync(rootPath)) {
    console.log()
    console.log(`${chalk.red('  Error: Project folder already exists')} ${chalk.cyan(rootPath)}`)
    console.log()
    process.exit(1)
  }

  console.log()
  console.log(`  Creating a new project in ${chalk.green(rootPath)}`)
  console.log()

  fs.mkdirSync(rootPath)

  const packageJsonTemplate = getPackageJsonTemplate({ appName })

  fs.writeFileSync(
    path.join(rootPath, 'package.json'),
    JSON.stringify(packageJsonTemplate, null, 2) + os.EOL,
  )

  try {
    // * Change directory so that Husky gets installed in the right .git folder
    process.chdir(rootPath)
    console.log(`New directory: ${process.cwd()}`)
  } catch (err) {
    console.log(`${chalk.red('  Error: Could not enter project directory')} ${chalk.cyan(rootPath)}`)
    process.exit(1)
  }

  const initializedGit = tryGitInit()

  console.log()
  console.log('  Copying files from template.')

  const templateDirectory = `${__dirname}/template`

  try {
    fs.copySync(templateDirectory, rootPath)
  } catch (error) {
    console.log(`${chalk.red('  Error: Could not copy template files: ')} ${error}`)
  }

  console.log('  Installing packages.')
  console.log()

  const command = 'yarn'
  const defaultArgs = ['add', '--exact']
  const devArgs = defaultArgs.concat('--dev').concat(devDependencies)

  spawnCommand({ command, args: devArgs })
    .then(() => {
      if (initializedGit) {
        tryGitCommit({ rootPath })
      }

      displayDoneMessage({ name: projectName, rootPath })
    }).catch((reason) => {
      // TODO: Redo this
      // TODO: Add test case for this?
      console.log()
      console.log(chalk.red('  Aborting installation.'))
      console.log(`  Command failed: ${chalk.cyan(reason.command)}`)
      console.log()
    })
}
