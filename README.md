<h1 align="center">
  make-js-lib
</h1>
<h4 align="center">
  Command line tool to generate JavaScript libraries
</h4>

<div align="center">
  <img src="https://badgen.net/npm/v/make-js-lib?icon=npm" />
  <!-- <img src="https://badgen.net/npm/dw/make-js-lib?icon=npm" /> -->
  <img src="https://badgen.net/github/last-commit/sajmoni/make-js-lib?icon=github" />
</div>

## :sparkles: Features

- [`typescript`](https://github.com/microsoft/TypeScript)

- :arrow_up: [`np`](https://github.com/sindresorhus/np)

- :straight_ruler: [`ava`](https://github.com/avajs/ava)

- :policeman: [`xo`](https://github.com/xojs/xo)

- :nail_care: [`prettier`](https://github.com/prettier/prettier)

- :trophy: [`badgen`](https://github.com/badgen/badgen.net)

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

If you intend to publish this to `npm`, then you should check the availability of your name with [`npm-name-cli`](https://github.com/sindresorhus/npm-name-cli):

```sh
npx npm-name-cli <library-name>
```

### Example usage

```sh
npx make-js-lib my-lib
```

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

### You might also want to

- Update the `keywords` section in `package.json`, this helps people find your package on `npm`.

- Add or remove badges: https://badgen.net/

- Add GitHub issue and PR templates: https://help.github.com/en/github/building-a-strong-community/about-issue-and-pull-request-templates
