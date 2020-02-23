<h1 align="center">
  make-js-lib
</h1>
<h4 align="center">
  Command line tool to generate javascript libraries
</h4>

<div align="center">
  <img src="https://badgen.net/npm/v/make-js-lib?icon=npm" />
  <img src="https://badgen.net/npm/dw/make-js-lib?icon=npm" />
  <img src="https://badgen.net/github/last-commit/sajmoni/make-js-lib?icon=github" />
</div>

---

## :sparkles: Features

 - :zap: [`parcel`](https://github.com/parcel-bundler/parcel) - Very fast, zero config, module bundler

 - :arrow_up: [`np`](https://github.com/sindresorhus/np) - A better `npm publish`

 - :straight_ruler: [`ava`](https://github.com/avajs/ava) - Super simple test framework

 - :policeman: [`eslint`](https://github.com/eslint/eslint) and [`tsc`](https://github.com/microsoft/TypeScript) - Ensure code quality

 - :no_entry_sign: :poop: [`lint-staged`](https://github.com/okonet/lint-staged) + :dog: [`husky`](https://github.com/typicode/husky) - Ensure code quality on each git commit and push

 - :trophy: [`badgen`](https://github.com/badgen/badgen.net) - Readme badges

 - :recycle: [`plop`](https://github.com/plopjs/plop) - Micro-generator framework that makes it easy for an entire team to create files with a level of uniformity.

 - Workflow to test your library locally before publishing

<!-- For command line tools: -->

 <!-- - [`commander`]()  -->

<!-- parcel-plugin-shebang -->

---

## Usage

```
npx make-js-lib [library name]
```

_Usage with `npx` ensures that you are always using the latest version_

---

**What to do after script is run**

 - Update the "keywords" section in `package.json`, this helps people find your package on `npm`.

 - Add a license: https://help.github.com/en/github/building-a-strong-community/adding-a-license-to-a-repository

 - Update the repository field in package.json:

```json
"repository": {
  "type": "git",
  "url": "git+https://github.com/sajmoni/make-js-lib.git"
},
```

_This is required for `np` to be able to publish a changelog_

---

## Tips

### Documentation

If you need more advanced documentation, including a blog and translations, check out [`docosaurus`](https://github.com/facebook/docusaurus).

---

## :computer: Develop

### Commands

Command | Description
------- | -----------
`yarn build` | Generate files in the `dist` folder
`yarn release` | Start the process to release a new version
`yarn typecheck` | Run a type check with `typescript`
`yarn lint` | Run `eslint`
`yarn clean` | Remove build artefact (`.tgz` file)
`yarn build-test` | Builds and installs to `example` folder

### Workflow

1. Make changes
2. `yarn build-test`
3. `cd example` and verify that your changes work.
4. Push `master` or make `PR`

