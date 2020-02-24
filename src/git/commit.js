const { execSync } = require('child_process')
const fs = require('fs-extra')
const path = require('path')

module.exports = ({ rootPath }) => {
  try {
    execSync('git add -A', { stdio: 'ignore' })

    execSync('git commit -m "Initial commit from Make JS Lib"', {
      stdio: 'ignore',
    })

    console.log()
    console.log('Created git commit.')
  } catch (e) {
    // * It was not possible to commit.
    // * Maybe the commit author config is not set.
    // * Remove the Git files to avoid a half-done state.
    // TODO: Test this by adding to use-cases file
    try {
      fs.removeSync(path.join(rootPath, '.git'))
    } catch (removeErr) {
      // Ignore.
    }
  }
}
