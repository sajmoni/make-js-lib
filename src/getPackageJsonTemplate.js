module.exports = ({ libraryName }) => {
  const packageJsonTemplate = {
    name: libraryName,
    license: 'MIT',
    version: '0.0.0',
    description: '',
    keywords: [],
    scripts: {
      build: 'rm -rf dist && rollup --config rollup.config.js',
      test: 'ava',
      plop: 'plop',
      release: 'yarn clean && yarn audit && yarn build && np --no-tests',
      clean: `rm -f ${libraryName}.tgz`,
      qa: 'tsc && xo --fix',
      go: './build-test.sh',
    },
    main: 'dist/index.js',
    files: ['dist/'],
    directories: {
      example: 'example',
    },
    ava: {
      require: ['./script/setupTests.js'],
    },
    prettier: {
      trailingComma: 'all',
      semi: false,
      singleQuote: true,
      useTabs: false,
      bracketSpacing: true,
    },
    xo: {
      prettier: true,
      env: ['es2020', 'node'],
      rules: {
        'unicorn/filename-case': 'off',
        'capitalized-comments': 'off',
        'dot-notation': 'off',
      },
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
