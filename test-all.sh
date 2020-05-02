set -e

# Builds, installs to `example` folder and tests all use cases

runCommand() {
  echo "=== $1 ==="
  $1
  echo ""
}

runCommand "yarn clean"
runCommand "yarn build"
runCommand "yarn pack --filename make-js-lib.tgz"
runCommand "cd example"
runCommand "yarn refresh"
runCommand "yarn test-all-use-cases"
