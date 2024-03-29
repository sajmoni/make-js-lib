import chalk from 'chalk'

export default ({ program }: { program: any }) => {
  console.log()
  console.error('Please specify the project directory:')
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`,
  )
  console.log()
  console.log('  For example:')
  console.log(`    ${chalk.cyan(program.name())} ${chalk.green('my-js-lib')}`)
  console.log()
  console.log(
    `  Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`,
  )
  console.log()
}
