set -e

# Builds, installs to `example` folder and runs the library

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
runCommand "yarn make-js-lib test-lib"
runCommand "cd test-lib"
runCommand "yarn go"
