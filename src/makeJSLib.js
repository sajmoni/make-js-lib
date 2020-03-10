const fs = require('fs-extra')
const chalk = require('chalk')
const path = require('path')
const os = require('os')
const Mustache = require('mustache')

const spawnCommand = require('./spawnCommand')
const getPackageJsonTemplate = require('./getPackageJsonTemplate.js')
const displayDoneMessage = require('./message/done')
const tryGitInit = require('./git/init')
const tryGitCommit = require('./git/commit')

// * Only used with --cli flag
const dependencies = ['yargs@15.1.0', 'chalk@3.0.0']

// TODO: Output dependencies installed
const devDependencies = [
  // * Code quality
  'eslint@6.8.0',
  'eslint-config-prettier@6.10.0',
  'typescript@3.8.2',
  'husky@4.2.3',
  'lint-staged@10.0.7',
  'prettier@1.19.1',
  // * --
  // * Testing
  '@ava/babel@1.0.1',
  'ava@3.4.0',
  'eslint-plugin-ava@10.2.0',
  // * --
  // * Other
  'parcel@2.0.0-alpha.3.2',
  'np@6.2.0',
  'plop@2.5.4',
  // * --
]

module.exports = ({ libraryName, cli }) => {
  const rootPath = path.resolve(libraryName)

  if (fs.existsSync(rootPath)) {
    console.log()
    console.log(
      `${chalk.red('  Error: Project folder already exists')} ${chalk.cyan(
        rootPath,
      )}`,
    )
    console.log()
    process.exit(1)
  }

  console.log()
  if (cli) {
    console.log(`  Creating a CLI tool in ${chalk.green(rootPath)}`)
  } else {
    console.log(`  Creating a library in ${chalk.green(rootPath)}`)
  }
  console.log()

  fs.mkdirSync(rootPath)

  const packageJsonTemplate = getPackageJsonTemplate({ libraryName, cli })

  fs.writeFileSync(
    path.join(rootPath, 'package.json'),
    JSON.stringify(packageJsonTemplate, null, 2) + os.EOL,
  )

  try {
    // * Change directory so that Husky gets installed in the right .git folder
    process.chdir(rootPath)
  } catch (err) {
    console.log(
      `${chalk.red(
        '  Error: Could not change to project directory',
      )} ${chalk.cyan(rootPath)}`,
    )
    process.exit(1)
  }

  const initializedGit = tryGitInit()

  console.log()
  console.log('  Copying files from template.')

  const templateDirectory = `${__dirname}/template`

  try {
    fs.copySync(templateDirectory, rootPath)
  } catch (error) {
    console.log(
      `${chalk.red('  Error: Could not copy template files: ')} ${error}`,
    )
  }

  // * Rename gitignore to prevent npm from renaming it to .npmignore
  // * See: https://github.com/npm/npm/issues/1862
  fs.moveSync(
    path.join(rootPath, 'gitignore'),
    path.join(rootPath, '.gitignore'),
  )

  const readmeTemplateString = fs
    .readFileSync(`${__dirname}/README.template.md`)
    .toString()
  const readme = Mustache.render(readmeTemplateString, { libraryName })
  fs.writeFileSync(path.join(rootPath, 'README.md'), readme)

  let buildFileName
  let indexFileName
  if (cli) {
    buildFileName = 'build-cli.sh'
    indexFileName = 'cli.js'
  } else {
    buildFileName = 'build-library.sh'
    indexFileName = 'lib.js'
  }

  const buildFileString = fs
    .readFileSync(`${__dirname}/${buildFileName}`)
    .toString()
  const buildFile = Mustache.render(buildFileString, { libraryName })
  fs.writeFileSync(path.join(rootPath, 'build-test.sh'), buildFile)

  const indexFileString = fs
    .readFileSync(`${__dirname}/${indexFileName}`)
    .toString()

  const indexFile = Mustache.render(indexFileString, { libraryName })
  fs.writeFileSync(path.join(`${rootPath}/src`, 'index.js'), indexFile)

  console.log('  Installing packages.')
  console.log()

  const command = 'yarn'
  const defaultArgs = ['add', '--exact']
  const devArgs = defaultArgs.concat('--dev').concat(devDependencies)
  const prodArgs = defaultArgs.concat(dependencies)

  spawnCommand({ command, args: devArgs })
    .then(() =>
      cli ? spawnCommand({ command, args: prodArgs }) : Promise.resolve(),
    )
    .then(() => {
      if (initializedGit) {
        tryGitCommit({ rootPath })
      }

      displayDoneMessage({ name: libraryName, rootPath })
    })
    .catch(reason => {
      // TODO: Redo this
      // TODO: Add test case for this?
      console.log()
      console.log(chalk.red('  Aborting installation.'))
      console.log(`  Command failed: ${chalk.cyan(reason.command)}`)
      console.log()
    })
}
