
module.exports = ({ appName, cli }) => {
  const packageJsonTemplate = {
    name: appName,
    license: 'MIT',
    version: '0.0.0',
    keywords: [],
    scripts: {
      start: 'parcel src/index.js --no-autoinstall --no-cache',
      build: 'rm -rf dist && parcel build src/index.js --no-cache',
      test: 'ava',
      lint: 'eslint src',
      // eslint-disable-next-line quotes
      format: "prettier --write \"src/**/*.js\"",
      typecheck: 'tsc src/*.js',
      'check-all': 'yarn lint && yarn typecheck ',
      plop: 'plop',
      release: 'yarn clean && yarn audit && yarn build && np',
      clean: `rm -f ${appName}.tgz`,
      // TODO: Generate these files
      'build-test': cli ? './build-cli.sh' : './build-library.sh',
    },
    files: [
      'dist/',
    ],
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
    'lint-staged': {
      'src/**/*.{js,md}': [
        'yarn lint',
        'yarn typecheck',
        'yarn format',
      ],
    },
  }

  if (cli) {
    packageJsonTemplate.bin = 'dist/index.js'
  } else {
    packageJsonTemplate.main = 'dist/index.js'
  }

  return packageJsonTemplate
}
