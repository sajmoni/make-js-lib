set -e

# Builds, installs to `example` folder and runs the cli

runCommand() {
  echo "=== $1 ==="
  $1
}

runCommand "yarn clean"
runCommand "yarn build"
runCommand "yarn pack --filename make-js-lib.tgz"
runCommand "cd example"
runCommand "yarn refresh"
runCommand "yarn make-js-lib test-lib --cli"
runCommand "cd test-lib"
runCommand "yarn test"
runCommand "yarn go"
