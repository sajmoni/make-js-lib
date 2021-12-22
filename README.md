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

`make-js-lib` is a cli that creates a JavaScript library from a template.

When run it does the following:

- Creates a project folder
- Adds files from template
- Installs dependencies
- Makes a commit

### Dependencies included

- [`typescript`](https://github.com/microsoft/TypeScript) - TypeScript is a superset of JavaScript that compiles to clean JavaScript output.

- [`np`](https://github.com/sindresorhus/np) - A better `npm publish`

- [`ava`](https://github.com/avajs/ava) - Node.js test runner that lets you develop with confidence 🚀

- [`xo`](https://github.com/xojs/xo) - ❤️ JavaScript/TypeScript linter (ESLint wrapper) with great defaults

- [`esbuild-runner`](https://github.com/folke/esbuild-runner) - ⚡️ Super-fast on-the-fly transpilation of modern JS, TypeScript and JSX using esbuild

- [`package-preview`](https://github.com/zkochan/package-preview) - Creates a production preview of a package

---

## Usage

```
npx make-js-lib <library-name>
```

_Usage with `npx` ensures that you are always using the latest version_

### Before you start

If you intend to publish this to `npm`, then you should check the availability of your name with [`npm-name-cli`](https://github.com/sindresorhus/npm-name-cli):

```sh
npx npm-name-cli <library-name>
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
