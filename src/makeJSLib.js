const fs = require('fs-extra')
const chalk = require('chalk')
const path = require('path')
const os = require('os')
const Mustache = require('mustache')
const execa = require('execa')
const Listr = require('listr')

const getPackageJsonTemplate = require('./getPackageJsonTemplate.js')
const createFileFromTemplate = require('./createFileFromTemplate.js')
const displayDoneMessage = require('./message/done')

const devDependencies = [
  // * Code quality
  'xo@0.34.2',
  'typescript@4.0.5',
  'husky@4.3.0',
  'lint-staged@10.5.1',
  // * --
  // * Testing
  'ava@3.13.0',
  '@babel/register@7.12.1',
  '@babel/core@7.12.3',
  '@babel/preset-env@7.12.1',
  '@babel/preset-typescript@7.12.1',
  // * --
  // * Other
  'rollup@2.33.3',
  '@rollup/plugin-typescript@6.1.0',
  'np@7.0.0',
  // * --
]

module.exports = ({ libraryName }) => {
  const rootPath = path.resolve(libraryName)

  console.log(` Creating a JS library in ${chalk.green(rootPath)}`)
  console.log()

  const tasks = new Listr([
    {
      title: 'Create project folder',
      task: () => {
        if (fs.existsSync(rootPath)) {
          throw new Error('Project folder already exists')
        }

        fs.mkdirSync(rootPath)
        const packageJsonTemplate = getPackageJsonTemplate({ libraryName })

        fs.writeFileSync(
          path.join(rootPath, 'package.json'),
          JSON.stringify(packageJsonTemplate, null, 2) + os.EOL,
        )
        return true
      },
    },
    {
      title: 'Git init',
      task: () => {
        try {
          // * Change directory so that Husky gets installed in the right .git folder
          process.chdir(rootPath)
        } catch {
          throw new Error(`Could not change to project directory: ${rootPath}`)
        }

        try {
          execa.sync('git', ['init'])

          return true
        } catch (error) {
          throw new Error(`Git repo not initialized ${error}`)
        }
      },
    },
    {
      title: 'Copy template files',
      task: () => {
        const templateDirectory = path.join(__dirname, `/template/folder`)

        try {
          fs.copySync(templateDirectory, rootPath)
        } catch (error) {
          throw new Error(`Could not copy template files: ${error}`)
        }

        // * Rename gitignore to prevent npm from renaming it to .npmignore
        // * See: https://github.com/npm/npm/issues/1862
        fs.copySync(
          path.join(__dirname, `/template/gitignore`),
          path.join(rootPath, '.gitignore'),
        )

        const readmeTemplateString = fs
          .readFileSync(path.join(__dirname, `/template/README.template.md`))
          .toString()
        const readme = Mustache.render(readmeTemplateString, { libraryName })
        fs.writeFileSync(path.join(rootPath, 'README.md'), readme)

        const buildFileName = 'build-test.sh'

        const buildFileString = fs
          .readFileSync(path.join(__dirname, `/template/${buildFileName}`))
          .toString()
        const buildFile = Mustache.render(buildFileString, { libraryName })
        const buildPath = path.join(rootPath, 'build-test.sh')
        fs.writeFileSync(buildPath, buildFile)
        fs.chmodSync(buildPath, '755')

        const exampleProjectPackageJson = {
          name: 'example',
          private: true,
          scripts: {
            test: 'ava',
            refresh: 'yarn cache clean && yarn install --force --no-lockfile',
          },
          dependencies: {
            [libraryName]: `file:../${libraryName}.tgz`,
            ava: '3.8.2',
          },
        }

        fs.writeFileSync(
          path.join(rootPath, 'example/package.json'),
          JSON.stringify(exampleProjectPackageJson, null, 2) + os.EOL,
        )

        createFileFromTemplate({
          source: 'example-index.test.template.js',
          destination: 'example/index.test.js',
          options: { libraryName },
        })

        return true
      },
    },
    {
      title: 'Install dependencies',
      task: () => {
        const command = 'yarn'
        const defaultArgs = ['add', '--exact']
        const devArgs = defaultArgs.concat('--dev').concat(devDependencies)

        return execa(command, devArgs).catch((error) => {
          throw new Error(`Could not install dependencies, ${error}`)
        })
      },
    },
    {
      title: 'Git commit',
      task: () => {
        try {
          execa.sync('git', ['add', '-A'])

          execa.sync('git', [
            'commit',
            '--no-verify',
            '-m',
            'Initialize project using make-js-lib',
          ])
          return true
        } catch (error) {
          // * It was not possible to commit.
          // * Maybe the commit author config is not set.
          // * Remove the Git files to avoid a half-done state.
          try {
            fs.removeSync(path.join(rootPath, '.git'))
            throw new Error(`Could not create commit ${error}`)
          } catch (error) {
            throw new Error(
              `Could not create commit, could not remove git folder ${error}`,
            )
          }
        }
      },
    },
  ])

  tasks
    .run()
    .then(() => {
      displayDoneMessage({ name: libraryName, rootPath })
    })
    .catch((error) => {
      console.log()
      console.error(chalk.red(error))
      console.log()
      process.exit(1)
    })
}
