<h1 align="center">
  make-js-lib
</h1>
<h4 align="center">
  Command line tool to generate javascript libraries
</h4>

<div align="center">
  <img src="https://badgen.net/npm/v/make-js-lib?icon=npm" />
  <!-- <img src="https://badgen.net/npm/dw/make-js-lib?icon=npm" /> -->
  <img src="https://badgen.net/github/last-commit/sajmoni/make-js-lib?icon=github" />
</div>

`make-js-lib` can be used to generate a JavaScript library or a CLI tool with the `--cli` flag.

---

## :sparkles: Features

 - :zap: [`parcel`](https://github.com/parcel-bundler/parcel) - Very fast, zero config, module bundler

 - :arrow_up: [`np`](https://github.com/sindresorhus/np) - A better `npm publish`

 - :straight_ruler: [`ava`](https://github.com/avajs/ava) - Super simple test framework

 - :policeman: [`eslint`](https://github.com/eslint/eslint) and [`tsc`](https://github.com/microsoft/TypeScript) - Ensure code quality

 - :nail_care: [`prettier`](https://github.com/prettier/prettier) - Code formatter

 - :no_entry_sign: :poop: [`lint-staged`](https://github.com/okonet/lint-staged) + :dog: [`husky`](https://github.com/typicode/husky) - Ensure code quality on each git commit and push

 - :trophy: [`badgen`](https://github.com/badgen/badgen.net) - Readme badges

 - :recycle: [`plop`](https://github.com/plopjs/plop) - Micro-generator framework

 - Workflow to test your library locally before publishing

Command line tools also include:

 - :boat: [`yargs`](https://github.com/yargs/yargs) - Build cli tools

 - :crayon: [`chalk`](https://github.com/chalk/chalk) - Colorize output

---

## Usage

```
npx make-js-lib <library-name> [options]
```

_Usage with `npx` ensures that you are always using the latest version_

`make-js-lib` will do the following:

 - Create a new folder called `<library-name>`
 - Copy all template files to that folder
 - Install the dependencies
 - Make an initial commit

### Before you start

If you intend to publish this to `npm`, then you should check the availability of your name with [`npm-name-cli`](https://github.com/sindresorhus/npm-name-cli): `npx npm-name-cli <library-name>`

### Example usage

```
npx make-js-lib my-lib
```

The output file structure will look like this:

```
my-lib
├── .gitignore
├── .eslintrc.yml
├── .npmrc
├── README.md
├── package.json
├── plopfile.js
├── docs
├── node_modules
├── example
│   ├── index.js
│   └── package.json
├── plop
│   ├── docs.hbs
│   └── test.hbs
└── src
    ├── index.js
    └── index.test.js
```

### Options

`--cli`

Create a cli tool. Will add additional dependencies [`yargs`](https://github.com/yargs/yargs) and [`chalk`](https://github.com/chalk/chalk)

`--verbose`

Display full output. Good for debugging.

---

## What to do after the script is run

 - Add a license: https://help.github.com/en/github/building-a-strong-community/adding-a-license-to-a-repository

 - Update the repository field in package.json:

```json
"repository": {
  "type": "git",
  "url": "git+https://github.com/sajmoni/make-js-lib.git"
},
```

_This is required for `np` to be able to publish a changelog_

 - Set your repository URL

### You might also want to

 - Update the `keywords` section in `package.json`, this helps people find your package on `npm`.

 - Add or remove badges: https://badgen.net/

---

## Things you might want to do if your library becomes popular

### Documentation

If you need more advanced documentation, including a blog and translations, one good option is [`docosaurus`](https://github.com/facebook/docusaurus).

### Add GitHub issue and PR templates

https://help.github.com/en/github/building-a-strong-community/about-issue-and-pull-request-templates

---

## :computer: Develop

### Commands

Command | Description
------- | -----------
`yarn build` | Generate files in the `dist` folder
`yarn release` | Start the process to release a new version
`yarn tsc` | Run a type check with `typescript`
`yarn lint` | Run `eslint`
`yarn clean` | Remove build artefact (`.tgz` file)
`yarn go` | Builds and installs to `example` folder

### Workflow

1. Make changes
2. `yarn build-test` and verify that your changes work
4. Push `master` or make a `PR`
