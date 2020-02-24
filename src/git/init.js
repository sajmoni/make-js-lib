const { execSync } = require('child_process')

module.exports = () => {
  try {
    execSync('git init', { stdio: 'ignore' })

    console.log('  Initialized a git repository.')
    console.log()

    return true
  } catch (e) {
    console.warn('  Git repo not initialized', e)

    return false
  }
}
