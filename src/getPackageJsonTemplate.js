
module.exports = ({ appName }) => {
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
      typecheck: 'tsc --module commonjs --allowJs --checkJs --noEmit --target es2016 src/*.js',
      'check-all': 'yarn lint && yarn typecheck ',
      plop: 'plop',
      release: 'yarn clean && yarn audit && yarn build && np',
      clean: `rm -f ${appName}.tgz`,
      'build-test': `yarn clean && yarn build && yarn pack --filename ${appName}.tgz && cd example && yarn refresh && yarn start`,
    },
    main: 'dist/index.js',
    files: [
      'dist/',
    ],
    ava: {
      babel: true,
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
      ],
    },
  }
  return packageJsonTemplate
}
