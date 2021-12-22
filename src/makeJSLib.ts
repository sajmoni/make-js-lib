import path from 'node:path'
import os from 'node:os'
import fs from 'fs-extra'
import chalk from 'chalk'
import Mustache from 'mustache'
import execa from 'execa'
import { Listr } from 'listr2'

import getPackageJsonTemplate from './getPackageJsonTemplate'
import createFileFromTemplate from './createFileFromTemplate'

const devDependencies = [
  // * Code quality
  'xo@0.37.0',
  'typescript@4.3.2',
  // * Testing
  'ava@3.15.0',
  'esbuild-runner@2.2.1',
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
          execa.sync('git', ['init', '-b', 'main'])
        } catch (error: unknown) {
          throw new Error(`Git repo not initialized ${error as string}`)
        }
      },
    },

    {
      title: 'Copy template files',
      task: () => {
        const templateDirectory = path.join(__dirname, `/../template`)

        try {
          fs.copySync(`${templateDirectory}/folder`, rootPath)
        } catch (error: any) {
          throw new Error(`Could not copy template files: ${error.message}`)
        }

        fs.moveSync(path.join(rootPath, 'npmrc'), path.join(rootPath, '.npmrc'))

        fs.moveSync(
          path.join(rootPath, 'gitignore'),
          path.join(rootPath, '.gitignore'),
        )

        const readmeTemplateString = fs
          .readFileSync(`${templateDirectory}/README.template.md`)
          .toString()
        const readme = Mustache.render(readmeTemplateString, { libraryName })
        fs.writeFileSync(path.join(rootPath, 'README.md'), readme)

        createFileFromTemplate({
          source: `${templateDirectory}/test.template.ts`,
          destination: path.join(rootPath, 'test.ts'),
          options: { name: libraryName },
        })
      },
    },
    {
      title: 'Install dependencies',
      task: () => {
        const command = 'npm'
        const defaultArgs = ['install', '--save-exact']
        const devArgs = defaultArgs.concat('--save-dev').concat(devDependencies)

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

      ${chalk.cyan(`cd ${libraryName}`)}

      ${chalk.cyan('npm run test')}
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
