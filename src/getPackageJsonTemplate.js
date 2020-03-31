module.exports = ({ libraryName, cli }) => {
  const packageJsonTemplate = {
    name: libraryName,
    license: 'MIT',
    version: '0.0.0',
    keywords: [],
    scripts: {
      build: 'rm -rf dist && parcel build src/index.js --no-cache',
      test: 'ava',
      lint: 'eslint src',
      // eslint-disable-next-line quotes
      format: 'prettier --write "src/**/*.js"',
      typecheck: 'tsc src/*.js',
      'check-all': 'yarn lint && yarn typecheck ',
      plop: 'plop',
      release: 'yarn clean && yarn audit && yarn build && np',
      clean: `rm -f ${libraryName}.tgz`,
      'build-test': './build-test.sh',
    },
    files: ['dist/'],
    ava: {
      babel: true,
    },
    prettier: {
      trailingComma: 'all',
      semi: false,
      singleQuote: true,
    },
    husky: {
      hooks: {
        'pre-commit': 'lint-staged',
        'pre-push': 'yarn test',
      },
    },
  }

  if (cli) {
    packageJsonTemplate.bin = 'dist/index.js'
  } else {
    packageJsonTemplate.main = 'dist/index.js'
  }

  return packageJsonTemplate
}
