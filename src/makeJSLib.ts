import path from 'node:path'
import os from 'node:os'
import fs from 'fs-extra'
import chalk from 'chalk'
import Mustache from 'mustache'
import execa from 'execa'
import { Listr } from 'listr2'

import getPackageJsonTemplate from './getPackageJsonTemplate.js'

const devDependencies = [
  // * Code quality
  'xo@0.37.0',
  'typescript@4.3.2',
  'husky@4.0.0',
  'lint-staged@11.0.0',
  // * Testing
  'ava@3.15.0',
  'ts-node@10.0.0',
  // * Other
  'np@7.2.0',
  'package-preview@4.0.0',
]

const makeJSLib = ({ libraryName }: { libraryName: string }) => {
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
        } catch (error: unknown) {
          throw new Error(`Git repo not initialized ${error}`)
        }
      },
    },
    {
      title: 'Set Yarn version 2',
      task: () => {
        process.chdir(rootPath)
        return execa('yarn', ['set', 'version', 'berry'])
      },
    },

    {
      title: 'Copy template files',
      task: () => {
        const templateDirectory = path.join(__dirname, `/../template`)

        try {
          fs.copySync(`${templateDirectory}/folder`, rootPath)
        } catch (error) {
          throw new Error(`Could not copy template files: ${error}`)
        }

        // * Rename gitignore to prevent npm from renaming it to .npmignore
        // * See: https://github.com/npm/npm/issues/1862
        fs.moveSync(
          path.join(rootPath, 'gitignore'),
          path.join(rootPath, '.gitignore'),
        )

        const readmeTemplateString = fs
          .readFileSync(`${templateDirectory}/README.template.md`)
          .toString()
        const readme = Mustache.render(readmeTemplateString, { libraryName })
        fs.writeFileSync(path.join(rootPath, 'README.md'), readme)

        const buildFileName = 'build-test.sh'

        const buildFileString = fs
          .readFileSync(`${templateDirectory}/${buildFileName}`)
          .toString()
        const buildFile = Mustache.render(buildFileString, { libraryName })
        const buildPath = path.join(rootPath, 'build-test.sh')
        fs.writeFileSync(buildPath, buildFile)
        fs.chmodSync(buildPath, '755')
      },
    },
    {
      title: 'Install dependencies',
      task: () => {
        const command = 'yarn'
        const defaultArgs = ['add']
        const devArgs = defaultArgs.concat('--dev').concat(devDependencies)

        return execa(command, devArgs, { all: true }).all
      },
    },
    {
      title: 'Git commit',
      task: () => {
        execa.sync('git', ['add', '-A'])

        execa.sync('git', [
          'commit',
          '--no-verify',
          '-m',
          'Initialize project using make-js-lib',
        ])
      },
    },
  ])

  tasks
    .run()
    .then(() => {
      console.log(`
      ${chalk.green('Success!')} Created ${chalk.cyan(
        libraryName,
      )} at ${chalk.cyan(rootPath)}
    
      Start by typing:
    
        ${chalk.cyan('cd name')}
    
        ${chalk.cyan('yarn go')}
      `)
    })
    .catch((error) => {
      console.log()
      console.error(chalk.red(error))
      console.log()
      process.exit(1)
    })
}

export default makeJSLib
