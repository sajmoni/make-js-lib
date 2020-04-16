module.exports = ({ libraryName }) => {
  const packageJsonTemplate = {
    name: libraryName,
    license: 'MIT',
    version: '0.0.0',
    description: '',
    keywords: [],
    scripts: {
      build: 'rm -rf dist && parcel build src/index.js --no-cache',
      test: 'ava',
      lint: 'eslint src',
      // eslint-disable-next-line quotes
      format: 'prettier --write "src/**/*.js"',
      plop: 'plop',
      release: 'yarn clean && yarn audit && yarn build && np',
      clean: `rm -f ${libraryName}.tgz`,
      go: './build-test.sh',
    },
    main: 'dist/index.js',
    files: ['dist/'],
    directories: {
      example: 'example',
    },
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

  return packageJsonTemplate
}
