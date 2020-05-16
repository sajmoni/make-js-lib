<h1 align="center">
  {{ libraryName }}
</h1>
<h4 align="center">
    A javascript library
</h4>

<div align="center">
  <img src="https://badgen.net/npm/v/{{ libraryName }}?icon=npm" />
  <img src="https://badgen.net/bundlephobia/minzip/{{ libraryName }}" />
</div>

## :sparkles: Features

---

## :wrench: Example usage

---

## :package: Install

**npm**

```
npm install {{ libraryName }}
```

**yarn**

```
yarn add {{ libraryName }}
```

---

## :newspaper: API

[sayHello](docs/sayHello.md) - Say hello

---

## :book: Recipes

---

## :computer: Develop

### Commands

| Command        | Description                                    |
| -------------- | ---------------------------------------------- |
| `yarn build`   | Generate files in the `dist` folder            |
| `yarn release` | Start the process to release a new version     |
| `yarn qa`      | Run a type check with `typescript`             |
| `yarn clean`   | Remove build artefact (`.tgz` file)            |
| `yarn go`      | Builds, packs and installs to `example` folder |

### Workflow

1. Make changes
2. Update tests 
3. `yarn go` and verify that your changes work.
4. Commit to `master` or make `PR`

#### Release

`yarn release`
